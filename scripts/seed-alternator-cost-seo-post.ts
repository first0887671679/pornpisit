import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>ซ่อมไดชาร์จราคา เท่าไหร่? ซ่อมคุ้มไหม หรือเปลี่ยนลูกใหม่ดีกว่า (อัปเดต 2026)</h1>
<p>ขับรถอยู่ดีๆ ไฟรูปแบตเตอรี่สีแดงโชว์หราบนหน้าปัด แอร์เริ่มไม่เย็น แล้วรถก็ดับกลางอากาศแถว<strong>สี่แยกเทพารักษ์</strong> หรือบนถนน<strong>ศรีนครินทร์</strong>... อาการแบบนี้ร้อยทั้งร้อยคือ "ไดชาร์จเสีย" ครับ! หลายคนพอรู้ว่าไดชาร์จพัง คำถามแรกที่เด้งขึ้นมาในหัวเลยคือ <strong>"ซ่อมไดชาร์จราคาเท่าไหร่?"</strong> และ <strong>"ซ่อมกับเปลี่ยนใหม่ แบบไหนคุ้มกว่ากัน?"</strong></p>

<p>วันนี้ช่างจาก FIRSTCARCENTER จะมาเปิดเรทราคาค่าซ่อมไดชาร์จแบบหมดเปลือก พร้อมวิเคราะห์ให้เห็นชัดๆ ว่าอาการแบบไหนควรซ่อม และอาการแบบไหนควรเปลี่ยนลูกใหม่ เพื่อให้คุณตัดสินใจได้คุ้มค่าเงินในกระเป๋าที่สุดครับ</p>

<img src="/images/blog/pig-alternator-cost-cover.svg" alt="ซ่อมไดชาร์จราคา เท่าไหร่ เปลี่ยนไดชาร์จ ศรีนครินทร์ บางนา แบริ่ง" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: การเช็กและประเมินราคาซ่อมไดชาร์จที่หน้างานจริง เพื่อแจ้งให้ลูกค้าทราบก่อนตัดสินใจ</em></p>

<h2>ไดชาร์จเสีย อาการเป็นอย่างไร?</h2>
<p>ก่อนจะไปดูราคาซ่อม เรามาเช็กให้ชัวร์ก่อนครับว่าไดชาร์จพังจริงๆ ไม่ใช่แค่แบตเสื่อม (อ่านเพิ่มเติม: <a href="/blog/car-battery-lifespan-guide" class="text-orange-600 hover:underline">อาการแบตเตอรี่เสื่อม เป็นอย่างไร?</a>)</p>
<ul>
  <li>ไฟรูปแบตเตอรี่สีแดงโชว์ค้างที่หน้าปัดขณะเครื่องยนต์ทำงาน</li>
  <li>ไฟหน้ารถสว่างสลับหรี่ หรือแอร์เดี๋ยวเย็นเดี๋ยวไม่เย็น</li>
  <li>มีเสียงหอนดังวี้ดๆ หรือเสียงลูกปืนแตกดังมาจากห้องเครื่อง (ฝั่งไดชาร์จ)</li>
  <li>พ่วงแบตเตอรี่แล้วสตาร์ทติด แต่พอถอดสายพ่วงออก รถดับทันที</li>
</ul>

<h2>ซ่อมไดชาร์จราคา เท่าไหร่? (เรทราคาอัปเดต 2026)</h2>
<p>การ <strong>ซ่อมไดชาร์จราคา</strong> จะถูกหรือแพง ขึ้นอยู่กับว่า "ชิ้นส่วนไหน" ภายในไดชาร์จที่พังครับ ช่างขอสรุปเรทราคาอะไหล่ยอดฮิตที่มักจะเสีย ดังนี้ครับ:</p>

<h3>1. เปลี่ยนแปลงถ่านไดชาร์จ (ราคาประมาณ 500 - 800 บาท)</h3>
<p>แปลงถ่านคือชิ้นส่วนที่เสียดสีเพื่อส่งกระแสไฟ เมื่อใช้รถไปนานๆ แปรงถ่านจะกุดและหมด ทำให้ไดชาร์จไม่จ่ายไฟ อาการนี้ <strong>"ซ่อมคุ้มที่สุด"</strong> ครับ เพราะเปลี่ยนแค่แปลงถ่าน ไดชาร์จก็กลับมาทำงานได้ปกติเหมือนใหม่</p>

<h3>2. เปลี่ยนคัทเอาท์ (IC Regulator) (ราคาประมาณ 1,200 - 1,800 บาท)</h3>
<p>คัทเอาท์ทำหน้าที่ควบคุมแรงดันไฟฟ้าไม่ให้สูงหรือต่ำเกินไป ถ้าคัทเอาท์พัง ไฟอาจจะชาร์จเกินจนแบตบวม หรือไม่ชาร์จเลย อาการนี้ยังถือว่าซ่อมได้คุ้มค่าครับ</p>

<h3>3. เปลี่ยนลูกปืนไดชาร์จ (ราคาประมาณ 800 - 1,500 บาท)</h3>
<p>ถ้าสตาร์ทรถแล้วมีเสียงหอนดังวี้ดๆ หรือเสียงเหล็กสีกัน มักเกิดจากลูกปืนแตก ต้องถอดไดชาร์จออกมาอัดลูกปืนใหม่ทั้งหัวและท้าย</p>

<h3>4. ขดลวดไหม้ ทุ่นไหม้ (อาการนี้ "ไม่แนะนำให้ซ่อม")</h3>
<p>ถ้าไดชาร์จทำงานหนักจนขดลวดทองแดงด้านในไหม้ หรือทุ่นสเตเตอร์ช็อต ค่าพันขดลวดใหม่จะแพงมาก (2,500 - 4,000+ บาท) และความทนทานก็ไม่เท่าของเดิม <strong>เคสนี้ช่างแนะนำให้ "เปลี่ยนไดชาร์จลูกใหม่" จะจบปัญหาและคุ้มค่ากว่าครับ</strong></p>

<h2>เปรียบเทียบ: ซ่อมของเดิม VS เปลี่ยนไดชาร์จเชียงกง (มือสอง) VS เปลี่ยนของใหม่</h2>

<p>หากคุณรถเสียอยู่แถว <strong>บางนา</strong> หรือ <strong>แพรกษา</strong> แล้วช่างประเมินว่าไดชาร์จพังหนัก มีทางเลือกดังนี้ครับ:</p>
<ul class="space-y-3 mt-4">
  <li><strong>ซ่อมของเดิม (งบ 500 - 2,000 บาท):</strong> เหมาะกับเคสที่พังแค่แปลงถ่าน หรือลูกปืนแตก ประหยัดงบที่สุด แต่ต้องมั่นใจว่าชิ้นส่วนอื่นยังสภาพดีอยู่</li>
  <li><strong>เปลี่ยนไดชาร์จเชียงกง/บิ้วใหม่ (งบ 2,000 - 4,500 บาท):</strong> หากของเดิมพังหนัก การเปลี่ยนไดชาร์จมือสอง (เชียงกง) ที่ผ่านการคัดสภาพมาแล้ว เป็นทางเลือกยอดฮิตของคนใช้รถแถว <strong>สุขุมวิท</strong> และ <strong>สมุทรปราการ</strong> เพราะราคาถูกกว่าเบิกศูนย์เกินครึ่ง และมักมีการรับประกันจากร้าน 3-6 เดือน</li>
  <li><strong>เบิกไดชาร์จใหม่แท้ศูนย์ (งบ 6,000 - 15,000+ บาท):</strong> ราคาสูงที่สุด แต่แลกมากับความสบายใจ 100% ได้ของแท้ตรงรุ่น อายุการใช้งานยาวนาน 5-10 ปี เหมาะสำหรับรถใหม่ หรือคนที่ต้องการความชัวร์แบบไม่ต้องลุ้น</li>
</ul>

<img src="/images/blog/pig-alternator-cost-info.svg" alt="Infographic" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h2>คำถามที่พบบ่อย (FAQ) ซ่อมไดชาร์จ</h2>
<div itemscope itemtype="https://schema.org/FAQPage" class="space-y-4 my-6">
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">ซ่อมไดชาร์จ ใช้เวลาทำนานไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">ถ้าเป็นการเปลี่ยนอะไหล่เบื้องต้น เช่น แปลงถ่าน หรือคัทเอาท์ จะใช้เวลาถอดประกอบและซ่อมประมาณ 2-3 ชั่วโมงครับ แต่ถ้าต้องเบิกอะไหล่เฉพาะรุ่น อาจจะต้องทิ้งรถไว้ครึ่งวันครับ</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">ไดชาร์จบิ้ว (Rebuilt) ดีไหม ทนหรือเปล่า?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">ไดชาร์จบิ้ว คือการนำไดชาร์จมือสองมาทำความสะอาด เปลี่ยนลูกปืน แปลงถ่าน และคัทเอาท์ใหม่ให้สมบูรณ์ ถือเป็นตัวเลือกที่คุ้มค่ามากครับ ราคาไม่แพง และใช้งานได้ทนทานใกล้เคียงของใหม่ (ขึ้นอยู่กับฝีมือร้านที่บิ้ว)</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">รถดับกลางทางเพราะไดชาร์จเสีย มีบริการซ่อมนอกสถานที่ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">FIRSTCARCENTER มีบริการตรวจเช็กและเปลี่ยนไดชาร์จนอกสถานที่ครับ หากรถคุณเสียอยู่แถว ศรีนครินทร์ บางนา แบริ่ง เทพารักษ์ เรามีช่างพร้อมอะไหล่วิ่งไปเปลี่ยนให้ถึงที่ ไม่ต้องเสียค่าลากรถครับ</p>
    </div>
  </div>
</div>

<div class="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 text-center my-10 shadow-sm hover:shadow-md transition-shadow">
  <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-[#FF6B00] to-[#FF3E00] rounded-full opacity-20 blur-2xl"></div>
  <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-br from-[#00F2FE] to-[#4FACFE] rounded-full opacity-20 blur-2xl"></div>
  <div class="relative z-10">
    <h2 class="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 mb-4">ไดชาร์จพัง รถดับ โทรเรียกช่าง FIRSTCARCENTER ด่วน!</h2>
    <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">ไฟแบตโชว์ รถดับกลางทาง ไม่ต้องตื่นตระหนก! เรามีบริการเช็กระบบไฟ <a href="/alternator-starter" class="text-orange-600 hover:underline">ซ่อมและเปลี่ยนไดชาร์จนอกสถานที่</a> ประเมิน <strong>ซ่อมไดชาร์จราคา</strong> ตรงไปตรงมา ไม่มีบวกเพิ่ม บริการรวดเร็วถึงที่ ครอบคลุมโซน ศรีนครินทร์, บางนา, แบริ่ง, ลาซาล, สุขุมวิท, เทพารักษ์, ซอยวัดหนามแดง, แพรกษา และ สมุทรปราการ</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a href="tel:0887671679" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B00] to-[#FF3E00] hover:from-[#E65A00] hover:to-[#E63500] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        <span>โทรเรียกช่างด่วน 088-767-1679</span>
      </a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00c300] to-[#00a800] hover:from-[#00b300] hover:to-[#009900] text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ประเมินราคาฟรี</span>
      </a>
    </div>
  </div>
</div>`;

const postData = {
  title: "ซ่อมไดชาร์จราคา เท่าไหร่? ซ่อมคุ้มไหม หรือเปลี่ยนลูกใหม่ (อัปเดต 2026)",
  slug: "alternator-repair-cost-2026",
  excerpt: "รถดับกลางทาง ไฟรูปแบตโชว์ ไดชาร์จเสีย! เช็กเรท ซ่อมไดชาร์จราคา ล่าสุด อาการไหนซ่อมคุ้ม อาการไหนควรเปลี่ยนใหม่ พร้อมบริการซ่อมนอกสถานที่ ศรีนครินทร์ บางนา แบริ่ง",
  content: htmlContent,
  coverImage: "/images/blog/pig-alternator-cost-cover.svg",
  category: "ระบบไฟและไดชาร์จ",
  tags: "ซ่อมไดชาร์จราคา,ซ่อมไดชาร์จ,เปลี่ยนแปลงถ่านไดชาร์จ,ไดชาร์จเสีย,ไดชาร์จเชียงกง,ร้านซ่อมไดชาร์จใกล้ฉัน,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สมุทรปราการ",
  published: true,
  author: "FIRSTCARCENTER",
  seoTitle: "ซ่อมไดชาร์จราคา เท่าไหร่? ซ่อมคุ้มไหม เช็กเรทล่าสุด 2026",
  seoDescription: "ไฟแบตโชว์ รถดับกลางทาง? เปิดเรท ซ่อมไดชาร์จราคา อัปเดตล่าสุด แบบไหนซ่อมได้ แบบไหนควรเปลี่ยนใหม่ พร้อมบริการซ่อมไดชาร์จนอกสถานที่ ศรีนครินทร์ บางนา สมุทรปราการ",
  seoKeywords: "ซ่อมไดชาร์จราคา,เปลี่ยนแปลงถ่านไดชาร์จ,ไดชาร์จเสีย,ไดชาร์จเชียงกง,ร้านซ่อมไดชาร์จใกล้ฉัน,เปลี่ยนไดชาร์จ,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "ซ่อมไดชาร์จราคา เท่าไหร่? คุ้มไหมที่จะซ่อม?",
  ogDescription: "เปิดเรทราคาค่าซ่อมไดชาร์จทุกอาการ! แปลงถ่านหมด ลูกปืนแตก หรือขดลวดไหม้ อาการไหนควรซ่อม อาการไหนควรเปลี่ยน?",
};

async function main() {
  console.log("Seeding SEO optimized 'Alternator Repair Cost' post...\n");

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
