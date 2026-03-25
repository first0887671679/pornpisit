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

    <text x="0" y="20" font-size="70" font-weight="800" fill="url(#text-grad)">รถสีขาวเหลือง</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">หมองหมอง ขัดยังไงให้ใส?</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวขัดสีล้างคราบเหลือง โซนบางนา ศรีนครินทร์</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">FIRSTCARCENTER</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 🟡 👎</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถสีขาวมุกเหลืองหมอง จากคราบไคลและแดด</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ลานจอดรถตากแดด หมู่บ้านแถวแพรกษา</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🧽 ✨ 🧼</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">ใช้เครื่องขัด DA ขัดเคลือบสีลอกคราบไคลเหลือง</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ถนนศรีนครินทร์ โซนบางนา</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">💎 🚙 💯</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถกลับมาขาวจั๊วะ เงาตาแตก เหมือนป้ายแดง</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโดซอยแบริ่ง สุขุมวิท 107</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-white-car-yellow-stain-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'white-car-yellow-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'white-car-yellow-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'white-car-yellow-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "รถสีขาวเหลือง หมอง ไม่เงา! แก้ยังไงให้กลับมาขาวจั๊วะ? รีวิวขัดสีจริง",
  slug: "yellowish-white-car-polishing-guide",
  excerpt: "ปัญหาปวดใจของคนใช้รถสีขาว คือจอดตากแดดนานๆ แล้ว รถสีขาวเหลือง หมอง มีคราบไคลฝังลึก มาดูวิธีขัดสีล้างคราบเหลืองให้กลับมาขาวใสเหมือนป้ายแดง พร้อมเคสรีวิวจากโซนศรีนครินทร์ บางนา",
  category: "คาร์แคร์",
  tags: "รถสีขาวเหลือง,ขัดสีรถสีขาว,คราบไคลรถสีขาว,ขัดสีรถยนต์,ล้างรถสีขาว,สมุทรปราการ,บางนา",
  published: 1,
  author: "FIRSTCARCENTER",
  seoTitle: "รถสีขาวเหลือง หมอง แก้ยังไง? รีวิวขัดสีลอกคราบไคล โซนบางนา",
  seoDescription: "รถสีขาวเหลือง คราบไคลฝังลึก จอดตากแดดจนหมอง? อ่านสาเหตุและวิธีแก้ พร้อมเคสรีวิวขัดสีรถสีขาวให้กลับมาเงาใส โซนศรีนครินทร์ บางนา แบริ่ง เทพารักษ์",
  seoKeywords: "รถสีขาวเหลือง, ขัดสีรถสีขาว, ล้างคราบไคลรถสีขาว, ขัดสีรถยนต์ บางนา, เคลือบสีรถสีขาว",
  ogTitle: "รถสีขาวเหลือง หมองตาแตก! ขัดสีลอกคราบไคลช่วยได้",
  ogDescription: "แชร์เคล็ดลับกู้ชีพรถสีขาวที่เหลืองหมอง ให้กลับมาขาวออร่าเหมือนออกศูนย์ พร้อมรีวิวเคสจริงย่านศรีนครินทร์",
  coverImage: "/images/blog/pig-white-car-yellow-stain-cover.svg",
  content: `
<p class="lead">ใครขับรถสีขาวบ้างยกมือขึ้น! สีขาวยอดฮิตที่ดูสะอาดตา สวยหรูตอนป้ายแดง แต่พอใช้ไปสัก 2-3 ปี ปัญหาที่ทุกคนต้องเจอคือ <strong>"รถสีขาวเหลือง"</strong> หรือสีรถหมองลง ดูไม่สว่างเหมือนเดิม ยิ่งใครที่ต้องจอดรถตากแดดเป็นประจำแถว <strong>บางนา ศรีนครินทร์ เทพารักษ์ หรือแพรกษา</strong> จะเห็นคราบไคลฝังแน่นชัดเจนมาก วันนี้ <strong>FirstCarCenter</strong> จะมาเจาะลึกสาเหตุ และวิธีขัดสีลอกคราบเหลืองให้รถกลับมาขาวจั๊วะครับ</p>

<h2>ทำไม "รถสีขาวเหลือง" ถึงเกิดขึ้นได้?</h2>
<p>อาการรถสีขาวเปลี่ยนเป็นสีครีม หรือเหลืองหมองๆ ไม่ได้เกิดจากเนื้อสีเสื่อมสภาพเสมอไปครับ แต่เกิดจากชั้นแลคเกอร์ (Clear Coat) ที่เคลือบอยู่บนสุดถูกทำร้ายจาก:</p>
<ul>
  <li><strong>รังสี UV จากแสงแดด:</strong> ตัวการหลักที่ทำให้ชั้นเคลือบใสเกิดการ Oxidation เปลี่ยนสีเป็นสีเหลือง</li>
  <li><strong>คราบไคลและฝุ่นควัน:</strong> ละอองน้ำมัน เขม่าท่อไอเสียบนถนน <strong>สุขุมวิท - ศรีนครินทร์</strong> ที่ฝังตัวลงไปในรูขุมขนของสีรถ เมื่อสะสมนานๆ ล้างไม่ออก จะทำให้สีดูหมองคล้ำ</li>
  <li><strong>คราบน้ำและฝนกรด:</strong> ทิ้งคราบฝังแน่น (Watermark) ถ้าไม่รีบเช็ดออกจะทำปฏิกิริยากับสีรถ</li>
  <li><strong>การล้างรถผิดวิธี:</strong> ใช้แชมพูที่ไม่ได้มาตรฐาน หรือเช็ดรถด้วยผ้าสกปรก ทำให้เกิดรอยขนแมว ซึ่งรอยเหล่านี้จะเป็นแหล่งสะสมของคราบสกปรก ทำให้รถดูเหลืองและเก่า</li>
</ul>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/white-car-yellow-case1.svg" alt="สภาพ รถสีขาวเหลือง หมองคล้ำ จอดตากแดด หมู่บ้านแถวแพรกษา สมุทรปราการ" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 1: Honda HRV สีขาวมุก กลายเป็นสีครีมที่แพรกษา</h2>
<p>ลูกค้าขับ Honda HRV สีขาวมุก (Orchid White Pearl) ปี 2018 อาศัยอยู่ในหมู่บ้านย่าน <strong>แพรกษา สมุทรปราการ</strong> เนื่องจากที่บ้านไม่มีโรงรถ ต้องจอดตากแดดตากฝนตลอด 5 ปีเต็ม สีรถจากขาวมุกสวยๆ กลายเป็นสีครีมเหลืองๆ หมองๆ ล้างแชมพูธรรมดายังไงก็ไม่ออก</p>

<p>ลูกค้านำรถเข้ามาใช้บริการ <a href="/car-polishing" class="text-orange-600 font-bold hover:underline">ขัดสีรถยนต์ลบรอย</a> กับทางร้าน ช่างของเราประเมินแล้วว่าต้องทำการ <strong>"ขัดลอกคราบไคล (Decontamination)"</strong> ก่อนเป็นอันดับแรก</p>
<ol>
  <li><strong>ลูบดินน้ำมัน (Clay Bar):</strong> ช่างล้างรถและใช้ดินน้ำมันลูบเพื่อดึงละอองสี ยางมะตอย และคราบฝุ่นฝังลึกออกจากผิวแลคเกอร์</li>
  <li><strong>ขัดสีด้วยเครื่อง Dual Action (DA):</strong> ใช้ฟองน้ำขัดสีระดับ Medium Cut คู่กับน้ำยาขัดลบรอย ค่อยๆ ขัดเปิดผิวแลคเกอร์ที่เหลืองและมีรอยขนแมวออก</li>
  <li><strong>ขัดชักเงา (Finishing):</strong> ใช้ฟองน้ำละเอียดและน้ำยาชักเงา ดึงความใสของสีขาวมุกให้กลับมาเปล่งประกาย</li>
  <li><strong>เคลือบสี (Wax / Coating):</strong> ปิดท้ายด้วยการลงแว็กซ์เคลือบเงา เพื่อปกป้องผิวสีจากรังสี UV</li>
</ol>
<p>ผลลัพธ์คือ HRV คันนี้กลับมาขาวสว่างจ้า! ลูกค้าบอกว่า "เหมือนได้รถใหม่เลย นึกว่าต้องทำสีใหม่ซะแล้ว"</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/white-car-yellow-case2.svg" alt="ช่างใช้เครื่องขัด DA ขัดสี รถสีขาวเหลือง ถนนศรีนครินทร์" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study 2: Mazda 2 สีขาว คราบน้ำฝังแน่น ซอยแบริ่ง</h2>
<p>เคสนี้ลูกค้าอยู่คอนโด <strong>ซอยแบริ่ง (สุขุมวิท 107)</strong> รถ Mazda 2 สีขาวธรรมดา (ไม่ใช่มุก) ลูกค้าจอดรถใต้ต้นไม้และโดนน้ำแอร์หยดใส่เป็นประจำ ทำให้เกิดคราบน้ำฝังลึกเป็นดวงๆ ทั่วฝากระโปรงและหลังคา ยิ่งปล่อยไว้นาน รถยิ่งดูเหลืองและเป็นจ้ำๆ</p>

<p>ช่างของเราใช้น้ำยาสลายคราบน้ำ (Water Spot Remover) เฉพาะจุดอย่างระมัดระวัง จากนั้นทำการขัดเคลือบสีเต็มระบบ หลังทำเสร็จ รอยดวงน้ำหายเกลี้ยง สีขาวกลับมาเรียบเนียนสม่ำเสมอ เงาตาแตกครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/white-car-yellow-case3.svg" alt="รถสีขาวเหลือง ขัดเสร็จกลับมาเงาใส คอนโดซอยแบริ่ง สุขุมวิท 107" class="w-full h-auto object-cover m-0" />
</div>

<h2>วิธีดูแลไม่ให้ "รถสีขาวเหลือง" เร็วกว่ากำหนด</h2>
<ul>
  <li><strong>หลีกเลี่ยงการจอดตากแดด:</strong> หาที่จอดในร่ม หรือถ้าต้องจอดตากแดดประจำแถว <strong>ซีคอน ศรีนครินทร์ หรือ ตลาดหนามแดง</strong> ควรคลุมผ้าคลุมรถ (แบบกัน UV และระบายอากาศได้ดี)</li>
  <li><strong>ล้างรถเป็นประจำ:</strong> อย่างน้อยสัปดาห์ละ 1 ครั้ง เพื่อไม่ให้คราบเขม่าหรือขี้นกฝังตัวลึก</li>
  <li><strong>เคลือบสีรถสม่ำเสมอ:</strong> ลงแว็กซ์เคลือบเงาทุกๆ 1-2 เดือน แว็กซ์จะเปรียบเสมือนครีมกันแดดที่ช่วยปกป้องชั้นแลคเกอร์</li>
  <li><strong>ใช้น้ำยาล้างคราบไคล (Cleaner Wax):</strong> ทุกๆ 6 เดือน เพื่อลอกชั้นคราบสกปรกบางๆ ที่การล้างปกติเอาไม่ออก</li>
</ul>

<h2>รถสีขาวเหลือง หมองคล้ำ? ให้ FirstCarCenter ช่วยขัดให้สิครับ</h2>
<p>ถ้าคุณรู้สึกว่ารถสีขาวของคุณไม่สวยเหมือนวันแรก ล้างยังไงก็ดูหมองๆ เหลืองๆ ลองนำรถมาให้ทีมงาน <strong>FirstCarCenter</strong> ขัดเคลือบสีดูครับ เรามีหน้าร้านและบริการขัดสีรถยนต์ระดับพรีเมียม ครอบคลุมลูกค้าในย่าน <strong>บางนา ศรีนครินทร์ แบริ่ง ลาซาล เทพารักษ์ สมุทรปราการ</strong> ใช้ผลิตภัณฑ์นำเข้า ขัดอย่างระมัดระวัง ไม่ทำลายชั้นสี รับรองว่ารถของคุณจะกลับมาขาวสว่าง ออร่าพุ่งแน่นอน!</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">✨ บริการขัดเคลือบสี ฟื้นฟูสภาพรถ</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">รถสีขาวเหลือง หมองคล้ำ? เราขัดให้กลับมาขาวจั๊วะ!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการลูบดินน้ำมัน ขัดลอกคราบไคล ลบรอยขนแมว และเคลือบเงา จบปัญหาผิวรถสาก เหลืองหมอง ให้กลับมาลื่นใส โซนบางนา ศรีนครินทร์</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0887671679" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรจองคิวขัดสี 088-767-1679</a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ประเมินสภาพสีรถฟรี</a>
    </div>
    <p style="margin-top:1.5rem;"><a href="/car-polishing" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">บริการขัดสีรถถึงบ้าน บางนา แบริ่ง เทพารักษ์</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ แบริ่ง ลาซาล →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) ปัญหารถสีขาวเหลือง</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ขัดสีลอกคราบไคล ทำให้แลคเกอร์บางลงไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> การขัดสีแบบปรับสภาพ (Polishing) จะกินชั้นแลคเกอร์เพียงเล็กน้อยมากในระดับไมครอนครับ หากทำโดยช่างผู้เชี่ยวชาญและใช้น้ำยา/ฟองน้ำที่ถูกต้อง จะไม่ทำให้สีบางจนน่าเกลียด สามารถขัดได้หลายครั้งตลอดอายุการใช้งานรถครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ขัดสีเสร็จแล้ว จะอยู่ได้นานแค่ไหนก่อนจะเหลืองอีก?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ขึ้นอยู่กับการดูแลหลังขัดครับ ถ้านำไปเคลือบแก้วเซรามิก จะอยู่ได้นาน 1-3 ปี แต่ถ้าเคลือบแว็กซ์ปกติ และจอดตากแดดบ่อย อาจจะเริ่มเห็นคราบไคลกลับมาใน 6-12 เดือน จึงแนะนำให้ลงแว็กซ์สม่ำเสมอครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ใช้สเตคลีนขัดคราบเหลืองเองได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> สเตคลีนสามารถขัดคราบสกปรกเฉพาะจุดได้ครับ แต่ <strong>ไม่แนะนำ</strong> ให้ขัดทั้งคัน เพราะสเตคลีนมีฤทธิ์เป็นโซลเวนท์ หากออกแรงขัดมากไปหรือใช้ผ้าหยาบ จะทำให้เกิดรอยขนแมวเต็มรถ และสีด่าง ไม่เงางาม ควรใช้น้ำยา Cleaner Wax สำหรับรถยนต์โดยเฉพาะจะปลอดภัยกว่าครับ</p>
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
