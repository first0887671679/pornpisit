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
    <text x="110" y="-55" font-size="15" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">BATTERY CARE</text>

    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">รถจอดนานช่วงหยุดยาว</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">ทำยังไงไม่ให้แบตพัง?</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">วิธีดูแลและเคสรีวิวกู้ชีพรถจอดตาย โซนบางนา</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">FIRSTCARCENTER</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🅿️ 🚗 ⏳</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">จอดรถทิ้งไว้ 10 วัน กลับมาสตาร์ทไม่ติด</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ลานจอดรถสนามบินสุวรรณภูมิ สมุทรปราการ</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔌 🔋 🛵</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ช่างตรวจพบแบตเตอรี่เสื่อมสภาพ แผ่นธาตุช็อต</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: หมู่บ้านแถวแพรกษา</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">✅ 🛠️ 🚙</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เปลี่ยนแบตเตอรี่ใหม่ พร้อมขับไปทำงานได้ทันที</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโดซอยแบริ่ง สุขุมวิท 107</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-long-park-holiday-battery-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'long-park-battery-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'long-park-battery-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'long-park-battery-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "รถจอดนานช่วงหยุดยาว ทำยังไงไม่ให้แบตพัง? รีวิวกู้ชีพรถจอดตาย โซนบางนา",
  slug: "car-long-parking-holiday-battery-guide",
  excerpt: "ทิ้งรถไว้บ้านช่วงเทศกาล รถจอดนานช่วงหยุดยาว ระวังแบตเตอรี่เสื่อมสตาร์ทไม่ติด! อ่านวิธีดูแลแบตเตอรี่เมื่อไม่ได้ใช้รถ พร้อมเคสรีวิวเปลี่ยนแบตด่วน โซนศรีนครินทร์ บางนา แบริ่ง",
  category: "ช่วยเหลือฉุกเฉิน",
  tags: "รถจอดนานช่วงหยุดยาว,แบตเตอรี่รถยนต์หมด,สตาร์ทไม่ติด,ถอดขั้วแบตเตอรี่,เปลี่ยนแบตเตอรี่นอกสถานที่,สมุทรปราการ,บางนา",
  published: 1,
  author: "FIRSTCARCENTER",
  seoTitle: "รถจอดนานช่วงหยุดยาว ระวังแบตพัง! วิธีป้องกัน + รีวิวเปลี่ยนแบต",
  seoDescription: "รถจอดนานช่วงหยุดยาว 7-10 วัน แบตหมด สตาร์ทไม่ติด ทำยังไง? ดูวิธีดูแลแบตเตอรี่และรีวิวเรียกช่างเปลี่ยนแบตเตอรี่นอกสถานที่ โซนศรีนครินทร์ บางนา เทพารักษ์ แพรกษา",
  seoKeywords: "รถจอดนานช่วงหยุดยาว, รถจอดนานสตาร์ทไม่ติด, ถอดขั้วแบตเตอรี่ รถจอดนาน, เปลี่ยนแบตเตอรี่นอกสถานที่ บางนา, แบตหมด",
  ogTitle: "รถจอดนานช่วงหยุดยาว แบตหมดเกลี้ยง! ป้องกันได้ด้วยวิธีนี้",
  ogDescription: "แชร์วิธีดูแลรถและแบตเตอรี่เมื่อต้องจอดทิ้งไว้หลายวัน พร้อมรีวิวช่วยลูกค้าแบตหมดหลังกลับจากเที่ยว",
  coverImage: "/images/blog/pig-long-park-holiday-battery-cover.svg",
  content: `
<p class="lead">ในช่วงเทศกาลหยุดยาว หรือสำหรับคนที่ต้องบินไปต่างประเทศบ่อยๆ การปล่อย <strong>รถจอดนานช่วงหยุดยาว</strong> เป็นสิ่งหลีกเลี่ยงไม่ได้ครับ แต่รู้ไหมครับว่า "รถที่จอดทิ้งไว้เฉยๆ แบตเตอรี่จะพังเร็วกว่ารถที่ขับทุกวัน!" เพราะรถยนต์มีระบบไฟฟ้าที่ดึงไฟจากแบตเตอรี่ไปใช้ตลอดเวลา วันนี้ <strong>FirstCarCenter</strong> จะมาแนะวิธีป้องกันไม่ให้แบตพัง พร้อมเล่าเคสกู้ชีพรถจอดตายในโซน <strong>ศรีนครินทร์ บางนา แบริ่ง ลาซาล สมุทรปราการ</strong> ให้ฟังกันครับ</p>

<h2>ทำไม "รถจอดนาน" แบตเตอรี่ถึงหมดเกลี้ยง?</h2>
<p>แม้คุณจะดับเครื่องและดึงกุญแจออกแล้ว แต่รถยนต์ยุคใหม่มี <strong>Parasitic Drain (กระแสไฟรั่วไหล)</strong> ที่ต้องใช้ไฟเลี้ยงระบบตลอดเวลา เช่น:</p>
<ul>
  <li>ระบบกันขโมย (Immobilizer)</li>
  <li>หน่วยความจำกล่อง ECU และหน้าปัดนาฬิกา</li>
  <li>ระบบ Keyless Entry ที่คอยรับสัญญาณกุญแจ</li>
  <li>กล้องหน้ารถ (ถ้าตั้งโหมด Parking Mode ไว้)</li>
</ul>
<p>ถ้า <strong>รถจอดนานช่วงหยุดยาว</strong> เกิน 5-7 วัน โดยไม่ได้สตาร์ทเครื่องยนต์ให้ <strong>ไดชาร์จ (Alternator)</strong> ปั่นไฟกลับเข้าไปชาร์จ แบตเตอรี่จะค่อยๆ คายประจุจนหมด และถ้าปล่อยให้แบตเตอรี่ไฟหมดเกลี้ยง (Deep Discharge) บ่อยๆ แผ่นธาตุข้างในจะเสื่อมสภาพและช็อตในที่สุดครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/long-park-battery-case1.svg" alt="จอดรถทิ้งไว้ 10 วัน กลับมาสตาร์ทไม่ติด ลานจอดรถสนามบินสุวรรณภูมิ สมุทรปราการ" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: กลับจากต่างประเทศ รถจอดตายที่สนามบินสุวรรณภูมิ</h2>
<p>ลูกค้าบินไปเที่ยวญี่ปุ่น 10 วัน และจอดรถ Honda Civic ไว้ที่ลานจอดรถระยะยาวของสนามบิน <strong>สุวรรณภูมิ (สมุทรปราการ)</strong> พอบินกลับมาถึงไทยตอนดึก ลากกระเป๋ามาที่รถ ปรากฏว่ากดรีโมทไม่ทำงาน ต้องไขกุญแจเข้าไป พอจะสตาร์ท... รถเงียบกริบ ไฟหน้าปัดไม่ติดเลยแม้แต่น้อย (ไฟเหลือ 0 โวลต์)</p>

<p>ลูกค้าพยายามเรียกแท็กซี่มาพ่วงแบต แต่พอพ่วงติดและขับออกมาได้แป๊บเดียว รถก็มีอาการไฟตกและดับกลางทาง! ลูกค้าจึงโทรหา FirstCarCenter เราได้ส่งช่างไปเช็ก พบว่าแบตลูกนี้ใช้มาปีกว่าแล้ว พอปล่อยให้ไฟหมดเกลี้ยงสนิท แผ่นธาตุจึงช็อตและไม่เก็บไฟอีกต่อไป ช่างจึงทำการเปลี่ยนแบตเตอรี่ลูกใหม่ให้ตรงรุ่น ลูกค้าจึงสามารถขับรถกลับบ้านที่บางนาได้อย่างปลอดภัยครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/long-park-battery-case2.svg" alt="ช่างตรวจพบแบตเตอรี่เสื่อมสภาพ แผ่นธาตุช็อต หมู่บ้านแถวแพรกษา" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 2: จอดรถทิ้งไว้บ้านช่วงปีใหม่ ที่ซอยแบริ่ง</h2>
<p>เคสนี้ลูกค้าจอดรถทิ้งไว้ที่คอนโดใน <strong>ซอยแบริ่ง (สุขุมวิท 107)</strong> ช่วงหยุดยาวปีใหม่ 5 วัน แล้วนั่งรถตู้ไปเที่ยวต่างจังหวัด พอกลับมาเช้าวันทำงาน จะขับรถไปออฟฟิศ รถมีเสียงไดสตาร์ทลากยาว "แชะ แชะ แชะ" แต่ไม่ยอมติด</p>

<p>ลูกค้าเสิร์ชหาบริการ <a href="/battery-replacement" class="text-orange-600 font-bold hover:underline">เปลี่ยนแบตเตอรี่นอกสถานที่</a> และโทรหาเรา ช่างขี่มอเตอร์ไซค์ไปถึงคอนโดภายใน 15 นาที นำแบตเตอรี่ Amaron ไปเปลี่ยนให้ ใช้เวลาทำงานแป๊บเดียว ลูกค้าก็สามารถขับรถไปทำงานได้ทันเวลา ไม่ต้องลางานครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/long-park-battery-case3.svg" alt="เปลี่ยนแบตเตอรี่ใหม่ พร้อมขับไปทำงานได้ทันที คอนโดซอยแบริ่ง" class="w-full h-auto object-cover m-0" />
</div>

<h2>วิธีดูแลแบตเตอรี่ เมื่อต้อง "รถจอดนานช่วงหยุดยาว"</h2>
<p>เพื่อป้องกันไม่ให้แบตเตอรี่เสื่อมสภาพก่อนวัยอันควรเมื่อไม่ได้ใช้รถ ลองทำตามวิธีนี้ครับ:</p>
<ol>
  <li><strong>สตาร์ทรถสัปดาห์ละ 1-2 ครั้ง:</strong> ให้สตาร์ทเครื่องยนต์ทิ้งไว้ประมาณ 15-20 นาที โดยปิดแอร์และวิทยุ เพื่อให้ไดชาร์จปั่นไฟเข้าไปเก็บในแบตเตอรี่</li>
  <li><strong>ถอดขั้วแบตเตอรี่ (ขั้วลบ):</strong> หากต้องจอดนานเกิน 2 สัปดาห์ การใช้ประแจเบอร์ 10 ขันถอดขั้วลบ (-) ออก จะช่วยตัดวงจรไฟฟ้าทั้งหมด ไม่ให้ดึงไฟจากแบตไปใช้ <em>(ข้อควรระวัง: รถบางรุ่นเมื่อถอดขั้วแบต ระบบความจำวิทยุหรือรอบเดินเบาอาจจะต้องรีเซ็ตใหม่ และระบบกันขโมยจะไม่ทำงาน)</em></li>
  <li><strong>ใช้เครื่องชาร์จแบตเตอรี่อัจฉริยะ:</strong> สำหรับบ้านที่มีปลั๊กไฟใกล้ที่จอดรถ การหนีบเครื่องชาร์จแบบ Trickle Charger ทิ้งไว้ จะช่วยเลี้ยงไฟให้เต็ม 100% อยู่เสมอ แบตเตอรี่จะอายุยืนยาวมากครับ</li>
  <li><strong>ถอดปลั๊กกล้องหน้ารถ:</strong> กล้องหน้ารถบางรุ่นดึงไฟตลอดเวลา ควรถอดสายออกเมื่อจอดรถที่บ้านครับ</li>
</ol>

<h2>จอดนานจนรถสตาร์ทไม่ติด? โทรเรียก FirstCarCenter สิครับ!</h2>
<p>หากคุณกลับมาจากวันหยุดยาว แล้วพบว่า <strong>รถจอดนานสตาร์ทไม่ติด</strong> ไม่ต้องตกใจครับ! โทรเรียก <strong>FirstCarCenter</strong> เรามีบริการ <strong>เปลี่ยนแบตเตอรี่รถยนต์ นอกสถานที่</strong> ส่งด่วนถึงบ้าน คอนโด หรือที่ทำงาน ภายใน 30 นาที ครอบคลุมพื้นที่ <strong>บางนา ศรีนครินทร์ แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</strong> แบตเตอรี่ใหม่แกะกล่อง ราคามาตรฐาน พร้อมรับประกัน 1 ปีเต็มครับ!</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">🔋 เปลี่ยนแบตเตอรี่ด่วน นอกสถานที่</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">กลับจากเที่ยว รถสตาร์ทไม่ติด? เราเปลี่ยนแบตให้ถึงที่!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการเช็กค่า CCA และเปลี่ยนแบตเตอรี่รถยนต์หน้าบ้าน ภายใน 30 นาที โซนบางนา ศรีนครินทร์ เทพารักษ์</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0887671679" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 สั่งแบตเตอรี่ด่วน 088-767-1679</a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งรุ่นรถมาเช็กราคา</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/battery-replacement" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">เปลี่ยนแบตเตอรี่รถยนต์ นอกสถานที่ แบริ่ง บางนา</a></p>
    <p style="margin-top:0.75rem;"><a href="/mobile-tire-repair" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">บริการปะยางนอกสถานที่ 24 ชม. แบริ่ง ลาซาล เทพารักษ์ →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) ปัญหา รถจอดนานช่วงหยุดยาว</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: จอดรถทิ้งไว้ 3 วัน แบตจะหมดไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ถ้ารถและแบตเตอรี่มีสภาพสมบูรณ์ (แบตอายุไม่เกิน 1-1.5 ปี) การจอดทิ้งไว้ 3-5 วัน แบตเตอรี่จะไม่หมดครับ แต่ถ้าแบตอายุเกิน 2 ปีแล้ว แค่จอดทิ้งไว้ 2 วันก็มีความเสี่ยงที่ไฟจะอ่อนจนสตาร์ทไม่ติดครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: พ่วงแบตเตอรี่ให้ติด แล้วขับไปชาร์จไฟเองได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ทำได้ครับ แต่ต้องขับรถต่อเนื่อง (ห้ามดับเครื่อง) อย่างน้อย 45-60 นาทีขึ้นไป เพื่อให้ไดชาร์จทำงานเต็มที่ แต่ถ้าแบตเตอรี่เสื่อมจนแผ่นธาตุพังแล้ว การขับชาร์จไฟก็ไม่ช่วยอะไรครับ พอจอดดับเครื่องก็จะสตาร์ทไม่ติดเหมือนเดิม ต้องเปลี่ยนลูกใหม่เท่านั้นครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ควรถอดขั้วบวก (+) หรือขั้วลบ (-) เมื่อจอดรถนาน?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ต้องถอด <strong>ขั้วลบ (-)</strong> เท่านั้นครับ! เพราะเพื่อความปลอดภัย หากประแจพลาดไปโดนตัวถังรถขณะขันขั้วลบ จะไม่เกิดการช็อตหรือประกายไฟครับ (แต่ถ้าพลาดตอนขันขั้วบวก จะเกิดการลัดวงจรทันที)</p>
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
