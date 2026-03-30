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

    <text x="0" y="20" font-size="70" font-weight="800" fill="url(#text-grad)">ขัดคราบแป้งสงกรานต์</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">ด่างฝังลึก ซักไม่ออก!</text>

    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">รีวิวฟื้นฟูสีรถหลังเทศกาล โซนห้วยขวาง ดินแดง ลาดพร้าว</text>
  </g>

  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>

  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PORNPISIT BATTERY</text>
</svg>`;

const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 💦 ⚪</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถโดนสาดแป้งดินสอพอง ทิ้งไว้จนเป็นคราบด่าง</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: จุดเล่นน้ำ ถนนศรีนครินทร์</text>
  </g>
</svg>`;

const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🧽 ✨ 🌪️</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เข้าคาร์แคร์ ขัดสีลอกคราบแป้งฝังลึกด้วยเครื่อง DA</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ร้านคาร์แคร์ โซนบางนา</text>
  </g>
</svg>`;

const inline3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0c1220" rx="24"/>
  <circle cx="400" cy="225" r="150" fill="rgba(34, 197, 94, 0.12)" filter="blur(30px)"/>
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">💎 🚙 💯</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">รถกลับมาเงาฉ่ำ ไร้รอยด่าง พร้อมลุยงานหลังหยุดยาว</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโดซอยลาซาล</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-songkran-powder-removal-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'songkran-powder-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'songkran-powder-case2.svg'), inline2Svg);
fs.writeFileSync(path.join(imgDir, 'songkran-powder-case3.svg'), inline3Svg);
console.log('SVGs created.');

// ============================================================
// 2. Blog post content
// ============================================================
const post = {
  title: "ขัดคราบแป้งสงกรานต์ สีรถด่างฝังลึก ล้างไม่ออก ทำไงดี? รีวิวฟื้นฟูสีรถ",
  slug: "songkran-powder-stain-removal-guide",
  excerpt: "หลังจบเทศกาลสงกรานต์ ปวดหัวกับปัญหา ขัดคราบแป้งสงกรานต์ ไม่ออก! รถเป็นรอยด่างขาวฝังลึก อย่าเพิ่งเอาสก๊อตไบรต์ขัด! ดูรีวิววิธีขัดฟื้นฟูสีรถให้กลับมาเงาใส โซนศรีนครินทร์ บางนา",
  category: "คาร์แคร์",
  tags: "ขัดคราบแป้งสงกรานต์,คราบดินสอพองรถ,ขัดสีรถยนต์,ลบคราบน้ำฝังลึก,เคลือบสีรถ,สมุทรปราการ,บางนา",
  published: 1,
  author: "PORNPISIT BATTERY",
  seoTitle: "ขัดคราบแป้งสงกรานต์ ดินสอพองกัดสีรถ ทำไงดี? รีวิวขัดสี โซนบางนา",
  seoDescription: "ขัดคราบแป้งสงกรานต์ ดินสอพอง คราบน้ำฝังลึก ล้างแชมพูไม่ออก รถสีด่าง! อย่าขัดเองจนสีถลอก อ่านวิธีแก้และรีวิวขัดสีรถ โซนศรีนครินทร์ บางนา แบริ่ง เทพารักษ์",
  seoKeywords: "ขัดคราบแป้งสงกรานต์, คราบดินสอพองกัดสีรถ, ขัดคราบน้ำฝังแน่น, ขัดสีรถยนต์ บางนา, ล้างคราบสงกรานต์",
  ogTitle: "ขัดคราบแป้งสงกรานต์ สีรถด่างฝังลึก กู้ชีพได้!",
  ogDescription: "แชร์วิธีจัดการคราบแป้งและดินสอพองหลังเล่นน้ำสงกรานต์ พร้อมรีวิวขัดสีรถฟื้นฟูรอยด่างให้กลับมาเงาฉ่ำเหมือนใหม่",
  coverImage: "/images/blog/pig-songkran-powder-removal-cover.svg",
  content: `
<p class="lead">หลังจบความสนุกสุดเหวี่ยงของเทศกาลสงกรานต์ สิ่งที่หลงเหลือไว้บนรถคันเก่งคือ "คราบแป้ง คราบดินสอพอง และคราบน้ำบาดาล" ที่เกาะแน่นหนึบ! หลายคนทิ้งไว้หลายวัน พอจะมาล้างปรากฏว่า <strong>ขัดคราบแป้งสงกรานต์</strong> ไม่ออก ล้างแชมพูไปแล้วแต่พอลูบดูก็ยังสากๆ แถมรถสีเข้มๆ กลายเป็นรอยด่างขาวฝังลึก! วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาเตือนถึงอันตรายของคราบแป้ง พร้อมรีวิววิธีกู้ชีพสีรถหลังสงกรานต์ในโซน <strong>ศรีนครินทร์ บางนา ลาซาล แบริ่ง เทพารักษ์</strong> กันครับ</p>

<h2>ทำไมคราบแป้งสงกรานต์ ถึงล้างออกยากและทำสีด่าง?</h2>
<p>แป้งดินสอพองและแป้งเย็นที่ใช้สาดกันช่วงสงกรานต์ มีส่วนผสมของ <strong>"แคลเซียมคาร์บอเนต (Calcium Carbonate)"</strong> และสารเคมีบางชนิดที่มีฤทธิ์เป็นด่างสูงมาก (Alkaline) เมื่อแป้งเปียกน้ำแล้วไปเกาะบนตัวรถ พอโดนแดดเผาจนแห้งกรัง มันจะทำปฏิกิริยากัดกร่อนชั้นแลคเกอร์เคลือบสีรถโดยตรง</p>
<p>ยิ่งถ้าน้ำที่สาดเป็น <strong>น้ำบาดาล คลอง หรือน้ำผสมน้ำแข็ง</strong> จะยิ่งมีคราบหินปูนและตะกรันเกาะฝังแน่นเข้าไปอีก ถ้าทิ้งไว้เกิน 3-5 วัน โดยไม่ล้าง คราบเหล่านี้จะฝังลึกจนล้างด้วยแชมพูไม่ออกครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/songkran-powder-case1.svg" alt="รถโดนสาดแป้งดินสอพอง ทิ้งไว้จนเป็นคราบด่าง จุดเล่นน้ำ ถนนศรีนครินทร์" class="w-full h-auto object-cover m-0" />
</div>

<h2>ข้อควรระวัง! อย่าทำแบบนี้ตอนล้างคราบแป้งสงกรานต์</h2>
<ul>
  <li><strong>ห้ามเอาผ้าแห้งเช็ดคราบแป้งเด็ดขาด!</strong> เพราะผงแป้งที่แข็งตัวจะทำหน้าที่เหมือน "กระดาษทราย" ขูดสีรถจนเป็นรอยขนแมวทั้งคัน</li>
  <li><strong>ห้ามใช้สก๊อตไบรต์ หรือฟองน้ำล้างจานขัด:</strong> (ข้อนี้ลูกค้าทำพลาดเยอะมาก) เพราะจะทำให้สีรถถลอกเป็นรอยลึกจนต้องทำสีใหม่</li>
  <li><strong>หลีกเลี่ยงการใช้น้ำยาล้างห้องน้ำหรือกรดรุนแรง:</strong> แม้จะลบคราบออก แต่จะทำให้แลคเกอร์พังและสีรถด่างถาวร</li>
</ul>

<h2>Case Study: รถสีดำด่างแป้งฝังลึก ทิ้งไว้ 1 สัปดาห์ โซนบางนา</h2>
<p>ลูกค้าขับรถ Honda Accord สีดำ ไปเล่นน้ำและโดนสาดแป้งเต็มคันที่ <strong>ถนนศรีนครินทร์</strong> หลังจากนั้นลูกค้าจอดรถทิ้งไว้ที่บ้านแถว <strong>บางนา</strong> และบินไปเที่ยวต่างประเทศต่อ กลับมาอีกทีหลังผ่านไป 1 สัปดาห์!</p>

<p>พอลูกค้านำรถไปล้างอัดฉีดที่คาร์แคร์ทั่วไป ปรากฏว่าคราบแป้งหนาๆ หลุดออก แต่ <strong>"ทิ้งรอยด่างขาวๆ รูปหยดน้ำไว้เต็มคัน"</strong> พอลูบดูผิวรถสากมือมาก ล้างยังไงก็ไม่ออก ลูกค้าจึงนำรถมาให้ <strong>PORNPISIT BATTERY</strong> ช่วยจัดการ</p>

<p>เคสนี้คราบด่างกัดลงไปในชั้นแลคเกอร์แล้ว (ระดับ Water Spot Stage 2-3) ช่างของเราจึงต้องทำการฟื้นฟูสีแบบเต็มระบบ (Paint Correction):</p>
<ol>
  <li><strong>ลูบดินน้ำมัน (Clay Bar):</strong> ลูบทั้งคันเพื่อดึงคราบแคลเซียม ดินสอพอง และคราบสากๆ ออกจากรูขุมขนของสีรถ</li>
  <li><strong>ขัดหยาบและละเอียด (Compound & Polish):</strong> ใช้เครื่องขัด DA ปรับหน้าแลคเกอร์ ขัดลอกรอยด่างขาวของแป้งที่ฝังลึกออกจนหมด พร้อมลบรอยขนแมวที่เกิดจากการโดนลูบแป้งตอนเล่นน้ำ</li>
  <li><strong>เคลือบเงา (Waxing):</strong> ลงแว็กซ์พรีเมียม เพื่อชักเงารถสีดำให้กลับมาฉ่ำลึก และสร้างชั้นฟิล์มปกป้องสีรถ</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/songkran-powder-case2.svg" alt="ขัดสีลอกคราบแป้งฝังลึกด้วยเครื่อง DA ร้านคาร์แคร์ โซนบางนา" class="w-full h-auto object-cover m-0" />
</div>

<p>ผลลัพธ์คือ Accord คันนี้กลับมาดำเงาฉ่ำ ไร้รอยด่างขาวของคราบแป้ง ลูกค้าบอกว่า "นึกว่าต้องสาดสีใหม่ซะแล้ว!" ขับกลับคอนโด <strong>ซอยลาซาล</strong> ด้วยความสบายใจครับ</p>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/songkran-powder-case3.svg" alt="รถกลับมาเงาฉ่ำ ไร้รอยด่าง พร้อมลุยงานหลังหยุดยาว คอนโดซอยลาซาล" class="w-full h-auto object-cover m-0" />
</div>

<h2>รถสีด่าง คราบแป้งฝังแน่น? ให้ PORNPISIT BATTERY ขัดเคลือบสีให้ครับ</h2>
<p>หลังเทศกาลสงกรานต์ ถ้ารถของคุณเจอปัญหา <strong>ขัดคราบแป้งสงกรานต์</strong> ไม่ออก ผิวรถสาก เป็นรอยด่างขาว อย่าเสี่ยงเอาน้ำยาแปลกๆ ไปขัดเองเลยครับ แวะมาให้ทีมงานผู้เชี่ยวชาญที่ <strong>PORNPISIT BATTERY</strong> ดูแลดีกว่า เรามีบริการ <a href="/car-polishing" class="text-orange-600 font-bold hover:underline">ขัดสีรถยนต์ลบรอย</a> และขจัดคราบน้ำฝังลึก (Water Spot Removal) บริการลูกค้าในย่าน <strong>ห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง ลาซาล เทพารักษ์ สมุทรปราการ</strong> รับรองว่ารถของคุณจะกลับมาหล่อ เงาใส พร้อมลุยงานต่อแน่นอน!</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">✨ บริการขัดเคลือบสี ฟื้นฟูหลังเทศกาล</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">คราบแป้งด่างฝังลึก? เราขัดให้กลับมาเงาใส 100%</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">บริการลูบดินน้ำมัน ขัดลอกคราบแป้ง คราบน้ำบาดาล และลบรอยขนแมว พร้อมเคลือบเงาฉ่ำ โซนห้วยขวาง ดินแดง ลาดพร้าว</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรจองคิวขัดสี 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ประเมินสภาพสีรถฟรี</a>
    </div>
    <p style="margin:1.5rem 0 0;"><a href="/car-polishing" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">บริการขัดสีรถถึงบ้าน ศรีนครินทร์ บางนา เทพารักษ์</a></p>
    <p style="margin-top:0.75rem;"><a href="/battery-replacement" style="color:#0891b2;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ บางนา เทพารักษ์ →</a></p>
    <p style="margin-top:0.5rem;"><a href="/contact-us" style="color:#64748b;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:0.9rem;">ดูเบอร์โทรและช่องทางติดต่อช่างทั้งหมด →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) การ ขัดคราบแป้งสงกรานต์</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: โดนสาดแป้งมา ควรรีบล้างภายในกี่วัน?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> <strong>ภายในวันนั้นเลยดีที่สุดครับ!</strong> หรืออย่างช้าที่สุดไม่ควรเกิน 1-2 วัน และห้ามจอดรถตากแดดเด็ดขาด เพราะความร้อนจะทำให้แป้งและคราบน้ำแห้งฝังตัวกินชั้นแลคเกอร์จนสีด่างครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: ใช้น้ำส้มสายชูล้างคราบแป้งดินสอพอง ได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ไม่แนะนำให้ทำเองครับ แม้น้ำส้มสายชู (กรด) จะทำปฏิกิริยากับดินสอพอง (ด่าง) ได้ แต่ถ้าผสมไม่ถูกสัดส่วน หรือล้างออกไม่หมด กรดจะไปทำลายชั้นเคลือบใสของรถ ทำให้สีหมองและด้านอย่างถาวร แนะนำให้ใช้เครื่องขัดสีจะปลอดภัยที่สุดครับ</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: เคลือบแก้วมา โดนแป้งสงกรานต์จะเป็นอะไรไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> รถที่เคลือบแก้วเซรามิกจะล้างคราบแป้งออกได้ง่ายกว่ารถปกติมากครับ เพราะมีชั้นฟิล์มแข็งป้องกันอยู่ แต่ถ้าทิ้งไว้นานๆ คราบหินปูนในน้ำที่สาดก็สามารถฝังตัวบนชั้นเคลือบแก้วได้เช่นกัน จึงควรรีบล้างน้ำเปล่าออกทันทีที่กลับถึงบ้านครับ</p>
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
