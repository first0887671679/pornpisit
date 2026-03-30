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
    <rect x="0" y="0" width="280" height="40" rx="20" fill="rgba(255,107,0,0.15)" stroke="#FF6B00" stroke-width="1.5"/>
    <text x="140" y="26" font-family="Prompt, sans-serif" font-size="18" font-weight="bold" fill="#FF6B00" text-anchor="middle">DIAGNOSTIC GUIDE 2026</text>
  </g>
  <g transform="translate(80, 180)">
    <text font-family="Prompt, sans-serif" font-weight="900" fill="#FFFFFF">
      <tspan x="0" y="0" font-size="70">ไดสตาร์ทพัง อาการ</tspan>
      <tspan x="0" y="88" font-size="56">เป็นแบบไหน? เช็กเองได้!</tspan>
    </text>
    <text x="0" y="158" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">รีวิวอาการจริง + เคสซ่อมนอกสถานที่</text>
    <text x="0" y="208" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">โซนห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์ สมุทรปราการ</text>
  </g>
  <g transform="translate(750, 140)">
    <circle cx="200" cy="200" r="180" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
    <text x="200" y="170" font-family="Prompt, sans-serif" font-size="64" text-anchor="middle" fill="#FF6B00">🐷</text>
    <text x="200" y="235" font-family="Prompt, sans-serif" font-size="48" text-anchor="middle">🔑 ❌</text>
    <text x="200" y="290" font-family="Prompt, sans-serif" font-size="20" text-anchor="middle" fill="#94A3B8">FIRSTCAR STARTER FIX</text>
  </g>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔑 🚗 💀</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">บิดกุญแจแล้วเงียบสนิท ไดสตาร์ทไม่หมุน</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ลานจอดรถตลาดหนามแดง เทพารักษ์</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔧 ⚙️ ✅</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ถอดไดสตาร์ทเปลี่ยนแปรงถ่าน สตาร์ทติดทันที</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโดแถวซอยแบริ่ง สุขุมวิท 107</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">📊 🔋 ⚡</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เช็กระบบไฟและแบตเตอรี่คู่กัน ครบจบ</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: หมู่บ้านแถวลาซาล สุขุมวิท 105</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-starter-symptoms-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'starter-symptoms-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'starter-symptoms-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'starter-symptoms-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ไดสตาร์ทพัง อาการเป็นแบบไหน? วิธีเช็กเบื้องต้น + รีวิวซ่อมจริง",
  slug: "starter-motor-failure-symptoms-guide",
  excerpt: "รวมอาการไดสตาร์ทพังที่พบบ่อย บิดกุญแจแล้วเงียบ เสียงดังแปลกๆ สตาร์ทไม่ติด พร้อมวิธีเช็กด้วยตัวเอง และเคสซ่อมจริงจากช่างนอกสถานที่ โซนห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์",
  category: "ซ่อมบำรุง",
  tags: "ไดสตาร์ทพัง,ไดสตาร์ทเสีย,สตาร์ทไม่ติด,ซ่อมไดสตาร์ท,แปรงถ่านไดสตาร์ท,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "ไดสตาร์ทพัง อาการเป็นแบบไหน? เช็กเอง+ราคาซ่อม โซนบางนา",
  seoDescription: "รวมอาการไดสตาร์ทพังที่ต้องรู้ บิดกุญแจแล้วเงียบ เสียงแชะๆ สตาร์ทไม่ติด วิธีเช็กเบื้องต้น+รีวิวเคสซ่อมจริง โซนห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์",
  seoKeywords: "ไดสตาร์ทพัง อาการ, ไดสตาร์ทเสีย, สตาร์ทไม่ติด, ซ่อมไดสตาร์ทนอกสถานที่, แปรงถ่านไดสตาร์ท",
  ogTitle: "ไดสตาร์ทพัง อาการเป็นแบบไหน? วิธีเช็ก + รีวิวซ่อมจริง",
  ogDescription: "เจาะลึกอาการไดสตาร์ทพังทุกแบบ พร้อมเคสรีวิวซ่อมนอกสถานที่จากช่าง PORNPISIT BATTERY โซนห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์",
  coverImage: "/images/blog/pig-starter-symptoms-cover.svg",
  content: `
<p class="lead">บิดกุญแจแล้วรถเงียบสนิท? หรือได้ยินเสียง "แชะ แชะ" แต่เครื่องยนต์ไม่ยอมหมุน? นี่คืออาการทั่วไปที่บ่งบอกว่า <strong>ไดสตาร์ทพัง</strong> ครับ จากสถิติของ PORNPISIT BATTERY ที่ออกบริการซ่อมนอกสถานที่ในย่าน <strong>ห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง ลาซาล เทพารักษ์ สมุทรปราการ</strong> ปัญหา <strong>ไดสตาร์ทพัง อาการ</strong>ต่างๆ ติดอันดับ Top 3 ของเรื่องที่ลูกค้าโทรมาปรึกษาบ่อยที่สุด วันนี้จะมาอธิบายให้ครบทุกอาการ พร้อมวิธีเช็กเบื้องต้นด้วยตัวเองครับ</p>

<h2>อาการไดสตาร์ทพัง 5 แบบที่พบบ่อยที่สุด</h2>
<p>ไดสตาร์ท (Starter Motor) คือมอเตอร์ไฟฟ้าที่ทำหน้าที่หมุนเฟืองเข้าไปขบกับล้อช่วยแรง (Flywheel) เพื่อหมุนเครื่องยนต์ให้ติด เมื่อไดสตาร์ทเริ่มมีปัญหา จะแสดงอาการได้หลายรูปแบบ:</p>

<h3>1. บิดกุญแจ / กดปุ่ม Start แล้วเงียบสนิท</h3>
<p>นี่คือ <strong>อาการไดสตาร์ทพัง</strong>ที่คนตกใจมากที่สุด เพราะไม่มีเสียงอะไรเลย ราวกับรถตาย ไฟหน้าปัดอาจยังสว่างปกติ แต่กดสตาร์ทแล้วไม่เกิดอะไรขึ้น สาเหตุมักเกิดจาก:</p>
<ul>
  <li><strong>แปรงถ่านไดสตาร์ทสึกหมด:</strong> ไม่สามารถส่งไฟไปกระตุ้นมอเตอร์ได้</li>
  <li><strong>โซลินอยด์ (Solenoid) เสีย:</strong> ตัวสวิตช์แม่เหล็กไม่ทำงาน จึงไม่มีไฟเข้าไดสตาร์ท</li>
  <li><strong>สายไฟหรือขั้วแบตเตอรี่หลวม/ขาด:</strong> กระแสไฟส่งไม่ถึงไดสตาร์ท</li>
</ul>

<h3>2. ได้ยินเสียง "แชะ" หรือ "คลิก" แต่เครื่องไม่หมุน</h3>
<p>เสียง "แชะ" เพียงครั้งเดียวแล้วเงียบ หรือ "แชะ แชะ แชะ" ถี่ๆ หลายครั้ง อาการนี้มักเกิดจาก:</p>
<ul>
  <li><strong>โซลินอยด์ทำงานแต่หน้าสัมผัสไหม้:</strong> ส่งไฟไปกระตุ้นได้ แต่หน้าสัมผัสภายในเสื่อม ไม่สามารถปล่อยกระแสไฟสูงๆ ผ่านไปยังมอเตอร์ได้</li>
  <li><strong>แบตเตอรี่อ่อน:</strong> มีไฟพอให้โซลินอยด์ดึง แต่ไม่พอหมุนมอเตอร์ (ควรเช็ก<a href="/battery-replacement" class="text-orange-600 font-bold hover:underline">เปลี่ยนแบตเตอรี่รถยนต์</a>ควบคู่เสมอ)</li>
</ul>

<h3>3. เสียง "กรี๊ด" หรือ "ซี่ด" ดังแหลมตอนสตาร์ท</h3>
<p>เฟืองไดสตาร์ท (Pinion Gear) เข้าขบกับล้อช่วยแรงไม่สนิท ทำให้เกิดเสียงโลหะขูดกัน อาการนี้อันตรายมากเพราะหากปล่อยไว้จะทำให้ฟันเฟืองทั้งสองฝั่งสึกบิ่น ค่าซ่อมจะแพงขึ้นเป็นเท่าตัว</p>

<h3>4. สตาร์ทติดบ้างไม่ติดบ้าง (ติดๆ ดับๆ)</h3>
<p>บางทีกดสตาร์ทครั้งแรกไม่ติด กดครั้งที่สอง ครั้งที่สาม ถึงจะติด นี่คืออาการ <strong>ไดสตาร์ทพัง</strong>แบบค่อยเป็นค่อยไป แปรงถ่านอาจเหลือบางส่วนที่ยังสัมผัสได้ แต่ไม่คงที่แล้ว <strong>อย่ารอให้พังถาวรครับ!</strong></p>

<h3>5. เครื่องยนต์หมุนช้ามาก "อืดๆ" ก่อนจะติด</h3>
<p>ถ้าเสียงสตาร์ทหมุนช้ากว่าปกติ อาจเกิดจากไดสตาร์ทเริ่มเสื่อม หรือแบตเตอรี่อ่อน ควรตรวจเช็กทั้งสองจุดพร้อมกัน</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/starter-symptoms-case1.svg" alt="อาการ ไดสตาร์ทพัง บิดกุญแจแล้วเงียบสนิท ลานจอดรถตลาดหนามแดง เทพารักษ์" class="w-full h-auto object-cover m-0" />
</div>

<h2>วิธีเช็กเบื้องต้นว่าเป็นไดสตาร์ทจริงหรือไม่</h2>
<p>ก่อนจะโทรเรียกช่าง ลองเช็กเบื้องต้นได้ดังนี้ครับ:</p>
<ol>
  <li><strong>เช็กไฟหน้าปัด:</strong> ถ้าเปิดกุญแจแล้วไฟหน้าปัดสว่างปกติ แสดงว่าแบตเตอรี่ยังมีไฟ ปัญหาน่าจะอยู่ที่ไดสตาร์ท แต่ถ้าไฟหน้าปัดหรี่มากหรือไม่ติดเลย อาจเป็นแบตเตอรี่หมดแทน</li>
  <li><strong>เปิดไฟหน้าแล้วลองสตาร์ท:</strong> ถ้าไฟหน้าไม่หรี่เลยตอนกดสตาร์ท แสดงว่าไฟไม่ได้ถูกส่งไปที่ไดสตาร์ท (โซลินอยด์หรือสายไฟมีปัญหา) แต่ถ้าไฟหน้าหรี่ลงแรงแต่เครื่องไม่หมุน อาจเป็นตัวมอเตอร์ไดสตาร์ทล็อค</li>
  <li><strong>ลองเคาะตัวไดสตาร์ทเบาๆ:</strong> ใช้ด้ามไขควงหรือแท่งเหล็กเคาะที่ตัวไดสตาร์ท (ติดอยู่ด้านล่างของเครื่องยนต์) แล้วลองสตาร์ทอีกครั้ง ถ้าติด แสดงว่าแปรงถ่านสึกและค้างอยู่ ต้องเปลี่ยนแปรงถ่านแน่นอน</li>
</ol>

<h2>Case Study: Nissan March สตาร์ทไม่ติดที่ลานจอดตลาดหนามแดง</h2>
<p>ลูกค้าท่านหนึ่งขับรถ Nissan March ปี 2019 ไปจ่ายตลาดที่ <strong>ตลาดหนามแดง เทพารักษ์</strong> ตอนเช้า ซื้อของเสร็จกลับขึ้นรถ กดปุ่มสตาร์ทแล้วได้ยินแค่เสียง "แชะ" เพียงครั้งเดียว แล้วเงียบสนิท กดซ้ำอีก 4-5 ครั้ง ก็ยังไม่ติด</p>

<p>ลูกค้าโทรหา PORNPISIT BATTERY ช่างรับสายแล้วสอบถามอาการเบื้องต้น สันนิษฐานว่าน่าจะเป็น <strong>ไดสตาร์ทพัง</strong> จึงเตรียมอุปกรณ์ครบชุด ขี่มอเตอร์ไซค์ออกจากฐานย่าน <strong>บางนา</strong> มุ่งหน้าไป <strong>เทพารักษ์</strong> ถึงหน้างานใน <strong>25 นาที</strong></p>

<p>ช่างเปิดฝากระโปรงตรวจเช็กขั้วแบตเตอรี่ก่อน พบว่าขั้วแน่นดี วัดแรงดันแบตได้ 12.6V (ปกติ) จากนั้นใช้เครื่องมือทดสอบสัญญาณไฟที่สายไดสตาร์ท พบว่ามีไฟส่งไปถึงโซลินอยด์ แต่มอเตอร์ไม่หมุน ยืนยันว่า <strong>ไดสตาร์ทเสียจริง</strong></p>

<p>ช่างถอดไดสตาร์ทออกมาเปิดฝาดู พบว่า <strong>แปรงถ่านเหลือแค่ 1 มิลลิเมตร</strong> (ปกติต้อง 10-12 มม.) จึงเปลี่ยนแปรงถ่านคู่ใหม่ ประกอบกลับ ใส่คืน สตาร์ทรถ — <strong>ติดฉึ่งเลยครับ!</strong> ลูกค้าดีใจมากที่ไม่ต้องลากรถไปอู่และจ่ายค่าซ่อมเพียงไม่กี่ร้อยบาท</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/starter-symptoms-case2.svg" alt="ซ่อม ไดสตาร์ทพัง เปลี่ยนแปรงถ่าน สตาร์ทติดทันที คอนโดซอยแบริ่ง สุขุมวิท 107" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study: Toyota Camry ไดสตาร์ทพังกลางซอยลาซาล ตอน 5 ทุ่ม</h2>
<p>อีกเคสที่ตื่นเต้นไม่แพ้กัน ลูกค้าขับ Toyota Camry ปี 2017 กลับจากทำงาน จอดรถเข้าบ้านใน <strong>หมู่บ้านแถวซอยลาซาล (สุขุมวิท 105)</strong> ดับเครื่อง เข้าบ้านทานข้าว พอจะออกไปธุระตอน 5 ทุ่ม ปรากฏว่ากดสตาร์ทแล้วได้ยินเสียง "กรี๊ด" ดังแหลม เครื่องยนต์ไม่ยอมหมุน</p>

<p>ช่างออกไปถึงบ้านลูกค้าใน 30 นาที ตรวจพบว่า <strong>เฟืองไดสตาร์ท (Pinion) ค้าง</strong> ไม่ยืดออกไปขบกับ Flywheel ตามปกติ ช่างถอดไดสตาร์ทมาทำความสะอาดกลไก หล่อลื่นแกนเฟือง และเปลี่ยนสปริงดีดกลับตัวใหม่ ทดสอบสตาร์ท 5 ครั้งติดต่อกัน ทุกครั้งติดเรียบร้อย ช่างยังตรวจวัดไฟ<a href="/alternator-starter" class="text-orange-600 font-bold hover:underline">ตรวจไดชาร์จรถยนต์</a>และเช็ก<a href="/battery-replacement" class="text-orange-600 font-bold hover:underline">เปลี่ยนแบตเตอรี่รถยนต์</a>ให้ฟรีอีกด้วย ครบจบในที่เดียว</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/starter-symptoms-case3.svg" alt="เช็กระบบไฟและ ไดสตาร์ทพัง ครบจบในที่เดียว หมู่บ้านลาซาล สุขุมวิท 105" class="w-full h-auto object-cover m-0" />
</div>

<h2>ไดสตาร์ทพัง ซ่อมหรือเปลี่ยน? ราคาเท่าไหร่?</h2>

<h3>กรณีซ่อมได้ (ประหยัดกว่า)</h3>
<ul>
  <li><strong>เปลี่ยนแปรงถ่าน:</strong> 300 - 800 บาท (รวมค่าแรง) — กรณีที่แค่แปรงถ่านสึก ตัวไดสตาร์ทยังดี</li>
  <li><strong>เปลี่ยนโซลินอยด์:</strong> 800 - 1,500 บาท — หน้าสัมผัสไหม้ แต่มอเตอร์ยังทำงานได้</li>
  <li><strong>เปลี่ยนเฟืองไดสตาร์ท (Pinion):</strong> 500 - 1,200 บาท — เฟืองบิ่นหรือค้าง</li>
</ul>

<h3>กรณีต้องเปลี่ยนทั้งลูก</h3>
<ul>
  <li><strong>ไดสตาร์ทมือสอง:</strong> 2,000 - 4,500 บาท (ไม่รวมค่าแรง)</li>
  <li><strong>ไดสตาร์ทใหม่:</strong> 3,500 - 10,000 บาท ขึ้นอยู่กับรุ่นรถ</li>
</ul>

<h2>ไดสตาร์ทพัง อาการชัด ไม่ต้องลากรถ เรียกช่างถึงที่!</h2>
<p>ไม่ว่ารถจะจอดเสียอยู่ที่ <strong>ตลาดหนามแดง แยกเทพารักษ์ ซอยวัดหนามแดง</strong> หรือลึกเข้าไปใน <strong>แบริ่ง ลาซาล ศรีนครินทร์ แพรกษา สมุทรปราการ</strong> ช่าง PORNPISIT BATTERY พร้อมนำเครื่องมือและอะไหล่วิ่งไปซ่อมให้ถึงที่ตลอด 24 ชั่วโมง วินิจฉัยหน้างาน ซ่อมได้ก็ซ่อม ตรงไปตรงมา ไม่ต้องลากรถไปอู่ให้เสียเวลาและเสียเงินเพิ่มครับ</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">📞 บริการ 24 ชม. ถึงที่ทันที</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">สตาร์ทไม่ติด ไดสตาร์ทมีปัญหา? เรียกช่างมาเช็กถึงที่!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">ช่างพร้อมเครื่องมือและอะไหล่ไดสตาร์ทครบชุด ถอด-เช็ก-ซ่อมได้ถึงที่ ฟรีค่าตรวจเช็ก ฟรีค่าเดินทาง จ่ายเฉพาะค่าอะไหล่+แรง</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่าง 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ แจ้งอาการรถฟรี</a>
    </div>
    <p style="margin-top:1.5rem;"><a href="/alternator-starter" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">บริการเปลี่ยนไดสตาร์ท ซ่อมไดชาร์จ นอกสถานที่ ลาซาล ศรีนครินทร์</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ ลาซาล แบริ่ง →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) เรื่องไดสตาร์ทพัง</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ไดสตาร์ทพังกับแบตหมด อาการต่างกันยังไง?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ถ้า <strong>แบตหมด</strong> — ไฟหน้าปัดจะหรี่หรือไม่ติดเลย กดสตาร์ทแล้วมีเสียง "แชะๆ" ถี่ๆ หรือเงียบสนิท ถ้า <strong>ไดสตาร์ทพัง</strong> — ไฟหน้าปัดจะสว่างปกติ (เพราะแบตยังดี) แต่กดสตาร์ทแล้วไม่มีเสียงมอเตอร์หมุน หรือมีเสียงคลิกเพียงครั้งเดียว วิธีเช็กง่ายสุดคือเปิดไฟหน้า ถ้ายังสว่างจ้า น่าจะเป็นไดสตาร์ทครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ไดสตาร์ทพังแล้วจัมป์สตาร์ทจะช่วยได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ถ้าเป็นไดสตาร์ทพังจริงๆ จัมป์สตาร์ทจะ <strong>ไม่ช่วย</strong> ครับ เพราะจัมป์สตาร์ทคือการเพิ่มกำลังไฟให้แบตเตอรี่ แต่ถ้าตัวมอเตอร์ไดสตาร์ทเสีย มีไฟเท่าไหร่ก็ไม่หมุน ยกเว้นกรณีที่แปรงถ่านค้าง บางทีจัมป์สตาร์ทแรงๆ อาจทำให้แปรงขยับแล้วสตาร์ทติดได้ แต่เป็นแค่ชั่วคราว ควรนำไปซ่อมทันที</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ซ่อมไดสตาร์ทนอกสถานที่ ใช้เวลานานไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> โดยเฉลี่ยใช้เวลาประมาณ 30-60 นาทีครับ ขึ้นอยู่กับรุ่นรถและตำแหน่งติดตั้งไดสตาร์ท รถบางรุ่น (เช่น Honda, Toyota) ไดสตาร์ทอยู่ตำแหน่งที่เข้าถึงง่าย ถอดได้ไว แต่รถยุโรปบางรุ่นอาจต้องถอดชิ้นส่วนอื่นออกก่อน ทำให้ใช้เวลามากขึ้นเล็กน้อย</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ช่างมาถึงเร็วแค่ไหน? ครอบคลุมพื้นที่ไหนบ้าง?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ในพื้นที่หลักอย่าง ศรีนครินทร์ บางนา แบริ่ง ลาซาล สุขุมวิท เทพารักษ์ แพรกษา สมุทรปราการ ช่างจะถึงภายใน 20-40 นาที บริการตลอด 24 ชั่วโมง ทุกวัน ฟรีค่าเดินทางและค่าตรวจเช็กครับ</p>
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
