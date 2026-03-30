import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>แบตหมดทำไง? วิธีแก้ปัญหาเฉพาะหน้า เมื่อรถสตาร์ทไม่ติด (อัปเดต 2026)</h1>
<p>ถ้าคุณกำลังเจอสถานการณ์รถสตาร์ทไม่ติด เงียบสนิท และมั่นใจว่า <strong>"แบตหมดแน่ๆ"</strong> ไม่ว่าจะเพราะลืมปิดไฟหน้า จอดรถทิ้งไว้นาน หรือแบตเตอรี่เสื่อมสภาพตามอายุการใช้งาน... อย่าเพิ่งตกใจครับ! ปัญหานี้แก้ได้ไม่ยาก</p>
<p>วันนี้ช่างแบตเตอรี่จาก PORNPISIT BATTERY จะมาแชร์วิธีเอาตัวรอดจากสถานการณ์ <strong>แบตหมดทำไง</strong> แบบละเอียดทีละขั้นตอน ทั้งวิธีพ่วงแบตที่ถูกต้อง ปลอดภัยต่อระบบไฟรถยนต์ (โดยเฉพาะรถรุ่นใหม่ๆ ปี 2026) และวิธีเรียกช่างด่วนสำหรับคนที่ไม่มีสายพ่วงหรือไม่อยากรบกวนคนอื่นครับ</p>

<img src="/images/blog/pig-dead-battery-cover.svg" alt="ภาพการ์ตูนหมูช่าง PORNPISIT BATTERY แบตหมดทำไง ศรีนครินทร์ บางนา" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h2>วิธีพ่วงแบตเตอรี่รถยนต์ที่ถูกต้อง (ไม่ต้องกลัวไฟช็อต)</h2>
<p>ถ้าคุณมี "สายพ่วงแบตเตอรี่" ติดรถไว้ และมีรถของพลเมืองดี (หรือรถเพื่อน) มาช่วย นี่คือขั้นตอนการพ่วงแบตเตอรี่ที่ปลอดภัยที่สุดสำหรับรถยนต์ยุคนี้ครับ:</p>

<h3>ขั้นตอนการคีบสายพ่วง (เริ่มจากบวกไปลบ)</h3>
<ol>
  <li><strong>สีแดง (+) รถคันที่แบตหมด:</strong> นำหัวหนีบสีแดง คีบเข้ากับขั้วบวก (+) ของรถคันที่สตาร์ทไม่ติด</li>
  <li><strong>สีแดง (+) รถคันที่มาช่วย:</strong> นำหัวหนีบสีแดงอีกฝั่ง คีบเข้ากับขั้วบวก (+) ของรถคันที่แบตเต็ม</li>
  <li><strong>สีดำ (-) รถคันที่มาช่วย:</strong> นำหัวหนีบสีดำ คีบเข้ากับขั้วลบ (-) ของรถคันที่มาช่วย</li>
  <li><strong>สีดำ (-) คีบตัวถังรถที่แบตหมด:</strong> <em>จุดนี้สำคัญมาก!</em> ให้นำหัวหนีบสีดำที่เหลือ ไปคีบกับส่วนที่เป็นเหล็ก/โลหะของเครื่องยนต์ หรือตัวถังรถคันที่แบตหมด <strong>(ห้ามคีบที่ขั้วลบของแบตเตอรี่ที่หมดเด็ดขาด เพื่อป้องกันประกายไฟและแก๊สระเบิด)</strong></li>
</ol>

<img src="/images/blog/pig-jump-start-guide.svg" alt="ภาพการ์ตูนหมูช่าง PORNPISIT BATTERY สอนพ่วงแบตเตอรี่รถยนต์ แบริ่ง ลาซาล" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h3>ขั้นตอนการสตาร์ทและถอดสายพ่วง</h3>
<p>หลังจากคีบสายครบทั้ง 4 จุดแล้ว ให้สตาร์ทรถคันที่มาช่วยทิ้งไว้สัก 2-3 นาที เพื่อปั่นไฟเข้าแบตเตอรี่ลูกที่หมด จากนั้นลองสตาร์ทรถคันที่แบตหมดดูครับ เมื่อเครื่องติดแล้ว ให้ถอดสายพ่วง <strong>ย้อนกลับจากตอนใส่ (เริ่มจากถอดขั้วลบสีดำที่ตัวถังรถก่อน)</strong> ครับ</p>

<h2>แบตหมด แต่ไม่มีสายพ่วง ไม่มีรถช่วย ทำอย่างไร?</h2>
<p>เข้าใจเลยครับว่าบางทีรถไปเสียตอนดึกๆ หรือในที่เปลี่ยวๆ อย่างริมถนนบางนา-ตราด หรือทางเข้าตลาดหนามแดง จะไปโบกรถใครก็อาจจะยากและไม่ค่อยปลอดภัย ถ้าคุณเจอสถานการณ์แบบนี้ แนะนำว่า <strong>อย่าฝืนบิดกุญแจสตาร์ทแช่ยาวๆ ซ้ำๆ</strong> เพราะจะทำให้มอเตอร์สตาร์ทพังตามไปด้วยครับ</p>

<p>ทางแก้ที่ง่าย ปลอดภัย และจบปัญหาไวที่สุดคือ <a href="/battery-replacement" title="บริการเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่" class="text-orange-600 font-semibold hover:underline">เรียกช่างเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่</a> ครับ ปัจจุบันปี 2026 บริการนี้รวดเร็วมาก ยิ่งถ้าคุณอยู่ในโซน <strong>ศรีนครินทร์, บางนา, แบริ่ง, ลาซาล, เทพารักษ์ หรือแพรกษา</strong> ช่างจาก PORNPISIT BATTERY สามารถขี่มอเตอร์ไซค์พร้อมแบตลูกใหม่ไปถึงหน้างานคุณได้ภายใน 30-45 นาทีเท่านั้น!</p>

<img src="/images/blog/pig-call-for-help-battery.svg" alt="ภาพการ์ตูนหมูช่าง PORNPISIT BATTERY เรียกช่างเปลี่ยนแบตเตอรี่ด่วน แพรกษา สมุทรปราการ" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h2>คำถามที่พบบ่อย (FAQ) เมื่อแบตเตอรี่รถยนต์หมด</h2>
<div itemscope itemtype="https://schema.org/FAQPage" class="space-y-4 my-6">
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">พ่วงแบตเตอรี่แล้วรถไม่ติด เกิดจากอะไร?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">อาจเกิดจากสายพ่วงไม่ได้มาตรฐาน (สายเส้นเล็กเกินไปไฟเดินไม่สะดวก), ขั้วแบตเตอรี่หลวมหรือสกปรก, หรือปัญหาไม่ได้อยู่ที่แบตหมด แต่อาจเป็นที่ไดสตาร์ทพัง หรือปั๊มติ๊กน้ำมันเสียครับ</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">แบตหมดเกลี้ยง ชาร์จใหม่ได้ไหม หรือต้องเปลี่ยนเลย?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">ถ้าแบตเพิ่งเปลี่ยนมาไม่ถึง 1 ปี แล้วเผลอลืมเปิดไฟทิ้งไว้ สามารถพ่วงติดแล้วขับชาร์จไฟประมาณ 30-40 นาที แบตจะกลับมาใช้ได้ครับ แต่ถ้าอายุแบตเกิน 1.5 - 2 ปีไปแล้ว เปลี่ยนแบตเตอรี่ลูกใหม่จะชัวร์กว่าครับ เพราะเซลล์เก็บไฟน่าจะเสื่อมแล้ว</p>
    </div>
  </div>
  <div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <h3 itemprop="name" class="text-lg font-bold text-slate-800 m-0">แบตหมดกลางดึก แถวสมุทรปราการ มีช่างวิ่งไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="mt-2 text-slate-600">
      <p itemprop="text" class="m-0">มีครับ! PORNPISIT BATTERY มีบริการเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ ครอบคลุมพื้นที่ ศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ แพรกษา พร้อมช่างแสตนด์บายดูแลคุณอย่างรวดเร็ว</p>
    </div>
  </div>
</div>

<div class="not-prose" style="margin-top:2.5rem;">
  <div style="background:linear-gradient(135deg,#f8fafc,#eff6ff);border:1px solid #bfdbfe;border-radius:1.25rem;padding:2rem 1.5rem;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
    <h2 style="margin:0 0 0.5rem;font-size:1.35rem;font-weight:800;color:#1e3a8a;line-height:1.4;">แบตหมดทำไง? โทรหา PORNPISIT BATTERY ด่วน!</h2>
    <p style="margin:0 0 1.25rem;font-size:0.95rem;color:#334155;line-height:1.7;">ไม่ต้องทนร้อนรอรถลาก! บริการเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ด่วน<br/>โซนสมุทรปราการ ห้วยขวาง ดินแดง ลาดพร้าว ถึงที่หมายไว ราคามาตรฐาน พร้อมรับประกัน</p>
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;justify-content:center;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;gap:0.4rem;background:#ea580c;color:#fff;font-weight:700;font-size:0.95rem;padding:0.7rem 1.5rem;border-radius:9999px;text-decoration:none;box-shadow:0 2px 8px rgba(234,88,12,0.3);transition:background 0.2s;">📞 โทรเรียกช่างด่วน 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.4rem;background:#00b900;color:#fff;font-weight:700;font-size:0.95rem;padding:0.7rem 1.5rem;border-radius:9999px;text-decoration:none;box-shadow:0 2px 8px rgba(0,185,0,0.3);transition:background 0.2s;">💬 แอดไลน์ ปรึกษาและส่งพิกัด</a>
    </div>
  </div>
</div>`;

const postData = {
  title: "แบตหมดทำไง? วิธีแก้ปัญหาเฉพาะหน้า รถสตาร์ทไม่ติด (อัปเดต 2026) | PORNPISIT BATTERY",
  slug: "what-to-do-when-car-battery-is-dead",
  excerpt: "รถสตาร์ทไม่ติด แบตหมดทำไงดี? สอนวิธีพ่วงแบตเตอรี่รถยนต์ที่ถูกต้อง ปลอดภัย 100% พร้อมบริการช่างเปลี่ยนแบตด่วนนอกสถานที่ ศรีนครินทร์ บางนา แบริ่ง สมุทรปราการ",
  content: htmlContent,
  coverImage: "/images/blog/pig-dead-battery-cover.svg",
  category: "ความรู้รถยนต์",
  tags: "แบตหมดทำไง,รถสตาร์ทไม่ติด,วิธีพ่วงแบตเตอรี่รถยนต์,แบตเตอรี่หมดเกลี้ยง,ช่างเปลี่ยนแบตเตอรี่,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สมุทรปราการ",
  published: true,
  author: "PORNPISIT BATTERY",
  seoTitle: "แบตหมดทำไง? วิธีพ่วงแบตที่ถูกต้อง & เรียกช่างด่วน (อัปเดต 2026)",
  seoDescription: "รถสตาร์ทไม่ติด แบตหมดทำไงดี? ดูวิธีพ่วงแบตเตอรี่รถยนต์ที่ถูกต้อง ปลอดภัย 100% พร้อมบริการช่างเปลี่ยนแบตด่วนนอกสถานที่ ศรีนครินทร์ บางนา สมุทรปราการ",
  seoKeywords: "แบตหมดทำไง,รถสตาร์ทไม่ติด,วิธีพ่วงแบตเตอรี่รถยนต์,แบตเตอรี่รถยนต์หมด,เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "แบตหมดทำไง? วิธีแก้ปัญหารถสตาร์ทไม่ติดฉุกเฉิน",
  ogDescription: "แชร์วิธีเอาตัวรอดเมื่อแบตเตอรี่รถยนต์หมด สอนพ่วงแบตแบบปลอดภัย พร้อมบริการเรียกช่างด่วนถึงที่ บางนา-สมุทรปราการ",
};

async function main() {
  console.log("Seeding SEO optimized 'dead battery' post...");
  
  const existingPost = await prisma.post.findUnique({
    where: { slug: postData.slug }
  });

  if (existingPost) {
      console.log(`⏭️ Post already exists, skipping: ${postData.title}`);
  } else {
    const newPost = await prisma.post.create({
      data: postData,
    });
    console.log(`✅ Successfully seeded new post: ${newPost.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
