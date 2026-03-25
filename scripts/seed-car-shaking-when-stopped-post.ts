import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>รถติดแล้วเครื่องสั่น เปิดแอร์รอบตก อาการแบบนี้เกิดจากอะไร? (อัปเดต 2026)</h1>
<p>ช่วงเวลาเร่งด่วนเช้า-เย็น ขับรถไปทำงานเจอรถติดหนึบแถว <strong>ศรีนครินทร์ สุขุมวิท หรือ บางนา</strong> พอเหยียบเบรกจอดนิ่งๆ อยู่กับที่ จู่ๆ <strong>รถติดเครื่องสั่น</strong> พวงมาลัยสั่นเป็นเจ้าเข้า ยิ่งพอคอมแอร์ตัดต่อทำงาน (เปิดแอร์) รอบเครื่องยิ่งตกฮวบจนรถเหมือนจะดับ... เชื่อว่าคนใช้รถหลายคนต้องเคยเจอประสบการณ์ชวนลุ้นแบบนี้แน่นอนครับ</p>

<p>อาการ <strong>เปิดแอร์แล้วเครื่องสั่น รอบตก</strong> ไม่ใช่เรื่องปกติที่ควรปล่อยผ่านครับ เพราะมันเป็นสัญญาณเตือนว่ามี "ชิ้นส่วนบางอย่าง" ในห้องเครื่องกำลังจะหมดอายุขัย วันนี้ช่างจาก FIRSTCARCENTER จะมาสรุปให้ฟังแบบเข้าใจง่ายๆ ว่าอาการนี้เกิดจากอะไร? เกี่ยวกับแบตเตอรี่เสื่อมไหม? และมีวิธีแก้อย่างไรครับ</p>

<img src="/images/blog/pig-car-shaking-when-stopped-cover.svg" alt="รถติดเครื่องสั่น เปิดแอร์รอบตก แบตเสื่อมไหม ศรีนครินทร์ บางนา" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: อาการรถสั่นตอนจอดติดไฟแดงหรือตอนคอมแอร์ทำงาน เป็นปัญหายอดฮิตที่เจอบ่อยมาก</em></p>

<h2>4 สาเหตุหลัก ที่ทำให้ "รถติดเครื่องสั่น เปิดแอร์รอบตก"</h2>
<p>อาการเครื่องสั่นตอนจอดนิ่งๆ (เกียร์ D เหยียบเบรก หรือเกียร์ N) มักเกิดจากระบบชดเชยรอบเครื่องยนต์ หรือระบบจุดระเบิดทำงานได้ไม่สมบูรณ์ ลองมาดูผู้ต้องหาหลัก 4 ตัวกันครับ:</p>

<h3>1. ลิ้นปีกผีเสื้อ (Throttle Body) สกปรก</h3>
<p>สาเหตุยอดฮิตอันดับ 1! ลิ้นปีกผีเสื้อมีหน้าที่เปิดรับอากาศเข้าเครื่องยนต์ พอใช้รถไปนานๆ จะมีคราบเขม่าและฝุ่นน้ำมันไปเกาะขอบลิ้น ทำให้ลิ้นปิด-เปิดไม่สนิท อากาศเข้าไม่พอดีกับรอบเดินเบา พอคอมแอร์ทำงาน (ซึ่งต้องการกำลังเครื่องเพิ่ม) กล่อง ECU สั่งชดเชยรอบไม่ทัน ทำให้ <strong>รอบตก เครื่องสั่นกระพือ</strong> ทันทีครับ</p>
<p><strong>วิธีแก้:</strong> ถอดลิ้นปีกผีเสื้อออกมาล้างทำความสะอาด และทำการ Reset/Learning ค่าลิ้นปีกผีเสื้อใหม่</p>

<h3>2. ยางแท่นเครื่อง / ยางแท่นเกียร์ ทรุดหรือขาด</h3>
<p>ยางแท่นเครื่องมีหน้าที่ซับแรงสั่นสะเทือนจากเครื่องยนต์ไม่ให้ส่งเข้ามาในห้องโดยสาร อายุการใช้งานปกติจะอยู่ราวๆ 80,000 - 100,000 กิโลเมตร ถ้ายางตัวนี้ขาดหรือทรุด (เนื้อยางแข็งกระด้าง) เวลาจอดรถนิ่งๆ แถว <strong>ลาซาล หรือ แบริ่ง</strong> คุณจะรู้สึกได้เลยว่าพวงมาลัยและคอนโซลหน้าสั่นสะท้านไปหมด ยิ่งเข้าเกียร์ D แล้วเหยียบเบรกยิ่งสั่นแรงครับ</p>

<img src="/images/blog/pig-car-shaking-when-stopped-info.svg" alt="เครื่องสั่น รอบตก เช็กเครื่องยนต์ ลิ้นปีกผีเสื้อสกปรก สมุทรปราการ" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h3>3. คอยล์จุดระเบิด หรือ หัวเทียนเสื่อมสภาพ</h3>
<p>ถ้ารถสั่นแบบกระตุกๆ ปุ่บๆๆๆ เหมือนเครื่องเดินไม่เต็มสูบ เร่งไม่ค่อยขึ้น และบางทีมีไฟรูปเครื่องยนต์ (Check Engine) โชว์ขึ้นมาด้วย อาการนี้มักเกิดจากคอยล์จุดระเบิดร้าว หรือหัวเทียนบอด ทำให้จุดระเบิดไม่ครบ 4 สูบ เครื่องยนต์เลยเสียสมดุลและสั่นครับ</p>

<h3>4. แบตเตอรี่เสื่อม หรือ ไดชาร์จมีปัญหา (เกี่ยวยังไง?)</h3>
<p>หลายคนสงสัยว่า <strong>แบตเสื่อมทำให้เครื่องสั่นไหม?</strong> คำตอบคือ "มีส่วนครับ" เมื่อแบตเตอรี่เสื่อมสภาพ (เก็บไฟไม่อยู่) หรือไดชาร์จเริ่มปั่นไฟได้น้อยลง ระบบไฟในรถจะไม่เสถียร พอพัดลมหม้อน้ำและคอมเพรสเซอร์แอร์ทำงานพร้อมกัน จะเกิดการกระชากไฟอย่างหนัก ไดชาร์จต้องออกแรงหน่วงเครื่องยนต์มากขึ้น ทำให้รอบเครื่องตกวูบและเครื่องสั่นได้ครับ (อ่านเพิ่มเติม: <a href="/posts/how-to-check-alternator-guide" class="text-orange-600 font-semibold hover:underline">วิธีเช็คไดชาร์จด้วยตัวเอง</a>)</p>

<div class="my-8">
  <div class="aspect-w-16 aspect-h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 p-8">
    <svg class="w-12 h-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    <p class="text-slate-500 font-medium text-center">ภาพผลงานจริง: บริการเช็กระบบไฟ และเปลี่ยนแบตเตอรี่นอกสถานที่<br/>(พื้นที่สำหรับแทรกรูปภาพผลงานจริงจากร้าน)</p>
  </div>
  <p class="text-sm text-center text-slate-500 mt-2"><em>ตัวอย่างผลงาน: ลูกค้าแจ้งอาการเครื่องสั่นรอบตกตอนรถติด ช่าง FIRSTCARCENTER เข้าเช็กด้วยระบบคอมพิวเตอร์พบว่าแบตเตอรี่เสื่อมและจ่ายไฟไม่นิ่ง ทำการเปลี่ยนแบตลูกใหม่ อาการสั่นหายเป็นปลิดทิ้ง</em></p>
</div>

<h2>วิธีแก้ปัญหาเบื้องต้น เมื่อรถสั่นตอนรถติด</h2>
<ul class="list-disc pl-6 space-y-3 mb-6">
  <li><strong>เปลี่ยนเกียร์เป็น N:</strong> หากจอดติดไฟแดงนานๆ แถว <strong>เทพารักษ์ หรือ แพรกษา</strong> ให้เปลี่ยนเกียร์จาก D เป็น N เพื่อลดภาระการฉุดของเกียร์ จะช่วยให้เครื่องสั่นน้อยลง</li>
  <li><strong>ปิดแอร์ชั่วคราว:</strong> ถ้ารอบตกหนักมากจนรถทำท่าจะดับ ให้ปิด A/C (ปุ่มน้ำยาแอร์) ชั่วคราว เพื่อลดโหลดของเครื่องยนต์</li>
  <li><strong>เช็กระบบไฟ:</strong> หากไม่มั่นใจว่าเป็นที่อะไร ลองให้ช่างตรวจเช็กค่า CCA ของแบตเตอรี่ และแรงดันไดชาร์จดูครับ ว่ายังทำงานปกติหรือไม่</li>
</ul>

<div class="not-prose relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-orange-200/60 dark:border-orange-500/20 text-center my-8 sm:my-10 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/10">
  <div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-15 blur-3xl"></div>
  <div class="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-10 blur-3xl"></div>
  <div class="relative z-10 max-w-2xl mx-auto">
    <div class="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
      <span>บริการตรวจเช็กระบบไฟฟรี</span>
    </div>
    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-3 leading-tight">สงสัยว่าแบตเตอรี่เสื่อม ทำให้เครื่องสั่น? โทรหาเราเลย!</h3>
    <p class="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">FIRSTCARCENTER มีบริการวิ่งไปตรวจเช็กแบตเตอรี่ ไดชาร์จ ไดสตาร์ท ให้ถึงที่ โซนศรีนครินทร์ บางนา แบริ่ง สมุทรปราการ หากแบตเสื่อมเรามีแบตแท้เปลี่ยนให้ทันที รับประกัน 1-2 ปีเต็ม</p>
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <a href="tel:0887671679" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>โทรเรียกช่าง 088-767-1679</span>
      </a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ปรึกษาอาการฟรี</span>
      </a>
    </div>
    <a href="/battery-replacement" class="inline-block mt-4 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium underline underline-offset-4 decoration-orange-300 dark:decoration-orange-700 hover:decoration-orange-500 transition-colors">ดูบริการเปลี่ยนแบตเตอรี่ &rarr;</a>
  </div>
</div>

<h2>FAQ: คำถามที่พบบ่อย (รถติดเครื่องสั่น)</h2>
<div class="space-y-6 mt-6">
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: แบตเตอรี่เสื่อม ทำให้รอบตกเครื่องสั่นได้จริงไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> จริงครับ! ถ้าระบบไฟในรถไม่นิ่งเพราะแบตเสื่อม เวลาอุปกรณ์ที่กินไฟหนักๆ (เช่น พัดลมหม้อน้ำ, คอมแอร์) ทำงานพร้อมกัน ไดชาร์จจะต้องดึงกำลังจากเครื่องยนต์มาชดเชยไฟอย่างหนัก ทำให้รอบเครื่องตกวูบและสั่นได้ครับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ล้างลิ้นปีกผีเสื้อ ราคาประมาณเท่าไหร่?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ค่าบริการล้างลิ้นปีกผีเสื้อตามอู่ทั่วไปจะอยู่ที่ประมาณ 400 - 800 บาท (ขึ้นอยู่กับรุ่นรถและความยากง่ายในการถอด) ควรล้างทุกๆ 40,000 - 50,000 กิโลเมตร เพื่อป้องกันอาการรอบเดินเบาตกครับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ยางแท่นเครื่องเสีย ดูยังไง?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> สังเกตง่ายๆ คือ ตอนเข้าเกียร์ D แล้วเหยียบเบรกจอดติดไฟแดง รถจะสั่นสะท้านเข้ามาถึงพวงมาลัยและเบาะนั่ง แต่พอเปลี่ยนเป็นเกียร์ N อาการสั่นจะลดลงหรือหายไป แบบนี้ยางแท่นเครื่องทรุดแน่นอนครับ</p>
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
      "name": "แบตเตอรี่เสื่อม ทำให้รอบตกเครื่องสั่นได้จริงไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "จริงครับ ถ้าระบบไฟในรถไม่นิ่งเพราะแบตเสื่อม เวลาอุปกรณ์กินไฟหนักอย่างคอมแอร์ทำงาน ไดชาร์จต้องดึงกำลังเครื่องยนต์มาชดเชยไฟ ทำให้รอบตกและเครื่องสั่นได้"
      }
    },
    {
      "@type": "Question",
      "name": "ล้างลิ้นปีกผีเสื้อ ราคาประมาณเท่าไหร่?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ค่าบริการทั่วไปประมาณ 400 - 800 บาท แนะนำให้ล้างทำความสะอาดทุกๆ 40,000 - 50,000 กิโลเมตร เพื่อให้รอบเดินเบานิ่ง"
      }
    },
    {
      "@type": "Question",
      "name": "ยางแท่นเครื่องเสีย ดูยังไง?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "สังเกตตอนเข้าเกียร์ D แล้วเหยียบเบรกจอดนิ่งๆ รถจะสั่นสะท้านมาถึงพวงมาลัย แต่พอเปลี่ยนเป็นเกียร์ N อาการสั่นจะลดลงชัดเจน"
      }
    }
  ]
}
</script>
`;

const postData = {
  slug: "car-shaking-when-stopped-guide",
  title: "รถติดเครื่องสั่น เปิดแอร์รอบตก เกิดจากอะไร? แบตเสื่อมไหม? (2026)",
  content: htmlContent,
  excerpt: "จอดติดไฟแดงแล้วรถสั่นเป็นเจ้าเข้า! เปิดแอร์รอบตกเหมือนเครื่องจะดับ อาการนี้เกิดจากลิ้นปีกผีเสื้อ ยางแท่นเครื่อง หรือแบตเตอรี่เสื่อม? ดูวิธีแก้ที่นี่",
  coverImage: "/images/blog/pig-car-shaking-when-stopped-cover.svg",
  category: "เคล็ดลับดูแลรถยนต์",
  published: true,
  seoTitle: "รถติดเครื่องสั่น เปิดแอร์รอบตก เกิดจากอะไร วิธีแก้ | Firstcar",
  seoDescription: "จอดรถติดไฟแดงแล้วเครื่องสั่น เปิดแอร์รอบตก เช็ก 4 สาเหตุหลัก ลิ้นปีกผีเสื้อ ยางแท่นเครื่อง แบตเตอรี่เสื่อม พร้อมบริการเช็กระบบไฟนอกสถานที่ ศรีนครินทร์ บางนา",
  seoKeywords: "รถติดเครื่องสั่น,เปิดแอร์รอบตก,เปิดแอร์เครื่องสั่น,รอบเดินเบาตก,รถสั่นตอนจอด,ยางแท่นเครื่องทรุด,แบตเตอรี่เสื่อม เครื่องสั่น,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "รถติดแล้วเครื่องสั่น! เปิดแอร์รอบตก เช็กด่วน 4 จุดนี้",
  ogDescription: "เข้าเกียร์ D เหยียบเบรกแล้วพวงมาลัยสั่นสะท้าน อาการยอดฮิตที่คนใช้รถต้องเจอ เกิดจากอะไหล่ตัวไหนพัง แบตเสื่อมเกี่ยวไหม ดูคำตอบที่นี่",
};

async function main() {
  console.log("Seeding SEO optimized 'car shaking when stopped' post...");
  
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
