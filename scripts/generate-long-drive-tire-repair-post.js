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

      <!-- Tire/Wheel on the right -->
      <g transform="translate(70, 70)">
        <circle cx="0" cy="0" r="40" fill="#1E293B" filter="url(#shadow-sm)"/>
        <circle cx="0" cy="0" r="30" fill="none" stroke="#334155" stroke-width="6" stroke-dasharray="10 5"/>
        <circle cx="0" cy="0" r="20" fill="url(#silver)"/>
        <circle cx="0" cy="0" r="6" fill="#0B0F19"/>
        <circle cx="0" cy="-12" r="3" fill="#0B0F19"/>
        <circle cx="0" cy="12" r="3" fill="#0B0F19"/>
        <circle cx="-12" cy="0" r="3" fill="#0B0F19"/>
        <circle cx="12" cy="0" r="3" fill="#0B0F19"/>
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

    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">ปะยางฉุกเฉินเดินทางไกล</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">กลางทาง อู่ปิดหมด!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวช่วยรถยางแตกตอนดึก โซนศรีนครินทร์ บางนา</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PORNPISIT BATTERY</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛣️ 🚗 💥</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เดินทางไกลยางแตกกลางดึก จอดหลบข้างทางมืดๆ</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนบางนา-ตราด กม.10</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛵 🛠️ 🔦</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ช่างพร้อมไฟฉายและแม่แรง รีบไปปะยางแบบแทงใยไหม</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: จุดเกิดเหตุ ถนนศรีนครินทร์</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🛡️ ✅ 🚙</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เปลี่ยนยางอะไหล่ ลูกค้าเดินทางต่อได้อย่างปลอดภัย</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ปั๊มน้ำมันใกล้แยกเทพารักษ์</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-long-drive-tire-repair-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'long-drive-tire-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'long-drive-tire-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'long-drive-tire-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ปะยางฉุกเฉินเดินทางไกล ยางแตกตอนดึก หาร้านซ่อมไม่ได้? วิธีแก้และเคสรีวิว",
  slug: "long-drive-emergency-tire-repair-guide",
  excerpt: "ขับรถทางไกลยางแตกรั่วตอนดึกๆ อู่ซ่อมรถปิดหมด! เรียก ปะยางฉุกเฉินเดินทางไกล ที่ไหนดี? อ่านวิธีเอาตัวรอดและรีวิวเรียกช่างเปลี่ยนยางอะไหล่นอกสถานที่ โซนศรีนครินทร์ บางนา",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "ปะยางฉุกเฉินเดินทางไกล,ปะยางนอกสถานที่,เปลี่ยนยางอะไหล่,ยางแตกกลางคืน,ร้านปะยาง 24 ชม,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "ปะยางฉุกเฉินเดินทางไกล ยางแตกกลางดึก เรียกช่าง โซนบางนา",
  seoDescription: "ปะยางฉุกเฉินเดินทางไกล ยางแตก ยางรั่ว กลางคืน หาร้านซ่อมไม่ได้ โทรหาเรา! รีวิวช่างปะยางนอกสถานที่และเปลี่ยนยางอะไหล่ 24 ชม. โซนศรีนครินทร์ บางนา เทพารักษ์",
  seoKeywords: "ปะยางฉุกเฉินเดินทางไกล, ร้านปะยาง 24 ชม, ปะยางนอกสถานที่, เปลี่ยนยางอะไหล่กลางคืน, ยางแตกระหว่างเดินทาง",
  ogTitle: "ปะยางฉุกเฉินเดินทางไกล ยางแตกดึกแค่ไหนก็ไปช่วย!",
  ogDescription: "แชร์ประสบการณ์ตรง ยางแตกกลางทางตอนดึก หาร้านปะยางไม่ได้ เรียกช่าง PORNPISIT BATTERY ไปช่วยถึงที่",
  coverImage: "/images/blog/pig-long-drive-tire-repair-cover.svg",
  content: `
<p class="lead">การขับรถเดินทางไกลในตอนกลางคืน เป็นสิ่งที่หลายคนชอบเพราะรถไม่ติดและอากาศไม่ร้อน แต่ความเสี่ยงที่ตามมาคือ ถ้าเกิดอุบัติเหตุ <strong>ยางแตกหรือยางรั่ว</strong> ขึ้นมา การหาอู่หรือร้านปะยางแทบจะเป็นไปไม่ได้เลยครับ! การมองหาบริการ <strong>ปะยางฉุกเฉินเดินทางไกล</strong> จึงเป็นทางรอดเดียว วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาแชร์วิธีเอาตัวรอดเมื่อยางแตกตอนดึก และเล่าเคสรีวิวที่เราออกไปช่วยเหลือลูกค้ากลางทางในโซน <strong>ห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์ สมุทรปราการ</strong> ครับ</p>

<h2>เดินทางไกลตอนกลางคืน ยางแตก! ต้องทำยังไงให้ปลอดภัย?</h2>
<p>ถ้าคุณกำลังขับรถอยู่ดีๆ แล้วยางเกิดระเบิดหรือรั่วจนพวงมาลัยส่าย <strong>นี่คือกฎเหล็กเพื่อความปลอดภัย:</strong></p>
<ol>
  <li><strong>บังคับพวงมาลัยให้ตรง ถอนคันเร่ง:</strong> ห้ามเหยียบเบรกแรงๆ เด็ดขาด เพราะรถจะเสียหลักและหมุนได้</li>
  <li><strong>เปิดไฟเลี้ยวและไฟฉุกเฉิน:</strong> ค่อยๆ ประคองรถเข้าจอดไหล่ทาง <strong>ให้ชิดซ้ายมากที่สุด</strong> เพื่อหลบรถบรรทุกที่วิ่งเลนซ้าย</li>
  <li><strong>อย่ายืนท้ายรถ:</strong> ถนนมืดๆ รถคันหลังอาจจะมองไม่เห็นและพุ่งชนได้ ให้ลงจากรถไปยืนบนฟุตบาท หรือหลังแบริเออร์เพื่อความปลอดภัย</li>
  <li><strong>โทรเรียก ปะยางฉุกเฉินเดินทางไกล 24 ชม.:</strong> หากคุณมีล้ออะไหล่แต่เปลี่ยนไม่เป็น หรือล้อไม่มีลม โทรเรียกช่างฉุกเฉินให้มาช่วยจัดการให้จะปลอดภัยที่สุดครับ</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/long-drive-tire-case1.svg" alt="เดินทางไกลยางแตกกลางดึก จอดหลบข้างทางมืดๆ ถนนบางนา-ตราด กม.10" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: โดนน็อตตำ ยางรั่วลมออกหมด ถนนศรีนครินทร์ (ตี 2)</h2>
<p>ลูกค้ากำลังขับรถมุ่งหน้าไปชลบุรี ใช้เส้นทาง <strong>ถนนศรีนครินทร์</strong> ตอนตี 2 กว่าๆ รู้สึกว่ารถมีเสียงดังกึกๆๆ ที่ล้อหลังซ้าย พอจอดรถดูพบว่ายางแบนติดพื้น มีหัวน็อตตัวใหญ่ปักอยู่ที่หน้ายาง</p>

<p>ลูกค้าเสิร์ชหา <strong>ปะยาง 24 ชม</strong> และโทรหาเรา ช่างมอเตอร์ไซค์ของ PORNPISIT BATTERY รีบวิ่งไปถึงจุดเกิดเหตุภายใน 15 นาที พร้อมไฟฉายแรงสูงและอุปกรณ์ปะยาง</p>

<p>ช่างประเมินแล้วว่าแผลอยู่ที่หน้ายาง (ดอกยาง) สามารถ <strong>ปะแบบแทงใยไหม</strong> ได้ ช่างทำการดึงน็อตออก แทงไหมอุดรอยรั่ว ตัดแต่งไหมให้เรียบ และใช้ปั๊มลมพกพาเติมลมกลับเข้าไปเช็กจุดรั่วซึม ใช้เวลาเพียง 15 นาที ลูกค้าก็สามารถขับรถเดินทางไกลไปชลบุรีต่อได้อย่างปลอดภัยครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/long-drive-tire-case2.svg" alt="ช่างพร้อมไฟฉายและแม่แรง รีบไปปะยางแบบแทงใยไหม จุดเกิดเหตุ ถนนศรีนครินทร์" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 2: ยางระเบิดฉีกขาด เปลี่ยนล้ออะไหล่ ถนนบางนา-ตราด</h2>
<p>เคสนี้อันตรายครับ ลูกค้าขับรถมาด้วยความเร็วบน <strong>ถนนบางนา-ตราด (ช่องทางด่วน)</strong> ยางหน้าขวาตกหลุมขนาดใหญ่จนยางระเบิด แก้มยางฉีกขาด รถเสียการทรงตัว โชคดีที่ลูกค้าประคองรถเข้าจอดไหล่ทางซ้ายสุดได้</p>

<p>เนื่องจากแก้มยางฉีกขาด ไม่สามารถปะได้ ลูกค้าโทรหาเราให้ไปบริการ <strong>เปลี่ยนยางอะไหล่</strong> ช่างของเรานำแม่แรงตะเข้ขนาดใหญ่ (สำหรับยกรถขึ้นสูง) และบล็อกไฟฟ้าไปถึงหน้างาน ถอดล้อที่พังออกและใส่ล้ออะไหล่ของลูกค้าแทน พร้อมเช็กลมยางอะไหล่ให้ได้มาตรฐาน</p>

<p>ช่างคอยเปิดไฟไซเรนและยืนคุมท้ายรถให้ตลอดการทำงานเพื่อป้องกันอุบัติเหตุซ้ำซ้อน ลูกค้าประทับใจในความรวดเร็วและเป็นมืออาชีพครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/long-drive-tire-case3.svg" alt="เปลี่ยนยางอะไหล่ ลูกค้าเดินทางต่อได้อย่างปลอดภัย ปั๊มน้ำมันใกล้แยกเทพารักษ์" class="w-full h-auto object-cover m-0" />
</div>

<h2>ต้องการ ปะยางฉุกเฉินเดินทางไกล โทรหา PORNPISIT BATTERY!</h2>
<p>อุบัติเหตุเกิดขึ้นได้เสมอ โดยเฉพาะการเดินทางไกลตอนกลางคืน หากคุณรถยางแตก ยางรั่ว หาร้านซ่อมไม่ได้ ในเขต <strong>ห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</strong> อย่าลังเลที่จะโทรหา <strong>PORNPISIT BATTERY</strong> ครับ! เราเปิดบริการ 24 ชั่วโมง มีทีมช่างมอเตอร์ไซค์พร้อมเครื่องมือครบครัน วิ่งไปปะยางแทงใยไหม หรือถอดเปลี่ยนยางอะไหล่ให้ถึงจุดเกิดเหตุ ช่วยให้คุณเดินทางต่อได้อย่างปลอดภัยและอุ่นใจที่สุดครับ</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">🚨 บริการปะยาง 24 ชม.</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">ยางแตกกลางดึก? ช่างพร้อมลุย วิ่งไปปะให้ถึงที่!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการปะยางแบบแทงใยไหม และเปลี่ยนยางอะไหล่นอกสถานที่ ด่วน 24 ชม. โซนห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่างปะยาง 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งพิกัดมาด่วน</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/mobile-tire-repair" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">เรียกช่างปะยางนอกสถานที่ 24 ชม. แบริ่ง ลาซาล บางนา</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ เทพารักษ์ แพรกษา →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) ปะยางฉุกเฉินเดินทางไกล</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ปะยางแบบแทงใยไหม ปลอดภัยสำหรับวิ่งทางไกลไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ปลอดภัยครับ การแทงใยไหม (Tire Plug) เป็นการปะแบบฉุกเฉินที่ได้มาตรฐาน หากรอยรั่วอยู่บริเวณหน้ายาง (ดอกยาง) และแผลไม่ใหญ่มาก สามารถขับทางไกลด้วยความเร็วปกติได้จนกว่ายางจะหมดอายุครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: แก้มยางฉีก ปะได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> <strong>ไม่ได้เด็ดขาดครับ!</strong> แก้มยางเป็นส่วนที่ต้องรับน้ำหนักและยืดหยุ่นตลอดเวลา หากเกิดรอยฉีกขาดหรือโดนตะปูตำที่แก้มยาง จะไม่สามารถปะได้ทุกกรณี ต้องใช้วิธี <strong>เปลี่ยนใส่ยางอะไหล่</strong> แทนเท่านั้นครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ยางอะไหล่วิ่งได้เร็วสุดเท่าไหร่?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> สำหรับยางอะไหล่แบบเส้นเล็ก (Donut Tire) ออกแบบมาเพื่อใช้ประคองรถฉุกเฉินเท่านั้น แนะนำให้ขับความเร็ว <strong>ไม่เกิน 80 กม./ชม.</strong> และควรรีบหาร้านยางเพื่อเปลี่ยนเป็นยางเส้นปกติให้เร็วที่สุดครับ</p>
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
