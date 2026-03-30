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

    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">ยางแบนบนทางด่วน</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">กลางดึก ทำยังไงดี?</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวช่วยลูกค้าเปลี่ยนยางอะไหล่ โซนห้วยขวาง ดินแดง ลาดพร้าว</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PORNPISIT BATTERY</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 🛣️ 💥</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">จอดรถชิดซ้าย เปิดไฟฉุกเฉิน บนทางด่วนบูรพาวิถี</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ทางด่วนบูรพาวิถี ช่วงบางนา-ตราด กม.5</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚨 📞 🚓</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">โทรเรียกกู้ภัยทางด่วน ช่วยลากลงมาข้างล่าง</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: จุดลงทางด่วน ถนนศรีนครินทร์</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔧 🛞 ✅</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ช่างรอรับช่วงต่อ เปลี่ยนยางอะไหล่เสร็จไวใน 15 นาที</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ลานจอดรถเซ็นทรัลบางนา</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-flat-tire-highway-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'flat-tire-highway-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'flat-tire-highway-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'flat-tire-highway-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ยางแบนบนทางด่วน กลางดึก ทำยังไงดี? รวมวิธีรับมือ + เคสรีวิวเรียกช่าง",
  slug: "flat-tire-on-highway-survival-guide",
  excerpt: "ขับรถอยู่ดีๆ ยางแบนบนทางด่วน ตอนกลางคืน! จอดรถตรงไหน? เรียกใครช่วย? อ่านวิธีเอาตัวรอดที่ปลอดภัยที่สุด พร้อมเคสรีวิวเรียกช่างเปลี่ยนยางอะไหล่ โซนห้วยขวาง ดินแดง ลาดพร้าว",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "ยางแบนบนทางด่วน,ยางแตกบนทางด่วน,เปลี่ยนยางอะไหล่,ปะยางนอกสถานที่,รถเสียบนทางด่วน,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "ยางแบนบนทางด่วน ทำไงดี? วิธีเอาตัวรอด+เรียกช่าง โซนบางนา",
  seoDescription: "ยางแบนบนทางด่วน กลางคืน อันตรายมาก! อ่านวิธีรับมือ โทรเบอร์ไหน จอดตรงไหน พร้อมเคสรีวิวเรียกช่างเปลี่ยนยางอะไหล่ด่วน โซนศรีนครินทร์ บางนา",
  seoKeywords: "ยางแบนบนทางด่วน, ยางแตกบนทางด่วน, เปลี่ยนยางอะไหล่นอกสถานที่, รถเสียบนทางด่วน, ปะยางนอกสถานที่ 24 ชม",
  ogTitle: "ยางแบนบนทางด่วน กลางดึก! รอดได้ด้วยวิธีนี้",
  ogDescription: "แชร์ประสบการณ์ตรง ยางแตกบนทางด่วนบูรพาวิถีตอนกลางคืน พร้อมขั้นตอนเอาตัวรอด และรีวิวเรียกช่าง PORNPISIT BATTERY",
  coverImage: "/images/blog/pig-flat-tire-highway-cover.svg",
  content: `
<p class="lead">การเกิดเหตุ <strong>ยางแบนบนทางด่วน</strong> หรือยางแตกขณะขับรถด้วยความเร็วสูง เป็นสถานการณ์ที่อันตรายและน่ากลัวที่สุดอย่างหนึ่งของคนใช้รถครับ ยิ่งถ้าเกิดเหตุตอนกลางคืน ดึกๆ ดื่นๆ บนทางด่วน <strong>บูรพาวิถี (บางนา-ตราด) หรือทางด่วนกาญจนาภิเษก (ศรีนครินทร์-เทพารักษ์)</strong> ที่รถบรรทุกวิ่งเยอะ ยิ่งต้องมีสติ วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาแนะนำขั้นตอนการเอาตัวรอดที่ถูกต้อง พร้อมแชร์ Case Study จริงที่เพิ่งไปช่วยเหลือลูกค้ามาครับ</p>

<h2>เมื่อ "ยางแบนบนทางด่วน" สิ่งแรกที่ต้องทำคืออะไร?</h2>
<p>หากคุณได้ยินเสียงยางระเบิด "ปัง!" หรือรู้สึกว่าพวงมาลัยดึงไปข้างใดข้างหนึ่งอย่างแรง รถมีอาการส่าย <strong>นี่คือกฎเหล็ก 4 ข้อที่ต้องจำให้ขึ้นใจ:</strong></p>

<ol>
  <li><strong>จับพวงมาลัยให้แน่นที่สุด:</strong> อย่าตกใจ อย่าหักหลบกะทันหัน บังคับพวงมาลัยให้รถวิ่งตรงไปข้างหน้า</li>
  <li><strong>ห้ามเหยียบเบรกกะทันหัน (กระทืบเบรก):</strong> การเบรกแรงๆ ขณะยางแบนจะทำให้รถหมุนคว้างและพลิกคว่ำได้ ให้ถอนคันเร่ง ค่อยๆ แตะเบรกเบาๆ (เลียเบรก) เพื่อลดความเร็ว</li>
  <li><strong>เปิดไฟเลี้ยวซ้ายและประคองรถเข้าไหล่ทาง:</strong> มองกระจกหลังให้แน่ใจว่าไม่มีรถตามมาติดๆ ค่อยๆ นำรถเข้าจอดชิดซอบซ้ายสุด (ไหล่ทาง) หรือจุดจอดฉุกเฉิน (ถ้ามี)</li>
  <li><strong>จอดสนิทแล้ว เปิดไฟฉุกเฉินทันที:</strong> เพื่อให้รถคันหลังสังเกตเห็นแต่ไกล <strong>อย่าลงจากรถฝั่งขวา (ฝั่งถนน) เด็ดขาด</strong> ให้ปีนออกทางประตูฝั่งซ้าย และไปยืนหลังแบริเออร์เพื่อความปลอดภัย</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/flat-tire-highway-case1.svg" alt="จอดรถชิดซ้าย ยางแบนบนทางด่วนบูรพาวิถี ช่วงบางนา-ตราด" class="w-full h-auto object-cover m-0" />
</div>

<h2>รถเสียบนทางด่วน เรียกช่างปะยางขึ้นไปทำได้ไหม?</h2>
<p>หลายคนมักจะโทรหา <a href="/mobile-tire-repair" class="text-orange-600 font-bold hover:underline">ร้านปะยาง 24 ชม.</a> เพื่อให้ช่างขึ้นไปเปลี่ยนยางบนทางด่วน <strong>แต่ในความเป็นจริง การจอดซ่อมรถบนทางด่วนเป็นเรื่องที่อันตรายมากและผิดกฎหมายครับ</strong> (ยกเว้นเจ้าหน้าที่กู้ภัยของทางด่วน)</p>

<p><strong>วิธีที่ถูกต้องและปลอดภัยที่สุดคือ:</strong></p>
<ol>
  <li><strong>โทรเรียกกู้ภัยทางด่วน (เบอร์ 1543 หรือ 1586 หรือ 1193):</strong> แจ้งพิกัด (ดูป้ายกิโลเมตรข้างทาง) ให้เจ้าหน้าที่นำรถลาก (Slide) มาลากรถของคุณลงไปจอดในจุดที่ปลอดภัยด้านล่างทางด่วน เช่น ปั๊มน้ำมัน ลานจอดห้าง หรือริมถนนปกติ (บริการลากลงทางด่วนมักจะฟรี หรือมีค่าใช้จ่ายเล็กน้อยตามระยะทาง)</li>
  <li><strong>โทรเรียก PORNPISIT BATTERY ไปรอรับช่วงต่อ:</strong> ขณะที่รอรถลาก คุณสามารถโทรหาเราเพื่อนัดหมายสถานที่ด้านล่างทางด่วน ช่างของเราจะไปสแตนด์บายรอ เมื่อรถคุณลงมาถึง ช่างก็พร้อมเข้าชาร์จทันที!</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/flat-tire-highway-case2.svg" alt="โทรเรียกกู้ภัยทางด่วน ลากรถลงมาที่ถนนศรีนครินทร์ หลังยางแบนบนทางด่วน" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study: ยางแตกบนด่วนบูรพาวิถี กลางดึกตี 1</h2>
<p>ลูกค้าขับรถ SUV พาครอบครัวกลับจากชลบุรี ใช้ทางด่วน <strong>บูรพาวิถี ช่วงกิโลเมตรที่ 5 (บางนา)</strong> เวลาประมาณตี 1 จู่ๆ ยางหน้าซ้ายระเบิด ลูกค้ามีสติประคองรถเข้าจอดไหล่ทางได้สำเร็จ</p>

<p>ลูกค้าโทรหา PORNPISIT BATTERY เราได้แนะนำให้ลูกค้าอยู่ในรถอย่างปลอดภัยและ <strong>โทรเรียกกู้ภัยทางด่วน (1543)</strong> ให้ช่วยสไลด์รถลงมาจอดที่ลานจอดรถด้านหน้า <strong>เซ็นทรัลบางนา</strong> (ซึ่งอยู่ใกล้จุดลงทางด่วนที่สุด)</p>

<p>ระหว่างที่รถลากกำลังดำเนินการ ทีมช่างของ PORNPISIT BATTERY ก็ขี่มอเตอร์ไซค์ไปสแตนด์บายรอที่เซ็นทรัลบางนาแล้ว พอรถลูกค้าลงมาถึง ช่างก็ใช้แม่แรงตะเข้ยกรถ ถอดล้อที่ยางแตกยับออก (ปะไม่ได้แล้ว) และนำ <a href="/mobile-tire-repair" class="text-orange-600 font-bold hover:underline">บริการเปลี่ยนยางอะไหล่นอกสถานที่</a> โดยนำยางจากท้ายรถลูกค้ามาเปลี่ยนใส่ให้ เติมลมเช็กความดันให้พร้อมใช้งาน ใช้เวลาจากตอนที่รถลงทางด่วนมาจนขับกลับบ้านได้ ไม่ถึง 20 นาทีครับ!</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/flat-tire-highway-case3.svg" alt="ช่างเปลี่ยนยางอะไหล่เสร็จไว ลานจอดรถเซ็นทรัลบางนา" class="w-full h-auto object-cover m-0" />
</div>

<h2>สรุป: ยางแบนบนทางด่วน จำไว้ว่า "ลงข้างล่างก่อน แล้วค่อยซ่อม"</h2>
<p>ความปลอดภัยของชีวิตคุณและครอบครัวสำคัญกว่ารถครับ <strong>อย่าเสี่ยงเปลี่ยนยางเองบนทางด่วนเด็ดขาด</strong> ให้กู้ภัยลากลงมาที่ <strong>แยกห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์ ลาซาล แบริ่ง สุขุมวิท หรือ สมุทรปราการ</strong> แล้วโทรหา <strong>PORNPISIT BATTERY</strong> เรามีทีมช่างมอเตอร์ไซค์ 24 ชั่วโมง วิ่งไปปะยาง หรือเปลี่ยนยางอะไหล่ให้ถึงที่ รวดเร็ว ปลอดภัย ไม่ต้องเสี่ยงรถชนครับ</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">📞 บริการ 24 ชม. ถึงที่ทันที</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">ลงจากทางด่วนแล้ว ยางแบน ไปต่อไม่ได้?</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">ให้กู้ภัยลากรถลงมาที่ปลอดภัย แล้วเรียกเรา! ช่างพร้อมชุดปะยางและแม่แรง วิ่งไปเปลี่ยนยางอะไหล่ให้ถึงที่ 24 ชม. โซนห้วยขวาง ดินแดง ลาดพร้าว</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่าง 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งพิกัดจุดจอดรถ</a>
    </div>
    <p style="margin-top:1.5rem;"><a href="/mobile-tire-repair" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">เรียกช่างปะยางนอกสถานที่ 24 ชม. ห้วยขวาง ดินแดง ลาดพร้าว</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ ศรีนครินทร์ เทพารักษ์ →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) เมื่อยางแบนบนทางด่วน</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: เบอร์ฉุกเฉินทางด่วน มีเบอร์อะไรบ้าง?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> กทพ. (ทางด่วนพิเศษ) โทร 1543, กรมทางหลวงมอเตอร์เวย์ (สาย 7, 9) โทร 1586 กด 7, ตำรวจทางหลวง โทร 1193 ควรบันทึกเบอร์เหล่านี้ไว้ในมือถือครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ช่าง PORNPISIT BATTERY ขึ้นไปซ่อมบนทางด่วนได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> <strong>ไม่ได้ครับ</strong> เพื่อความปลอดภัยสูงสุดของลูกค้าและช่าง กฎหมายไม่อนุญาตให้ซ่อมรถบนไหล่ทางด่วน (ยกเว้นช่างของการทางฯ) ลูกค้าต้องให้รถลากนำรถลงมาจอดด้านล่างก่อน เราถึงจะเข้าไปให้บริการปะยางหรือเปลี่ยนยางอะไหล่ได้ครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ยางแตกจนเละ ไม่มีลมอ่อนๆ ปะได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ถ้าขับบดยางจนแก้มยางฉีกขาด หรือยางระเบิดเป็นแผลใหญ่ <strong>ไม่สามารถปะได้ครับ</strong> ต้องใช้วิธีเปลี่ยนยางอะไหล่ (Spare Tire) แทน ซึ่งช่างของเรามีอุปกรณ์แม่แรงและบล็อกถอดล้อพร้อมบริการเปลี่ยนให้ฟรี (คิดเฉพาะค่าบริการนอกสถานที่) ครับ</p>
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
