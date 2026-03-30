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

    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">ร้านแบตเปิดสงกรานต์</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">หยุดยาวเราไม่หยุด!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวช่วยลูกค้าแบตหมดช่วงเทศกาล โซนศรีนครินทร์</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PORNPISIT BATTERY</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">💦 🚗 🔋</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถจอดทิ้งไว้ช่วงสงกรานต์ แบตหมดสตาร์ทไม่ติด</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: หมู่บ้านซอยลาซาล สุขุมวิท 105</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛵 💨 🛠️</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ช่างพร้อมแบตเตอรี่ใหม่ วิ่งทะลุรถติดส่งถึงที่</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนศรีนครินทร์ โซนบางนา</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">✅ ⚡ 🚙</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เปลี่ยนแบตเตอรี่เสร็จไว ลูกค้าได้ใช้รถทันที</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโดแถวแบริ่ง</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-open-songkran-battery-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'open-songkran-battery-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'open-songkran-battery-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'open-songkran-battery-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ร้านแบตเปิดสงกรานต์ วันหยุดยาวเราไม่หยุด! รีวิวช่วยลูกค้าแบตหมดช่วงเทศกาล",
  slug: "open-songkran-holiday-battery-shop-guide",
  excerpt: "รถจอดทิ้งไว้ช่วงสงกรานต์ แบตหมดเกลี้ยง อู่ก็ปิดหมด หาร้านแบตเปิดสงกรานต์ที่ไหนดี? ดูรีวิวเรียกช่างเปลี่ยนแบตเตอรี่ด่วนช่วงวันหยุดยาว โซนศรีนครินทร์ บางนา แบริ่ง เทพารักษ์",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "ร้านแบตเปิดสงกรานต์,แบตเตอรี่รถยนต์หมด,เปลี่ยนแบตช่วงเทศกาล,เปลี่ยนแบตเตอรี่นอกสถานที่,ร้านแบตเตอรี่ใกล้ฉัน,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "ร้านแบตเปิดสงกรานต์ วันหยุดยาวเราไม่หยุด เปลี่ยนแบต โซนบางนา",
  seoDescription: "หาร้านแบตเปิดสงกรานต์ ปีใหม่ วันหยุดยาว? รถสตาร์ทไม่ติดช่วงเทศกาล โทรหาเรา! รีวิวช่างเปลี่ยนแบตเตอรี่นอกสถานที่ โซนศรีนครินทร์ บางนา เทพารักษ์ ถึงไว 30 นาที",
  seoKeywords: "ร้านแบตเปิดสงกรานต์, ร้านแบตเตอรี่ เปิดวันหยุด, เปลี่ยนแบตเตอรี่ช่วงเทศกาล, แบตหมดวันสงกรานต์, ร้านแบตเตอรี่ใกล้ฉัน",
  ogTitle: "ร้านแบตเปิดสงกรานต์ แบตหมดวันหยุด เรียกช่างด่วน!",
  ogDescription: "แชร์ประสบการณ์ตรง เปลี่ยนแบตเตอรี่ให้ลูกค้าช่วงเทศกาลสงกรานต์ อู่ปิดแต่เราเปิด พร้อมบริการโซนศรีนครินทร์-บางนา",
  coverImage: "/images/blog/pig-open-songkran-battery-cover.svg",
  content: `
<p class="lead">เทศกาลสงกรานต์ ปีใหม่ หรือวันหยุดยาวต่อเนื่อง คือช่วงเวลาแห่งความสุขที่หลายคนได้พักผ่อน แต่สำหรับคนใช้รถ นี่คือช่วง "วัดใจ" แบตเตอรี่ครับ! เพราะหลายคนไม่ได้ขับรถไปต่างจังหวัด แต่เลือกที่จะ <strong>"จอดรถทิ้งไว้ที่บ้านเฉยๆ 3-5 วัน"</strong> พอวันเปิดงานจะหยิบกุญแจสตาร์ทรถ ปรากฏว่ารถเงียบกริบ แบตหมดเกลี้ยง! ครั้นจะหาร้านแบตเตอรี่ อู่ใกล้บ้านก็ปิดหนีไปเที่ยวกันหมด การหา <strong>ร้านแบตเปิดสงกรานต์</strong> จึงยากเหมือนงมเข็มในมหาสมุทร แต่วันนี้ <strong>PORNPISIT BATTERY</strong> ขอยืนยันว่า <strong>"วันหยุดยาว เราไม่หยุดครับ!"</strong></p>

<h2>ทำไมรถจอดทิ้งไว้ช่วงสงกรานต์ แบตถึงหมดเร็วกว่าปกติ?</h2>
<p>หลายคนสงสัยว่า "รถก็ไม่ได้ขับ ทำไมแบตถึงหมด?" ความจริงคือ แม้เราจะดับเครื่องและดึงกุญแจออกแล้ว แต่ระบบไฟฟ้าในรถยังทำงานอยู่ตลอดเวลา (Parasitic Drain) เช่น ระบบกันขโมย, กล่อง ECU, นาฬิกา, และระบบ Keyless Entry หากแบตเตอรี่ของคุณอายุเกิน 1.5 - 2 ปี และไฟเริ่มอ่อนอยู่แล้ว การจอดทิ้งไว้เฉยๆ 3-4 วัน โดยไม่มีไดชาร์จปั่นไฟเข้าไปเติม ก็เพียงพอที่จะทำให้ค่า CCA (กำลังสตาร์ท) ตกลงจนรถสตาร์ทไม่ติดครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/open-songkran-battery-case1.svg" alt="รถจอดทิ้งไว้ช่วงสงกรานต์ แบตหมดสตาร์ทไม่ติด หมู่บ้านซอยลาซาล" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: แบตหมดวันสาดน้ำ! ที่ซอยลาซาล (สุขุมวิท 105)</h2>
<p>เหตุการณ์นี้เกิดขึ้นตรงกับ <strong>วันที่ 14 เมษายน</strong> (วันสงกรานต์) ลูกค้าจอดรถ Honda City ทิ้งไว้ที่บ้านใน <strong>ซอยลาซาล (สุขุมวิท 105)</strong> ตั้งแต่วันที่ 11 ปรากฏว่าญาติผู้ใหญ่ชวนไปกินข้าวตอนเย็น ลูกค้าพยายามสตาร์ทรถ แต่รถมีเสียงแกร็กๆๆ แล้วหน้าปัดกระพริบรัวๆ</p>

<p>ลูกค้าพยายามขี่มอเตอร์ไซค์วนหาร้านแบตเตอรี่หน้าปากซอย แต่ "ปิดเรียบ!" ลูกค้าจึงเสิร์ชหา <strong>"ร้านแบตเปิดสงกรานต์ ใกล้ฉัน"</strong> และโทรหาเรา แอดมินรับสายและรีบจัดส่งช่างพร้อมแบตเตอรี่ลูกใหม่ วิ่งฝ่าด่านสาดน้ำไปถึงบ้านลูกค้าภายใน 20 นาที</p>

<p>ช่างทำการเปลี่ยนแบตเตอรี่ GS Battery ตรงรุ่น พร้อมสำรองไฟเลี้ยงระบบให้เรียบร้อย ลูกค้าดีใจมากที่ยังมีร้านเปิดบริการในวันหยุดยาว ทำให้ไม่พลาดนัดกินข้าวกับครอบครัวครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/open-songkran-battery-case2.svg" alt="ช่างมอเตอร์ไซค์ วิ่งฝ่ารถติดช่วงสงกรานต์ ส่งแบตเตอรี่ ถนนศรีนครินทร์ โซนบางนา" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 2: วันหยุดสุดท้าย เตรียมตัวไปทำงาน แต่รถตายที่คอนโดแบริ่ง</h2>
<p>เคสนี้เจอบ่อยมากในเช้าวันเปิดงานครับ! ลูกค้าอยู่คอนโดแถว <strong>ซอยแบริ่ง</strong> จอดรถทิ้งไว้ช่วงปีใหม่ พอเช้าวันที่ 3 มกราคม ใส่ชุดทำงานเต็มยศลงมาที่ลานจอดรถ กดรีโมทปลดล็อค... เงียบ! ประตูไม่ยอมเปิด ต้องเอากุญแจฉุกเฉินเสียบไขไขเข้าไป พอเสียบกุญแจสตาร์ท ไฟหน้าปัดก็ไม่ขึ้น แบตเกลี้ยงสนิท 0 โวลต์!</p>

<p>ลูกค้าลางานช่วงเช้าและโทรหาเราทันที ช่าง PORNPISIT BATTERY ขี่มอเตอร์ไซค์มุดรถติดเช้าวันเปิดงาน ไปถึงคอนโดใน 15 นาที นำแบตเตอรี่ Amaron ลูกใหม่ไปเปลี่ยนให้หน้างาน ใช้เวลาทำงานแค่ 10 นาที ลูกค้าสามารถขับรถไปทำงานช่วงบ่ายได้ทันเวลาครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/open-songkran-battery-case3.svg" alt="เปลี่ยนแบตเตอรี่เสร็จไว ลูกค้าขับไปทำงานได้ทัน คอนโดแบริ่ง" class="w-full h-auto object-cover m-0" />
</div>

<h2>ทำไมลูกค้าถึงเลือก ร้านแบตเปิดสงกรานต์ PORNPISIT BATTERY?</h2>
<ul>
  <li><strong>เปิดให้บริการ 365 วัน:</strong> สงกรานต์ ปีใหม่ วันแรงงาน วันแม่ เรา <strong>ไม่หยุด</strong> ครับ! แอดมินและช่างสแตนด์บายรับสายตลอด 24 ชั่วโมง</li>
  <li><strong>บริการส่งถึงที่ (Delivery):</strong> คุณไม่ต้องไปเดินหาร้านให้เหนื่อย ช่างของเราขี่มอเตอร์ไซค์ไปส่งและติดตั้งให้ถึงบ้าน ครอบคลุมโซน <strong>ห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์ แพรกษา สมุทรปราการ</strong></li>
  <li><strong>แบตเตอรี่ใหม่แท้ 100%:</strong> เราสต็อกแบตเตอรี่ใหม่ตลอด ไม่นำแบตค้างปีมาขาย มีใบรับประกันทุกลูก 1 ปีเต็ม</li>
  <li><strong>ราคามาตรฐาน ไม่มีชาร์จเพิ่มวันหยุด:</strong> แม้จะเป็นช่วงเทศกาล เราก็คิดค่าแบตเตอรี่ในราคามาตรฐาน ไม่มีการฉวยโอกาสบวกราคาเพิ่มแน่นอนครับ</li>
</ul>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">🔋 ร้านแบตเตอรี่ เปิดทุกเทศกาล</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">แบตหมดช่วงสงกรานต์ อู่ปิดหมด? เรียกเราเลย!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ เปิดทุกวัน ไม่มีวันหยุด ส่งช่างมอเตอร์ไซค์ถึงหน้างานใน 30 นาที โซนห้วยขวาง ดินแดง ลาดพร้าว</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรสั่งแบตด่วน 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งพิกัดมาได้เลย</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/battery-replacement" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">เปลี่ยนแบตเตอรี่รถยนต์ นอกสถานที่ เทพารักษ์ ศรีนครินทร์</a></p>
    <p style="margin-top:0.75rem;"><a href="/mobile-tire-repair" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">บริการปะยางนอกสถานที่ 24 ชม. บางนา เทพารักษ์ →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) หาร้านแบตเปิดสงกรานต์</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: วันสงกรานต์ ช่างวิ่งมอเตอร์ไซค์มา แบตเตอรี่จะเปียกน้ำไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ไม่ต้องห่วงครับ! ช่างของเราแพ็คแบตเตอรี่ลงในกล่องกันน้ำอย่างมิดชิด แบตเตอรี่ทุกลูกจะไปถึงมือคุณในสภาพแห้งสนิท ใหม่แกะกล่องหน้างาน 100% ครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: จะจอดรถทิ้งไว้ 7 วันช่วงปีใหม่ ทำยังไงไม่ให้แบตหมด?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> หากแบตเตอรี่ยังใหม่ (ไม่เกิน 1 ปี) การจอด 7 วันมักไม่มีปัญหาครับ แต่ถ้าแบตอายุเยอะแล้ว แนะนำให้ถอดขั้วลบ (-) ออกเพื่อตัดวงจรไฟ (ระวังระบบล็อครถ) หรือหาคนมาช่วยสตาร์ทเครื่องทิ้งไว้ 15-20 นาที ทุกๆ 3 วันครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: เรียกช่างมาเปลี่ยนแบตวันหยุด ราคาแพงกว่าปกติไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ที่ PORNPISIT BATTERY เรา <strong>ไม่มีนโยบายชาร์จราคาเพิ่มในช่วงวันหยุดเทศกาล</strong> ครับ ลูกค้าจะได้รับบริการในราคามาตรฐานตามรุ่นแบตเตอรี่ แจ้งราคาสุทธิ (Net Price) ชัดเจนก่อนที่ช่างจะออกเดินทางเสมอครับ</p>
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
