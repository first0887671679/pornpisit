const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

function buildCTA(heading, description, serviceHref, serviceLabel) {
  return `<div class="not-prose relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-orange-200/60 dark:border-orange-500/20 text-center my-8 sm:my-10 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/10">
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
      <a href="tel:0887671679" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>โทรเรียกช่าง 088-767-1679</span>
      </a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ส่งรูปประเมินฟรี</span>
      </a>
    </div>
    <a href="${serviceHref}" class="inline-block mt-4 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium underline underline-offset-4 decoration-orange-300 dark:decoration-orange-700 hover:decoration-orange-500 transition-colors">${serviceLabel} &rarr;</a>
  </div>
</div>`;
}

const FIXES = [
  {
    slug: 'symptoms-of-dead-car-battery',
    heading: 'แบตหมด สตาร์ทไม่ติด? เรียกช่างเปลี่ยนถึงที่!',
    desc: 'ช่างพร้อมนำแบตเตอรี่แท้ไปเปลี่ยนให้ถึงที่ภายใน 30 นาที รับประกัน 1-2 ปี เช็คระบบไฟฟรี',
    serviceHref: '/battery-replacement',
    serviceLabel: 'ดูบริการเปลี่ยนแบต',
  },
  {
    slug: 'car-wont-start-causes-and-fixes',
    heading: 'รถสตาร์ทไม่ติด? ให้ช่างวิเคราะห์อาการให้ฟรี!',
    desc: 'ไม่แน่ใจว่าปัญหาอยู่ที่แบต ไดชาร์จ หรือไดสตาร์ท? โทรปรึกษาช่างผู้เชี่ยวชาญ FIRSTCARCENTER ฟรี',
    serviceHref: '/battery-replacement',
    serviceLabel: 'ดูบริการเปลี่ยนแบต',
  },
  {
    slug: 'what-to-do-when-car-battery-is-dead',
    heading: 'แบตหมดกลางทาง? อย่าตกใจ โทรเรียกช่างเลย!',
    desc: 'FIRSTCARCENTER พร้อมออกบริการเปลี่ยนแบตเตอรี่ถึงที่ 24 ชม. ครอบคลุม บางนา ศรีนครินทร์ สมุทรปราการ',
    serviceHref: '/battery-replacement',
    serviceLabel: 'ดูบริการเปลี่ยนแบต',
  },
];

async function main() {
  for (const fix of FIXES) {
    const post = await p.post.findUnique({
      where: { slug: fix.slug },
      select: { id: true, content: true }
    });

    if (!post) {
      console.log('NOT FOUND: ' + fix.slug);
      continue;
    }

    let content = post.content;

    // Match the old inline-style CTA: <div class="not-prose" style=...>...<div style="background:linear-gradient...">...</div>\n</div>
    const oldCtaRegex = /<div class="not-prose"[^>]*>\s*<div style="background:linear-gradient[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
    const matches = content.match(oldCtaRegex);

    if (matches) {
      const newCTA = buildCTA(fix.heading, fix.desc, fix.serviceHref, fix.serviceLabel);
      content = content.replace(oldCtaRegex, newCTA);
      
      await p.post.update({
        where: { id: post.id },
        data: { content }
      });
      console.log('[UPDATED] ' + fix.slug + ' — replaced ' + matches.length + ' old CTA(s)');
    } else {
      console.log('[NO MATCH] ' + fix.slug + ' — old CTA pattern not found');
    }
  }

  await p.$disconnect();
}

main().catch(console.error);
