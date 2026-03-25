import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public/images/blog');

const DEFS = `  <defs>
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
    <g id="pig-mascot">
      <circle cx="0" cy="0" r="160" fill="url(#glow-orange)" opacity="0.6"/>
      <ellipse cx="0" cy="150" rx="130" ry="35" fill="#0B0F19" filter="url(#shadow)"/>
      <ellipse cx="0" cy="140" rx="120" ry="30" fill="url(#glass-grad)" stroke="rgba(255,107,0,0.3)" stroke-width="2"/>
      <path d="M-65,140 C-75,50 -45,10 0,10 C45,10 75,50 65,140 Z" fill="url(#cap-grad)" filter="url(#shadow-sm)"/>
      <path d="M-40,60 L40,60 L50,140 L-50,140 Z" fill="#1E293B"/>
      <g transform="translate(-75, 75) rotate(-30)">
        <rect x="-8" y="-40" width="16" height="90" rx="4" fill="url(#silver)" filter="url(#shadow-sm)"/>
        <circle cx="0" cy="-45" r="18" fill="url(#silver)"/>
        <circle cx="0" cy="-45" r="8" fill="#1E293B"/>
        <circle cx="0" cy="0" r="18" fill="url(#pig-skin)"/>
      </g>
      <rect x="-60" y="-55" width="120" height="100" rx="45" fill="url(#pig-skin)" filter="url(#shadow-sm)"/>
      <path d="M-45,-30 Q-65,-80 -20,-50 Z" fill="url(#pig-skin)"/>
      <path d="M45,-30 Q65,-80 20,-50 Z" fill="url(#pig-skin)"/>
      <ellipse cx="0" cy="-5" rx="28" ry="18" fill="url(#pig-snout)" filter="url(#shadow-sm)"/>
      <ellipse cx="-10" cy="-5" rx="4" ry="7" fill="#A8325D"/>
      <ellipse cx="10" cy="-5" rx="4" ry="7" fill="#A8325D"/>
      <path d="M-8,8 Q0,15 8,8" fill="none" stroke="#A8325D" stroke-width="2" stroke-linecap="round"/>
      <circle cx="-25" cy="-22" r="7" fill="#0B0F19"/>
      <circle cx="-23" cy="-24" r="2.5" fill="#FFFFFF"/>
      <circle cx="25" cy="-22" r="7" fill="#0B0F19"/>
      <circle cx="27" cy="-24" r="2.5" fill="#FFFFFF"/>
      <path d="M-65,-45 Q0,-85 65,-45 L70,-25 L-70,-25 Z" fill="url(#cap-grad)" filter="url(#shadow-sm)"/>
      <rect x="-75" y="-25" width="150" height="14" rx="7" fill="#FF3E00"/>
      <circle cx="0" cy="-48" r="14" fill="#FFFFFF" filter="url(#shadow-sm)"/>
      <path d="M-6,-48 L6,-48 L0,-56 Z M-6,-45 L6,-45 L0,-37 Z" fill="#FF6B00"/>
      <g transform="translate(70, 70) rotate(15)">
        <rect x="-25" y="-30" width="50" height="60" rx="6" fill="#1E293B" stroke="#00F2FE" stroke-width="2" filter="url(#shadow-sm)"/>
        <rect x="-18" y="-36" width="10" height="6" fill="#FF3E00"/>
        <rect x="8" y="-36" width="10" height="6" fill="#94A3B8"/>
        <path d="M2,-15 L-8,5 L-2,5 L-2,15 L8,-5 L2,-5 Z" fill="#00F2FE"/>
        <circle cx="0" cy="0" r="18" fill="url(#pig-skin)"/>
      </g>
    </g>
  </defs>
  <style>@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;800&amp;display=swap');text{font-family:'Prompt',sans-serif;}</style>`;

function buildCover(data: any) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
${DEFS}
  <rect width="1200" height="630" fill="url(#bg-grad)"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.5"/>
  <circle cx="1200" cy="0" r="600" fill="url(#glow-orange)"/>
  <circle cx="0" cy="630" r="500" fill="url(#glow-blue)"/>
  <path d="M 0 500 Q 300 450 600 550 T 1200 500 L 1200 630 L 0 630 Z" fill="url(#glass-grad)"/>
  <path d="M 0 550 Q 400 500 800 600 T 1200 550 L 1200 630 L 0 630 Z" fill="#FF6B00" opacity="0.1"/>
  <g transform="translate(80, 200)">
    <rect x="0" y="-80" width="300" height="40" rx="20" fill="url(#glass-grad)" stroke="#FF6B00" stroke-width="1.5"/>
    <text x="150" y="-55" font-size="15" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">\${data.badge}</text>
    <text x="0" y="20" font-size="60" font-weight="800" fill="url(#text-grad)">\${data.title[0]}</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">\${data.title[1] || ''}</text>
    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">\${data.subtitle}</text>
  </g>
  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>
  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">FIRSTCARCENTER</text>
</svg>`;
}

function buildInfographic(data: any) {
  const cardWidth = 320;
  const gap = 20;
  const totalWidth = data.items.length * cardWidth + (data.items.length - 1) * gap;
  const startX = Math.round((1200 - totalWidth) / 2);

  const cards = data.items.map((item: any, i: number) => {
    const x = startX + i * (cardWidth + gap);
    const lines = item.desc as string[];
    return `  <g transform="translate(${x}, 220)">
    <rect x="0" y="0" width="${cardWidth}" height="460" rx="24" fill="url(#glass-grad)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <rect x="0" y="0" width="${cardWidth}" height="6" rx="3" fill="url(#primary-grad)"/>
    <circle cx="50" cy="55" r="28" fill="#1E293B" stroke="#FF6B00" stroke-width="2"/>
    <text x="50" y="64" font-size="26" font-weight="800" fill="#FF6B00" text-anchor="middle">${item.num}</text>
    <text x="30" y="130" font-size="26" font-weight="800" fill="#FFFFFF">${item.title}</text>
    <rect x="30" y="150" width="40" height="4" rx="2" fill="#00F2FE" opacity="0.8"/>
${lines.map((line: string, li: number) => `    <text x="30" y="${200 + li * 36}" font-size="21" font-weight="400" fill="#CBD5E1">${line}</text>`).join('\n')}
  </g>`;
  }).join('\n');

  return `<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
${DEFS}
  <rect width="1200" height="800" fill="url(#bg-grad)"/>
  <rect width="1200" height="800" fill="url(#grid)" opacity="0.4"/>
  <circle cx="600" cy="0" r="500" fill="url(#glow-orange)" opacity="0.8"/>
  <circle cx="0" cy="800" r="600" fill="url(#glow-blue)" opacity="0.6"/>
  <g transform="translate(600, 100)" text-anchor="middle">
    <rect x="-120" y="-50" width="240" height="36" rx="18" fill="url(#glass-grad)" stroke="#FF6B00" stroke-width="1.5"/>
    <text x="0" y="-26" font-size="15" font-weight="800" fill="#FF6B00" letter-spacing="2">FIRSTCARCENTER</text>
    <text x="0" y="30" font-size="48" font-weight="800" fill="#FFFFFF">${data.title}</text>
  </g>
${cards}
  <rect x="500" y="740" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="600" y="762" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">FIRSTCARCENTER</text>
</svg>`;
}

const coverData = {
  file: "pig-car-polishing-before-sale-cover.svg",
  badge: "CAR DETAILING",
  title: ["ขัดสีรถก่อนขาย", "อัปราคาได้หลักหมื่น!"],
  subtitle: "รีวิวผลงานลบรอยขนแมว ขจัดคราบฝังลึก โซนศรีนครินทร์"
};

const infoData = {
  file: "pig-car-polishing-before-sale-info.svg",
  title: "3 เทคนิคขัดสีรถก่อนขายให้ได้ราคาดี",
  items: [
    { num: "01", title: "ลูบดินน้ำมันขจัดคราบ", desc: ["ทำความสะอาดลึกระดับรูขุมขนสี", "ดึงคราบยางมะตอย ละอองสี", "ฝุ่นเหล็กที่ล้างธรรมดาไม่ออก", "ช่วยให้สีรถลื่นและสว่างขึ้น"] },
    { num: "02", title: "ขัดปรับสภาพ 3 ขั้นตอน", desc: ["ขัดหยาบลบรอยขนแมวลึก", "ขัดละเอียดเก็บรอยเครื่องขัด", "ขัดชักเงาให้สีรถฉ่ำวาว", "ฟื้นฟูมิติสีดำให้กลับมาเงางาม"] },
    { num: "03", title: "เคลือบเงาปกป้องสี", desc: ["ลงแว็กซ์พรีเมียมเคลือบผิวรถ", "ป้องกันคราบน้ำและฝุ่นเกาะ", "ดูโดดเด่นสะท้อนแสงแดด", "เตะตาคนซื้อแน่นอน 100%"] }
  ]
};

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, coverData.file), buildCover(coverData));
console.log(`✓ Generated ${coverData.file}`);

fs.writeFileSync(path.join(outDir, infoData.file), buildInfographic(infoData));
console.log(`✓ Generated ${infoData.file}`);
