const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// ============================================================
// 1. Generate SVG images
// ============================================================
const imgDir = path.join(__dirname, '../public/images/blog');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const pigMascotDef = `
    <g id="pig-mascot">
      <circle cx="0" cy="0" r="160" fill="url(#glow-orange)" opacity="0.6"/>
      <ellipse cx="0" cy="150" rx="130" ry="35" fill="#0B0F19" filter="url(#shadow)"/>
      <ellipse cx="0" cy="140" rx="120" ry="30" fill="url(#glass-grad)" stroke="rgba(255,107,0,0.3)" stroke-width="2"/>
      
      <!-- Body/Uniform -->
      <path d="M-65,140 C-75,50 -45,10 0,10 C45,10 75,50 65,140 Z" fill="url(#cap-grad)" filter="url(#shadow-sm)"/>
      
      <!-- Overalls/Suspenders -->
      <path d="M-40,60 L40,60 L50,140 L-50,140 Z" fill="#1E293B"/>

      <!-- Wrench -->
      <g transform="translate(-75, 75) rotate(-30)">
        <rect x="-8" y="-40" width="16" height="90" rx="4" fill="url(#silver)" filter="url(#shadow-sm)"/>
        <circle cx="0" cy="-45" r="18" fill="url(#silver)"/>
        <circle cx="0" cy="-45" r="8" fill="#1E293B"/>
        <circle cx="0" cy="0" r="18" fill="url(#pig-skin)"/>
      </g>

      <!-- Head -->
      <rect x="-60" y="-55" width="120" height="100" rx="45" fill="url(#pig-skin)" filter="url(#shadow-sm)"/>
      
      <!-- Ears -->
      <path d="M-45,-30 Q-65,-80 -20,-50 Z" fill="url(#pig-skin)"/>
      <path d="M45,-30 Q65,-80 20,-50 Z" fill="url(#pig-skin)"/>

      <!-- Snout -->
      <ellipse cx="0" cy="-5" rx="28" ry="18" fill="url(#pig-snout)" filter="url(#shadow-sm)"/>
      <ellipse cx="-10" cy="-5" rx="4" ry="7" fill="#A8325D"/>
      <ellipse cx="10" cy="-5" rx="4" ry="7" fill="#A8325D"/>
      <path d="M-8,8 Q0,15 8,8" fill="none" stroke="#A8325D" stroke-width="2" stroke-linecap="round"/>

      <!-- Eyes -->
      <circle cx="-25" cy="-22" r="7" fill="#0B0F19"/>
      <circle cx="-23" cy="-24" r="2.5" fill="#FFFFFF"/>
      <circle cx="25" cy="-22" r="7" fill="#0B0F19"/>
      <circle cx="27" cy="-24" r="2.5" fill="#FFFFFF"/>

      <!-- Cap -->
      <path d="M-65,-45 Q0,-85 65,-45 L70,-25 L-70,-25 Z" fill="url(#cap-grad)" filter="url(#shadow-sm)"/>
      <rect x="-75" y="-25" width="150" height="14" rx="7" fill="#FF3E00"/>
      <circle cx="0" cy="-48" r="14" fill="#FFFFFF" filter="url(#shadow-sm)"/>
      <!-- Cap Logo -->
      <path d="M-6,-48 L6,-48 L0,-56 Z M-6,-45 L6,-45 L0,-37 Z" fill="#FF6B00"/>

      <!-- Battery on the right -->
      <g transform="translate(70, 70) rotate(15)">
        <rect x="-25" y="-30" width="50" height="60" rx="6" fill="#1E293B" stroke="#00F2FE" stroke-width="2" filter="url(#shadow-sm)"/>
        <rect x="-18" y="-36" width="10" height="6" fill="#FF3E00"/>
        <rect x="8" y="-36" width="10" height="6" fill="#94A3B8"/>
        <!-- Lightning symbol on battery -->
        <path d="M2,-15 L-8,5 L-2,5 L-2,15 L8,-5 L2,-5 Z" fill="#00F2FE"/>
        <circle cx="0" cy="0" r="18" fill="url(#pig-skin)"/>
      </g>
    </g>
`;

const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050914"/>
      <stop offset="100%" stop-color="#12182B"/>
    </linearGradient>
    <radialGradient id="glow-orange" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF6B00" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#FF6B00" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-blue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#00F2FE" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF6B00"/>
      <stop offset="100%" stop-color="#FF3E00"/>
    </linearGradient>
    <linearGradient id="text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.08)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.02)"/>
    </linearGradient>
    <linearGradient id="pig-skin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE4E1"/>
      <stop offset="100%" stop-color="#FFB6C1"/>
    </linearGradient>
    <linearGradient id="pig-snout" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF9EBB"/>
      <stop offset="100%" stop-color="#E67396"/>
    </linearGradient>
    <linearGradient id="cap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF8C00"/>
      <stop offset="100%" stop-color="#D32F2F"/>
    </linearGradient>
    <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="50%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000" flood-opacity="0.5"/>
    </filter>
    <filter id="shadow-sm" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
    ${pigMascotDef}
  </defs>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;800&amp;display=swap');
    text { font-family: 'Prompt', sans-serif; }
  </style>

  <rect width="1200" height="630" fill="url(#bg-grad)"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.5"/>

  <circle cx="1200" cy="0" r="600" fill="url(#glow-orange)"/>
  <circle cx="0" cy="630" r="500" fill="url(#glow-blue)"/>

  <path d="M 0 500 Q 300 450 600 550 T 1200 500 L 1200 630 L 0 630 Z" fill="url(#glass-grad)"/>
  <path d="M 0 550 Q 400 500 800 600 T 1200 550 L 1200 630 L 0 630 Z" fill="#FF6B00" opacity="0.1"/>

  <g transform="translate(80, 200)">
    <rect x="0" y="-80" width="220" height="40" rx="20" fill="url(#glass-grad)" stroke="#FF6B00" stroke-width="1.5"/>
    <text x="110" y="-55" font-size="15" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">EMERGENCY GUIDE</text>

    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">ขับรถทางไกลไดชาร์จพัง</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">รถติดจนฮีท ดับกลางทาง!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวช่วยเหลือฉุกเฉิน โซนบางนา ศรีนครินทร์</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">FIRSTCARCENTER</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔥 🚗 🛑</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถติดหนัก ความร้อนสะสม ไดชาร์จน็อคกลางทาง</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ทางด่วนบางนา-ตราด กม.8</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚨 🔋 📉</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ไฟรูปแบตเตอรี่โชว์ แอร์ไม่เย็น รถดับสตาร์ทไม่ติด</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: หน้าตลาดหนามแดง เทพารักษ์</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛠️ ⚡ 🚙</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ช่างนำแบตใหม่ไปเปลี่ยนให้ประคองขับถึงอู่</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ปั๊มน้ำมัน ถนนศรีนครินทร์</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-long-drive-alternator-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'long-drive-alternator-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'long-drive-alternator-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'long-drive-alternator-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ขับรถทางไกลไดชาร์จพัง! รถติดจนฮีททำรถดับกลางทาง รีวิววิธีแก้ปัญหา",
  slug: "long-drive-alternator-failure-guide",
  excerpt: "ขับรถทางไกลเจอรถติดหนักๆ ระวัง ขับรถทางไกลไดชาร์จพัง! ความร้อนสะสมทำไดชาร์จน็อค ไฟแบตโชว์ รถดับกลางทาง อ่านสาเหตุและรีวิวเรียกช่างช่วยเหลือ โซนศรีนครินทร์ บางนา เทพารักษ์",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "ขับรถทางไกลไดชาร์จพัง,ไดชาร์จเสีย,รถดับกลางทาง,ไฟรูปแบตโชว์,เปลี่ยนแบตเตอรี่นอกสถานที่,สมุทรปราการ,บางนา",
  published: 1,
  author: "FIRSTCARCENTER",
  seoTitle: "ขับรถทางไกลไดชาร์จพัง รถติดจนฮีท ทำไงดี? | โซนบางนา",
  seoDescription: "ขับรถทางไกลไดชาร์จพัง รถติดหนึบจนความร้อนสะสม ไฟรูปแบตเตอรี่โชว์ รถดับกลางทาง? อ่านสาเหตุและรีวิวเรียกช่างฉุกเฉิน โซนศรีนครินทร์ บางนา เทพารักษ์",
  seoKeywords: "ขับรถทางไกลไดชาร์จพัง, ไดชาร์จเสีย, รถดับกลางทาง, แบตเตอรี่รถยนต์หมด, ไฟรูปแบตโชว์, เปลี่ยนแบตเตอรี่นอกสถานที่",
  ogTitle: "ขับรถทางไกลไดชาร์จพัง! รถดับกลางทางทำไงดี?",
  ogDescription: "แชร์เคสรีวิวขับรถทางไกลแล้วเจอรถติดหนักจนไดชาร์จไหม้ พร้อมวิธีแก้ปัญหาเฉพาะหน้า โซนศรีนครินทร์-บางนา",
  coverImage: "/images/blog/pig-long-drive-alternator-cover.svg",
  content: `
<p class="lead">การขับรถทางไกลในช่วงเทศกาลหรือวันหยุดยาว สิ่งที่หนีไม่พ้นคือ "รถติดหนึบ" ใช่ไหมครับ? หลายคนเช็ครถมาอย่างดี แต่กลับมาเจอแจ็คพอต <strong>"ขับรถทางไกลไดชาร์จพัง"</strong> แอร์เริ่มไม่เย็น ไฟหน้าปัดโชว์รูปแบตเตอรี่ แล้วสุดท้ายรถก็ดับกลางอากาศ! วันนี้ <strong>FirstCarCenter</strong> จะมาเจาะลึกว่าทำไมรถติดนานๆ ถึงทำให้ไดชาร์จน็อค พร้อมแชร์เคสรีวิวการเข้าช่วยเหลือลูกค้าในย่าน <strong>บางนา ศรีนครินทร์ เทพารักษ์ แพรกษา สมุทรปราการ</strong> ครับ</p>

<h2>สัญญาณเตือน! ก่อนที่ ขับรถทางไกลไดชาร์จพัง กลางทาง</h2>
<p>ไดชาร์จ (Alternator) เป็นหัวใจสำคัญที่คอยปั่นไฟไปเลี้ยงระบบรถยนต์และชาร์จเข้าแบตเตอรี่ หากมันเริ่มงอแงขณะขับรถทางไกล จะมีสัญญาณเตือนดังนี้:</p>
<ol>
  <li><strong>ไฟรูปแบตเตอรี่สีแดงโชว์ที่หน้าปัด:</strong> นี่ไม่ได้แปลว่าแบตเสื่อมเสมอไปนะครับ แต่มันคือสัญญาณบอกว่า "ไดชาร์จหยุดปั่นไฟ" ทำให้รถต้องดึงไฟจากแบตเตอรี่มาใช้เพียวๆ</li>
  <li><strong>แอร์ค่อยๆ ไม่เย็น พัดลมแอร์เบาลง:</strong> เพราะระบบตัดไฟไปเลี้ยงส่วนที่จำเป็นก่อน</li>
  <li><strong>ไฟหน้าหรี่ลง กระจกไฟฟ้าอืด:</strong> ไฟฟ้าในรถเริ่มไม่พอ</li>
  <li><strong>มีเสียงหอน หรือกลิ่นไหม้:</strong> ลูกปืนไดชาร์จแตก หรือขดลวดทองแดงข้างในไหม้เนื่องจากความร้อนสูง</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/long-drive-alternator-case1.svg" alt="รถติดหนัก ความร้อนสะสม ขับรถทางไกลไดชาร์จพัง ทางด่วนบางนา-ตราด" class="w-full h-auto object-cover m-0" />
</div>

<h2>ทำไมรถติดทางไกล ถึงทำให้ไดชาร์จเสื่อมหรือพังเร็ว?</h2>
<p>ปัญหา <strong>ขับรถทางไกลไดชาร์จพัง</strong> มักเกิดจากการสะสมความร้อนครับ เมื่อรถติดขัดเป็นเวลานานๆ (เช่น บน <strong>ถนนบางนา-ตราด หรือ มอเตอร์เวย์</strong>) อากาศหน้ารถไม่หมุนเวียน ความร้อนสะสมในห้องเครื่องจะสูงมาก ในขณะเดียวกัน แอร์ก็ต้องทำงานหนัก พัดลมหม้อน้ำก็หมุนตลอดเวลา ทำให้ไดชาร์จต้องรับภาระปั่นไฟอย่างหนักหน่วงท่ามกลางความร้อนจัด พอเจอแบบนี้เข้าไป ไดชาร์จที่มีอายุการใช้งานมาระยะหนึ่ง จึงเกิดอาการ "ฮีท" ขดลวดไหม้ หรือเรกูเลเตอร์ (คัตเอาท์) พังสนิทครับ</p>

<h2>Case Study 1: ไดชาร์จน็อคกลางทาง แวะพักหน้าตลาดหนามแดง เทพารักษ์</h2>
<p>ลูกค้าขับรถจากชลบุรีกลับเข้ากรุงเทพฯ เจอรถติดสะสมยาว พอขับมาถึง <strong>ถนนเทพารักษ์</strong> ไฟรูปแบตเตอรี่สีแดงก็โชว์ขึ้นมา ลูกค้าจึงตัดสินใจแวะจอดพักรถที่ <strong>หน้าตลาดหนามแดง</strong> พอจอดปุ๊บ ดับเครื่อง กะว่าจะลงไปซื้อน้ำ พอจะกลับมาสตาร์ทรถ ปรากฏว่า <strong>รถสตาร์ทไม่ติดเลย</strong> ไดสตาร์ทดังแชะๆ ไฟหน้าปัดวูบดับ</p>

<p>ลูกค้าโทรหา FirstCarCenter ช่างมอเตอร์ไซค์ของเราวิ่งไปถึงใน 15 นาที เมื่อใช้เครื่องเทสต์แบตเตอรี่และวัดค่าไดชาร์จ พบว่า <strong>ไดชาร์จพัง ไม่มีการปั่นไฟออกมาเลย (โวลต์ตกเหลือ 10V)</strong> ทำให้ไฟในแบตเตอรี่ถูกดึงไปใช้จนเกลี้ยง</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/long-drive-alternator-case2.svg" alt="ไฟรูปแบตเตอรี่โชว์ รถดับสตาร์ทไม่ติด หน้าตลาดหนามแดง เทพารักษ์" class="w-full h-auto object-cover m-0" />
</div>

<p><strong>วิธีแก้ปัญหาเฉพาะหน้า:</strong> เนื่องจากลูกค้าต้องเอารถไปซ่อมไดชาร์จที่อู่ประจำแถวศรีนครินทร์ ช่างของเราจึง <strong>เปลี่ยนแบตเตอรี่ลูกใหม่</strong> ใส่เข้าไป เพื่อให้รถมีไฟเต็ม 100% (ซึ่งเพียงพอที่จะประคองรถขับไปถึงอู่ได้สบายๆ โดยไม่ต้องจ้างรถลาก) ลูกค้าประทับใจมากที่ได้คำแนะนำตรงไปตรงมา ไม่ถูกหลอกครับ</p>

<h2>Case Study 2: รถดับกลางอากาศ บนถนนศรีนครินทร์ โซนแบริ่ง</h2>
<p>เคสนี้อันตรายครับ ลูกค้าขับรถมาดีๆ บน <strong>ถนนศรีนครินทร์ มุ่งหน้าแบริ่ง</strong> จู่ๆ พวงมาลัยหนักอึ้ง ไฟหน้าปัดโชว์รวนไปหมด แล้วรถก็กระตุกดับกลางถนน! (อาการนี้คือไฟแบตหมดเกลี้ยงจนกล่อง ECU ดับ)</p>

<p>ลูกค้าประคองรถเข้าซ้ายได้ทัน โทรเรียกเราไปช่วยเหลือ ช่างนำแบตเตอรี่สำรองไปพ่วงจั๊มสตาร์ทให้ พอมอเตอร์สตาร์ทติด ช่างถอดสายพ่วงออก รถก็ดับทันที! นี่คืออาการ <strong>"ไดชาร์จเสีย 100%"</strong> ครับ ช่างจึงบริการใส่แบตเตอรี่ใหม่ให้ลูกค้าเช่าชั่วคราว เพื่อประคองรถเข้าศูนย์บริการที่อยู่ใกล้ที่สุดอย่างปลอดภัยครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/long-drive-alternator-case3.svg" alt="ช่างนำแบตใหม่ไปเปลี่ยนให้ประคองขับถึงอู่ ปั๊มน้ำมัน ถนนศรีนครินทร์" class="w-full h-auto object-cover m-0" />
</div>

<h2>รถดับ ไดชาร์จพัง หรือแบตเสื่อม? ให้ FirstCarCenter ไปเช็กให้!</h2>
<p>ถ้าคุณกำลังเจอเหตุการณ์ <strong>ไฟรูปแบตโชว์ หรือรถดับกลางทาง</strong> ในโซน <strong>บางนา ศรีนครินทร์ แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</strong> อย่าเพิ่งตกใจ! โทรหา <strong>FirstCarCenter</strong> เรามีบริการ <a href="/battery-replacement" class="text-orange-600 font-bold hover:underline">เปลี่ยนแบตเตอรี่นอกสถานที่</a> พร้อมเครื่องมือเช็กไดชาร์จมาตรฐาน หากเป็นที่แบตเสื่อม เราเปลี่ยนลูกใหม่ให้ทันที แต่ถ้าไดชาร์จพัง เราสามารถจัดหาแบตเตอรี่ให้คุณใส่ประคองรถไปถึงอู่ซ่อมได้อย่างปลอดภัย ประหยัดค่ารถลากสไลด์ไปได้เยอะครับ!</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">🚨 บริการฉุกเฉิน 24 ชม.</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">ไฟแบตโชว์ รถดับกลางทาง? เราวิ่งไปเช็กให้ถึงที่!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการตรวจเช็กไดชาร์จ จั๊มสตาร์ท และเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ ด่วนใน 30 นาที โซนบางนา ศรีนครินทร์ เทพารักษ์</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0887671679" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่างด่วน 088-767-1679</a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งพิกัดรถเสีย</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/battery-replacement" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">เปลี่ยนแบตเตอรี่รถยนต์ นอกสถานที่ แบริ่ง บางนา ศรีนครินทร์</a></p>
    <p style="margin-top:0.75rem;"><a href="/alternator-starter" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ซ่อมไดชาร์จ ไดสตาร์ท นอกสถานที่ ศรีนครินทร์ เทพารักษ์ →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) ปัญหา ขับรถทางไกลไดชาร์จพัง</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ไฟรูปแบตเตอรี่โชว์ ขับต่อได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ขับต่อได้ในระยะทางสั้นๆ ครับ (ประมาณ 5-10 กิโลเมตร) เพราะรถจะใช้ไฟจากแบตเตอรี่เพียวๆ แนะนำให้ปิดแอร์ ปิดวิทยุ และขับประคองไปหาอู่หรือที่จอดปลอดภัยให้เร็วที่สุดก่อนที่รถจะดับกลางอากาศครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ไดชาร์จเสีย ซ่อมได้ไหม หรือต้องเปลี่ยนใหม่?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> หากเสียที่ชิ้นส่วนเล็กๆ เช่น แปรงถ่านหมด หรือคัตเอาท์พัง สามารถให้ร้านไดนาโมซ่อมหรือเปลี่ยนอะไหล่ได้ครับ แต่ถ้าทุ่นข้าวในไหม้จนดำ การเปลี่ยนไดชาร์จมือสอง (เชียงกง) หรือของใหม่บิ้ว (Rebuilt) จะคุ้มค่าและจบปัญหากว่าครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ไดชาร์จพัง ทำให้แบตเตอรี่เสื่อมตามไปด้วยไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> มีส่วนครับ! ถ้าไดชาร์จพังแบบ "ชาร์จเกิน (Overcharge)" แบตเตอรี่จะบวมและน้ำกรดเดือดจนพัง หรือถ้า "ไม่ชาร์จเลย" แล้วคุณฝืนขับจนแบตหมดเกลี้ยง (Deep Discharge) แผ่นธาตุในแบตอาจจะช็อตและไม่เก็บไฟอีกต่อไปครับ</p>
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
