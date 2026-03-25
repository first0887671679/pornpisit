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

    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">ร้านปะยาง 24 ชม.</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">ดึกแค่ไหนก็ไปถึง!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวช่วยลูกค้าตี 2 โซนบางนา ศรีนครินทร์</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">FIRSTCARCENTER</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 🌑 💥</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ยางแตกกลางดึก ตี 2 รถขวางหน้าซอย</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: แยกเทพารักษ์ ถนนศรีนครินทร์</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔧 🛵 💨</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ทีมมอเตอร์ไซค์ถึงหน้างานใน 20 นาที</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนบางนา-ตราด กม.5</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛠️ ✅ 🛡️</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ปะยางแบบแทงใยไหม ปลอดภัย ขับต่อได้เลย</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโดในซอยแบริ่ง สุขุมวิท 107</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-24h-tire-repair-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, '24h-tire-repair-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, '24h-tire-repair-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, '24h-tire-repair-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ร้านปะยาง 24 ชม. ดึกแค่ไหนก็ไปถึง! รีวิวช่วยลูกค้ายางแตกตอนตี 2",
  slug: "24-hour-mobile-tire-repair-service-guide",
  excerpt: "ยางแตกรั่วกลางดึก ไม่รู้จะเรียกใคร? ดูรีวิวเคสจริงจาก ร้านปะยาง 24 ชม. ของเรา ที่ออกช่วยเหลือลูกค้ายามวิกาล โซนศรีนครินทร์ บางนา เทพารักษ์ ถึงไวใน 30 นาที",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "ร้านปะยาง 24 ชม,ปะยางนอกสถานที่,ยางแตกกลางดึก,เปลี่ยนยางอะไหล่,ร้านปะยางใกล้ฉัน,สมุทรปราการ,บางนา",
  published: 1,
  author: "FIRSTCARCENTER",
  seoTitle: "ร้านปะยาง 24 ชม. ปะยางนอกสถานที่ ถึงไว 30 นาที โซนบางนา",
  seoDescription: "ยางแตกกลางดึก หา ร้านปะยาง 24 ชม. ใกล้ฉัน? อ่านเคสรีวิวช่างปะยางนอกสถานที่ โซนศรีนครินทร์ บางนา แบริ่ง เทพารักษ์ ถึงหน้างานไวใน 30 นาที",
  seoKeywords: "ร้านปะยาง 24 ชม, ปะยางนอกสถานที่ 24 ชม, ยางแตกกลางคืน, ปะยางรถยนต์ บางนา, เปลี่ยนยางอะไหล่",
  ogTitle: "ร้านปะยาง 24 ชม. ยางแตกตอนตี 2 ก็มีช่างไปช่วย!",
  ogDescription: "รีวิวเคสจริง ช่างออกปะยางนอกสถานที่กลางดึก โซนศรีนครินทร์-บางนา ถึงไว ไม่ทิ้งให้ลูกค้ารอเก้อ",
  coverImage: "/images/blog/pig-24h-tire-repair-cover.svg",
  content: `
<p class="lead">การที่ยางรถยนต์มารั่วหรือแตกตอนกลางวันว่าแย่แล้ว แต่ถ้ามาเกิดเหตุตอนกลางคืน ดึกๆ ดื่นๆ ยิ่งชวนให้ใจเสียครับ หลายคนไม่รู้จะพึ่งใคร เพราะอู่และศูนย์บริการก็ปิดหมดแล้ว การหา <strong>ร้านปะยาง 24 ชม.</strong> ที่ไว้ใจได้และมาจริง จึงสำคัญมาก วันนี้ <strong>FirstCarCenter</strong> จะมาแชร์ประสบการณ์ตรงจากการออกช่วยเหลือลูกค้ายางแตกยามวิกาล ในย่าน <strong>บางนา ศรีนครินทร์ เทพารักษ์ แบริ่ง ลาซาล สมุทรปราการ</strong> เพื่อให้คุณรู้ว่า ดึกแค่ไหน เราก็ไม่ทิ้งคุณครับ</p>

<h2>ยางแตกกลางดึก ทำอย่างไรก่อนที่ช่างจะมา?</h2>
<p>ก่อนที่ทีมงาน <strong>ร้านปะยาง 24 ชม.</strong> จะไปถึง สิ่งสำคัญที่สุดคือ "ความปลอดภัย" ของตัวคุณเองครับ ถ้าเกิดเหตุยางแตกกลางคืน ให้ทำตามขั้นตอนนี้ทันที:</p>
<ol>
  <li><strong>ประคองรถเข้าข้างทาง:</strong> เปิดไฟเลี้ยวซ้าย ค่อยๆ เหยียบเบรกประคองรถเข้าจอดไหล่ทาง <strong>อย่าเบรกกะทันหัน</strong> เพราะรถอาจเสียการทรงตัว</li>
  <li><strong>เปิดไฟฉุกเฉิน:</strong> ทันทีที่รถจอดสนิท เพื่อให้รถคันหลังสังเกตเห็นแต่ไกล</li>
  <li><strong>อย่ายืนท้ายรถ:</strong> ให้อยู่ในรถ ล็อคประตู หรือถ้าจะลงมายืน ให้ยืนหลบอยู่บนฟุตบาทหรือหลังแบริเออร์</li>
  <li><strong>ตั้งสติแล้วโทรเรียกช่าง:</strong> โทรหา FirstCarCenter แจ้งพิกัดที่ชัดเจน (เช่น หน้าปั๊ม ปากซอย หรือส่ง Location ทาง Line)</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/24h-tire-repair-case1.svg" alt="ยางแตกกลางดึก ตี 2 จอดรอ ร้านปะยาง 24 ชม. ที่แยกเทพารักษ์" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: ระทึกตี 2 ยางแตกแยกเทพารักษ์ ถนนศรีนครินทร์</h2>
<p>คืนวันศุกร์เวลาตี 2 กว่าๆ ลูกค้าผู้หญิงขับรถกลับจากทำโอที มุ่งหน้ากลับบ้านบน <strong>ถนนศรีนครินทร์</strong> พอถึงช่วง <strong>แยกเทพารักษ์</strong> รถตกหลุมบ่อก่อสร้างขนาดใหญ่ ได้ยินเสียง "ปัง!" แล้วพวงมาลัยก็ดึงซ้ายอย่างแรง โชคดีที่ลูกค้ามีสติประคองรถเข้าจอดข้างทางได้ปลอดภัย</p>

<p>ลูกค้าเสิร์ชหา <strong>"ร้านปะยาง 24 ชม ใกล้ฉัน"</strong> และโทรหาเราด้วยน้ำเสียงตกใจ ทีมช่างมอเตอร์ไซค์เคลื่อนที่เร็วของเราสแตนด์บายอยู่ที่ <strong>บางนา</strong> พอรับแจ้งพิกัด ก็รีบคว้าชุดปะยางและปั๊มลม บิดทะลุความมืดไปถึงหน้างานในเวลาเพียง <strong>18 นาที</strong></p>

<p>ช่างตรวจดูพบว่า ยางแตกที่แก้มยาง ไม่สามารถปะได้ โชคดีที่รถมี <a href="/mobile-tire-repair" class="text-orange-600 font-bold hover:underline">บริการเปลี่ยนยางอะไหล่นอกสถานที่</a> ท้ายรถ ช่างจึงทำการขึ้นแม่แรง ถอดล้อที่แตกออก และเปลี่ยนใส่ยางอะไหล่ให้ พร้อมเติมลมยางอะไหล่ให้ได้มาตรฐาน ใช้เวลาทำงานเพียง 15 นาที ลูกค้าก็ขับรถกลับบ้านต่อได้อย่างปลอดภัย</p>

<h2>Case Study 2: โดนตะปูตำ ลมซึมออกหมด หน้าเซ็นทรัลบางนา</h2>
<p>อีกเคสเกิดขึ้นช่วงหัวค่ำ 3 ทุ่ม ลูกค้าแวะทานข้าวที่ <strong>เซ็นทรัลบางนา</strong> พอเดินกลับมาที่ลานจอดรถ พบว่ายางหลังขวาแบนติดพื้นเลย สาเหตุคือไปเหยียบตะปูเกลียวตัวใหญ่มาตั้งแต่ตอนไหนไม่รู้ ลมค่อยๆ ซึมออกจนหมดตอนจอด</p>

<p>ลานจอดรถของห้างนั้น รถลาก (Slide) เข้ามาไม่ได้แน่นอน ลูกค้าโทรเรียกเราไปบริการ <strong>ปะยางนอกสถานที่</strong> ช่างขี่มอเตอร์ไซค์ขึ้นไปถึงลานจอดรถ ใช้แม่แรงยกรถ ตรวจพบแผลตะปูตำที่หน้ายาง (ดอกยาง) ช่างจึงทำการ <strong>ปะยางแบบแทงใยไหม (Tire Plug)</strong> ซึ่งเป็นการปะที่รวดเร็วและทนทาน ไม่ต้องถอดล้อออกจากรถ เสร็จแล้วเติมลมเช็กจุดรั่วซึมด้วยน้ำสบู่ — ผ่านฉลุย! ลูกค้าไม่ต้องมือเลอะเปลี่ยนล้อเอง</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/24h-tire-repair-case2.svg" alt="ทีมช่าง ร้านปะยาง 24 ชม. ขี่มอเตอร์ไซค์ถึงหน้างาน ถนนบางนา-ตราด" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 3: รถยุโรปยาง Runflat รั่วในซอยแบริ่ง (สุขุมวิท 107)</h2>
<p>เคสนี้เป็นรถ BMW ใช้ยางประเภท <strong>Runflat</strong> ลูกค้าขับเข้า <strong>ซอยแบริ่ง (สุขุมวิท 107)</strong> ตอนเที่ยงคืน ไฟเตือนลมยางขึ้นโชว์หน้าปัด ลูกค้าขับช้าๆ เข้าไปจอดในคอนโด แม้ยาง Runflat จะขับต่อได้เมื่อไม่มีลม แต่ถ้าขับไกลเกินไปโครงสร้างยางจะพังถาวร</p>

<p>ช่างของเราที่มีความเชี่ยวชาญด้าน <a href="/mobile-tire-repair" class="text-orange-600 font-bold hover:underline">ปะยางรถยุโรป Runflat นอกสถานที่</a> ไปถึงคอนโดลูกค้า ตรวจหาแผลพบว่าโดนน็อตตำที่หน้ายาง ทำการปะใยไหมอย่างระมัดระวัง เติมลม และรีเซ็ตระบบเตือนลมยาง (TPMS) ให้ที่หน้าปัดรถ ครบจบกระบวนการ รถหรูแค่ไหนเราก็จัดการให้ได้มาตรฐานครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/24h-tire-repair-case3.svg" alt="ช่างปะยางนอกสถานที่แบบแทงใยไหม ยางรถยุโรป คอนโดซอยแบริ่ง" class="w-full h-auto object-cover m-0" />
</div>

<h2>ทำไมลูกค้าถึงเลือก ร้านปะยาง 24 ชม. FirstCarCenter?</h2>
<ul>
  <li><strong>มอเตอร์ไซค์เคลื่อนที่เร็ว:</strong> รถติด หรือซอยแคบอย่าง <strong>ซอยวัดหนามแดง หรือ แพรกษา</strong> เราก็มุดไปถึงได้ไวกว่ารถกระบะ</li>
  <li><strong>เปิด 24 ชั่วโมงจริงๆ:</strong> โทรมาตอนไหนก็มีคนรับสาย มีช่างสแตนด์บายออกวิ่งทันที</li>
  <li><strong>อุปกรณ์ครบมือ:</strong> แม่แรงตะเข้ ปั๊มลมพกพา ชุดปะใยไหม ชุดปะสตรีม (ปะเย็น) บล็อกถอดล้อไฟฟ้า ครบชุดเหมือนยกร้านปะยางไปไว้หน้ารถคุณ</li>
  <li><strong>ช่างมีประสบการณ์:</strong> ไม่ว่าจะเป็นน็อตล้อรูด น็อตกันขโมย หรือรถโหลดเตี้ย ช่างเราแก้ปัญหาเฉพาะหน้าได้หมด</li>
</ul>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">📞 บริการ 24 ชม. ถึงที่ทันที</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">ยางแตก ยางรั่ว กลางดึก? เรียกช่างปะยางด่วน!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">ทีมช่างมอเตอร์ไซค์พร้อมชุดปะยาง วิ่งไปช่วยเหลือถึงหน้างานภายใน 30 นาที โซนบางนา ศรีนครินทร์ เทพารักษ์ สมุทรปราการ</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0887671679" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่าง 088-767-1679</a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่ง Location ด่วน</a>
    </div>
    <p style="margin-top:1.5rem;"><a href="/mobile-tire-repair" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">บริการปะยางด่วน 24 ชม. เทพารักษ์ บางนา ศรีนครินทร์</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ บางนา ศรีนครินทร์ →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) เรียก ร้านปะยาง 24 ชม.</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ปะยางนอกสถานที่แบบแทงใยไหม ปลอดภัยไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ปลอดภัยและเป็นมาตรฐานสากลครับ การปะแบบแทงใยไหม (Tire Plug) เหมาะสำหรับแผลที่เกิดจากตะปูหรือน็อตตำที่หน้ายาง (ดอกยาง) สามารถขับต่อได้ด้วยความเร็วปกติ และอยู่ทนจนกว่ายางจะหมดอายุครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ถ้ายางแตก แก้มยางฉีก ปะได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> แผลที่แก้มยาง <strong>ไม่สามารถปะได้ทุกกรณี</strong> ครับ เพราะแก้มยางต้องรับน้ำหนักและยืดหยุ่นตลอดเวลา หากปะไปจะเสี่ยงระเบิด ในกรณีนี้ช่างของเราจะบริการ <strong>เปลี่ยนยางอะไหล่</strong> ของรถลูกค้าใส่แทน เพื่อให้ขับไปเปลี่ยนยางเส้นใหม่ที่ร้านยางในวันรุ่งขึ้นครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: เรียกตอนตี 3 ช่างมาถึงในกี่นาที?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> หากอยู่ในพื้นที่บริการหลักอย่าง ศรีนครินทร์ บางนา ลาซาล แบริ่ง เทพารักษ์ แพรกษา ตอนกลางคืนรถไม่ติด ช่างมอเตอร์ไซค์ของเราสามารถไปถึงหน้างานได้ภายใน <strong>15 - 30 นาที</strong> ครับ</p>
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
