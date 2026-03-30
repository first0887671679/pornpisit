import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>ขับรถเหยียบตะปู ยางรั่ว! ต้องดึงออกไหม? ขับต่อได้หรือเปล่า (อัปเดต 2026)</h1>
<p>ขับรถกลับบ้านเส้น<strong>ถนนศรีนครินทร์</strong> หรือกำลังจะออกไปทำงานแถว<strong>บางนา</strong> พอเดินมาดูรถตอนเช้า อ้าว! มีหัวตะปูแวววับปักอยู่ที่หน้ายางซะงั้น หลายคนเจอเหตุการณ์ <strong>"ขับรถเหยียบตะปู"</strong> แล้วทำตัวไม่ถูก มือสั่นใจคอไม่ดี คำถามยอดฮิตที่เด้งขึ้นมาในหัวคือ <em>"เราควรดึงตะปูออกไหม?"</em> และ <em>"ขับแบบมีตะปูคาไว้ไปที่ร้านปะยางได้หรือเปล่า?"</em></p>

<p>วันนี้ช่างจาก PORNPISIT BATTERY มีคำตอบจากประสบการณ์จริงที่วิ่งปะยางให้ลูกค้าทั่วโซน<strong>สมุทรปราการ</strong> มาบอกกันชัดๆ ครับ ว่าเจอแบบนี้ต้องรับมือยังไงให้ปลอดภัย และยางไม่พังไปมากกว่าเดิมครับ</p>

<img src="/images/blog/pig-nail-in-tire-cover.svg" alt="ขับรถเหยียบตะปู ดึงออกไหม ปะยาง ศรีนครินทร์ บางนา แบริ่ง" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: ลักษณะของตะปูที่ทิ่มเข้าไปในหน้ายางรถยนต์ ซึ่งเป็นปัญหาที่คนใช้รถเจอบ่อยที่สุด</em></p>

<h2>ขับรถเหยียบตะปู "ห้ามดึงออกเด็ดขาด!"</h2>
<p>กฎเหล็กข้อแรกเลยครับ ถ้ารู้ตัวว่า <strong>ขับรถเหยียบตะปู</strong> น็อต หรือน็อตเกลียวปล่อยเข้าให้แล้ว <strong>ห้ามเอามือหรือคีมไปดึงมันออกเด็ดขาด!</strong></p>
<p>เหตุผลเพราะ ตัวตะปูที่ปักคาอยู่นั้น มันทำหน้าที่เหมือน "จุกอุดรอยรั่ว" ชั่วคราวครับ ช่วยให้ลมยางค่อยๆ ซึมออกทีละนิด (บางทีอาจจะใช้เวลาหลายวันกว่าลมจะหมด) แต่ถ้าคุณดึงมันออกปุ๊บ ลมจะพุ่งพรวดออกมาจนยางแบนแต๊ดแต๋ติดพื้นภายในไม่กี่นาที คราวนี้แหละครับงานเข้าของจริง เพราะรถจะขับไม่ได้เลย ต้องเรียกรถสไลด์ หรือต้องเปลี่ยนยางอะไหล่สถานเดียวครับ</p>

<h2>เหยียบตะปูคาไว้ ขับรถไปร้านปะยางได้ไหม?</h2>
<p>คำตอบคือ <strong>"ขับไปได้ครับ แต่มีเงื่อนไข"</strong></p>
<ul class="list-disc pl-6 space-y-2 mt-2 text-slate-700">
  <li><strong>เช็กลมยางก่อน:</strong> ถ้าตะปูเพิ่งตำ แล้วยางยังไม่แบน (ดูลักษณะแล้วยังกลมเต่งอยู่) คุณสามารถค่อยๆ ขับรถไปหาร้านปะยาง หรืออู่ซ่อมรถแถว <strong>แบริ่ง ลาซาล</strong> ได้เลยครับ</li>
  <li><strong>ขับช้าๆ:</strong> ใช้ความเร็วไม่เกิน 40-50 กม./ชม. พยายามหลีกเลี่ยงหลุมบ่อแถว<strong>เทพารักษ์</strong> เพราะแรงกระแทกอาจทำให้ตะปูตำลึกเข้าไปถึงโครงสร้างผ้าใบจนเสียหายหนักกว่าเดิม</li>
  <li><strong>ถ้ายางแบนติดพื้นไปแล้ว:</strong> ห้ามฝืนขับบดเด็ดขาด! เพราะแก้มยางจะพัง ล้อแม็กซ์จะดุ้ง ทีนี้ต้องเสียเงินเปลี่ยนยางใหม่หลักพันแน่นอนครับ (อ่านเพิ่มเติม: <a href="/blog/sidewall-tire-tear-guide" class="text-orange-600 hover:underline">แก้มยางฉีก ปะได้ไหม?</a>)</li>
</ul>

<img src="/images/blog/pig-nail-in-tire-info.svg" alt="Infographic" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h2>เหยียบตะปู ปะยางแบบไหนดี? (แทงไหม vs สตรีมร้อน/เย็น)</h2>
<p>เมื่อขับรถมาถึงร้านยาง ช่างจะประเมินรอยแผลให้ครับ โดยทั่วไปรอยตะปูตำที่ "หน้ายาง" (ส่วนที่สัมผัสถนน) สามารถปะได้สบายๆ ครับ จะมีวิธีฮิตๆ อยู่ 2 แบบ:</p>

<h3>1. ปะแทงไหม (ตัวหนอน) - รวดเร็ว ไม่ต้องถอดล้อ</h3>
<p>วิธีนี้ฮิตที่สุดสำหรับการปะฉุกเฉินนอกสถานที่ครับ ช่างจะดึงตะปูออก แล้วเอาเส้นยางเหนียวๆ (ไหม) แทงอัดเข้าไปในรูรั่วเพื่ออุดรอย<br>
<strong>ข้อดี:</strong> ทำเร็วมาก 10 นาทีเสร็จ ไม่ต้องถอดล้อออกจากรถ ราคาถูก<br>
<strong>ข้อเสีย:</strong> ถ้ารูรั่วใหญ่เกินไป หรือยางหมดอายุ ไหมอาจจะเสื่อมและมีลมซึมได้ในอนาคต</p>

<h3>2. ปะสตรีม (สตรีมร้อน / สตรีมเย็น) - ทนทาน ชัวร์กว่า</h3>
<p>วิธีนี้ช่างต้องถอดล้อออกมา งัดยางออกจากล้อแม็กซ์ แล้วทำการปะแผ่นยางจาก "ด้านใน" ของหน้ายางครับ<br>
<strong>ข้อดี:</strong> อุดรูรั่วได้สนิท 100% ทนทานจนกว่ายางจะหมดอายุ<br>
<strong>ข้อเสีย:</strong> ใช้เวลาทำนานกว่า (ประมาณ 30-40 นาที) ต้องถอดล้อ และราคาสูงกว่าปะแทงไหมเล็กน้อย</p>

<h2>คำถามที่พบบ่อย (FAQ) เมื่อรถเหยียบตะปู</h2>
<div itemscope itemtype="https://schema.org/FAQPage" class="space-y-4 my-6">
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">เหยียบตะปูมานานแค่ไหนไม่รู้ เพิ่งเห็น ต้องรีบปะไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">ควรรีบปะทันทีที่เห็นครับ! เพราะแม้ตะปูจะอุดรูอยู่ แต่ตอนเราขับรถ แรงสั่นสะเทือนจะทำให้ตะปูขยับไปมา เสียดสีเนื้อยางด้านในจนรูขยายใหญ่ขึ้น หรืออาจจะหลุดออกกลางทางทำให้ยางระเบิดหรือลมออกหมดกะทันหันได้ครับ</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">ตะปูตำที่ "แก้มยาง" (ด้านข้าง) ปะได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">ไม่ได้เด็ดขาดครับ! แก้มยางเป็นส่วนที่บางและต้องยืดหยุ่นตัวรับน้ำหนักตลอดเวลา หากโดนตะปูตำ โครงสร้างจะเสียความแข็งแรงไปแล้ว การปะตรงแก้มยางถือว่าอันตรายมาก เสี่ยงยางระเบิดครับ ช่างแนะนำให้เปลี่ยนเส้นใหม่เท่านั้น</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">รถยางแบน ขับไปร้านไม่ไหว มีบริการปะยางถึงบ้านไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">มีแน่นอนครับ! PORNPISIT BATTERY มีบริการปะยางแบบแทงไหม และเปลี่ยนยางอะไหล่นอกสถานที่ หากคุณอยู่โซน ศรีนครินทร์ บางนา แบริ่ง เทพารักษ์ เรามีช่างวิ่งไปแก้ปัญหาให้ถึงรถเลยครับ</p>
    </div>
  </div>
</div>

<div class="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 text-center my-10 shadow-sm hover:shadow-md transition-shadow">
  <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-[#FF6B00] to-[#FF3E00] rounded-full opacity-20 blur-2xl"></div>
  <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-br from-[#00F2FE] to-[#4FACFE] rounded-full opacity-20 blur-2xl"></div>
  <div class="relative z-10">
    <h2 class="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 mb-4">ยางแบน เหยียบตะปู? เรียกช่างปะยาง PORNPISIT BATTERY ด่วน!</h2>
    <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">หากตื่นเช้ามาพบว่า <strong>ขับรถเหยียบตะปู</strong> ลมยางแบนติดพื้น ขับออกไปทำงานไม่ได้ ไม่ต้องพยายามเปลี่ยนยางเองให้เปื้อนมือครับ! PORNPISIT BATTERY บริการ <a href="/mobile-tire-repair" class="text-orange-600 hover:underline">ปะยางแทงไหม และเปลี่ยนยางอะไหล่นอกสถานที่</a> รวดเร็ว ปลอดภัย ถึงรถคุณภายในเวลาสั้นๆ ครอบคลุมพื้นที่ ศรีนครินทร์, บางนา, แบริ่ง, ลาซาล, สุขุมวิท, เทพารักษ์, ซอยวัดหนามแดง, แพรกษา และ สมุทรปราการ</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a href="tel:0996731296" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B00] to-[#FF3E00] hover:from-[#E65A00] hover:to-[#E63500] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        <span>เรียกช่างปะยางด่วน 099-673-1296</span>
      </a>
      <a href="https://lin.ee/OBB86S4" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00c300] to-[#00a800] hover:from-[#00b300] hover:to-[#009900] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ถ่ายรูปยางส่งพิกัดมาเลย</span>
      </a>
    </div>
  </div>
</div>`;

const postData = {
  title: "ขับรถเหยียบตะปู ยางรั่ว! ต้องดึงออกไหม? ขับต่อได้หรือเปล่า (2026)",
  slug: "nail-in-tire-guide",
  excerpt: "ขับรถเหยียบตะปู ยางรั่ว ห้ามดึงออกเด็ดขาด! ช่างสอนวิธีรับมือเมื่อเจอขยะตำยาง พร้อมเปรียบเทียบการปะยางแบบแทงไหม vs สตรีม บริการปะยางนอกสถานที่ ศรีนครินทร์ บางนา",
  content: htmlContent,
  coverImage: "/images/blog/pig-nail-in-tire-cover.svg",
  category: "ยางรถยนต์",
  tags: "ขับรถเหยียบตะปู,ยางรั่ว,ยางแบน,ปะยาง,ปะแทงไหม,ปะสตรีม,ปะยางนอกสถานที่,ถอนตะปูออกไหม,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สมุทรปราการ",
  published: true,
  author: "PORNPISIT BATTERY",
  seoTitle: "ขับรถเหยียบตะปู ต้องดึงออกไหม? ขับต่อได้ไหม เช็กเลย! (2026)",
  seoDescription: "เจอปัญหา ขับรถเหยียบตะปู ลมยางซึม ห้ามดึงออก! ช่างแนะวิธีรับมือฉุกเฉิน ปะยางแบบไหนดีที่สุด แทงไหมหรือสตรีม? พร้อมบริการปะยางนอกสถานที่ ศรีนครินทร์ แบริ่ง",
  seoKeywords: "ขับรถเหยียบตะปู,ยางรั่ว,ยางแบน,ปะยาง,ปะแทงไหม,ปะสตรีม,ดึงตะปูออกไหม,ปะยางนอกสถานที่,ร้านปะยางใกล้ฉัน,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "ขับรถเหยียบตะปู ห้ามดึงออกเด็ดขาด! ทำไมล่ะ?",
  ogDescription: "เจอแจ็คพอตตะปูตำยางตอนเช้า อย่าเพิ่งตกใจ ทำตามคำแนะนำช่างด่วนก่อนยางพังทั้งเส้น!",
};

async function main() {
  console.log("Seeding SEO optimized 'Nail in Tire' post...\n");

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
