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

    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">ร้านปะยางเปิดสงกรานต์</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">หยุดยาวแต่เราวิ่งไปปะให้!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวกู้ชีพรถยางแตกระหว่างเดินทาง โซนบางนา</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">FIRSTCARCENTER</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 💥 💦</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เดินทางเที่ยวสงกรานต์ ยางแตกกลางทาง อู่ปิดหมด</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนบางนา-ตราด กม.5</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛵 🛠️ 🛞</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ช่างมอเตอร์ไซค์ถึงจุดเกิดเหตุ ปะยางแทงใยไหม</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: จุดกลับรถ ถนนศรีนครินทร์</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛡️ ✅ 🛣️</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เปลี่ยนยางอะไหล่ ลูกค้าเดินทางเที่ยวต่อได้ปลอดภัย</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ปากซอยวัดหนามแดง เทพารักษ์</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-open-songkran-tire-repair-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'open-songkran-tire-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'open-songkran-tire-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'open-songkran-tire-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ร้านปะยางเปิดสงกรานต์ ยางแตกระหว่างเที่ยวทำไงดี? รีวิวช่างวิ่งไปปะให้ถึงที่",
  slug: "open-songkran-holiday-tire-repair-guide",
  excerpt: "ขับรถเที่ยวสงกรานต์แล้วยางรั่ว ยางแตก หาร้านปะยางเปิดสงกรานต์ยากมาก! อ่านรีวิวเรียกช่างปะยางนอกสถานที่ และบริการเปลี่ยนยางอะไหล่ช่วงเทศกาล โซนศรีนครินทร์ บางนา เทพารักษ์",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "ร้านปะยางเปิดสงกรานต์,ปะยางนอกสถานที่,เปลี่ยนยางอะไหล่,ยางแตกช่วงเทศกาล,ร้านปะยางใกล้ฉัน,สมุทรปราการ,บางนา",
  published: 1,
  author: "FIRSTCARCENTER",
  seoTitle: "ร้านปะยางเปิดสงกรานต์ ยางแตกช่วงหยุดยาว เรียกช่าง โซนบางนา",
  seoDescription: "หาร้านปะยางเปิดสงกรานต์ ปีใหม่? ยางแตก ยางรั่วระหว่างเดินทาง โทรหาเรา! รีวิวช่างปะยางนอกสถานที่ และเปลี่ยนยางอะไหล่ โซนศรีนครินทร์ บางนา เทพารักษ์ แพรกษา",
  seoKeywords: "ร้านปะยางเปิดสงกรานต์, ร้านปะยาง เปิดวันหยุด, ปะยางนอกสถานที่, เปลี่ยนยางอะไหล่, ยางแตกช่วงเทศกาล, ร้านปะยางใกล้ฉัน",
  ogTitle: "ร้านปะยางเปิดสงกรานต์ ยางแตกวันหยุด เราไปช่วยปะให้!",
  ogDescription: "แชร์ประสบการณ์ช่วยลูกค้ายางแตกระหว่างเดินทางเที่ยวสงกรานต์ หาร้านซ่อมไม่ได้ เรียกช่าง FirstCarCenter ไปปะถึงที่",
  coverImage: "/images/blog/pig-open-songkran-tire-repair-cover.svg",
  content: `
<p class="lead">กำลังขับรถพาครอบครัวไปเที่ยวพักผ่อนช่วงสงกรานต์หรือปีใหม่ อารมณ์กำลังดีๆ ดันได้ยินเสียง "ปัง!" ตามด้วยพวงมาลัยสั่น ยางแตกซะงั้น! พอจอดข้างทางแล้วเสิร์ชหา <strong>ร้านปะยางเปิดสงกรานต์</strong> ก็พบว่าร้านยาง อู่ซ่อมรถ และศูนย์บริการพากันปิดร้านกลับต่างจังหวัดกันหมด ทำเอาใจเสียกลายเป็นการนั่งรอความหวังข้างถนน วันนี้ <strong>FirstCarCenter</strong> ขอยืนยันว่าเราคือ "อู่ฉุกเฉินที่ไม่มีวันหยุด" ครับ! มาดูเคสรีวิวที่เราออกไปปะยางและเปลี่ยนยางอะไหล่ให้ลูกค้าในโซน <strong>บางนา ศรีนครินทร์ เทพารักษ์ แบริ่ง</strong> กันครับ</p>

<h2>ยางแตกช่วงเทศกาล สิ่งแรกที่ต้องทำเมื่อ "ร้านปิดหมด"</h2>
<p>ถ้าคุณเกิดเหตุยางรั่วหรือแตกในช่วงที่ร้านยางส่วนใหญ่ปิดทำการ ให้ตั้งสติและทำตามขั้นตอนนี้เพื่อความปลอดภัยครับ:</p>
<ol>
  <li><strong>ประคองรถเข้าข้างทางที่ปลอดภัย:</strong> เปิดไฟฉุกเฉิน และจอดให้ชิดซ้ายที่สุด หลีกเลี่ยงการจอดในจุดบอด หรือทางโค้ง</li>
  <li><strong>อย่ายืนท้ายรถ:</strong> ให้อยู่ในรถหรือยืนหลังแบริเออร์ (ถ้าอยู่บนทางด่วน ให้โทร 1543 ให้รถลากลงมาข้างล่างก่อน)</li>
  <li><strong>สำรวจท้ายรถว่ามี "ยางอะไหล่" ไหม:</strong> รถหลายรุ่นมีล้ออะไหล่และแม่แรงแถมมาให้ท้ายรถ ซึ่งจะช่วยให้คุณไปต่อได้ แม้ร้านยางจะปิดหมดก็ตาม</li>
  <li><strong>โทรเรียกช่าง FirstCarCenter:</strong> ถ้าคุณเปลี่ยนยางเองไม่เป็น หรือไม่มีเครื่องมือ โทรหาเราได้เลยครับ เราเปิดบริการทุกเทศกาล</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/open-songkran-tire-case1.svg" alt="เดินทางเที่ยวสงกรานต์ ยางแตกกลางทาง อู่ปิดหมด ถนนบางนา-ตราด" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: โดนตะปูตำ ยางแบนหน้าซีคอน วันที่ 14 เมษา!</h2>
<p>ลูกค้าขับรถออกมาซื้อของช่วงบ่ายวันที่ 14 เมษายน รถติดสลับหยุดนิ่งบน <strong>ถนนศรีนครินทร์</strong> บริเวณหน้าห้างซีคอนสแควร์ มีวัยรุ่นเล่นสาดน้ำอยู่ริมทาง จู่ๆ มีคนขี่มอเตอร์ไซค์มาเคาะกระจกบอกว่า "พี่ครับ ยางหลังแบนติดพื้นเลย!"</p>

<p>ลูกค้าจอดรถริมทางและพยายามหาร้านปะยาง แต่ร้านแถวนั้นปิดหมด ลูกค้าจึงโทรหาเรา ช่างขี่มอเตอร์ไซค์ฝ่ารถติดและด่านสาดน้ำไปถึงใน 20 นาที ตรวจพบว่าโดนตะปูเกลียวตำที่หน้ายาง</p>

<p>เคสนี้ช่างทำการ <strong>ปะยางแบบแทงใยไหม (Tire Plug)</strong> โดยไม่ต้องถอดล้อ ใช้เวลาเพียง 10 นาที ดึงตะปูออก แทงไหมอุด และเติมลมด้วยปั๊มลมพกพา ลูกค้าจ่ายในราคามาตรฐาน (ไม่มีบวกเพิ่มช่วงสงกรานต์) และขับรถไปทำธุระต่อได้ทันทีครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/open-songkran-tire-case2.svg" alt="ช่างมอเตอร์ไซค์ถึงจุดเกิดเหตุ ปะยางแทงใยไหม จุดกลับรถ ถนนศรีนครินทร์" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 2: ยางระเบิดฉีกขาด ต้องเปลี่ยนยางอะไหล่ ที่ปากซอยวัดหนามแดง</h2>
<p>เคสนี้หนักกว่าเคสแรกครับ ลูกค้าขับรถจะไปเที่ยวต่างจังหวัด วิ่งมาตาม <strong>ถนนเทพารักษ์</strong> พอถึง <strong>ปากซอยวัดหนามแดง</strong> ล้อหน้าซ้ายตกหลุมลึก ทำให้แก้มยางกระแทกจนฉีกขาด ยางระเบิดปะไม่ได้!</p>

<p>ในวันหยุดยาวแบบนี้ การหาร้านที่มีไซส์ยางตรงสเปกเพื่อเปลี่ยนเส้นใหม่นั้นแทบเป็นไปไม่ได้ครับ ช่างของเราจึงเสนอทางออกที่ดีที่สุด คือบริการ <strong>ถอดล้อที่พังออก และใส่ล้ออะไหล่ (Spare Tire)</strong> ที่อยู่ท้ายรถลูกค้าแทน โดยช่างมีแม่แรงตะเข้และบล็อกถอดล้อไฟฟ้า ทำให้เปลี่ยนได้รวดเร็วและแน่นหนา ลูกค้าจึงสามารถใช้ยางอะไหล่ (แบบวิ่งไม่เกิน 80 กม./ชม.) ประคองขับไปเที่ยวต่อได้อย่างปลอดภัยครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/open-songkran-tire-case3.svg" alt="เปลี่ยนยางอะไหล่ ลูกค้าเดินทางเที่ยวต่อได้ ปากซอยวัดหนามแดง เทพารักษ์" class="w-full h-auto object-cover m-0" />
</div>

<h2>หา ร้านปะยางเปิดสงกรานต์ ไม่เจอ? เรียก FirstCarCenter!</h2>
<p>ถ้าคุณกำลังเจอปัญหายางแตก ยางแบน หรือต้องการเปลี่ยนล้ออะไหล่ ในช่วงวันหยุดเทศกาล โซน <strong>บางนา ศรีนครินทร์ แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</strong> อย่ามัวเสียเวลาวนหาร้านครับ! โทรเรียก <strong>FirstCarCenter</strong> ได้เลย เรามีทีมช่างมอเตอร์ไซค์เคลื่อนที่เร็ว สแตนด์บาย 24 ชั่วโมง เปิดทุกวันไม่เว้นวันหยุดเทศกาล พร้อมอุปกรณ์ครบมือ วิ่งไปปะยางหรือเปลี่ยนล้อให้คุณถึงหน้างาน ไม่ต้องทิ้งรถไว้ข้างถนนครับ!</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">🚨 บริการปะยาง 24 ชม. เปิดทุกเทศกาล</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">ร้านยางปิดหมด? เราวิ่งไปปะให้ถึงที่!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการปะยางแทงใยไหม และเปลี่ยนล้ออะไหล่นอกสถานที่ ด่วนใน 30 นาที โซนบางนา ศรีนครินทร์ เทพารักษ์</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0887671679" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่างปะยาง 088-767-1679</a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งพิกัดมาได้เลย</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/mobile-tire-repair" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">บริการปะยางด่วน 24 ชม. บางนา ศรีนครินทร์ เทพารักษ์</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ บางนา แบริ่ง ลาซาล →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) หาร้านปะยางเปิดสงกรานต์</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ปะยางแทงใยไหม วิ่งออกต่างจังหวัดได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ได้สบายครับ! การปะแบบแทงใยไหม (Tire Plug) ที่หน้ายาง เป็นมาตรฐานสากลที่ทนทานและปลอดภัย สามารถรับแรงดันลมและขับด้วยความเร็วปกติออกต่างจังหวัดได้จนกว่ายางจะหมดอายุครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: FirstCarCenter มีบริการเปลี่ยนยางเส้นใหม่หน้างานไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> เราเน้นบริการซ่อมฉุกเฉิน (First Aid) คือปะยางและ <strong>เปลี่ยนยางอะไหล่</strong> ของลูกค้าใส่แทนชั่วคราวครับ เราไม่มีบริการขายยางเส้นใหม่ไปเปลี่ยนหน้างาน เนื่องจากยางมีไซส์และยี่ห้อที่หลากหลายมากครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ถ้าเรียกช่วงสงกรานต์ หรือตอนดึก จะบวกราคาเพิ่มไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ไม่มีการบวกราคาหรือฉวยโอกาสขึ้นราคาช่วงเทศกาลครับ เราคิดค่าบริการนอกสถานที่ในราคามาตรฐาน (ขึ้นอยู่กับระยะทาง) โดยจะแจ้งราคา Net Price ให้ลูกค้าทราบก่อนเสมอครับ</p>
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
