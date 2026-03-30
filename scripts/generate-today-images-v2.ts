import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public/images/blog');

const covers = [
  {
    file: "pig-car-polishing-cost-cover.svg",
    badge: "CAR CARE",
    title: ["ขัดสีรถราคา เท่าไหร่?", "เช็กเรทราคา 2026"],
    subtitle: "ขัดลบรอยแบบไหนคุ้มสุด? ช่างมีคำตอบ"
  },
  {
    file: "pig-bird-poop-cover.svg",
    badge: "PAINT PROTECTION",
    title: ["รอยขี้นกกัดสีรถ", "ล้างไม่ออก ทำไงดี?"],
    subtitle: "วิธีลบรอยขี้นกฝังลึก ให้กลับมาเงางาม"
  },
  {
    file: "pig-toothpaste-headlight-cover.svg",
    badge: "HEADLIGHT CARE",
    title: ["ยาสีฟันขัดไฟหน้า", "หายเหลืองจริงไหม?"],
    subtitle: "ฟังความจริงจากช่าง! พร้อมวิธีที่ถูกต้อง"
  },
  {
    file: "pig-nail-in-tire-cover.svg",
    badge: "TIRE EMERGENCY",
    title: ["ขับรถเหยียบตะปู", "ต้องดึงออกไหม?"],
    subtitle: "วิธีรับมือฉุกเฉิน และการปะยางที่ถูกต้อง"
  },
  {
    file: "pig-sidewall-tear-cover.svg",
    badge: "TIRE WARNING",
    title: ["แก้มยางฉีก ปะได้ไหม?", "เช็กด่วน!"],
    subtitle: "แผลแบบไหนปะได้ แผลไหนเสี่ยงระเบิด"
  },
  {
    file: "pig-bulging-tire-cover.svg",
    badge: "TIRE SAFETY",
    title: ["ยางบวม ปูดนูน", "วิ่งต่อเสี่ยงระเบิด!"],
    subtitle: "อาการยางบวมเกิดจากอะไร? รับมืออย่างไร"
  },
  {
    file: "pig-check-alternator-cover.svg",
    badge: "DIY CHECKUP",
    title: ["วิธีเช็คไดชาร์จ", "แบตเสื่อมหรือไดพัง?"],
    subtitle: "3 วิธีเช็กง่ายๆ ด้วยตัวเอง (อัปเดต 2026)"
  },
  {
    file: "pig-starter-sound-cover.svg",
    badge: "CAR SOUNDS",
    title: ["เสียงไดสตาร์ท", "4 เสียงเตือนก่อนรถดับ"],
    subtitle: "บิดกุญแจดังแชะ หรือ แกร๊กๆ แบบไหนพัง?"
  },
  {
    file: "pig-alternator-cost-cover.svg",
    badge: "REPAIR COST",
    title: ["ซ่อมไดชาร์จราคา", "ซ่อมหรือเปลี่ยนดี?"],
    subtitle: "เทียบราคาซ่อม vs เปลี่ยนมือสอง vs เบิกศูนย์"
  },
  {
    file: "pig-battery-lifespan-cover.svg",
    badge: "BATTERY CARE",
    title: ["อายุแบตเตอรี่รถยนต์", "ใช้ได้กี่ปี?"],
    subtitle: "สัญญาณเตือนแบตเสื่อมที่ต้องรู้ก่อนกินข้าวลิง"
  },
  {
    file: "pig-best-battery-brands-cover.svg",
    badge: "BUYER'S GUIDE",
    title: ["แบตเตอรี่ยี่ห้อไหนดี", "อัปเดต 2026"],
    subtitle: "รีวิว 5 แบรนด์ยอดฮิต ทนทาน คุ้มราคา"
  },
  {
    file: "pig-parked-car-care-cover.svg",
    badge: "CAR MAINTENANCE",
    title: ["จอดรถทิ้งไว้นาน", "สตาร์ทไม่ติด ทำไงดี?"],
    subtitle: "5 วิธีดูแลรถจอดนาน ป้องกันแบตเสื่อม"
  }
];

const infographics = [
  {
    file: "pig-car-polishing-cost-info.svg",
    title: "เรทราคาขัดสีรถ 3 ระดับ",
    items: [
      { num: "01", title: "ขัดเคลือบเงา (Wax)", desc: ["ราคาประมาณ 500 - 1,500 บาท", "เหมาะกับรถใหม่ รอยน้อย", "ดึงความเงางามกลับคืนมา"] },
      { num: "02", title: "ขัดลบรอยเฉพาะจุด", desc: ["ราคาชิ้นละ 300 - 800 บาท", "เหมาะกับรอยเฉี่ยวชนเบาๆ", "ขัดกระดาษทรายลบรอย"] },
      { num: "03", title: "ขัดฟื้นฟูเต็มระบบ", desc: ["ราคา 2,500 - 5,000+ บาท", "ลบรอยขนแมวเต็มคัน", "ขัดลอกแลคเกอร์เสื่อมสภาพ"] }
    ]
  },
  {
    file: "pig-bird-poop-info.svg",
    title: "วิธีลบรอยขี้นกให้ถูกวิธี",
    items: [
      { num: "01", title: "เมื่อเพิ่งโดนสดๆ", desc: ["ใช้ทิชชู่เปียกซับออกเบาๆ", "ห้ามถูแรงเด็ดขาด", "ระวังเศษทรายขูดสีรถ"] },
      { num: "02", title: "เมื่อแห้งเกรอะกรัง", desc: ["โปะกระดาษชำระชุบน้ำ", "ทิ้งไว้ 5-10 นาทีให้อ่อนตัว", "เช็ดออกในทิศทางเดียว"] },
      { num: "03", title: "เมื่อสีด่างฝังลึก", desc: ["กรดกัดทะลุชั้นแลคเกอร์แล้ว", "ต้องขัดสีรถเต็มระบบ", "หากลึกมากอาจต้องทำสีใหม่"] }
    ]
  },
  {
    file: "pig-toothpaste-headlight-info.svg",
    title: "ความจริงเรื่องยาสีฟันขัดไฟหน้า",
    items: [
      { num: "01", title: "ทำไมถึงใสขึ้น?", desc: ["ยาสีฟันมีสารขัดถูอ่อนๆ", "ช่วยขัดคราบออกซิเดชัน", "ผิวพลาสติกที่เหลืองหลุดออก"] },
      { num: "02", title: "ทำไมอยู่ได้ไม่นาน?", desc: ["สารเคลือบ UV ถูกขัดออก", "ตากแดดแป๊บเดียวเหลืองอีก", "บางทีเหลืองหนักกว่าเดิม"] },
      { num: "03", title: "วิธีที่ถูกต้องและทนทาน", desc: ["ขัดกระดาษทรายไล่เบอร์", "พ่นเคลือบแก้วไฟหน้า", "ใสปิ๊งอยู่ได้นาน 1-2 ปี"] }
    ]
  },
  {
    file: "pig-nail-in-tire-info.svg",
    title: "วิธีรับมือเมื่อขับรถเหยียบตะปู",
    items: [
      { num: "01", title: "ห้ามดึงตะปูออก!", desc: ["ตะปูทำหน้าที่อุดรูรั่วไว้", "ดึงออกลมจะพุ่งออกทันที", "ยางจะแบนติดพื้นขับไม่ได้"] },
      { num: "02", title: "เช็กลมยางและขับช้าๆ", desc: ["ถ้ายางยังไม่แบนขับต่อได้", "ใช้ความเร็วไม่เกิน 50 กม./ชม.", "รีบหาร้านปะยางใกล้ที่สุด"] },
      { num: "03", title: "เลือกวิธีปะยาง", desc: ["ปะแทงไหม เร็ว ไม่ถอดล้อ", "ปะสตรีม ทนทานกว่าชัวร์ๆ", "ห้ามปะถ้าแผลอยู่ตรงแก้มยาง"] }
    ]
  },
  {
    file: "pig-sidewall-tear-info.svg",
    title: "แก้มยางฉีกแบบไหนรอด แบบไหนร่วง",
    items: [
      { num: "01", title: "เนื้อยางถลอกตื้นๆ", desc: ["เบียดฟุตบาทแค่ขูดผิวหน้า", "ไม่เห็นผ้าใบหรือเส้นลวด", "อนุโลมให้ขับใช้งานต่อได้"] },
      { num: "02", title: "แผลลึกเห็นผ้าใบ", desc: ["เห็นเส้นด้ายขาวหรือเส้นลวด", "ห้ามปะเด็ดขาด อันตราย!", "ต้องเปลี่ยนยางใหม่เท่านั้น"] },
      { num: "03", title: "วิธีแก้ปัญหาฉุกเฉิน", desc: ["ห้ามบดขับต่อ ล้อแม็กซ์จะดุ้ง", "ถอดล้อเปลี่ยนยางอะไหล่", "หรือเรียกช่างฉุกเฉินมาเปลี่ยน"] }
    ]
  },
  {
    file: "pig-bulging-tire-info.svg",
    title: "อันตรายจากยางบวม ปูดนูน",
    items: [
      { num: "01", title: "สาเหตุของยางบวม", desc: ["ขับรถตกหลุมแรง กระแทกแรง", "โครงสร้างผ้าใบด้านในขาด", "แรงดันลมดันเนื้อยางจนปูด"] },
      { num: "02", title: "ห้ามขับต่อ เสี่ยงระเบิด", desc: ["จุดที่บวมคือจุดที่บางที่สุด", "เสียดสีนิดเดียวระเบิดตูมทันที", "ห้ามเติมลมเพิ่มเด็ดขาด!"] },
      { num: "03", title: "ยางบวมเคลมประกันได้?", desc: ["หากเกิดจากอุบัติเหตุเคลมได้", "ประกันจ่าย 50% ของราคายาง", "ยางบวมซ่อมไม่ได้ ต้องเปลี่ยน"] }
    ]
  },
  {
    file: "pig-check-alternator-info.svg",
    title: "3 วิธีเช็กไดชาร์จง่ายๆ",
    items: [
      { num: "01", title: "สังเกตจากไฟหน้า", desc: ["สตาร์ทรถแล้วเร่งเครื่อง", "ไดชาร์จดี: ไฟหน้าสว่างขึ้น", "ไดชาร์จเสีย: ไฟหน้าหรี่ลง"] },
      { num: "02", title: "ใช้มัลติมิเตอร์วัดไฟ", desc: ["สตาร์ทรถ วัดขั้วแบตเตอรี่", "ไดชาร์จดี: 13.5 - 14.5 V", "ไดชาร์จเสีย: ต่ำกว่า 12 V"] },
      { num: "03", title: "ไฟรูปแบตเตอรี่โชว์", desc: ["สัญญาณเตือนไดชาร์จไม่ปั่นไฟ", "รถจะดึงไฟจากแบตมาใช้", "รีบจอดหาร้านซ่อมก่อนรถดับ"] }
    ]
  },
  {
    file: "pig-starter-sound-info.svg",
    title: "4 เสียงเตือนจากไดสตาร์ท",
    items: [
      { num: "01", title: "เสียง แกร๊กๆๆ รัวๆ", desc: ["มักเกิดจากไฟแบตเตอรี่อ่อน", "ไฟส่งไปโซลินอยด์ไม่พอ", "แก้โดยการพ่วงหรือเปลี่ยนแบต"] },
      { num: "02", title: "เสียง แชะ! ทีเดียว", desc: ["ไดสตาร์ทเสีย แปลงถ่านหมด", "ไฟหน้าปัดยังสว่างปกติ", "ต้องเคาะไดสตาร์ทหรือเปลี่ยนใหม่"] },
      { num: "03", title: "เสียง หอน วี้ดดด ลากยาว", desc: ["เฟืองไดสตาร์ทค้างไม่หดกลับ", "มอเตอร์จะไหม้และพังทั้งลูก", "ต้องรีบซ่อมแซมโดยด่วน"] }
    ]
  },
  {
    file: "pig-alternator-cost-info.svg",
    title: "เรทราคาซ่อม-เปลี่ยนไดชาร์จ",
    items: [
      { num: "01", title: "ซ่อมอะไหล่เฉพาะจุด", desc: ["ราคาประมาณ 500 - 1,500 บ.", "เปลี่ยนคัทเอาท์หรือแปลงถ่าน", "ประหยัดแต่ต้องซ่อมกับช่างเก่งๆ"] },
      { num: "02", title: "เปลี่ยนไดชาร์จมือสอง", desc: ["ราคาประมาณ 2,500 - 4,000 บ.", "ได้ของแท้เชียงกง ใช้งานได้ดี", "คุ้มค่า นิยมทำมากที่สุด"] },
      { num: "03", title: "เบิกไดชาร์จใหม่แกะกล่อง", desc: ["ราคาประมาณ 6,000 - 12,000 บ.", "อายุการใช้งานยาวนาน", "ได้ประกันศูนย์ สบายใจ 100%"] }
    ]
  },
  {
    file: "pig-battery-lifespan-info.svg",
    title: "สัญญาณเตือนแบตเตอรี่เสื่อมสภาพ",
    items: [
      { num: "01", title: "สตาร์ทอืดติดยากตอนเช้า", desc: ["อาการแรกเริ่มของแบตเสื่อม", "เก็บประจุไฟไม่อยู่แล้ว", "ค่า CCA เริ่มตกลง"] },
      { num: "02", title: "ระบบไฟฟ้าในรถทำงานรวน", desc: ["แอร์เย็นน้อยลง ไฟหน้าหรี่", "กระจกไฟฟ้าขึ้นลงช้า", "วิทยุดับเมื่อรอบเครื่องตก"] },
      { num: "03", title: "แบตเตอรี่บวม หรือมีคราบขี้เกลือ", desc: ["ขั้วแบตมีคราบขี้เกลือสีขาว", "กล่องแบตเตอรี่ปูดบวม", "เสี่ยงต่อแบตระเบิด ควรรีบเปลี่ยน"] }
    ]
  },
  {
    file: "pig-best-battery-brands-info.svg",
    title: "3 แบรนด์แบตเตอรี่ยอดฮิต 2026",
    items: [
      { num: "01", title: "GS Battery", desc: ["แบรนด์ยอดนิยมอันดับ 1", "ทนทาน เหมาะกับอากาศร้อน", "หาซื้อง่าย เคลมง่าย"] },
      { num: "02", title: "FB Battery", desc: ["จ่ายไฟแรง สตาร์ทติดง่าย", "ทนทานต่อการใช้งานหนัก", "อายุการใช้งานยาวนาน"] },
      { num: "03", title: "Amaron / Varta", desc: ["แบตนำเข้า ทนทานขั้นสุด", "แผ่นธาตุเงิน (Silver)", "รับประกันนาน 15-24 เดือน"] }
    ]
  },
  {
    file: "pig-parked-car-care-info.svg",
    title: "วิธีดูแลรถจอดทิ้งไว้นานๆ",
    items: [
      { num: "01", title: "สตาร์ทรถวอร์มเครื่องบ่อยๆ", desc: ["สตาร์ททิ้งไว้ 15-20 นาที", "ทำสัปดาห์ละ 1-2 ครั้ง", "ให้ไดชาร์จปั่นไฟเข้าแบต"] },
      { num: "02", title: "เติมลมยางเผื่อไว้", desc: ["เติมลมแข็งกว่าปกติ 5-10 PSI", "ป้องกันยางแบนเสียทรง", "ช่วยรักษารูปทรงของแก้มยาง"] },
      { num: "03", title: "ถอดขั้วลบแบตเตอรี่", desc: ["หากจอดนานเกิน 1 เดือน", "กันไฟรั่วจากระบบกันขโมย", "ถอดเฉพาะขั้วลบ (-) ก็พอ"] }
    ]
  }
];

const getSVGDefs = () => `
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050914" />
      <stop offset="100%" stop-color="#12182B" />
    </linearGradient>
    <radialGradient id="glow-orange" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF6B00" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#FF6B00" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow-blue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#00F2FE" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF6B00" />
      <stop offset="100%" stop-color="#FF3E00" />
    </linearGradient>
    <linearGradient id="text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.02)" />
    </linearGradient>
    <linearGradient id="pig-skin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE4E1" />
      <stop offset="100%" stop-color="#FFB6C1" />
    </linearGradient>
    <linearGradient id="pig-snout" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF9EBB" />
      <stop offset="100%" stop-color="#E67396" />
    </linearGradient>
    <linearGradient id="cap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF8C00" />
      <stop offset="100%" stop-color="#D32F2F" />
    </linearGradient>
    <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#94A3B8" />
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
      <!-- Left hand -->
      <circle cx="-65" cy="15" r="14" fill="url(#pig-skin)" filter="url(#shadow-sm)"/>
      <path d="M-65,15 L-55,5" stroke="#E67396" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Body/Overalls -->
      <path d="M-55,20 Q0,80 55,20 L65,100 L-65,100 Z" fill="#1E293B" filter="url(#shadow)"/>
      <path d="M-40,20 L-40,100 M40,20 L40,100" stroke="#0F172A" stroke-width="4"/>
      <!-- Straps -->
      <rect x="-45" y="10" width="12" height="40" rx="4" fill="#FF6B00" transform="rotate(-15 -45 10)"/>
      <rect x="33" y="10" width="12" height="40" rx="4" fill="#FF6B00" transform="rotate(15 33 10)"/>
      <!-- Buttons -->
      <circle cx="-35" cy="45" r="5" fill="#E2E8F0"/>
      <circle cx="35" cy="45" r="5" fill="#E2E8F0"/>
      <!-- Pocket -->
      <path d="M-25,50 L25,50 L20,80 L-20,80 Z" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      <!-- Wrench in pocket -->
      <g transform="translate(-5, 40) rotate(15)">
        <rect x="0" y="0" width="10" height="30" rx="3" fill="url(#silver)"/>
        <circle cx="5" cy="0" r="8" fill="url(#silver)"/>
        <circle cx="5" cy="0" r="4" fill="#0F172A"/>
      </g>

      <!-- Pig Head -->
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
      <!-- Logo on cap -->
      <circle cx="0" cy="-48" r="14" fill="#FFFFFF" filter="url(#shadow-sm)"/>
      <path d="M-6,-48 L6,-48 L0,-56 Z M-6,-45 L6,-45 L0,-37 Z" fill="#FF6B00"/>
      
      <!-- Right hand holding battery -->
      <g transform="translate(70, 70) rotate(15)">
        <rect x="-25" y="-30" width="50" height="60" rx="6" fill="#1E293B" stroke="#00F2FE" stroke-width="2" filter="url(#shadow-sm)"/>
        <rect x="-18" y="-36" width="10" height="6" fill="#FF3E00"/>
        <rect x="8" y="-36" width="10" height="6" fill="#94A3B8"/>
        <!-- lightning bolt -->
        <path d="M2,-15 L-8,5 L-2,5 L-2,15 L8,-5 L2,-5 Z" fill="#00F2FE"/>
        <circle cx="0" cy="0" r="18" fill="url(#pig-skin)"/>
      </g>
    </g>
  </defs>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;800&display=swap');
    text { font-family: 'Prompt', sans-serif; }
  </style>
`;

function buildCover(data: any) {
  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  ${getSVGDefs()}

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-grad)" />
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.5" />
  
  <!-- Glows -->
  <circle cx="1200" cy="0" r="600" fill="url(#glow-orange)" />
  <circle cx="0" cy="630" r="500" fill="url(#glow-blue)" />
  
  <!-- Decorative Abstract Shapes -->
  <path d="M 0 500 Q 300 450 600 550 T 1200 500 L 1200 630 L 0 630 Z" fill="url(#glass-grad)" />
  <path d="M 0 550 Q 400 500 800 600 T 1200 550 L 1200 630 L 0 630 Z" fill="#FF6B00" opacity="0.1" />
  
  <!-- Content -->
  <g transform="translate(80, 200)">
    <!-- Badge -->
    <rect x="0" y="-80" width="220" height="40" rx="20" fill="url(#glass-grad)" stroke="#FF6B00" stroke-width="1.5" />
    <text x="110" y="-55" font-size="16" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">${data.badge}</text>
    
    <!-- Title -->
    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">${data.title[0]}</text>
    ${data.title[1] ? `<text x="0" y="100" font-size="52" font-weight="800" fill="#FFFFFF">${data.title[1]}</text>` : ''}
    
    <!-- Subtitle -->
    <rect x="0" y="150" width="8" height="30" rx="4" fill="url(#primary-grad)" />
    <text x="24" y="174" font-size="28" font-weight="600" fill="#94A3B8">${data.subtitle}</text>
  </g>

  <!-- Mascot -->
  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)" />
</svg>`;
  return svg.trim();
}

function buildInfographic(data: any) {
  const svg = `
<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  ${getSVGDefs()}

  <!-- Background -->
  <rect width="1200" height="800" fill="url(#bg-grad)" />
  <rect width="1200" height="800" fill="url(#grid)" opacity="0.4" />
  
  <!-- Glows -->
  <circle cx="600" cy="0" r="500" fill="url(#glow-orange)" opacity="0.8"/>
  <circle cx="0" cy="800" r="600" fill="url(#glow-blue)" opacity="0.6"/>
  <circle cx="1200" cy="800" r="600" fill="url(#glow-orange)" opacity="0.4"/>
  
  <!-- Header -->
  <g transform="translate(600, 120)" text-anchor="middle">
    <rect x="-100" y="-60" width="200" height="36" rx="18" fill="url(#glass-grad)" stroke="#00F2FE" stroke-width="1.5" />
    <text x="0" y="-36" font-size="16" font-weight="800" fill="#00F2FE" letter-spacing="2">PORNPISIT BATTERY</text>
    <text x="0" y="20" font-size="56" font-weight="800" fill="#FFFFFF">${data.title}</text>
  </g>

  <!-- Cards -->
  <g transform="translate(90, 240)">
    ${data.items.map((item: any, i: number) => `
      <g transform="translate(${i * 340}, 0)">
        <rect x="0" y="0" width="320" height="460" rx="30" fill="url(#glass-grad)" stroke="rgba(255,255,255,0.1)" stroke-width="2" filter="url(#shadow)" />
        <!-- Top accent -->
        <rect x="0" y="0" width="320" height="8" rx="4" fill="url(#primary-grad)" />
        
        <!-- Number Circle -->
        <circle cx="50" cy="60" r="30" fill="#1E293B" stroke="url(#primary-grad)" stroke-width="2" />
        <text x="50" y="70" font-size="28" font-weight="800" fill="#FF6B00" text-anchor="middle">${item.num}</text>
        
        <!-- Item Title -->
        <text x="30" y="140" font-size="28" font-weight="800" fill="#FFFFFF">${item.title}</text>
        
        <!-- Divider -->
        <rect x="30" y="165" width="40" height="4" rx="2" fill="#00F2FE" opacity="0.8" />
        
        <!-- Description -->
        ${item.desc.map((line: string, lineIndex: number) => `
          <text x="30" y="${220 + (lineIndex * 36)}" font-size="22" font-weight="400" fill="#CBD5E1">${line}</text>
        `).join('')}
      </g>
    `).join('')}
  </g>

  <!-- Mascot (smaller, bottom center or peeking) -->
  <use href="#pig-mascot" x="600" y="680" transform="scale(0.8) translate(150, 180)" />
</svg>`;
  return svg.trim();
}

async function main() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const cover of covers) {
    const svg = buildCover(cover);
    fs.writeFileSync(path.join(outDir, cover.file), svg);
    console.log(`✅ Generated ${cover.file}`);
  }

  for (const info of infographics) {
    const svg = buildInfographic(info);
    fs.writeFileSync(path.join(outDir, info.file), svg);
    console.log(`✅ Generated ${info.file}`);
  }
}

main().catch(console.error);
