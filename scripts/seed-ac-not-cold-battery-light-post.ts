import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>แอร์ไม่เย็น ไฟแบตโชว์ ขับต่อได้ไหม? อาการนี้ "ไดชาร์จพัง" หรือเปล่า (อัปเดต 2026)</h1>
<p>อากาศร้อนๆ รถติดแหง็กอยู่บนถนน <strong>ศรีนครินทร์ หรือ สุขุมวิท</strong> จู่ๆ แอร์ในรถที่เคยเย็นฉ่ำก็เริ่มมีแต่แต่ลมร้อนออกมา พร้อมกับมี <strong>"ไฟรูปแบตเตอรี่สีแดงโชว์หราบนหน้าปัด"</strong>... เชื่อว่าใครเจอสถานการณ์แบบนี้ก็ต้องใจคอไม่ดี คิดว่าแบตเตอรี่หมดกลางอากาศแน่ๆ</p>

<p>แต่รู้หรือไม่ครับว่า อาการ <strong>แอร์ไม่เย็น ไฟแบตโชว์</strong> ส่วนใหญ่แล้ว "ไม่ได้เกิดจากแบตเตอรี่พัง" ครับ! วันนี้ช่างจาก FIRSTCARCENTER จะมาเฉลยให้ฟังว่าความจริงแล้วมันเกิดจากอะไร รถยังขับต่อได้ไหม หรือต้องจอดทันที ก่อนที่เครื่องยนต์จะดับกลางทางแถว <strong>บางนา หรือ ลาซาล</strong> ครับ</p>

<img src="/images/blog/pig-ac-not-cold-battery-light-cover.svg" alt="แอร์ไม่เย็น ไฟแบตโชว์ ไดชาร์จเสีย ขับต่อได้ไหม ศรีนครินทร์ บางนา" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: เมื่อไฟแบตเตอรี่โชว์พร้อมกับแอร์ไม่เย็น เป็นสัญญาณเตือนว่าระบบไฟในรถกำลังมีปัญหาขั้นวิกฤต</em></p>

<h2>ต้นเหตุของอาการ "แอร์ไม่เย็น + ไฟแบตโชว์"</h2>
<p>เมื่อเครื่องยนต์ทำงาน หน้าที่การจ่ายไฟให้ระบบต่างๆ ในรถ (รวมถึงการชาร์จไฟกลับเข้าแบตเตอรี่) จะเป็นหน้าที่ของ <strong>"ไดชาร์จ (Alternator)"</strong> ครับ ไม่ใช่หน้าที่ของแบตเตอรี่ ดังนั้นถ้าคุณขับรถอยู่ดีๆ แล้วเกิด 2 อาการนี้พร้อมกัน สาเหตุหลักคือ:</p>

<h3>1. ไดชาร์จพัง (Alternator Failure) - ผู้ต้องหาอันดับ 1</h3>
<p>เมื่อไดชาร์จเสีย มันจะไม่สามารถปั่นไฟไปเลี้ยงระบบต่างๆ ของรถได้ กล่อง ECU จึงต้องดึงไฟสำรองจาก "แบตเตอรี่" มาใช้แทน ซึ่งไฟสำรองนี้มีจำกัดมาก ระบบรถจะสั่ง "ตัดการทำงาน" ของระบบที่ไม่จำเป็นเพื่อประหยัดไฟ <strong>คอมเพรสเซอร์แอร์จึงถูกตัดการทำงานเป็นอันดับแรก</strong> ทำให้แอร์มีแต่ลมร้อน และไฟรูปแบตเตอรี่โชว์เพื่อเตือนว่า "ตอนนี้รถใช้ไฟจากแบตอยู่นะ ระบบชาร์จพังแล้ว!" (อ่านเพิ่มเติม: <a href="/posts/alternator-repair-cost-2026" class="text-orange-600 font-semibold hover:underline">เช็กราคาซ่อมไดชาร์จ อัปเดต 2026</a>)</p>

<h3>2. สายพานไดชาร์จขาด / หย่อน</h3>
<p>สายพานหน้าเครื่องมีหน้าที่หมุนทั้งไดชาร์จและคอมแอร์ หากสายพานเส้นนี้เกิดขาดกระจุย หรือหย่อนมากจนฟรีทิ้ง ทั้งไดชาร์จและคอมแอร์ก็จะไม่ทำงานพร้อมกัน ทำให้เกิดอาการไฟแบตโชว์และแอร์ไม่เย็นทันที อาการนี้มักมีเสียงดัง "เอี๊ยดๆ" นำมาก่อนครับ</p>

<div class="bg-red-50 dark:bg-slate-800/50 border-l-4 border-red-500 p-6 rounded-r-xl my-8">
  <h3 class="text-xl font-bold text-red-600 dark:text-red-400 mt-0 mb-3 flex items-center gap-2">
    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
    คำเตือน: หากไฟหน้าปัดโชว์รูปแบตเตอรี่
  </h3>
  <p class="text-slate-700 dark:text-slate-300 m-0">จำไว้เสมอว่า <strong>"ไฟรูปแบตเตอรี่ = ไดชาร์จมีปัญหา"</strong> ไม่ใช่แบตเตอรี่พัง (หลายคนเข้าใจผิดคิดว่าแบตหมด) ถ้ารถกำลังวิ่งอยู่แล้วไฟนี้ขึ้น แปลว่ารถกำลังนับถอยหลังรอเวลาแบตเกลี้ยงและเครื่องดับครับ</p>
</div>

<img src="/images/blog/pig-ac-not-cold-battery-light-info.svg" alt="สัญญาณเตือนไดชาร์จพัง ปิดแอร์ ปิดวิทยุ แบริ่ง สมุทรปราการ" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h2>ขับต่อได้ไหม? วิ่งได้อีกไกลแค่ไหน?</h2>
<p>ถ้าคุณกำลังขับผ่าน <strong>หน้าตลาดหนามแดง หรือ แยกเทพารักษ์</strong> แล้วไฟแบตโชว์แอร์ไม่เย็น คำถามคือ <em>"จะฝืนขับกลับบ้านได้ไหม?"</em></p>
<p><strong>คำตอบคือ: ขับต่อได้ แต่ได้ระยะทางสั้นๆ เท่านั้นครับ (ประมาณ 10-30 นาที ขึ้นอยู่กับว่าแบตเตอรี่ในรถคุณใหม่แค่ไหน)</strong> เพราะรถกำลังกินไฟจากแบตเตอรี่ล้วนๆ ไม่มีไฟชาร์จกลับเข้า ถ้าไฟหมดเมื่อไหร่ ระบบจุดระเบิดจะไม่ทำงาน รถจะกระตุก พวงมาลัยพาวเวอร์จะหนักเบรกแข็ง และ <strong>"รถดับกลางอากาศ"</strong> ทันที ซึ่งอันตรายมากครับ</p>

<h2>วิธีเอาตัวรอด (ทำทันทีเมื่อไฟแบตโชว์)</h2>
<ol class="list-decimal pl-6 space-y-4">
  <li><strong>ปิดระบบไฟฟ้าที่ไม่จำเป็นทั้งหมด:</strong> ปิดแอร์ (ปิดทั้งพัดลมและ A/C), ปิดวิทยุ, ปิดไฟตัดหมอก, ถอดสายชาร์จมือถือ เพื่อเซฟไฟในแบตเตอรี่ให้ใช้ได้นานที่สุดเพื่อเลี้ยงเครื่องยนต์</li>
  <li><strong>อย่าดับเครื่องเด็ดขาด:</strong> ถ้ารถยังวิ่งได้ ห้ามดับเครื่องยนต์เด็ดขาด เพราะถ้าดับแล้ว จะสตาร์ทไม่ติดอีกเลยเพราะไฟไม่พอหมุนไดสตาร์ท</li>
  <li><strong>ประคองรถเข้าซ้าย หรือหาที่จอดที่ปลอดภัย:</strong> รีบเลี้ยวเข้าปั๊มน้ำมันใกล้เคียง (เช่น ปั๊มเส้นแพรกษา หรือ ศรีนครินทร์) แล้วหาที่จอดเข้าซองให้เรียบร้อย</li>
  <li><strong>โทรเรียกช่างไดชาร์จนอกสถานที่:</strong> เมื่อจอดรถปลอดภัยแล้ว แนะนำให้เรียกช่างซ่อมไดชาร์จนอกสถานที่มาเช็กครับ ไม่ควรจ้างรถลากเพราะค่าใช้จ่ายสูงกว่า</li>
</ol>

<div class="my-8">
  <div class="aspect-w-16 aspect-h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 p-8">
    <svg class="w-12 h-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    <p class="text-slate-500 font-medium text-center">ภาพผลงานจริง: บริการเช็กและเปลี่ยนไดชาร์จนอกสถานที่ให้ลูกค้า<br/>(พื้นที่สำหรับแทรกรูปภาพผลงานจริงจากร้าน)</p>
  </div>
  <p class="text-sm text-center text-slate-500 mt-2"><em>เคสจริง: ลูกค้าวิ่งเส้นบางนา-ตราด แอร์ตัด ไฟแบตโชว์ โชคดีประคองรถเข้าปั๊มได้ทัน ช่างเราไปถึงเช็กพบว่าไดชาร์จไหม้ จึงทำการเปลี่ยนลูกใหม่ให้หน้างาน จบปัญหาใน 1 ชั่วโมง</em></p>
</div>

<div class="not-prose relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-orange-200/60 dark:border-orange-500/20 text-center my-8 sm:my-10 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/10">
  <div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-15 blur-3xl"></div>
  <div class="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-10 blur-3xl"></div>
  <div class="relative z-10 max-w-2xl mx-auto">
    <div class="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
      <span>บริการตรวจเช็กถึงที่ 24 ชม.</span>
    </div>
    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-3 leading-tight">สงสัยไดชาร์จพัง? อย่าฝืนขับจนรถดับ โทรปรึกษาเราด่วน!</h3>
    <p class="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">FIRSTCARCENTER ให้บริการซ่อมและเปลี่ยนไดชาร์จ ไดสตาร์ท แบตเตอรี่ นอกสถานที่ โซนศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ ถึงไว ประเมินอาการให้ฟรี!</p>
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <a href="tel:0887671679" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>โทรเรียกช่าง 088-767-1679</span>
      </a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ส่งรูปหน้าปัดให้ช่างดู</span>
      </a>
    </div>
    <a href="/alternator-starter" class="inline-block mt-4 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium underline underline-offset-4 decoration-orange-300 dark:decoration-orange-700 hover:decoration-orange-500 transition-colors">ดูบริการซ่อม/เปลี่ยนไดชาร์จ &rarr;</a>
  </div>
</div>

<h2>FAQ: คำถามที่พบบ่อย (ไฟแบตโชว์ แอร์ไม่เย็น)</h2>
<div class="space-y-6 mt-6">
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: แอร์ไม่เย็น เติมน้ำยาแอร์ช่วยได้ไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ถ้ามี <strong>"ไฟรูปแบตเตอรี่โชว์"</strong> ร่วมด้วย การเติมน้ำยาแอร์จะไม่ช่วยอะไรเลยครับ เพราะปัญหาไม่ได้อยู่ที่น้ำยาแอร์ขาด แต่อยู่ที่ระบบไฟไม่พอจนกล่อง ECU สั่งตัดการทำงานของคอมแอร์ ต้องแก้ที่ไดชาร์จก่อนครับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ต้องเปลี่ยนทั้งแบตเตอรี่และไดชาร์จพร้อมกันเลยไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ไม่จำเป็นเสมอไปครับ ถ้าคุณประคองรถมาจอดได้ทันก่อนที่แบตจะหมดเกลี้ยง หรือแบตเตอรี่เพิ่งเปลี่ยนมาใหม่ๆ ช่างจะทำการซ่อม/เปลี่ยนแค่ไดชาร์จ จากนั้นเอาแบตไปชาร์จไฟตู้ให้เต็ม ก็สามารถนำกลับมาใช้ต่อได้ครับ ประหยัดเงินไปได้เยอะ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ค่าแรงช่างมาเปลี่ยนไดชาร์จถึงที่ แพงกว่าเข้าอู่ไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ราคาอะไหล่และค่าแรงมาตรฐานใกล้เคียงกับเข้าอู่ครับ แต่สิ่งที่คุ้มกว่าคือ "คุณไม่ต้องเสียค่ารถสไลด์" (ซึ่งปกติราคา 1,500 - 2,500 บาท) เพื่อลากรถไปอู่ ช่างเราวิ่งไปจบงานให้ถึงหน้าบ้านหรือจุดที่รถเสียเลยครับ</p>
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
      "name": "แอร์ไม่เย็น เติมน้ำยาแอร์ช่วยได้ไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ถ้ามีไฟรูปแบตเตอรี่โชว์ร่วมด้วย การเติมน้ำยาแอร์จะไม่ช่วยอะไร เพราะปัญหาอยู่ที่ไดชาร์จเสียจนระบบไฟไม่พอ กล่อง ECU จึงสั่งตัดคอมเพรสเซอร์แอร์ ต้องซ่อมไดชาร์จก่อน"
      }
    },
    {
      "@type": "Question",
      "name": "ต้องเปลี่ยนทั้งแบตเตอรี่และไดชาร์จพร้อมกันเลยไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ไม่จำเป็นเสมอไป ถ้าแบตเตอรี่ยังใหม่และประคองรถจอดได้ทัน สามารถซ่อมหรือเปลี่ยนแค่ไดชาร์จ แล้วนำแบตเตอรี่ลูกเดิมไปชาร์จไฟให้เต็มก็ใช้งานต่อได้"
      }
    },
    {
      "@type": "Question",
      "name": "ค่าแรงช่างมาเปลี่ยนไดชาร์จถึงที่ แพงกว่าเข้าอู่ไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ราคามาตรฐานใกล้เคียงกัน แต่ลูกค้าจะประหยัดค่ารถสไลด์สำหรับลากรถไปอู่ได้หลักพันบาท เพราะช่างเราบริการซ่อมให้จบถึงหน้างานเลย"
      }
    }
  ]
}
</script>
`;

const postData = {
  slug: "ac-not-cold-battery-light-on-guide",
  title: "แอร์ไม่เย็น ไฟแบตโชว์ ขับต่อได้ไหม? เช็กสาเหตุไดชาร์จพัง (2026)",
  content: htmlContent,
  excerpt: "ขับรถอยู่ดีๆ แอร์กลายเป็นลมร้อน พร้อมไฟรูปแบตเตอรี่สีแดงโชว์บนหน้าปัด อาการแบบนี้ใช่แบตหมดไหม? ขับต่อได้อีกไกลแค่ไหน? ดูวิธีเอาตัวรอดด่วน",
  coverImage: "/images/blog/pig-ac-not-cold-battery-light-cover.svg",
  category: "ความรู้ระบบไฟฟ้ารถยนต์",
  published: true,
  seoTitle: "แอร์ไม่เย็น ไฟแบตโชว์ ขับต่อได้ไหม ไดชาร์จเสีย? | Firstcar",
  seoDescription: "แอร์ไม่เย็น มีไฟรูปแบตเตอรี่โชว์สีแดงเตือนบนหน้าปัด สัญญาณเตือนไดชาร์จพัง! แนะนำวิธีเอาตัวรอดก่อนรถดับ บริการซ่อมไดชาร์จนอกสถานที่ ศรีนครินทร์ บางนา",
  seoKeywords: "แอร์ไม่เย็นไฟแบตโชว์,ไฟแบตโชว์ แอร์ไม่เย็น,ไฟรูปแบตเตอรี่โชว์ ขับต่อได้ไหม,ไดชาร์จเสีย แอร์ไม่เย็น,ซ่อมไดชาร์จ,ไฟแบตโชว์หน้าปัด,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "แอร์ไม่เย็น + ไฟแบตโชว์ = ไดชาร์จพัง! ขับต่อได้ไหม?",
  ogDescription: "แอร์ตัดเป็นลมร้อนพร้อมไฟหน้าปัดรูปแบตเตอรี่เตือน อาการแบบนี้ไม่ได้แปลว่าแบตหมด เช็กสาเหตุและวิธีรับมือด่วนก่อนเครื่องดับกลางทาง",
};

async function main() {
  console.log("Seeding SEO optimized 'AC not cold battery light on' post...");
  
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
