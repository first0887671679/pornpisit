import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>ซ่อมไดชาร์จราคา เท่าไหร่? เปลี่ยนใหม่หรือซ่อมเฉพาะจุด แบบไหนคุ้มกว่ากัน</h1>
<p>อาการไฟรูปแบตเตอรี่โชว์หน้าปัด รถดับกลางทาง หรือแอร์เริ่มไม่เย็น อาการเหล่านี้มักไม่ได้มาจากแบตเตอรี่เสื่อมเสมอไปครับ แต่ส่วนใหญ่มักเป็นสัญญาณเตือนว่า <strong>"ไดชาร์จเสีย"</strong> หรือระบบชาร์จไฟมีปัญหา สำหรับคนใช้รถแถว <strong>ศรีนครินทร์ บางนา แบริ่ง ลาซาล สุขุมวิท เทพารักษ์ หรือสมุทรปราการ</strong> คำถามแรกที่มักจะเกิดขึ้นคือ <strong>ซ่อมไดชาร์จราคา</strong> ประมาณเท่าไหร่? ควรซ่อมเฉพาะจุดหรือเปลี่ยนลูกใหม่ไปเลยดี?</p>

<p>บทความนี้ FIRSTCARCENTER จะมาแชร์ <strong>Case Study จริง</strong> จากการออกไปแก้ปัญหาให้ลูกค้าหน้างาน เพื่อเจาะลึกว่าไดชาร์จชิ้นส่วนไหนที่มักจะพัง ซ่อมได้ไหม และราคาประเมินเบื้องต้นอยู่ที่เท่าไหร่ เพื่อให้คุณตัดสินใจได้คุ้มค่าที่สุดครับ</p>

<img src="/images/blog/pig-alternator-repair-price-cover.svg" alt="ซ่อมไดชาร์จราคา ไดชาร์จเสีย เปลี่ยนไดชาร์จ บางนา ศรีนครินทร์ แบริ่ง" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: เมื่อไฟรูปแบตเตอรี่โชว์บนหน้าปัด มักเป็นสัญญาณของไดชาร์จเสีย ไม่ใช่แบตเตอรี่หมด</em></p>

<h2>เจาะลึก 4 อาการไดชาร์จเสีย และ ซ่อมไดชาร์จราคา ประมาณเท่าไหร่?</h2>
<p>คำว่า <strong>"ไดชาร์จรถยนต์"</strong> เสีย ไม่ได้แปลว่าพังทั้งลูกเสมอไปครับ ข้างในไดชาร์จมีชิ้นส่วนหลายชิ้น ซึ่งแต่ละชิ้นมีอายุการใช้งานและราคาซ่อมที่ต่างกัน การให้ช่างที่ชำนาญเช็กอย่างละเอียด จะช่วยเซฟค่าใช้จ่ายได้มาก</p>

<h3>1) แปลงถ่าน (Carbon Brushes) หมด</h3>
<p>นี่คือสาเหตุยอดฮิตอันดับหนึ่ง! แปลงถ่านเป็นชิ้นส่วนที่ต้องเสียดสีตลอดเวลา เมื่อใช้รถไปสัก 100,000 - 150,000 กิโลเมตร แปลงถ่านมักจะกุด อาการคือ <strong>ไฟรูปแบตโชว์กระพริบๆ</strong> หรือโชว์ค้าง</p>
<ul class="list-disc pl-6 space-y-1 mb-4">
  <li><strong>ราคาซ่อม:</strong> หลักร้อย ถึงพันต้นๆ (ขึ้นอยู่กับความยากง่ายในการถอดประกอบ)</li>
  <li><strong>ความคุ้มค่า:</strong> คุ้มมากครับ เปลี่ยนแค่แปลงถ่าน ไดชาร์จก็กลับมาทำงานได้ปกติเหมือนใหม่</li>
</ul>

<h3>2) คัทเอาท์ (IC Regulator) เสีย</h3>
<p>คัทเอาท์มีหน้าที่คุมแรงดันไฟไม่ให้ชาร์จเข้าแบตเตอรี่มากเกินไป ถ้าชิ้นนี้เสีย อาการคือ <strong>"ไฟชาร์จเกิน"</strong> (Overcharge) ซึ่งอันตรายมาก เพราะน้ำกรดในแบตจะเดือด แบตบวม และอาจทำให้กล่อง ECU รวนได้</p>
<ul class="list-disc pl-6 space-y-1 mb-4">
  <li><strong>ราคาซ่อม:</strong> ประมาณ 1,xxx - 2,xxx บาท</li>
  <li><strong>ความคุ้มค่า:</strong> คุ้มค่าที่จะเปลี่ยน หากชิ้นส่วนอื่นอย่างขดลวดยังอยู่ในสภาพดี</li>
</ul>

<h3>3) ลูกปืนไดชาร์จแตก หรือ ไดโอดพัง</h3>
<p>ถ้าสตาร์ทรถแล้วได้ยินเสียง "หอน" ดังมาจากหน้าเครื่องยนต์ (ดังวี้ๆ ตามรอบเครื่อง) มักเกิดจากลูกปืนไดชาร์จเสื่อมสภาพ หรือถ้าไดโอดแปลงกระแสไฟพัง รถจะไม่มีไฟไปเลี้ยงระบบ</p>
<ul class="list-disc pl-6 space-y-1 mb-4">
  <li><strong>ราคาซ่อม:</strong> พันกว่าบาทขึ้นไป</li>
  <li><strong>ความคุ้มค่า:</strong> ต้องให้ช่างประเมินหน้างานครับ บางคันเปลี่ยนลูกปืนแล้วจบ แต่บางคันอาการลามไปที่อื่น การเปลี่ยนลูกใหม่ (ไดบิ้ว) อาจจะจบและปวดหัวน้อยกว่า</li>
</ul>

<h3>4) ขดลวดไหม้ หรือ ชอร์ตเทิร์น</h3>
<p>ถ้าขับมาแล้วได้ยินเสียงดังแกรกๆ ตามด้วย <strong>กลิ่นเหม็นไหม้</strong> โชยเข้ามาในห้องโดยสาร โอกาสสูงมากที่ขดลวดทองแดงในไดชาร์จจะไหม้แล้วครับ</p>
<ul class="list-disc pl-6 space-y-1 mb-4">
  <li><strong>ราคาซ่อม:</strong> การพันขดลวดใหม่ไม่ค่อยเป็นที่นิยมและใช้เวลานาน</li>
  <li><strong>ความคุ้มค่า:</strong> <strong>ไม่แนะนำให้ซ่อม</strong> แนะนำให้เปลี่ยนไดชาร์จลูกใหม่ หรือ "ไดบิ้วเกรด A" จะคุ้มค่าและทนทานกว่าในระยะยาว</li>
</ul>

<img src="/images/blog/pig-alternator-repair-price-info.svg" alt="เช็กไดชาร์จ เปลี่ยนไดชาร์จบิ้ว ราคาไดชาร์จ เทพารักษ์ แพรกษา สมุทรปราการ" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: สรุปความคุ้มค่าระหว่างการซ่อมเฉพาะจุด กับการเปลี่ยนไดชาร์จลูกใหม่</em></p>

<h2>Case Study: ลูกค้า Toyota Vios รถดับหน้าตลาดหนามแดง</h2>
<p>เมื่อต้นเดือนที่ผ่านมา มีลูกค้าขับ Toyota Vios โทรแจ้งมาว่า <strong>รถดับกลางทางแถวหน้าตลาดหนามแดง ถนนเทพารักษ์</strong> ก่อนดับมีอาการแอร์เริ่มมีแต่ลมร้อน วิทยุดับ หน้าปัดไฟโชว์เต็มไปหมด ลูกค้าคิดว่าแบตเตอรี่เสียแน่นอน</p>

<p>เมื่อช่างของ FIRSTCARCENTER ไปถึงและเช็กระบบไฟ พบว่า <strong>ไดชาร์จเสีย</strong> ไม่ยอมปั่นไฟกลับเข้าแบตเตอรี่ ทำให้รถดึงไฟจากแบตเตอรี่มาใช้จนหมดเกลี้ยง (Battery Drain) จากการประเมินพบว่ารถใช้งานมาเกือบ 2 แสนกิโลเมตร ชิ้นส่วนภายในไดชาร์จทั้งแปลงถ่านและลูกปืนเสื่อมสภาพหนัก ช่างจึงแนะนำให้ <strong>เปลี่ยนไดชาร์จบิ้วโรงงาน (Rebuilt Alternator)</strong> พร้อมรับประกัน ซึ่งลูกค้าตกลง</p>

<p>หลังเปลี่ยนไดชาร์จเสร็จ ช่างได้ทำการ <strong>จั๊มสตาร์ท</strong> และวัดค่าการชาร์จ พบว่ากระแสไฟกลับมาที่ 13.8V - 14.2V ถือว่าสมบูรณ์แบบ ลูกค้าสามารถขับรถไปส่งของต่อได้ทันทีโดยไม่ต้องเรียกรถสไลด์ ซึ่งช่วยประหยัดเวลาและค่าใช้จ่ายไปได้มากครับ</p>

<div class="my-8">
  <div class="aspect-w-16 aspect-h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 p-8">
    <svg class="w-12 h-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2 1.586-1.586a2 2 0 012.828 0L20 14m-6-10h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    <p class="text-slate-500 font-medium text-center">ภาพผลงานจริง: เปลี่ยนไดชาร์จ Toyota Vios นอกสถานที่ หน้าตลาดหนามแดง<br/>(พื้นที่สำหรับแทรกรูปรถลูกค้าจริง)</p>
  </div>
  <p class="text-sm text-center text-slate-500 mt-2"><em>เคสจริง: บริการเช็กและเปลี่ยนไดชาร์จนอกสถานที่ ไม่ต้องเสียค่าลากรถเข้าอู่</em></p>
</div>

<h2>สรุป: เปลี่ยนไดชาร์จบิ้ว หรือ ของเบิกศูนย์ ดีกว่ากัน?</h2>
<p>ถ้าประเมินแล้วว่า <strong>ซ่อมไดชาร์จราคา</strong> ใกล้เคียงกับการเปลี่ยนลูกใหม่ การเลือกเปลี่ยนจะจบปัญหาได้ชัวร์กว่าครับ โดยมีตัวเลือกดังนี้:</p>
<ul class="list-disc pl-6 space-y-3">
  <li><strong>ไดชาร์จบิ้ว (Rebuilt):</strong> คือไดชาร์จแท้ที่นำมาเปลี่ยนชิ้นส่วนภายใน (แปลงถ่าน ลูกปืน คัทเอาท์) ให้ใหม่ทั้งหมด <strong>ราคาประมาณ 2,500 - 4,500 บาท</strong> (แล้วแต่รุ่นรถ) ข้อดีคือประหยัดกว่าของเบิกศูนย์เกินครึ่ง และใช้งานได้ยาวนาน มีการรับประกัน</li>
  <li><strong>ไดชาร์จเบิกศูนย์ (OEM New):</strong> เหมาะสำหรับรถยุโรป หรือรถที่ต้องการอะไหล่แท้ 100% <strong>ราคาเริ่มต้น 8,000 - หลักหมื่นบาท</strong> ข้อดีคือสบายใจที่สุด แต่ราคาสูง</li>
</ul>
<p>หากคุณไม่แน่ใจว่ารถของคุณเป็นที่แบตเตอรี่หรือไดชาร์จ สามารถดูวิธีสังเกตเพิ่มเติมได้ที่บริการ <a href="/alternator-starter" class="text-blue-600 font-semibold hover:underline">เช็กและซ่อมระบบไดชาร์จ ไดสตาร์ท</a> หรือถ้าต้องการเช็กเรื่องแบตเตอรี่ สามารถเข้าไปที่ <a href="/battery-replacement" class="text-blue-600 font-semibold hover:underline">บริการเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่</a> ครับ</p>

<div class="not-prose relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-rose-200/60 dark:border-rose-500/20 text-center my-8 sm:my-10 shadow-lg shadow-rose-100/50 dark:shadow-rose-900/10">
  <div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-rose-400 to-red-500 rounded-full opacity-15 blur-3xl"></div>
  <div class="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-pink-400 to-fuchsia-500 rounded-full opacity-10 blur-3xl"></div>
  <div class="relative z-10 max-w-2xl mx-auto">
    <div class="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/></svg>
      <span>เช็กระบบชาร์จไฟฟรี ประเมินราคาหน้างาน</span>
    </div>
    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-3 leading-tight">ไฟรูปแบตโชว์? รถดับกลางทาง? โทรเรียกเราด่วน!</h3>
    <p class="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">FIRSTCARCENTER มีช่างผู้เชี่ยวชาญพร้อมเครื่องมือวัดค่าระบบไฟ ให้บริการนอกสถานที่ ครอบคลุม ศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</p>
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <a href="tel:0887671679" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>โทรเรียกช่าง 088-767-1679</span>
      </a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ปรึกษาอาการฟรี</span>
      </a>
    </div>
  </div>
</div>

<h2>FAQ: คำถามที่พบบ่อย เรื่องซ่อมไดชาร์จ</h2>
<div class="space-y-6 mt-6">
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ไฟรูปแบตโชว์ แต่รถยังขับได้ ต้องทำยังไง?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> แสดงว่าไดชาร์จเริ่มมีปัญหา ไม่ปั่นไฟเข้าแบตครับ ให้ปิดแอร์ ปิดวิทยุ (เพื่อลดการใช้ไฟ) และรีบนำรถเข้าตรวจเช็ก หรือเรียกช่างไปเช็กนอกสถานที่ทันที ก่อนที่ไฟในแบตจะหมดจนรถดับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ซ่อมไดชาร์จราคา เท่าไหร่ แพงไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ขึ้นอยู่กับอาการครับ ถ้าแค่แปลงถ่านหมด ราคาจะอยู่หลักร้อยถึงพันต้นๆ แต่ถ้าเสียหายหนัก แนะนำให้เปลี่ยน "ไดชาร์จบิ้ว" ราคาประมาณ 2,500 - 4,500 บาท ซึ่งคุ้มค่าและจบงานได้ดีกว่า</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: เปลี่ยนไดชาร์จนอกสถานที่ได้ไหม หรือต้องลากเข้าอู่?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> สามารถเปลี่ยนนอกสถานที่ได้ครับ! FIRSTCARCENTER มีบริการเช็กและเปลี่ยนไดชาร์จนอกสถานที่ โซน ศรีนครินทร์ บางนา แบริ่ง เทพารักษ์ แพรกษา ช่วยให้คุณไม่ต้องเสียค่ารถสไลด์</p>
  </div>
</div>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ไฟรูปแบตโชว์ แต่รถยังขับได้ ต้องทำยังไง?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "แสดงว่าไดชาร์จเริ่มมีปัญหา ไม่ปั่นไฟเข้าแบตครับ ให้ปิดแอร์ ปิดวิทยุ (เพื่อลดการใช้ไฟ) และรีบนำรถเข้าตรวจเช็ก หรือเรียกช่างไปเช็กนอกสถานที่ทันที ก่อนที่ไฟในแบตจะหมดจนรถดับ"
      }
    },
    {
      "@type": "Question",
      "name": "ซ่อมไดชาร์จราคา เท่าไหร่ แพงไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ขึ้นอยู่กับอาการครับ ถ้าแค่แปลงถ่านหมด ราคาจะอยู่หลักร้อยถึงพันต้นๆ แต่ถ้าเสียหายหนัก แนะนำให้เปลี่ยน ไดชาร์จบิ้ว ราคาประมาณ 2,500 - 4,500 บาท ซึ่งคุ้มค่าและจบงานได้ดีกว่า"
      }
    },
    {
      "@type": "Question",
      "name": "เปลี่ยนไดชาร์จนอกสถานที่ได้ไหม หรือต้องลากเข้าอู่?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "สามารถเปลี่ยนนอกสถานที่ได้ครับ! FIRSTCARCENTER มีบริการเช็กและเปลี่ยนไดชาร์จนอกสถานที่ โซน ศรีนครินทร์ บางนา แบริ่ง เทพารักษ์ แพรกษา ช่วยให้คุณไม่ต้องเสียค่ารถสไลด์"
      }
    }
  ]
}
</script>
`;

const postData = {
  slug: "alternator-repair-price-guide",
  title: "ซ่อมไดชาร์จราคา เท่าไหร่? เปลี่ยนใหม่หรือซ่อมเฉพาะจุดคุ้มกว่า",
  content: htmlContent,
  excerpt: "ซ่อมไดชาร์จราคาเท่าไหร่? อาการไฟรูปแบตโชว์ รถดับ ซ่อมเฉพาะจุดหรือเปลี่ยนไดชาร์จบิ้วดีกว่ากัน รีวิวเคสหน้างาน ศรีนครินทร์ บางนา เทพารักษ์",
  coverImage: "/images/blog/pig-alternator-repair-price-cover.svg",
  category: "ไดชาร์จ ไดสตาร์ท",
  published: true,
  seoTitle: "ซ่อมไดชาร์จราคา เท่าไหร่? สรุปอาการไดชาร์จเสีย | FIRSTCARCENTER",
  seoDescription: "ซ่อมไดชาร์จราคา ประมาณเท่าไหร่? เช็กอาการไฟรูปแบตโชว์ แอร์ไม่เย็น ซ่อมได้ไหมหรือต้องเปลี่ยนใหม่ พร้อมบริการนอกสถานที่ บางนา ศรีนครินทร์ เทพารักษ์",
  seoKeywords: "ซ่อมไดชาร์จราคา,ไดชาร์จเสีย,เปลี่ยนไดชาร์จ,ไดชาร์จรถยนต์,ไฟรูปแบตโชว์,ไดชาร์จบิ้ว,เช็กไดชาร์จ,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "ซ่อมไดชาร์จ หรือ เปลี่ยนลูกใหม่ แบบไหนประหยัดและจบกว่ากัน?",
  ogDescription: "แชร์เคสจริง เปลี่ยนไดชาร์จนอกสถานที่ พร้อมราคาประเมินการซ่อมไดชาร์จเฉพาะจุด",
};

async function main() {
  console.log("Seeding SEO optimized 'alternator repair price' post...");

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
