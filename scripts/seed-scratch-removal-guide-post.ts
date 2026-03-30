import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>ขัดลบรอยขูดขีด รอยขนแมวบนสีรถ ทำเองได้ไหม? หรือต้องให้ช่าง (อัปเดต 2026)</h1>
<p>เชื่อว่าเจ้าของรถทุกคนต้องเคยเจอปัญหานี้ครับ... วันดีคืนดี เดินไปดูรถแล้วเจอ <strong>"รอยขูดขีด"</strong> เป็นเส้นยาวอยู่บนสีรถ! บางคนโดนรถข้างๆ เปิดประตูชน บางคนจอดรถในตลาดแถว <strong>หนามแดง หรือ ศรีนครินทร์</strong> แล้วโดนรถเข็นขูด หรือแค่ล้างรถผิดวิธีก็เกิด <strong>รอยขนแมว (Swirl Marks)</strong> เต็มตัวรถได้แล้ว</p>

<p>คำถามที่ลูกค้าถามช่าง PORNPISIT BATTERY บ่อยที่สุดก็คือ <strong>"รอยขูดขีดแบบนี้ ขัดออกได้ไหม?"</strong> วันนี้จะมาตอบให้ครบจบในบทความเดียว ตั้งแต่วิธีเช็กระดับรอยขูดขีด ขัดเองได้ไหม แบบไหนต้องให้ช่างทำ พร้อมเคล็ดลับป้องกันไม่ให้เกิดซ้ำครับ</p>

<img src="/images/blog/pig-scratch-removal-guide-cover.svg" alt="ขัดลบรอยขูดขีด รอยขนแมว ขัดสีรถ ศรีนครินทร์ บางนา แบริ่ง" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: รอยขูดขีดและรอยขนแมวบนสีรถ ปัญหาที่พบบ่อยที่สุดของเจ้าของรถ</em></p>

<h2>วิธีเช็กระดับรอยขูดขีด: "เล็บจิก" คือเครื่องมือที่ดีที่สุด!</h2>
<p>ก่อนจะตัดสินใจว่าจะขัดเอง หรือต้องส่งช่าง ให้ลองใช้ <strong>"วิธีเล็บจิก"</strong> เช็กดูก่อนครับ ง่ายมาก:</p>
<ul class="list-disc pl-6 space-y-3">
  <li><strong>เล็บลูบแล้วไม่สะดุดเลย:</strong> เป็นรอยผิวเผิน (ระดับ 1) ขัดออกได้ 100%</li>
  <li><strong>เล็บลูบแล้วสะดุดนิดๆ:</strong> รอยลึกถึงชั้นสี (ระดับ 2) ต้องขัดสี + แต้มสี</li>
  <li><strong>เล็บลูบแล้วสะดุดชัดเจน เห็นเป็นสีขาว/เทา:</strong> รอยลึกถึงเหล็กตัวถัง (ระดับ 3) ต้องพ่นสีใหม่</li>
</ul>

<h2>3 ระดับรอยขูดขีด: แบบไหนขัดได้ แบบไหนต้องพ่นสี</h2>

<h3>ระดับ 1: รอยขนแมว / รอยขีดข่วนผิวเผิน (Clear Coat Scratch)</h3>
<p>รอยขนแมว หรือ Swirl Marks เป็นรอยขีดข่วนเล็กๆ ละเอียดๆ ที่อยู่บน <strong>ชั้นเคลือบเงา (Clear Coat)</strong> ของสีรถเท่านั้น มักเกิดจากการล้างรถด้วยฟองน้ำสกปรก ผ้าเช็ดรถที่หยาบ หรือเครื่องล้างรถอัตโนมัติ พอโดนแสงแดดจะเห็นเป็นเส้นวงกลมเต็มไปหมด</p>

<p><strong>วิธีแก้:</strong> ใช้ <strong>สารขัดสี (Compound/Polish)</strong> กับเครื่องขัดสี (Dual Action Polisher) ขัดลงไปบนชั้นเคลือบเงาเพื่อปรับระดับผิวให้เรียบเนียน รอยขนแมวจะหายไปทั้งหมด สีรถจะกลับมาเงาวาวเหมือนรถป้ายแดงครับ</p>

<img src="/images/blog/pig-scratch-removal-guide-info.svg" alt="3 ระดับรอยขูดขีดบนสีรถ รอยขนแมว รอยลึก สุขุมวิท ลาซาล สมุทรปราการ" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h3>ระดับ 2: รอยขูดลึกถึงชั้นสี (Base Coat Scratch)</h3>
<p>รอยที่ลึกทะลุผ่านชั้นเคลือบเงา ลงไปถึงชั้นสี มักเกิดจากการโดนกิ่งไม้ครูด โดนรถเข็นในห้างฯ แถว <strong>ซีคอนสแควร์ หรือ เมกาบางนา</strong> ชน หรือเด็กเอาของมีคมขีด ลักษณะจะเห็นสีของรอยต่างจากสีรถรอบข้าง</p>

<p><strong>วิธีแก้:</strong> ขั้นตอนนี้ต้องทำ 2 ขั้นตอน คือ ขัดสีเพื่อลดความลึกของรอย แล้วจึง <strong>แต้มสี (Touch-Up Paint)</strong> เติมลงไปในร่องรอย จากนั้นขัดเกลาให้เรียบเนียน ถ้าทำโดยช่างมืออาชีพจะแทบมองไม่ออกครับ</p>

<h3>ระดับ 3: รอยลึกถึงเหล็กตัวถัง (Deep Scratch / Primer Scratch)</h3>
<p>รอยที่ลึกสุดโต่ง ทะลุทั้งชั้นเคลือบ ชั้นสี และชั้นรองพื้น ลงไปถึงเหล็กตัวถังเลย มักเกิดจากอุบัติเหตุเฉี่ยวชน หรือโดนของแข็งครูดอย่างแรง จะเห็นเป็น <strong>เส้นสีขาว/เทา</strong> ซึ่งเป็นสีของเหล็กตัวถัง</p>

<p><strong>วิธีแก้:</strong> ระดับนี้ขัดสีไม่ช่วยครับ ต้อง <strong>พ่นสีใหม่ทั้งชิ้นส่วน</strong> ซึ่งช่างจะทำการขัดเตรียมพื้นผิว พ่นรองพื้น พ่นสี และเคลือบเงาตามลำดับ สำคัญคือ <strong>อย่าปล่อยทิ้งไว้นาน!</strong> เพราะเหล็กที่โดนน้ำโดนฝนจะเกิดสนิมลุกลามเร็วมาก โดยเฉพาะช่วงหน้าฝนในย่าน <strong>เทพารักษ์ แพรกษา สมุทรปราการ</strong> ที่ความชื้นสูงครับ</p>

<h2>ขัดรอยขูดขีดเองได้ไหม? สิ่งที่ต้องรู้ก่อนลงมือ</h2>
<p>รอยระดับ 1 (รอยขนแมว) สามารถลองทำเองได้ แต่ต้องระวังเรื่องต่อไปนี้ครับ:</p>
<ul class="list-disc pl-6 space-y-3">
  <li><strong>เลือกสารขัดสีให้ถูก:</strong> ใช้ Compound เกรดละเอียด ถ้าใช้ของหยาบเกินไปจะยิ่งทำให้สีรถบางลง</li>
  <li><strong>อย่าขัดมือเปล่า:</strong> ใช้เครื่องขัดสี (DA Polisher) จะให้ผลลัพธ์ที่สม่ำเสมอกว่า ถ้าขัดมือจะเกิดรอยไม่เท่ากัน</li>
  <li><strong>อย่าขัดตอนแดดจัด:</strong> สารขัดสีจะแห้งเร็วเกินไป ทำให้เกิดรอยเผาบนสีรถ (Buffer Burns)</li>
  <li><strong>ล้างรถให้สะอาดก่อนขัด:</strong> ถ้ามีเม็ดทรายหรือฝุ่นค้างอยู่ ตอนขัดจะลากทรายไปทำให้เกิดรอยใหม่เพิ่ม</li>
</ul>

<p>ถ้าไม่มั่นใจ หรือรอยเป็นระดับ 2-3 แนะนำให้ส่งรูปมาให้ช่างประเมินก่อนครับ (อ่านเพิ่มเติม: <a href="/posts/water-stain-removal-car-paint-guide" class="text-blue-600 font-semibold hover:underline">วิธีกำจัดคราบน้ำฝังแน่นบนสีรถ</a> | <a href="/car-polishing" class="text-blue-600 font-semibold hover:underline">บริการขัดสีรถ/เคลือบแก้ว</a>)</p>

<div class="my-8">
  <div class="aspect-w-16 aspect-h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 p-8">
    <svg class="w-12 h-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
    <p class="text-slate-500 font-medium text-center">ภาพผลงานจริง: ก่อนและหลังขัดลบรอยขูดขีด<br/>(พื้นที่สำหรับแทรกรูปภาพผลงานจริงจากร้าน)</p>
  </div>
  <p class="text-sm text-center text-slate-500 mt-2"><em>เคสจริง: ลูกค้าย่านบางนาส่งรถมาขัดลบรอยขนแมวทั้งคัน สีรถกลับมาเงาสะท้อนเหมือนกระจก</em></p>
</div>

<h2>เคล็ดลับป้องกันรอยขูดขีด ที่ช่างแนะนำ</h2>
<ul class="list-disc pl-6 space-y-3">
  <li><strong>เคลือบแก้ว/เคลือบเซรามิก:</strong> สร้างชั้นเกราะป้องกันเพิ่มอีก 1 ชั้นเหนือเคลือบเงา ลดโอกาสเกิดรอยขนแมว 80%</li>
  <li><strong>ติดฟิล์มกันรอย (PPF):</strong> สำหรับจุดที่โดนบ่อย เช่น กันชน มือจับประตู ขอบล้อ จะช่วยรับแรงกระแทกแทนสีรถ</li>
  <li><strong>ล้างรถด้วยวิธี 2 ถัง:</strong> ใช้ถังน้ำสะอาดและถังน้ำสำหรับล้างฟองน้ำแยกกัน ป้องกันเม็ดทรายกลับมาขูดสีรถ</li>
  <li><strong>ใช้ผ้าไมโครไฟเบอร์เกรดดี:</strong> อย่าใช้ผ้าขนหนู ผ้าสำลี หรือผ้าถูพื้นเช็ดรถ จะทำให้เกิดรอยขนแมวทันที</li>
  <li><strong>จอดรถห่างจากรถคันอื่น:</strong> เลือกจอดที่ที่มีช่องว่างพอสมควร ลดโอกาสโดนเปิดประตูชน</li>
</ul>

<div class="not-prose relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-blue-200/60 dark:border-blue-500/20 text-center my-8 sm:my-10 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/10">
  <div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-15 blur-3xl"></div>
  <div class="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full opacity-10 blur-3xl"></div>
  <div class="relative z-10 max-w-2xl mx-auto">
    <div class="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/></svg>
      <span>บริการขัดสีรถนอกสถานที่ 24 ชม.</span>
    </div>
    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-3 leading-tight">รอยขูดขีดบนสีรถ ส่งรูปมาประเมินฟรี!</h3>
    <p class="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">PORNPISIT BATTERY มีบริการขัดสีรถ ลบรอยขูดขีด รอยขนแมว พร้อมเคลือบแก้วป้องกัน วิ่งบริการถึงบ้านคุณ โซนศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</p>
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <a href="tel:0996731296" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>โทรเรียกช่าง 099-673-1296</span>
      </a>
      <a href="https://lin.ee/OBB86S4" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ส่งรูปประเมินฟรี</span>
      </a>
    </div>
    <a href="/car-polishing" class="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium underline underline-offset-4 decoration-blue-300 dark:decoration-blue-700 hover:decoration-blue-500 transition-colors">ดูบริการขัดสีรถ/เคลือบแก้ว &rarr;</a>
  </div>
</div>

<h2>FAQ: คำถามที่พบบ่อย (รอยขูดขีดบนสีรถ)</h2>
<div class="space-y-6 mt-6">
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: รอยขูดขีดยาวๆ เส้นเดียว ขัดออกได้ไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ขึ้นอยู่กับความลึกครับ ลองใช้วิธีเล็บจิกเช็กดู ถ้าเล็บไม่สะดุด ขัดออกได้ 100% แต่ถ้าเล็บสะดุดและเห็นสีขาว/เทาในร่องรอย แสดงว่าลึกถึงเหล็กตัวถัง ต้องพ่นสีใหม่ครับ แนะนำส่งรูปให้ช่างประเมินทางไลน์ก่อนได้เลย</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ขัดลบรอยขนแมวทั้งคันใช้เวลาเท่าไหร่?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> รถเก๋งขนาดกลาง ใช้เวลาประมาณ 4-6 ชั่วโมงครับ (รวมล้าง ขัด เคลือบ) ส่วนรถ SUV หรือรถกระบะอาจใช้เวลามากกว่านั้น ช่างสามารถมาทำให้ถึงบ้านได้เลยครับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ขัดสีรถบ่อยๆ จะทำให้สีรถบางไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ถ้าใช้เครื่องขัดสีที่ถูกต้อง (DA Polisher) และสารขัดสีเกรดดี ชั้นเคลือบเงาจะถูกขัดออกน้อยมาก (ไม่ถึง 1 ไมครอน ต่อครั้ง) ในขณะที่ชั้นเคลือบเงาจากโรงงานมีความหนาประมาณ 40-50 ไมครอน ดังนั้นขัดปีละ 1-2 ครั้ง ไม่มีปัญหาเลยครับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ยาสีฟันขัดรอยขีดข่วนบนสีรถได้จริงไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ได้ผลเฉพาะรอยตื้นมากๆ เท่านั้นครับ แต่ไม่แนะนำ เพราะเม็ดขัดในยาสีฟันไม่ได้ออกแบบมาสำหรับสีรถ อาจทำให้เกิดรอยหมุนเพิ่มขึ้น (อ่านเพิ่ม: <a href="/posts/toothpaste-headlight-cleaning-guide" class="text-blue-600 font-semibold hover:underline">ยาสีฟันขัดไฟหน้า ได้ผลจริงไหม?</a>)</p>
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
      "name": "รอยขูดขีดยาวๆ เส้นเดียว ขัดออกได้ไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ขึ้นอยู่กับความลึก ลองใช้วิธีเล็บจิกเช็ก ถ้าเล็บไม่สะดุดขัดออกได้ 100% ถ้าเห็นสีขาว/เทาในร่องรอย แสดงว่าลึกถึงเหล็กตัวถัง ต้องพ่นสีใหม่"
      }
    },
    {
      "@type": "Question",
      "name": "ขัดลบรอยขนแมวทั้งคันใช้เวลาเท่าไหร่?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "รถเก๋งขนาดกลาง ใช้เวลาประมาณ 4-6 ชั่วโมง รวมล้าง ขัด เคลือบ ช่างสามารถมาบริการถึงบ้านได้"
      }
    },
    {
      "@type": "Question",
      "name": "ขัดสีรถบ่อยๆ จะทำให้สีรถบางไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ถ้าใช้เครื่องขัดสีที่ถูกต้องและสารขัดสีเกรดดี ชั้นเคลือบเงาจะถูกขัดออกน้อยมาก ขัดปีละ 1-2 ครั้ง ไม่มีปัญหา"
      }
    },
    {
      "@type": "Question",
      "name": "ยาสีฟันขัดรอยขีดข่วนบนสีรถได้จริงไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ได้ผลเฉพาะรอยตื้นมากๆ เท่านั้น แต่ไม่แนะนำ เพราะเม็ดขัดในยาสีฟันไม่ได้ออกแบบมาสำหรับสีรถ อาจทำให้เกิดรอยหมุนเพิ่มขึ้น"
      }
    }
  ]
}
</script>
`;

const postData = {
  slug: "scratch-removal-car-paint-guide",
  title: "ขัดลบรอยขูดขีด รอยขนแมวบนสีรถ ทำเองได้ไหม? (อัปเดต 2026)",
  content: htmlContent,
  excerpt: "รถเป็นรอยขูดขีด รอยขนแมว ล้างไม่ออก! มาดูวิธีเช็กระดับรอย 3 ระดับ แบบไหนขัดเองได้ แบบไหนต้องส่งช่าง พร้อมเคล็ดลับป้องกันไม่ให้เกิดซ้ำ",
  coverImage: "/images/blog/pig-scratch-removal-guide-cover.svg",
  category: "เคล็ดลับดูแลรถยนต์",
  published: true,
  seoTitle: "ขัดลบรอยขูดขีด รอยขนแมว ขัดสีรถ เคลือบแก้ว | PORNPISIT BATTERY",
  seoDescription: "รถเป็นรอยขูดขีด รอยขนแมว? มาดู 3 ระดับรอยขีดข่วน แบบไหนขัดออกได้ แบบไหนต้องพ่นสี วิธีเช็กง่ายๆ พร้อมบริการขัดสีรถนอกสถานที่ ศรีนครินทร์ บางนา สมุทรปราการ",
  seoKeywords: "ขัดลบรอยขูดขีด,รอยขนแมว,ขัดสีรถ,รอยขีดข่วน,Swirl Marks,ขัดสีรถยนต์,เคลือบแก้ว,แต้มสี,พ่นสีรถ,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "รอยขูดขีดบนสีรถ ขัดออกได้ไหม? 3 ระดับที่ต้องรู้!",
  ogDescription: "เช็กรอยขูดขีดง่ายๆ ด้วยวิธีเล็บจิก แบบไหนขัดเองได้ แบบไหนต้องพ่นสี บริการขัดสีรถถึงบ้าน โซนศรีนครินทร์-บางนา",
};

async function main() {
  console.log("Seeding SEO optimized 'scratch removal guide' post...");
  
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
