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
      <tspan x="0" y="0" font-size="72">ไฟรูปเครื่องโชว์</tspan>
      <tspan x="0" y="88" font-size="54">ขับต่อได้ไหม? อันตรายไหม?</tspan>
    </text>
    <text x="0" y="158" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">สาเหตุ วิธีเช็กเบื้องต้น + เคสรีวิวจริง</text>
    <text x="0" y="208" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">โซนบางนา ศรีนครินทร์ เทพารักษ์ สมุทรปราการ</text>
  </g>
  <g transform="translate(750, 140)">
    <circle cx="200" cy="200" r="180" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
    <text x="200" y="170" font-family="Prompt, sans-serif" font-size="64" text-anchor="middle" fill="#FF6B00">🐷</text>
    <text x="200" y="235" font-family="Prompt, sans-serif" font-size="48" text-anchor="middle">🔧 🚨</text>
    <text x="200" y="290" font-family="Prompt, sans-serif" font-size="20" text-anchor="middle" fill="#94A3B8">FIRSTCAR DIAGNOSTIC</text>
  </g>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 🔶 ⚠️</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ไฟเครื่องยนต์ (Check Engine) ขึ้นค้างที่หน้าปัด</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนศรีนครินทร์ ใกล้พาราไดซ์พาร์ค</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔧 📊 ✅</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ต่อเครื่องอ่านโค้ด OBD2 สแกนหา Error Code</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: หน้าหมู่บ้านแถวซอยลาซาล สุขุมวิท 105</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">⚡ 🔋 🎉</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">แก้ไขเสร็จ ไฟเครื่องดับ รถวิ่งปกติ!</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ลานจอดรถเซ็นทรัลบางนา</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-check-engine-light-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'check-engine-light-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'check-engine-light-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'check-engine-light-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ไฟรูปเครื่องโชว์ ขับต่อได้ไหม? สาเหตุ วิธีเช็ก + รีวิวแก้ไขจริง",
  slug: "check-engine-light-on-guide",
  excerpt: "ไฟรูปเครื่องโชว์ที่หน้าปัดรถ ขึ้นแล้วขับต่อได้ไหม? อันตรายแค่ไหน? รวมสาเหตุที่พบบ่อย วิธีเช็กเบื้องต้น พร้อมเคสจริงจากช่างนอกสถานที่ โซนบางนา ศรีนครินทร์ เทพารักษ์",
  category: "ซ่อมบำรุง",
  tags: "ไฟรูปเครื่องโชว์,Check Engine Light,ไฟเครื่องขึ้น,รถมีปัญหา,OBD2,สมุทรปราการ,บางนา",
  published: 1,
  author: "FIRSTCARCENTER",
  seoTitle: "ไฟรูปเครื่องโชว์ ขับต่อได้ไหม? สาเหตุ+วิธีเช็ก โซนบางนา",
  seoDescription: "ไฟรูปเครื่องโชว์ขึ้นที่หน้าปัด อันตรายไหม? รวมสาเหตุ วิธีเช็กเบื้องต้น และรีวิวเคสแก้ไขจริงจากช่างนอกสถานที่ 24 ชม. โซนบางนา ศรีนครินทร์ เทพารักษ์",
  seoKeywords: "ไฟรูปเครื่องโชว์, Check Engine Light, ไฟเครื่องยนต์ขึ้น, สแกนโค้ด OBD2, ไฟเตือนหน้าปัด",
  ogTitle: "ไฟรูปเครื่องโชว์ ขับต่อได้ไหม? อันตรายไหม? สาเหตุ+วิธีแก้",
  ogDescription: "เจาะลึกสาเหตุไฟรูปเครื่องโชว์ทุกกรณี พร้อมเคสรีวิวแก้ไขจริงจากช่าง FirstCarCenter โซนบางนา ศรีนครินทร์ เทพารักษ์",
  coverImage: "/images/blog/pig-check-engine-light-cover.svg",
  content: `
<p class="lead">ขับรถอยู่ดีๆ แล้วจู่ๆ <strong>ไฟรูปเครื่องโชว์</strong> ขึ้นค้างที่หน้าปัด ไฟสีเหลืองอำพันรูปเครื่องยนต์ที่หลายคนเรียกว่า "Check Engine Light" มันติดขึ้นมาแล้วทำให้หัวใจเต้นตุบๆ ทันที คำถามแรกในหัวคือ "ขับต่อได้ไหม? อันตรายหรือเปล่า?" วันนี้ <strong>FirstCarCenter</strong> จะมาอธิบายให้ครบทุกกรณี พร้อมเคสรีวิวจริงจากการออกบริการในพื้นที่ <strong>บางนา ศรีนครินทร์ แบริ่ง ลาซาล เทพารักษ์ สมุทรปราการ</strong> ครับ</p>

<h2>ไฟรูปเครื่องโชว์ คืออะไร? ทำไมถึงขึ้น?</h2>
<p><strong>ไฟรูปเครื่องโชว์</strong> (Check Engine Light / Malfunction Indicator Lamp - MIL) คือไฟเตือนจากกล่อง ECU (สมองกลรถยนต์) ที่บอกว่าระบบใดระบบหนึ่งในรถทำงานผิดปกติ ECU จะจับสัญญาณจากเซ็นเซอร์หลายสิบตัวทั่วรถ เมื่อตรวจพบค่าผิดปกติจะบันทึกเป็น Error Code (DTC) และสั่งให้ไฟเตือนติดขึ้น</p>

<p>สิ่งสำคัญที่ต้องรู้คือ ไฟรูปเครื่องมี <strong>2 แบบ</strong> ที่ต้องแยกให้ออก:</p>
<ul>
  <li><strong>ไฟติดค้าง (สีเหลือง):</strong> หมายถึงระบบตรวจพบปัญหา แต่ยังไม่ถึงขั้นฉุกเฉิน ขับต่อได้อย่างระมัดระวังและควรนำรถไปเช็กโดยเร็ว</li>
  <li><strong>ไฟกะพริบ (สีเหลืองกะพริบ):</strong> <strong>อันตราย!</strong> หมายถึงเครื่องยนต์มีปัญหาเร่งด่วน เช่น จังหวะจุดระเบิดผิดพลาด (Misfire) ซึ่งอาจทำให้แคทตาไลติกคอนเวอร์เตอร์เสียหาย ควรจอดรถทันทีและเรียกช่าง</li>
</ul>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/check-engine-light-case1.svg" alt="ไฟรูปเครื่องโชว์ Check Engine Light ขึ้นค้างที่หน้าปัด ถนนศรีนครินทร์ ใกล้พาราไดซ์พาร์ค" class="w-full h-auto object-cover m-0" />
</div>

<h2>10 สาเหตุที่ทำให้ไฟรูปเครื่องโชว์ (พบบ่อยที่สุด)</h2>
<p>จากสถิติของทีมช่าง FirstCarCenter ที่ออกบริการในโซน <strong>บางนา-ศรีนครินทร์-สมุทรปราการ</strong> สาเหตุที่ทำให้ <strong>ไฟรูปเครื่องโชว์</strong>ขึ้นบ่อยที่สุดมีดังนี้:</p>
<ol>
  <li><strong>ฝาถังน้ำมันปิดไม่สนิท:</strong> สาเหตุอันดับ 1 ที่เจอบ่อยมาก! ฝาถังน้ำมันหลวมหรือยางขอบฝาเสื่อม ทำให้ระบบ EVAP ตรวจจับแรงดันไอน้ำมันรั่ว</li>
  <li><strong>เซ็นเซอร์ออกซิเจน (O2 Sensor) เสื่อม:</strong> ใช้วัดปริมาณออกซิเจนในไอเสีย หากเสื่อมจะทำให้เครื่องจ่ายน้ำมันผิดเพี้ยน สิ้นเปลืองน้ำมันขึ้น</li>
  <li><strong>หัวเทียนหรือสายหัวเทียนเสื่อม:</strong> ทำให้จังหวะจุดระเบิดผิดพลาด (Misfire) เครื่องสะดุด กระตุก</li>
  <li><strong>คอยล์จุดระเบิด (Ignition Coil) เสีย:</strong> ส่งไฟไปหัวเทียนไม่ได้ ทำให้เครื่องยนต์สะดุดเป็นจังหวะ</li>
  <li><strong>เซ็นเซอร์ MAF (Mass Air Flow) สกปรก:</strong> ตัววัดปริมาณอากาศสกปรกจนอ่านค่าผิด ทำให้การผสมเชื้อเพลิงไม่สมดุล</li>
  <li><strong>แคทตาไลติกคอนเวอร์เตอร์เสื่อม:</strong> พบในรถที่วิ่งเกิน 100,000 กม. หรือรถที่เคย Misfire นานจนตัวกรองอุดตัน</li>
  <li><strong>วาล์ว EGR อุดตัน:</strong> เขม่าสะสมจนวาล์วเปิดปิดไม่สนิท ทำให้ไอเสียย้อนกลับผิดปกติ</li>
  <li><strong>ปั๊มน้ำมันเชื้อเพลิงอ่อน:</strong> แรงดันน้ำมันไม่พอ เครื่องยนต์ทำงานไม่เต็มที่</li>
  <li><strong>ระบบไฟไดชาร์จผิดปกติ:</strong> <a href="/alternator-starter" class="text-orange-600 font-bold hover:underline">ซ่อมไดชาร์จรถยนต์</a>ชาร์จไฟแรงเกินหรือน้อยเกิน ECU จับค่าผิดปกติ</li>
  <li><strong>แบตเตอรี่อ่อนมาก:</strong> แรงดันไฟต่ำจนเซ็นเซอร์บางตัวทำงานผิดพลาด ลองเช็ก<a href="/battery-replacement" class="text-orange-600 font-bold hover:underline">เปลี่ยนแบตเตอรี่รถยนต์</a>ดูครับ</li>
</ol>

<h2>Case Study: Honda Civic ไฟรูปเครื่องโชว์ขึ้นกลางทางสายศรีนครินทร์</h2>
<p>ลูกค้าขับรถ Honda Civic ปี 2020 วิ่งบน <strong>ถนนศรีนครินทร์ ช่วงใกล้ห้างพาราไดซ์พาร์ค</strong> อยู่ดีๆ สังเกตเห็น <strong>ไฟรูปเครื่องโชว์</strong>ติดขึ้นค้าง พร้อมกับรู้สึกว่าเครื่องยนต์มีอาการกระตุกเบาๆ ตอนจอดติดไฟแดง ลูกค้าไม่กล้าขับต่อ จึงแวะจอดข้างทางแล้วโทรหา FirstCarCenter</p>

<p>ช่างออกจากฐานย่าน <strong>บางนา</strong> ถึงหน้างานใน <strong>20 นาที</strong> พร้อมเครื่องสแกนโค้ด OBD2 ต่อเข้าช่องใต้คอพวงมาลัย สแกนพบรหัส <strong>P0301 - Cylinder 1 Misfire Detected</strong> ช่างตรวจเช็กต่อพบว่า <strong>คอยล์จุดระเบิดสูบที่ 1 เสีย</strong> ส่งไฟไปหัวเทียนไม่ได้ จึงเปลี่ยนคอยล์ตัวใหม่ให้หน้างาน ล้างโค้ด ทดสอบขับ — เครื่องเดินเรียบ ไฟเครื่องดับ จบ!</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/check-engine-light-case2.svg" alt="ช่างต่อเครื่องสแกนโค้ด OBD2 เช็ก ไฟรูปเครื่องโชว์ หน้าหมู่บ้านซอยลาซาล สุขุมวิท 105" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study: Toyota Yaris ไฟเครื่องขึ้นเพราะฝาถังน้ำมันหลวม!</h2>
<p>เคสนี้ขำปนโล่งใจครับ ลูกค้าขับ Toyota Yaris เพิ่งเติมน้ำมันจากปั๊มแถว <strong>แยกเทพารักษ์ ใกล้ตลาดหนามแดง</strong> ขับออกไปได้ไม่ถึง 10 นาที <strong>ไฟรูปเครื่องโชว์</strong>ก็ขึ้น ลูกค้าตกใจมาก คิดว่ารถพังหนัก</p>

<p>ช่างของเราออกไปเช็กให้ที่บ้านลูกค้าย่าน <strong>แพรกษา สมุทรปราการ</strong> ต่อเครื่องสแกนพบรหัส <strong>P0442 - EVAP System Small Leak</strong> ช่างเดินไปดูฝาถังน้ำมัน พบว่าฝาปิดไม่แน่นสนิท (ไม่ได้ยินเสียงคลิก) แค่ปิดฝาให้แน่นจนคลิก แล้วล้างโค้ด ขับไปสักพัก ไฟก็ดับเองครับ <strong>ไม่ต้องจ่ายค่าซ่อมสักบาทเดียว!</strong></p>

<h2>ไฟรูปเครื่องโชว์ เช็กเบื้องต้นเองได้ยังไง?</h2>
<ol>
  <li><strong>เช็กฝาถังน้ำมันก่อน:</strong> ลองเปิดแล้วปิดใหม่ให้แน่นจนได้ยินเสียง "คลิก" แล้วขับต่อ หากไฟดับภายใน 1-2 วัน ก็คือปัญหานี้เอง</li>
  <li><strong>สังเกตอาการขับ:</strong> รถกระตุกไหม? เครื่องสั่นไหม? แรงตกไหม? น้ำมันหมดเร็วกว่าปกติไหม? ถ้ามีอาการร่วมด้วย ควรหยุดขับแล้วเรียกช่าง</li>
  <li><strong>ไฟกะพริบ = จอดทันที:</strong> ถ้าไฟรูปเครื่อง <strong>กะพริบ</strong> อย่าขับต่อเด็ดขาด! จอดข้างทางแล้วโทรเรียกช่าง เพราะ Misfire ที่ปล่อยทิ้งไว้จะทำลายแคทฯ ซึ่งราคาซ่อมแพงหลายหมื่น</li>
  <li><strong>ใช้เครื่องสแกน OBD2:</strong> ปัจจุบันมีเครื่องสแกนราคาถูกเสียบช่อง OBD2 ใต้คอพวงมาลัย แล้วอ่านโค้ดผ่านแอปในมือถือได้เลย แต่ถ้าไม่มีเครื่อง เรียก FirstCarCenter ไปสแกนให้ฟรี!</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/check-engine-light-case3.svg" alt="แก้ไข ไฟรูปเครื่องโชว์ เสร็จ ไฟเครื่องดับ รถวิ่งปกติ ลานจอดรถเซ็นทรัลบางนา" class="w-full h-auto object-cover m-0" />
</div>

<h2>ไฟรูปเครื่องโชว์ ขับต่อได้ไหน? เรียก FirstCarCenter ช่วยเช็กถึงที่!</h2>
<p>ไม่ว่า <strong>ไฟรูปเครื่องโชว์</strong>จะขึ้นตอนขับอยู่บน <strong>ถนนศรีนครินทร์ หน้าซีคอนสแควร์ แยกบางนา ถนนสุขุมวิท</strong> หรือจอดอยู่ในซอยลึกๆ แถว <strong>แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</strong> ช่าง FirstCarCenter พร้อมเครื่องสแกนโค้ดมืออาชีพ วิ่งไปวินิจฉัยให้ถึงที่ตลอด 24 ชั่วโมง สแกนโค้ดฟรี! บอกสาเหตุชัดเจน ประเมินค่าใช้จ่ายตรงไปตรงมา</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">📞 บริการ 24 ชม. ถึงที่ทันที</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">ไฟเครื่องขึ้น ไม่แน่ใจว่าอะไร? สแกนโค้ดฟรี!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">ช่างพร้อมเครื่องสแกน OBD2 ระดับมืออาชีพ วิ่งไปอ่านโค้ดให้ถึงที่ บอกสาเหตุชัดเจน ประเมินราคาซ่อมตรงไปตรงมา ไม่มีค่าสแกน</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0887671679" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่าง 088-767-1679</a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งรูปหน้าปัดมาได้เลย</a>
    </div>
    <p style="margin-top:1.5rem;"><a href="/alternator-starter" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">บริการซ่อมไดชาร์จ ไดสตาร์ท นอกสถานที่ ศรีนครินทร์ บางนา</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ บางนา ลาซาล →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) เรื่องไฟรูปเครื่องโชว์</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ไฟรูปเครื่องโชว์ขึ้นแล้วขับต่อได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ถ้าไฟ <strong>ติดค้าง (ไม่กะพริบ)</strong> และรถยังขับปกติ ไม่กระตุก ไม่สั่น สามารถขับไปถึงจุดหมายหรือร้านซ่อมได้ครับ แต่อย่าทิ้งไว้นาน ควรเช็กภายใน 1-2 วัน ถ้าไฟ <strong>กะพริบ</strong> อย่าขับต่อเด็ดขาด! จอดทันทีแล้วเรียกช่างครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ไฟรูปเครื่องโชว์ขึ้นแล้วดับเอง ต้องไปเช็กไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ควรไปเช็กครับ เพราะถึงไฟจะดับไป แต่ ECU มักจะยังเก็บ Error Code ไว้ในหน่วยความจำ (Pending DTC) ช่างสามารถสแกนอ่านโค้ดย้อนหลังได้ เพื่อตรวจหาสาเหตุที่แท้จริงก่อนที่มันจะกลับมาขึ้นอีก</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: สแกนโค้ดราคาเท่าไหร่? FirstCarCenter คิดค่าสแกนไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> <strong>ฟรีครับ!</strong> เราไม่คิดค่าสแกนโค้ดและค่าวินิจฉัยเบื้องต้น ช่างจะบอกสาเหตุและประเมินค่าซ่อมให้ทราบก่อน ลูกค้าตัดสินใจเอง ถ้าซ่อมกับเราก็ดำเนินการได้เลย ถ้าไม่ซ่อมก็ไม่เสียค่าใช้จ่ายอะไรครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ไฟรูปเครื่องโชว์กับไฟแบตเตอรี่ ต่างกันยังไง?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> <strong>ไฟรูปเครื่อง</strong> (รูปเครื่องยนต์ สีเหลือง) บอกว่าระบบเครื่องยนต์หรือเซ็นเซอร์มีปัญหา ส่วน <strong>ไฟแบตเตอรี่</strong> (รูปแบต สีแดง) บอกว่าระบบชาร์จไฟมีปัญหา เช่น ไดชาร์จเสีย หรือสายพานขาด ทั้งสองอาการเราออกไปเช็กให้ถึงที่ได้หมดครับ</p>
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
