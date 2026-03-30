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

    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">รถติดความร้อนขึ้น</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">แอร์ไม่เย็น เครื่องฮีท!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิววิธีรับมือและเรียกช่างฉุกเฉิน โซนบางนา</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PORNPISIT BATTERY</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🌡️ 🥵 🚗</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถติดหนัก เข็มความร้อนขึ้น แอร์มีแต่ลมร้อน</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนศรีนครินทร์ มุ่งหน้าแยกเทพารักษ์</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛑 🅿️ ⚠️</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">จอดพักรถริมทาง ปิดแอร์ เปิดฝากระโปรงระบายความร้อน</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: หน้าห้างซีคอนสแควร์ ศรีนครินทร์</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛠️ 🔋 💨</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ช่างตรวจเช็กพัดลมหม้อน้ำและระบบไฟหน้างาน</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนบางนา-ตราด</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-traffic-jam-overheat-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'traffic-jam-overheat-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'traffic-jam-overheat-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'traffic-jam-overheat-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "รถติดความร้อนขึ้น แอร์ไม่เย็น เครื่องฮีท! ทำยังไงดี? รีวิววิธีเอาตัวรอด",
  slug: "traffic-jam-engine-overheat-survival-guide",
  excerpt: "ขับรถอยู่ดีๆ พอเจอรถติดหนักๆ รถติดความร้อนขึ้น แอร์มีแต่ลมร้อน! ถือเป็นสัญญาณอันตรายเครื่องฮีท อ่านวิธีรับมือเบื้องต้นและเคสรีวิวเรียกช่างช่วยเหลือฉุกเฉิน โซนศรีนครินทร์ บางนา",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "รถติดความร้อนขึ้น,เครื่องฮีท,แอร์ไม่เย็นตอนรถติด,พัดลมหม้อน้ำเสีย,รถเสียกลางทาง,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "รถติดความร้อนขึ้น เครื่องฮีททำไงดี? รีวิววิธีรอด | โซนบางนา",
  seoDescription: "รถติดความร้อนขึ้น แอร์ไม่เย็น มีแต่ลมร้อน เข็มความร้อนชี้ตัว H อย่าฝืนขับ! อ่านวิธีรับมือที่ถูกต้อง และเคสรีวิวเรียกช่างฉุกเฉิน โซนศรีนครินทร์ บางนา เทพารักษ์ แพรกษา",
  seoKeywords: "รถติดความร้อนขึ้น, เครื่องฮีท, แอร์ไม่เย็นตอนรถติด, พัดลมหม้อน้ำไม่หมุน, เปลี่ยนแบตเตอรี่นอกสถานที่, รถดับกลางทาง",
  ogTitle: "รถติดความร้อนขึ้น! อย่าฝืนขับเด็ดขาด",
  ogDescription: "แชร์ประสบการณ์ตรง รถติดหนึบจนเครื่องฮีท แอร์มีแต่ลมร้อน พร้อมวิธีเอาตัวรอดไม่ให้ฝาสูบโก่ง โซนศรีนครินทร์-บางนา",
  coverImage: "/images/blog/pig-traffic-jam-overheat-cover.svg",
  content: `
<p class="lead">การขับรถในกรุงเทพฯ หรือปริมณฑลช่วงเวลาเร่งด่วน สิ่งที่ต้องเผชิญเป็นประจำคือ "รถติดสาหัส" ครับ แต่ปัญหาที่น่ากลัวกว่ารถติดคือ เมื่อจอดแช่นานๆ แล้ว <strong>"รถติดความร้อนขึ้น"</strong> เข็มความร้อนหน้าปัดค่อยๆ ตีขึ้นไปทางตัว H แอร์ที่เคยเย็นฉ่ำกลับมีแต่ลมร้อนพ่นออกมา! ถือเป็นสัญญาณเตือนว่า "เครื่องกำลังจะฮีท" (Overheat) วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาบอกวิธีรับมือเฉพาะหน้า และเล่าเคสช่วยเหลือลูกค้าในโซน <strong>ศรีนครินทร์ บางนา เทพารักษ์ ลาซาล แบริ่ง</strong> ให้ฟังครับ</p>

<h2>ทำไมพอ "รถติด" แล้วความร้อนถึงขึ้น?</h2>
<p>เวลารถวิ่งด้วยความเร็ว จะมีลมปะทะหน้ารถคอยช่วยระบายความร้อนให้หม้อน้ำ แต่พอ <strong>รถติดความร้อนขึ้น</strong> เพราะไม่มีลมปะทะตามธรรมชาติ ภาระทั้งหมดจึงตกไปอยู่ที่ <strong>"พัดลมไฟฟ้า (พัดลมหม้อน้ำ/พัดลมแอร์)"</strong> ถ้าพัดลมทำงานไม่เต็มประสิทธิภาพ จะเกิดปัญหาตามมาครับ สาเหตุหลักๆ ได้แก่:</p>
<ol>
  <li><strong>มอเตอร์พัดลมเสื่อม/ตาย:</strong> พัดลมหมุนเอื่อยๆ หรือไม่หมุนเลย ทำให้ระบายความร้อนไม่ได้ (พบบ่อยที่สุด)</li>
  <li><strong>น้ำในหม้อน้ำรั่ว/แห้ง:</strong> มีรอยรั่วตามท่อยาง หรือหม้อน้ำผุ ทำให้น้ำหล่อเย็นหายไป</li>
  <li><strong>วาล์วน้ำไม่เปิด:</strong> น้ำร้อนในเครื่องไม่ยอมระบายออกมาที่หม้อน้ำ</li>
  <li><strong>ไดชาร์จ/แบตเตอรี่ไฟอ่อน:</strong> ไฟฟ้าไม่พอไปปั่นมอเตอร์พัดลมให้แรงพอ (เกี่ยวข้องกันโดยตรง)</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/traffic-jam-overheat-case1.svg" alt="รถติดหนัก เข็มความร้อนขึ้น แอร์มีแต่ลมร้อน ถนนศรีนครินทร์ มุ่งหน้าแยกเทพารักษ์" class="w-full h-auto object-cover m-0" />
</div>

<h2>วิธีเอาตัวรอดเบื้องต้น เมื่อ รถติดความร้อนขึ้น!</h2>
<p>ถ้าเข็มความร้อนเริ่มขยับเกินครึ่ง (หรือไฟเตือนความร้อนสีแดงโชว์) <strong>อย่าฝืนขับต่อเด็ดขาด!</strong> เพราะถ้าฝาสูบโก่ง ค่าซ่อมจะหลักหมื่นบาทครับ ให้ทำตามนี้ทันที:</p>
<ul>
  <li><strong>ปิดแอร์ทันที:</strong> เพื่อลดภาระของเครื่องยนต์และพัดลมแอร์</li>
  <li><strong>ประคองรถเข้าข้างทาง:</strong> หาจุดจอดที่ปลอดภัย เช่น ปั๊มน้ำมัน ลานจอดห้าง หรือริมฟุตบาทไหล่ทาง</li>
  <li><strong>ดับเครื่องยนต์ (ถ้าความร้อนยังไม่ถึงขีดสุด):</strong> แต่ถ้าความร้อนขึ้นสุดจนมีควันดัน ให้ <strong>เปิดฝากระโปรงรถทิ้งไว้ก่อน แล้วค่อยดับเครื่อง</strong> เพื่อระบายความร้อน <strong>*ข้อควรระวัง: ห้ามเปิดฝาหม้อน้ำตอนเครื่องร้อนเด็ดขาด น้ำเดือดจะพุ่งลวกหน้าได้ครับ!*</strong></li>
</ul>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/traffic-jam-overheat-case2.svg" alt="จอดพักรถริมทาง ปิดแอร์ เปิดฝากระโปรงระบายความร้อน หน้าห้างซีคอนสแควร์ ศรีนครินทร์" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: พัดลมหม้อน้ำตาย รถติดหน้าซีคอน ศรีนครินทร์</h2>
<p>ลูกค้าขับรถ Honda City ติดแหง็กอยู่หน้าห้าง <strong>ซีคอนสแควร์ ถนนศรีนครินทร์</strong> ช่วงเย็นวันศุกร์ จู่ๆ แอร์ในรถมีแต่ลมร้อน ลูกค้าสังเกตเห็นไฟเตือนความร้อนหน้าปัดกระพริบ จึงตัดสินใจหักพวงมาลัยเลี้ยวเข้าไปจอดพักรถในลานจอดของห้างทันที</p>

<p>ลูกค้าโทรหา PORNPISIT BATTERY ช่างมอเตอร์ไซค์ของเราไปถึงหน้างานใน 20 นาที เมื่อเปิดฝากระโปรงเช็กดู พบว่า <strong>มอเตอร์พัดลมหม้อน้ำตายสนิท</strong> (เคาะแล้วก็ไม่หมุน) ทำให้น้ำในหม้อน้ำเดือดพล่านดันออกมาที่หม้อพักสำรอง</p>

<p>เคสนี้ช่างแนะนำให้รอจนเครื่องเย็นสนิท เติมน้ำกลับเข้าไป แล้วค่อยๆ ขับประคองรถ (โดยไม่เปิดแอร์) ไปที่อู่ซ่อมไดนาโม/หม้อน้ำที่อยู่ใกล้ที่สุด เพื่อเปลี่ยนมอเตอร์พัดลมใหม่ครับ</p>

<h2>Case Study 2: ความร้อนขึ้นเพราะแบตเตอรี่/ไดชาร์จเสื่อม ถนนบางนา-ตราด</h2>
<p>อีกเคสเกิดขึ้นบน <strong>ถนนบางนา-ตราด กม.5</strong> ลูกค้าขับรถติดๆ ไหลๆ เข็มความร้อนค่อยๆ ขึ้นจนแตะขีดแดง ลูกค้าจอดรถข้างทางและดับเครื่อง แต่พอเครื่องเย็นลงแล้ว จะสตาร์ทรถกลับสตาร์ทไม่ติด ไดสตาร์ทดังแชะๆ</p>

<p>ช่างของเราไปถึงหน้างาน ใช้เครื่องวัดไฟปรากฏว่า <strong>แบตเตอรี่และไดชาร์จเสื่อมสภาพ</strong> ทำให้ปั่นไฟไปเลี้ยงมอเตอร์พัดลมหม้อน้ำไม่พอ พัดลมจึงหมุนเบามากจนระบายความร้อนไม่ทัน ช่างทำการพ่วงแบตและวัดค่าไดชาร์จ พบว่าต้องนำรถเข้าอู่เพื่อซ่อมระบบไฟโดยด่วน จึงบริการพ่วงสตาร์ทและคุมท้ายให้ลูกค้าขับไปถึงอู่แถวบางนาอย่างปลอดภัยครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/traffic-jam-overheat-case3.svg" alt="ช่างตรวจเช็กพัดลมหม้อน้ำและระบบไฟหน้างาน ถนนบางนา-ตราด" class="w-full h-auto object-cover m-0" />
</div>

<h2>รถมีปัญหา ความร้อนขึ้น สตาร์ทไม่ติด? เรียก PORNPISIT BATTERY สิครับ</h2>
<p>หากคุณเจอสถานการณ์ <strong>รถติดความร้อนขึ้น</strong> หรือดับเครื่องพักแล้วรถสตาร์ทไม่ติดกลางทาง ในเขต <strong>ห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง ลาซาล เทพารักษ์ แพรกษา หรือสมุทรปราการ</strong> โทรเรียก <strong>PORNPISIT BATTERY</strong> ได้เลยครับ ทีมช่างของเราพร้อมวิ่งไปตรวจเช็กปัญหาเบื้องต้นให้ถึงหน้างาน ไม่ว่าจะเป็นเรื่องแบตเตอรี่ ไดชาร์จ หรือช่วยประเมินสถานการณ์ว่าควรเรียกรถลากหรือไม่ เพื่อให้คุณปลอดภัยและเสียค่าใช้จ่ายน้อยที่สุดครับ!</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">🚨 บริการช่วยเหลือฉุกเฉิน 24 ชม.</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">เครื่องฮีท จอดดับแล้วสตาร์ทไม่ติด? เราไปเช็กให้!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการตรวจเช็กระบบไฟ จั๊มสตาร์ท และเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ ด่วนใน 30 นาที โซนห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่างด่วน 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งพิกัดรถเสีย</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/battery-replacement" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">เปลี่ยนแบตเตอรี่รถยนต์ นอกสถานที่ ศรีนครินทร์ บางนา</a></p>
    <p style="margin-top:0.75rem;"><a href="/alternator-starter" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ซ่อมไดชาร์จ ไดสตาร์ท นอกสถานที่ บางนา เทพารักษ์ →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) ปัญหา รถติดความร้อนขึ้น</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: เอาน้ำเปล่าราดที่หม้อน้ำตอนเครื่องร้อนๆ ได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ห้ามราดน้ำเย็นลงบนเครื่องยนต์หรือหม้อน้ำที่กำลังร้อนจัดเด็ดขาดครับ! เพราะการเปลี่ยนอุณหภูมิฉับพลัน (Thermal Shock) จะทำให้เหล็กฝาสูบหรือเสื้อสูบแตกร้าวได้ทันที ต้องปล่อยให้เย็นลงตามธรรมชาติครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: พัดลมหม้อน้ำตาย เอาไม้ไปเคาะแล้วหมุน ขับต่อได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ขับประคองไปอู่ได้ครับ การเคาะเป็นการกระตุ้นแปรงถ่านในมอเตอร์ที่ใกล้หมดให้ทำงานชั่วคราว แต่พอมันหยุดอีกทีก็จะตายสนิทครับ ดังนั้นควรรีบขับไปเปลี่ยนมอเตอร์พัดลมโดยเร็วที่สุดครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: รถติดแล้วแอร์ไม่เย็น พอรถวิ่งแอร์เย็น เกิดจากอะไร?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> อาการนี้ฟันธงได้เลยว่าเกิดจาก "การระบายความร้อนหน้ารถไม่ดี" ครับ มักมาจากพัดลมไฟฟ้าเริ่มเสื่อมสภาพ (หมุนช้า) หรือแผงรังผึ้งแอร์ตัน พอรถวิ่งมีลมปะทะเลยระบายความร้อนได้ แต่พอรถจอดติด ลมไม่พัด แอร์เลยสู้ความร้อนไม่ไหวครับ</p>
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
