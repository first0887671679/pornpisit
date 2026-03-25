import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>แปรงถ่านไดสตาร์ทหมด อาการเป็นยังไง? ซ่อมได้ไหมหรือต้องเปลี่ยนใหม่</h1>
<p>เคยไหมครับ? เช้าวันจันทร์ที่กำลังรีบไปทำงานแถว <strong>บางนา ศรีนครินทร์ หรือแบริ่ง</strong> พอขึ้นรถแล้วบิดกุญแจสตาร์ท กลับมีแค่เสียง "แชะ" หรือ "กริ๊ก" แค่ทีเดียวแล้วเงียบไปเลย ไฟหน้าปัดก็ยังสว่าง แอร์ก็ยังเย็น แบบนี้ฟันธงได้เลยครับว่าไม่ใช่แบตเตอรี่หมด แต่เป็นอาการของ <strong>แปรงถ่านไดสตาร์ทหมด</strong> หรือที่หลายคนเรียกว่า ไดสตาร์ทเสีย นั่นเองครับ</p>

<p>วันนี้ช่างจาก FIRSTCARCENTER จะมาแชร์ประสบการณ์จากการออกไปช่วยเหลือลูกค้าหน้างานจริง พร้อมอธิบายให้เข้าใจง่ายๆ ว่าถ้า <strong>แปรงถ่านไดสตาร์ทหมด</strong> เราสามารถซ่อมเฉพาะจุดได้ไหม ราคาเท่าไหร่ หรือจำเป็นต้องเปลี่ยนไดสตาร์ทลูกใหม่ไปเลย เพื่อให้คุณประหยัดงบได้มากที่สุดครับ</p>

<img src="/images/blog/pig-starter-brush-cover.svg" alt="แปรงถ่านไดสตาร์ทหมด ไดสตาร์ทเสีย ซ่อมไดสตาร์ท ศรีนครินทร์ บางนา แบริ่ง" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: อาการบิดกุญแจเงียบ มีแค่เสียงแชะ มักเกิดจากแปรงถ่านไดสตาร์ทสึกหรอจนหมด</em></p>

<h2>วิธีเช็กอาการ แปรงถ่านไดสตาร์ทหมด ด้วยตัวเองเบื้องต้น</h2>
<p>ก่อนจะเรียกช่างหรือเรียกรถลากเข้าอู่ คุณสามารถประเมินอาการ <strong>ไดสตาร์ทรถยนต์</strong> เบื้องต้นได้ด้วยตัวเองง่ายๆ ดังนี้ครับ:</p>

<h3>1) บิดกุญแจแล้วมีเสียงดังกริ๊กเดียว</h3>
<p>เมื่อบิดกุญแจไปที่ตำแหน่ง Start จะได้ยินเสียงตัวออโตเมติกไดสตาร์ททำงาน (เสียงกริ๊ก) แต่มอเตอร์ไม่ยอมหมุนเครื่องยนต์ อาการนี้บ่งบอกชัดเจนว่าไฟจากแบตเตอรี่มาถึงไดสตาร์ทแล้ว แต่ตัวมอเตอร์ไม่มีกำลังหมุนเพราะ <strong>แปรงถ่านไดสตาร์ทหมด</strong> และไม่สัมผัสกับทุ่นอาร์เมเจอร์</p>

<h3>2) สตาร์ทอืด ทั้งที่เพิ่งเปลี่ยนแบตเตอรี่ใหม่</h3>
<p>บางคันอาจจะยังสตาร์ทติดอยู่ แต่มอเตอร์หมุนช้ามาก (สตาร์ทอืด) อาการคล้ายแบตเตอรี่อ่อน แต่ถ้าคุณเพิ่งเปลี่ยนแบตมาไม่นาน ให้สงสัยไว้ก่อนเลยว่าแปรงถ่านใกล้จะหมด หรือภายในไดสตาร์ทสกปรกมากครับ</p>

<h3>3) ทริคฉุกเฉิน: ลองเคาะไดสตาร์ท</h3>
<p>ถ้ารถไปดับแถว <strong>แยกเทพารักษ์ หรือเส้นสุขุมวิทตอนปลาย</strong> แล้วต้องการขับกลับบ้านด่วน ให้ลองหาท่อนไม้หรือประแจยาวๆ <strong>เคาะเบาๆ ที่ตัวไดสตาร์ท</strong> ในขณะที่บิดกุญแจสตาร์ท การเคาะจะช่วยให้เศษฝุ่นหลุดและแปรงถ่านที่ค้างอยู่ขยับไปแตะกับทุ่น ทำให้รถสตาร์ทติดได้ชั่วคราวครับ (แต่หลังจากนั้นต้องรีบซ่อมทันที)</p>

<h2>Case Study: รีวิวซ่อมหน้างานจริง รูปรถลูกค้าที่จอดเสียในซอยวัดหนามแดง</h2>
<p>เมื่อสัปดาห์ก่อน ทีมงาน FIRSTCARCENTER ได้รับแจ้งเหตุฉุกเฉินจากลูกค้าใน <strong>ซอยวัดหนามแดง สมุทรปราการ</strong> ลูกค้าแจ้งว่ารถสตาร์ทไม่ติด คิดว่าแบตเตอรี่หมด เพราะใช้งานมาเกือบ 2 ปีแล้ว</p>

<p>เมื่อช่างของเราไปถึงหน้างานและใช้เครื่องมือวัดค่า CCA ของแบตเตอรี่ พบว่าแบตเตอรี่ยังมีไฟเต็มเปี่ยม! ช่างจึงมุดเช็กที่ระบบสตาร์ทและพบว่า <strong>แปรงถ่านไดสตาร์ทหมด</strong> เกลี้ยงจนสปริงดันไม่ถึง ช่างได้ประเมินสภาพทุ่นและทุ่นอาร์เมเจอร์พบว่ายังสวยงาม จึงเสนอทางเลือกให้ลูกค้า <strong>"ซ่อมเปลี่ยนเฉพาะชุดแปรงถ่านไดสตาร์ท"</strong> แทนการเปลี่ยนไดสตาร์ทลูกใหม่ทั้งลูก</p>

<div class="my-8">
  <div class="aspect-w-16 aspect-h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 p-8">
    <svg class="w-12 h-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2 1.586-1.586a2 2 0 012.828 0L20 14m-6-10h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    <p class="text-slate-500 font-medium text-center">ภาพผลงานจริง: ซ่อมไดสตาร์ท เปลี่ยนแปรงถ่านให้ลูกค้าซอยวัดหนามแดง<br/>(พื้นที่สำหรับแทรกรูปรถลูกค้าจริง)</p>
  </div>
  <p class="text-sm text-center text-slate-500 mt-2"><em>เคสจริง: ทีมช่างถอดไดสตาร์ทออกมาเปลี่ยนแปรงถ่านให้ถึงหน้างาน ประหยัดค่ารถลากเข้าอู่</em></p>
</div>

<h2>ซ่อมเปลี่ยนแปรงถ่าน VS เปลี่ยนไดสตาร์ทลูกใหม่ แบบไหนคุ้มกว่า?</h2>
<p>หลายคนสงสัยว่า <strong>ราคาเปลี่ยนแปรงถ่านไดสตาร์ท</strong> คุ้มไหมที่จะทำ? คำตอบคือ "คุ้มมากครับ" ถ้าชิ้นส่วนอื่นในตัวไดสตาร์ทยังสมบูรณ์</p>
<ul class="list-disc pl-6 space-y-3">
  <li><strong>เปลี่ยนชุดแปรงถ่าน:</strong> ราคาหลักร้อยถึงพันต้นๆ (รวมค่าแรง) ข้อดีคือประหยัดเงิน ได้ใช้ไดสตาร์ทแท้ติดรถตัวเดิมต่อไป</li>
  <li><strong>เปลี่ยนไดสตาร์ทบิ้ว (Rebuilt):</strong> ราคาประมาณ 2,000 - 3,500 บาท เหมาะสำหรับเคสที่ขดลวดไหม้ หรือลูกปืนแตกไปแล้ว</li>
  <li><strong>เปลี่ยนไดสตาร์ทเบิกศูนย์ (OEM New):</strong> ราคาค่อนข้างสูง 5,000 - หลักหมื่นบาท เหมาะกับคนที่ต้องการความชัวร์ 100%</li>
</ul>

<img src="/images/blog/pig-starter-brush-info.svg" alt="อาการไดสตาร์ทเสีย ราคาเปลี่ยนแปรงถ่านไดสตาร์ท ลาซาล แพรกษา สมุทรปราการ" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: สรุป 4 อาการที่บ่งบอกว่าไดสตาร์ทกำลังมีปัญหา ควรเรียกช่างเช็กทันที</em></p>

<p>หากคุณไม่มั่นใจว่ารถของคุณเป็นที่แบตเตอรี่หมด หรือไดสตาร์ทเสียกันแน่ ทาง FIRSTCARCENTER มีบริการ <a href="/battery-replacement" class="text-blue-600 font-semibold hover:underline">เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่</a> พร้อมเช็กระบบไฟให้ฟรี หรือถ้าสรุปแล้วเป็นที่ไดสตาร์ท เราก็มีทีมช่างบริการ <a href="/alternator-starter" class="text-blue-600 font-semibold hover:underline">ซ่อมไดชาร์จ ไดสตาร์ท นอกสถานที่</a> โดยที่คุณไม่ต้องเสียค่าเรียกรถลากลากรถเข้าอู่เลยครับ</p>

<div class="not-prose relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-cyan-200/60 dark:border-cyan-500/20 text-center my-8 sm:my-10 shadow-lg shadow-cyan-100/50 dark:shadow-cyan-900/10">
  <div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-15 blur-3xl"></div>
  <div class="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-10 blur-3xl"></div>
  <div class="relative z-10 max-w-2xl mx-auto">
    <div class="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/></svg>
      <span>ซ่อมและประเมินราคาถึงหน้างาน</span>
    </div>
    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-3 leading-tight">บิดกุญแจเงียบ? รถสตาร์ทไม่ติด? โทรหาเราด่วน</h3>
    <p class="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">FIRSTCARCENTER ให้บริการซ่อมไดสตาร์ท เปลี่ยนแปรงถ่าน และเปลี่ยนแบตเตอรี่ ครอบคลุมพื้นที่ ศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ แพรกษา สมุทรปราการ</p>
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <a href="tel:0887671679" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
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

<h2>FAQ: คำถามที่พบบ่อย (แปรงถ่านไดสตาร์ทหมด)</h2>
<div class="space-y-6 mt-6">
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: แปรงถ่านไดสตาร์ทมีอายุการใช้งานกี่ปี?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> โดยเฉลี่ยจะอยู่ที่ประมาณ 100,000 - 150,000 กิโลเมตร หรือประมาณ 5-7 ปี ขึ้นอยู่กับความถี่ในการสตาร์ทรถครับ (รถที่ขับส่งของบ่อยๆ จะหมดเร็วกว่าปกติ)</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ราคาเปลี่ยนแปรงถ่านไดสตาร์ท ประมาณเท่าไหร่?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> การเปลี่ยนเฉพาะชุดแปรงถ่าน ราคาจะอยู่ประมาณหลักร้อยปลายๆ ถึงหนึ่งพันกว่าบาท (รวมค่าแรง) ซึ่งประหยัดกว่าการเปลี่ยนไดสตาร์ทลูกใหม่หลายพันบาทครับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ถ้ารถเสียหน้าบ้านแถวบางนา ช่างเข้ามาถอดซ่อมให้ได้ไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ได้แน่นอนครับ! ทีมช่าง FIRSTCARCENTER สามารถเข้าไปถอดไดสตาร์ท เปลี่ยนแปรงถ่าน และประกอบกลับให้ใช้งานได้ปกติถึงที่รถ ไม่ว่าจะเป็นโซน บางนา ศรีนครินทร์ แบริ่ง หรือสมุทรปราการ</p>
  </div>
</div>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "แปรงถ่านไดสตาร์ทมีอายุการใช้งานกี่ปี?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "โดยเฉลี่ยจะอยู่ที่ประมาณ 100,000 - 150,000 กิโลเมตร หรือประมาณ 5-7 ปี ขึ้นอยู่กับความถี่ในการสตาร์ทรถครับ (รถที่ขับส่งของบ่อยๆ จะหมดเร็วกว่าปกติ)"
      }
    },
    {
      "@type": "Question",
      "name": "ราคาเปลี่ยนแปรงถ่านไดสตาร์ท ประมาณเท่าไหร่?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "การเปลี่ยนเฉพาะชุดแปรงถ่าน ราคาจะอยู่ประมาณหลักร้อยปลายๆ ถึงหนึ่งพันกว่าบาท (รวมค่าแรง) ซึ่งประหยัดกว่าการเปลี่ยนไดสตาร์ทลูกใหม่หลายพันบาทครับ"
      }
    },
    {
      "@type": "Question",
      "name": "ถ้ารถเสียหน้าบ้านแถวบางนา ช่างเข้ามาถอดซ่อมให้ได้ไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ได้แน่นอนครับ! ทีมช่าง FIRSTCARCENTER สามารถเข้าไปถอดไดสตาร์ท เปลี่ยนแปรงถ่าน และประกอบกลับให้ใช้งานได้ปกติถึงที่รถ ไม่ว่าจะเป็นโซน บางนา ศรีนครินทร์ แบริ่ง หรือสมุทรปราการ"
      }
    }
  ]
}
</script>
`;

const postData = {
  slug: "starter-motor-brush-repair-guide",
  title: "แปรงถ่านไดสตาร์ทหมด อาการเป็นไง? ซ่อมได้ไหมหรือต้องเปลี่ยน",
  content: htmlContent,
  excerpt: "รถสตาร์ทไม่ติดมีเสียงแชะเดียว อาจเป็นเพราะ แปรงถ่านไดสตาร์ทหมด อ่านวิธีเช็กอาการเบื้องต้น พร้อมรีวิวเคสซ่อมหน้างานจริง ศรีนครินทร์ บางนา แบริ่ง",
  coverImage: "/images/blog/pig-starter-brush-cover.svg",
  category: "ไดชาร์จ ไดสตาร์ท",
  published: true,
  seoTitle: "แปรงถ่านไดสตาร์ทหมด อาการเป็นไง? เช็กราคาซ่อม | FIRSTCARCENTER",
  seoDescription: "แปรงถ่านไดสตาร์ทหมด อาการบิดกุญแจเงียบ สตาร์ทไม่ติด ซ่อมไดสตาร์ทเปลี่ยนแปรงถ่านราคาเท่าไหร่ บริการนอกสถานที่ ศรีนครินทร์ บางนา แบริ่ง เทพารักษ์ สมุทรปราการ",
  seoKeywords: "แปรงถ่านไดสตาร์ทหมด,ไดสตาร์ทเสีย,ซ่อมไดสตาร์ท,ราคาเปลี่ยนแปรงถ่านไดสตาร์ท,ไดสตาร์ทรถยนต์,เคาะไดสตาร์ท,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "แปรงถ่านไดสตาร์ทหมด อาการเป็นยังไง? ซ่อมหน้างานประหยัดกว่า",
  ogDescription: "แชร์ประสบการณ์ซ่อมไดสตาร์ทหน้างานจริง รถสตาร์ทไม่ติดเกิดจากแปรงถ่านหมด เปลี่ยนเฉพาะจุดคุ้มกว่าซื้อใหม่",
};

async function main() {
  console.log("Seeding SEO optimized 'starter motor brush' post...");

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
