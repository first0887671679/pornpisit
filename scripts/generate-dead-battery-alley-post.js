const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// ============================================================
// 1. Generate SVG images
// ============================================================
const imgDir = path.join(__dirname, '../public/images/blog');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050914"/>
      <stop offset="100%" stop-color="#12182B"/>
    </linearGradient>
    <radialGradient id="glowOrange" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF6B00" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#FF6B00" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowCyan" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#00F2FE" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="none"/>
      <circle cx="20" cy="20" r="1" fill="#ffffff" fill-opacity="0.1"/>
      <line x1="0" y1="0" x2="40" y2="0" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
      <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="200" cy="500" r="400" fill="url(#glowOrange)"/>
  <circle cx="1000" cy="100" r="500" fill="url(#glowCyan)"/>

  <g transform="translate(80, 100)">
    <rect x="0" y="0" width="220" height="40" rx="20" fill="rgba(255,107,0,0.15)" stroke="#FF6B00" stroke-width="1.5"/>
    <text x="110" y="26" font-family="Prompt, sans-serif" font-size="18" font-weight="bold" fill="#FF6B00" text-anchor="middle">SURVIVAL GUIDE</text>
  </g>

  <g transform="translate(80, 180)">
    <text font-family="Prompt, sans-serif" font-weight="900" fill="#FFFFFF">
      <tspan x="0" y="0" font-size="72">รถแบตหมดในซอย</tspan>
      <tspan x="0" y="90" font-size="60">สตาร์ทไม่ติด ทำยังไงดี?</tspan>
    </text>
    <text x="0" y="160" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">รีวิวช่วยเหลือรถเสียยามวิกาล โซนศรีนครินทร์ - เทพารักษ์</text>
    <text x="0" y="210" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">วิธีรับมือ + บริการเปลี่ยนแบตนอกสถานที่ 24 ชม.</text>
  </g>

  <g transform="translate(750, 150)">
    <circle cx="200" cy="200" r="180" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
    <text x="200" y="160" font-family="Prompt, sans-serif" font-size="64" text-anchor="middle" fill="#FF6B00">🐷 🌙</text>
    <text x="200" y="240" font-family="Prompt, sans-serif" font-size="24" text-anchor="middle" fill="#94A3B8">FIRSTCAR 24H</text>
  </g>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <rect x="0" y="0" width="800" height="450" fill="rgba(255,255,255,0.03)" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 🌑 🆘</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถจอดเสียขวางซอย แบตหมดตอนกลางคืน</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ซอยวัดหนามแดง เทพารักษ์</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔧 ⚡ 🚀</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ช่างถึงหน้างานใน 20 นาที เปลี่ยนแบตจบไว</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโดลึก ซอยแบริ่ง (สุขุมวิท 107)</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-dead-battery-alley-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'dead-battery-alley-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'dead-battery-alley-case2.svg'), inline2Svg);

console.log('SVGs created successfully.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "รถแบตหมดในซอย ลึกแค่ไหนก็ไปถึง! รีวิวเปลี่ยนแบตด่วน 24 ชม. ศรีนครินทร์",
  slug: "dead-car-battery-in-alley-survival-guide",
  excerpt: "จอดรถขวางทาง รถแบตหมดในซอยแคบ สตาร์ทไม่ติด ทำยังไงดี? รวมเคสรีวิวช่วยเหลือฉุกเฉินยามวิกาล โซนศรีนครินทร์ บางนา เทพารักษ์ พร้อมวิธีรับมือเบื้องต้น",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "แบตเตอรี่รถยนต์,รถแบตหมดในซอย,สตาร์ทไม่ติด,เปลี่ยนแบตนอกสถานที่,รถเสียฉุกเฉิน,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "รถแบตหมดในซอย ทำไงดี? เรียกช่างเปลี่ยนแบต 24 ชม. โซนบางนา",
  seoDescription: "รถแบตหมดในซอยแคบ จอดขวางทาง สตาร์ทไม่ติด? อ่านวิธีรับมือและรีวิวเรียกช่างเปลี่ยนแบตนอกสถานที่ 24 ชม. โซนศรีนครินทร์ บางนา เทพารักษ์ ถึงไวใน 30 นาที",
  seoKeywords: "รถแบตหมดในซอย, เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่, รถสตาร์ทไม่ติด, แบตหมดกลางคืน, ช่างซ่อมรถ บางนา",
  ogTitle: "รถแบตหมดในซอย สตาร์ทไม่ติด ทำไงดี? รอดได้ใน 30 นาที",
  ogDescription: "จอดขวางซอย แบตหมดกลางดึก? ดูวิธีเอาตัวรอดพร้อมเคสรีวิวเปลี่ยนแบตด่วนยามวิกาล โซนศรีนครินทร์-เทพารักษ์",
  coverImage: "/images/blog/pig-dead-battery-alley-cover.svg",
  content: `
<p class="lead">เคยไหมครับ? ขับรถกลับบ้านเหนื่อยๆ แวะซื้อของปากซอย พอจะสตาร์ทรถกลับปรากฏว่า <strong>รถแบตหมดในซอย</strong> สตาร์ทไม่ติด แถมจอดขวางทางรถคันอื่นอีก! ยิ่งถ้าเป็นซอยแคบๆ ในย่าน <strong>ศรีนครินทร์ แบริ่ง ลาซาล หรือเทพารักษ์</strong> ที่รถพลุกพล่านด้วยแล้ว ยิ่งชวนให้เหงื่อตก วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาแชร์วิธีเอาตัวรอดเมื่อรถแบตหมดในซอย พร้อมเคสรีวิวการออกไปช่วยเหลือลูกค้าจริงครับ</p>

<h2>เมื่อ "รถแบตหมดในซอย" สิ่งแรกที่ต้องทำคืออะไร?</h2>
<p>ถ้าบิดกุญแจแล้วมีแต่เสียง "แชะๆ" หรือไฟหน้าปัดหรี่ลงจนดับสนิท ให้ตั้งสติและทำตามขั้นตอนนี้ครับ:</p>
<ol>
  <li><strong>เปิดไฟฉุกเฉินทันที:</strong> เพื่อให้รถที่ตามมาในซอยทราบว่ารถเรามีปัญหา หากไฟฉุกเฉินเปิดไม่ติด (แบตหมดเกลี้ยง) ให้นำป้ายหรือกิ่งไม้มาวางดักหลังรถไว้ระยะ 10-15 เมตร</li>
  <li><strong>ประเมินสถานการณ์จราจร:</strong> หากรถคุณจอดขวางทางในซอยแคบๆ เช่น <strong>ซอยวัดหนามแดง</strong> หรือ <strong>สุขุมวิท 107 (แบริ่ง)</strong> ลองขอความช่วยเหลือจากคนแถวนั้นหรือวินมอเตอร์ไซค์ให้ช่วยเข็นรถแอบเข้าข้างทาง หรือจุดที่ปลอดภัย</li>
  <li><strong>งดพยายามสตาร์ทซ้ำๆ:</strong> เพราะนอกจากจะไม่ติดแล้ว ยังอาจทำให้<a href="/alternator-starter" class="text-orange-600 font-bold hover:underline">ซ่อมไดสตาร์ทรถยนต์</a>ไหม้พังเสียหายเพิ่มไปอีก</li>
  <li><strong>โทรเรียกช่างเปลี่ยนแบตเตอรี่นอกสถานที่:</strong> เลือกร้านที่มีบริการมอเตอร์ไซค์วิ่งด่วน เพราะในซอยแคบ รถกระบะบริการมักจะเข้าถึงยากและช้ากว่า</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/dead-battery-alley-case1.svg" alt="รถจอดเสีย รถแบตหมดในซอยวัดหนามแดง เทพารักษ์ ตอนกลางคืน" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: ระทึกกลางดึก รถแบตหมดขวางซอยวัดหนามแดง (เทพารักษ์)</h2>
<p>เหตุการณ์นี้เกิดขึ้นตอน 3 ทุ่มกว่า ลูกค้าขับรถ Honda Civic เข้ามาใน <strong>ซอยวัดหนามแดง เทพารักษ์</strong> แล้วจอดซื้อข้าวหน้าปากซอยย่อย พอกลับขึ้นรถ ปรากฏว่าสตาร์ทไม่ติด ซอยนี้ขึ้นชื่อเรื่องความแคบและรถสวนกันตลอดเวลา ทำให้รถติดสะสมยาวทันที</p>

<p>ลูกค้าเสิร์ชกูเกิลหาคำว่า "เปลี่ยนแบตเตอรี่ใกล้ฉัน" แล้วเจอเบอร์โทร PORNPISIT BATTERY เราประเมินสถานการณ์แล้วว่าต้องใช้ <strong>"หน่วยมอเตอร์ไซค์เคลื่อนที่เร็ว"</strong> เท่านั้น ช่างของเราแพ็คแบตเตอรี่ GS ขึ้นท้ายรถ ขี่ลัดเลาะฝ่ารถติดเข้าซอยไปถึงหน้ารถลูกค้าในเวลาเพียง <strong>18 นาที</strong>!</p>

<p>ช่างทำการต่อเครื่องสำรองไฟ ECU และถอดเปลี่ยนแบตเตอรี่ลูกใหม่อย่างรวดเร็ว ใช้เวลาเปลี่ยนไม่ถึง 10 นาที รถก็กลับมาสตาร์ทติดฉึ่ง วิ่งหลบเข้าข้างทางเปิดการจราจรให้ซอยได้สำเร็จ ลูกค้าประทับใจมากที่ช่างมาไวและแก้ปัญหาได้ตรงจุด</p>

<h2>Case Study 2: แบตเสื่อมในที่จอดรถใต้ดิน คอนโดซอยแบริ่ง</h2>
<p>อีกเคสที่พบบ่อยคือ <strong>รถสตาร์ทไม่ติดในชั้นจอดรถใต้ดิน</strong> ของคอนโดมิเนียม เคสนี้ลูกค้าอยู่ลึกเข้าไปใน <strong>ซอยแบริ่ง (สุขุมวิท 107)</strong> รถ Toyota Vios จอดทิ้งไว้ 3 วัน แบตเตอรี่เสื่อมจนรีโมทกดไม่ติด ต้องใช้กุญแจไขไขประตูเข้าไป</p>

<p>ปัญหาของลานจอดรถใต้ดินคือ รถลาก (Tow Truck) เข้าไม่ได้เพราะติดความสูงเพดาน การเรียกบริการ<a href="/battery-replacement" class="text-orange-600 font-bold hover:underline">เปลี่ยนแบตเตอรี่นอกสถานที่</a>จึงเป็นทางออกเดียว ช่างของเราขี่มอเตอร์ไซค์ลงไปถึงชั้น B3 พร้อมเครื่องมือครบชุด ทำการตรวจเช็กค่า CCA และเปลี่ยนแบตเตอรี่ FB ให้ใหม่ พร้อมวัดค่าไดชาร์จให้ฟรี จบงานได้แบบหล่อๆ โดยที่ลูกค้าไม่ต้องลากรถออกจากคอนโดให้เหนื่อย</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/dead-battery-alley-case2.svg" alt="ช่างเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ คอนโดลึกในซอยแบริ่ง สุขุมวิท 107" class="w-full h-auto object-cover m-0" />
</div>

<h2>ทำไมถึงควรเรียก PORNPISIT BATTERY เมื่อรถแบตหมดในซอย?</h2>
<ul>
  <li><strong>มอเตอร์ไซค์หน่วยรบพิเศษ:</strong> เราเชี่ยวชาญเส้นทางใน <strong>ห้วยขวาง ดินแดง ลาดพร้าว ลาซาล แบริ่ง เทพารักษ์ สมุทรปราการ</strong> มอเตอร์ไซค์สามารถซอกแซกเข้าซอยแคบได้ไวกว่ารถยนต์</li>
  <li><strong>บริการตลอด 24 ชั่วโมง:</strong> ไม่ว่ารถจะเสียตอนตี 2 หรือตี 5 เรามีทีมช่างสแตนด์บายเสมอ</li>
  <li><strong>แบตเตอรี่ใหม่แกะกล่อง มีประกันทุกลูก:</strong> เรานำแบตเตอรี่แบรนด์ชั้นนำ (GS, FB, Panasonic, 3K, Amaron) พร้อมใบรับประกัน 1-2 ปี ไปเปลี่ยนให้ถึงที่</li>
  <li><strong>ฟรีค่าแรง ฟรีค่าเดินทาง:</strong> จ่ายแค่ราคาแบตเตอรี่ตามมาตรฐานร้าน ไม่มีบวกค่าวิ่งเข้าซอยลึก</li>
</ul>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">📞 บริการ 24 ชม. ถึงที่ทันที</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">จอดขวางซอย สตาร์ทไม่ติด? เรียกช่างเปลี่ยนแบตด่วน!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">ซอยแคบแค่ไหนก็เข้าถึง! ช่างมอเตอร์ไซค์พร้อมลุยนำแบตเตอรี่แท้ไปเปลี่ยนให้ถึงที่ภายใน 30 นาที ฟรีค่าแรง ฟรีค่าเดินทาง</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่าง 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งพิกัดมาได้เลย</a>
    </div>
    <p style="margin-top:1.5rem;"><a href="/battery-replacement" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">เปลี่ยนแบตเตอรี่รถยนต์ นอกสถานที่ บางนา แบริ่ง ลาซาล</a></p>
    <p style="margin-top:0.75rem;"><a href="/alternator-starter" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ซ่อมไดชาร์จ ไดสตาร์ท นอกสถานที่ บางนา ลาซาล →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) เมื่อรถแบตหมดในซอย</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: รถจอดอยู่ในซอยแคบมาก ช่างจะเข้าไปได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> เข้าได้แน่นอนครับ ทีม PORNPISIT BATTERY ใช้มอเตอร์ไซค์ในการออกบริการฉุกเฉิน ทำให้สามารถลัดเลาะเข้าซอยแคบ ซอยตัน หรือแม้แต่ลานจอดรถใต้ดินของคอนโดที่รถกระบะเข้าไม่ได้ครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ถ้าแบตหมดตอนกลางคืน ตี 2 ยังมีช่างมาไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> มีครับ! เราเปิดให้บริการตลอด 24 ชั่วโมง ไม่มีวันหยุด ไม่ว่าดึกแค่ไหนในเขต ห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์ แพรกษา เรามีช่างสแตนด์บายพร้อมออกไปช่วยเหลือทันที</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ถ้าเรียกมาแล้ว ไม่ใช่ปัญหาที่แบตเตอรี่ จะคิดเงินยังไง?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ช่างจะนำเครื่องมือไปเช็กให้ที่หน้างานก่อนเสมอครับ ถ้าวัดแล้วแบตเตอรี่ยังดีอยู่ แต่ปัญหาเกิดจากไดสตาร์ทหรือไดชาร์จเสีย เราจะประเมินราคาซ่อมให้ทราบก่อน หากลูกค้าตกลงซ่อมก็ดำเนินการต่อได้เลย (เรามีบริการ<a href="/alternator-starter" class="text-orange-600 font-bold hover:underline">ซ่อมไดชาร์จ ไดสตาร์ท นอกสถานที่</a>ด้วยครับ)</p>
    </div>
  </div>

</div>
`
};

// ============================================================
// 3. Insert into local DB
// ============================================================
const insertSql = `
  INSERT INTO Post (
    id, slug, title, excerpt, content, coverImage, category, tags, published, author,
    seoTitle, seoDescription, seoKeywords, ogTitle, ogDescription, createdAt, updatedAt
  ) VALUES (
    lower(hex(randomblob(16))), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')
  )
`;

const db = new Database('prisma/dev.db');
try {
  const existing = db.prepare('SELECT id FROM Post WHERE slug = ?').get(post.slug);
  if (existing) {
    db.prepare('DELETE FROM Post WHERE slug = ?').run(post.slug);
    console.log('Deleted existing post with same slug.');
  }

  db.prepare(insertSql).run(
    post.slug, post.title, post.excerpt, post.content, post.coverImage,
    post.category, post.tags, post.published, post.author,
    post.seoTitle, post.seoDescription, post.seoKeywords,
    post.ogTitle, post.ogDescription
  );
  console.log('✅ Blog post inserted into local DB.');
} catch (e) {
  console.error('❌ Error:', e);
} finally {
  db.close();
}
