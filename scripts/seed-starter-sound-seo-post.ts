import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>เสียงไดสตาร์ท เป็นแบบไหน? ฟังให้ดี 4 เสียงเตือนก่อนรถสตาร์ทไม่ติด (อัปเดต 2026)</h1>
<p>เคยไหมครับ... ตอนเช้ากำลังจะขับรถออกจากบ้านแถว<strong>ศรีนครินทร์</strong> หรือกำลังจะกลับจากที่ทำงานย่าน<strong>บางนา</strong> พอเสียบกุญแจบิดสตาร์ทปุ๊บ กลับได้ยิน <strong>"เสียงไดสตาร์ท"</strong> ที่ผิดเพี้ยนไปจากเดิม! บางทีก็ดังแชะเดียวแล้วเงียบ บางทีก็ดังแกร๊กๆ ลากยาว อาการแบบนี้ทำเอาหลายคนใจคอไม่ดี เพราะไม่รู้ว่าแบตเตอรี่หมด หรือไดสตาร์ทพังกันแน่?</p>

<p>วันนี้ช่างจาก FIRSTCARCENTER จะมาสอนวิธีแยกแยะ <strong>เสียงไดสตาร์ท</strong> แต่ละแบบกันครับ ว่าเสียงไหนเตือนว่าแบตอ่อน เสียงไหนบอกว่าไดสตาร์ทกำลังจะกลับดาวเก่า จะได้เตรียมตัวรับมือถูกก่อนที่รถจะไปดับกลางทางแถว<strong>แยกเทพารักษ์</strong>ครับ!</p>

<img src="/images/blog/pig-starter-sound-cover.svg" alt="เสียงไดสตาร์ท พัง สตาร์ทไม่ติด เสียงแชะ ศรีนครินทร์ บางนา" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: การเงี่ยหูฟังเสียงไดสตาร์ทตอนบิดกุญแจ สามารถบอกอาการป่วยของรถได้</em></p>

<h2>เสียงไดสตาร์ท 4 แบบ ที่กำลังฟ้องว่ารถคุณมีปัญหา</h2>
<p>ไดสตาร์ท (Starter Motor) คือมอเตอร์ตัวแรกที่ทำหน้าที่ฉุดกระชากเครื่องยนต์ให้หมุนและติดขึ้นมา หากมันเริ่มงอแง มักจะมีเสียงเตือนเหล่านี้ครับ:</p>

<h3>1. เสียงดัง "แกร๊กๆๆๆ" รัวๆ ตอนบิดกุญแจ</h3>
<p><strong>อาการ:</strong> บิดกุญแจแล้วได้ยินเสียง แกร๊กๆๆๆ รัวๆ ดังมาจากห้องเครื่อง แต่เครื่องยนต์ไม่ยอมหมุน<br>
<strong>สาเหตุ:</strong> เสียงนี้เจอบ่อยที่สุดครับ! มักไม่ได้เกิดจากไดสตาร์ทพัง แต่เกิดจาก <strong>"ไฟแบตเตอรี่อ่อน"</strong> ทำให้กระแสไฟส่งไปที่โซลินอยด์ของไดสตาร์ทไม่พอ เฟืองจึงเด้งออกไปขบกับฟลายวีลไม่สุด (อ่านเพิ่มเติม: <a href="/blog/car-battery-lifespan-guide" class="text-orange-600 hover:underline">สัญญาณเตือนแบตเตอรี่เสื่อม</a>)</p>

<h3>2. เสียงดัง "แชะ!" ดังๆ ทีเดียว แล้วเงียบกริบ</h3>
<p><strong>อาการ:</strong> ไฟหน้าปัดโชว์สว่างปกติ แอร์เย็น แตรดัง แต่พอบิดกุญแจสตาร์ท กลับดังแชะ! แค่ครั้งเดียวแล้วเครื่องไม่หมุน<br>
<strong>สาเหตุ:</strong> อาการนี้ชี้เป้าไปที่ <strong>"ไดสตาร์ทเสีย"</strong> ครับ! มักเกิดจากแปลงถ่านไดสตาร์ทหมด หรือโซลินอยด์ (ออโตเมติกสตาร์ท) เสีย ทำให้สะพานไฟไม่ทำงาน เคสนี้พ่วงแบตก็ไม่ติดครับ ต้องให้ช่างไปเคาะไดสตาร์ท หรือถอดเปลี่ยนใหม่เท่านั้น</p>

<h3>3. เสียงไดสตาร์ทหมุน "อืด... อืด..." (หมุนช้าลงอย่างเห็นได้ชัด)</h3>
<p><strong>อาการ:</strong> บิดกุญแจแล้วเครื่องยนต์หมุนนะครับ แต่หมุนช้ามาก อืดอาด กว่าจะชึ่งติดขึ้นมาได้<br>
<strong>สาเหตุ:</strong> เป็นได้ 2 อย่างครับ คือ 1) แบตเตอรี่เริ่มเก็บไฟไม่อยู่ หรือค่า CCA ตก 2) ไดสตาร์ทเริ่มฝืด ลูกปืนแห้ง หรือแปลงถ่านใกล้หมด หากปล่อยไว้ ไม่แบตเตอรี่ก็ไดสตาร์ทที่จะต้องบอกลาคุณในเร็วๆ นี้ครับ</p>

<h3>4. เสียงหอน "วี้ดดด" หรือเสียงเหล็กสีกัน ลากยาวหลังเครื่องติดแล้ว</h3>
<p><strong>อาการ:</strong> เครื่องยนต์สตาร์ทติดไปแล้ว แต่ยังมีเสียง วี้ดดด ลากยาวตามหลังมาอีก 1-2 วินาที<br>
<strong>สาเหตุ:</strong> อาการนี้เกิดจาก "เฟืองไดสตาร์ทค้าง" ครับ ปกติพอเครื่องติดปุ๊บ เฟืองไดสตาร์ทต้องหดกลับทันที แต่ถ้าแกนเฟืองฝืดหรือสกปรก มันจะหดกลับไม่ทัน ทำให้เครื่องยนต์ที่หมุนเร็วมากตีกลับมาที่มอเตอร์ไดสตาร์ท หากปล่อยไว้ ไดสตาร์ทจะไหม้พังทั้งลูกเลยครับ</p>

<img src="/images/blog/pig-starter-sound-info.svg" alt="Infographic" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h2>สรุปง่ายๆ: เสียงแบบไหนแบตหมด เสียงแบบไหนไดสตาร์ทพัง?</h2>
<ul class="space-y-2 mt-4 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
  <li><strong>💡 ดัง แกร๊กๆๆ รัวๆ + ไฟหน้าปัดหรี่วูบ:</strong> แบตเตอรี่หมด/แบตเสื่อม (เรียกช่างพ่วงแบต หรือเปลี่ยนแบตได้เลย)</li>
  <li><strong>💡 ดัง แชะ! ทีเดียว + ไฟหน้าปัดสว่างจ้าปกติ:</strong> ไดสตาร์ทเสีย (แปลงถ่านหมด/โซลินอยด์พัง)</li>
  <li><strong>💡 บิดกุญแจแล้ว เงียบสนิท ไม่มีเสียงอะไรเลย:</strong> อาจเป็นที่รีเลย์สตาร์ท, ฟิวส์ขาด, สายกราวด์หลวม หรือไดสตาร์ทช็อตไหม้ไปแล้ว</li>
</ul>
<p><em>(สงสัยเรื่องระบบไฟชาร์จ อ่านต่อที่: <a href="/blog/alternator-repair-cost-2026" class="text-orange-600 hover:underline">ซ่อมไดชาร์จราคาเท่าไหร่? อาการเป็นยังไง?</a>)</em></p>

<h2>คำถามที่พบบ่อย (FAQ) เรื่องเสียงไดสตาร์ท</h2>
<div itemscope itemtype="https://schema.org/FAQPage" class="space-y-4 my-6">
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">วิธีแก้ขัดเฉพาะหน้า เมื่อไดสตาร์ทพัง (มีเสียงแชะ) ทำอย่างไร?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">หากเป็นรถเกียร์ธรรมดา สามารถใช้วิธี "เข็นกระตุกสตาร์ท" ได้ครับ แต่ถ้าเป็นเกียร์ออโต้ ให้ลองหาท่อนเหล็กหรือด้ามประแจยาวๆ กระทุ้ง(เคาะ) ไปที่ตัวไดสตาร์ทเบาๆ 2-3 ที แล้วลองบิดกุญแจสตาร์ทใหม่ บางครั้งแปลงถ่านที่ค้างอยู่จะขยับเข้าที่ ทำให้สตาร์ทติดพอขับไปอู่ได้ครับ</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">เปลี่ยนไดสตาร์ท ราคาประมาณเท่าไหร่?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">ราคาขึ้นอยู่กับรุ่นรถครับ หากเปลี่ยนอะไหล่เฉพาะจุด เช่น แปลงถ่าน จะอยู่ราวๆ 500-1,000 บาท หากเปลี่ยนไดสตาร์ทเชียงกง (มือสอง) จะอยู่ประมาณ 2,000-3,500 บาท แต่ถ้าเบิกของใหม่แท้ศูนย์ อาจทะลุ 6,000-10,000+ บาทครับ</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">รถสตาร์ทไม่ติดที่คอนโด มีบริการซ่อมนอกสถานที่ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">FIRSTCARCENTER มีบริการวิเคราะห์อาการ พ่วงแบตเตอรี่ เปลี่ยนแบตเตอรี่ และซ่อม/เปลี่ยนไดสตาร์ท-ไดชาร์จ นอกสถานที่ครับ ไม่ว่าคุณจะอยู่ แบริ่ง ลาซาล แพรกษา หรือสมุทรปราการ เรามีช่างวิ่งไปแก้ปัญหาให้ถึงรถครับ</p>
    </div>
  </div>
</div>

<div class="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 text-center my-10 shadow-sm hover:shadow-md transition-shadow">
  <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-[#FF6B00] to-[#FF3E00] rounded-full opacity-20 blur-2xl"></div>
  <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-br from-[#00F2FE] to-[#4FACFE] rounded-full opacity-20 blur-2xl"></div>
  <div class="relative z-10">
    <h2 class="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 mb-4">ได้ยิน เสียงไดสตาร์ท ผิดปกติ รถสตาร์ทไม่ติด โทรหาเราด่วน!</h2>
    <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">รถจอดนิ่งสนิท บิดกุญแจแล้วดังแชะ หรือดังแกร๊กๆ ไม่ต้องตกใจ! โทรหา FIRSTCARCENTER ให้ช่างผู้เชี่ยวชาญช่วยวิเคราะห์อาการเบื้องต้นให้ฟรี เรามีบริการ <a href="/alternator-starter" class="text-orange-600 hover:underline">ซ่อมและเปลี่ยนไดสตาร์ท</a> รวมถึงเปลี่ยนแบตเตอรี่นอกสถานที่ รวดเร็ว ตรงจุด ไม่ต้องลากรถ ครอบคลุมโซน ศรีนครินทร์, บางนา, แบริ่ง, ลาซาล, สุขุมวิท, เทพารักษ์, ซอยวัดหนามแดง, แพรกษา และ สมุทรปราการ</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a href="tel:0887671679" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B00] to-[#FF3E00] hover:from-[#E65A00] hover:to-[#E63500] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        <span>เรียกรถช่างฉุกเฉิน 088-767-1679</span>
      </a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00c300] to-[#00a800] hover:from-[#00b300] hover:to-[#009900] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ส่งวิดีโอเสียงสตาร์ทให้ช่างฟังฟรี</span>
      </a>
    </div>
  </div>
</div>`;

const postData = {
  title: "เสียงไดสตาร์ท เป็นแบบไหน? 4 เสียงเตือนรถสตาร์ทไม่ติด (อัปเดต 2026)",
  slug: "starter-motor-sound-warning-guide",
  excerpt: "บิดกุญแจแล้วดัง แชะ! หรือดัง แกร๊กๆ? มาฟัง เสียงไดสตาร์ท 4 แบบที่เตือนว่ารถคุณกำลังมีปัญหา แบตหมดหรือไดพัง ช่างมีคำตอบ! บริการซ่อมนอกสถานที่ ศรีนครินทร์",
  content: htmlContent,
  coverImage: "/images/blog/pig-starter-sound-cover.svg",
  category: "ระบบไฟและไดชาร์จ",
  tags: "เสียงไดสตาร์ท,เสียงไดสตาร์ทพัง,ไดสตาร์ทเสีย,รถสตาร์ทไม่ติดมีเสียงแชะ,ซ่อมไดสตาร์ท,ไดสตาร์ทรถยนต์,เปลี่ยนไดสตาร์ทราคา,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สมุทรปราการ",
  published: true,
  author: "FIRSTCARCENTER",
  seoTitle: "เสียงไดสตาร์ท แบบไหนแบตหมด แบบไหนไดพัง? ฟังเลย! (2026)",
  seoDescription: "บิดกุญแจดังแชะ! หรือดังแกร๊กๆ? สอนแยก เสียงไดสตาร์ท 4 แบบ อาการไหนแบตเสื่อม อาการไหนไดพัง พร้อมวิธีแก้ฉุกเฉิน บริการช่างนอกสถานที่ ศรีนครินทร์ บางนา แบริ่ง",
  seoKeywords: "เสียงไดสตาร์ท,เสียงไดสตาร์ทพัง,ไดสตาร์ทเสีย,อาการไดสตาร์ทเสีย,รถสตาร์ทไม่ติดมีเสียงแชะ,รถสตาร์ทไม่ติด แบตมีไฟ,เปลี่ยนไดสตาร์ทราคา,ซ่อมไดสตาร์ท,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "เสียงไดสตาร์ท ดังแชะ หรือ แกร๊กๆ รถคุณเป็นแบบไหน?",
  ogDescription: "เปิด 4 เสียงเตือนก่อนรถตายกลางทาง! สอนแยกให้ออกว่าแบตหมด หรือ ไดสตาร์ทพัง จากช่างตัวจริง",
};

async function main() {
  console.log("Seeding SEO optimized 'Starter Motor Sound' post...\n");

  try {
    const existing = await prisma.post.findUnique({
      where: { slug: postData.slug },
    });

    if (existing) {
      console.log(`⏭️ Post already exists, skipping: ${postData.title}`);
    } else {
      await prisma.post.create({
        data: postData,
      });
      console.log(`✅ Successfully seeded post: ${postData.title}`);
    }
  } catch (error) {
    console.error("❌ Error seeding post:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
