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
    <text x="110" y="-55" font-size="15" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">HOLIDAY RESCUE</text>

    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">อู่ซ่อมรถเปิดสงกรานต์</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">รถดับ แอร์พัง ก็ซ่อมได้!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวช่วยรถฮีทกลางดึกช่วงเทศกาล โซนศรีนครินทร์</text>
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
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถติดหนักช่วงสงกรานต์ ความร้อนขึ้น เครื่องฮีท</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนศรีนครินทร์ มุ่งหน้าบางนา</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">📞 🛠️ 💨</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เรียกช่างฉุกเฉิน ออกเช็กอาการ พัดลมหม้อน้ำตาย</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: จุดจอดพักรถ หน้าตลาดหนามแดง</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">✅ 🔋 🚙</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ช่วยแก้ปัญหาหน้างาน พร้อมเปลี่ยนแบตเตอรี่ใหม่</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ลานจอดรถห้าง โซนแบริ่ง</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-open-songkran-garage-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'open-songkran-garage-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'open-songkran-garage-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'open-songkran-garage-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "อู่ซ่อมรถเปิดสงกรานต์ เครื่องฮีท รถดับกลางทาง ทำไงดี? รีวิวช่วยฉุกเฉิน",
  slug: "open-songkran-holiday-garage-guide",
  excerpt: "รถเสียช่วงสงกรานต์ ความร้อนขึ้น รถดับกลางทาง หาร้านซ่อมไม่ได้! แนะนำวิธีรับมือเมื่อ อู่ซ่อมรถเปิดสงกรานต์ หายาก พร้อมรีวิวเรียกช่างช่วยเหลือฉุกเฉิน โซนศรีนครินทร์ บางนา",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "อู่ซ่อมรถเปิดสงกรานต์,รถติดความร้อนขึ้น,เครื่องฮีท,เปลี่ยนแบตช่วงเทศกาล,รถเสียกลางทาง,สมุทรปราการ,บางนา",
  published: 1,
  author: "FIRSTCARCENTER",
  seoTitle: "อู่ซ่อมรถเปิดสงกรานต์ เครื่องฮีท รถดับทำไง? รีวิว โซนบางนา",
  seoDescription: "หา อู่ซ่อมรถเปิดสงกรานต์ ปีใหม่ วันหยุดยาว? รถติดจนเครื่องฮีท รถดับกลางทาง โทรหาเรา! รีวิวช่างช่วยเหลือฉุกเฉิน โซนศรีนครินทร์ บางนา เทพารักษ์ ถึงไว 30 นาที",
  seoKeywords: "อู่ซ่อมรถเปิดสงกรานต์, ร้านซ่อมรถ เปิดวันหยุด, รถติดความร้อนขึ้น, เปลี่ยนแบตเตอรี่ช่วงเทศกาล, รถเสียกลางทาง",
  ogTitle: "อู่ซ่อมรถเปิดสงกรานต์ รถเสียวันหยุด เรียกเราด่วน!",
  ogDescription: "แชร์วิธีรับมือรถเสีย รถฮีท ช่วงเทศกาลสงกรานต์ อู่ปิดแต่เราเปิด พร้อมบริการช่วยเหลือฉุกเฉิน โซนศรีนครินทร์-บางนา",
  coverImage: "/images/blog/pig-open-songkran-garage-cover.svg",
  content: `
<p class="lead">เทศกาลสงกรานต์ หรือวันหยุดยาว คือช่วงเวลาปราบเซียนสำหรับคนใช้รถครับ! เพราะถนนหลายสายรถติดหนึบสะสมเป็นชั่วโมงๆ และปัญหาคลาสสิกที่เจอบ่อยที่สุดคือ "รถติดความร้อนขึ้น เครื่องฮีท แอร์ไม่เย็น หรือรถดับกลางทาง" ครั้นจะหา <strong>อู่ซ่อมรถเปิดสงกรานต์</strong> ก็ยากเสียยิ่งกว่าถูกหวย เพราะช่างส่วนใหญ่กลับต่างจังหวัดกันหมด วันนี้ <strong>FirstCarCenter</strong> จะมาแชร์วิธีเอาตัวรอด และเคสรีวิวที่เราออกไปช่วยลูกค้าในช่วงวันหยุดยาว โซน <strong>บางนา ศรีนครินทร์ เทพารักษ์ สมุทรปราการ</strong> กันครับ</p>

<h2>ทำไมรถชอบมา "พัง" ช่วงสงกรานต์?</h2>
<p>อากาศเดือนเมษายนที่ร้อนระอุ ทะลุ 40 องศา บวกกับการขับรถลุยรถติดเป็นเวลานานๆ ทำให้ระบบระบายความร้อนของรถทำงานหนักจนเกินลิมิต ปัญหาที่มักจะ "แจ็คพอตแตก" ช่วงนี้คือ:</p>
<ol>
  <li><strong>พัดลมหม้อน้ำพัง/ตาย:</strong> พอมอเตอร์พัดลมไม่หมุน ความร้อนก็สะสมจนน้ำเดือดดันออกหม้อพัก</li>
  <li><strong>ไดชาร์จฮีท/ไหม้:</strong> ต้องปั่นไฟเลี้ยงแอร์ เลี้ยงพัดลม ท่ามกลางความร้อนจัดจนขดลวดไหม้ ไฟรูปแบตโชว์ รถดับ</li>
  <li><strong>แบตเตอรี่น็อค:</strong> ความร้อนในห้องเครื่องทำให้น้ำกลั่นเดือดและระเหยเร็ว แบตเตอรี่ที่เสื่อมอยู่แล้วจะช็อตช่องและสตาร์ทไม่ติดทันที</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/open-songkran-garage-case1.svg" alt="รถติดหนักช่วงสงกรานต์ ความร้อนขึ้น เครื่องฮีท ถนนศรีนครินทร์ มุ่งหน้าบางนา" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: เครื่องฮีท หน้าห้างซีคอน ศรีนครินทร์ วันที่ 13 เมษา!</h2>
<p>ลูกค้าขับรถพาครอบครัวไปเล่นน้ำที่ <strong>ถนนศรีนครินทร์</strong> ช่วงบ่ายวันที่ 13 เมษายน รถติดสลับหยุดนิ่ง จู่ๆ แอร์ในรถมีแต่ลมร้อน ลูกค้าเหลือบไปเห็นเข็มความร้อนชี้ไปที่ขีดแดง (ตัว H) มีควันขาวๆ ดันออกมาจากฝากระโปรงรถ! ลูกค้าจึงรีบหักรถเข้าจอดข้างทางทันที</p>

<p>ลูกค้าพยายามเสิร์ชหา <strong>"อู่ซ่อมรถเปิดสงกรานต์"</strong> แต่โทรไปกี่ร้านก็ไม่รับสาย สุดท้ายโทรมาเจอเรา <strong>FirstCarCenter</strong> (เราเปิดทุกวันไม่เว้นวันหยุด!) ช่างของเราขี่มอเตอร์ไซค์ฝ่าด่านสาดน้ำไปถึงจุดเกิดเหตุใน 20 นาที</p>

<p>เมื่อเครื่องยนต์เย็นลง ช่างเปิดฝากระโปรงเช็กดู พบว่า <strong>พัดลมหม้อน้ำตายสนิท</strong> ช่างจึงบริการเติมน้ำหล่อเย็นกลับเข้าไปให้เต็มระบบ และแนะนำให้ลูกค้าปิดแอร์ ขับประคองรถ (โดยช่างขี่มอเตอร์ไซค์คุมท้ายให้) ไปจอดที่บ้านแถวบางนาได้อย่างปลอดภัย รออู่ประจำเปิดหลังสงกรานต์ค่อยไปเปลี่ยนมอเตอร์พัดลมครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/open-songkran-garage-case2.svg" alt="เรียกช่างฉุกเฉิน ออกเช็กอาการ พัดลมหม้อน้ำตาย จุดจอดพักรถ หน้าตลาดหนามแดง" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 2: รถดับ ไดชาร์จพัง ที่ตลาดหนามแดง เทพารักษ์</h2>
<p>เคสนี้เกิดช่วงค่ำ ลูกค้าขับรถติดๆ ไหลๆ มาตาม <strong>ถนนเทพารักษ์</strong> ไฟรูปแบตเตอรี่โชว์หน้าปัด ลูกค้าฝืนขับต่อจนมาถึงหน้า <strong>ตลาดหนามแดง</strong> รถกระตุกและดับกลางอากาศ สตาร์ทไม่ติดอีกเลย</p>

<p>ช่างของเราออกไปช่วยเหลือพร้อมแบตเตอรี่สำรอง เมื่อพ่วงแบตติดและวัดค่าไฟ ปรากฏว่าไดชาร์จเสียสนิท (ปั่นไฟได้แค่ 11V) และแบตเตอรี่เดิมของลูกค้าก็เสื่อมจนชาร์จไฟไม่เข้าแล้ว ช่างจึงบริการเปลี่ยนแบตเตอรี่ลูกใหม่ให้ลูกค้า เพื่อให้รถมีไฟเพียงพอที่จะขับกลับไปจอดที่คอนโดใน <strong>ซอยแบริ่ง</strong> ได้อย่างปลอดภัย ไม่ต้องจ้างรถสไลด์ในราคาแพงหูฉี่ช่วงเทศกาลครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/open-songkran-garage-case3.svg" alt="ช่วยแก้ปัญหาหน้างาน พร้อมเปลี่ยนแบตเตอรี่ใหม่ ลานจอดรถห้าง โซนแบริ่ง" class="w-full h-auto object-cover m-0" />
</div>

<h2>รถมีปัญหาช่วงสงกรานต์ ปีใหม่ โทรหา FirstCarCenter!</h2>
<p>การหา <strong>อู่ซ่อมรถเปิดสงกรานต์</strong> เพื่อซ่อมใหญ่หรือยกเครื่องอาจจะหาแทบไม่ได้ครับ แต่ถ้าคุณต้องการ <strong>ความช่วยเหลือฉุกเฉินหน้างาน</strong> เช่น ตรวจเช็กอาการความร้อนขึ้น แบตเตอรี่หมด ไดชาร์จพัง หรือพ่วงจั๊มสตาร์ท ในโซน <strong>บางนา ศรีนครินทร์ แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</strong> โทรเรียก <strong>FirstCarCenter</strong> ได้เลยครับ ทีมช่างของเราสแตนด์บาย 24 ชั่วโมง ไม่มีวันหยุดเทศกาล เพื่อช่วยให้คุณและรถกลับถึงบ้านอย่างปลอดภัยครับ!</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">🚨 บริการช่วยเหลือฉุกเฉิน เปิดทุกเทศกาล</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">อู่ปิดหมด แต่เราไม่ปิด! รถเสียช่วงสงกรานต์เรียกเราได้</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการตรวจเช็กอาการรถเสียฉุกเฉิน จั๊มสตาร์ท และเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ ด่วนใน 30 นาที โซนบางนา ศรีนครินทร์</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0887671679" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่างฉุกเฉิน 088-767-1679</a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งพิกัดรถเสียด่วน</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/battery-replacement" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">เปลี่ยนแบตเตอรี่รถยนต์ นอกสถานที่ บางนา เทพารักษ์</a></p>
    <p style="margin-top:0.75rem;"><a href="/mobile-tire-repair" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">บริการปะยางนอกสถานที่ 24 ชม. ศรีนครินทร์ สมุทรปราการ →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) อู่ซ่อมรถเปิดสงกรานต์</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: FirstCarCenter รับเปลี่ยนมอเตอร์พัดลม หรือหม้อน้ำ ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> เราเน้นให้บริการแก้ปัญหาเฉพาะหน้าฉุกเฉิน (First Aid) เช่น เปลี่ยนแบตเตอรี่ จั๊มสตาร์ท และตรวจเช็กอาการเบื้องต้นครับ งานซ่อมใหญ่ที่ต้องใช้อะไหล่และเวลา เราจะช่วยประเมินอาการและแนะนำวิธีให้ลูกค้าประคองรถกลับบ้านอย่างปลอดภัย เพื่อรอเข้าอู่ประจำหลังเทศกาลครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: เข็มความร้อนขึ้นแค่เลยครึ่งมานิดเดียว ยังขับต่อได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ไม่ควรประมาทครับ! ให้ลองปิดแอร์แล้วสังเกตเข็มความร้อน ถ้าเข็มลดลงมาปกติ แสดงว่าพัดลมแอร์อาจจะมีปัญหา สามารถขับประคองช้าๆ ได้ แต่ถ้าเข็มยังขึ้นต่อ ต้องรีบจอดพักรถทันทีครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: เรียกช่างมาเช็กอาการช่วงสงกรานต์ คิดค่าบริการแพงไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> เราคิดค่าบริการนอกสถานที่ตามระยะทางจริงในราคามาตรฐานครับ <strong>ไม่มีการชาร์จราคาเพิ่ม (Surcharge) ในช่วงวันหยุดเทศกาล</strong> แจ้งราคาให้ลูกค้าทราบและตัดสินใจก่อนที่ช่างจะเดินทางออกไปเสมอครับ</p>
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
