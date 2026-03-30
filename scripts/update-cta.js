/**
 * Update CTA blocks inside 4 blog posts to match the new standard design:
 * - Soft rounded card with gradient bg
 * - Badge pill
 * - Bold orange heading
 * - Description text
 * - Two buttons: Call (orange) + Line (green)
 * - Text link below
 */
const Database = require('better-sqlite3');
const db = new Database('prisma/dev.db');

// CTA config per slug
const ctaConfigs = {
  'european-car-runflat-tire-repair-guide': {
    badge: '📞 บริการ 24 ชม. ถึงที่ทันที',
    heading: 'ยางแตก ยางรั่ว หรือรันแฟลตมีปัญหา? เรียกช่างปะยางถึงที่!',
    description: 'ช่างพร้อมเข้าช่วยเหลือนอกสถานที่ใน 30 นาที รองรับรถยุโรปและยาง Runflat ส่งพิกัดมาได้เลย ประเมินหน้างานก่อนเริ่มทำ',
    callLabel: 'โทรเรียกช่าง 099-673-1296',
    lineLabel: 'แอดไลน์ ส่งพิกัดเรียกช่าง',
    serviceHref: '/mobile-tire-repair',
    serviceLabel: 'ดูบริการปะยางนอกสถานที่ →',
  },
  'car-polishing-before-sale-guide': {
    badge: '📞 บริการ 24 ชม. นัดคิวถึงที่',
    heading: 'รถจะขาย สีไม่สวย? เรียกช่างขัดสีถึงที่!',
    description: 'ช่างพร้อมนำแบตเตอรี่แท้ไปเปลี่ยนให้ถึงที่ภายใน 30 นาที รับประกัน 1-2 ปี เช็คระบบไฟฟรี',
    callLabel: 'โทรเรียกช่าง 099-673-1296',
    lineLabel: 'แอดไลน์ ส่งรูปประเมินฟรี',
    serviceHref: '/car-polishing',
    serviceLabel: 'ดูบริการขัดสีรถ →',
  },
  'asphalt-stain-removal-guide': {
    badge: '📞 บริการ 24 ชม. นัดคิวถึงที่',
    heading: 'คราบยางมะตอยเกาะรถ ขจัดไม่ออก? เรียกช่างถึงที่!',
    description: 'ช่างพร้อมนำอุปกรณ์เฉพาะทางไปขจัดคราบยางมะตอยถึงที่ ไม่ทำลายสีรถ รับประกันงาน ส่งรูปประเมินก่อนได้เลย',
    callLabel: 'โทรเรียกช่าง 099-673-1296',
    lineLabel: 'แอดไลน์ ส่งรูปประเมินฟรี',
    serviceHref: '/car-polishing',
    serviceLabel: 'ดูบริการขัดสีรถ →',
  },
  'car-overspray-removal-guide': {
    badge: '📞 บริการ 24 ชม. นัดคิวถึงที่',
    heading: 'รถโดนละอองสี สีสาก? เรียกช่างลบรอยถึงที่!',
    description: 'ผู้เชี่ยวชาญด้านการขัดลบรอยละอองสี โซนศรีนครินทร์ บางนา สมุทรปราการ งานละเอียด ปลอดภัยต่อสีรถแน่นอน',
    callLabel: 'โทรเรียกช่าง 099-673-1296',
    lineLabel: 'แอดไลน์ ส่งรูปประเมินฟรี',
    serviceHref: '/car-polishing',
    serviceLabel: 'ดูบริการขัดสีรถ →',
  },
};

function buildNewCta(cfg) {
  return `<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">${cfg.badge}</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">${cfg.heading}</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">${cfg.description}</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 ${cfg.callLabel}</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 ${cfg.lineLabel}</a>
    </div>
    <p style="margin-top:1.5rem;"><a href="${cfg.serviceHref}" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">${cfg.serviceLabel}</a></p>
  </div>
</div>`;
}

// Regex to match existing CTA blocks (bg-slate-900 dark CTA cards)
const ctaPattern = /<div class="bg-slate-900 text-white[^]*?<\/div>\s*<\/div>\s*<\/div>/gs;

let updated = 0;
for (const [slug, cfg] of Object.entries(ctaConfigs)) {
  const row = db.prepare('SELECT id, content FROM Post WHERE slug = ?').get(slug);
  if (!row) {
    console.log(`⚠️ NOT FOUND: ${slug}`);
    continue;
  }

  const newCta = buildNewCta(cfg);
  const newContent = row.content.replace(ctaPattern, newCta);

  if (newContent === row.content) {
    console.log(`⚠️ No CTA block matched for: ${slug}`);
    continue;
  }

  db.prepare('UPDATE Post SET content = ?, updatedAt = datetime(\'now\') WHERE id = ?').run(newContent, row.id);
  console.log(`✅ Updated CTA for: ${slug}`);
  updated++;
}

console.log(`\nDone. Updated ${updated} posts.`);
db.close();
