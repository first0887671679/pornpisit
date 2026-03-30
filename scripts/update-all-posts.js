const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const p = new PrismaClient();

// ============================================================
// LINK FIXES: /blog/... => /posts/... + fix broken slugs
// ============================================================
const LINK_REPLACEMENTS = [
  // Fix /blog/ => /posts/ for all valid slugs
  { from: '/blog/alternator-failure-symptoms-guide', to: '/posts/alternator-failure-symptoms-guide' },
  { from: '/blog/car-parked-too-long-care-guide', to: '/posts/car-parked-too-long-care-guide' },
  { from: '/blog/best-car-battery-brands-guide-2026', to: '/posts/best-car-battery-brands-guide-2026' },
  { from: '/blog/car-battery-lifespan-guide', to: '/posts/car-battery-lifespan-guide' },
  { from: '/blog/alternator-repair-cost-2026', to: '/posts/alternator-repair-cost-2026' },
  { from: '/blog/how-to-change-spare-tire-guide', to: '/posts/how-to-change-spare-tire-guide' },
  { from: '/blog/bulging-tire-warning-guide', to: '/posts/bulging-tire-warning-guide' },
  { from: '/blog/sidewall-tire-tear-guide', to: '/posts/sidewall-tire-tear-guide' },
  { from: '/blog/bird-poop-stain-removal-guide', to: '/posts/bird-poop-stain-removal-guide' },
  // Fix broken slugs (page doesn't exist or renamed)
  { from: '/blog/battery-warning-light-guide', to: '/posts/battery-light-warning-guide' },
  { from: '/blog/car-polishing-scratch-removal-guide', to: '/posts/car-scratch-swirl-mark-removal-guide' },
  // Fix /service-area => /contact-us
  { from: '/service-area', to: '/contact-us' },
];

function fixLinks(content) {
  let fixed = content;
  let count = 0;
  for (const r of LINK_REPLACEMENTS) {
    const regex = new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const before = fixed;
    fixed = fixed.replace(regex, r.to);
    if (fixed !== before) count++;
  }
  return { content: fixed, fixCount: count };
}

// ============================================================
// CTA TEMPLATE: Responsive, beautiful, dark mode compatible
// ============================================================
function buildCTA(heading, description, category) {
  // Choose service page based on category
  let serviceHref = '/contact-us';
  let serviceLabel = 'ดูบริการทั้งหมด';
  if (category.includes('แบตเตอรี่') || category.includes('ระบบไฟ')) {
    serviceHref = '/battery-replacement';
    serviceLabel = 'ดูบริการเปลี่ยนแบต';
  } else if (category.includes('ยาง')) {
    serviceHref = '/mobile-tire-repair';
    serviceLabel = 'ดูบริการปะยาง';
  } else if (category.includes('ขัดสี') || category.includes('เคล็ดลับ')) {
    serviceHref = '/car-polishing';
    serviceLabel = 'ดูบริการขัดสีรถ';
  } else if (category.includes('ไดชาร์จ') || category.includes('ไดสตาร์ท')) {
    serviceHref = '/alternator-starter';
    serviceLabel = 'ดูบริการซ่อมไดชาร์จ';
  }

  return `<div class="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-orange-200/60 dark:border-orange-500/20 text-center my-8 sm:my-10 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/10">
  <div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-15 blur-3xl"></div>
  <div class="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-10 blur-3xl"></div>
  <div class="relative z-10 max-w-2xl mx-auto">
    <div class="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
      <span>บริการ 24 ชม. ถึงที่ทันที</span>
    </div>
    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-3 leading-tight">${heading}</h3>
    <p class="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">${description}</p>
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <a href="tel:0996731296" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>โทรเรียกช่าง 099-673-1296</span>
      </a>
      <a href="https://lin.ee/OBB86S4" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ส่งรูปประเมินฟรี</span>
      </a>
    </div>
    <a href="${serviceHref}" class="inline-block mt-4 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium underline underline-offset-4 decoration-orange-300 dark:decoration-orange-700 hover:decoration-orange-500 transition-colors">${serviceLabel} &rarr;</a>
  </div>
</div>`;
}

// ============================================================
// Per-post CTA content (heading + description per category)
// ============================================================
const POST_CTA_MAP = {
  'symptoms-of-dead-car-battery': {
    heading: 'แบตหมด สตาร์ทไม่ติด? เรียกช่างเปลี่ยนถึงที่!',
    desc: 'ช่างพร้อมนำแบตเตอรี่แท้ไปเปลี่ยนให้ถึงที่ภายใน 30 นาที รับประกัน 1-2 ปี เช็คระบบไฟฟรี',
  },
  'car-wont-start-causes-and-fixes': {
    heading: 'รถสตาร์ทไม่ติด? ให้ช่างวิเคราะห์อาการให้ฟรี!',
    desc: 'ไม่แน่ใจว่าปัญหาอยู่ที่แบต ไดชาร์จ หรือไดสตาร์ท? โทรปรึกษาช่างผู้เชี่ยวชาญ PORNPISIT BATTERY ฟรี ไม่มีค่าใช้จ่าย',
  },
  'what-to-do-when-car-battery-is-dead': {
    heading: 'แบตหมดกลางทาง? อย่าตกใจ โทรเรียกช่างเลย!',
    desc: 'PORNPISIT BATTERY พร้อมออกบริการเปลี่ยนแบตเตอรี่ถึงที่ 24 ชม. ครอบคลุม ห้วยขวาง ดินแดง ลาดพร้าว บางกะปิ บางเขน จตุจักร ดุสิต บางซื่อ',
  },
  'alternator-failure-symptoms-guide': {
    heading: 'สงสัยไดชาร์จเสีย? ปรึกษาช่างฟรี!',
    desc: 'ไม่ต้องเดาให้ปวดหัว PORNPISIT BATTERY บริการตรวจเช็ก ซ่อมไดชาร์จ และเปลี่ยนแบตเตอรี่ ถึงที่ด่วน 24 ชม.',
  },
  'starter-motor-failure-symptoms': {
    heading: 'ไดสตาร์ทพัง? ซ่อมเสร็จหน้างาน ขับต่อได้เลย!',
    desc: 'ช่างวิเคราะห์อาการแม่นยำด้วย OBD ซ่อมเปลี่ยนไดสตาร์ทนอกสถานที่ ไม่ต้องลากรถเข้าอู่',
  },
  'battery-light-warning-guide': {
    heading: 'ไฟรูปแบตขึ้น? อย่าขับต่อ โทรหาเราเลย!',
    desc: 'ช่างเชี่ยวชาญตรวจเช็คระบบไฟฟ้ารถยนต์ถึงที่ ประเมินอาการฟรี พร้อมเปลี่ยนแบตหรือซ่อมไดชาร์จทันที',
  },
  'how-to-change-spare-tire-guide': {
    heading: 'ยางแบน เปลี่ยนเองไม่ได้? โทรเรียกช่างถึงที่!',
    desc: 'บริการปะยาง เปลี่ยนยาง นอกสถานที่ 24 ชม. ถึงไวใน 30 นาที โซนห้วยขวาง ดินแดง ลาดพร้าว บางกะปิ บางเขน จตุจักร ดุสิต บางซื่อ',
  },
  'tire-plug-repair-pros-cons-guide': {
    heading: 'ยางรั่ว ปะยางแบบไหนดี? ปรึกษาช่างได้เลย!',
    desc: 'ช่างปะยางมืออาชีพ พร้อมอุปกรณ์ครบ ออกบริการถึงที่ 24 ชม. ไม่ต้องลากรถไปร้าน',
  },
  'tire-patch-repair-hot-vs-cold': {
    heading: 'ปะยางร้อน vs เย็น? ให้ช่างแนะนำแบบที่เหมาะสม!',
    desc: 'ช่างชำนาญงาน พร้อมอุปกรณ์ปะยางทั้งแบบร้อนและเย็น ออกบริการถึงที่ เลือกวิธีปะที่ดีที่สุดให้คุณ',
  },
  'headlight-restoration-diy-vs-pro': {
    heading: 'ไฟหน้าเหลือง? ขัดให้ใสปิ๊งถึงบ้าน!',
    desc: 'บริการขัดไฟหน้ารถยนต์นอกสถานที่ คืนความใสให้ไฟหน้า ส่งรูปประเมินราคาฟรีทาง Line',
  },
  'car-scratch-swirl-mark-removal-guide': {
    heading: 'รอยขนแมว รอยขีดข่วน? ขัดลบรอยถึงบ้าน!',
    desc: 'ส่งรูปรถจุดที่มีรอยมาทาง Line ช่างประเมินราคาฟรี บริการขัดสีรถลบรอยนอกสถานที่ ไม่ต้องทิ้งรถไว้คาร์แคร์',
  },
  'car-parked-too-long-care-guide': {
    heading: 'จอดรถนาน สตาร์ทไม่ติด? เรียกช่างมาถึงที่!',
    desc: 'แบตหมดเพราะจอดนาน? ช่างพร้อมเปลี่ยนแบตเตอรี่และตรวจเช็คระบบไฟฟ้าให้ถึงที่ ภายใน 30 นาที',
  },
  'best-car-battery-brands-guide-2026': {
    heading: 'เลือกแบตไม่ถูก? ปรึกษาช่างฟรี!',
    desc: 'ช่างแนะนำยี่ห้อแบตเตอรี่ที่เหมาะกับรุ่นรถของคุณ พร้อมนำไปเปลี่ยนถึงที่ รับประกัน 1-2 ปีเต็ม',
  },
  'car-battery-lifespan-guide': {
    heading: 'แบตเก่าเสื่อมแล้ว? เปลี่ยนลูกใหม่ถึงที่!',
    desc: 'ไม่ต้องรอให้รถดับ เช็คอาการแบตเสื่อมก่อน โทรนัดช่างเปลี่ยนแบตเตอรี่ถึงที่ สะดวก รวดเร็ว',
  },
  'alternator-repair-cost-2026': {
    heading: 'ไดชาร์จเสีย? ซ่อมหรือเปลี่ยน ให้ช่างประเมินฟรี!',
    desc: 'ประเมินราคาซ่อม/เปลี่ยนไดชาร์จฟรี ช่างถึงที่ภายใน 30 นาที อะไหล่แท้ รับประกันงานซ่อม',
  },
  'starter-motor-sound-warning-guide': {
    heading: 'เสียงผิดปกติตอนสตาร์ท? อย่ารอ โทรหาเราเลย!',
    desc: 'ช่างเชี่ยวชาญวิเคราะห์เสียงผิดปกติ พร้อมซ่อมเปลี่ยนไดสตาร์ทนอกสถานที่ ไม่ต้องลากรถเข้าอู่',
  },
  'how-to-check-alternator-guide': {
    heading: 'ไม่แน่ใจว่าไดชาร์จพัง? ให้ช่างตรวจฟรี!',
    desc: 'ช่างตรวจเช็คระบบไดชาร์จ แบตเตอรี่ ด้วยเครื่องมือมาตรฐาน ถึงที่ 24 ชม. ประเมินอาการฟรี',
  },
  'bulging-tire-warning-guide': {
    heading: 'ยางบวม เสี่ยงระเบิด! เรียกช่างเปลี่ยนยางถึงที่!',
    desc: 'อย่าเสี่ยงขับต่อ โทรเรียกช่างปะยาง เปลี่ยนยาง นอกสถานที่ 24 ชม. ถึงไวใน 30 นาที',
  },
  'sidewall-tire-tear-guide': {
    heading: 'แก้มยางฉีก? ต้องเปลี่ยนยาง โทรเรียกช่างเลย!',
    desc: 'แก้มยางฉีกปะไม่ได้ต้องเปลี่ยนใหม่ ช่างพร้อมเดินทางไปบริการถึงที่ เปลี่ยนยางอะไหล่ให้ทันที',
  },
  'nail-in-tire-guide': {
    heading: 'เหยียบตะปู ยางรั่ว? ช่างปะยางถึงที่ 24 ชม.!',
    desc: 'อย่าดึงตะปูออกเอง! โทรเรียกช่างปะยางมืออาชีพ พร้อมอุปกรณ์ครบ ถึงที่ภายใน 30 นาที',
  },
  'toothpaste-headlight-cleaning-guide': {
    heading: 'ไฟหน้าเหลือง ขัดยาสีฟันไม่พอ? ให้ช่างจัดการ!',
    desc: 'บริการขัดไฟหน้ารถยนต์ระดับมืออาชีพ ผลลัพธ์ชัดเจนกว่าทำเอง ส่งรูปประเมินราคาฟรี',
  },
  'bird-poop-stain-removal-guide': {
    heading: 'รอยขี้นกฝังลึก? ขัดลบรอยถึงบ้าน!',
    desc: 'รอยขี้นกกัดสีรถ ถ้าปล่อยนานยิ่งลึก ส่งรูปมาให้ช่างประเมินฟรี บริการขัดสีรถถึงบ้าน',
  },
  'car-polishing-cost-guide-2026': {
    heading: 'อยากรู้ราคาขัดสีรถ? ส่งรูปประเมินฟรี!',
    desc: 'ส่งรูปรถมาทาง Line ช่างประเมินราคาขัดสี ขัดลบรอยให้ฟรี บริการถึงบ้าน ไม่ต้องทิ้งรถไว้คาร์แคร์',
  },
};

// ============================================================
// SVG Cover Generator
// ============================================================
const POST_SVG_MAP = {
  'symptoms-of-dead-car-battery': { badge: 'BATTERY GUIDE', line1: 'อาการแบตเตอรี่เสื่อม', line2: 'ดูยังไง? แก้ด่วน!', sub: 'สัญญาณเตือนที่ไม่ควรมองข้าม', tool: 'battery' },
  'car-wont-start-causes-and-fixes': { badge: 'DIAGNOSTIC GUIDE', line1: 'รถสตาร์ทไม่ติด', line2: 'เกิดจากอะไร?', sub: 'เช็กด่วน 5 จุด สาเหตุ+วิธีแก้', tool: 'wrench' },
  'what-to-do-when-car-battery-is-dead': { badge: 'EMERGENCY GUIDE', line1: 'แบตหมด ทำไงดี?', line2: 'วิธีแก้เฉพาะหน้า', sub: 'พ่วงแบตเองได้ ง่ายกว่าที่คิด', tool: 'battery' },
  'alternator-failure-symptoms-guide': { badge: 'EXPERT GUIDE', line1: 'อาการไดชาร์จเสีย', line2: 'ก่อนรถดับกลางทาง', sub: 'เช็ก 5 สัญญาณเตือน อัปเดต 2026', tool: 'alternator' },
  'starter-motor-failure-symptoms': { badge: 'EXPERT GUIDE', line1: 'ไดสตาร์ทพัง', line2: 'อาการเป็นยังไง?', sub: 'บิดกุญแจเงียบ แบตหมดหรือไดพัง?', tool: 'starter' },
  'battery-light-warning-guide': { badge: 'WARNING GUIDE', line1: 'ไฟรูปแบตโชว์', line2: 'เตือนอะไร?', sub: 'ขับต่อได้ไหม? วิธีเอาตัวรอด', tool: 'battery' },
  'how-to-change-spare-tire-guide': { badge: 'DIY GUIDE', line1: 'วิธีเปลี่ยนยางอะไหล่', line2: 'ทำเองได้ง่ายๆ', sub: '5 ขั้นตอน มือใหม่ก็ทำได้', tool: 'tire' },
  'tire-plug-repair-pros-cons-guide': { badge: 'TIRE GUIDE', line1: 'ปะยางแบบแทงไหม', line2: 'ดีไหม? วิ่งได้กี่กิโล?', sub: 'สรุปข้อดีข้อเสียครบจบ 2026', tool: 'tire' },
  'tire-patch-repair-hot-vs-cold': { badge: 'TIRE GUIDE', line1: 'ปะยางสตรีม', line2: 'ร้อน vs เย็น?', sub: 'แบบไหนทนกว่า อัปเดต 2026', tool: 'tire' },
  'headlight-restoration-diy-vs-pro': { badge: 'COMPARISON', line1: 'ไฟหน้าเหลือง', line2: 'ขัดเอง vs จ้างช่าง', sub: 'แบบไหนคุ้มกว่า? มีคำตอบ', tool: 'polish' },
  'car-scratch-swirl-mark-removal-guide': { badge: 'POLISHING GUIDE', line1: 'ลบรอยขนแมว', line2: 'ให้สีกลับมาเงา!', sub: 'เทคนิคช่างมืออาชีพ 2026', tool: 'polish' },
  'car-parked-too-long-care-guide': { badge: 'CARE GUIDE', line1: 'จอดรถทิ้งนาน', line2: 'สตาร์ทไม่ติด?', sub: '5 วิธีดูแลรถที่จอดนาน', tool: 'battery' },
  'best-car-battery-brands-guide-2026': { badge: 'REVIEW 2026', line1: 'แบตเตอรี่ยี่ห้อไหนดี?', line2: 'ทนทาน คุ้มราคา', sub: 'เปรียบเทียบ 5 ยี่ห้อยอดนิยม', tool: 'battery' },
  'car-battery-lifespan-guide': { badge: 'BATTERY GUIDE', line1: 'อายุแบตเตอรี่', line2: 'ใช้ได้กี่ปี?', sub: 'สัญญาณเตือนแบตเสื่อม 2026', tool: 'battery' },
  'alternator-repair-cost-2026': { badge: 'COST GUIDE', line1: 'ซ่อมไดชาร์จราคา', line2: 'เท่าไหร่?', sub: 'ซ่อมคุ้มไหม หรือเปลี่ยนลูกใหม่', tool: 'alternator' },
  'starter-motor-sound-warning-guide': { badge: 'SOUND GUIDE', line1: 'เสียงไดสตาร์ท', line2: '4 เสียงเตือน!', sub: 'สตาร์ทไม่ติด ฟังเสียงรู้ทันที', tool: 'starter' },
  'how-to-check-alternator-guide': { badge: 'DIY GUIDE', line1: 'วิธีเช็คไดชาร์จ', line2: 'ด้วยตัวเอง', sub: 'แบตเสื่อม หรือ ไดพัง? รู้ทันที', tool: 'alternator' },
  'bulging-tire-warning-guide': { badge: 'WARNING', line1: 'ยางบวม อันตราย!', line2: 'วิ่งต่อได้ไหม?', sub: 'เสี่ยงระเบิด! สิ่งที่ต้องรู้', tool: 'tire' },
  'sidewall-tire-tear-guide': { badge: 'TIRE GUIDE', line1: 'แก้มยางฉีก', line2: 'ปะได้ไหม?', sub: 'หรือต้องเปลี่ยนใหม่อย่างเดียว', tool: 'tire' },
  'nail-in-tire-guide': { badge: 'EMERGENCY', line1: 'เหยียบตะปู ยางรั่ว!', line2: 'ต้องดึงออกไหม?', sub: 'ขับต่อได้หรือเปล่า? มีคำตอบ', tool: 'tire' },
  'toothpaste-headlight-cleaning-guide': { badge: 'MYTH BUSTER', line1: 'ยาสีฟันขัดไฟหน้า', line2: 'ได้ผลจริงไหม?', sub: 'ช่างมีคำตอบ ทดสอบจริง 2026', tool: 'polish' },
  'bird-poop-stain-removal-guide': { badge: 'CARE GUIDE', line1: 'รอยขี้นก กัดสีรถ', line2: 'ล้างไม่ออก?', sub: 'วิธีลบรอยฝังลึก อัปเดต 2026', tool: 'polish' },
  'car-polishing-cost-guide-2026': { badge: 'PRICE GUIDE', line1: 'ขัดสีรถราคา', line2: 'เท่าไหร่?', sub: 'เทียบราคาแบบไหนคุ้มสุด 2026', tool: 'polish' },
};

function getToolSVG(tool) {
  switch (tool) {
    case 'battery': return `
      <g transform="translate(70, 70) rotate(15)">
        <rect x="-25" y="-30" width="50" height="60" rx="6" fill="#1E293B" stroke="#00F2FE" stroke-width="2" filter="url(#shadow-sm)"/>
        <rect x="-18" y="-36" width="10" height="6" fill="#FF3E00"/>
        <rect x="8" y="-36" width="10" height="6" fill="#94A3B8"/>
        <path d="M2,-15 L-8,5 L-2,5 L-2,15 L8,-5 L2,-5 Z" fill="#00F2FE"/>
        <circle cx="0" cy="0" r="18" fill="url(#pig-skin)"/>
      </g>`;
    case 'alternator': return `
      <g transform="translate(70, 65) rotate(10)">
        <circle cx="0" cy="0" r="30" fill="#1E293B" stroke="#00F2FE" stroke-width="2" filter="url(#shadow-sm)"/>
        <circle cx="0" cy="0" r="18" fill="#0B0F19"/>
        <circle cx="0" cy="0" r="8" fill="#00F2FE"/>
        <path d="M-5,-20 L5,-20 L3,-5 L8,5 L-8,5 L-3,-5 Z" fill="#FF6B00" opacity="0.8"/>
        <circle cx="28" cy="10" r="18" fill="url(#pig-skin)"/>
      </g>`;
    case 'starter': return `
      <g transform="translate(70, 70) rotate(10)">
        <rect x="-15" y="-35" width="30" height="70" rx="10" fill="#1E293B" stroke="#00F2FE" stroke-width="2" filter="url(#shadow-sm)"/>
        <circle cx="0" cy="-20" r="12" fill="#0B0F19" stroke="#FF6B00" stroke-width="2"/>
        <path d="M-4,-22 L4,-22 L0,-28 Z" fill="#FF6B00"/>
        <rect x="-10" y="10" width="20" height="20" rx="4" fill="#0B0F19"/>
        <circle cx="25" cy="15" r="18" fill="url(#pig-skin)"/>
      </g>`;
    case 'tire': return `
      <g transform="translate(70, 65) rotate(10)">
        <circle cx="0" cy="0" r="35" fill="#1E293B" filter="url(#shadow-sm)"/>
        <circle cx="0" cy="0" r="28" fill="#333" stroke="#555" stroke-width="3"/>
        <circle cx="0" cy="0" r="12" fill="#94A3B8"/>
        <circle cx="0" cy="0" r="6" fill="#1E293B"/>
        <circle cx="28" cy="20" r="18" fill="url(#pig-skin)"/>
      </g>`;
    case 'polish': return `
      <g transform="translate(70, 70) rotate(-15)">
        <rect x="-8" y="-45" width="16" height="70" rx="8" fill="url(#silver)" filter="url(#shadow-sm)"/>
        <circle cx="0" cy="-45" r="20" fill="#00F2FE" opacity="0.3"/>
        <circle cx="0" cy="-45" r="12" fill="#FFFFFF" opacity="0.5"/>
        <ellipse cx="0" cy="35" rx="20" ry="12" fill="#FFD700" opacity="0.6"/>
        <circle cx="20" cy="15" r="18" fill="url(#pig-skin)"/>
      </g>`;
    default: return '';
  }
}

function buildSVG(slug) {
  const data = POST_SVG_MAP[slug];
  if (!data) return null;

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
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
      ${getToolSVG(data.tool)}
    </g>
  </defs>
  <style>@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;800&amp;display=swap');text{font-family:'Prompt',sans-serif;}</style>
  <rect width="1200" height="630" fill="url(#bg-grad)"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.5"/>
  <circle cx="1200" cy="0" r="600" fill="url(#glow-orange)"/>
  <circle cx="0" cy="630" r="500" fill="url(#glow-blue)"/>
  <path d="M 0 500 Q 300 450 600 550 T 1200 500 L 1200 630 L 0 630 Z" fill="url(#glass-grad)"/>
  <path d="M 0 550 Q 400 500 800 600 T 1200 550 L 1200 630 L 0 630 Z" fill="#FF6B00" opacity="0.1"/>
  <g transform="translate(80, 200)">
    <rect x="0" y="-80" width="260" height="40" rx="20" fill="url(#glass-grad)" stroke="#FF6B00" stroke-width="1.5"/>
    <text x="130" y="-55" font-size="15" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">${data.badge}</text>
    <text x="0" y="20" font-size="60" font-weight="800" fill="url(#text-grad)">${data.line1}</text>
    <text x="0" y="95" font-size="52" font-weight="800" fill="#FFFFFF">${data.line2}</text>
    <rect x="0" y="140" width="8" height="30" rx="4" fill="url(#primary-grad)"/>
    <text x="24" y="164" font-size="26" font-weight="600" fill="#94A3B8">${data.sub}</text>
  </g>
  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)"/>
  <rect x="40" y="580" width="200" height="30" rx="4" fill="url(#primary-grad)"/>
  <text x="140" y="602" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">PORNPISIT BATTERY</text>
</svg>`;
}

// ============================================================
// MAIN: Update all posts
// ============================================================
async function main() {
  const posts = await p.post.findMany({
    select: { id: true, slug: true, content: true, category: true, coverImage: true },
    orderBy: { createdAt: 'asc' }
  });

  const blogDir = path.join(__dirname, '..', 'public', 'images', 'blog');

  let linkFixTotal = 0;
  let ctaFixTotal = 0;
  let svgFixTotal = 0;

  for (const post of posts) {
    let content = post.content;
    let updated = false;

    // 1. Fix links
    const linkResult = fixLinks(content);
    if (linkResult.fixCount > 0) {
      content = linkResult.content;
      linkFixTotal += linkResult.fixCount;
      updated = true;
    }

    // 2. Replace CTA
    const ctaData = POST_CTA_MAP[post.slug];
    if (ctaData) {
      // Find and replace ALL CTA blocks
      const ctaRegex = /<div class="relative overflow-hidden bg-gradient-to-br[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
      const matches = content.match(ctaRegex);
      if (matches && matches.length > 0) {
        const newCTA = buildCTA(ctaData.heading, ctaData.desc, post.category || '');
        content = content.replace(ctaRegex, newCTA);
        ctaFixTotal++;
        updated = true;
      }
    }

    // 3. Generate new SVG
    const svgContent = buildSVG(post.slug);
    if (svgContent) {
      const svgFileName = 'pig-' + post.slug + '-cover.svg';
      const svgPath = path.join(blogDir, svgFileName);
      fs.writeFileSync(svgPath, svgContent, 'utf8');
      
      const newCoverImage = '/images/blog/' + svgFileName;
      if (post.coverImage !== newCoverImage) {
        await p.post.update({
          where: { id: post.id },
          data: { coverImage: newCoverImage }
        });
        svgFixTotal++;
      }
    }

    // 4. Save content
    if (updated) {
      await p.post.update({
        where: { id: post.id },
        data: { content }
      });
    }

    console.log('[' + (updated ? 'UPDATED' : 'OK') + '] ' + post.slug + (linkResult.fixCount > 0 ? ' (links:' + linkResult.fixCount + ')' : '') + (ctaData ? ' (cta)' : '') + (svgContent ? ' (svg)' : ''));
  }

  console.log('\n=== SUMMARY ===');
  console.log('Posts processed: ' + posts.length);
  console.log('Link fixes: ' + linkFixTotal);
  console.log('CTA updates: ' + ctaFixTotal);
  console.log('SVG covers: ' + svgFixTotal);

  await p.$disconnect();
}

main().catch(console.error);
