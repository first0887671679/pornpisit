const fs = require('fs');
const path = require('path');

const scriptsDir = path.join(process.cwd(), 'scripts');
const files = fs.readdirSync(scriptsDir).filter(f => f.startsWith('seed-') && f.endsWith('.ts'));

const ctaRegex = /<div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center my-8">\s*<h2 class="text-2xl font-bold text-slate-800 mb-4">([\s\S]*?)<\/h2>\s*<p class="text-slate-600 mb-6">([\s\S]*?)<\/p>\s*<div class="flex flex-col sm:flex-row gap-4 justify-center">\s*<a href="tel:0996731296"[^>]*>\s*📞\s*([\s\S]*?)\s*<\/a>\s*<a href="https:\/\/lin\.ee\/OBB86S4"[^>]*>\s*💬\s*([\s\S]*?)\s*<\/a>\s*<\/div>\s*<\/div>/g;

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(scriptsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (ctaRegex.test(content)) {
    content = content.replace(ctaRegex, (match, title, desc, phoneText, lineText) => {
      // Clean up extracted text
      title = title.trim();
      desc = desc.trim();
      phoneText = phoneText.trim();
      lineText = lineText.trim();

      return `<div class="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 text-center my-10 shadow-sm hover:shadow-md transition-shadow">
  <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-[#FF6B00] to-[#FF3E00] rounded-full opacity-20 blur-2xl"></div>
  <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-br from-[#00F2FE] to-[#4FACFE] rounded-full opacity-20 blur-2xl"></div>
  <div class="relative z-10">
    <h2 class="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 mb-4">${title}</h2>
    <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">${desc}</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a href="tel:0996731296" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B00] to-[#FF3E00] hover:from-[#E65A00] hover:to-[#E63500] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        <span>${phoneText}</span>
      </a>
      <a href="https://lin.ee/OBB86S4" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00c300] to-[#00a800] hover:from-[#00b300] hover:to-[#009900] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>${lineText}</span>
      </a>
    </div>
  </div>
</div>`;
    });
    fs.writeFileSync(filePath, content);
    console.log(`Updated CTA in ${file}`);
    updatedCount++;
  }
}

console.log(`\nTotal updated files: ${updatedCount}`);
