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

      <!-- Sponge & Spray Tool -->
      <g transform="translate(-75, 75) rotate(-15)">
        <rect x="-20" y="-30" width="40" height="30" rx="8" fill="#FBBF24" filter="url(#shadow-sm)"/>
        <circle cx="-5" cy="-20" r="3" fill="#B45309" opacity="0.5"/>
        <circle cx="10" cy="-15" r="4" fill="#B45309" opacity="0.5"/>
        <circle cx="0" cy="-10" r="2" fill="#B45309" opacity="0.5"/>
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

      <!-- Sparkles -->
      <g transform="translate(60, -80)">
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

    <text x="0" y="20" font-size="68" font-weight="800" fill="url(#text-grad)">ล้างคราบแมลงฝังแน่น</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">หน้ารถหลังเดินทางไกล!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวขัดล้างฟื้นฟูสีรถ โซนศรีนครินทร์ บางนา แบริ่ง</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PORNPISIT BATTERY</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 🦟 💥</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ขับรถเดินทางไกลกลางคืน คราบแมลงฝังแน่นเต็มหน้ารถ</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: จุดจอดพักรถ ถนนบางนา-ตราด</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🧽 ✨ 🧴</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ใช้น้ำยาสลายคราบแมลง และขัดสีลบรอยด่างฝังลึก</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: อู่ PORNPISIT BATTERY โซนศรีนครินทร์</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">💎 🚙 💯</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถกลับมาใสปิ๊ง สีไม่ด่าง พร้อมเคลือบเงาปกป้องเต็มระบบ</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโด ซอยแบริ่ง ลาซาล</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-bug-stain-removal-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'bug-stain-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'bug-stain-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'bug-stain-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ล้างคราบแมลงฝังแน่น หน้ารถหลังเดินทางไกล ล้างยังไงไม่ให้สีด่าง? รีวิวขัดสี",
  slug: "bug-stain-removal-after-road-trip-guide",
  excerpt: "ขับรถต่างจังหวัดตอนกลางคืนกลับมา ซากแมลงเต็มกันชน! อ่านวิธี ล้างคราบแมลงฝังแน่น ให้ถูกวิธี พร้อมรีวิวแก้ปัญหาสีรถด่างจากคราบแมลงกัดสี โซนศรีนครินทร์ บางนา แบริ่ง",
  category: "คาร์แคร์",
  tags: "ล้างคราบแมลงฝังแน่น,คราบแมลงหน้ารถ,น้ำยาล้างคราบแมลง,ทำความสะอาดหน้ารถหลังเดินทางไกล,คราบแมลงกินสีรถ,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "ล้างคราบแมลงฝังแน่น หน้ารถ สีไม่ด่าง! รีวิวขัดสี โซนบางนา",
  seoDescription: "ล้างคราบแมลงฝังแน่น หน้ารถหลังเดินทางไกล! คราบแมลงกินสีรถ ล้างไม่ออก อย่าขัดเองจนสีถลอก ดูรีวิวขัดสีรถลบคราบแมลง โซนศรีนครินทร์ บางนา แบริ่ง เทพารักษ์",
  seoKeywords: "ล้างคราบแมลงฝังแน่น, คราบแมลงหน้ารถ, น้ำยาล้างคราบแมลง, ขัดสีลบรอย, ทำความสะอาดหน้ารถหลังเดินทางไกล, คราบแมลงกินสีรถ",
  ogTitle: "ล้างคราบแมลงฝังแน่น หลังเดินทางไกล กู้สีรถด่างให้กลับมาใส!",
  ogDescription: "แชร์อันตรายของคราบแมลงที่ทำลายสีรถ พร้อมรีวิวขัดฟื้นฟูสีรถลบคราบแมลงฝังลึก โซนบางนา-ศรีนครินทร์",
  coverImage: "/images/blog/pig-bug-stain-removal-cover.svg",
  content: `
<p class="lead">หลังจบเทศกาลหยุดยาว หรือการขับรถเดินทางไกลในตอนกลางคืน ของแถมที่ติดหน้ารถกลับมาเสมอคือ "ซากแมลง" ที่กระจายเต็มกันชน กระจังหน้า และกระจกมองข้าง! หลายคนเหนื่อยจากการเดินทางจึงจอดรถทิ้งไว้หลายวัน พอจะมา <strong>ล้างคราบแมลงฝังแน่น</strong> กลับพบว่าล้างไม่ออก หรือแย่กว่านั้นคือทิ้ง "รอยด่างขาว" เอาไว้บนสีรถ! วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาแชร์ว่าทำไมคราบแมลงถึงอันตราย พร้อมรีวิวกู้ชีพสีรถหลังทริปเดินทางไกล โซน <strong>ห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง ลาซาล เทพารักษ์ แพรกษา</strong> ครับ</p>

<h2>ทำไม "คราบแมลงหน้ารถ" ถึงอันตรายและห้ามปล่อยทิ้งไว้?</h2>
<p>หลายคนคิดว่าแค่ซากแมลงติดรถ เดี๋ยวค่อยล้างตอนเข้าคาร์แคร์ก็ได้ แต่ความจริงแล้ว ซากแมลงและเลือดของแมลงมี <strong>ฤทธิ์เป็นกรด (Acidic)</strong> อย่างรุนแรงครับ!</p>
<p>เมื่อซากแมลงเปียกชื้นและโดนความร้อนจากเครื่องยนต์ หรือจอดตากแดด กรดในตัวแมลงจะทำปฏิกิริยากัดกร่อนชั้นแลคเกอร์ (Clear Coat) ที่เคลือบสีรถของคุณ หากทิ้งไว้เกิน 2-3 วัน มันจะกัดทะลุแลคเกอร์ลงไปถึงชั้นสี ทำให้เกิด <strong>"คราบแมลงกินสีรถ"</strong> เป็นรอยด่างดวงๆ ซึ่งล้างด้วยแชมพูทั่วไปไม่ออกอีกต่อไปครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/bug-stain-case1.svg" alt="ขับรถเดินทางไกลกลางคืน คราบแมลงฝังแน่นเต็มหน้ารถ ถนนบางนา-ตราด" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: คราบแมลงฝังแน่น ทิ้งไว้เป็นอาทิตย์จนแลคเกอร์พัง</h2>
<p>ลูกค้าขับรถ SUV สีขาวมุก เดินทางกลับจากภาคอีสาน ขับกลางคืนฝ่าฝูงแมลงมาตลอดทาง เมื่อถึงบ้านใน <strong>ซอยลาซาล แบริ่ง</strong> ด้วยความเพลียจึงจอดรถทิ้งไว้หน้าบ้าน และไปทำงานต่ออีก 1 สัปดาห์เต็มๆ</p>

<p>พอลูกค้านำรถมาล้างที่ร้าน พบว่าคราบแมลงแห้งแข็งเป็นหิน ล้างอัดฉีดรอบแรกออกแค่ตัวแมลง แต่ทิ้ง <strong>"รอยด่างสีเหลือง-น้ำตาล"</strong> ฝังลึกเต็มกันชนหน้าและฝากระโปรงรถ ลูกค้าเคยพยายามเอาฟองน้ำถูแรงๆ จนเกิดรอยขนแมวเต็มไปหมด!</p>

<p>เคสนี้ช่างของ PORNPISIT BATTERY ต้องทำการฟื้นฟูสีรถแบบเต็มระบบครับ:</p>
<ol>
  <li><strong>ใช้น้ำยาสลายคราบแมลง (Bug & Tar Remover):</strong> ฉีดพ่นทิ้งไว้เพื่อสลายโปรตีนและกรดของแมลงให้อ่อนตัวลง โดยไม่ทำลายสีรถ</li>
  <li><strong>ลูบดินน้ำมันขจัดคราบฝังลึก:</strong> ดึงเอาคราบสกปรกที่ฝังในรูขุมขนของสีรถออก</li>
  <li><strong>ขัดสีลบรอย (Polishing):</strong> ใช้เครื่องขัดสี Dual Action (DA) คู่กับน้ำยาขัดละเอียด ขัดลอกชั้นแลคเกอร์ส่วนที่ถูกแมลงกัดจนด่างออกไป พร้อมลบรอยขนแมวที่ลูกค้าขัดพลาดมา</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/bug-stain-case2.svg" alt="ใช้น้ำยาสลายคราบแมลง และขัดสีลบรอยด่างฝังลึก อู่ PORNPISIT BATTERY โซนศรีนครินทร์" class="w-full h-auto object-cover m-0" />
</div>

<p>ผลลัพธ์คือ รถสีขาวมุกคันนี้กลับมาขาวจั๊วะ ไร้รอยด่างและคราบเหลือง ลูกค้าดีใจมากเพราะคิดว่าต้องทำสีกันชนใหม่ซะแล้ว! หลังจากขัดเสร็จ เราเคลือบแว็กซ์ทับให้อีกชั้น เพื่อให้คราบแมลงครั้งต่อไปเกาะติดยากขึ้นครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/bug-stain-case3.svg" alt="รถกลับมาใสปิ๊ง สีไม่ด่าง พร้อมเคลือบเงาปกป้องเต็มระบบ คอนโด ซอยแบริ่ง ลาซาล" class="w-full h-auto object-cover m-0" />
</div>

<h2>วิธี ล้างคราบแมลงฝังแน่น ด้วยตัวเองเบื้องต้น</h2>
<p>ถ้าคุณเพิ่งกลับมาจากการ <strong>เดินทางไกล</strong> และต้องการทำความสะอาดเบื้องต้นเพื่อป้องกันสีด่าง แนะนำให้ทำดังนี้:</p>
<ul>
  <li><strong>รีบล้างทันที:</strong> อย่าปล่อยข้ามคืน เอาน้ำฉีดไล่คราบออกให้มากที่สุด</li>
  <li><strong>ใช้ทิชชู่เปียกทิ้งไว้:</strong> นำทิชชู่แผ่นหนาชุบน้ำเปล่า หรือน้ำยาล้างรถ โปะแปะไว้ตรงคราบแมลง ทิ้งไว้ 10-15 นาที ให้คราบนิ่มลง แล้วค่อยเช็ดออกเบาๆ</li>
  <li><strong>ห้ามใช้ของแข็งขัด:</strong> <strong>ห้ามใช้สก๊อตไบรต์ ฟองน้ำล้างจาน หรือเล็บขูดเด็ดขาด!</strong> เพราะจะทำให้สีถลอกลึกจนต้องทำสีใหม่</li>
</ul>

<h2>แก้คราบแมลงกินสีรถ ขัดฟื้นฟูสี ที่ PORNPISIT BATTERY</h2>
<p>ถ้าคุณพลาดปล่อยทิ้งไว้จน <strong>คราบแมลงกินสีรถ</strong> เป็นรอยด่าง หรือรอยเหลืองฝังลึกไปแล้ว การล้างธรรมดาจะไม่ช่วยอะไรครับ! แวะมาให้ผู้เชี่ยวชาญที่ <strong>PORNPISIT BATTERY</strong> ดูแลดีกว่าครับ เรามีบริการ <a href="/car-polishing" class="text-orange-600 font-bold hover:underline">ขัดสีรถยนต์ ลบรอยด่าง</a> และสลายคราบฝังลึก ครอบคลุมลูกค้าในย่าน <strong>ห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง ลาซาล เทพารักษ์ สุขุมวิท สมุทรปราการ</strong> รับรองว่าหน้ารถของคุณจะกลับมาหล่อใส พร้อมสำหรับการเดินทางครั้งต่อไปครับ!</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">✨ บริการขัดฟื้นฟูสีรถ ลบคราบฝังลึก</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">คราบแมลงกัดสีรถด่าง? เราขัดให้กลับมาใส 100%</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการสลายคราบแมลง คราบยางมะตอย และขัดลบรอยด่างฝังลึก พร้อมเคลือบสีปกป้อง โซนห้วยขวาง ดินแดง ลาดพร้าว</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรจองคิวขัดสี 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ประเมินสภาพสีรถฟรี</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/car-polishing" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">บริการขัดสีรถถึงบ้าน ห้วยขวาง ดินแดง ลาดพร้าว เทพารักษ์</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ ศรีนครินทร์ เทพารักษ์ →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) การ ล้างคราบแมลงฝังแน่น</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ใช้น้ำยาล้างห้องน้ำล้างคราบแมลงได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> <strong>ห้ามใช้เด็ดขาดครับ!</strong> น้ำยาล้างห้องน้ำมีกรดรุนแรงมาก แม้จะทำให้คราบแมลงหลุดออกง่าย แต่มันจะกัดชั้นแลคเกอร์จนสีรถด่าง ขาวซีด และพังถาวรทันที แนะนำให้ใช้น้ำยาสลายคราบแมลง (Bug Remover) สำหรับรถยนต์โดยเฉพาะครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: คราบแมลงฝังแน่นจนสีด่างเป็นรอยบุ๋ม ขัดออกไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ขึ้นอยู่กับความลึกครับ ถ้ากรดจากแมลงกัดแค่ชั้นแลคเกอร์ด้านบน (Clear Coat) สามารถใช้เครื่องขัดสีขัดลอกออกได้ 100% แต่ถ้าทิ้งไว้นานเป็นเดือนจนกัดทะลุชั้นสี (Base Coat) อาจขัดออกได้แค่ 70-80% และอาจต้องทำสีใหม่ในจุดนั้นครับ จึงควรรีบขัดออกให้เร็วที่สุด</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: เคลือบแก้ว หรือ ติดฟิล์มใสกันรอย ช่วยป้องกันคราบแมลงได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ช่วยได้มากครับ! การเคลือบแก้วเซรามิกจะทำให้ผิวรถลื่น คราบแมลงเกาะติดยากและฉีดน้ำล้างออกง่าย ส่วนการติดฟิล์มใสกันรอย (PPF) จะป้องกันกรดกัดเข้าสีรถได้ 100% ถ้าคุณเดินทางไกลบ่อยๆ แนะนำให้ทำไว้จะคุ้มค่ามากครับ</p>
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
