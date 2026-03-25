import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>วิธีเช็คไดชาร์จ ด้วยตัวเองง่ายๆ แบตเสื่อมหรือไดพัง รู้ได้ทันที! (อัปเดต 2026)</h1>
<p>หลายครั้งที่ลูกค้าโทรเรียกช่าง FIRSTCARCENTER ไปพ่วงแบตเตอรี่แถว <strong>ศรีนครินทร์</strong> หรือ <strong>บางนา</strong> เพราะคิดว่ารถแบตหมด แต่พอไปถึงหน้างาน เช็กไปเช็กมา อ้าว... กลายเป็น "ไดชาร์จพัง" ซะงั้น! อาการของแบตเตอรี่เสื่อมกับไดชาร์จเสียมันคล้ายกันมากครับ คือรถสตาร์ทไม่ติดเหมือนกัน</p>

<p>วันนี้ช่างเลยจะมาสอน <strong>วิธีเช็คไดชาร์จ</strong> ด้วยตัวเองง่ายๆ เพื่อให้คุณวิเคราะห์อาการเบื้องต้นได้ว่า สรุปแล้วรถของคุณที่จอดเสียอยู่แถว <strong>แบริ่ง ลาซาล</strong> นั้น เป็นเพราะแบตเตอรี่หมดอายุ หรือไดชาร์จกลับดาวเก่ากันแน่ จะได้เรียกช่างและเตรียมงบซ่อมถูกจุดครับ!</p>

<img src="/images/blog/pig-check-alternator-cover.svg" alt="วิธีเช็คไดชาร์จ ด้วยตัวเอง แบตเสื่อมหรือไดพัง ศรีนครินทร์ บางนา" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: การใช้มัลติมิเตอร์วัดค่าโวลต์ เป็นวิธีเช็คไดชาร์จที่แม่นยำที่สุด</em></p>

<h2>ไดชาร์จ (Alternator) สำคัญอย่างไร ทำไมพังแล้วรถถึงดับ?</h2>
<p>หน้าที่ของไดชาร์จ คือการ "ปั่นกระแสไฟ" ในขณะที่เครื่องยนต์ทำงาน เพื่อส่งไฟไปเลี้ยงอุปกรณ์ไฟฟ้าทั้งหมดในรถ (แอร์, วิทยุ, ไฟหน้า) และส่งไฟส่วนที่เหลือกลับไปชาร์จเก็บไว้ในแบตเตอรี่ครับ หากไดชาร์จพัง รถจะดึงไฟจากแบตเตอรี่มาใช้เพียงอย่างเดียว พอไฟในแบตหมด รถก็จะดับกลางอากาศทันทีครับ (อ่านเพิ่มเติม: <a href="/blog/car-battery-lifespan-guide" class="text-orange-600 hover:underline">อายุการใช้งานแบตเตอรี่รถยนต์</a>)</p>

<h2>3 วิธีเช็คไดชาร์จ ด้วยตัวเองง่ายๆ แบบมืออาชีพ</h2>

<h3>วิธีที่ 1: สังเกตจากความสว่างของไฟหน้า (ไม่ต้องใช้เครื่องมือ)</h3>
<p>วิธีนี้ง่ายที่สุด เหมาะสำหรับคนที่รถเริ่มมีอาการแปลกๆ ขณะขับอยู่บนถนนเส้น <strong>สุขุมวิท</strong> หรือ <strong>เทพารักษ์</strong>:</p>
<ul class="list-disc pl-6 space-y-2 mt-2 text-slate-700">
  <li>จอดรถในที่มืด หรือหันหน้ารถเข้าหากำแพง สตาร์ทเครื่องยนต์ทิ้งไว้</li>
  <li>เปิดไฟหน้าให้สว่างสุด แล้วลอง "เหยียบคันเร่ง" ให้รอบเครื่องขึ้นไปประมาณ 2,000 รอบ</li>
  <li><strong>ถ้าไดชาร์จปกติ:</strong> ไฟหน้าจะสว่างขึ้นเล็กน้อยตอนเหยียบคันเร่ง และสว่างคงที่</li>
  <li><strong>ถ้าไดชาร์จเสีย:</strong> ไฟหน้าจะสว่างคงที่แบบหรี่ๆ หรือหรี่ลงกว่าเดิมตอนเร่งเครื่อง บางทีแอร์ก็เริ่มไม่ค่อยเย็นด้วย</li>
</ul>

<h3>วิธีที่ 2: วิธีเช็คไดชาร์จ ด้วย "มัลติมิเตอร์" (แม่นยำที่สุด 100%)</h3>
<p>ถ้าคุณมีมิเตอร์วัดไฟอยู่ที่บ้าน นี่คือวิธีที่ช่างใช้เช็กหน้างานจริงให้ลูกค้าแถว <strong>สมุทรปราการ</strong> และ <strong>แพรกษา</strong> ครับ:</p>
<ol class="list-decimal pl-6 space-y-2 mt-2 text-slate-700">
  <li>ตั้งค่ามัลติมิเตอร์ไปที่การวัดโวลต์กระแสตรง (DC Volts) ที่ช่วง 20V</li>
  <li>นำสายสีแดงจิ้มขั้วบวก (+) และสายสีดำจิ้มขั้วลบ (-) ของแบตเตอรี่ <em>(ขณะยังไม่สตาร์ทเครื่อง ควรได้ไฟประมาณ 12.4 - 12.6 โวลต์)</em></li>
  <li><strong>สตาร์ทเครื่องยนต์</strong> ปิดแอร์ ปิดวิทยุ แล้วดูค่าที่หน้าปัดมิเตอร์</li>
  <li><strong>ถ้าไดชาร์จปกติ (ปั่นไฟเข้า):</strong> ตัวเลขต้องขึ้นไปอยู่ที่ <strong>13.5 - 14.5 โวลต์</strong></li>
  <li><strong>ถ้าไดชาร์จเสีย:</strong> ตัวเลขจะค่อยๆ ลดลงเรื่อยๆ ต่ำกว่า 12 โวลต์ (แปลว่าดึงไฟจากแบตมาใช้เพียวๆ) หรือถ้าสูงเกิน 15 โวลต์ แปลว่าไดชาร์จโอเวอร์ชาร์จ (Overcharge) คัทเอาท์น่าจะพังครับ แบตจะบวมและระเบิดได้</li>
</ol>

<h3>วิธีที่ 3: วิธีถอดขั้วแบตเตอรี่ (⚠️ ช่างไม่แนะนำสำหรับรถรุ่นใหม่!)</h3>
<p>สมัยก่อนช่างมักจะใช้วิธีสตาร์ทรถทิ้งไว้ แล้ว "ถอดขั้วลบ" ของแบตเตอรี่ออก ถ้ารถไม่ดับแปลว่าไดชาร์จปกติ ถ้ารถดับทันทีแปลว่าไดชาร์จพัง <strong>แต่ช่างขอเตือนว่า รถยนต์รุ่นใหม่ๆ ที่มีระบบไฟฟ้าและกล่อง ECU ซับซ้อน ห้ามทำวิธีนี้เด็ดขาดครับ!</strong> เพราะไฟที่กระชากอาจทำให้กล่อง ECU พังหลักหมื่นได้เลยครับ</p>

<img src="/images/blog/pig-check-alternator-info.svg" alt="Infographic" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h2>สัญญาณเตือนชัดๆ ว่า "ไดชาร์จเสีย" แน่นอน</h2>
<p>ถ้าทำตามวิธีเช็คไดชาร์จด้านบนแล้วยังไม่ชัวร์ ให้สังเกตหน้าปัดรถยนต์ครับ ถ้ารถสตาร์ทติดแล้ว แต่มี <strong>รูปแบตเตอรี่สีแดง โชว์สว่างค้างไว้ตลอดเวลา</strong> นั่นคือสัญญาณเตือนจากโรงงานว่า ไดชาร์จหยุดปั่นไฟแล้ว! ให้รีบปิดแอร์ ปิดวิทยุ และขับรถหาร้านไดนาโม หรือโทรเรียกช่างฉุกเฉินทันทีก่อนที่รถจะดับกลางทางครับ (อ่านเพิ่มเติม: <a href="/blog/alternator-repair-cost-2026" class="text-orange-600 hover:underline">ซ่อมไดชาร์จราคาเท่าไหร่?</a>)</p>

<h2>คำถามที่พบบ่อย (FAQ) วิธีเช็คไดชาร์จ</h2>
<div itemscope itemtype="https://schema.org/FAQPage" class="space-y-4 my-6">
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">เปลี่ยนแบตเตอรี่ลูกใหม่แล้ว แต่ยังสตาร์ทไม่ติด เป็นที่อะไร?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">ถ้าเปลี่ยนแบตใหม่เอี่ยมแล้วใช้ได้วันสองวัน แล้วรถกลับมาสตาร์ทไม่ติดอีก ชัดเจนเลยครับว่าเป็นที่ "ไดชาร์จเสีย" ไม่ยอมปั่นไฟเข้าไปเก็บในแบตเตอรี่ลูกใหม่ ทำให้ไฟหมดครับ</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">ไดชาร์จชาร์จไฟไม่เข้า เกิดจากอะไรได้บ้าง?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">อาการไดชาร์จชาร์จไฟไม่เข้า ส่วนใหญ่มักเกิดจาก "แปลงถ่านไดชาร์จหมด", คัทเอาท์ (IC Regulator) พัง, หรือสายพานไดชาร์จหย่อน/ขาด ครับ</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">ไฟรูปแบตโชว์ สามารถขับต่อได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">หากไฟรูปแบตเตอรี่สีแดงโชว์ขึ้นมาขณะขับรถ รถจะสามารถวิ่งต่อไปได้อีกประมาณ 10-20 กิโลเมตร (ขึ้นอยู่กับไฟที่เหลือในแบต) แนะนำให้ปิดแอร์และอุปกรณ์ไฟฟ้าทั้งหมด แล้วรีบนำรถจอดเข้าข้างทางหรือขับเข้าอู่ที่ใกล้ที่สุดครับ</p>
    </div>
  </div>
</div>

<div class="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 text-center my-10 shadow-sm hover:shadow-md transition-shadow">
  <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-[#FF6B00] to-[#FF3E00] rounded-full opacity-20 blur-2xl"></div>
  <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-br from-[#00F2FE] to-[#4FACFE] rounded-full opacity-20 blur-2xl"></div>
  <div class="relative z-10">
    <h2 class="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 mb-4">ไดชาร์จพัง แบตหมด สตาร์ทไม่ติด โทรเรียก FIRSTCARCENTER ด่วน!</h2>
    <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">หากลองทำตาม <strong>วิธีเช็คไดชาร์จ</strong> แล้วพบว่าไดชาร์จน่าจะพัง หรือรถดับกลางทางไปแล้ว ไม่ต้องเสียค่ารถลากครับ! FIRSTCARCENTER มีบริการ <a href="/alternator-starter" class="text-orange-600 hover:underline">เช็กระบบไฟ ซ่อมและเปลี่ยนไดชาร์จนอกสถานที่</a> พร้อมเครื่องมือวิเคราะห์ที่แม่นยำ บริการรวดเร็วถึงรถคุณ ครอบคลุมพื้นที่ ศรีนครินทร์, บางนา, แบริ่ง, ลาซาล, สุขุมวิท, เทพารักษ์, ซอยวัดหนามแดง, แพรกษา และ สมุทรปราการ</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a href="tel:0887671679" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B00] to-[#FF3E00] hover:from-[#E65A00] hover:to-[#E63500] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        <span>เรียกรถช่างฉุกเฉิน 088-767-1679</span>
      </a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00c300] to-[#00a800] hover:from-[#00b300] hover:to-[#009900] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ปรึกษาช่างฟรี</span>
      </a>
    </div>
  </div>
</div>`;

const postData = {
  title: "วิธีเช็คไดชาร์จ ด้วยตัวเองง่ายๆ แบตเสื่อมหรือไดพัง รู้ทันที (2026)",
  slug: "how-to-check-alternator-guide",
  excerpt: "รถสตาร์ทไม่ติด เป็นที่แบตเตอรี่ หรือ ไดชาร์จพัง? ช่างสอน 3 วิธีเช็คไดชาร์จ ด้วยตัวเองง่ายๆ ทั้งแบบมีและไม่มีเครื่องมือ พร้อมบริการซ่อมไดชาร์จนอกสถานที่ ศรีนครินทร์ บางนา",
  content: htmlContent,
  coverImage: "/images/blog/pig-check-alternator-cover.svg",
  category: "ระบบไฟและไดชาร์จ",
  tags: "วิธีเช็คไดชาร์จ,วิธีเช็คไดชาร์จด้วยมัลติมิเตอร์,ไดชาร์จเสีย,อาการไดชาร์จเสีย,แบตเตอรี่เสื่อมหรือไดชาร์จพัง,ซ่อมไดชาร์จ,เปลี่ยนไดชาร์จ,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สมุทรปราการ",
  published: true,
  author: "FIRSTCARCENTER",
  seoTitle: "วิธีเช็คไดชาร์จ แบตเสื่อมหรือไดพัง เช็กเองง่ายๆ (อัปเดต 2026)",
  seoDescription: "รถสตาร์ทไม่ติด? ช่างสอน 3 วิธีเช็คไดชาร์จ ด้วยตัวเอง แบตเสื่อมหรือไดพัง รู้ผลทันที! พร้อมบริการซ่อมไดชาร์จและเปลี่ยนแบตนอกสถานที่ ศรีนครินทร์ บางนา แบริ่ง",
  seoKeywords: "วิธีเช็คไดชาร์จ,วิธีเช็คไดชาร์จด้วยมัลติมิเตอร์,ไดชาร์จเสีย,อาการไดชาร์จเสีย,แบตเตอรี่เสื่อมหรือไดชาร์จพัง,ไฟรูปแบตเตอรี่โชว์,ซ่อมไดชาร์จนอกสถานที่,เปลี่ยนไดชาร์จ,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "วิธีเช็คไดชาร์จ แบตหมดหรือไดพัง เช็กยังไงให้รู้ชัวร์?",
  ogDescription: "เปิด 3 ทริคเช็กไดชาร์จง่ายๆ จากช่างตัวจริง ทำเองได้ที่บ้าน ไม่ต้องง้ออู่!",
};

async function main() {
  console.log("Seeding SEO optimized 'How to Check Alternator' post...\n");

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
