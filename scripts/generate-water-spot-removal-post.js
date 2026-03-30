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

    <text x="0" y="20" font-size="70" font-weight="800" fill="url(#text-grad)">ขัดคราบน้ำฝังแน่น</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">ดวงๆ บนสีรถ ออกหมดไหม?</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">เจาะลึกวิธีแก้ปัญหาคราบฝนกรด น้ำบาดาล โซนบางนา</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PORNPISIT BATTERY</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">💧 🚗 😩</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รอยคราบน้ำฝนกรดฝังแน่น ล้างไม่ออก</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: จอดตากฝนในหมู่บ้าน โซนแพรกษา</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🧪 🧽 🌪️</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ใช้น้ำยาสลายคราบน้ำ ควบคู่กับการขัดสี DA</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ร้านคาร์แคร์ ถนนศรีนครินทร์</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">✨ 🛡️ 🚙</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ขัดคราบน้ำออกหมด 100% พร้อมเคลือบสีกันน้ำเกาะ</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโดแถวแบริ่ง สุขุมวิท 107</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-water-spot-removal-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'water-spot-removal-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'water-spot-removal-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'water-spot-removal-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ขัดคราบน้ำฝังแน่นบนสีรถ ล้างไม่ออก ทำไงดี? รีวิววิธีแก้ปัญหาจริง",
  slug: "car-water-spot-removal-guide",
  excerpt: "รถเป็นรอยดวงๆ คราบน้ำฝน คราบน้ำบาดาลฝังแน่น ล้างแชมพูไม่ออก! ดูวิธี ขัดคราบน้ำฝังแน่น บนสีรถให้กลับมาเงาใส ไร้รอยด่าง พร้อมเคสรีวิวจากโซนศรีนครินทร์ บางนา",
  category: "คาร์แคร์",
  tags: "ขัดคราบน้ำฝังแน่น,คราบน้ำบนสีรถ,รอยน้ำฝน,ขัดสีรถยนต์,ล้างรถ,คราบน้ำบาดาล,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "ขัดคราบน้ำฝังแน่น สีรถเป็นรอยดวง ทำไงดี? รีวิว โซนบางนา",
  seoDescription: "ขัดคราบน้ำฝังแน่น คราบน้ำบาดาล คราบฝนกรด บนสีรถและกระจก ล้างไม่ออกทำไง? ดูสาเหตุและวิธีแก้ พร้อมเคสรีวิวขัดสี โซนศรีนครินทร์ บางนา เทพารักษ์ แพรกษา",
  seoKeywords: "ขัดคราบน้ำฝังแน่น, คราบน้ำบนสีรถ, รอยน้ำฝนรถยนต์, ขัดสีรถยนต์ บางนา, น้ำยาล้างคราบน้ำ",
  ogTitle: "คราบน้ำฝังแน่นบนสีรถ ล้างไม่ออก! กู้ชีพได้ด้วยวิธีนี้",
  ogDescription: "แชร์วิธีกำจัดคราบน้ำฝน คราบน้ำบาดาลที่ฝังแน่นเป็นดวงๆ บนสีรถ พร้อมรีวิวขัดสีจริงย่านศรีนครินทร์-บางนา",
  coverImage: "/images/blog/pig-water-spot-removal-cover.svg",
  content: `
<p class="lead">หนึ่งในปัญหาที่คนรักรถเกลียดที่สุดรองจากรอยขูดขีด ก็คือ <strong>"คราบน้ำฝังแน่น"</strong> หรือ Water Spots นี่แหละครับ! ไม่ว่าจะเป็นคราบน้ำฝน คราบน้ำบาดาล หรือน้ำแอร์หยดใส่ พอแห้งปุ๊บจะทิ้งรอยเป็นดวงๆ วงๆ บนสีรถและกระจก ยิ่งปล่อยไว้นานยิ่งล้างไม่ออก วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาเจาะลึกวิธี <strong>ขัดคราบน้ำฝังแน่น</strong> ให้หายเกลี้ยง พร้อมเคสรีวิวจริงจากลูกค้าในโซน <strong>ศรีนครินทร์ บางนา แบริ่ง ลาซาล สมุทรปราการ</strong> ครับ</p>

<h2>คราบน้ำฝังแน่น (Water Spots) เกิดจากอะไร?</h2>
<p>คราบน้ำบนรถไม่ได้เกิดจากน้ำเปล่าๆ ครับ แต่เกิดจาก "แร่ธาตุ" ที่ปะปนมากับน้ำ (เช่น แคลเซียม แมกนีเซียม หรือกรดในน้ำฝน) เมื่อน้ำระเหยไป แร่ธาตุเหล่านี้จะถูกทิ้งไว้บนชั้นแลคเกอร์ของสีรถ ยิ่งถ้าจอดตากแดดร้อนๆ แดดจะอบให้คราบพวกนี้ <strong>"ฝังลึกและกัดกร่อน"</strong> ลงไปในชั้นสีครับ</p>

<h3>ระดับความรุนแรงของคราบน้ำ:</h3>
<ul>
  <li><strong>ระดับ 1 (เพิ่งเกิด):</strong> เป็นแค่คราบขาวๆ บนผิวแลคเกอร์ ล้างแชมพูก็ออก</li>
  <li><strong>ระดับ 2 (เริ่มฝัง):</strong> คราบแร่ธาตุยึดเกาะแน่น ล้างแชมพูไม่ออก ต้องใช้น้ำยาสลายคราบน้ำ หรือดินน้ำมัน</li>
  <li><strong>ระดับ 3 (ฝังลึกกัดสี):</strong> คราบน้ำกัดกินลงไปในชั้นแลคเกอร์จนเกิดเป็น "หลุมดวงๆ" กรณีนี้ใช้น้ำยาไม่ออก ต้อง <strong>ขัดคราบน้ำฝังแน่น</strong> ด้วยเครื่องขัดสีเท่านั้น!</li>
</ul>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/water-spot-removal-case1.svg" alt="รอยคราบน้ำฝนกรดฝังแน่น จอดตากฝนในหมู่บ้าน โซนแพรกษา" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: คราบน้ำแอร์หยดใส่ฝากระโปรง ที่คอนโดซอยแบริ่ง</h2>
<p>ลูกค้าพักอยู่คอนโดใน <strong>ซอยแบริ่ง (สุขุมวิท 107)</strong> จอดรถ Honda Civic สีดำไว้ใต้ช่องระบายอากาศ ปรากฏว่ามีน้ำแอร์หยดใส่ฝากระโปรงหน้าทิ้งไว้ 3 วัน พอขับออกมาตากแดด คราบน้ำฝังแน่นเป็นดวงด่างๆ สีขาวเต็มฝากระโปรง ลูกค้าลองใช้น้ำส้มสายชูเช็ดตามในเน็ตก็ไม่ออก แถมสีดูหมองลงอีก</p>

<p>ลูกค้านำรถเข้ามาที่ร้าน ช่างของเราประเมินว่าเป็นคราบน้ำระดับ 2-3 จึงดำเนินการดังนี้:</p>
<ol>
  <li><strong>ลงน้ำยาสลายคราบน้ำ (Water Spot Remover):</strong> เช็ดเฉพาะจุดที่มีคราบ เพื่อสลายแคลเซียมที่เกาะอยู่ด้านบน</li>
  <li><strong>ขัดสีเฉพาะจุด (Spot Correction):</strong> เนื่องจากคราบน้ำแอร์มีความเป็นกรดและเริ่มกัดแลคเกอร์ ช่างจึงใช้เครื่องขัด DA (Dual Action) กับฟองน้ำขัดระดับ Medium เพื่อปรับหน้าแลคเกอร์ให้เรียบเนียน</li>
  <li><strong>เคลือบเงาปกป้อง:</strong> ลงแว็กซ์ Carnauba เพื่อป้องกันน้ำเกาะในอนาคต</li>
</ol>
<p>หลังทำเสร็จ ฝากระโปรง Civic กลับมาดำเงาฉ่ำ ไร้รอยดวงคราบน้ำกวนใจครับ!</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/water-spot-removal-case2.svg" alt="ช่างใช้น้ำยาสลายคราบน้ำ ควบคู่กับการ ขัดคราบน้ำฝังแน่น ด้วยเครื่อง DA ถนนศรีนครินทร์" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 2: คราบน้ำบาดาลทั้งคัน หลังล้างรถเองที่แพรกษา</h2>
<p>ลูกค้าอยู่หมู่บ้านย่าน <strong>แพรกษา สมุทรปราการ</strong> ล้างรถเองที่บ้านด้วยน้ำประปา (ซึ่งแถวนั้นบางช่วงน้ำมีความกระด้างสูงคล้ายน้ำบาดาล) ล้างเสร็จตอนบ่ายแดดเปรี้ยง เช็ดไม่ทัน น้ำแห้งคารถ กลายเป็นคราบดวงๆ ทั้งคัน รวมถึงบนกระจกบานหน้าด้วย!</p>

<p>เคสนี้ต้องทำเต็มระบบครับ ช่างทำการลูบดินน้ำมัน (Clay Bar) เพื่อดึงคราบสากๆ ออกก่อน จากนั้นใช้เครื่องขัดสีเดิน <strong>ขัดคราบน้ำฝังแน่น</strong> ทั้งคัน ส่วนกระจกบานหน้าก็ใช้น้ำยาขัดกระจกโดยเฉพาะลบจุดน้ำออกจนใสปิ๊ง ไม่กวนสายตาเวลาขับรถตอนกลางคืนหรือตอนฝนตก</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/water-spot-removal-case3.svg" alt="ขัดคราบน้ำออกหมด 100% พร้อมเคลือบสีกันน้ำเกาะ คอนโดแบริ่ง สุขุมวิท 107" class="w-full h-auto object-cover m-0" />
</div>

<h2>วิธีป้องกัน "คราบน้ำฝังแน่น" ไม่ให้กลับมาอีก</h2>
<ul>
  <li><strong>เช็ดแห้งทันทีหลังล้างรถ:</strong> สำคัญที่สุด! ห้ามปล่อยให้น้ำแห้งเองเด็ดขาด ควรใช้ผ้าชามัวร์หรือผ้าไมโครไฟเบอร์ผืนใหญ่ซับน้ำให้แห้งสนิท</li>
  <li><strong>หลีกเลี่ยงการจอดใต้แอร์หรือต้นไม้:</strong> ในย่านลานจอดรถตามห้างอย่าง <strong>เซ็นทรัลบางนา หรือ ซีคอน</strong> ให้สังเกตเพดานก่อนจอดเสมอ</li>
  <li><strong>เคลือบสีรถ หรือ เคลือบแก้ว:</strong> การเคลือบสีจะสร้างชั้นฟิล์มลดการเกาะตัวของหยดน้ำ (Hydrophobic Effect) ทำให้น้ำกลิ้งออกง่าย ไม่เกาะเป็นดวง</li>
</ul>

<h2>หมดปัญหาคราบน้ำฝังลึก ให้ PORNPISIT BATTERY ดูแลสีรถคุณ</h2>
<p>ถ้าคุณลองล้างรถแล้ว คราบน้ำเป็นดวงๆ ก็ยังไม่ออก อย่าฝืนเอาสก๊อตไบรต์หรือน้ำยาเคมีรุนแรงไปขัดเองเด็ดขาดครับ เพราะสีรถจะพังหนักกว่าเดิม! นำรถมาให้ช่างผู้เชี่ยวชาญที่ <strong>PORNPISIT BATTERY</strong> ประเมินและ <strong>ขัดคราบน้ำฝังแน่น</strong> ให้ดีกว่าครับ เราบริการลูกค้าครอบคลุมพื้นที่ <strong>ห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง ลาซาล เทพารักษ์ สมุทรปราการ</strong> ด้วยน้ำยาและเครื่องขัดมาตรฐานสากล คืนความเงาใสให้รถคุณอย่างปลอดภัย 100%</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">✨ บริการขัดสี ลบคราบน้ำฝังลึก</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">คราบน้ำฝังแน่น สีรถด่าง? เราขัดให้ใสปิ๊งได้!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการสลายคราบน้ำฝน คราบน้ำบาดาล ด้วยน้ำยาเฉพาะทาง และขัดปรับสภาพสีรถให้กลับมาเรียบเนียน เงาฉ่ำ โซนห้วยขวาง ดินแดง ลาดพร้าว</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรสอบถามคิวขัดสี 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ประเมินคราบน้ำฟรี</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/car-polishing" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">บริการขัดคราบน้ำฝังแน่น ขัดสีรถถึงบ้าน ห้วยขวาง ดินแดง ลาดพร้าว</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ ศรีนครินทร์ แบริ่ง →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) การ ขัดคราบน้ำฝังแน่น</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ใช้น้ำส้มสายชูขัดคราบน้ำบนรถ ได้ผลจริงไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> น้ำส้มสายชู (กรดอ่อนๆ) สามารถสลายคราบแคลเซียมระดับแรกได้ครับ แต่ <strong>ต้องระวังมาก</strong> เพราะถ้าเช็ดไม่เกลี้ยง หรือทิ้งไว้นาน กรดจะไปกัดชั้นแลคเกอร์จนสีด่าง แนะนำให้ใช้น้ำยาสลายคราบน้ำสำหรับรถยนต์ (Water Spot Remover) จะปลอดภัยกว่าครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: คราบน้ำบนกระจกบานหน้า ขัดออกได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ขัดออกได้ครับ! แต่กระจกมีความแข็งกว่าสีรถมาก จึงต้องใช้น้ำยาขัดกระจกเฉพาะทาง (Cerium Oxide) และแป้นขัดกระจกโดยเฉพาะ เพื่อขจัดคราบน้ำฝังแน่นโดยไม่ทำให้กระจกเป็นรอย หรือเกิดภาพหลอกตาครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ขัดสีลบคราบน้ำแล้ว ต้องเคลือบแก้วเลยไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ไม่จำเป็นต้องเคลือบแก้วเสมอไปครับ แค่การเคลือบแว็กซ์เกรดพรีเมียม (Paste Wax / Sealant) ทันทีหลังขัดเสร็จ ก็สามารถป้องกันคราบน้ำได้ดีในระดับหนึ่งแล้ว เพียงแต่ต้องหมั่นลงแว็กซ์บ่อยกว่าการเคลือบแก้วครับ</p>
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
