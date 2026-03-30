const Database = require('better-sqlite3');
const db = new Database('prisma/dev.db');

const post = {
  title: "แบตเตอรี่ Honda City สตาร์ทไม่ติด ทำไงดี? รีวิวเปลี่ยนแบตด่วน โซนศรีนครินทร์ - บางนา",
  slug: "honda-city-battery-replacement-guide",
  excerpt: "รถ Honda City สตาร์ทไม่ติด แบตเสื่อม? ดูเคสรีวิวเปลี่ยนแบตเตอรี่ Honda City 1.0 Turbo แบบถึงที่ โซนศรีนครินทร์ บางนา แบริ่ง พร้อมวิธีเลือกแบตเตอรี่ที่คุ้มที่สุด",
  content: `
<p class="lead"><strong>แบตเตอรี่ Honda City</strong> สตาร์ทไม่ติดเป็นปัญหาที่เจ้าของรถรุ่นนี้เจอบ่อยมาก โดยเฉพาะใครที่ใช้รุ่น 1.0 Turbo ที่ระบบไฟและระบบ Auto Start-Stop ทำงานค่อนข้างหนัก วันนี้ <strong>PORNPISIT BATTERY</strong> จะมาเล่าเคสรีวิวการออกไปช่วยเหลือลูกค้าที่รถสตาร์ทไม่ติดในพื้นที่ <strong>ศรีนครินทร์ บางนา แบริ่ง ลาซาล</strong> และแนะนำเคล็ดลับในการเลือกแบตเตอรี่ Honda City ให้ใช้ได้ทนทานและคุ้มค่าที่สุดครับ</p>

<h2>สัญญาณเตือน แบตเตอรี่ Honda City ใกล้หมด</h2>
<p>ก่อนที่รถจะดับหรือสตาร์ทไม่ติดกลางทาง ส่วนใหญ่รถจะมีอาการเตือนล่วงหน้าให้เราสังเกตได้ หากเจออาการเหล่านี้ควรรีบหาร้าน<a href="/battery-replacement" class="text-orange-600 font-bold hover:underline">เปลี่ยนแบตเตอรี่รถยนต์</a>ทันทีครับ:</p>
<ul>
  <li><strong>สตาร์ทรถตอนเช้าเริ่มหน่วง:</strong> เครื่องยนต์หมุนช้ากว่าปกติ เสียงไดสตาร์ทฟังดูอืดๆ</li>
  <li><strong>ระบบ Auto Start-Stop ไม่ทำงาน:</strong> หากระบบนี้จู่ๆ ก็ตัดการทำงานไป มักเกิดจากแบตเตอรี่มีประจุไฟไม่เพียงพอที่ระบบจะยอมให้เครื่องยนต์ดับลง</li>
  <li><strong>ไฟหน้าสว่างน้อยลง:</strong> หรือมีอาการไฟกระพริบตอนที่คอมเพรสเซอร์แอร์ตัดต่อ</li>
  <li><strong>อายุแบตเตอรี่เกิน 1.5 - 2 ปี:</strong> สำหรับ Honda City รุ่นใหม่ๆ อายุเฉลี่ยแบตเตอรี่มักจะอยู่ราวๆ นี้ครับ</li>
</ul>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/honda-city-battery-case1.svg" alt="ช่างตรวจเช็กระบบไฟ แบตเตอรี่ Honda City 1.0 Turbo แถวตลาดหนามแดง เทพารักษ์" class="w-full h-auto object-cover m-0" />
</div>

<h2>Case Study: ช่วยเหลือฉุกเฉิน แบตเตอรี่ Honda City แถวแยกเทพารักษ์ - ตลาดหนามแดง</h2>
<p>เมื่อสัปดาห์ก่อน เราได้รับสายด่วนจากลูกค้าท่านหนึ่ง แจ้งว่าจอดรถแวะซื้อของหน้า <strong>ตลาดหนามแดง เทพารักษ์</strong> พอกลับมาที่รถ ปรากฏว่า <strong>Honda City 1.0 Turbo สตาร์ทไม่ติด</strong> มีแต่เสียง "แชะๆๆ" แล้วก็เงียบไป</p>

<p>ทีมช่าง PORNPISIT BATTERY รีบจัดเตรียมแบตเตอรี่ที่ตรงรุ่นและเครื่องมือช่าง ขี่มอเตอร์ไซค์บริการด่วนฝ่ารถติดไปถึงจุดเกิดเหตุภายใน 20 นาที เมื่อถึงหน้างาน ช่างได้ทำการใช้เครื่องมือวัดค่า CCA และแรงดันไฟ (Voltage) ปรากฏว่าค่า CCA ตกไปอยู่ต่ำกว่า 150 (เกณฑ์ปกติควรมากกว่า 300) ซึ่งยืนยันชัดเจนว่าแบตเตอรี่เสื่อมสภาพจนเก็บไฟไม่อยู่แล้ว</p>

<h3>ขั้นตอนการเปลี่ยนแบตเตอรี่ที่ปลอดภัย</h3>
<ol>
  <li><strong>สำรองไฟ ECU เสมอ:</strong> ก่อนถอดขั้วแบตเตอรี่เก่า ช่างของเราจะทำการต่ออุปกรณ์เลี้ยงไฟ Memory เข้ากับช่อง OBD2 เพื่อป้องกันไม่ให้ข้อมูลในกล่อง ECU หาย (วิทยุไม่ล็อค, รอบเดินเบาไม่เพี้ยน)</li>
  <li><strong>ทำความสะอาดขั้วแบต:</strong> หากมีคราบเกลือหรือขี้เกลือขาวๆ เกาะอยู่ ช่างจะใช้น้ำร้อนและแปรงลวดขัดทำความสะอาดให้ฟรี เพื่อการนำไฟฟ้าที่ดีที่สุด</li>
  <li><strong>ใส่แบตเตอรี่ลูกใหม่:</strong> ตรวจสอบการยึดแบตเตอรี่ให้แน่นหนา ขันขั้วบวกขั้วลบให้ตึงพอดี</li>
  <li><strong>เช็กระบบไดชาร์จ:</strong> หลังสตาร์ทรถ ช่างจะวัดไฟไดชาร์จให้อีกครั้ง เพื่อให้แน่ใจว่าไดชาร์จยังทำงานปกติ (ควรได้ไฟราวๆ 13.5 - 14.5 โวลต์) ในเคสนี้ไดชาร์จของลูกค้ายังดีเยี่ยมครับ</li>
</ol>

<div class="my-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
  <img src="/images/blog/honda-city-battery-case2.svg" alt="ติดตั้ง แบตเตอรี่ Honda City รุ่น EFB สำรองไฟ ECU คอนโดซอยแบริ่ง สุขุมวิท 107" class="w-full h-auto object-cover m-0" />
</div>

<h2>รถ Honda City ควรใช้แบตเตอรี่ยี่ห้อไหน รุ่นอะไร?</h2>
<p>สำหรับ <strong>แบตเตอรี่ Honda City</strong> จะแบ่งตามเจเนอเรชันของรถดังนี้ครับ:</p>

<h3>1. Honda City (รุ่นปี 2008 - 2013 และ 2014 - 2019)</h3>
<p>รถรุ่นนี้โดยมาตรฐานจากโรงงานจะใช้แบตเตอรี่ขนาดเล็ก <strong>ขั้ว L (ไซส์ 40B19L หรือ B24L)</strong> แอมป์ประมาณ 35-45 Ah แบรนด์ที่ร้านแนะนำและลูกค้าในย่าน <strong>สมุทรปราการ แพรกษา</strong> นิยมใช้ได้แก่:</p>
<ul>
  <li><strong>GS Battery:</strong> ทนทาน จ่ายไฟเสถียร</li>
  <li><strong>FB Battery:</strong> คุ้มค่า ราคาประหยัด</li>
  <li><strong>Panasonic / Amaron:</strong> แบรนด์ยอดฮิตที่ติดรถมาตั้งแต่ป้ายแดง</li>
</ul>

<h3>2. Honda City 1.0 Turbo (รุ่นปี 2020 - ปัจจุบัน)</h3>
<p>สำหรับรุ่นเทอร์โบ เครื่องยนต์จะต้องการกระแสไฟที่แรงและเสถียรมากขึ้น อีกทั้งยังมีระบบ Auto Start-Stop เข้ามาเกี่ยวข้อง ดังนั้น <strong>ห้ามใส่แบตเตอรี่รุ่นธรรมดาเด็ดขาด</strong> ต้องใช้แบตเตอรี่ชนิด <strong>EFB (Enhanced Flooded Battery)</strong> เท่านั้น (ไซส์ N55 หรือ Q85) เพื่อรองรับการกระชากไฟบ่อยๆ หากฝืนใส่แบตธรรมดา อายุการใช้งานจะสั้นมาก อาจพังภายใน 6-8 เดือนเลยครับ</p>

<h2>รถสตาร์ทไม่ติด แถวบางนา สุขุมวิท เรียกเราได้เลย</h2>
<p>ไม่ว่าคุณจะจอดรถเสียอยู่ที่ <strong>สุขุมวิท 107 (แบริ่ง), ลาซาล, เซ็นทรัลบางนา</strong> หรือโซนลึกๆ อย่าง <strong>แพรกษา สมุทรปราการ</strong> ทีมงาน PORNPISIT BATTERY มีเครือข่ายช่างพร้อมสแตนด์บายตลอด 24 ชั่วโมง เรามีแบตเตอรี่ทุกขนาด ทุกยี่ห้อ พร้อมวิ่งไปเปลี่ยนให้ถึงหน้าบ้าน คอนโด หรือริมถนน โดยไม่ต้องเสียค่าลากรถให้เปลืองเงิน</p>

<div style="background: linear-gradient(135deg, #fff7ed 0%, #fff 40%, #f0fdfa 100%); border: 1px solid #fed7aa; border-radius: 2rem; padding: 2.5rem 1.5rem; margin: 2.5rem 0; text-align: center; position: relative; overflow: hidden; box-shadow: 0 25px 60px -20px rgba(0,0,0,0.08);">
  <div style="position:absolute;top:-40px;right:-20px;width:160px;height:160px;background:rgba(251,146,60,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-40px;left:-20px;width:160px;height:160px;background:rgba(94,234,212,0.15);border-radius:50%;filter:blur(40px);pointer-events:none;"></div>
  <div style="position:relative;">
    <span style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.9);border:1px solid #fed7aa;border-radius:9999px;padding:0.5rem 1.25rem;font-size:0.875rem;font-weight:600;color:#ea580c;box-shadow:0 1px 3px rgba(0,0,0,0.06);">📞 บริการ 24 ชม. ถึงที่ทันที</span>
    <h3 style="margin:1.5rem auto 0;max-width:600px;font-size:1.75rem;font-weight:900;line-height:1.3;color:#1e293b;">แบตหมด สตาร์ทไม่ติด? เรียกช่างเปลี่ยนถึงที่!</h3>
    <p style="margin:1rem auto 0;max-width:520px;font-size:1rem;line-height:1.7;color:#64748b;">ช่างพร้อมนำแบตเตอรี่แท้ไปเปลี่ยนให้ถึงที่ภายใน 30 นาที รับประกัน 1-2 ปี เช็กระบบไฟฟรี และเลือกขนาดให้ตรงรุ่นรถ Honda City ทุกรุ่น</p>
    <div style="margin-top:2rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="tel:0996731296" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:linear-gradient(to right,#f97316,#ef4444);color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(249,115,22,0.7);">📞 โทรเรียกช่าง 099-673-1296</a>
      <a href="https://lin.ee/OBB86S4" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;min-width:260px;height:3.25rem;padding:0 1.75rem;background:#06C755;color:#fff;font-weight:700;font-size:1rem;border-radius:9999px;text-decoration:none;box-shadow:0 12px 30px -10px rgba(6,199,85,0.7);">💬 แอดไลน์ ส่งรูปประเมินฟรี</a>
    </div>
    <p style="margin-top:1.5rem;"><a href="/battery-replacement" style="color:#ea580c;font-weight:500;text-decoration:underline;text-underline-offset:4px;font-size:1rem;">ดูบริการเปลี่ยนแบตเตอรี่รถยนต์ →</a></p>
  </div>
</div>

<h2>คำถามที่พบบ่อย (FAQ) เรื่องแบตเตอรี่รถยนต์ Honda City</h2>
<div class="space-y-4 my-8" itemscope itemtype="https://schema.org/FAQPage">

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: แบตเตอรี่ Honda City ราคาเท่าไหร่?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ราคาเริ่มต้นจะอยู่ประมาณ 1,500 - 2,000 บาท สำหรับแบตเตอรี่รุ่นกึ่งแห้ง (MF) ไซส์เล็ก 40B19L แต่ถ้าเป็นรุ่น 1.0 Turbo ที่ต้องใช้แบต EFB ราคาจะสูงขึ้นมาเล็กน้อยอยู่ที่ราวๆ 2,500 - 3,200 บาท ขึ้นอยู่กับแบรนด์ครับ ทั้งนี้ราคานี้มักจะรวมเทิร์นแบตลูกเก่าแล้ว</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: แบตเตอรี่ Honda City 1.0 Turbo ใช้รุ่นธรรมดาได้ไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> ไม่แนะนำอย่างยิ่งครับ เพราะระบบรถมีฟังก์ชัน Auto Start-Stop ที่ดึงไฟกระชากบ่อย แบตเตอรี่ธรรมดาแผ่นธาตุจะไม่ทนทานพอ ทำให้เสื่อมสภาพเร็วมาก ควรใช้แบตเตอรี่ระบุชนิด EFB เท่านั้น เพื่ออายุการใช้งานที่คุ้มค่า 1.5 - 2 ปี</p>
    </div>
  </div>

  <div class="border rounded-xl p-4" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
    <h3 class="text-lg font-bold mt-0" itemprop="name">Q: บริการนอกสถานที่ มีคิดค่าเดินทางเพิ่มไหม?</h3>
    <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
      <p class="mb-0 text-slate-600" itemprop="text"><strong>A:</strong> หากอยู่ในพื้นที่ให้บริการของเรา เช่น ศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ เราบริการจัดส่งและเปลี่ยนให้ <strong>ฟรีค่าแรงและค่าเดินทาง</strong> จ่ายแค่ค่าแบตเตอรี่ราคามาตรฐานเท่านั้นครับ</p>
    </div>
  </div>

</div>
`,
  coverImage: "/images/blog/pig-honda-city-battery-cover.svg",
  category: "ซ่อมบำรุง",
  tags: "แบตเตอรี่รถยนต์,แบตเตอรี่ Honda City,เปลี่ยนแบตนอกสถานที่,สตาร์ทไม่ติด,แบต EFB,สมุทรปราการ,บางนา",
  published: 1, // boolean stored as integer in SQLite
  author: "PORNPISIT BATTERY",
  seoTitle: "แบตเตอรี่ Honda City ราคาเท่าไหร่? สตาร์ทไม่ติด ทำไงดี? รีวิวช่างบางนา",
  seoDescription: "รีวิวเคสเปลี่ยน แบตเตอรี่ Honda City 1.0 Turbo และรุ่นทั่วไป นอกสถานที่ 24 ชม. โซนห้วยขวาง ดินแดง ลาดพร้าว แบริ่ง เทพารักษ์ แนะนำวิธีเลือกแบตเตอรี่ให้อยู่ยาว",
  seoKeywords: "แบตเตอรี่ Honda City, เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่, แบตเตอรี่รถยนต์ บางนา, แบตเตอรี่ EFB",
  ogTitle: "แบตเตอรี่ Honda City สตาร์ทไม่ติด ทำไงดี? รีวิวเปลี่ยนแบตด่วน โซนศรีนครินทร์",
  ogDescription: "เจาะลึกเคส Honda City สตาร์ทไม่ติด พร้อมวิธีเลือกแบตเตอรี่ให้ตรงรุ่น (รวม EFB 1.0 Turbo) เรียกช่างด่วน 24 ชม.",
};

const insertSql = `
  INSERT INTO Post (
    id, slug, title, excerpt, content, coverImage, category, tags, published, author,
    seoTitle, seoDescription, seoKeywords, ogTitle, ogDescription, createdAt, updatedAt
  ) VALUES (
    lower(hex(randomblob(16))), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')
  )
`;

try {
  // Check if exists
  const existing = db.prepare('SELECT id FROM Post WHERE slug = ?').get(post.slug);
  if (existing) {
    db.prepare('DELETE FROM Post WHERE slug = ?').run(post.slug);
    console.log('Deleted existing post with same slug.');
  }

  db.prepare(insertSql).run(
    post.slug, post.title, post.excerpt, post.content, post.coverImage,
    post.category, post.tags, post.published, post.author,
    post.seoTitle, post.seoDescription, post.seoKeywords,
    post.ogTitle, post.ogDescription
  );
  console.log('✅ Successfully inserted blog post into local DB.');
} catch (e) {
  console.error('❌ Error inserting post:', e);
} finally {
  db.close();
}
