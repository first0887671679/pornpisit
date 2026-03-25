import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public/images/blog');

// Exact defs block copied from the working pig-symptoms-of-dead-car-battery-cover.svg
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
    <rect x="0" y="-80" width="260" height="40" rx="20" fill="url(#glass-grad)" stroke="#FF6B00" stroke-width="1.5"/>
    <text x="130" y="-55" font-size="15" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">${data.badge}</text>
    <text x="0" y="20" font-size="60" font-weight="800" fill="url(#text-grad)">${data.title[0]}</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">${data.title[1] || ''}</text>
    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">${data.subtitle}</text>
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

const covers = [
  {
    file: "pig-alternator-burnt-cover.svg",
    badge: "ALTERNATOR CARE",
    title: ["ไดชาร์จไหม้!", "อาการแบบไหนที่ต้องระวัง?"],
    subtitle: "สังเกตก่อนสตาร์ทไม่ติด สรุปครบจบในที่เดียว"
  },
  {
    file: "pig-alternator-repair-price-cover.svg",
    badge: "REPAIR GUIDE",
    title: ["ซ่อมไดชาร์จ", "ราคาเท่าไหร่? อัปเดต 2026"],
    subtitle: "เทียบราคาซ่อม vs เปลี่ยนใหม่ แบบไหนคุ้มกว่า?"
  },
  {
    file: "pig-hybrid-battery-dead-cover.svg",
    badge: "HYBRID CARE",
    title: ["รถไฮบริดแบตหมด", "จั๊มแบตได้ไหม? ทำยังไง?"],
    subtitle: "ข้อควรระวังและวิธีพ่วงแบตเตอรี่รถไฮบริดที่ถูกต้อง"
  },
  {
    file: "pig-pickup-battery-cover.svg",
    badge: "BUYER'S GUIDE",
    title: ["แบตเตอรี่รถกระบะ", "เลือกกี่แอมป์ ยี่ห้อไหนดี?"],
    subtitle: "รีวิวแบตเตอรี่รถกระบะ สายลุยทนทาน อัปเดต 2026"
  },
  {
    file: "pig-runflat-tire-repair-cover.svg",
    badge: "TIRE KNOWLEDGE",
    title: ["ยางรันแฟลตแตก", "ปะได้ไหม? ซ่อมยังไง?"],
    subtitle: "ข้อควรรู้เมื่อยางรันแฟลตรั่ว พร้อมวิธีรับมือ"
  },
  {
    file: "pig-starter-brush-cover.svg",
    badge: "CAR REPAIR",
    title: ["แปรงถ่านไดสตาร์ทหมด", "อาการเป็นอย่างไร?"],
    subtitle: "สตาร์ทเงียบ บิดกุญแจแล้วดังแชะๆ ซ่อมได้ไหม?"
  },
  {
    file: "pig-woman-flat-tire-cover.svg",
    badge: "EMERGENCY GUIDE",
    title: ["ผู้หญิงรถยางแตก", "ทำอย่างไร? 4 วิธีเอาตัวรอด"],
    subtitle: "รับมือเหตุฉุกเฉิน ยางแตกกลางคืน อย่างปลอดภัย"
  }
];

const infographics = [
  {
    file: "pig-alternator-burnt-info.svg",
    title: "3 สัญญาณเตือนไดชาร์จไหม้",
    items: [
      { num: "01", title: "ไฟรูปแบตเตอรี่โชว์", desc: ["ไฟรูปแบตเตอรี่สีแดงสว่างขึ้น", "อาจกะพริบหรือโชว์ค้าง", "เตือนว่าไดชาร์จไม่ทำงาน"] },
      { num: "02", title: "มีกลิ่นเหม็นไหม้", desc: ["ได้กลิ่นเหม็นไหม้จากห้องเครื่อง", "เกิดจากความร้อนสูงสะสม", "ขดลวดภายในไดชาร์จละลาย"] },
      { num: "03", title: "เครื่องยนต์ดับกลางอากาศ", desc: ["ระบบไฟฟ้าทั้งหมดหยุดทำงาน", "รถกระตุกและดับขณะขับขี่", "สตาร์ทใหม่ไม่ติดเพราะแบตหมด"] }
    ]
  },
  {
    file: "pig-alternator-repair-price-info.svg",
    title: "ทางเลือกเมื่อไดชาร์จเสีย ซ่อมหรือเปลี่ยน?",
    items: [
      { num: "01", title: "ซ่อมเฉพาะจุด", desc: ["ราคาประมาณ 800 - 1,500 บาท", "เปลี่ยนถ่านไดชาร์จหรือคัทเอาท์", "เหมาะกับอาการเสียเบื้องต้น"] },
      { num: "02", title: "เปลี่ยนไดชาร์จบิ้ว (รีบิ้ว)", desc: ["ราคาประมาณ 2,500 - 4,000 บาท", "รับประกันการใช้งาน 3-6 เดือน", "คุ้มค่าและใช้งานได้ยาวนาน"] },
      { num: "03", title: "เปลี่ยนไดชาร์จแท้เบิกศูนย์", desc: ["ราคาประมาณ 6,000 - 15,000+ บาท", "คุณภาพสูงสุดทนทานแน่นอน", "เหมาะกับผู้ที่ต้องการความมั่นใจเต็มร้อย"] }
    ]
  },
  {
    file: "pig-hybrid-battery-dead-info.svg",
    title: "ข้อควรระวังเมื่อพ่วงแบตรถไฮบริด",
    items: [
      { num: "01", title: "ห้ามจั๊มที่แบตเตอรี่ลูกใหญ่", desc: ["ห้ามพ่วงที่แบตเตอรี่ไฮบริดเด็ดขาด", "อาจทำให้ระบบไฟฟ้ารวน", "เสี่ยงเกิดความเสียหายรุนแรง"] },
      { num: "02", title: "จั๊มที่แบตเตอรี่ 12V เท่านั้น", desc: ["ค้นหาจุดพ่วงหรือแบต 12V", "มักอยู่ท้ายรถหรือจุดที่คู่มือระบุ", "หนีบขั้วบวกและขั้วลบให้ถูกต้อง"] },
      { num: "03", title: "ใช้สายพ่วงที่ได้มาตรฐาน", desc: ["ใช้สายพ่วงที่มีคุณภาพดี", "กระแสไฟเดินเรียบสม่ำเสมอ", "หากไม่มั่นใจควรเรียกช่างผู้เชี่ยวชาญ"] }
    ]
  },
  {
    file: "pig-pickup-battery-info.svg",
    title: "วิธีเลือกแบตเตอรี่สำหรับรถกระบะ",
    items: [
      { num: "01", title: "เลือกขนาดแอมป์ที่เหมาะสม", desc: ["กระบะทั่วไปใช้ 70-90 แอมป์", "เครื่อง 2.5 - 3.0 ลิตร", "แอมป์สูงช่วยจ่ายไฟได้นิ่งกว่า"] },
      { num: "02", title: "ประเภทของแบตเตอรี่", desc: ["แนะนำแบตเตอรี่กึ่งแห้ง (MF)", "ทนทานต่อการสั่นสะเทือน", "ดูแลง่าย ไม่ต้องเติมน้ำกลั่นบ่อย"] },
      { num: "03", title: "ค่า CCA ต้องสูงพอ", desc: ["CCA คือกำลังสตาร์ท", "ควรเลือกที่ CCA 600 ขึ้นไป", "สตาร์ทติดง่ายแม้เครื่องเย็น"] }
    ]
  },
  {
    file: "pig-runflat-tire-repair-info.svg",
    title: "เงื่อนไขการปะยางรันแฟลต (Runflat)",
    items: [
      { num: "01", title: "รอยรั่วต้องอยู่หน้ายาง", desc: ["ปะได้ถ้ารอยรั่วอยู่บนหน้ายาง", "ห้ามปะถ้ารอยรั่วอยู่ที่แก้มยาง", "แผลต้องมีขนาดไม่เกิน 6 มม."] },
      { num: "02", title: "โครงสร้างยางต้องไม่ช้ำ", desc: ["วิ่งบดมาไม่ไกลเกินไป", "ถ้าวิ่งจนโครงสร้างยางไหม้", "ยางบวมหรือเสียรูป จะปะไม่ได้"] },
      { num: "03", title: "แนะนำการปะแบบสตรีมเย็น", desc: ["การปะแบบสตรีมหรือสตรีมเย็น", "ปลอดภัยต่อโครงสร้างยาง", "ห้ามแทงไหมเพราะอาจทำลายโครงสร้าง"] }
    ]
  },
  {
    file: "pig-starter-brush-info.svg",
    title: "อาการแปรงถ่านไดสตาร์ทหมด",
    items: [
      { num: "01", title: "บิดกุญแจแล้วเงียบสนิท", desc: ["ไฟหน้าปัดติดครบทุกดวง", "แต่สตาร์ทแล้วไม่มีเสียงเครื่องยนต์", "มีแค่เสียงแชะเบาๆ"] },
      { num: "02", title: "ต้องเคาะไดสตาร์ทถึงติด", desc: ["ใช้เหล็กเคาะเบาๆ ที่ไดสตาร์ท", "แล้วบิดกุญแจสตาร์ทติด", "สัญญาณชัดเจนว่าแปรงถ่านใกล้หมด"] },
      { num: "03", title: "สตาร์ทติดยากตอนเครื่องร้อน", desc: ["จอดพักแป๊บเดียวสตาร์ทไม่ติด", "มอเตอร์หมุนช้ากว่าปกติ", "ควรนำรถเข้าตรวจเช็กและเปลี่ยนแปรงถ่าน"] }
    ]
  },
  {
    file: "pig-woman-flat-tire-info.svg",
    title: "4 ขั้นตอนรับมือรถยางแตกสำหรับผู้หญิง",
    items: [
      { num: "01", title: "ตั้งสติและประคองรถเข้าข้างทาง", desc: ["เปิดไฟฉุกเฉินทันที", "จับพวงมาลัยให้แน่น", "ค่อยๆ แตะเบรก จอดในที่สว่าง"] },
      { num: "02", title: "โทรขอความช่วยเหลือ", desc: ["อยู่ในรถและล็อคประตู", "โทรเรียกช่างเปลี่ยนยางนอกสถานที่", "หรือโทร 1193 ตำรวจทางหลวง"] },
      { num: "03", title: "เตรียมอุปกรณ์หากต้องการเปลี่ยนเอง", desc: ["แม่แรง ประแจขันล้อ ยางอะไหล่", "คลายน็อตก่อนขึ้นแม่แรง", "ขึ้นแม่แรงตรงจุดที่แข็งแรง"] }
    ]
  }
];

async function main() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const cover of covers) {
    const svg = buildCover(cover);
    if (svg.includes('${data.') || svg.includes('${item.')) {
      console.error(`❌ ERROR: Template literal leak detected in ${cover.file}! Aborting.`);
      process.exit(1);
    }
    fs.writeFileSync(path.join(outDir, cover.file), svg);
    console.log(`✓ Generated ${cover.file}`);
  }

  for (const info of infographics) {
    const svg = buildInfographic(info);
    if (svg.includes('${data.') || svg.includes('${item.')) {
      console.error(`❌ ERROR: Template literal leak detected in ${info.file}! Aborting.`);
      process.exit(1);
    }
    fs.writeFileSync(path.join(outDir, info.file), svg);
    console.log(`✓ Generated ${info.file}`);
  }
}

main().catch(console.error);
