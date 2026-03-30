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
    <text x="110" y="-55" font-size="15" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">EMERGENCY RESCUE</text>

    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">หาร้านปะยางตอนตี 2</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">ดึกแค่ไหนก็ต้องรอด!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวช่วยรถยางแตกขวางซอย โซนศรีนครินทร์ เทพารักษ์</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PORNPISIT BATTERY</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🌑 🚗 💥</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ยางระเบิดตอนตี 2 จอดหลบในซอยมืด</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ปากซอยวัดหนามแดง ถนนเทพารักษ์</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛵 🛠️ 💨</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ช่างมอเตอร์ไซค์ถึงจุดเกิดเหตุภายใน 15 นาที</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนศรีนครินทร์ ขาเข้าบางนา</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛞 🔧 ✅</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ถอดล้อเปลี่ยนยางอะไหล่ ลูกค้ากลับบ้านปลอดภัย</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ลานจอดรถตึกแถว ซอยลาซาล</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-find-tire-repair-2am-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'find-tire-repair-2am-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'find-tire-repair-2am-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'find-tire-repair-2am-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "หาร้านปะยางตอนตี 2 รถยางแตกขวางซอย! รีวิวเรียกช่างด่วน ศรีนครินทร์",
  slug: "find-tire-repair-shop-at-2am-guide",
  excerpt: "ยางแตกกลางดึก หาร้านปะยางตอนตี 2 ที่ไหนดี? ดูรีวิวเคสจริงจาก PORNPISIT BATTERY ออกช่วยเหลือรถยางระเบิดขวางซอย โซนศรีนครินทร์ เทพารักษ์ บางนา ถึงไว ปลอดภัย ไม่ทิ้งงาน",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "หาร้านปะยางตอนตี 2,ปะยาง 24 ชม,ปะยางนอกสถานที่,ยางแตกกลางดึก,ร้านปะยางใกล้ฉัน,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "หาร้านปะยางตอนตี 2 ยางแตกกลางดึก? เรียกช่างถึงที่ โซนบางนา",
  seoDescription: "หาร้านปะยางตอนตี 2 ใกล้ฉัน โซนศรีนครินทร์ บางนา เทพารักษ์ ยางแตกกลางดึก ไม่ต้องกลัว! รีวิวเรียกช่างปะยางนอกสถานที่ 24 ชม. ถึงหน้างานไวใน 20 นาที",
  seoKeywords: "หาร้านปะยางตอนตี 2, ปะยางนอกสถานที่ 24 ชม, ร้านปะยางใกล้ฉัน เปิดตอนนี้, ยางแตกกลางคืน, ปะยางรถยนต์ เทพารักษ์",
  ogTitle: "หาร้านปะยางตอนตี 2 ยางแตกดึกแค่ไหนก็มีคนช่วย!",
  ogDescription: "แชร์เคสจริง ช่วยลูกค้ายางแตกตอนตี 2 โซนศรีนครินทร์-เทพารักษ์ ช่าง PORNPISIT BATTERY ถึงไว ปลอดภัย ไว้ใจได้",
  coverImage: "/images/blog/pig-find-tire-repair-2am-cover.svg",
  content: `
<p class="lead">ประสบการณ์ที่ไม่มีใครอยากเจอคือการขับรถกลับบ้านดึกๆ แล้วได้ยินเสียง "ปัง!" ตามด้วยพวงมาลัยสั่นงั่กๆ ยางแตกกลางดึก! ความคิดแรกที่แล่นเข้ามาในหัวคือ <strong>"จะ หาร้านปะยางตอนตี 2 จากที่ไหน?"</strong> เพราะมองไปทางไหนอู่ก็ปิดหมดแล้ว ยิ่งถ้าจอดเสียอยู่ในซอยเปลี่ยวๆ หรือขวางทางจราจร ยิ่งกดดัน วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาแชร์เคสจริงที่เราออกไปช่วยเหลือลูกค้าในยามวิกาลย่าน <strong>ศรีนครินทร์ เทพารักษ์ บางนา สมุทรปราการ</strong> เพื่อให้คุณอุ่นใจว่า ดึกแค่ไหนเราก็พร้อมลุยครับ</p>

<h2>เมื่อต้อง หาร้านปะยางตอนตี 2 สิ่งที่คุณต้องระวัง</h2>
<p>การเกิดเหตุรถเสียตอนกลางคืนมีความเสี่ยงสูงกว่าตอนกลางวันมาก ก่อนที่ช่างจะไปถึง คุณควรคำนึงถึงสิ่งเหล่านี้:</p>
<ul>
  <li><strong>จุดจอดรถต้องปลอดภัย:</strong> พยายามประคองรถเข้าจอดในจุดที่มีแสงสว่าง เช่น หน้าปั๊มน้ำมัน หน้าเซเว่น หรือใต้ไฟถนน <strong>อย่าจอดในมุมมืดเด็ดขาด</strong></li>
  <li><strong>เปิดสัญญาณไฟฉุกเฉินเสมอ:</strong> เพื่อป้องกันรถคันหลังชนท้าย</li>
  <li><strong>เลือกช่างที่ไว้ใจได้:</strong> การ <strong>หาร้านปะยางตอนตี 2</strong> จากอินเทอร์เน็ต ควรเลือกร้านที่มีหน้าร้านชัดเจน มีรีวิว และแจ้งราคาเบื้องต้นได้เคลียร์ เพื่อป้องกันการโดนฟันราคาหน้างาน</li>
</ul>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/find-tire-repair-2am-case1.svg" alt="ยางระเบิดตอนตี 2 จอดหลบในซอยมืด ปากซอยวัดหนามแดง ถนนเทพารักษ์" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: ยางแตกขวางซอยมืด ปากซอยวัดหนามแดง (เทพารักษ์)</h2>
<p>เหตุการณ์นี้เกิดขึ้นตอน <strong>ตี 2 ครึ่ง</strong> ลูกค้าเลิกงานกะดึก ขับรถเข้า <strong>ซอยวัดหนามแดง ถนนเทพารักษ์</strong> ปรากฏว่าล้อหน้าซ้ายไปเบียดกับขอบแผ่นเหล็กก่อสร้างจนยางระเบิด รถเสียการทรงตัวจอดขวางอยู่กลางซอยแคบๆ ซึ่งค่อนข้างมืด</p>

<p>ลูกค้าเสิร์ชกูเกิล <strong>"หาร้านปะยางตอนตี 2"</strong> และโทรหาเราด้วยความร้อนใจ ทีมช่างของเราที่สแตนด์บายอยู่ไม่ไกล รีบสตาร์ทมอเตอร์ไซค์พร้อมชุดเครื่องมือครบเซ็ต วิ่งไปถึงจุดเกิดเหตุในเวลาเพียง <strong>15 นาที!</strong></p>

<p>เมื่อช่างไปถึง พบว่าแผลที่แก้มยางฉีกขาดกว้าง ไม่สามารถปะแบบแทงใยไหมได้ จึงทำการขึ้นแม่แรงตะเข้ ถอดล้อที่พังออก และนำ <a href="/mobile-tire-repair" class="text-orange-600 font-bold hover:underline">บริการเปลี่ยนยางอะไหล่ถึงที่</a> โดยนำยางท้ายรถลูกค้ามาใส่ให้แทน เติมลมให้เรียบร้อย ใช้เวลาหน้างานแค่ 15 นาที ลูกค้าก็สามารถขับรถกลับบ้านไปนอนพักผ่อนได้อย่างปลอดภัย</p>

<h2>Case Study 2: โดนตะปูเกลียว ยางแบนหน้าห้างซีคอน ศรีนครินทร์</h2>
<p>อีกเคสเกิดขึ้นตอนตี 1 กว่าๆ ลูกค้าจอดรถไว้ริม <strong>ถนนศรีนครินทร์</strong> ใกล้กับห้างซีคอนสแควร์ พอจะขับกลับบ้านพบว่าล้อหลังขวาแบนติดพื้น สาเหตุคือไปทับตะปูเกลียวมาตั้งแต่ตอนไหนไม่รู้ ลมซึมออกจนหมด</p>

<p>ลูกค้าโทรหาเรา ช่างขี่มอเตอร์ไซค์ไปถึง ตรวจเช็กพบว่าเป็นแผลรูเล็กที่หน้ายาง สามารถ <strong>ปะยางแบบแทงใยไหม</strong> ได้สบายๆ ช่างทำการดึงตะปูออก แทงไหมอุดรอยรั่ว ตัดแต่งไหมให้เรียบเนียน และเติมลมกลับไปที่ 32 PSI พร้อมเช็กด้วยน้ำสบู่ว่าไม่มีลมซึมแล้ว จบงานไว ลูกค้าจ่ายค่าบริการในราคามาตรฐาน ไม่มีบวกเพิ่มแม้จะเป็นตอนดึกครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/find-tire-repair-2am-case2.svg" alt="ช่างมอเตอร์ไซค์ถึงจุดเกิดเหตุ หาร้านปะยางตอนตี 2 ถนนศรีนครินทร์" class="w-full h-auto object-cover m-0" />
</div>

<h2>ทำไมต้อง PORNPISIT BATTERY เมื่อคุณ หาร้านปะยางตอนตี 2 ?</h2>
<p>ในพื้นที่ <strong>ห้วยขวาง ดินแดง ลาดพร้าว ลาซาล แบริ่ง เทพารักษ์ แพรกษา</strong> เราคือตัวจริงเรื่องการช่วยเหลือฉุกเฉินยามวิกาลครับ:</p>
<ol>
  <li><strong>มอเตอร์ไซค์ฉุกเฉิน:</strong> เราใช้มอเตอร์ไซค์ในการออกบริการ ทำให้ไปถึงคุณได้เร็วกว่ารถกระบะ มุดซอยแคบอย่าง <strong>ซอยแบริ่ง (สุขุมวิท 107)</strong> หรือลานจอดรถใต้ดินคอนโดได้สบาย</li>
  <li><strong>ไม่ทิ้งงาน รับสายจริง:</strong> โทรมาตี 2 ตี 3 เรามีคนรับสายและช่างพร้อมออกทันที ไม่ต้องกลัวโทรไปแล้วไม่มีคนรับ</li>
  <li><strong>ราคาโปร่งใส:</strong> เราแจ้งราคาค่าบริการ <a href="/mobile-tire-repair" class="text-orange-600 font-bold hover:underline">ปะยางนอกสถานที่</a> ให้ทราบก่อนเดินทางเสมอ ไม่มีการฉวยโอกาสฟันราคาตอนดึก</li>
  <li><strong>แก้ปัญหาได้จบ:</strong> ปะแทงใยไหม ปะสตรีม (เย็น) หรือเปลี่ยนยางอะไหล่ ช่างเรามีเครื่องมือและประสบการณ์พร้อมครับ</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/find-tire-repair-2am-case3.svg" alt="ช่างเปลี่ยนยางอะไหล่ให้ลูกค้าตอนดึก ลานจอดรถซอยลาซาล" class="w-full h-auto object-cover m-0" />
</div>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">📞 บริการ 24 ชม. ถึงที่ทันที</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">ยางแตกกลางดึก? ไม่ต้องเครียด เราไปช่วยถึงที่!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">ทีมช่างมอเตอร์ไซค์ 24 ชม. วิ่งไปปะยาง หรือเปลี่ยนยางอะไหล่ให้ถึงหน้างานภายใน 30 นาที โซนห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่าง 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งพิกัดมาได้เลย</a>
    </div>
    <p style="margin-top:1.5rem;"><a href="/mobile-tire-repair" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">เรียกช่างปะยางนอกสถานที่ 24 ชม. ศรีนครินทร์ เทพารักษ์</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ ห้วยขวาง ดินแดง ลาดพร้าว →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) หาร้านปะยางตอนตี 2</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: โทรเรียกตอนตี 2 ตี 3 ช่างรับสายจริงไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> รับสายและไปจริงแน่นอนครับ! ทีม PORNPISIT BATTERY มีแอดมินและช่างสแตนด์บายตลอด 24 ชั่วโมง ไม่มีวันหยุด เพื่อรองรับเหตุฉุกเฉินยามวิกาลโดยเฉพาะครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ปะยางตอนกลางคืน ราคาแพงกว่าปกติไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> เราคิดค่าบริการนอกสถานที่ตามระยะทางและเวลาเกิดเหตุอย่างสมเหตุสมผลครับ ซึ่งแอดมินจะแจ้งราคาที่ชัดเจน (Net Price) ให้ลูกค้าทราบและตัดสินใจก่อนที่ช่างจะเดินทางออกไปเสมอ รับรองว่าไม่มีการฉวยโอกาสบวกราคาเพิ่มหน้างานครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ถ้ายางระเบิดฉีกขาด ปะไม่ได้ ช่างจะช่วยยังไง?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ในกรณีที่ยางแผลใหญ่หรือแก้มยางฉีกจนปะไม่ได้ ช่างจะบริการ <strong>เปลี่ยนยางอะไหล่ (Spare Tire)</strong> ที่อยู่ท้ายรถของลูกค้าให้แทนครับ โดยช่างมีแม่แรงและบล็อกไฟฟ้าช่วยให้เปลี่ยนได้รวดเร็ว เพื่อให้ลูกค้าขับกลับบ้านได้ก่อน แล้วค่อยไปซื้อยางเส้นใหม่ในตอนเช้าครับ</p>
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
