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
    <rect x="0" y="-80" width="280" height="40" rx="20" fill="url(#glass-grad)" stroke="#FF6B00" stroke-width="1.5"/>
    <text x="140" y="-55" font-size="15" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">TRAVEL PREPARATION</text>

    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">เช็คแบตเตอรี่ก่อนเดินทาง</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">อย่าปล่อยให้รถตายกลางทาง!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">เคสรีวิวรถสตาร์ทไม่ติดก่อนเที่ยว โซนศรีนครินทร์ บางนา</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PORNPISIT BATTERY</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🧳 🚗 ❌</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เช้าวันหยุด จัดกระเป๋าเสร็จ รถสตาร์ทไม่ติดซะงั้น</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: หมู่บ้านซอยวัดหนามแดง ถนนเทพารักษ์</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">⚡ 🔋 🛠️</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ช่างตรวจเช็กค่า CCA พบแบตเตอรี่เสื่อมสภาพ</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ลานจอดรถคอนโด ถนนศรีนครินทร์</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">✅ 🚙 🛣️</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เปลี่ยนแบตเตอรี่ลูกใหม่ตรงรุ่น เดินทางต่อได้ทันที</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: บ้านลูกค้าโซนบางนา</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-check-battery-before-trip-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'check-battery-trip-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'check-battery-trip-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'check-battery-trip-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "เช็คแบตเตอรี่ก่อนเดินทาง ไกลแค่ไหนก็อุ่นใจ! ระวังรถตายตอนเทศกาล",
  slug: "check-car-battery-before-road-trip-guide",
  excerpt: "เตรียมตัวเที่ยวหยุดยาว แต่ลืม เช็คแบตเตอรี่ก่อนเดินทาง ? ระวังทริปจะล่มเพราะรถสตาร์ทไม่ติด! อ่านวิธีเช็กแบตง่ายๆ ด้วยตัวเอง พร้อมรีวิวเคสเปลี่ยนแบตเตอรี่ด่วน โซนศรีนครินทร์ บางนา",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "เช็คแบตเตอรี่ก่อนเดินทาง,แบตเตอรี่รถยนต์เสื่อม,เปลี่ยนแบตเตอรี่นอกสถานที่,แบตหมดกลางทาง,สตาร์ทไม่ติด,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "เช็คแบตเตอรี่ก่อนเดินทาง ก่อนทริปล่ม! รีวิวเปลี่ยนแบต โซนบางนา",
  seoDescription: "อย่าปล่อยให้รถตายกลางทาง! วิธี เช็คแบตเตอรี่ก่อนเดินทาง ช่วงเทศกาล พร้อมเคสรีวิวเปลี่ยนแบตเตอรี่ด่วนหน้าบ้าน โซนศรีนครินทร์ บางนา แบริ่ง เทพารักษ์ แพรกษา",
  seoKeywords: "เช็คแบตเตอรี่ก่อนเดินทาง, เปลี่ยนแบตเตอรี่นอกสถานที่ บางนา, แบตเตอรี่รถยนต์หมด, รถสตาร์ทไม่ติด, ร้านแบตเตอรี่ใกล้ฉัน",
  ogTitle: "เช็คแบตเตอรี่ก่อนเดินทาง ทริปไม่ล่มแน่นอน!",
  ogDescription: "แชร์วิธีเช็กแบตเตอรี่รถยนต์ง่ายๆ ก่อนออกทริป และรีวิวเรียกช่างเปลี่ยนแบตเตอรี่ด่วนให้ทันเวลาเที่ยว",
  coverImage: "/images/blog/pig-check-battery-before-trip-cover.svg",
  content: `
<p class="lead">เข้าสู่ช่วงเทศกาลวันหยุดยาวทีไร หลายครอบครัวคงเตรียมแพ็คกระเป๋า เตรียมขับรถเที่ยวต่างจังหวัดกันใช่ไหมครับ? แต่เชื่อมั้ยว่า ปัญหาอันดับ 1 ที่ทำให้ "ทริปล่ม" ตั้งแต่ยังไม่ออกจากบ้าน หรือไปตายกลางทาง ก็คือ <strong>"แบตเตอรี่รถยนต์เสื่อม"</strong> นั่นเองครับ การ <strong>เช็คแบตเตอรี่ก่อนเดินทาง</strong> จึงเป็นสิ่งสำคัญมาก วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาแชร์วิธีเช็กแบตเตอรี่ง่ายๆ พร้อมเล่าเคสระทึกของลูกค้าที่เกือบอดเที่ยวในโซน <strong>ห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์ สมุทรปราการ</strong> ให้ฟังกันครับ</p>

<h2>3 สัญญาณเตือน! แบตเตอรี่เริ่มเสื่อม ต้องรีบเปลี่ยนก่อนเดินทาง</h2>
<p>ก่อนจะสตาร์ทรถออกต่างจังหวัด ลองสังเกตอาการเหล่านี้ดูครับ ถ้ารถคุณมีอาการ 1 ใน 3 ข้อนี้ แนะนำให้เรียกร้านแบตเตอรี่มาเช็กด่วน!</p>
<ol>
  <li><strong>สตาร์ทรถตอนเช้าอืดๆ (Cranking Slow):</strong> เสียงไดสตาร์ทลากยาวกว่าปกติ "แชะ แชะ แชะ... ชึ่ง" ไม่ติดชึ่งในทีเดียว นี่คือสัญญาณว่าค่า CCA (กำลังสตาร์ท) ของแบตเตอรี่ตกลงมากแล้ว</li>
  <li><strong>ระบบไฟฟ้าในรถรวน:</strong> ไฟหน้าสว่างน้อยลง แอร์ไม่ค่อยเย็น หรือกระจกไฟฟ้าเลื่อนขึ้นลงช้าผิดปกติ โดยเฉพาะตอนที่จอดติดไฟแดง (รอบเดินเบา)</li>
  <li><strong>อายุแบตเตอรี่เกิน 1.5 - 2 ปี:</strong> แบตเตอรี่รถยนต์ในยุคปัจจุบัน (แบบกึ่งแห้ง หรือ MF) มักจะมีอายุการใช้งานเฉลี่ยอยู่ที่ 1 ปีครึ่ง ถึง 2 ปีเท่านั้น หากใช้เกินกว่านี้ ถือว่ามีความเสี่ยงที่จะหมดกลางทางได้ทุกเมื่อครับ</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/check-battery-trip-case1.svg" alt="เช้าวันหยุด จัดกระเป๋าเสร็จ รถสตาร์ทไม่ติด หมู่บ้านซอยวัดหนามแดง ถนนเทพารักษ์" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: ทริปเกือบล่ม! เช้าวันเสาร์ที่ ซอยวัดหนามแดง เทพารักษ์</h2>
<p>เช้าวันเสาร์ช่วงหยุดยาว ลูกค้าครอบครัวหนึ่งใน <strong>ซอยวัดหนามแดง ถนนเทพารักษ์</strong> จัดกระเป๋าขึ้นรถ Toyota Fortuner เตรียมตัวจะขับรถไปเที่ยวเขาใหญ่ตอน 7 โมงเช้า พอทุกคนขึ้นรถพร้อม ลูกค้าบิดกุญแจสตาร์ท ปรากฏว่า... <strong>"แชะ... เงียบกริบ!"</strong> หน้าปัดไฟหรี่ลง รถสตาร์ทไม่ติด</p>

<p>ลูกค้าตกใจมาก เพราะจองที่พักไว้หมดแล้ว จึงรีบเสิร์ชหา <a href="/battery-replacement" class="text-orange-600 font-bold hover:underline">เปลี่ยนแบตเตอรี่นอกสถานที่</a> และเจอเรา PORNPISIT BATTERY ทีมช่างรีบวิ่งมอเตอร์ไซค์ไปถึงบ้านลูกค้าภายใน 20 นาที</p>

<p>ช่างนำเครื่องวัดแบตเตอรี่ (Battery Tester) มาเช็ก พบว่าค่า CCA ต่ำกว่าเกณฑ์มาก และแบตลูกนี้ใช้มาเกือบ 2 ปีครึ่งแล้ว ช่างจึงทำการเปลี่ยนแบตเตอรี่ลูกใหม่ตรงรุ่นให้ทันที พร้อมสำรองไฟ (เลี้ยงระบบ) เพื่อไม่ให้ความจำวิทยุและนาฬิกาหาย ใช้เวลาเปลี่ยนไม่ถึง 15 นาที ลูกค้าก็สามารถสตาร์ทรถและออกเดินทางไปเขาใหญ่ได้อย่างสบายใจครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/check-battery-trip-case2.svg" alt="ช่างตรวจเช็กค่า CCA พบแบตเตอรี่เสื่อม ลานจอดรถคอนโด ถนนศรีนครินทร์" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 2: แบตหมดกลางปั๊มน้ำมัน แวะเข้าห้องน้ำบนถนนศรีนครินทร์</h2>
<p>เคสนี้อันตรายกว่าเคสแรกครับ! ลูกค้าขับรถออกจากบ้านแถว <strong>แบริ่ง</strong> ได้สักพัก แวะปั๊มน้ำมันริม <strong>ถนนศรีนครินทร์</strong> เพื่อซื้อกาแฟและเข้าห้องน้ำ พอทำธุระเสร็จ กลับมาขึ้นรถ ปรากฏว่าสตาร์ทไม่ติดแล้ว (อาการแบบนี้เรียกว่า แบตช็อตช่อง หรือแผ่นธาตุขาดเฉียบพลัน ซึ่งมักเกิดกับแบตที่อายุเยอะ)</p>

<p>โชคดีที่ลูกค้ายังอยู่ในเขตกรุงเทพฯ/สมุทรปราการ จึงโทรเรียก <strong>PORNPISIT BATTERY</strong> ให้ไปเปลี่ยนแบตเตอรี่กลางปั๊มน้ำมันได้ ลองจินตนาการดูสิครับว่า ถ้าไปเกิดเหตุแบบนี้ในปั๊มมืดๆ ระหว่างทางขึ้นเขา จะลำบากแค่ไหน? นี่จึงเป็นเหตุผลที่ต้อง <strong>เช็คแบตเตอรี่ก่อนเดินทาง</strong> เสมอครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/check-battery-trip-case3.svg" alt="เปลี่ยนแบตเตอรี่ลูกใหม่ตรงรุ่น ก่อนเดินทาง บ้านลูกค้าโซนบางนา" class="w-full h-auto object-cover m-0" />
</div>

<h2>วิธี เช็คแบตเตอรี่ก่อนเดินทาง ด้วยตัวเองเบื้องต้น</h2>
<ul>
  <li><strong>ดูตาแมว (Indicator):</strong> แบตเตอรี่ส่วนใหญ่จะมีตาแมวให้ส่องดู ถ้าเป็นสีเขียว/สีฟ้า แปลว่าไฟเต็ม แต่ถ้าเปลี่ยนเป็นสีขาว/ใส แปลว่าไฟอ่อน หรือถ้าเป็นสีแดง แปลว่าต้องเติมน้ำกลั่นด่วน (แต่ตาแมวก็บอกได้แค่คร่าวๆ นะครับ)</li>
  <li><strong>ดูขั้วแบตเตอรี่:</strong> เปิดฝากระโปรงรถดูขั้วแบต (+ และ -) ว่ามีคราบเกลือขี้เกลือสีขาวๆ เกาะอยู่ไหม ถ้ามี ให้ใช้น้ำร้อนราดและเอาแปรงสีฟันขัดออก เพราะคราบนี้ทำให้ไฟเดินไม่สะดวก</li>
  <li><strong>เช็กอายุแบตเตอรี่:</strong> ดูวันที่ที่ร้านเก่าจดไว้บนสติกเกอร์หน้าแบตเตอรี่ ถ้าใกล้ครบ 2 ปีแล้ว เปลี่ยนใหม่เพื่อความชัวร์ดีกว่าครับ</li>
</ul>

<h2>ก่อนเดินทางไกล เรียก PORNPISIT BATTERY ไปเช็กหรือเปลี่ยนแบตให้สิครับ!</h2>
<p>อย่าปล่อยให้ความสนุกของทริปต้องสะดุดเพราะแบตเตอรี่หมดกลางทาง! หากคุณไม่แน่ใจว่าแบตเตอรี่รถยนต์ของคุณยังไหวไหม หรือรถเริ่มสตาร์ทอืดๆ โทรเรียก <strong>PORNPISIT BATTERY</strong> ได้เลยครับ เรารับบริการเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ จัดส่งและติดตั้งให้ถึงบ้าน ภายใน 30 นาที ครอบคลุมพื้นที่ <strong>ห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</strong> แบตเตอรี่ใหม่แกะกล่อง มีใบรับประกันทุกลูก เที่ยวไกลแค่ไหนก็อุ่นใจครับ!</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">🔋 เปลี่ยนแบตเตอรี่ด่วน นอกสถานที่</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">แบตเสื่อมก่อนออกทริป? เราส่งแบตใหม่ให้ถึงบ้าน 30 นาที!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการเช็กค่า CCA และเปลี่ยนแบตเตอรี่รถยนต์ พร้อมเลี้ยงไฟระบบ ไม่ต้องจั๊มสตาร์ท โซนห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 สั่งแบตเตอรี่ด่วน 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งรุ่นรถมาเช็กราคา</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/battery-replacement" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">เปลี่ยนแบตเตอรี่รถยนต์ นอกสถานที่ เทพารักษ์ บางนา</a></p>
    <p style="margin-top:0.75rem;"><a href="/mobile-tire-repair" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">บริการปะยางนอกสถานที่ 24 ชม. ห้วยขวาง ดินแดง ลาดพร้าว →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) การ เช็คแบตเตอรี่ก่อนเดินทาง</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: พกสายพ่วงแบต (Jumper Cable) ไว้ท้ายรถ อุ่นใจพอไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> การพกสายพ่วงแบตดีครับ แต่ถ้าคุณไปเที่ยวในที่เปลี่ยว หรือจอดบนดอยที่ไม่มีรถคันอื่นให้พ่วง สายพ่วงก็ไร้ประโยชน์ครับ! ทางที่ดีที่สุดคือการเช็กและเปลี่ยนแบตเตอรี่ที่เสื่อมสภาพให้เรียบร้อย <strong>ก่อนเดินทาง</strong> จะปลอดภัยที่สุดครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ตาแมวแบตเตอรี่เป็นสีเขียว แต่ทำไมสตาร์ทไม่ติด?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ตาแมว (Indicator) วัดความถ่วงจำเพาะของน้ำกรดแค่ 1 ช่องจากทั้งหมด 6 ช่องครับ ดังนั้นแม้ตาแมวจะเขียว แต่ถ้าแผ่นธาตุในช่องอื่นเสื่อมหรือช็อต รถก็สตาร์ทไม่ติดอยู่ดี การใช้เครื่องวัดค่า CCA (Cold Cranking Amps) แบบดิจิตอลของช่าง จะให้ผลลัพธ์ที่แม่นยำ 100% ครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ถ้าแบตเตอรี่เพิ่งใช้มา 1 ปี ต้องเปลี่ยนก่อนเดินทางไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ถ้ารถสตาร์ทติดปกติ ไดชาร์จทำงานปกติ แบตเตอรี่อายุ 1 ปี ถือว่ายังอยู่ในเกณฑ์ดีและใช้เดินทางไกลได้สบายครับ ไม่จำเป็นต้องรีบเปลี่ยน แต่เพื่อความสบายใจ สามารถเรียกร้านแบตเตอรี่หรือแวะศูนย์บริการเพื่อวัดค่า CCA ก่อนออกทริปได้ครับ</p>
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
