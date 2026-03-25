import fs from 'fs';
import path from 'path';

const scriptsDir = path.join(process.cwd(), 'scripts');
const files = fs.readdirSync(scriptsDir).filter(f => f.startsWith('seed-') && f.endsWith('.ts'));

// รูปแบบ CTA ที่ต้องการจะแทนที่ (ใช้ Regex)
// เราจะใช้ Regex ที่ครอบคลุมทั้งแบบเดิมและแบบต่างๆ
const ctaRegex = /<div class="not-prose relative overflow-hidden[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

// CTA ใหม่ที่เป็นมาตรฐานเดียวกัน
const newCta = `<div class="not-prose relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-blue-200/60 dark:border-blue-500/20 text-center my-8 sm:my-10 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/10">
  <div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-15 blur-3xl"></div>
  <div class="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full opacity-10 blur-3xl"></div>
  <div class="relative z-10 max-w-2xl mx-auto">
    <div class="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/></svg>
      <span>ช่างผู้เชี่ยวชาญ พร้อมบริการด่วน 24 ชม.</span>
    </div>
    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-3 leading-tight">พบปัญหาเรื่องรถ? โทรหาเราด่วน!</h3>
    <p class="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">FIRSTCARCENTER ให้บริการนอกสถานที่ ครอบคลุมพื้นที่ ศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</p>
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <a href="tel:0887671679" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>โทรเรียกช่าง 088-767-1679</span>
      </a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ปรึกษาช่างฟรี</span>
      </a>
    </div>
  </div>
</div>`;

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(scriptsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (ctaRegex.test(content)) {
    content = content.replace(ctaRegex, newCta);
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
    console.log(`Updated CTA in ${file}`);
  } else {
    console.log(`No matching CTA found in ${file}`);
  }
}

console.log(`\nSuccessfully updated CTA in ${updatedCount} files.`);
