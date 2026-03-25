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

      <!-- Polisher / Buffer Tool for Headlights -->
      <g transform="translate(-75, 75) rotate(-15)">
        <rect x="-15" y="-30" width="30" height="40" rx="4" fill="#1E293B" filter="url(#shadow-sm)"/>
        <rect x="-10" y="-35" width="20" height="5" fill="url(#silver)"/>
        <ellipse cx="0" cy="-40" rx="25" ry="10" fill="#00F2FE"/>
        <ellipse cx="0" cy="-45" rx="25" ry="10" fill="#FFFFFF"/>
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

      <!-- Headlight Beam Effect -->
      <g transform="translate(60, -80)">
        <path d="M0,0 L60,-40 L60,40 Z" fill="url(#glow-blue)" opacity="0.8"/>
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
    <text x="110" y="-55" font-size="15" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">DRIVING SAFETY</text>

    <text x="0" y="20" font-size="70" font-weight="800" fill="url(#text-grad)">ขัดไฟหน้าก่อนเดินทาง</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">ไฟเหลืองมัว มองไม่เห็นทาง!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวขัดไฟหน้าใสปิ๊ง โซนศรีนครินทร์ บางนา แบริ่ง</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">FIRSTCARCENTER</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">⚠️ 🔦 🙈</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ไฟหน้าเหลืองขุ่น ขับกลางคืนต่างจังหวัด มองไม่เห็นทาง</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนเทพารักษ์ สมุทรปราการ</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🧽 ✨ 🔄</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เข้าอู่ขัดลอกคราบเหลืองด้วยกระดาษทรายและเครื่องขัด</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: อู่ FirstCarCenter โซนบางนา</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">💎 💡 🛣️</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ไฟหน้ากลับมาใสปิ๊ง สว่างพุ่งไกล ขับขี่ปลอดภัย 100%</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนศรีนครินทร์ ตัดลาซาล</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-headlight-polish-trip-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'headlight-polish-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'headlight-polish-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'headlight-polish-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ขัดไฟหน้าก่อนเดินทาง ไกลแค่ไหนก็ปลอดภัย! รีวิวแก้ไฟเหลืองมัว มองไม่เห็นทาง",
  slug: "headlight-polishing-before-road-trip-guide",
  excerpt: "เตรียมตัวเดินทางไกลช่วงเทศกาล แต่ไฟหน้าเหลืองขุ่น ขับกลางคืนมองไม่เห็นทาง! อ่านความสำคัญของการ ขัดไฟหน้าก่อนเดินทาง และรีวิวขัดไฟหน้าใสปิ๊ง โซนศรีนครินทร์ บางนา",
  category: "คาร์แคร์",
  tags: "ขัดไฟหน้าก่อนเดินทาง,ขัดไฟหน้าเหลือง,ไฟหน้าขุ่นมัว,เตรียมรถก่อนเดินทาง,ไฟหน้ารถไม่สว่าง,สมุทรปราการ,บางนา",
  published: 1,
  author: "FIRSTCARCENTER",
  seoTitle: "ขัดไฟหน้าก่อนเดินทาง แก้ไฟเหลืองมัว รีวิว โซนบางนา ศรีนครินทร์",
  seoDescription: "ขัดไฟหน้าก่อนเดินทาง เทศกาล! ไฟหน้าเหลือง ขุ่นมัว ขับกลางคืนอันตราย มองไม่เห็นทาง แวะมาขัดไฟหน้าใสปิ๊งที่ FirstCarCenter โซนศรีนครินทร์ บางนา แบริ่ง เทพารักษ์",
  seoKeywords: "ขัดไฟหน้าก่อนเดินทาง, ขัดไฟหน้าเหลือง บางนา, ไฟหน้ารถขุ่นมัว, ขัดโคมไฟหน้า, เตรียมรถก่อนเดินทางไกล",
  ogTitle: "ขัดไฟหน้าก่อนเดินทาง เปลี่ยนไฟเหลืองให้ใสปิ๊ง!",
  ogDescription: "แชร์ความสำคัญและรีวิวการขัดไฟหน้าแก้ปัญหาไฟเหลืองมัว ก่อนออกทริปเดินทางไกล เพื่อความปลอดภัยในการขับขี่ตอนกลางคืน",
  coverImage: "/images/blog/pig-headlight-polish-trip-cover.svg",
  content: `
<p class="lead">เมื่อเทศกาลวันหยุดยาวมาถึง หลายคนวางแผนขับรถทางไกลกลับต่างจังหวัด หรือไปเที่ยวพักผ่อน แต่สิ่งหนึ่งที่มักถูกมองข้ามในการเช็กรถคือ <strong>"ความสว่างของไฟหน้า"</strong> ถ้ารถของคุณมีอาการไฟหน้าเหลือง ขุ่นมัว หรือแตกลายงา การขับรถในถนนต่างจังหวัดที่มืดสนิทจะกลายเป็นฝันร้ายทันที! วันนี้ <strong>FirstCarCenter</strong> จะมาแชร์ความสำคัญของการ <strong>ขัดไฟหน้าก่อนเดินทาง</strong> และพาไปดูรีวิวการฟื้นฟูไฟหน้าที่เหลืองอ๋อย ให้กลับมาใสปิ๊งเหมือนรถใหม่ ในโซน <strong>ศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์</strong> กันครับ</p>

<h2>ทำไมต้อง ขัดไฟหน้าก่อนเดินทาง ไกล?</h2>
<p>การขับรถออกต่างจังหวัดในตอนกลางคืน ต่างจากการขับรถในกรุงเทพฯ ที่มีไฟถนนสว่างตลอดทาง ปัญหาของไฟหน้าเหลืองขุ่นคือ:</p>
<ol>
  <li><strong>ลดระยะการมองเห็น (Visibility):</strong> คราบเหลืองบนโคมไฟจะทำหน้าที่เหมือน "ฟิลเตอร์" กั้นแสง ทำให้แสงไฟพุ่งไปไม่ไกล มองเห็นสิ่งกีดขวาง หลุม หรือคนข้ามถนนช้าลง</li>
  <li><strong>แสงฟุ้งกระจาย (Glare):</strong> รอยขีดข่วนหรือความขุ่นมัว จะทำให้แสงไฟหน้าไม่จับตัวเป็นลำ (Cut-off line) แต่จะฟุ้งกระจายไปแยงตาเพื่อนร่วมทาง ทำให้เกิดอุบัติเหตุได้ง่าย</li>
  <li><strong>เสี่ยงสอบตก ตรอ.:</strong> ถ้าไฟหน้าเหลืองหรือขุ่นเกินไป อาจทำให้ค่าความสว่าง (Lux) ไม่ผ่านเกณฑ์ตอนตรวจสภาพรถประจำปี</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/headlight-polish-case1.svg" alt="ไฟหน้าเหลืองขุ่น ขับกลางคืนต่างจังหวัด มองไม่เห็นทาง ถนนเทพารักษ์" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study: Honda Civic ไฟหน้าเหลืองขุ่น มองถนนไม่เห็นตอนกลางคืน</h2>
<p>ลูกค้าขับรถ Honda Civic FD มาจากโซน <strong>ถนนเทพารักษ์ สมุทรปราการ</strong> เตรียมตัวจะขับรถกลับบ้านเกิดที่ภาคเหนือช่วงสงกรานต์ ลูกค้าบ่นว่า "ขับกลางคืนแถวบ้านยังแทบมองไม่เห็นเส้นถนนเลย ถ้าออกต่างจังหวัดมืดๆ คงอันตรายมาก" พอดูที่ตัวรถพบว่า โคมไฟหน้าทั้งสองข้างเหลืองอ๋อย ขุ่นจนมองไม่เห็นหลอดไฟด้านใน แถมยังมีรอยแตกลายงาที่ผิวแลคเกอร์เดิมด้วย</p>

<p>ช่างของ <strong>FirstCarCenter</strong> (เราตั้งอยู่แถว <strong>บางนา-ศรีนครินทร์</strong>) จึงทำการ <strong>ขัดฟื้นฟูไฟหน้าแบบเต็มระบบ (Headlight Restoration)</strong> ให้ลูกค้าครับ โดยมีขั้นตอนดังนี้:</p>
<ol>
  <li><strong>ขัดลอกแลคเกอร์เก่า:</strong> ใช้กระดาษทรายน้ำเบอร์หยาบ (เบอร์ 800 - 1500) ขัดลอกชั้นแลคเกอร์เดิมที่เสื่อมสภาพ เหลือง และแตกลายงาออกจนหมด (ขั้นตอนนี้โคมจะดูขุ่นขาวไปเลย)</li>
  <li><strong>ขัดปรับสภาพผิว:</strong> ไล่กระดาษทรายเบอร์ละเอียด (เบอร์ 2000 - 3000) เพื่อลบรอยกระดาษทรายหยาบ และทำให้ผิวพลาสติกอะคริลิกเรียบเนียนที่สุด</li>
  <li><strong>ขัดเงาด้วยเครื่องขัด (Polishing):</strong> ใช้เครื่องขัดสีรอบสูง คู่กับน้ำยาขัดหยาบและละเอียด ปั่นจนโคมไฟหน้ากลับมาใสปิ๊ง มองทะลุเห็นหลอดไฟด้านในชัดเจน</li>
  <li><strong>เคลือบเงาปกป้อง (Coating):</strong> ลงน้ำยาเคลือบแก้วเซรามิกสำหรับไฟหน้าโดยเฉพาะ เพื่อสร้างชั้นฟิล์มป้องกันรังสี UV ป้องกันไม่ให้กลับมาเหลืองเร็วอีกครั้ง</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/headlight-polish-case2.svg" alt="เข้าอู่ขัดลอกคราบเหลืองด้วยกระดาษทรายและเครื่องขัด อู่ FirstCarCenter โซนบางนา" class="w-full h-auto object-cover m-0" />
</div>

<p>หลังจากทำเสร็จ ลูกค้าว้าวมากครับ! บอกว่า "เหมือนได้โคมไฟหน้าคู่ใหม่เลย" พอลองเปิดไฟดู แสงสว่างพุ่งเป็นลำคมชัด ไม่ฟุ้งกระจาย ลูกค้าขับรถกลับบ้านแถว <strong>คอนโดซอยลาซาล</strong> ด้วยความมั่นใจ พร้อมออกทริปเดินทางไกลช่วงเทศกาลได้อย่างปลอดภัย 100% ครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/headlight-polish-case3.svg" alt="ไฟหน้ากลับมาใสปิ๊ง สว่างพุ่งไกล ขับขี่ปลอดภัย 100% ถนนศรีนครินทร์ ตัดลาซาล" class="w-full h-auto object-cover m-0" />
</div>

<h2>เตรียมความพร้อม ขัดไฟหน้าก่อนเดินทาง กับ FirstCarCenter</h2>
<p>อย่าปล่อยให้ "ไฟหน้าเหลืองมัว" มาลดทอนความปลอดภัยในการเดินทางของคุณและครอบครัวครับ หากคุณอยู่ในโซน <strong>บางนา ศรีนครินทร์ แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</strong> แวะมาใช้บริการ <strong><a href="/car-polishing" class="text-orange-600 font-bold hover:underline">ขัดไฟหน้ารถยนต์</a></strong> กับ <strong>FirstCarCenter</strong> ได้เลยครับ เราใช้เครื่องมือมาตรฐานและน้ำยาคุณภาพ ขัดลอกคราบเหลืองฝังลึกให้กลับมาใสปิ๊ง พร้อมเคลือบปกป้องให้อยู่ทนนาน รับรองว่าทริปนี้คุณจะขับรถกลางคืนได้อย่างสบายใจแน่นอน!</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">💡 บริการขัดฟื้นฟูไฟหน้าใสปิ๊ง</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">ไฟเหลืองมัว มองไม่เห็นทาง? เราขัดให้ใสเหมือนใหม่!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการขัดลอกคราบเหลือง ลบรอยแตกลายงา พร้อมเคลือบเซรามิกไฟหน้า โซนบางนา ศรีนครินทร์</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0887671679" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรจองคิวขัดไฟหน้า 088-767-1679</a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ประเมินอาการฟรี</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/car-polishing" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">ขัดไฟหน้าเหลือง บริการขัดสีรถถึงบ้าน บางนา ศรีนครินทร์</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ บางนา ศรีนครินทร์ →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) ขัดไฟหน้าก่อนเดินทาง</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ขัดไฟหน้าแล้ว จะกลับมาเหลืองอีกไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> การขัดไฟหน้าแบบมาตรฐาน (ขัดลอกแลคเกอร์เดิมออก) จะทำให้ไฟหน้าใสขึ้นทันที แต่ถ้าไม่มีการ "เคลือบปกป้อง" ทับลงไป โคมไฟจะโดน UV เผาและกลับมาเหลืองเร็วกว่าเดิมภายในไม่กี่เดือนครับ ที่ FirstCarCenter เราจึงทำการเคลือบเซรามิกไฟหน้าให้ทุกเคส เพื่อให้อยู่ทนนานเป็นปีๆ ครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ยาสีฟัน หรือ ครีมขัดสี ขัดไฟหน้าเองได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ได้ผลแค่ชั่วคราวและเฉพาะคราบเหลืองบางๆ ที่ผิวหน้าเท่านั้นครับ! ยาสีฟันหรือครีมขัดสีทั่วไป (เช่น กาน่า) ไม่สามารถขัดลอกชั้นแลคเกอร์ที่เสื่อมสภาพหรือรอยแตกลายงาฝังลึกได้ แถมยังอาจทิ้งรอยขนแมวไว้เต็มโคมไฟหน้าอีกด้วย แนะนำให้ใช้เครื่องขัดรอบสูงและกระดาษทรายน้ำในการแก้ปัญหาจะตรงจุดที่สุดครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ใช้เวลาขัดไฟหน้านานแค่ไหน?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ขึ้นอยู่กับสภาพความเหลืองและรอยแตกลายงาของโคมไฟครับ โดยทั่วไปจะใช้เวลาขัดฟื้นฟูประมาณ 1 - 2 ชั่วโมงต่อคู่ (รวมขั้นตอนการขัดกระดาษทราย ขัดเงา และเคลือบเซรามิก) ลูกค้าสามารถนั่งรอรับรถได้เลยครับ</p>
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
