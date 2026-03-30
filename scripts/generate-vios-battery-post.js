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
    <rect x="0" y="0" width="180" height="40" rx="20" fill="rgba(255,107,0,0.15)" stroke="#FF6B00" stroke-width="1.5"/>
    <text x="90" y="26" font-family="Prompt, sans-serif" font-size="18" font-weight="bold" fill="#FF6B00" text-anchor="middle">CASE STUDY 2026</text>
  </g>
  <g transform="translate(80, 180)">
    <text font-family="Prompt, sans-serif" font-weight="900" fill="#FFFFFF">
      <tspan x="0" y="0" font-size="72">แบตเตอรี่ Toyota Vios</tspan>
      <tspan x="0" y="90" font-size="58">หมด สตาร์ทไม่ติด แก้ยังไง?</tspan>
    </text>
    <text x="0" y="160" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">รีวิวเปลี่ยนแบตด่วนนอกสถานที่ โซนบางนา - ศรีนครินทร์</text>
    <text x="0" y="210" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">แนะนำสเปกแบต 46B24L / MF พร้อมราคา</text>
  </g>
  <g transform="translate(750, 150)">
    <circle cx="200" cy="200" r="180" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
    <text x="200" y="180" font-family="Prompt, sans-serif" font-size="64" text-anchor="middle" fill="#FF6B00">🐷 🔋</text>
    <text x="200" y="240" font-family="Prompt, sans-serif" font-size="24" text-anchor="middle" fill="#94A3B8">FIRSTCAR MASCOT</text>
  </g>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 🔍 🔋</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ตรวจเช็กค่า CCA แบตเตอรี่ Toyota Vios</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ลานจอดรถเซ็นทรัลบางนา</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔋 ✅ 🎉</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เปลี่ยนแบต Vios เสร็จ สตาร์ทติดทันที!</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: หมู่บ้านแถวซอยลาซาล สุขุมวิท 105</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔧 📊 ⚡</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">วัดไฟไดชาร์จหลังเปลี่ยนแบต 14.2V ปกติ</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโดแถวซอยแบริ่ง สุขุมวิท 107</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-vios-battery-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'vios-battery-case-check.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'vios-battery-case-done.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'vios-battery-case-alternator.svg'), inline3Svg);
console.log('✅ SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "แบตเตอรี่ Toyota Vios หมด สตาร์ทไม่ติด แก้ยังไง? รีวิวเปลี่ยนแบตด่วนถึงที่",
  slug: "toyota-vios-battery-replacement-guide",
  excerpt: "รถ Toyota Vios สตาร์ทไม่ติด แบตหมดกลางทาง? ดูเคสจริงเปลี่ยนแบตเตอรี่ Vios นอกสถานที่ โซนห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง พร้อมแนะนำวิธีเลือกแบตเตอรี่ที่คุ้มค่าและอยู่ทน",
  coverImage: "/images/blog/pig-vios-battery-cover.svg",
  category: "ซ่อมบำรุง",
  tags: "แบตเตอรี่รถยนต์,แบตเตอรี่ Toyota Vios,เปลี่ยนแบตนอกสถานที่,สตาร์ทไม่ติด,แบตเตอรี่ 46B24L,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "แบตเตอรี่ Toyota Vios ราคา+รีวิว เปลี่ยนแบตด่วนถึงที่ ห้วยขวาง ดินแดง ลาดพร้าว",
  seoDescription: "รีวิวเปลี่ยนแบตเตอรี่ Toyota Vios นอกสถานที่ 24 ชม. ห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง เทพารักษ์ แนะนำรุ่นแบตที่เหมาะกับ Vios พร้อมราคาอัปเดต",
  seoKeywords: "แบตเตอรี่ Toyota Vios, เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่, แบตเตอรี่รถยนต์ บางนา, แบตเตอรี่ 46B24L, Vios สตาร์ทไม่ติด",
  ogTitle: "แบตเตอรี่ Toyota Vios สตาร์ทไม่ติด ทำไงดี? รีวิวเปลี่ยนแบตถึงที่ โซนบางนา",
  ogDescription: "เจาะลึกเคส Toyota Vios แบตหมดกลางทาง พร้อมวิธีเลือกแบตเตอรี่ให้ตรงรุ่น เรียกช่างด่วน 24 ชม. ฟรีค่าแรง",
  content: `
<p class="lead"><strong>แบตเตอรี่ Toyota Vios</strong> เป็นอะไหล่ที่เจ้าของรถรุ่นนี้ต้องเปลี่ยนบ่อยที่สุดอันดับต้นๆ เพราะ Vios ขายดีมากในไทย ใช้กันทั้งเป็นรถส่วนตัวและรถแท็กซี่ วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาเล่าเคสจริงที่ออกไปช่วยลูกค้า <strong>Toyota Vios สตาร์ทไม่ติด</strong> กลางทางในพื้นที่ <strong>ห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง ลาซาล</strong> พร้อมแนะนำเคล็ดลับเลือก<a href="/battery-replacement" class="text-orange-600 font-bold hover:underline">แบตเตอรี่รถยนต์</a>ให้อยู่ทนและคุ้มค่าที่สุดครับ</p>

<h2>อาการเตือนว่า แบตเตอรี่ Toyota Vios กำลังจะหมด</h2>
<p>ก่อนที่รถจะดับสนิท แบตเตอรี่จะส่งสัญญาณเตือนให้เราสังเกตได้ล่วงหน้าหลายวัน หากเจออาการเหล่านี้ ควรรีบเตรียมตัวเปลี่ยนแบตเตอรี่ได้เลยครับ:</p>
<ul>
  <li><strong>สตาร์ทตอนเช้าเริ่มหน่วง:</strong> เสียงไดสตาร์ทหมุนช้าลง "อืดๆ" ไม่สดใสเหมือนเดิม โดยเฉพาะตอนเช้ามืดที่อากาศเย็น</li>
  <li><strong>ไฟหน้าริบหรี่ตอนจอดเครื่องเดินเบา:</strong> เมื่อเปิดแอร์ เปิดไฟหน้า เปิดวิทยุพร้อมกัน แล้วสังเกตว่าไฟหน้าหรี่ลงชัดเจน แสดงว่าแบตเตอรี่เริ่มเก็บไฟไม่อยู่</li>
  <li><strong>กุญแจรีโมทไม่ตอบสนอง:</strong> บางครั้งกดรีโมทล็อค/ปลดล็อคต้องกดหลายครั้ง หรือแตรดังเบาลง</li>
  <li><strong>อายุแบตเตอรี่เกิน 2 ปี:</strong> สำหรับ Toyota Vios ที่ใช้งานในกรุงเทพฯ และปริมณฑล รถติดบ่อยๆ อายุเฉลี่ยแบตเตอรี่จะอยู่ราวๆ 1.5 - 2.5 ปีครับ</li>
</ul>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/vios-battery-case-check.svg" alt="ช่างตรวจเช็กค่า CCA แบตเตอรี่ Toyota Vios ที่ลานจอดรถเซ็นทรัลบางนา" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study: Vios สตาร์ทไม่ติดกลางลานจอดเซ็นทรัลบางนา</h2>
<p>เมื่อไม่กี่วันก่อน ลูกค้าท่านหนึ่งโทรเข้ามาด่วน แจ้งว่าจอดรถ <strong>Toyota Vios 2022</strong> ไว้ที่ลานจอด <strong>เซ็นทรัลบางนา ชั้น B2</strong> ตอนบ่ายสาม พอจะกลับบ้านปรากฏว่ารถสตาร์ทไม่ติดเลย ไฟหน้าปัดติดริบหรี่ กดสตาร์ทแล้วมีแต่เสียง "แชะ แชะ" ลูกค้าลองจัมป์สตาร์ทขอพลังจากรถคันข้างๆ สตาร์ทติดได้ แต่พอดับเครื่องอีกทีก็สตาร์ทไม่ได้อีก</p>

<p>ทีม PORNPISIT BATTERY รับสายแล้ว ช่างรีบจัดแบตเตอรี่ที่ตรงรุ่น Vios ขึ้นมอเตอร์ไซค์ฝ่ารถติดช่วงเย็นมุ่งหน้าไปยังจุดเกิดเหตุ ถึงภายใน <strong>25 นาที</strong> พอถึงหน้างาน ช่างใช้เครื่องวัดแบตเตอรี่ดิจิทัลเช็กค่า CCA (Cold Cranking Amps) พบว่าตกเหลือเพียง <strong>120 CCA จากเกณฑ์ปกติ 380 CCA</strong> ยืนยันชัดเจนว่าแบตเตอรี่เสื่อมสภาพหนัก เก็บไฟไม่ได้แล้ว</p>

<h3>ขั้นตอนการเปลี่ยนแบตเตอรี่ Toyota Vios อย่างปลอดภัย</h3>
<ol>
  <li><strong>ต่อเครื่องเลี้ยงไฟ ECU (Memory Saver):</strong> ก่อนถอดแบตเตอรี่เก่า ช่างจะต่ออุปกรณ์สำรองไฟเข้าช่อง OBD2 เพื่อป้องกันข้อมูลในกล่อง ECU หาย เช่น รอบเดินเบา นาฬิกา รหัสวิทยุ และค่า Adaptive ต่างๆ</li>
  <li><strong>ถอดขั้วแบตเตอรี่เก่า — ขั้วลบก่อน:</strong> เพื่อป้องกันไฟฟ้าลัดวงจร จากนั้นถอดขั้วบวก แล้วคลายตัวยึดแบตเตอรี่ออก</li>
  <li><strong>ทำความสะอาดขั้วแบต:</strong> ถ้ามีคราบซัลเฟต (ขี้เกลือขาวๆ) ช่างจะใช้น้ำร้อนล้างและแปรงขัดทำความสะอาดให้ฟรี เพื่อการนำไฟฟ้าที่สมบูรณ์</li>
  <li><strong>ใส่แบตเตอรี่ลูกใหม่:</strong> ยึดล็อคให้แน่น ต่อขั้วบวกก่อน ตามด้วยขั้วลบ ทาจาระบีกันสนิมที่ขั้ว</li>
  <li><strong>เช็กระบบไดชาร์จ:</strong> สตาร์ทรถแล้ววัดแรงดันไฟจาก<a href="/alternator-starter" class="text-orange-600 font-bold hover:underline">ตรวจไดชาร์จรถยนต์</a> ต้องได้ 13.8 - 14.5 โวลต์ เพื่อให้แน่ใจว่าระบบชาร์จไฟยังทำงานดี ในเคสนี้วัดได้ 14.2V สบายมากครับ</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/vios-battery-case-done.svg" alt="เปลี่ยน แบตเตอรี่ Toyota Vios เสร็จเรียบร้อย หมู่บ้านแถวซอยลาซาล สุขุมวิท 105" class="w-full h-auto object-cover m-0" />
</div>

<h2>แบตเตอรี่ Toyota Vios ควรใช้ยี่ห้อไหน รุ่นอะไร?</h2>
<p>Toyota Vios ทุกเจเนอเรชัน (ตั้งแต่ปี 2003 จนถึงรุ่นล่าสุด 2026) มาตรฐานจากโรงงานจะใช้แบตเตอรี่ขนาดเล็ก <strong>ไซส์ 46B24L</strong> ขั้ว L (ขั้วซ้าย) แอมป์ประมาณ 36-45 Ah ซึ่งเป็นขนาดที่หาซื้อได้ง่ายมากและราคาไม่แพง ยี่ห้อที่ลูกค้าใน <strong>สมุทรปราการ แพรกษา เทพารักษ์</strong> นิยมใช้มีดังนี้ครับ:</p>

<h3>ยี่ห้อแบตเตอรี่ที่แนะนำสำหรับ Vios</h3>
<ul>
  <li><strong>GS Battery MF (46B24L):</strong> แบตเตอรี่กึ่งแห้ง ไม่ต้องเติมน้ำกลั่น ทนทาน จ่ายไฟเสถียร เป็นตัวเลือกยอดนิยมอันดับ 1 ราคาราวๆ 1,600 - 1,900 บาท</li>
  <li><strong>FB Battery Premium Gold (46B24L):</strong> อีกหนึ่งแบรนด์ไทยคุณภาพดี ราคาเริ่มต้นประมาณ 1,400 - 1,700 บาท คุ้มค่าสุดๆ</li>
  <li><strong>Panasonic MF (46B24L):</strong> แบรนด์ญี่ปุ่นที่มักติดรถมาจากศูนย์ รับประกัน 12 เดือน ราคาประมาณ 1,800 - 2,200 บาท</li>
  <li><strong>3K หรือ Boliden:</strong> ทางเลือกสำหรับผู้ที่ต้องการแบตเตอรี่ราคาประหยัดแต่ยังได้มาตรฐาน ราคาเริ่มต้น 1,200 - 1,500 บาท</li>
</ul>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/vios-battery-case-alternator.svg" alt="วัดไฟไดชาร์จหลังเปลี่ยน แบตเตอรี่ Toyota Vios คอนโดซอยแบริ่ง สุขุมวิท 107" class="w-full h-auto object-cover m-0" />
</div>

<h2>เคล็ดลับยืดอายุแบตเตอรี่ Toyota Vios ให้อยู่นาน</h2>
<p>จากประสบการณ์ของทีมช่างที่เปลี่ยนแบต Vios มาหลายร้อยคัน มีเคล็ดลับง่ายๆ ที่ช่วยยืดอายุแบตเตอรี่ได้ชัดเจน:</p>
<ul>
  <li><strong>อย่าจอดเปิดไฟเปิดแอร์ทิ้งนานโดยไม่สตาร์ทเครื่อง:</strong> นี่คือสาเหตุอันดับ 1 ที่ทำให้แบตเสื่อมเร็ว</li>
  <li><strong>ขับรถระยะสั้นบ่อยๆ ควรชาร์จแบตเสริม:</strong> หากขับแค่บ้าน-ปากซอยทุกวัน ไดชาร์จอาจชาร์จไฟไม่ทัน ลองขับออกทางด่วนบ้างเดือนละ 1-2 ครั้ง</li>
  <li><strong>หมั่นเช็กขั้วแบตเตอรี่:</strong> หากเห็นขี้เกลือขาวเกาะที่ขั้ว ใช้น้ำร้อนราดล้าง แล้วทาจาระบีป้องกัน</li>
  <li><strong>ถ้าไม่ได้ใช้รถนานเกิน 2 สัปดาห์:</strong> ควรถอดขั้วลบออก หรือใช้เครื่องชาร์จแบบ Trickle Charger ต่อเลี้ยงไว้</li>
</ul>

<h2>รถ Vios สตาร์ทไม่ติด แถวเทพารักษ์ แพรกษา สุขุมวิท เรียกเราได้ตลอด 24 ชม.</h2>
<p>ไม่ว่าคุณจะจอดรถเสียอยู่ที่ <strong>แยกเทพารักษ์ หน้าตลาดหนามแดง ซอยวัดหนามแดง สุขุมวิท 107 (แบริ่ง)</strong> หรือย่านลึกๆ อย่าง <strong>แพรกษา สมุทรปราการ</strong> ทีม PORNPISIT BATTERY มีช่างพร้อมแบตเตอรี่ทุกรุ่น ทุกยี่ห้อ สแตนด์บายตลอด 24 ชั่วโมง วิ่งไปเปลี่ยนให้ถึงหน้าบ้าน คอนโด ลานจอดห้าง หรือริมถนน โดยไม่ต้องจ่ายค่าลากรถเลยครับ</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">📞 บริการ 24 ชม. ถึงที่ทันที</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">แบตหมด สตาร์ทไม่ติด? เรียกช่างเปลี่ยนแบตถึงที่!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">ช่างพร้อมนำแบตเตอรี่แท้ไปเปลี่ยนให้ถึงที่ภายใน 30 นาที รับประกัน 1-2 ปี เช็กระบบไฟฟรี เลือกขนาดให้ตรงรุ่น Toyota Vios ทุกรุ่นปี</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่าง 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งรูปประเมินฟรี</a>
    </div>
    <p style="margin-top:1.5rem;"><a href="/battery-replacement" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">เปลี่ยนแบตเตอรี่รถยนต์ นอกสถานที่ ห้วยขวาง ดินแดง ลาดพร้าว</a></p>
    <p style="margin-top:0.75rem;"><a href="/alternator-starter" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ซ่อมไดชาร์จ ไดสตาร์ท นอกสถานที่ บางนา แบริ่ง →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) เรื่องแบตเตอรี่ Toyota Vios</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: แบตเตอรี่ Toyota Vios ราคาเท่าไหร่?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ราคาแบตเตอรี่ Toyota Vios ไซส์ 46B24L อยู่ที่ประมาณ 1,200 - 2,200 บาท ขึ้นอยู่กับยี่ห้อครับ โดยยี่ห้อ FB หรือ 3K จะเริ่มต้นที่ 1,200 บาท ส่วน GS หรือ Panasonic จะอยู่ที่ 1,600 - 2,200 บาท ทั้งนี้ราคามักจะรวมเทิร์นแบตลูกเก่าแล้ว</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: Vios สตาร์ทไม่ติด แต่ไฟหน้าปัดยังสว่าง ใช่แบตหมดไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ใช่ได้ครับ เพราะไฟหน้าปัดใช้กระแสไฟน้อยมากจึงยังติดได้ แต่ตอนสตาร์ทเครื่องยนต์ต้องการกระแสไฟสูงมาก (300-400 แอมป์ในเสี้ยววินาที) ดังนั้นถ้าแบตเตอรี่เสื่อม จะยังเปิดไฟได้แต่สตาร์ทไม่ขึ้น อีกสาเหตุหนึ่งที่ควรเช็กคือ<a href="/alternator-starter" class="text-orange-600 font-bold hover:underline">บริการซ่อมไดสตาร์ท</a>อาจมีปัญหาได้เช่นกันครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: เปลี่ยนแบต Vios เอง ต้องถอดขั้วไหนก่อน?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ถอดขั้วลบ (−) ก่อนเสมอครับ เพื่อป้องกันไฟฟ้าลัดวงจร และที่สำคัญ ก่อนถอดควรต่ออุปกรณ์เลี้ยงไฟ ECU ไว้ เพราะหากไฟตัดหมดจะทำให้เครื่องเดินเบาสะดุดหลังเปลี่ยนแบต และอาจต้อง Reset ECU ใหม่ครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: บริการนอกสถานที่ มาถึงเร็วแค่ไหน? มีค่าเดินทางไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> หากอยู่ในพื้นที่หลักอย่าง ศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ ช่างจะถึงภายใน 20-40 นาที และเรา <strong>ฟรีค่าแรง ฟรีค่าเดินทาง</strong> จ่ายเฉพาะค่าแบตเตอรี่ราคามาตรฐานเท่านั้นครับ บริการ 24 ชั่วโมงทุกวัน</p>
    </div>
  </div>

</div>
`
};

// ============================================================
// 3. Insert into local DB
// ============================================================
const db = new Database('prisma/dev.db');

const insertSql = `
  INSERT INTO Post (
    id, slug, title, excerpt, content, coverImage, category, tags, published, author,
    seoTitle, seoDescription, seoKeywords, ogTitle, ogDescription, createdAt, updatedAt
  ) VALUES (
    lower(hex(randomblob(16))), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')
  )
`;

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
