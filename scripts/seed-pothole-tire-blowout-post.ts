import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const htmlContent = `<h1>ขับรถตกหลุม ยางแตก แม็กดุ้ง! ปะได้ไหม หรือต้องเปลี่ยนยางอะไหล่สถานเดียว? (อัปเดต 2026)</h1>
<p>ประสบการณ์สุดระทึกที่คนใช้รถใช้ถนนตอนกลางคืนต้องเคยเจอ! ขับรถมาด้วยความเร็วปกติบนถนนมืดๆ แถว <strong>ศรีนครินทร์ หรือ เทพารักษ์</strong> จู่ๆ รถก็กระแทกเข้ากับหลุมบ่อขนาดใหญ่อย่างจัง เสียงดัง "ตึง!" สนั่นลั่นรถ ตามมาด้วยพวงมาลัยดึงแฉลบ และเสียงบดยางดังครืดๆ... ใช่ครับ คุณเพิ่งแจ็คพอต <strong>"ตกหลุมยางแตก"</strong> เข้าให้แล้ว!</p>

<p>ปัญหา <strong>ขับรถตกหลุมยางแตก</strong> มักเกิดในช่วงหน้าฝน หรือบนถนนที่กำลังก่อสร้างแถว <strong>บางนา หรือ แพรกษา</strong> พอเกิดเหตุตอนดึกๆ หลายคนมักจะช็อกและทำอะไรไม่ถูก วันนี้ช่างจาก FIRSTCARCENTER จะมาแชร์วิธีเอาตัวรอด ประเมินความเสียหาย (แม็กดุ้งไหม?) และคำตอบที่ทุกคนอยากรู้ว่า "ยางแตกแบบนี้ ปะได้ไหม?" ครับ</p>

<img src="/images/blog/pig-pothole-tire-blowout-cover.svg" alt="ตกหลุมยางแตก แม็กดุ้ง ปะได้ไหม ศรีนครินทร์ บางนา แบริ่ง" class="rounded-xl my-6 w-full object-cover shadow-sm" />
<p class="text-sm text-center text-slate-500 mt-2"><em>ภาพ: อุบัติเหตุตกหลุมยางแตกตอนกลางคืน เป็นสิ่งที่ผู้ขับขี่หลีกเลี่ยงได้ยาก หากเส้นทางมืดและไม่มีป้ายเตือน</em></p>

<h2>ตกหลุมอย่างแรง สร้างความเสียหายอะไรกับล้อรถบ้าง?</h2>
<p>แรงกระแทกจากการตกหลุมด้วยความเร็วสูง (เกิน 60 กม./ชม.) ไม่ได้ทำให้แค่ยางแบนธรรมดาเหมือนเหยียบตะปูครับ แต่มันคือการบีบอัดอย่างรุนแรงระหว่างขอบหลุมกับขอบล้อแม็ก ซึ่งความเสียหายที่มักจะเจอกันบ่อยๆ มี 3 ระดับครับ:</p>

<h3>1. แก้มยางบวม (Tire Bulge)</h3>
<p>ถ้าโชคดีหน่อย ล้อแม็กอาจจะไม่เป็นไร แต่แรงกระแทกจะทำให้โครงสร้างเส้นลวดและผ้าใบด้านในแก้มยาง "ขาด" ทำให้ลมยางดันเนื้อยางปูดบวมออกมาเป็นลูกมะนาว อาการนี้ <strong>ห้ามฝืนวิ่งทางไกลเด็ดขาด</strong> เพราะยางพร้อมจะระเบิดได้ทุกเมื่อครับ (อ่านเพิ่มเติม: <a href="/posts/bulging-tire-warning-guide" class="text-orange-600 font-semibold hover:underline">แก้มยางบวม เสี่ยงระเบิดแค่ไหน?</a>)</p>

<h3>2. แก้มยางฉีกขาด (Sidewall Tear)</h3>
<p>กรณีนี้เจอบ่อยที่สุดเวลาตกหลุมบ่อฝาท่อ ขอบคมๆ ของหลุมจะบาดเข้าที่แก้มยางจนฉีกเป็นรอยยาว ลมยางจะรั่วออกหมดเกลี้ยงภายในไม่กี่วินาที รถจะเสียการทรงตัวทันทีครับ</p>

<img src="/images/blog/pig-pothole-tire-blowout-info.svg" alt="ยางฉีก แม็กดุ้ง ตกหลุม ปะยางไม่ได้ ลาซาล สุขุมวิท สมุทรปราการ" class="rounded-xl my-6 w-full object-cover shadow-sm" />

<h3>3. ล้อแม็กดุ้ง หรือ แม็กแตก (Bent/Cracked Rim)</h3>
<p>ถ้าหลุมลึกมากหรือขับมาเร็วจัด ล้อแม็กอัลลอยจะรับแรงกระแทกไม่ไหวจนขอบแม็กงอผิดรูป (ที่เรียกกันว่า "แม็กดุ้ง") ถ้ารุนแรงมากแม็กอาจจะร้าวหรือแตกเลย อาการนี้ต่อให้เปลี่ยนยางเส้นใหม่ ลมก็จะรั่วออกตามขอบแม็กอยู่ดีครับ</p>

<h2>คำถามยอดฮิต: "ตกหลุม แก้มยางฉีก ปะได้ไหม?"</h2>
<p>ถ้าคุณจอดรถอยู่ข้างทางมืดๆ แถว <strong>ถนนสุขุมวิท หรือ หน้าตลาดหนามแดง</strong> แล้วพบว่าแก้มยางมีรอยฉีกขาด หรือรูเบ้อเริ่ม คำตอบจากช่างมืออาชีพคือ:</p>

<div class="bg-red-50 dark:bg-slate-800/50 border-l-4 border-red-500 p-6 rounded-r-xl my-6">
  <h3 class="text-xl font-bold text-red-600 dark:text-red-400 mt-0 mb-3">"ปะไม่ได้ 100% ครับ ต้องเปลี่ยนยางลูกเดียว!"</h3>
  <p class="text-slate-700 dark:text-slate-300 m-0">การปะยาง (ทั้งแบบแทงไหมและสตรีม) ถูกออกแบบมาให้อุดรูกลมๆ บริเวณ <strong>"หน้ายาง"</strong> (ส่วนที่สัมผัสถนน) เท่านั้น แต่ถ้าแผลอยู่ตรง <strong>"แก้มยาง"</strong> ซึ่งเป็นส่วนที่ต้องยืดหยุ่นและรับน้ำหนักตลอดเวลา การปะจะไม่อยู่ ลมจะรั่วออก และเสี่ยงยางระเบิดซ้ำซ้อนสูงมากครับ</p>
</div>

<h2>วิธีแก้ปัญหาเฉพาะหน้า "ตกหลุมยางแตก" กลางดึก</h2>
<p>เมื่อรู้แล้วว่าปะไม่ได้ สิ่งที่คุณต้องทำเพื่อเอาตัวรอดจากสถานการณ์นี้คือ:</p>
<ol class="list-decimal pl-6 space-y-4 mb-6">
  <li><strong>ประคองรถเข้าข้างทางที่สว่างที่สุด:</strong> อย่าจอดแช่เลนขวาเด็ดขาด เปิดไฟฉุกเฉินแล้วค่อยๆ บดล้อเข้าจอดไหล่ทาง (ถ้าใกล้ปั๊มน้ำมันให้ฝืนบดเข้าปั๊มเลย ปลอดภัยกว่ามาก)</li>
  <li><strong>สำรวจรถว่ามี "ยางอะไหล่" หรือไม่:</strong> เปิดฝากระโปรงท้ายรถดูว่ามียางอะไหล่และแม่แรงติดรถมาให้ไหม (รถรุ่นใหม่ๆ บางรุ่นอาจไม่มีให้แล้ว)</li>
  <li><strong>เรียกช่างมา "เปลี่ยนยางอะไหล่":</strong> ถ้าคุณเปลี่ยนยางเองไม่เป็น หรือจุดที่จอดมืดและอันตรายเกินกว่าจะมุดลงไปไขน็อตล้อ ให้ใช้บริการช่างปะยาง/เปลี่ยนยางนอกสถานที่ครับ ปลอดภัยกว่าเยอะ</li>
</ol>

<div class="my-8">
  <div class="aspect-w-16 aspect-h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 p-8">
    <svg class="w-12 h-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
    <p class="text-slate-500 font-medium text-center">ภาพผลงานจริง: ช่วยเหลือลูกค้าตกหลุมยางแตกตอนกลางคืน<br/>(พื้นที่สำหรับแทรกรูปภาพผลงานจริงจากร้าน)</p>
  </div>
  <p class="text-sm text-center text-slate-500 mt-2"><em>เคสจริง: ลูกค้าขับรถตกหลุมก่อสร้างแถวแบริ่งตอนตี 1 ยางหน้าซ้ายฉีก ช่าง FIRSTCARCENTER เข้าช่วยเหลือใส่ยางอะไหล่ให้ เพื่อให้ลูกค้าขับรถกลับบ้านได้อย่างปลอดภัย</em></p>
</div>

<div class="not-prose relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-orange-200/60 dark:border-orange-500/20 text-center my-8 sm:my-10 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/10">
  <div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-15 blur-3xl"></div>
  <div class="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-10 blur-3xl"></div>
  <div class="relative z-10 max-w-2xl mx-auto">
    <div class="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
      <span>บริการเปลี่ยนยางอะไหล่ 24 ชม.</span>
    </div>
    <h3 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-3 leading-tight">ตกหลุมยางแตกตอนดึก? โทรหาช่างให้ไปช่วยเปลี่ยนยางสิครับ!</h3>
    <p class="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">จอดเสียในที่มืดมันอันตราย! FIRSTCARCENTER พร้อมส่งช่างไป <strong>เปลี่ยนยางอะไหล่ให้ถึงที่</strong> โซนศรีนครินทร์ บางนา แบริ่ง ลาซาล เทพารักษ์ แพรกษา ถึงไวใน 30 นาที</p>
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <a href="tel:0887671679" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span>โทรเรียกช่างด่วน 088-767-1679</span>
      </a>
      <a href="https://lin.ee/xxqKaZn" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm sm:text-base">
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-4.103 2.572-6.002z"/></svg>
        <span>แอดไลน์ ส่งพิกัดมาเลย</span>
      </a>
    </div>
    <a href="/mobile-tire-repair" class="inline-block mt-4 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium underline underline-offset-4 decoration-orange-300 dark:decoration-orange-700 hover:decoration-orange-500 transition-colors">ดูบริการปะยาง/เปลี่ยนยางอะไหล่ &rarr;</a>
  </div>
</div>

<h2>FAQ: คำถามที่พบบ่อย (อุบัติเหตุตกหลุม)</h2>
<div class="space-y-6 mt-6">
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ขับตกหลุมยางแตก เคลมประกัน หรือฟ้องร้องใครได้ไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ถ้ามีประกันชั้น 1 สามารถเคลมประกันได้ครับ (ได้ค่ายาง 50% และค่าแม็กซ่อม/เปลี่ยน 100%) นอกจากนี้ยังสามารถฟ้องร้องเรียกค่าเสียหายจากหน่วยงานที่รับผิดชอบถนนเส้นนั้นได้ (เช่น กรมทางหลวง หรือเทศบาล) โดยต้องถ่ายรูปหลุม รอยเบรก และความเสียหายของรถไว้เป็นหลักฐานชัดเจนครับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: แม็กดุ้ง เอาไปดัดหรือซ่อมได้ไหม?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ถ้าดุ้งแค่ขอบเล็กน้อย สามารถนำไปกลึงดัดซ่อมได้ครับ แต่ถ้าดุ้งลึกถึงก้านแม็ก หรือมีรอยแตกร้าว ไม่แนะนำให้ซ่อมครับ เพราะโครงสร้างอะลูมิเนียมสูญเสียความแข็งแรงไปแล้ว หากตกหลุมซ้ำอีกครั้งแม็กจะแตกหลุดออกมาเลย อันตรายมากครับ</p>
  </div>
  <div>
    <h3 class="text-lg font-bold text-slate-800 dark:text-white m-0">Q: ยางอะไหล่ วิ่งได้เร็วแค่ไหน?</h3>
    <p class="text-slate-600 dark:text-slate-300 mt-2"><strong>A:</strong> ยางอะไหล่ (โดยเฉพาะล้อเล็กหรือล้อโดนัท) ถูกออกแบบมาให้ใช้ <strong>"ชั่วคราว"</strong> เพื่อประคองรถไปร้านยางเท่านั้น ห้ามวิ่งเร็วเกิน <strong>80 กม./ชม.</strong> และควรเปลี่ยนกลับเป็นยางไซส์ปกติให้เร็วที่สุดครับ</p>
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
      "name": "ขับตกหลุมยางแตก เคลมประกัน หรือฟ้องร้องใครได้ไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ประกันชั้น 1 เคลมได้ (ยาง 50%, ล้อแม็ก 100%) และสามารถนำหลักฐานภาพถ่ายหลุมและความเสียหายของรถ ไปเรียกร้องค่าเสียหายจากหน่วยงานดูแลถนน (เช่น กรมทางหลวง) ได้"
      }
    },
    {
      "@type": "Question",
      "name": "แม็กดุ้ง เอาไปดัดหรือซ่อมได้ไหม?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ถ้าดุ้งที่ขอบเล็กน้อยสามารถกลึงซ่อมได้ แต่ถ้าดุ้งลึกหรือมีรอยแตกร้าว ไม่ควรซ่อมเพราะโครงสร้างสูญเสียความแข็งแรงไปแล้ว เสี่ยงล้อแตกหากตกหลุมซ้ำ"
      }
    },
    {
      "@type": "Question",
      "name": "ยางอะไหล่ วิ่งได้เร็วแค่ไหน?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ยางอะไหล่ถูกออกแบบมาเพื่อใช้ฉุกเฉินเท่านั้น จำกัดความเร็วไม่เกิน 80 กม./ชม. ไม่ควรใช้ขับทางไกลยาวๆ"
      }
    }
  ]
}
</script>
`;

const postData = {
  slug: "pothole-tire-blowout-bent-rim-guide",
  title: "ตกหลุมยางแตก แม็กดุ้ง! ปะได้ไหม หรือต้องเปลี่ยนยางสถานเดียว? (2026)",
  content: htmlContent,
  excerpt: "ขับรถตกหลุมอย่างแรงจนแก้มยางฉีก ล้อแม็กดุ้ง! อาการแบบนี้ปะยางได้ไหม? พร้อมวิธีแก้ปัญหาเฉพาะหน้าตอนดึกๆ และวิธีเคลมประกันเมื่อตกหลุม",
  coverImage: "/images/blog/pig-pothole-tire-blowout-cover.svg",
  category: "ความรู้เรื่องยาง",
  published: true,
  seoTitle: "ตกหลุมยางแตก แก้มยางฉีก แม็กดุ้ง ปะได้ไหม วิธีแก้ | Firstcar",
  seoDescription: "ขับรถตกหลุมบ่อก่อสร้างจนยางแตก แก้มยางฉีก ปะยางไม่ได้ ต้องใส่ยางอะไหล่ บริการช่างเปลี่ยนยางอะไหล่นอกสถานที่ ศรีนครินทร์ บางนา แบริ่ง ด่วน 24 ชม.",
  seoKeywords: "ตกหลุมยางแตก,แก้มยางฉีก,ยางแตกปะได้ไหม,แม็กดุ้ง ตกหลุม,ยางแตกตอนกลางคืน,รถตกหลุม,เปลี่ยนยางอะไหล่ นอกสถานที่,ศรีนครินทร์,บางนา,แบริ่ง,ลาซาล,สุขุมวิท,เทพารักษ์,แพรกษา,สมุทรปราการ",
  ogTitle: "แจ็คพอต! ตกหลุมยางแตก แก้มฉีก ปะได้ไหม?",
  ogDescription: "ขับตกหลุมก่อสร้างจนยางแบน แม็กดุ้ง! ตอบชัดๆ อาการนี้ปะได้ไหม พร้อมวิธีเคลมประกันและเรียกร้องค่าเสียหาย",
};

async function main() {
  console.log("Seeding SEO optimized 'pothole tire blowout' post...");
  
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
