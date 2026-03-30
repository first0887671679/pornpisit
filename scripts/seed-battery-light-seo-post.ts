import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>ไฟรูปแบตโชว์ เตือนอะไร? ขับต่อได้ไหม? วิธีเอาตัวรอดก่อนรถดับ (อัปเดต 2026)</h1>
<p>เคยไหมครับ ขับรถอยู่ดีๆ แถว<strong>บางนา-ตราด</strong> หรือกำลังจะเลี้ยวเข้า<strong>เมกาบางนา</strong> จู่ๆ หน้าปัดรถก็มี <strong>ไฟรูปแบตเตอรี่สีแดงสว่างขึ้นมา</strong> หลายคนตกใจและคิดไปเองว่า "แบตเตอรี่เสื่อมแน่ๆ" แต่ความจริงแล้ว ไฟเตือนดวงนี้กำลังบอกปัญหาที่ใหญ่กว่านั้นครับ!</p>

<p>วันนี้ช่างจาก PORNPISIT BATTERY จะมาอธิบายให้ฟังชัดๆ ว่า <strong>ไฟรูปแบตโชว์</strong> หมายถึงอะไร ขับต่อได้อีกไกลแค่ไหน และวิธีเอาตัวรอดเฉพาะหน้า เพื่อไม่ให้รถไปดับกลาง<strong>แยกเทพารักษ์</strong> หรือบนทางด่วนครับ</p>

<img src="/images/blog/pig-battery-light-seo-cover.svg" alt="ภาพการ์ตูนหมูช่าง PORNPISIT BATTERY อธิบาย ไฟรูปแบตโชว์ เตือนอะไร ศรีนครินทร์ บางนา" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h2>ไฟรูปแบตโชว์ ไม่ได้แปลว่า "แบตเสื่อม" เสมอไป!</h2>
<p>ความเข้าใจผิดอันดับ 1 ของคนใช้รถคือ คิดว่าไฟรูปแบตโชว์แปลว่าต้องเปลี่ยนแบตเตอรี่ แต่ในความเป็นจริง สัญลักษณ์นี้คือ <strong>"ไฟเตือนระบบชาร์จไฟ" (Charging System Warning Light)</strong> ครับ</p>
<p>มันกำลังบอกคุณว่า <strong>รถยนต์ไม่ได้ใช้ไฟจากไดชาร์จ (เครื่องปั่นไฟ) แล้ว แต่กำลังดึงไฟก้อนสุดท้ายจาก "แบตเตอรี่" มาใช้เพียวๆ</strong> ถ้าไฟในก้อนนี้หมดเมื่อไหร่ รถจะดับกลางอากาศทันที!</p>

<h2>3 สาเหตุหลักที่ทำให้ไฟรูปแบตโชว์</h2>
<p>ถ้ารถของคุณมีไฟรูปแบตโชว์ค้างขณะเครื่องยนต์ทำงาน สาเหตุมักจะมาจาก 3 ตัวการนี้ครับ:</p>

<img src="/images/blog/pig-battery-light-seo-causes.svg" alt="สาเหตุ ไดชาร์จเสีย สายพานขาด ไฟรูปแบตโชว์ แบริ่ง ลาซาล" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h3>1. ไดชาร์จเสีย (Alternator Failure) - เจอบ่อยที่สุด!</h3>
<p>ตัวการหลักกว่า 80% ของเคสนี้คือ <strong>ไดชาร์จพัง</strong> ครับ อาจจะเป็นที่แปรงถ่านหมด, คัทเอาท์ชาร์จพัง, หรือทุ่นคอยล์ไหม้ ทำให้มันไม่สามารถปั่นกระแสไฟไปเลี้ยงรถและชาร์จกลับเข้าแบตเตอรี่ได้</p>

<h3>2. สายพานไดชาร์จหย่อน หรือ ขาด</h3>
<p>ถ้าขับๆ อยู่แล้วได้ยินเสียง "ปึ้ง!" หรือเสียงสายพานฟาด แล้วตามด้วยไฟรูปแบตโชว์ (บางคันพวงมาลัยจะหนักขึ้น และแอร์ไม่เย็นด้วย) แปลว่าสายพานหน้าเครื่องขาดครับ ทำให้ไดชาร์จหมุนไม่ได้</p>

<h3>3. ขั้วแบตเตอรี่หลวม มีขี้เกลือ หรือสายไฟขาดใน</h3>
<p>เคสนี้เจอน้อยกว่า แต่ก็เป็นไปได้ครับ ถ้าขั้วแบตหลวมมาก หรือขี้เกลือเกาะหนาเตอะ กระแสไฟจากไดชาร์จจะวิ่งกลับเข้าแบตไม่ได้ เซนเซอร์ก็จะจับความผิดปกติและโชว์ไฟเตือนเช่นกัน</p>

<h2>ไฟรูปแบตโชว์ ขับต่อได้อีกไกลแค่ไหน?</h2>
<p>คำตอบคือ <strong>"ไม่ควรฝืนขับทางไกลเด็ดขาด!"</strong> ครับ แต่ถ้ารถกำลังวิ่งอยู่บนทางด่วน<strong>สุขุมวิท</strong> หรือสะพานข้ามแยก คุณยังมีเวลาประมาณ <strong>10 - 30 นาที</strong> (ขึ้นอยู่กับสภาพแบตเตอรี่และปริมาณการใช้ไฟในรถ) ก่อนที่รถจะดับสนิท</p>

<img src="/images/blog/pig-battery-light-seo-action.svg" alt="วิธีเอาตัวรอดเมื่อ ไฟรูปแบตโชว์ ห้ามขับต่อ แพรกษา สมุทรปราการ" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h2>วิธีเอาตัวรอดเฉพาะหน้า เมื่อไฟแบตโชว์ (ทำตามนี้ด่วน!)</h2>
<ol>
  <li><strong>ปิดอุปกรณ์ไฟฟ้าทุกชนิดทันที:</strong> ปิดแอร์ ปิดวิทยุ ถอดสายชาร์จมือถือ ปิดไฟตัดหมอก (ถ้าเป็นตอนกลางวัน) เพื่อประหยัดไฟในแบตเตอรี่ให้เหลือไว้เลี้ยงระบบจุดระเบิดให้นานที่สุด</li>
  <li><strong>อย่าดับเครื่องยนต์เด็ดขาด:</strong> ถ้ารถยังวิ่งได้และหาที่จอดไม่ได้ "ห้ามดับเครื่องเพื่อทดสอบ" เด็ดขาด! เพราะไดสตาร์ทจะกินไฟมหาศาล ถ้าไฟแบตไม่พอ คุณจะสตาร์ทไม่ติดอีกเลย</li>
  <li><strong>มองหาที่จอดที่ปลอดภัย:</strong> พยายามตบไฟเลี้ยวชิดซ้าย หาปั๊มน้ำมันใกล้ๆ หรือจุดจอดรถที่ปลอดภัย (เช่น ปั๊มย่าน<strong>ลาซาล</strong> หรือจุดพักรถ)</li>
  <li><strong>เรียกช่างระบบไฟด่วน:</strong> เมื่อจอดรถในที่ปลอดภัยแล้ว ให้รีบโทรเรียก <a href="/battery-replacement" title="บริการช่างระบบไฟและแบตเตอรี่นอกสถานที่" class="text-orange-600 font-semibold hover:underline">ช่างแบตเตอรี่และระบบไฟนอกสถานที่</a> มาตรวจเช็กด้วยมัลติมิเตอร์ เพื่อฟันธงว่าเป็นที่ไดชาร์จหรือสายพานครับ</li>
</ol>

<h2>คำถามที่พบบ่อย (FAQ) เมื่อไฟรูปแบตเตอรี่โชว์</h2>
<div itemscope itemtype="https://schema.org/FAQPage" class="space-y-4 my-6">
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">ไฟรูปแบตโชว์ตอนบิดกุญแจ (ก่อนสตาร์ท) ผิดปกติไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0"><strong>ปกติครับ!</strong> เวลาบิดกุญแจไปที่ตำแหน่ง ON ไฟรูปแบต (และไฟอื่นๆ) จะโชว์เพื่อเช็กระบบ แต่เมื่อสตาร์ทเครื่องยนต์ติดแล้ว ไฟดวงนี้ <strong>ต้องดับลง</strong> ถ้ายังโชว์ค้างอยู่ถึงจะถือว่าผิดปกติและระบบชาร์จมีปัญหาครับ</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">ไฟรูปแบตโชว์ๆ ดับๆ กระพริบๆ เกิดจากอะไร?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">อาการนี้มักเกิดจาก <strong>คัทเอาท์ไดชาร์จเริ่มเสื่อม</strong> จ่ายไฟไม่นิ่ง หรือ <strong>ขั้วแบตเตอรี่/ปลั๊กหลังไดชาร์จหลวม</strong> พอตกหลุมหรือรถสั่น ไฟก็เลยกระพริบโชว์เป็นพักๆ ควรรีบให้ช่างตรวจเช็กก่อนที่จะเสียถาวรครับ</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">พ่วงแบตเตอรี่ช่วยได้ไหม ถ้าไฟรูปแบตโชว์แล้วรถดับ?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0"><strong>ช่วยได้แค่ชั่วคราวครับ</strong> ถ้าพ่วงแบตจนรถสตาร์ทติด แต่ไดชาร์จเสีย พอถอดสายพ่วงออก (หรือขับไปได้แค่ 5-10 นาที) รถก็จะดับอีกอยู่ดี วิธีแก้ที่ถูกต้องคือต้องเปลี่ยนแบตเตอรี่ลูกใหม่ที่ไฟเต็ม หรือต้องซ่อม/เปลี่ยนไดชาร์จ หรือเรียกรถสไลด์เข้าอู่ครับ</p>
    </div>
  </div>
</div>

<div class="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 text-center my-10 shadow-sm hover:shadow-md transition-shadow">
  <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-[#FF6B00] to-[#FF3E00] rounded-full opacity-20 blur-2xl"></div>
  <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-br from-[#00F2FE] to-[#4FACFE] rounded-full opacity-20 blur-2xl"></div>
  <div class="relative z-10">
    <h2 class="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 mb-4">ไฟรูปแบตโชว์ รถดับสตาร์ทไม่ติด? โทรหาเราเลย!</h2>
    <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">อย่าปล่อยให้รถดับกลางทาง! PORNPISIT BATTERY มีบริการช่างระบบไฟ ตรวจเช็กไดชาร์จ และส่งแบตเตอรี่ด่วนนอกสถานที่ 24 ชม. ครอบคลุมโซน ศรีนครินทร์, บางนา, แบริ่ง, ลาซาล, สุขุมวิท, เทพารักษ์, แพรกษา และ สมุทรปราการ</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a href="tel:0996731296" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B00] to-[#FF3E00] hover:from-[#E65A00] hover:to-[#E63500] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        <span>เรียกช่างตรวจเช็กด่วน 099-673-1296</span>
      </a>
      <a href="https://lin.ee/OBB86S4" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00c300] to-[#00a800] hover:from-[#00b300] hover:to-[#009900] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ส่งพิกัดรถเสีย</span>
      </a>
    </div>
  </div>
</div>`;

const postData = {
  title: "ไฟรูปแบตโชว์ เตือนอะไร? ขับต่อได้ไหม? วิธีเอาตัวรอดก่อนรถดับ | PORNPISIT BATTERY",
  slug: "battery-light-warning-guide",
  excerpt: "หน้าปัดรถขึ้นไฟรูปแบตเตอรี่สีแดงแปลว่าอะไร? ไดชาร์จพัง หรือ แบตเสื่อม? ดูวิธีเอาตัวรอดเฉพาะหน้าและสาเหตุ พร้อมบริการช่างระบบไฟด่วนนอกสถานที่ ศรีนครินทร์ สมุทรปราการ",
  content: htmlContent,
  coverImage: "/images/blog/pig-battery-light-seo-cover.svg",
  category: "ความรู้รถยนต์",
  tags: "ไฟรูปแบตโชว์,ไฟแบตเตอรี่โชว์,ไฟรูปแบตเตอรี่สีแดง,ไดชาร์จเสีย,สายพานไดชาร์จขาด,ไฟโชว์หน้าปัด,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  published: true,
  author: "PORNPISIT BATTERY",
  seoTitle: "ไฟรูปแบตโชว์ เตือนอะไร? สาเหตุและวิธีเอาตัวรอด (อัปเดต 2026)",
  seoDescription: "หน้าปัดรถขึ้นไฟรูปแบตเตอรี่สีแดงแปลว่าอะไร? ไดชาร์จพังหรือแบตเสื่อม? ดูวิธีเอาตัวรอด พร้อมบริการช่างระบบไฟด่วนนอกสถานที่ ศรีนครินทร์ บางนา สมุทรปราการ",
  seoKeywords: "ไฟรูปแบตโชว์,ไฟแบตเตอรี่โชว์,ไฟรูปแบตเตอรี่สีแดง,ไดชาร์จเสีย,ไฟเตือนหน้าปัดรถยนต์,ซ่อมไดชาร์จ,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "ไฟรูปแบตโชว์ เตือนอะไร? ขับต่อได้ไหม?",
  ogDescription: "ไฟรูปแบตสีแดงโชว์ค้าง อย่าเพิ่งฝืนขับต่อ! มาดู 3 สาเหตุหลัก และวิธีเอาตัวรอดก่อนรถดับกลางทาง",
};

async function main() {
  console.log("Seeding SEO optimized Battery Warning Light post...\n");

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
