import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>ไดชาร์จไหม้ สังเกตยังไง? 4 สัญญาณเตือนก่อนรถดับกลางอากาศ</h1>
<p>ถ้าคุณกำลังขับรถอยู่ดีๆ แล้วได้กลิ่นเหม็นไหม้คล้ายพลาสติกหรือสายไฟลอยเข้ามาในห้องโดยสาร ตามด้วยแอร์เริ่มไม่เย็น และมีไฟรูปแบตเตอรี่สีแดงโชว์หราบนหน้าปัด อาการแบบนี้อันตรายมากครับ เพราะนี่คือสัญญาณเตือนว่า <strong>ไดชาร์จไหม้</strong> อย่างรวดเร็ว! สำหรับผู้ที่ใช้รถเดินทางในโซน <strong>ศรีนครินทร์ บางนา แบริ่ง ลาซาล หรือเส้นสุขุมวิท</strong> ที่รถติดหนักๆ ความร้อนสะสมในห้องเครื่องจะเป็นตัวเร่งให้อาการนี้เกิดเร็วขึ้นครับ</p>

<p>บทความนี้ FIRSTCARCENTER จะพาไปดูเคสจริงจากการออกไปกู้ภัยรถเสียหน้างาน ว่าเราจะรู้ได้อย่างไรว่า <strong>ไดชาร์จไหม้</strong> ซ่อมได้ไหม หรือว่าต้องเปลี่ยนใหม่ เพื่อให้คุณรับมือกับสถานการณ์ฉุกเฉินได้อย่างปลอดภัยที่สุดครับ</p>

<img src="/images/blog/pig-alternator-burnt-cover.svg" alt="ไดชาร์จไหม้ อาการไดชาร์จเสีย เปลี่ยนไดชาร์จ ศรีนครินทร์ บางนา แบริ่ง" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: เมื่อขดลวดในไดชาร์จไหม้ จะมีกลิ่นเหม็นรุนแรงและทำให้รถดับกลางอากาศได้</em></p>

<h2>อาการ ไดชาร์จไหม้ เป็นอย่างไร? เช็กด่วนก่อนรถดับ</h2>
<p>เมื่อ <strong>ไดชาร์จรถยนต์</strong> ทำงานหนักเกินไป (Overload) หรือลูกปืนเสื่อมสภาพจนเกิดความร้อนสะสม จะทำให้ขดลวดทองแดงด้านในละลายหรือไหม้ได้ อาการที่พบได้บ่อยมีดังนี้ครับ:</p>

<h3>1) มีกลิ่นเหม็นไหม้ทะลุเข้าช่องแอร์</h3>
<p>นี่คืออาการที่ชัดเจนที่สุดครับ กลิ่นจะคล้ายๆ ยางหรือพลาสติกไหม้รุนแรงมาก ถ้าคุณได้กลิ่นนี้ ให้รีบหาที่จอดรถในที่ปลอดภัยทันที เพราะถ้าฝืนขับต่อ สายไฟอาจจะชอร์ตและลุกลามเป็นอันตรายได้</p>

<h3>2) เสียงหอนดังผิดปกติจากหน้าเครื่อง</h3>
<p>ก่อนที่ไดชาร์จจะไหม้ มักจะมีการเตือนล่วงหน้าด้วยเสียง "หอน" ดังวี้ๆ ตามรอบคันเร่ง ซึ่งเกิดจากลูกปืนไดชาร์จแตก พอฝืนขับต่อไป ความร้อนจะสูงปรี๊ดจนทำให้ขดลวดไหม้ในที่สุด</p>

<h3>3) ไฟรูปแบตเตอรี่โชว์ค้าง + แอร์ไม่เย็น</h3>
<p>เมื่อขดลวดไหม้ ไดชาร์จจะหยุดผลิตกระแสไฟทันที (รถจะไม่ชาร์จไฟเข้าแบต) ระบบรถจะพยายามตัดไฟส่วนที่ไม่จำเป็นทิ้ง เช่น คอมเพรสเซอร์แอร์ (ทำให้แอร์มีแต่ลมร้อน) วิทยุดับ หน้าปัดรวน เพื่อประหยัดไฟแบตเตอรี่ให้รถยังพอวิ่งต่อไปได้อีกนิดหน่อย</p>

<h2>Case Study: กระบะ Isuzu D-Max ไดชาร์จไหม้ หน้าตลาดหนามแดง</h2>
<p>เมื่อปลายเดือนที่ผ่านมา ทีมช่างของเราได้รับสายด่วนจากลูกค้าที่ขับรถกระบะส่งของแถว <strong>หน้าตลาดหนามแดง ถนนเทพารักษ์</strong> ลูกค้าแจ้งว่า "รถดับกลางถนน แอร์ร้อน และมีกลิ่นเหม็นไหม้แรงมากออกมาจากฝากระโปรงรถ" คิดว่าเครื่องฮีตหรือไฟไหม้ห้องเครื่อง</p>

<p>เมื่อช่างของ FIRSTCARCENTER ไปถึงหน้างานและเปิดฝากระโปรงเช็ก พบว่าต้นตอของกลิ่นมาจากตัวไดชาร์จโดยตรง สีของขดลวดทองแดงเปลี่ยนเป็นสีดำคล้ำและมีรอยละลายชัดเจน (ชอร์ตเทิร์น) สาเหตุหลักมาจากการที่ลูกค้าติดไฟสปอร์ตไลท์และตู้เครื่องเสียงเพิ่มเติม ทำให้ไดชาร์จสเปกเดิมทำงานเกินกำลังมาตลอด 2-3 ปี</p>

<p>เคสนี้ ซ่อมไม่ได้ครับ ช่างจึงเสนอให้ <strong>เปลี่ยนไดชาร์จบิ้วขนาด 90 แอมป์</strong> (อัปเกรดให้สูงขึ้น) เพื่อรองรับระบบไฟที่แต่งเพิ่มไป หลังทำการถอดประกอบและเปลี่ยนเสร็จ รถก็กลับมาสตาร์ทติด ระบบไฟชาร์จเข้าแบตเตอรี่เต็มกำลัง ลูกค้าสามารถขับรถไปส่งของต่อได้ทันทีครับ</p>

<div class="my-8">
  <div class="aspect-w-16 aspect-h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 p-8">
    <svg class="w-12 h-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2 1.586-1.586a2 2 0 012.828 0L20 14m-6-10h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    <p class="text-slate-500 font-medium text-center">ภาพผลงานจริง: เปลี่ยนไดชาร์จ Isuzu D-Max อาการขดลวดไหม้ หน้าตลาดหนามแดง<br/>(พื้นที่สำหรับแทรกรูปรถลูกค้าจริง)</p>
  </div>
  <p class="text-sm text-center text-slate-500 mt-2"><em>เคสจริง: ตรวจเช็กระบบไฟอย่างละเอียด เพื่อหาสาเหตุที่แท้จริง ไม่ให้เกิดปัญหาซ้ำซ้อน</em></p>
</div>

<h2>ไดชาร์จไหม้ ซ่อมได้ไหม? ทำไมถึงแนะนำให้เปลี่ยน</h2>
<p>หลายคนมักจะถามว่า ถ้าขดลวดไหม้ เอาไป "พันขดลวดใหม่" (Rewind) ได้ไหม? คำตอบคือ <strong>ทำได้แต่ไม่คุ้มและไม่จบครับ</strong></p>
<ul class="list-disc pl-6 space-y-3">
  <li>การพันขดลวดทองแดงใหม่ด้วยมือ มักจะได้ค่าความต้านทานไม่นิ่งเท่ากับการผลิตจากโรงงาน</li>
  <li>เมื่อไดชาร์จร้อนจัดจนขดลวดไหม้ ชิ้นส่วนรอบข้างอย่าง ไดโอด (Diode) และ คัทเอาท์ (IC) มักจะได้รับความเสียหายหรือเสื่อมสภาพตามไปด้วย</li>
</ul>

<p>ดังนั้น ทางออกที่ดีและจบปัญหา 100% คือการ <strong>เปลี่ยนไดชาร์จใหม่</strong> ไม่ว่าจะเป็น "ไดชาร์จบิ้วโรงงาน" (Rebuilt) ที่ราคาย่อมเยา หรือ "ของแท้เบิกศูนย์" ก็จะช่วยให้ระบบไฟกลับมาสมบูรณ์เหมือนเดิมครับ (อ่านเพิ่มเติมเรื่องการประเมินราคาซ่อมได้ที่: <a href="/posts/alternator-repair-price-guide" class="text-blue-600 font-semibold hover:underline">ซ่อมไดชาร์จราคา เท่าไหร่?</a>)</p>

<img src="/images/blog/pig-alternator-burnt-info.svg" alt="อาการไดชาร์จไหม้ ซ่อมไดชาร์จหรือเปลี่ยนใหม่ดี เทพารักษ์ แพรกษา สมุทรปราการ" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: 4 สัญญาณเตือนสำคัญ หากพบอาการเหล่านี้ควรรีบจอดรถทันทีเพื่อความปลอดภัย</em></p>

<p>ถ้าคุณจอดเสียอยู่แถว <strong>บางนา แพรกษา หรือสมุทรปราการ</strong> อย่าลืมนะครับว่าแบตเตอรี่อาจจะถูกดึงไฟไปใช้จนหมดแล้วเช่นกัน ทีมช่างของเราจะทำการจั๊มสตาร์ทและเช็กค่า <a href="/battery-replacement" class="text-blue-600 font-semibold hover:underline">แบตเตอรี่รถยนต์</a> ให้ฟรีทุกครั้งหลังเปลี่ยนไดชาร์จ เพื่อความมั่นใจก่อนออกเดินทางต่อ</p>

<div class="not-prose relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-red-200/60 dark:border-red-500/20 text-center my-8 sm:my-10 shadow-lg shadow-red-100/50 dark:shadow-red-900/10">
  <div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-red-500 to-rose-600 rounded-full opacity-15 blur-3xl"></div>
  <div class="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full opacity-10 blur-3xl"></div>
  <div class="relative z-10 max-w-2xl mx-auto">
    <div class="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/></svg>
      <span>ช่างไดนาโมมืออาชีพ วิ่งถึงที่</span>
    </div>
    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-3 leading-tight">มีกลิ่นไหม้? รถดับกลางทาง? โทรเรียกเราด่วน!</h3>
    <p class="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">FIRSTCARCENTER มีบริการเช็กระบบไฟ เปลี่ยนไดชาร์จ ไดสตาร์ท และแบตเตอรี่นอกสถานที่ ครอบคลุม ศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</p>
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <a href="tel:0887671679" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>โทรเรียกช่างฉุกเฉิน 088-767-1679</span>
      </a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ปรึกษาช่างฟรี</span>
      </a>
    </div>
    <a href="/alternator-starter" class="inline-block mt-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium underline underline-offset-4 decoration-red-300 dark:decoration-red-700 hover:decoration-red-500 transition-colors">ดูรายละเอียดบริการซ่อมไดชาร์จ &rarr;</a>
  </div>
</div>

<h2>FAQ: คำถามที่พบบ่อย (ไดชาร์จไหม้)</h2>
<div class="space-y-6 mt-6">
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ขับรถอยู่แล้วได้กลิ่นเหม็นไหม้ ควรทำอย่างไร?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ควรหาที่จอดข้างทางที่ปลอดภัยทันที ปิดแอร์ ปิดเครื่องเสียง และดับเครื่องยนต์เพื่อตัดระบบไฟทั้งหมด จากนั้นรีบติดต่อช่างผู้ชำนาญการเพื่อเข้าตรวจเช็ก ห้ามฝืนขับต่อเด็ดขาดครับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ไดชาร์จไหม้ เกิดจากสาเหตุอะไรได้บ้าง?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> สาเหตุหลักคือการใช้งานเกินกำลัง (Overload) เช่น ติดตั้งเครื่องเสียงหรือไฟสปอร์ตไลท์มากเกินไป หรือเกิดจากแบตเตอรี่เสื่อมสภาพอย่างหนัก ทำให้ไดชาร์จต้องปั่นไฟตลอดเวลาจนขดลวดละลาย</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: รถดับอยู่แถวเทพารักษ์ มีบริการเปลี่ยนไดชาร์จถึงที่ไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> มีครับ! FIRSTCARCENTER ให้บริการซ่อมและเปลี่ยนไดชาร์จนอกสถานที่ ครอบคลุมโซน เทพารักษ์ ศรีนครินทร์ บางนา แบริ่ง สมุทรปราการ ช่วยประหยัดค่ารถลากได้ครับ</p>
  </div>
</div>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ขับรถอยู่แล้วได้กลิ่นเหม็นไหม้ ควรทำอย่างไร?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ควรหาที่จอดข้างทางที่ปลอดภัยทันที ปิดแอร์ ปิดเครื่องเสียง และดับเครื่องยนต์เพื่อตัดระบบไฟทั้งหมด จากนั้นรีบติดต่อช่างผู้ชำนาญการเพื่อเข้าตรวจเช็ก ห้ามฝืนขับต่อเด็ดขาดครับ"
      }
    },
    {
      "@type": "Question",
      "name": "ไดชาร์จไหม้ เกิดจากสาเหตุอะไรได้บ้าง?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "สาเหตุหลักคือการใช้งานเกินกำลัง (Overload) เช่น ติดตั้งเครื่องเสียงหรือไฟสปอร์ตไลท์มากเกินไป หรือเกิดจากแบตเตอรี่เสื่อมสภาพอย่างหนัก ทำให้ไดชาร์จต้องปั่นไฟตลอดเวลาจนขดลวดละลาย"
      }
    },
    {
      "@type": "Question",
      "name": "รถดับอยู่แถวเทพารักษ์ มีบริการเปลี่ยนไดชาร์จถึงที่ไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "มีครับ! FIRSTCARCENTER ให้บริการซ่อมและเปลี่ยนไดชาร์จนอกสถานที่ ครอบคลุมโซน เทพารักษ์ ศรีนครินทร์ บางนา แบริ่ง สมุทรปราการ ช่วยประหยัดค่ารถลากได้ครับ"
      }
    }
  ]
}
</script>
`;

const postData = {
  slug: "alternator-burnt-repair-guide",
  title: "ไดชาร์จไหม้ สังเกตยังไง? 4 สัญญาณเตือนก่อนรถดับกลางอากาศ",
  content: htmlContent,
  excerpt: "ไดชาร์จไหม้ เกิดจากอะไร? สังเกตอาการกลิ่นเหม็นไหม้ ไฟแบตโชว์ พร้อมรีวิวเคสเปลี่ยนไดชาร์จหน้างานจริง ศรีนครินทร์ บางนา แบริ่ง เทพารักษ์",
  coverImage: "/images/blog/pig-alternator-burnt-cover.svg",
  category: "ไดชาร์จ ไดสตาร์ท",
  published: true,
  seoTitle: "ไดชาร์จไหม้ สังเกตยังไง? ซ่อมได้ไหม | FIRSTCARCENTER",
  seoDescription: "ไดชาร์จไหม้ อาการเป็นยังไง? มีกลิ่นเหม็นไหม้ทะลุแอร์ รถดับกลางทาง ซ่อมได้ไหมหรือต้องเปลี่ยนใหม่ บริการนอกสถานที่ บางนา ศรีนครินทร์ เทพารักษ์ สมุทรปราการ",
  seoKeywords: "ไดชาร์จไหม้,อาการไดชาร์จเสีย,เปลี่ยนไดชาร์จ,ไดชาร์จรถยนต์,ซ่อมไดชาร์จ,กลิ่นเหม็นไหม้,รถดับกลางทาง,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "ไดชาร์จไหม้! สัญญาณอันตรายก่อนรถดับกลางอากาศ",
  ogDescription: "แชร์เคสจริง รถมีกลิ่นเหม็นไหม้ แอร์ไม่เย็น สรุปเป็นเพราะไดชาร์จไหม้ พร้อมแนะนำวิธีรับมือและเปลี่ยนใหม่หน้างาน",
};

async function main() {
  console.log("Seeding SEO optimized 'alternator burnt' post...");

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
