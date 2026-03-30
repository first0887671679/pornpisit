import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>ล้อแม็กดุ้ง อาการเป็นอย่างไร? ตกหลุมแรงซ่อมได้ไหม หรือต้องเปลี่ยน (อัปเดต 2026)</h1>
<p>ถ้าคุณเพิ่งขับรถตกหลุมก่อสร้างบนถนน <strong>ศรีนครินทร์ หรือ เทพารักษ์</strong> อย่างแรงจนได้ยินเสียง "ตึง!" สนั่นลั่นรถ นอกจากเรื่องยางแตกหรือแก้มยางฉีกที่ต้องกังวลแล้ว อีกหนึ่งความเสียหายราคาแพงที่มักจะตามมาติดๆ ก็คืออาการ <strong>"ล้อแม็กดุ้ง"</strong> ครับ</p>

<p>หลายคนอาจจะยังไม่แน่ใจว่า <strong>แม็กดุ้ง</strong> อาการมันเป็นยังไง? ขับต่อได้ไหม? แล้วถ้าดุ้งไปแล้วเอาไปกลึงดัดซ่อมจะกลับมาใช้ได้เหมือนเดิมหรือเปล่า วันนี้ช่างจาก PORNPISIT BATTERY จะมาไขข้อข้องใจเรื่องนี้ พร้อมวิธีรับมือเมื่อเกิดเหตุตกหลุมกลางดึกแถว <strong>บางนา-แพรกษา</strong> ครับ</p>

<img src="/images/blog/pig-bent-rim-guide-cover.svg" alt="ล้อแม็กดุ้ง ซ่อมได้ไหม ตกหลุมล้อดุ้ง ศรีนครินทร์ บางนา แบริ่ง" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: ล้อแม็กดุ้ง เป็นความเสียหายยอดฮิตเมื่อขับรถตกหลุมด้วยความเร็วสูง</em></p>

<h2>ล้อแม็กดุ้ง คืออะไร? เกิดจากอะไร?</h2>
<p><strong>"แม็กดุ้ง" (Bent Rim)</strong> คือ อาการที่ขอบของล้อแม็กอัลลอยเสียรูปทรง บิดเบี้ยว หรืองอพับเข้าไปด้านใน สาเหตุหลักเกิน 90% เกิดจาก <strong>"การขับรถตกหลุมอย่างแรง"</strong> หรือ <strong>"เบียดฟุตบาท"</strong> ครับ</p>
<p>เมื่อล้อกระแทกกับขอบหลุม (โดยเฉพาะช่วงฝนตกน้ำท่วมขังที่มองไม่เห็นหลุมแถว <strong>สุขุมวิท - ลาซาล</strong>) ยางรถยนต์จะถูกบีบอัดจนแบนติดกับขอบล้อแม็ก ทำให้แรงกระแทกส่งตรงไปที่ล้อแม็กเต็มๆ จนอะลูมิเนียมเกิดการบิดงอครับ</p>

<h2>3 อาการเตือน! ว่ารถคุณกำลังมีปัญหา "แม็กดุ้ง"</h2>
<p>หลังจากขับตกหลุมแล้ว ถ้าล้อแม็กคุณมีปัญหา มักจะแสดงอาการเหล่านี้ออกมาให้เห็นครับ:</p>
<ul class="list-disc pl-6 space-y-3">
  <li><strong>พวงมาลัยสั่นเป็นเจ้าเข้า:</strong> โดยเฉพาะตอนวิ่งด้วยความเร็วประมาณ 80-100 กม./ชม. พวงมาลัยจะสั่นตีมือชัดเจนมาก เพราะล้อเสียศูนย์และไม่ได้บาลานซ์</li>
  <li><strong>ลมยางอ่อน หรือซึมออกตลอด:</strong> เมื่อขอบแม็กงอ มันจะไม่แนบสนิทกับขอบยาง ทำให้ลมยางค่อยๆ รั่วซึมออก ต่อให้เติมลมแข็งแค่ไหน ทิ้งไว้ข้ามคืนก็แบนเหมือนเดิม</li>
  <li><strong>เสียงหอนจากช่วงล่าง:</strong> ถ้ายางและแม็กดุ้งจนเสียศูนย์มากๆ เวลาวิ่งจะได้ยินเสียงบดยาง หรือเสียงครางฮึ่มๆ ดังเข้ามาในห้องโดยสาร</li>
</ul>

<img src="/images/blog/pig-bent-rim-guide-info.svg" alt="อาการแม็กดุ้ง ยางรั่วซึม พวงมาลัยสั่น สมุทรปราการ เทพารักษ์" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h2>แม็กดุ้ง ซ่อมได้ไหม? หรือต้องเปลี่ยนวงใหม่</h2>
<p>คำถามยอดฮิตของคนเจอแจ็คพอตตกหลุมหน้า <strong>ตลาดหนามแดง</strong>! คำตอบคือ <strong>"ซ่อมได้เป็นบางกรณีครับ"</strong> ขึ้นอยู่กับความรุนแรงของแผล:</p>

<h3>กรณีที่ "ซ่อมได้" (ดัด ดึง กลึง)</h3>
<p>ถ้าแม็กดุ้งเฉพาะบริเวณ <strong>"ขอบนอก" (Lip)</strong> เพียงเล็กน้อย ไม่ลึกมาก และไม่มีรอยแตกร้าวเลย ร้านซ่อมแม็กสามารถนำไปใช้เครื่องไฮดรอลิกดัดความร้อน ดึงให้กลับมากลมเหมือนเดิมได้ ค่าซ่อมจะตกวงละประมาณ 500 - 1,500 บาท</p>

<h3>กรณีที่ "ห้ามซ่อม! ต้องทิ้งอย่างเดียว"</h3>
<p>ถ้าแม็กดุ้งลึกเข้าไปถึง <strong>"ก้านแม็ก (Spoke)"</strong> หรือบริเวณ <strong>"ดุมกลางล้อ"</strong> หรือมี <strong>"รอยแตกร้าว"</strong> ให้เห็นชัดเจน <strong>ห้ามนำไปซ่อมเชื่อมเด็ดขาดครับ!</strong> เพราะโครงสร้างอะลูมิเนียมสูญเสียความแข็งแรงไปแล้ว หากนำไปกลึงซ่อมแล้วนำมาวิ่งตกหลุมซ้ำอีกรอบ ล้อแม็กจะ "แตกหลุดออกเป็นชิ้นๆ" เสี่ยงรถพลิกคว่ำทันทีครับ</p>

<div class="my-8">
  <div class="aspect-w-16 aspect-h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 p-8">
    <svg class="w-12 h-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
    <p class="text-slate-500 font-medium text-center">ภาพผลงานจริง: ช่วยเหลือลูกค้าเปลี่ยนยางอะไหล่ เคสแม็กดุ้งยางแตก<br/>(พื้นที่สำหรับแทรกรูปภาพผลงานจริงจากร้าน)</p>
  </div>
  <p class="text-sm text-center text-slate-500 mt-2"><em>เคสจริง: ลูกค้าตกหลุมบ่อหน้าไซต์งานก่อสร้างเส้นศรีนครินทร์ แม็กดุ้งจนยางขอบ 18 นิ้ว ลมรั่วออกหมด ช่าง PORNPISIT BATTERY เข้าบริการถอดเปลี่ยนใส่ล้ออะไหล่ให้ เพื่อให้ประคองรถกลับได้</em></p>
</div>

<h2>วิธีแก้ปัญหาเฉพาะหน้า เมื่อตกหลุมแม็กดุ้ง ยางแบน</h2>
<p>ถ้าเกิดเหตุตอนดึก ลมยางรั่วออกหมดเพราะขอบแม็กเผยอ สิ่งที่คุณต้องทำคือ:</p>
<ol class="list-decimal pl-6 space-y-4 mb-6">
  <li><strong>ห้ามฝืนขับบดล้อเด็ดขาด:</strong> การฝืนขับบดล้อแม็กเปล่าๆ ไปกับพื้นถนน จะทำให้ก้านแม็กแตก ช่วงล่างพัง และอาจเกิดประกายไฟได้ ให้จอดรถชิดซ้ายทันที</li>
  <li><strong>เปลี่ยนยางอะไหล่ (ถ้ามี):</strong> หากลมรั่วออกหมด ให้ใช้แม่แรงยกรถและถอดล้อแม็กวงที่ดุ้งออก แล้วนำ <strong>"ยางอะไหล่" (Spare Tire)</strong> มาใส่แทนเพื่อขับประคองรถกลับบ้าน</li>
  <li><strong>เรียกช่างปะยางนอกสถานที่:</strong> ถ้าคุณไม่มีแม่แรง ถอดล้อไม่เป็น หรือจุดที่จอดมืดและอันตราย (เช่น บนสะพานข้ามแยก) ให้รีบโทรเรียก <a href="/mobile-tire-repair" class="text-orange-600 font-semibold hover:underline">ช่างเปลี่ยนยางอะไหล่นอกสถานที่</a> มาจัดการให้ครับ ปลอดภัยที่สุด</li>
</ol>

<div class="not-prose relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-orange-200/60 dark:border-orange-500/20 text-center my-8 sm:my-10 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/10">
  <div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-15 blur-3xl"></div>
  <div class="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-10 blur-3xl"></div>
  <div class="relative z-10 max-w-2xl mx-auto">
    <div class="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
      <span>บริการเปลี่ยนยางอะไหล่ 24 ชม.</span>
    </div>
    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-3 leading-tight">ตกหลุม แม็กดุ้ง ยางแบนกลางดึก? โทรหาเราสิครับ!</h3>
    <p class="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">จอดเสียในที่มืดมันอันตรายกว่าที่คิด! PORNPISIT BATTERY พร้อมส่งช่างไป <strong>เปลี่ยนยางอะไหล่ให้คุณถึงที่</strong> โซนศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ แพรกษา ถึงไวใน 30 นาที!</p>
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <a href="tel:0996731296" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>โทรเรียกช่างด่วน 099-673-1296</span>
      </a>
      <a href="https://lin.ee/OBB86S4" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ส่งพิกัดมาเลย</span>
      </a>
    </div>
    <a href="/mobile-tire-repair" class="inline-block mt-4 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium underline underline-offset-4 decoration-orange-300 dark:decoration-orange-700 hover:decoration-orange-500 transition-colors">ดูบริการปะยาง/เปลี่ยนยางอะไหล่ &rarr;</a>
  </div>
</div>

<h2>FAQ: คำถามที่พบบ่อย (ล้อแม็กดุ้ง)</h2>
<div class="space-y-6 mt-6">
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: แม็กดุ้ง เคลมประกันชั้น 1 ได้ไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> เคลมได้ 100% ครับ! หากเกิดจากอุบัติเหตุขับตกหลุมหรือเบียดฟุตบาท แต่คุณต้องจำวันเวลาและสถานที่เกิดเหตุให้ชัดเจนเพื่อแจ้งพนักงานเคลม หากแม็กซ่อมได้ประกันจะออกค่าซ่อมให้ แต่ถ้าแม็กแตกหรือดุ้งหนักประกันจะเปลี่ยนวงใหม่ให้ตามสเปคเดิมครับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: แม็กซ่อมดัดดุ้งมาแล้ว จะแข็งแรงเหมือนเดิมไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ไม่แข็งแรง 100% เหมือนของใหม่จากโรงงานครับ อะลูมิเนียมที่ผ่านการดัดและให้ความร้อน โครงสร้างโลหะจะล้าลง หากนำไปตกหลุมแรงๆ ในจุดเดิมอีกครั้ง มีโอกาสสูงมากที่แม็กจะดุ้งง่ายกว่าเดิม หรือร้าวแตกได้เลยครับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ตกหลุมแล้วยางไม่แบน แต่แม็กดุ้ง ขับต่อได้ไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ถ้าดุ้งแค่นิดเดียว ลมยางไม่รั่วซึม (เช็กด้วยการเอาน้ำสบู่ลูบดู) สามารถขับประคองกลับบ้านหรือไปอู่ได้ครับ แต่ไม่ควรขับเร็วเกิน 60 กม./ชม. เพราะล้อที่เสียศูนย์จะทำให้ลูกปืนล้อและช่วงล่างพังตามไปด้วยครับ</p>
  </div>
</div>

<!-- FAQ Schema Markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "แม็กดุ้ง เคลมประกันชั้น 1 ได้ไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "เคลมได้ 100% หากเกิดจากอุบัติเหตุตกหลุมหรือเบียดฟุตบาท ต้องจำสถานที่และเวลาเกิดเหตุให้ชัดเจนเพื่อแจ้งพนักงานเคลม"
      }
    },
    {
      "@type": "Question",
      "name": "แม็กซ่อมดัดดุ้งมาแล้ว จะแข็งแรงเหมือนเดิมไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ไม่แข็งแรงเท่าเดิม โครงสร้างอะลูมิเนียมที่ผ่านความร้อนและการดัดจะล้าลง หากตกหลุมซ้ำจะมีโอกาสดุ้งหรือร้าวแตกได้ง่ายกว่าของใหม่"
      }
    },
    {
      "@type": "Question",
      "name": "ตกหลุมแล้วยางไม่แบน แต่แม็กดุ้ง ขับต่อได้ไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ถ้าลมยางไม่รั่วซึม สามารถขับประคองช้าๆ กลับบ้านได้ (ไม่เกิน 60 กม./ชม.) แต่ถ้ารั่วซึมหรือพวงมาลัยสั่นหนัก ควรเปลี่ยนใส่ยางอะไหล่ทันที"
      }
    }
  ]
}
</script>
`;

const postData = {
  slug: "bent-rim-guide-repair-or-replace",
  title: "ล้อแม็กดุ้ง อาการเป็นอย่างไร? ตกหลุมแรงซ่อมได้ไหม (อัปเดต 2026)",
  content: htmlContent,
  excerpt: "ขับรถตกหลุมอย่างแรงจนพวงมาลัยสั่น ลมยางซึม! นี่คืออาการ 'ล้อแม็กดุ้ง' ชัวร์! มาดูกันว่าแม็กดุ้งแบบไหนซ่อมดัดได้ แบบไหนต้องโยนทิ้ง พร้อมวิธีเคลมประกัน",
  coverImage: "/images/blog/pig-bent-rim-guide-cover.svg",
  category: "ความรู้เรื่องยาง",
  published: true,
  seoTitle: "แม็กดุ้ง ซ่อมได้ไหม อาการแม็กดุ้ง เคลมประกัน | PORNPISIT BATTERY",
  seoDescription: "ล้อแม็กดุ้ง จากการตกหลุมอย่างแรง อาการเป็นอย่างไร ซ่อมดัดแม็กได้ไหม หรือต้องเปลี่ยนใหม่ พร้อมบริการเปลี่ยนยางอะไหล่ ศรีนครินทร์ บางนา แบริ่ง 24 ชม.",
  seoKeywords: "แม็กดุ้ง,ล้อแม็กดุ้ง,แม็กดุ้งซ่อมได้ไหม,อาการแม็กดุ้ง,ตกหลุมแม็กดุ้ง,ดัดแม็กดุ้ง,เคลมประกัน แม็กดุ้ง,เปลี่ยนยางอะไหล่,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "ตกหลุมอย่างแรง 'แม็กดุ้ง' ซ่อมได้ไหม? หรือต้องทิ้ง!",
  ogDescription: "พวงมาลัยสั่น ลมยางรั่วซึม สัญญาณเตือนล้อแม็กดุ้ง! ตอบชัดๆ อาการไหนกลึงซ่อมได้ อาการไหนห้ามซ่อมเด็ดขาด",
};

async function main() {
  console.log("Seeding SEO optimized 'bent rim guide' post...");
  
  try {
    const existing = await prisma.post.findUnique({ where: { slug: postData.slug } });
    if (existing) {
      console.log(`⏭️ Post already exists, skipping: ${postData.title}`);
      return;
    }
    const post = await prisma.post.create({ data: postData });
    console.log("✅ Successfully seeded post:", post.title);
  } catch (error) {
    console.error("❌ Error seeding post:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
