/**
 * One-shot script: Fix ALL SEO + internal link + OG issues in every post.
 *   1. Replace /services links → correct service page routes
 *   2. Normalize Line URL to https://lin.ee/xxqKaZn
 *   3. Fill missing seoTitle / seoDescription / seoKeywords / ogTitle / ogDescription
 *   4. Fix the 2 legacy posts that have zero SEO data
 */
const Database = require("better-sqlite3");
const db = new Database("./prisma/dev.db");

// ── Correct service routes mapping ────────────────────────────────
const SERVICE_ROUTES = {
  "ปะยาง": "/mobile-tire-repair",
  "ยาง": "/mobile-tire-repair",
  "แบตเตอรี่": "/battery-replacement",
  "แบต": "/battery-replacement",
  "ไดชาร์จ": "/alternator-starter",
  "ไดสตาร์ท": "/alternator-starter",
  "ขัดสี": "/car-polishing",
  "ขัดไฟ": "/car-polishing",
};

function pickServiceRoute(slug, content) {
  // Try to match by slug keywords first
  if (/tire|ยาง|runflat|flat/i.test(slug)) return "/mobile-tire-repair";
  if (/battery|แบต|hybrid|pickup/i.test(slug)) return "/battery-replacement";
  if (/alternator|starter|ไดชาร์จ|ไดสตาร์ท/i.test(slug)) return "/alternator-starter";
  if (/polish|ขัดสี|overspray|asphalt|คราบ/i.test(slug)) return "/car-polishing";
  // fallback: scan content
  for (const [kw, route] of Object.entries(SERVICE_ROUTES)) {
    if (content.includes(kw)) return route;
  }
  return "/mobile-tire-repair"; // safe default
}

const CANONICAL_LINE = "https://lin.ee/xxqKaZn";

// ── SEO defaults for legacy posts with zero SEO ────────────────
const LEGACY_SEO = {
  "battery-care-tips": {
    seoTitle: "วิธีดูแลแบตเตอรี่รถยนต์ให้อายุยืน | FIRSTCARCENTER",
    seoDescription: "รวมเคล็ดลับดูแลแบตเตอรี่รถยนต์ให้ใช้งานได้นาน หมดปัญหาสตาร์ทไม่ติด พร้อมบริการเปลี่ยนแบตถึงที่ 24 ชม.",
    seoKeywords: "ดูแลแบตเตอรี่,แบตเตอรี่รถยนต์,เปลี่ยนแบตเตอรี่,แบตหมด,สตาร์ทไม่ติด",
    ogTitle: "วิธีดูแลแบตเตอรี่รถยนต์ให้อายุยืน",
    ogDescription: "เคล็ดลับดูแลแบตเตอรี่รถยนต์ให้ใช้งานได้นาน หมดปัญหาสตาร์ทไม่ติด",
  },
  "บริการรถยนต์-24-ชม": {
    seoTitle: "บริการรถยนต์ 24 ชม. ซ่อมรถนอกสถานที่ | FIRSTCARCENTER",
    seoDescription: "บริการซ่อมรถยนต์นอกสถานที่ 24 ชั่วโมง ปะยาง เปลี่ยนแบตเตอรี่ ซ่อมไดชาร์จ ไดสตาร์ท โซนบางนา ศรีนครินทร์ สมุทรปราการ",
    seoKeywords: "บริการรถยนต์ 24 ชม,ซ่อมรถนอกสถานที่,ปะยาง,เปลี่ยนแบตเตอรี่,ไดชาร์จ,บางนา,ศรีนครินทร์",
    ogTitle: "บริการรถยนต์ 24 ชม. ซ่อมรถนอกสถานที่ ถึงไวใน 30 นาที",
    ogDescription: "FIRSTCARCENTER บริการซ่อมรถนอกสถานที่ 24 ชม. ปะยาง เปลี่ยนแบต ซ่อมไดชาร์จ โซนบางนา ศรีนครินทร์",
  },
};

// OG fill for posts that have seoTitle but missing ogTitle
const OG_FILL = {
  "european-car-runflat-tire-repair-guide": {
    ogTitle: "ปะยางรถยุโรป รันแฟลต (Runflat) ผู้หญิงยางแตก ทำไงดี? รีวิวเคสจริง",
    ogDescription: "รีวิวเคสจริง ปะยางรถยุโรปรันแฟลต บริการถึงที่ 24 ชม. ศรีนครินทร์ บางนา",
  },
  "car-polishing-before-sale-guide": {
    ogTitle: "ขัดสีรถก่อนขาย อัปราคาได้จริง! เคล็ดลับฟื้นฟูสีรถ",
    ogDescription: "รีวิวเคล็ดลับขัดสีรถก่อนขาย ลบรอยขนแมว ฟื้นฟูสีรถให้สวยเหมือนใหม่",
  },
  "asphalt-stain-removal-guide": {
    ogTitle: "วิธีขจัดคราบยางมะตอยเกาะรถ ไม่ทำลายสี สะอาดหมดจด",
    ogDescription: "คราบยางมะตอยเกาะรถ ปล่อยไว้นานสีพัง! วิธีล้างที่ถูกต้องไม่ทำลายสีรถ",
  },
  "car-overspray-removal-guide": {
    ogTitle: "วิธีลบรอยละอองสีเกาะรถ สีสากทำไงดี? ไม่ให้สีพัง",
    ogDescription: "ลบรอยละอองสีเกาะรถ ลูบแล้วสาก วิธีแก้ที่ถูกต้องไม่ทำลายเคลียร์โค้ท",
  },
};

// ── Main ──────────────────────────────────────────────────────────
const posts = db.prepare("SELECT id, slug, content, seoTitle, seoDescription, seoKeywords, ogTitle, ogDescription FROM Post WHERE published = 1").all();

const updateStmt = db.prepare(`
  UPDATE Post SET 
    content = @content,
    seoTitle = @seoTitle,
    seoDescription = @seoDescription,
    seoKeywords = @seoKeywords,
    ogTitle = @ogTitle,
    ogDescription = @ogDescription
  WHERE id = @id
`);

let fixCount = 0;

const txn = db.transaction(() => {
  for (const post of posts) {
    let content = post.content || "";
    let changed = false;

    // 1) Replace /services → correct route
    if (content.includes('"/services"') || content.includes("'/services'") || content.includes('href="/services"') || content.includes('href="/services')) {
      const route = pickServiceRoute(post.slug, content);
      content = content.replace(/href=["']\/services["']/g, `href="${route}"`);
      changed = true;
      console.log(`  [LINK] ${post.slug}: /services → ${route}`);
    }

    // 2) Normalize Line URL
    if (content.includes("lin.ee/h4G5aQ0")) {
      content = content.replace(/https:\/\/lin\.ee\/h4G5aQ0/g, CANONICAL_LINE);
      changed = true;
      console.log(`  [LINE] ${post.slug}: normalized Line URL`);
    }

    // 3) Fill missing SEO from legacy map
    let seoTitle = post.seoTitle || "";
    let seoDescription = post.seoDescription || "";
    let seoKeywords = post.seoKeywords || "";
    let ogTitle = post.ogTitle || "";
    let ogDescription = post.ogDescription || "";

    if (LEGACY_SEO[post.slug]) {
      const fill = LEGACY_SEO[post.slug];
      if (!seoTitle) { seoTitle = fill.seoTitle; changed = true; }
      if (!seoDescription) { seoDescription = fill.seoDescription; changed = true; }
      if (!seoKeywords) { seoKeywords = fill.seoKeywords; changed = true; }
      if (!ogTitle) { ogTitle = fill.ogTitle; changed = true; }
      if (!ogDescription) { ogDescription = fill.ogDescription; changed = true; }
      console.log(`  [SEO] ${post.slug}: filled all missing SEO fields`);
    }

    // 4) Fill missing ogTitle from OG_FILL
    if (OG_FILL[post.slug]) {
      const fill = OG_FILL[post.slug];
      if (!ogTitle) { ogTitle = fill.ogTitle; changed = true; }
      if (!ogDescription) { ogDescription = fill.ogDescription; changed = true; }
      console.log(`  [OG] ${post.slug}: filled missing OG tags`);
    }

    if (changed) {
      updateStmt.run({
        id: post.id,
        content,
        seoTitle,
        seoDescription,
        seoKeywords,
        ogTitle,
        ogDescription,
      });
      fixCount++;
    }
  }
});

txn();
console.log(`\n✅ Done! Fixed ${fixCount} posts.`);
db.close();
