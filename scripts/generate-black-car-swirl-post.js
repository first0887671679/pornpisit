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

      <!-- Polisher / Buffer Tool -->
      <g transform="translate(-75, 75) rotate(-15)">
        <rect x="-15" y="-30" width="30" height="40" rx="4" fill="#1E293B" filter="url(#shadow-sm)"/>
        <rect x="-10" y="-35" width="20" height="5" fill="url(#silver)"/>
        <ellipse cx="0" cy="-40" rx="25" ry="10" fill="#FF3E00"/>
        <ellipse cx="0" cy="-45" rx="25" ry="10" fill="#FF8C00"/>
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

      <!-- Sparkles / Shine -->
      <g transform="translate(60, -80)">
        <path d="M0,-15 L3,-4 L15,0 L3,4 L0,15 L-3,4 L-15,0 L-3,-4 Z" fill="#FFFFFF"/>
      </g>
      <g transform="translate(90, 0) scale(0.6)">
        <path d="M0,-15 L3,-4 L15,0 L3,4 L0,15 L-3,4 L-15,0 L-3,-4 Z" fill="#FFFFFF"/>
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
    <text x="110" y="-55" font-size="15" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">CAR CARE GUIDE</text>

    <text x="0" y="20" font-size="70" font-weight="800" fill="url(#text-grad)">รถสีดำรอยขนแมว</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">เพียบ! ขัดลบได้ 100% ไหม?</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวกู้คืนสีดำเงาฉ่ำ โซนศรีนครินทร์ บางนา</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PORNPISIT BATTERY</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 ⚫ 〽️</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถสีดำ รอยขนแมวเต็มคัน และรอยขีดข่วนบางๆ</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ตลาดหนามแดง เทพารักษ์</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛠️ 🌪️ 🧽</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เข้าเครื่องขัดระบบ DA ลบรอยและชักเงากระจก</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ร้านคาร์แคร์ โซนศรีนครินทร์ แบริ่ง</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">✨ 💎 🖤</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถสีดำกลับมาเงาฉ่ำเหมือนกระจก ไร้รอยกวนใจ</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโดซอยลาซาล สุขุมวิท 105</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-black-car-swirl-marks-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'black-car-swirl-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'black-car-swirl-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'black-car-swirl-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "รถสีดำรอยขนแมว เพียบ! ขัดลบได้ 100% ไหม? รีวิวกู้คืนสีดำเงาฉ่ำ",
  slug: "black-car-swirl-marks-removal-guide",
  excerpt: "รถสีดำสวย ดุดัน แต่ดูแลยากที่สุด! ปัญหา รถสีดำรอยขนแมว เต็มคัน เกิดจากอะไร? ขัดออกได้ 100% ไหม? ดูรีวิวการขัดสีรถสีดำให้กลับมาเงาฉ่ำเหมือนกระจก โซนศรีนครินทร์ บางนา",
  category: "คาร์แคร์",
  tags: "รถสีดำรอยขนแมว,ขัดสีรถสีดำ,รอยขนแมว,ขัดลบรอย,เคลือบเงารถสีดำ,ขัดสีรถยนต์,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "รถสีดำรอยขนแมว เต็มคัน ทำไงดี? รีวิวขัดสีลบรอย โซนบางนา",
  seoDescription: "รถสีดำรอยขนแมว เพียบ ขัดลบได้ไหม? เจาะลึกสาเหตุและรีวิวขั้นตอนขัดสีรถสีดำลบรอยขนแมวให้กลับมาเงาฉ่ำตาแตก โซนศรีนครินทร์ บางนา เทพารักษ์ แพรกษา",
  seoKeywords: "รถสีดำรอยขนแมว, ขัดสีรถสีดำ, ลบรอยขนแมวรถสีดำ, ขัดสีรถยนต์ บางนา, รถสีดำเป็นรอยง่าย",
  ogTitle: "รถสีดำรอยขนแมว เพียบ! กู้ชีพให้กลับมาเงาฉ่ำได้",
  ogDescription: "แชร์วิธีดูแลรถสีดำให้สวยไร้รอย พร้อมรีวิวขัดลบรอยขนแมวบนรถสีดำให้กลับมาเงางามเหมือนกระจก",
  coverImage: "/images/blog/pig-black-car-swirl-marks-cover.svg",
  content: `
<p class="lead">ใครบอกว่าซื้อรถสีดำแล้วไม่ต้องล้างบ่อย? ความจริงคือ "รถสีดำดูแลยากที่สุดในบรรดาทุกสี!" ครับ เพราะแค่ฝุ่นเกาะนิดเดียวก็เห็นชัด และปัญหาปวดใจที่สุดคือ <strong>"รถสีดำรอยขนแมว"</strong> (Swirl Marks) ที่ส่องไฟทีไรก็เห็นเป็นรอยวงๆ เต็มไปหมด วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาเจาะลึกว่ารอยขนแมวบนรถสีดำเกิดจากอะไร และรีวิวเคสจริงในการขัดสีกู้คืนความเงาฉ่ำในโซน <strong>ศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์</strong> ครับ</p>

<h2>"รถสีดำรอยขนแมว" เกิดจากอะไร? ทำไมเห็นชัดจัง?</h2>
<p>รอยขนแมว (Swirl Marks) คือรอยขีดข่วนบางๆ ระดับไมครอนบนชั้นแลคเกอร์ (Clear Coat) สาเหตุที่รถสีดำเห็นรอยพวกนี้ชัดกว่าสีขาวหรือสีเงิน เป็นเพราะ "การสะท้อนของแสง" ครับ พื้นหลังสีดำจะตัดกับรอยขีดข่วนสีขาวขุ่น ทำให้ตามนุษย์มองเห็นรอยได้ชัดเจนมาก โดยสาเหตุหลักๆ มาจาก:</p>
<ul>
  <li><strong>การล้างรถผิดวิธี:</strong> การใช้ฟองน้ำหรือผ้าเช็ดรถผืนเดียวเช็ดตั้งแต่ล้อขึ้นมาถึงหลังคา ทำให้เม็ดทรายเล็กๆ ครูดไปกับสีรถ</li>
  <li><strong>การใช้ไม้ขนไก่ปัดฝุ่น:</strong> ข้อนี้เจอบ่อยมากในหมู่บ้านแถว <strong>แพรกษา หรือ สมุทรปราการ</strong> ที่ฝุ่นเยอะ การเอาไม้ขนไก่ไปปัดตอนรถแห้งๆ คือการลากเอาทรายขูดสีรถโดยตรงครับ!</li>
  <li><strong>เครื่องล้างรถอัตโนมัติ:</strong> แปรงหมุนขนาดใหญ่ในปั๊มน้ำมัน มักจะมีเศษกรวดทรายจากรถคันก่อนหน้าติดอยู่</li>
  <li><strong>ผ้าเช็ดแห้งที่ไม่สะอาด:</strong> ผ้าไมโครไฟเบอร์ที่แข็งกระด้าง หรือไม่เคยซัก ก็ทำให้เกิดรอยได้เช่นกัน</li>
</ul>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/black-car-swirl-case1.svg" alt="สภาพ รถสีดำรอยขนแมว เต็มคัน สะท้อนแสงแดดแถวตลาดหนามแดง เทพารักษ์" class="w-full h-auto object-cover m-0" />
</div>

<h2>ขัดสีรถสีดำ ลบรอยขนแมวได้ 100% ไหม?</h2>
<p>คำตอบคือ <strong>"ลบได้ 80-95% ขึ้นอยู่กับความลึกของรอยครับ"</strong> รอยขนแมวทั่วไปที่เกิดจากการเช็ดล้าง จะอยู่แค่บนชั้นแลคเกอร์บางๆ ซึ่งสามารถขัดออก (Polishing) ให้กลับมาเรียบเนียนได้ 100% แต่ถ้ารอยนั้นลึกจนกินถึงชั้นสีแท้ (Base Coat) หรือชั้นรองพื้น (Primer) การขัดจะไม่สามารถลบได้หมด ทำได้แค่ลบขอบแผลให้ดูจางลงเท่านั้นครับ</p>

<h2>Case Study: Toyota Camry สีดำ รอยขนแมวเพียบ ย่านศรีนครินทร์</h2>
<p>ลูกค้าขับรถ Toyota Camry สีดำเงา (Attitude Black Mica) ปี 2019 พักอยู่แถว <strong>ถนนศรีนครินทร์ ใกล้แยกเทพารักษ์</strong> ลูกค้าชอบล้างรถเองที่บ้าน แต่ใช้ผ้าผืนเดียวเช็ดทั้งคันมาตลอด 4 ปี ผลคือเมื่อนำรถมาจอดกลางแดด จะเห็น <strong>รถสีดำรอยขนแมว</strong> เป็นวงๆ เหมือนใยแมงมุมเต็มคัน รถดูหม่นหมอง ไม่มีความเงางาม</p>

<p>ลูกค้านำรถมาใช้บริการ <a href="/car-polishing" class="text-orange-600 font-bold hover:underline">ขัดสีรถยนต์ลบรอย</a> กับ PORNPISIT BATTERY ช่างของเราทำการประเมินและจัดแพ็กเกจขัดสีระบบ DA (Dual Action) เต็มระบบ 3 ขั้นตอน:</p>
<ol>
  <li><strong>Cutting (ขัดหยาบลบรอย):</strong> ใช้ฟองน้ำเนื้อหยาบคู่กับน้ำยา Compound ขัดลอกชั้นแลคเกอร์ที่ช้ำและเต็มไปด้วยรอยขนแมวออก ขั้นตอนนี้รอยใยแมงมุมหายไปกว่า 90%</li>
  <li><strong>Polishing (ขัดละเอียดเก็บงาน):</strong> ใช้ฟองน้ำระดับกลางเก็บรอยเครื่องขัดจากขั้นตอนแรก และดึงความเงาของสีดำให้กลับมา</li>
  <li><strong>Finishing & Waxing (ชักเงากระจก):</strong> สำหรับรถสีดำ ขั้นตอนนี้สำคัญมาก! ช่างใช้น้ำยา Finishing Polish เพื่อลบรอย Hologram (รอยเงาสะท้อน) และเคลือบแว็กซ์ทับเพื่อสร้างความฉ่ำลึก (Deep Gloss)</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/black-car-swirl-case2.svg" alt="ช่างกำลังขัดสีลบรอยขนแมว รถสีดำ ด้วยเครื่อง DA โซนศรีนครินทร์ แบริ่ง" class="w-full h-auto object-cover m-0" />
</div>

<p>ผลลัพธ์ที่ได้คือ Camry คันนี้กลับมาดำดุ เงาตาแตก สะท้อนแสงแดดเป็นประกายมุก โดยไม่มีรอยใยแมงมุมกวนใจอีกเลย ลูกค้ารับรถกลับ <strong>คอนโดซอยลาซาล (สุขุมวิท 105)</strong> ด้วยรอยยิ้มครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/black-car-swirl-case3.svg" alt="รถสีดำขัดเสร็จ เงาฉ่ำเหมือนกระจก ไร้รอยขนแมว คอนโดซอยลาซาล สุขุมวิท 105" class="w-full h-auto object-cover m-0" />
</div>

<h2>วิธีดูแล "รถสีดำ" ให้สวยเงา ไร้รอยขนแมว</h2>
<ul>
  <li><strong>เลิกใช้ไม้ขนไก่ปัดฝุ่น:</strong> ถ้าฝุ่นเกาะ ให้ฉีดน้ำล้างเท่านั้น</li>
  <li><strong>ใช้เทคนิคล้างรถ 2 ถัง (Two-Bucket Method):</strong> ถังหนึ่งใส่น้ำยาล้างรถ อีกถังใส่น้ำเปล่าไว้ซักฟองน้ำ ป้องกันเศษทรายติดฟองน้ำไปขูดรถ</li>
  <li><strong>ใช้ผ้าเช็ดแห้งแบบ Microfiber เกรดพรีเมียม:</strong> ซับน้ำด้วยการแปะแล้วลากเบาๆ แทนการถูแรงๆ</li>
  <li><strong>เคลือบสีเป็นประจำ:</strong> การลงแว็กซ์หรือเคลือบแก้ว จะช่วยสร้างชั้นฟิล์มบางๆ ป้องกันรอยขนแมวไม่ให้เข้าถึงชั้นแลคเกอร์โดยตรง</li>
</ul>

<h2>รถสีดำรอยขนแมวเยอะ ดูหมอง? มาขัดสีฟื้นฟูกับ PORNPISIT BATTERY</h2>
<p>ถ้าคุณใช้รถสีดำแล้วรู้สึกปวดใจกับรอยขนแมวที่สะท้อนแสงแดด ลองนำรถมาให้ <strong>PORNPISIT BATTERY</strong> ช่วยดูแลครับ เราเชี่ยวชาญการขัดฟื้นฟูสีรถยนต์ โดยเฉพาะรถสีเข้ม ลูกค้าในเขต <strong>ห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง ลาซาล เทพารักษ์ แพรกษา</strong> วางใจให้เราดูแลรถที่คุณรัก ด้วยน้ำยาขัดสีและแว็กซ์นำเข้าคุณภาพสูง รับประกันความเงาฉ่ำ ดำลึก สะใจแน่นอน!</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">✨ บริการขัดสี ลบรอย ฟื้นฟูสภาพ</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">รถสีดำรอยขนแมวเพียบ? เราขัดให้เงาฉ่ำตาแตก!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการขัดลบรอยขนแมว ขจัดคราบไคล และเคลือบชักเงากระจก สำหรับรถสีดำและสีเข้มโดยเฉพาะ โซนห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรสอบถามราคา 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ประเมินสภาพสีฟรี</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/car-polishing" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">บริการขัดสีรถยนต์ลบรอย แบริ่ง ลาซาล บางนา</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ บางนา แบริ่ง →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) ปัญหารถสีดำรอยขนแมว</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: รถสีดำ ขัดสีบ่อยๆ สีจะด่างหรือบางไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> หากขัดด้วยเครื่องระบบ DA (Dual Action) และช่างที่มีความชำนาญ การขัดจะกินเนื้อแลคเกอร์น้อยมากครับ ไม่ทำให้สีด่าง และสามารถขัดลบรอยได้หลายครั้งตลอดอายุรถ (แนะนำขัดใหญ่ปีละ 1-2 ครั้งก็เพียงพอ)</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ปากกาลบรอยขีดข่วน ใช้กับรถสีดำได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ไม่แนะนำครับ ปากกาลบรอยส่วนใหญ่เป็นแค่แว็กซ์กลบรอยชั่วคราว หรือบางชนิดมีฤทธิ์กัดเคลือบใส หากใช้กับรถสีดำจะทำให้เกิดรอยด่างขาวเป็นดวงๆ ซึ่งน่าเกลียดกว่ารอยขนแมวเดิมเสียอีก แนะนำให้ขัดสีด้วยน้ำยาขัดลบรอยโดยเฉพาะจะดีที่สุด</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: รถสีดำควรเคลือบแก้ว หรือแค่เคลือบแว็กซ์ดี?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ถ้ามีงบประมาณ การเคลือบแก้วเซรามิกจะดีที่สุดสำหรับรถสีดำครับ เพราะจะสร้างชั้นฟิล์มแข็งกันรอยขนแมวได้ดีเยี่ยม ล้างออกง่าย และเงาฉ่ำนาน 1-3 ปี แต่ถ้าเน้นประหยัด การขัดสีและลงแว็กซ์เกรดพรีเมียมทุก 2-3 เดือน ก็ทำให้รถสีดำสวยฉ่ำได้เช่นกันครับ</p>
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
