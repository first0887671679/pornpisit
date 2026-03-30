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
    <rect x="0" y="0" width="210" height="40" rx="20" fill="rgba(255,107,0,0.15)" stroke="#FF6B00" stroke-width="1.5"/>
    <text x="105" y="26" font-family="Prompt, sans-serif" font-size="18" font-weight="bold" fill="#FF6B00" text-anchor="middle">CASE STUDY 2026</text>
  </g>
  <g transform="translate(80, 180)">
    <text font-family="Prompt, sans-serif" font-weight="900" fill="#FFFFFF">
      <tspan x="0" y="0" font-size="68">ไดชาร์จเสีย 100,000 โล</tspan>
      <tspan x="0" y="85" font-size="56">รถดับกลางทาง แก้ยังไง?</tspan>
    </text>
    <text x="0" y="158" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">เจาะลึกอาการ สาเหตุ และราคาซ่อมจริง</text>
    <text x="0" y="208" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">รีวิวจากโซนห้วยขวาง ดินแดง ลาดพร้าว บางกะปิ บางเขน จตุจักร ดุสิต บางซื่อ</text>
  </g>
  <g transform="translate(750, 140)">
    <circle cx="200" cy="200" r="180" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
    <text x="200" y="170" font-family="Prompt, sans-serif" font-size="64" text-anchor="middle" fill="#FF6B00">🐷</text>
    <text x="200" y="230" font-family="Prompt, sans-serif" font-size="48" text-anchor="middle">⚡ 🔧</text>
    <text x="200" y="290" font-family="Prompt, sans-serif" font-size="20" text-anchor="middle" fill="#94A3B8">FIRSTCAR ALTERNATOR</text>
  </g>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 ⚠️ 🔋</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ไฟแบตเตอรี่ขึ้นที่หน้าปัด เลขไมล์ 112,000 กม.</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนศรีนครินทร์ ใกล้ซีคอนสแควร์</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔧 📊 ✅</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ตรวจเช็กไดชาร์จ วัดไฟ 14.3V ซ่อมเสร็จ!</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: หมู่บ้านลึกแถวซอยลาซาล สุขุมวิท 105</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">⚡ 🔩 💡</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">แปรงถ่านไดชาร์จสึกหมด เปลี่ยนแปรงใหม่</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ริมถนนเทพารักษ์ ใกล้ตลาดหนามแดง</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-alternator-100k-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'alternator-100k-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'alternator-100k-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'alternator-100k-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ไดชาร์จเสีย 100,000 โล อาการแบบไหน ซ่อมหรือเปลี่ยน? รีวิวเคสจริง",
  slug: "alternator-failure-100000km-guide",
  excerpt: "ไดชาร์จเสียที่ 100,000 โล เป็นเรื่องปกติไหม? มีอาการอะไร? ซ่อมหรือเปลี่ยนดี ราคาเท่าไหร่? อ่านเคสรีวิวจริงจากโซนห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์ พร้อมวิธีเช็กเบื้องต้น",
  category: "ซ่อมบำรุง",
  tags: "ไดชาร์จเสีย,ไดชาร์จเสีย 100000 โล,ไดชาร์จรถยนต์,ซ่อมไดชาร์จ,แปรงถ่านไดชาร์จ,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "ไดชาร์จเสีย 100,000 โล อาการยังไง? ซ่อมหรือเปลี่ยน? รีวิวราคาจริง",
  seoDescription: "ไดชาร์จเสียที่ 100,000 กม. ไฟไม่ชาร์จ รถดับกลางทาง? ดูอาการ สาเหตุ ราคาซ่อม และรีวิวเคสจริงจากช่างโซนห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์",
  seoKeywords: "ไดชาร์จเสีย 100000 โล, ไดชาร์จรถยนต์เสีย, ซ่อมไดชาร์จ ราคา, แปรงถ่านไดชาร์จ, ไดชาร์จไม่ชาร์จไฟ",
  ogTitle: "ไดชาร์จเสีย 100,000 โล อาการแบบไหน ซ่อมหรือเปลี่ยน? รีวิวจริง",
  ogDescription: "เจาะลึกปัญหาไดชาร์จเสียที่ 100,000 กม. พร้อมอาการเตือน ราคาซ่อม-เปลี่ยน และเคสรีวิวจากช่าง PORNPISIT BATTERY โซนห้วยขวาง ดินแดง ลาดพร้าว",
  coverImage: "/images/blog/pig-alternator-100k-cover.svg",
  content: `
<p class="lead">รถวิ่งมาจนเลขไมล์แตะหลักแสน แล้วจู่ๆ <strong>ไดชาร์จเสีย 100,000 โล</strong> ไฟแบตขึ้นที่หน้าปัด รถดับกลางทาง — เป็นเรื่องที่เจ้าของรถหลายท่านเจอจริงครับ จากประสบการณ์ของทีม <strong>PORNPISIT BATTERY</strong> ที่ออกบริการซ่อมไดชาร์จนอกสถานที่ในย่าน <strong>ศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ สมุทรปราการ</strong> เราพบว่ารถที่วิ่ง 80,000 - 120,000 กิโลเมตร จะเริ่มมีปัญหาไดชาร์จเป็นรุ่นแรกๆ วันนี้จะมาแชร์ข้อมูลทั้งหมดให้ครับ</p>

<h2>ไดชาร์จเสียที่ 100,000 กม. เป็นเรื่องปกติไหม?</h2>
<p>คำตอบคือ <strong>"ปกติครับ"</strong> ไดชาร์จ (Alternator) เป็นอุปกรณ์ที่ทำงานหนักมากในรถยนต์ มันต้องหมุนปั่นไฟตลอดเวลาที่เครื่องยนต์ทำงาน เพื่อผลิตไฟฟ้าส่งให้ระบบทุกอย่างในรถ ตั้งแต่ระบบจุดระเบิด ระบบฉีดเชื้อเพลิง แอร์ ไฟหน้า วิทยุ ไปจนถึงชาร์จไฟกลับเข้าแบตเตอรี่</p>

<p>ชิ้นส่วนที่มักเสียก่อนที่ระยะ 100,000 โลคือ:</p>
<ul>
  <li><strong>แปรงถ่าน (Carbon Brush):</strong> เป็นชิ้นส่วนสึกหรอ สัมผัสกับ Slip Ring ตลอดเวลา พอสึกจนหมดก็ไม่สามารถส่งไฟไปกระตุ้นขดลวดสนามแม่เหล็กได้ ทำให้ไดชาร์จหยุดผลิตไฟ</li>
  <li><strong>ลูกปืน (Bearing):</strong> รองรับแกนหมุน พอหมดสภาพจะมีเสียงดังหึ่งๆ หรือกรี๊ดตอนเร่งเครื่อง</li>
  <li><strong>เร็กกูเลเตอร์ (Voltage Regulator):</strong> ตัวควบคุมแรงดันไฟ หากเสียจะทำให้ไฟไม่คงที่ แบตเตอรี่ชาร์จมากเกินไป (Overcharge) หรือชาร์จไม่เข้าเลย</li>
</ul>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/alternator-100k-case1.svg" alt="ไฟแบตเตอรี่ขึ้นที่หน้าปัด ไดชาร์จเสีย 100,000 โล ถนนศรีนครินทร์ ใกล้ซีคอนสแควร์" class="w-full h-auto object-cover m-0" />
</div>

<h2>อาการเตือนว่าไดชาร์จกำลังจะเสีย</h2>
<p>ก่อนที่ไดชาร์จจะพังถาวร มักจะมีอาการเตือนให้สังเกตล่วงหน้า 1-2 สัปดาห์ หากเจออาการเหล่านี้ ควรรีบนำรถมาเช็กกับช่าง<a href="/alternator-starter" class="text-orange-600 font-bold hover:underline">ช่างซ่อมไดชาร์จนอกสถานที่</a>ทันทีครับ:</p>
<ul>
  <li><strong>ไฟรูปแบตเตอรี่ขึ้นที่หน้าปัด:</strong> สัญญาณชัดเจนที่สุด บ่งบอกว่าระบบชาร์จไฟมีปัญหา</li>
  <li><strong>ไฟหน้าหรี่ลงเวลาจอดเครื่องเดินเบา:</strong> แต่พอเร่งเครื่องแล้วไฟสว่างขึ้น นี่คืออาการ "ไดชาร์จอ่อน"</li>
  <li><strong>เสียงดังผิดปกติจากฝั่งสายพาน:</strong> เสียงหึ่ง เสียงกรอบแกรบ หรือเสียงแหลมกรี๊ดตอนสตาร์ท อาจเป็นลูกปืนไดชาร์จหมดอายุ</li>
  <li><strong>แบตเตอรี่หมดบ่อย:</strong> เปลี่ยนแบตใหม่ไปแล้ว แต่แบตหมดอีกภายใน 1-2 สัปดาห์ แสดงว่าไดชาร์จชาร์จไฟกลับเข้าแบตไม่ได้</li>
  <li><strong>กลิ่นไหม้คล้ายยาง:</strong> อาจเกิดจากสายพานลื่นหรือขดลวดในไดชาร์จไหม้</li>
</ul>

<h2>Case Study: Honda Jazz ไมล์ 112,000 กม. ไดชาร์จตายกลางถนนศรีนครินทร์</h2>
<p>เมื่อสัปดาห์ก่อน ลูกค้าท่านหนึ่งขับรถ Honda Jazz ปี 2018 ออกจากบ้านตอนเช้ามุ่งหน้าไปทำงาน ขับมาถึง <strong>ถนนศรีนครินทร์ ใกล้ซีคอนสแควร์</strong> ก็สังเกตเห็นว่า <strong>ไฟรูปแบตเตอรี่ขึ้นที่หน้าปัด</strong> เช็กเลขไมล์อยู่ที่ 112,000 กิโลเมตร ลูกค้าตัดสินใจขับต่อไปก่อน แต่ไม่ถึง 15 นาที แอร์เริ่มอ่อน วิทยุดับ จากนั้นเครื่องยนต์ก็ดับสนิทกลางจราจร!</p>

<p>ลูกค้าโทรหา PORNPISIT BATTERY ช่างของเราวิ่งมอเตอร์ไซค์ออกจากฐานย่าน <strong>บางนา</strong> ไปถึงจุดเกิดเหตุใน <strong>22 นาที</strong> ช่างใช้มิเตอร์วัดไฟที่ขั้วแบตเตอรี่ขณะสตาร์ทเครื่อง (จัมป์สตาร์ทก่อน) ได้แรงดันไฟเพียง <strong>11.8 โวลต์</strong> — ยืนยันชัดเจนว่าไดชาร์จไม่ทำงานแล้ว (ปกติต้องได้ 13.5 - 14.5V)</p>

<p>ช่างถอดตัวไดชาร์จมาเช็ก พบว่า <strong>แปรงถ่านสึกจนหมดเกลี้ยง</strong> และ <strong>เร็กกูเลเตอร์ไหม้</strong> จึงทำการเปลี่ยนทั้งแปรงถ่านและเร็กกูเลเตอร์ใหม่ หน้างานเลย จบงานใช้เวลาทั้งหมดประมาณ 45 นาที วัดไฟหลังซ่อมได้ <strong>14.3 โวลต์</strong> สมบูรณ์แบบ ลูกค้าขับรถไปทำงานต่อได้ทันที</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/alternator-100k-case2.svg" alt="ช่างซ่อม ไดชาร์จเสีย 100,000 โล ตรวจวัดไฟ 14.3V ซ่อมเสร็จ หมู่บ้านซอยลาซาล สุขุมวิท 105" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study: Toyota Hilux Revo ไมล์ 98,000 กม. แปรงถ่านสึกริมถนนเทพารักษ์</h2>
<p>อีกเคสที่น่าสนใจคือ Hilux Revo ที่วิ่งมาเกือบแตะแสนโล ลูกค้าสังเกตว่าเวลาจอดติดไฟแดงแถว <strong>แยกเทพารักษ์ ใกล้ตลาดหนามแดง</strong> ไฟหน้ามืดลงชัดเจน พอเร่งเครื่องไฟก็สว่างขึ้น — อาการ "ไดชาร์จอ่อน" ต้นแบบเลยครับ</p>

<p>ช่างออกไปเช็กที่บ้านลูกค้าย่าน <strong>แพรกษา สมุทรปราการ</strong> วัดไฟไดชาร์จขณะเครื่องเดินเบาได้เพียง 12.1V (ต่ำกว่าเกณฑ์มาก) ถอดไดชาร์จมาเปิดดู พบว่า <strong>แปรงถ่านเหลือความยาวไม่ถึง 2 มิลลิเมตร</strong> จากเดิมที่ควรยาว 12-15 มม. ช่างเปลี่ยนแปรงถ่านคู่ใหม่ให้ ใช้เวลาเพียง 30 นาที ค่าใช้จ่ายไม่กี่ร้อยบาท ไม่ต้องเปลี่ยนไดชาร์จทั้งลูก ลูกค้าประหยัดไปหลายพัน!</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/alternator-100k-case3.svg" alt="เปลี่ยนแปรงถ่านไดชาร์จ ไดชาร์จเสีย 100,000 โล ริมถนนเทพารักษ์ ใกล้ตลาดหนามแดง" class="w-full h-auto object-cover m-0" />
</div>

<h2>ไดชาร์จเสีย ซ่อมหรือเปลี่ยนดี? ราคาเท่าไหร่?</h2>
<p>คำตอบขึ้นอยู่กับอาการเสียครับ:</p>

<h3>กรณีที่ซ่อมได้ (ประหยัดกว่า)</h3>
<ul>
  <li><strong>เปลี่ยนแปรงถ่าน:</strong> ราคาประมาณ 300 - 800 บาท (รวมค่าแรง) เหมาะสำหรับไดชาร์จที่แค่แปรงถ่านสึก แต่ขดลวดและตัวถังยังดี</li>
  <li><strong>เปลี่ยนเร็กกูเลเตอร์:</strong> ราคาประมาณ 800 - 1,500 บาท ถ้าตัวควบคุมแรงดันเสีย แต่ไดชาร์จส่วนอื่นยังใช้ได้</li>
  <li><strong>เปลี่ยนลูกปืน:</strong> ราคาประมาณ 400 - 1,000 บาท สำหรับกรณีที่ลูกปืนหมดแต่ขดลวดยังดี</li>
</ul>

<h3>กรณีที่ต้องเปลี่ยนทั้งลูก</h3>
<ul>
  <li><strong>ไดชาร์จมือสอง (ราคาไม่รวมค่าแรง):</strong> 2,500 - 5,000 บาท แล้วแต่รุ่นรถ</li>
  <li><strong>ไดชาร์จใหม่ (ราคาไม่รวมค่าแรง):</strong> 4,000 - 12,000 บาท ขึ้นอยู่กับยี่ห้อรถ (รถยุโรปจะแพงกว่ารถญี่ปุ่น)</li>
</ul>

<h2>รถวิ่งเกินแสนโล ไดชาร์จมีปัญหา? เรียก PORNPISIT BATTERY ได้เลย</h2>
<p>ไม่ว่ารถจะเสียแถว <strong>แยกห้วยขวาง ดินแดง ลาดพร้าว หน้าซีคอนสแควร์ เซ็นทรัลบางนา</strong> หรือลึกเข้าไปใน <strong>สุขุมวิท 105 (ลาซาล) แบริ่ง เทพารักษ์ แพรกษา สมุทรปราการ</strong> ช่างของเรามีเครื่องมือและอะไหล่พร้อม สามารถวินิจฉัยและซ่อมไดชาร์จได้หน้างานทันที ไม่ต้องลากรถไปอู่ ไม่ต้องจ่ายค่ารถสไลด์ให้เปลืองเงินครับ</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">📞 บริการ 24 ชม. ถึงที่ทันที</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">ไดชาร์จเสีย รถดับกลางทาง? เรียกช่างตรวจถึงที่!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">ช่างพร้อมอุปกรณ์และอะไหล่ไดชาร์จครบชุด วินิจฉัยอาการถึงที่ ซ่อมได้ก็ซ่อม เปลี่ยนต้องเปลี่ยน ตรงไปตรงมา ไม่โขกราคา</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่าง 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ แจ้งอาการรถฟรี</a>
    </div>
    <p style="margin-top:1.5rem;"><a href="/alternator-starter" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">บริการซ่อมไดชาร์จ ไดสตาร์ท นอกสถานที่ ห้วยขวาง ดินแดง ลาดพร้าว</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ แบริ่ง เทพารักษ์ →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) เรื่องไดชาร์จเสีย</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ไดชาร์จเสีย แต่แบตเตอรี่ยังเต็ม ขับรถต่อได้ไกลแค่ไหน?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ขึ้นอยู่กับประจุไฟที่เหลือในแบตเตอรี่ครับ โดยเฉลี่ยถ้าแบตเตอรี่ยังชาร์จเต็มอยู่ ปิดแอร์ ปิดวิทยุ ปิดไฟที่ไม่จำเป็นทั้งหมด คุณอาจขับได้ประมาณ 20-40 นาที แต่ <strong>ไม่แนะนำให้ขับต่อเด็ดขาด</strong> เพราะอาจดับกลางทางในจุดที่อันตราย ควรจอดที่ปลอดภัยแล้วเรียกช่างจะดีที่สุดครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ไดชาร์จเสีย ทำให้แบตเตอรี่เสียตามด้วยไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> เป็นไปได้ครับ หากเร็กกูเลเตอร์เสียแบบ Overcharge (ปล่อยไฟเข้าแบตมากเกินไป) จะทำให้<a href="/battery-replacement" class="text-orange-600 font-bold hover:underline">แบตเตอรี่รถยนต์</a>เดือด น้ำกรดระเหย อายุสั้นลงอย่างรวดเร็ว ในทางกลับกัน ถ้าไดชาร์จไม่ชาร์จเลย แบตเตอรี่จะถูก Deep Discharge ซ้ำๆ ซึ่งทำให้แผ่นธาตุเสื่อมถาวรเช่นกัน</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ซ่อมไดชาร์จนอกสถานที่ได้จริงหรือ? ต้องยกเข้าอู่ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ได้จริงครับ! ช่าง PORNPISIT BATTERY สามารถถอดไดชาร์จ ตรวจวินิจฉัย และซ่อม (เปลี่ยนแปรงถ่าน เร็กกูเลเตอร์ ลูกปืน) ได้ที่หน้างานเลย โดยไม่ต้องนำรถเข้าอู่ ให้บริการในพื้นที่ ศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ ตลอด 24 ชั่วโมงครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ไดชาร์จเสียกับไดสตาร์ทเสีย ต่างกันยังไง?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> <strong>ไดชาร์จ</strong>ทำหน้าที่ปั่นไฟชาร์จแบตเตอรี่ขณะเครื่องยนต์ทำงาน ถ้าเสีย อาการคือ ไฟแบตขึ้นที่หน้าปัด รถดับกลางทาง แบตหมดบ่อย ส่วน <strong>ไดสตาร์ท</strong>ทำหน้าที่หมุนเครื่องยนต์ตอนสตาร์ท ถ้าเสีย อาการคือ สตาร์ทไม่ติดเลย บิดกุญแจแล้วเงียบสนิท ทั้งสองอย่างเราซ่อมนอกสถานที่ได้หมดครับ</p>
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
