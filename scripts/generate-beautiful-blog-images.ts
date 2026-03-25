import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public/images/blog');

const covers = [
  {
    file: "pig-battery-symptoms-cover.svg",
    badge: "BATTERY KNOWLEDGE",
    title: ["อาการแบตเตอรี่เสื่อม", "ดูยังไง? สตาร์ทไม่ติดแก้ด่วน"],
    subtitle: "อัปเดต 2026 • FIRSTCARCENTER"
  },
  {
    file: "pig-car-wont-start-cover.svg",
    badge: "EMERGENCY GUIDE",
    title: ["รถสตาร์ทไม่ติด เงียบกริบ", "เช็กด่วน 5 จุด ก่อนเรียกรถยก"],
    subtitle: "อัปเดต 2026 • FIRSTCARCENTER"
  },
  {
    file: "pig-dead-battery-cover.svg",
    badge: "CAR SURVIVAL",
    title: ["แบตหมดทำไง?", "วิธีแก้ปัญหาเฉพาะหน้ารถสตาร์ทไม่ติด"],
    subtitle: "สอนพ่วงแบตที่ถูกต้อง ปลอดภัย 100%"
  },
  {
    file: "pig-tire-blowout-cover.svg",
    badge: "ROAD SAFETY",
    title: ["ยางแตกกลางทาง", "5 ขั้นตอนเอาตัวรอดฉบับมือใหม่"],
    subtitle: "วิธีป้องกันและแก้ปัญหาฉุกเฉิน 24 ชม."
  },
  {
    file: "pig-battery-dead-signs-cover.svg",
    badge: "WARNING SIGNS",
    title: ["แบตเตอรี่รถยนต์หมด", "สัญญาณเตือนที่ไม่ควรมองข้าม"],
    subtitle: "เช็กอาการแบตเสื่อมก่อนดับกลางทาง"
  },
  {
    file: "pig-alternator-failure-cover.svg",
    badge: "REPAIR GUIDE",
    title: ["ไดชาร์จเสีย", "อาการเป็นอย่างไร? เช็คเองได้ไหม?"],
    subtitle: "6 สัญญาณเตือน พร้อมวิธีรับมือ"
  },
  {
    file: "pig-car-polishing-cover.svg",
    badge: "CAR CARE",
    title: ["ขัดสีรถเอง vs จ้างช่าง", "ต่างกันอย่างไร? แบบไหนคุ้มกว่า?"],
    subtitle: "เปรียบเทียบข้อดีข้อเสีย และค่าใช้จ่าย"
  },
  {
    file: "pig-rainy-season-cover.svg",
    badge: "SEASONAL CHECK",
    title: ["Checklist ดูแลรถหน้าฝน", "10 ข้อเตรียมรถ ขับปลอดภัย"],
    subtitle: "เคล็ดลับการดูแลรถที่คนรักรถต้องรู้"
  },
  {
    file: "pig-alternator-seo-cover.svg",
    badge: "EXPERT GUIDE",
    title: ["อาการไดชาร์จเสียดูยังไง?", "ก่อนรถดับกลางทาง"],
    subtitle: "เช็ก 5 สัญญาณเตือน อัปเดต 2026"
  },
  {
    file: "pig-starter-motor-seo-cover.svg",
    badge: "EXPERT GUIDE",
    title: ["ไดสตาร์ทพัง อาการเป็นไง?", "บิดกุญแจแล้วเงียบ"],
    subtitle: "แยกให้ออก แบตหมด หรือ ไดพัง (อัปเดต 2026)"
  },
  {
    file: "pig-battery-light-seo-cover.svg",
    badge: "WARNING LIGHTS",
    title: ["ไฟรูปแบตโชว์ เตือนอะไร?", "ห้ามขับต่อเด็ดขาด!"],
    subtitle: "วิธีรับมือฉุกเฉิน ก่อนรถดับกลางทาง"
  },
  {
    file: "pig-spare-tire-seo-cover.svg",
    badge: "SURVIVAL SKILLS",
    title: ["วิธีเปลี่ยนยางอะไหล่", "ทำเองได้ง่ายๆ ใน 5 ขั้นตอน"],
    subtitle: "ยางแตก ยางรั่ว ไม่ต้องง้อช่าง (อัปเดต 2026)"
  },
  {
    file: "pig-tire-plug-seo-cover.svg",
    badge: "TIRE REPAIR",
    title: ["ปะยางแบบแทงไหม", "ดีไหม? วิ่งได้กี่กิโล?"],
    subtitle: "ข้อดี ข้อเสีย และวิธีปะยางฉุกเฉิน (อัปเดต 2026)"
  },
  {
    file: "pig-tire-patch-seo-cover.svg",
    badge: "PRO REPAIR",
    title: ["ปะยางสตรีม คืออะไร?", "แบบร้อน vs แบบเย็น"],
    subtitle: "วิธีไหนทนกว่ากัน? สรุปจบในที่เดียว (อัปเดต 2026)"
  },
  {
    file: "pig-headlight-seo-cover.svg",
    badge: "CAR DETAILING",
    title: ["วิธีแก้ไฟหน้าเหลือง", "ขัดเอง หรือ จ้างช่าง?"],
    subtitle: "งบหลักร้อย คืนความใสให้รถคุณ (อัปเดต 2026)"
  },
  {
    file: "pig-scratch-seo-cover.svg",
    badge: "PAINT CARE",
    title: ["ลบรอยขนแมว รถยนต์", "ทำยังไงให้สีกลับมาเงา?"],
    subtitle: "วิธีเช็กรอยลึกตื้น พร้อมวิธีแก้ (อัปเดต 2026)"
  }
];

const infographics = [
  {
    file: "pig-scratch-seo-check.svg",
    title: "วิธีเช็กรอยขนแมว ลึกแค่ไหน?",
    items: [
      { num: "01", title: "รอยบาง (Clear Coat)", desc: ["รอยตื้นๆ ขูดแค่ชั้นแลคเกอร์", "เอานิ้วลูบแล้วไม่สะดุด", "ขัดสีลบรอยได้ 100%"] },
      { num: "02", title: "รอยลึก (Base Coat)", desc: ["รอยกินลึกถึงชั้นสีแท้", "เอานิ้วเล็บขูดแล้วสะดุดกึก", "ขัดได้แค่จางลง ไม่หายสนิท"] },
      { num: "03", title: "รอยเข้าเนื้อ (Primer)", desc: ["รอยลึกจนเห็นสีพื้นรองพื้น", "หรือเห็นเนื้อเหล็ก/พลาสติก", "ต้องทำสีใหม่เท่านั้น"] }
    ]
  },
  {
    file: "pig-scratch-seo-methods.svg",
    title: "วิธีลบรอยขนแมว 3 ระดับ",
    items: [
      { num: "01", title: "น้ำยาลบรอย (DIY)", desc: ["ใช้ครีมขัดสีเฉพาะจุด", "ขัดด้วยมือวนๆ เหมาะกับ", "รอยบางๆ บริเวณเล็กๆ"] },
      { num: "02", title: "ขัดสีเต็มระบบ", desc: ["ใช้เครื่องขัด DA/Rotary", "ลบรอยขนแมวทั้งคัน", "ฟื้นฟูสีรถให้กลับมาฉ่ำเงา"] },
      { num: "03", title: "เคลือบแก้ว/เซรามิก", desc: ["หลังจากขัดสีแล้ว ต้องลง", "น้ำยาเคลือบแก้วทับ เพื่อ", "ปกป้องสีรถจากรอยใหม่"] }
    ]
  },
  {
    file: "pig-headlight-seo-causes.svg",
    title: "สาเหตุที่ทำให้ ไฟหน้าเหลืองขุ่น",
    items: [
      { num: "01", title: "แสงแดด (UV)", desc: ["รังสี UV จากแสงแดด", "ทำปฏิกิริยากับพลาสติก", "ทำให้ชั้นเคลือบเสื่อมสภาพ"] },
      { num: "02", title: "ความร้อนจากหลอดไฟ", desc: ["โดยเฉพาะการใช้หลอดฮาโลเจน", "วัตต์สูง จะแผ่ความร้อน", "ทำให้โคมพลาสติกกรอบ"] },
      { num: "03", title: "คราบสกปรกสะสม", desc: ["คราบน้ำมัน เขม่าควัน", "และยางมะตอยที่ล้างไม่ออก", "ฝังแน่นในเนื้อพลาสติก"] }
    ]
  },
  {
    file: "pig-headlight-seo-methods.svg",
    title: "วิธีขัดไฟหน้าเหลือง 3 ระดับ",
    items: [
      { num: "01", title: "สูตรยาสีฟัน", desc: ["เหลืองระดับเริ่มต้น", "ใช้ยาสีฟันขัดวน 5 นาที", "รอยคราบจางลงได้ง่ายๆ"] },
      { num: "02", title: "ครีมขัดสีรถ (กาน่า)", desc: ["เหลืองระดับปานกลาง", "ใช้ครีมขัดสี + ผ้าไมโครไฟเบอร์", "ออกแรงขัดให้โคมใสขึ้น"] },
      { num: "03", title: "ขัดกระดาษทราย+เคลือบ", desc: ["เหลืองขุ่นจนมองไม่เห็น", "ต้องให้ช่างขัดเปิดผิว", "และพ่นน้ำยาเคลือบ UV ใหม่"] }
    ]
  },
  {
    file: "pig-tire-patch-seo-types.svg",
    title: "ปะสตรีม ร้อน VS เย็น ต่างกันยังไง?",
    items: [
      { num: "01", title: "สตรีมร้อน (Hot Patch)", desc: ["ใช้ความร้อนละลายแผ่นยาง", "ให้หลอมรวมเป็นเนื้อเดียว", "กับยางรถ ทนทานสูงมาก"] },
      { num: "02", title: "สตรีมเย็น (Cold Patch)", desc: ["ใช้กาวประสานแผ่นสตรีม", "เข้ากับยางด้านใน", "ไม่ทำลายโครงสร้างยาง"] },
      { num: "03", title: "สรุปแบบไหนดีกว่า?", desc: ["ร้อนทนทานกว่าแตะทำลายโครงสร้าง", "เย็นปลอดภัยกว่าแตะหลุดร่อนง่าย", "ถ้าโดนน้ำ"] }
    ]
  },
  {
    file: "pig-tire-patch-seo-steps.svg",
    title: "ขั้นตอนการปะยางสตรีม",
    items: [
      { num: "01", title: "ถอดล้อและงัดยาง", desc: ["ช่างต้องถอดล้อออกจากรถ", "และใช้เครื่องงัดยางออกจาก", "กระทะล้อเพื่อทำแผลด้านใน"] },
      { num: "02", title: "เจียรทำความสะอาด", desc: ["ใช้หินเจียรผิวเนื้อยางด้านใน", "รอบๆ รูรั่วให้เรียบ", "เพื่อเตรียมผิวหน้าสัมผัส"] },
      { num: "03", title: "ปะและรีดให้แน่น", desc: ["ทากาวและแปะแผ่นสตรีม", "ใช้ลูกกลิ้งรีดไล่อากาศออก", "ให้แผ่นยางแนบสนิทที่สุด"] }
    ]
  },
  {
    file: "pig-tire-plug-seo-pros-cons.svg",
    title: "ข้อดี VS ข้อเสีย ปะยางแบบแทงไหม",
    items: [
      { num: "01", title: "ข้อดี (รวดเร็ว)", desc: ["ไม่ต้องถอดล้อออกจากรถ", "ใช้เวลาแค่ 5-10 นาที", "ราคาถูก (100-200 บาท)"] },
      { num: "02", title: "ข้อดี (ฉุกเฉิน)", desc: ["สามารถทำเองได้ง่ายๆ", "มีชุดคิทขายทั่วไป", "เหมาะกับโดนตะปูตำ"] },
      { num: "03", title: "ข้อเสีย (อายุสั้น)", desc: ["เมื่อใช้งานไปนานๆ", "ไหมอาจจะแห้งกรอบ", "ทำให้ลมซึมออกได้อีก"] }
    ]
  },
  {
    file: "pig-tire-plug-seo-steps.svg",
    title: "วิธีปะยางแทงไหมด้วยตัวเอง",
    items: [
      { num: "01", title: "ดึงสิ่งแปลกปลอมออก", desc: ["ใช้คีมดึงตะปูหรือน็อต", "ที่ตำยางออก และจำทิศทาง", "การแทงของตะปูไว้"] },
      { num: "02", title: "แทงคว้านรู", desc: ["ใช้เหล็กปลายเกลียวแทง", "สวนเข้าไปเพื่อขยายรู", "และทำความสะอาดแผล"] },
      { num: "03", title: "อัดตัวไหมเข้าไป", desc: ["ร้อยตัวไหมใส่เหล็กง่าม", "อัดเข้าไปในรูให้มิด", "แล้วดึงเหล็กออกเร็วๆ"] }
    ]
  },
  {
    file: "pig-spare-tire-seo-tools.svg",
    title: "อุปกรณ์ที่ต้องมี ก่อนเปลี่ยนยาง",
    items: [
      { num: "01", title: "ยางอะไหล่ & แม่แรง", desc: ["ส่วนใหญ่ซ่อนอยู่ใต้", "พรมท้ายรถ หรือห้อย", "อยู่ใต้ท้องรถกระบะ"] },
      { num: "02", title: "บล็อกถอดล้อ", desc: ["ประแจบล็อกกากบาท", "หรือบล็อกแอลที่แถม", "มาพร้อมกับแม่แรง"] },
      { num: "03", title: "ป้ายเตือนฉุกเฉิน", desc: ["สามเหลี่ยมสะท้อนแสง", "ตั้งห่างจากท้ายรถ", "อย่างน้อย 50 เมตร"] }
    ]
  },
  {
    file: "pig-spare-tire-seo-steps.svg",
    title: "5 ขั้นตอนเปลี่ยนยางง่ายๆ",
    items: [
      { num: "01", title: "คลายน็อตล้อก่อน", desc: ["ตอนล้อยังติดพื้น", "ให้ใช้บล็อกคลายน็อต", "ออกทีละนิด (ยังไม่ถอด)"] },
      { num: "02", title: "ขึ้นแม่แรงให้ลอย", desc: ["หาจุดรับแม่แรงที่คาน", "ใต้รถ แล้วขึ้นแม่แรง", "จนล้อยางลอยพ้นพื้น"] },
      { num: "03", title: "สลับยาง & ขันน็อต", desc: ["ถอดล้อเก่าออก ใส่ยาง", "อะไหล่เข้าไป ขันน็อต", "ให้ตึงมือ (เป็นรูปดาว)"] }
    ]
  },
  {
    file: "pig-battery-light-seo-causes.svg",
    title: "สาเหตุที่ทำให้ไฟรูปแบตโชว์",
    items: [
      { num: "01", title: "ไดชาร์จเสีย", desc: ["ปัญหาหลัก 80% คือ", "ไดชาร์จไม่ปั่นไฟกลับ", "ไปที่แบตเตอรี่"] },
      { num: "02", title: "สายพานไดชาร์จขาด", desc: ["สายพานหย่อนหรือขาด", "ทำให้ไดชาร์จหมุนไม่ได้", "ไฟเลยไม่ชาร์จ"] },
      { num: "03", title: "ขั้วแบตเตอรี่หลวม", desc: ["ขั้วแบตหลวม มีขี้เกลือ", "ทำให้ไฟเดินไม่สะดวก", "หรือสายไฟขาดใน"] }
    ]
  },
  {
    file: "pig-battery-light-seo-action.svg",
    title: "วิธีเอาตัวรอด เมื่อไฟแบตโชว์",
    items: [
      { num: "01", title: "ปิดแอร์/วิทยุ ทันที!", desc: ["ลดการใช้ไฟในรถทั้งหมด", "เพื่อเซฟไฟที่เหลือในแบต", "ไว้เลี้ยงเครื่องยนต์"] },
      { num: "02", title: "หาที่จอดที่ปลอดภัย", desc: ["อย่าฝืนขับต่อไกลๆ", "รถอาจดับกลางอากาศได้", "พยายามชิดซ้ายเข้าปั๊ม"] },
      { num: "03", title: "เรียกช่างระบบไฟด่วน", desc: ["ห้ามดับเครื่องถ้ารถยังติด!", "เรียกช่างมาตรวจเช็กทันที", "หรือเรียกรถสไลด์"] }
    ]
  },
  {
    file: "pig-starter-motor-seo-signs.svg",
    title: "4 อาการชี้เป้า ไดสตาร์ทพัง",
    items: [
      { num: "01", title: "เงียบสนิท ไม่มีเสียง", desc: ["บิดกุญแจแล้วเงียบ", "แต่ไฟหน้าปัด/แอร์", "สว่างและเย็นปกติ"] },
      { num: "02", title: "เสียงแต๊กๆ รัวๆ", desc: ["โซลินอยด์ทำงานแต่", "มอเตอร์ไม่มีแรงหมุน", "ส่วนใหญ่มาจากแปรงถ่านหมด"] },
      { num: "03", title: "ต้องเคาะถึงจะติด", desc: ["เวลาบิดกุญแจเงียบ", "แต่พอเอาไม้เคาะที่ไดสตาร์ท", "แล้วกลับสตาร์ทติด"] },
      { num: "04", title: "เสียงครืดคราด", desc: ["เฟืองไดสตาร์ทรูด", "หรือขบกับฟลายวีล", "ไม่พอดี สตาร์ทติดยาก"] }
    ]
  },
  {
    file: "pig-starter-motor-seo-diff.svg",
    title: "แยกให้ออก แบตหมด VS ไดสตาร์ทพัง",
    items: [
      { num: "01", title: "เช็กไฟหน้า / แตร", desc: ["ถ้าแบตหมด: ไฟหน้าหรี่", "แตรเบา สตาร์ทแชะๆ", "บีบแตรแล้วไฟหน้าตก"] },
      { num: "02", title: "เช็กไฟหน้า / แตร", desc: ["ถ้าไดพัง: ไฟหน้าสว่างจ้า", "แตรเสียงดังลั่น", "แต่สตาร์ทเงียบกริบ"] },
      { num: "03", title: "ลองพ่วงแบต", desc: ["พ่วงแบตแล้วติด = แบตเสื่อม", "พ่วงแบตแล้วยังเงียบ", "= ไดสตาร์ทพังชัวร์!"] }
    ]
  },
  {
    file: "pig-alternator-seo-signs.svg",
    title: "5 สัญญาณเตือน ไดชาร์จเริ่มพัง",
    items: [
      { num: "01", title: "ไฟรูปแบตเตอรี่โชว์", desc: ["ไฟเตือนสีแดงขึ้นค้าง", "ขณะขับรถ แสดงว่า", "ไดชาร์จไม่ทำงาน"] },
      { num: "02", title: "ไฟหน้าสว่างสลับหรี่", desc: ["ไฟหน้ารถกระพริบ หรือ", "แอร์เย็นบ้างไม่เย็นบ้าง", "รอบเครื่องตก"] },
      { num: "03", title: "ได้ยินเสียงหอน", desc: ["มีเสียงวี้ดหรือเสียงคราง", "จากห้องเครื่องบริเวณ", "สายพานไดชาร์จ"] }
    ]
  },
  {
    file: "pig-alternator-seo-diff.svg",
    title: "แบตเสื่อม VS ไดชาร์จเสีย",
    items: [
      { num: "01", title: "แบตเตอรี่เสื่อม", desc: ["สตาร์ทตอนเช้าไม่ติด", "แต่ถ้าพ่วงแบตแล้ว", "ขับต่อได้ปกติ"] },
      { num: "02", title: "ไดชาร์จพัง", desc: ["พ่วงแบตติดแล้ว แต่พอ", "ถอดสายพ่วง รถจะดับ", "หรือขับไปสักพักแล้วดับ"] },
      { num: "03", title: "วิธีจำง่ายๆ", desc: ["แบต = ตัวเก็บไฟ", "ไดชาร์จ = ตัวผลิตไฟ", "พังจุดไหนก็ขับไม่ได้"] }
    ]
  },
  {
    file: "pig-battery-symptoms-signs.svg",
    title: "3 สัญญาณเตือน แบตเตอรี่เสื่อม",
    items: [
      { num: "01", title: "สตาร์ทอืดตอนเช้า", desc: ["บิดกุญแจแล้วเครื่องหมุน", "ช้ากว่าปกติ เสียงลากยาว"] },
      { num: "02", title: "ระบบไฟทำงานผิดปกติ", desc: ["ไฟหน้าหรี่ กระจกไฟฟ้า", "ขึ้นลงช้า แอร์ไม่ค่อยเย็น"] },
      { num: "03", title: "อายุการใช้งาน", desc: ["แบตเตอรี่ใช้งานมานาน", "เกิน 1.5 - 2 ปี ควรเช็กด่วน"] }
    ]
  },
  {
    file: "pig-battery-symptoms-landmarks.svg",
    title: "จุดเสี่ยงแบตหมด ย่านศรีนครินทร์",
    items: [
      { num: "01", title: "ห้างสรรพสินค้า", desc: ["จอดรถทิ้งไว้นาน", "ลืมปิดไฟหน้า หรือ", "ระบบไฟทำงานค้าง"] },
      { num: "02", title: "อาคารสำนักงาน", desc: ["ทำงานทั้งวัน กลับมา", "รถสตาร์ทไม่ติด", "แบตคลายประจุ"] },
      { num: "03", title: "หมู่บ้านจัดสรร", desc: ["จอดรถทิ้งไว้หลายวัน", "ไม่ค่อยได้ขับ ทำให้", "แบตเตอรี่เสื่อม"] }
    ]
  },
  {
    file: "pig-battery-symptoms-checkup.svg",
    title: "วิธีเช็กแบตเตอรี่ด้วยตัวเอง",
    items: [
      { num: "01", title: "ดูตาแมว (Indicator)", desc: ["สีฟ้า/เขียว = ปกติ", "ขาว/แดง = ไฟอ่อน", "ขาวใส = น้ำกลั่นแห้ง"] },
      { num: "02", title: "เช็กขั้วแบตเตอรี่", desc: ["ต้องแน่น ไม่มีคราบ", "ขี้เกลือเกาะ ทำความสะอาด", "ด้วยน้ำร้อน"] },
      { num: "03", title: "เช็กวันผลิต/ติดตั้ง", desc: ["ดูสติ๊กเกอร์ที่ร้านแปะไว้", "เพื่อรู้อายุการใช้งาน", "ที่แท้จริง"] }
    ]
  },
  {
    file: "pig-car-wont-start-sounds.svg",
    title: "แยกอาการจากเสียงตอนสตาร์ท",
    items: [
      { num: "01", title: "เงียบกริบ ไม่มีเสียง", desc: ["ไฟหน้าปัดดับ", "แบตเตอรี่หมดเกลี้ยง", "หรือขั้วแบตหลวม"] },
      { num: "02", title: "แชะๆ รัวๆ", desc: ["แบตเตอรี่อ่อน ไฟไม่พอ", "ไปหมุนไดสตาร์ท", "ต้องพ่วงแบต"] },
      { num: "03", title: "ชึ่งๆๆ แต่ไม่ติด", desc: ["ไดสตาร์ทหมุนปกติ", "ปัญหาอาจอยู่ที่ปั๊มติ๊ก", "หรือหัวเทียน"] }
    ]
  },
  {
    file: "pig-car-wont-start-checks.svg",
    title: "3 จุดเช็กมือใหม่ ก่อนตามช่าง",
    items: [
      { num: "01", title: "ตำแหน่งเกียร์", desc: ["รถเกียร์ออโต้ ต้องอยู่", "ในตำแหน่ง P หรือ N", "เท่านั้น"] },
      { num: "02", title: "พวงมาลัยล็อค", desc: ["บิดกุญแจไม่ไป ให้ขยับ", "พวงมาลัยซ้ายขวา", "พร้อมบิดกุญแจ"] },
      { num: "03", title: "รีโมทถ่านหมด", desc: ["สำหรับ Push Start", "ให้นำรีโมทไปแตะ", "ชิดปุ่มแล้วกด"] }
    ]
  },
  {
    file: "pig-car-wont-start-solution.svg",
    title: "ทางออกเมื่อรถสตาร์ทไม่ติด",
    items: [
      { num: "01", title: "พ่วงแบตเตอรี่", desc: ["ถ้ามีสายพ่วงและ", "รถมาช่วย ให้พ่วงเพื่อ", "สตาร์ทชั่วคราว"] },
      { num: "02", title: "เรียกช่างเปลี่ยนแบต", desc: ["บริการนอกสถานที่", "สะดวก รวดเร็ว", "จบปัญหาทันที"] },
      { num: "03", title: "เรียกรถสไลด์/รถยก", desc: ["กรณีเป็นที่ระบบเครื่องยนต์", "หรือช่วงล่าง", "เสียหายหนัก"] }
    ]
  },
  {
    file: "pig-jump-start-guide.svg",
    title: "วิธีพ่วงแบตเตอรี่ที่ถูกต้อง",
    items: [
      { num: "01", title: "คีบขั้วบวก (+)", desc: ["สายสีแดง: คีบคันแบตหมด", "แล้วไปคีบคันที่มาช่วย"] },
      { num: "02", title: "คีบขั้วลบ (-)", desc: ["สายสีดำ: คีบคันที่มาช่วย", "แล้วไปคีบตัวถังโลหะ", "คันที่แบตหมด"] },
      { num: "03", title: "สตาร์ทและถอดสาย", desc: ["สตาร์ทคันช่วยก่อน", "แล้วสตาร์ทคันหมด", "ถอดสายย้อนกลับ"] }
    ]
  },
  {
    file: "pig-call-for-help-battery.svg",
    title: "แบตหมด ไม่มีสายพ่วง ทำไง?",
    items: [
      { num: "01", title: "อย่าฝืนสตาร์ทแช่", desc: ["จะทำให้ไดสตาร์ทพัง", "และระบบไฟรวน"] },
      { num: "02", title: "เตรียมข้อมูลรถ", desc: ["ยี่ห้อ รุ่นรถ และ", "พิกัดสถานที่ที่รถเสีย", "ให้ชัดเจน"] },
      { num: "03", title: "โทรเรียกช่างด่วน", desc: ["โทร 088-767-1679", "ช่างถึงที่ใน 30 นาที", "พร้อมแบตลูกใหม่"] }
    ]
  }
];

const getSVGDefs = () => `
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050914" />
      <stop offset="100%" stop-color="#12182B" />
    </linearGradient>
    <radialGradient id="glow-orange" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF6B00" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#FF6B00" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow-blue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#00F2FE" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF6B00" />
      <stop offset="100%" stop-color="#FF3E00" />
    </linearGradient>
    <linearGradient id="text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.02)" />
    </linearGradient>
    <linearGradient id="pig-skin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE4E1" />
      <stop offset="100%" stop-color="#FFB6C1" />
    </linearGradient>
    <linearGradient id="pig-snout" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF9EBB" />
      <stop offset="100%" stop-color="#E67396" />
    </linearGradient>
    <linearGradient id="cap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF8C00" />
      <stop offset="100%" stop-color="#D32F2F" />
    </linearGradient>
    <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000" flood-opacity="0.5"/>
    </filter>
    <filter id="shadow-sm" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
    
    <!-- Pig Mascot Component -->
    <g id="pig-mascot">
      <!-- Glow behind mascot -->
      <circle cx="0" cy="0" r="160" fill="url(#glow-orange)" opacity="0.6"/>
      <!-- Podium -->
      <ellipse cx="0" cy="150" rx="130" ry="35" fill="#0B0F19" filter="url(#shadow)"/>
      <ellipse cx="0" cy="140" rx="120" ry="30" fill="url(#glass-grad)" stroke="rgba(255,107,0,0.3)" stroke-width="2"/>
      
      <!-- Pig Body -->
      <path d="M-65,140 C-75,50 -45,10 0,10 C45,10 75,50 65,140 Z" fill="url(#cap-grad)" filter="url(#shadow-sm)"/>
      <path d="M-40,60 L40,60 L50,140 L-50,140 Z" fill="#1E293B"/> <!-- Overalls -->
      
      <!-- Wrench in left hand -->
      <g transform="translate(-75, 75) rotate(-30)">
        <rect x="-8" y="-40" width="16" height="90" rx="4" fill="url(#silver)" filter="url(#shadow-sm)"/>
        <circle cx="0" cy="-45" r="18" fill="url(#silver)"/>
        <circle cx="0" cy="-45" r="8" fill="#1E293B"/>
        <circle cx="0" cy="45" r="18" fill="url(#silver)"/>
        <circle cx="0" cy="0" r="18" fill="url(#pig-skin)"/>
      </g>
      
      <!-- Pig Head -->
      <rect x="-60" y="-55" width="120" height="100" rx="45" fill="url(#pig-skin)" filter="url(#shadow-sm)"/>
      
      <!-- Ears -->
      <path d="M-45,-30 Q-65,-80 -20,-50 Z" fill="url(#pig-skin)"/>
      <path d="M45,-30 Q65,-80 20,-50 Z" fill="url(#pig-skin)"/>
      
      <!-- Snout -->
      <ellipse cx="0" cy="-5" rx="28" ry="18" fill="url(#pig-snout)" filter="url(#shadow-sm)"/>
      <ellipse cx="-10" cy="-5" rx="4" ry="7" fill="#A8325D"/>
      <ellipse cx="10" cy="-5" rx="4" ry="7" fill="#A8325D"/>
      <path d="M-8,8 Q0,15 8,8" fill="none" stroke="#A8325D" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Eyes -->
      <circle cx="-25" cy="-22" r="7" fill="#0B0F19"/>
      <circle cx="-23" cy="-24" r="2.5" fill="#FFFFFF"/>
      <circle cx="25" cy="-22" r="7" fill="#0B0F19"/>
      <circle cx="27" cy="-24" r="2.5" fill="#FFFFFF"/>
      
      <!-- Cap -->
      <path d="M-65,-45 Q0,-85 65,-45 L70,-25 L-70,-25 Z" fill="url(#cap-grad)" filter="url(#shadow-sm)"/>
      <rect x="-75" y="-25" width="150" height="14" rx="7" fill="#FF3E00"/>
      <!-- Logo on cap -->
      <circle cx="0" cy="-48" r="14" fill="#FFFFFF" filter="url(#shadow-sm)"/>
      <path d="M-6,-48 L6,-48 L0,-56 Z M-6,-45 L6,-45 L0,-37 Z" fill="#FF6B00"/>
      
      <!-- Right hand holding battery -->
      <g transform="translate(70, 70) rotate(15)">
        <rect x="-25" y="-30" width="50" height="60" rx="6" fill="#1E293B" stroke="#00F2FE" stroke-width="2" filter="url(#shadow-sm)"/>
        <rect x="-18" y="-36" width="10" height="6" fill="#FF3E00"/>
        <rect x="8" y="-36" width="10" height="6" fill="#94A3B8"/>
        <!-- lightning bolt -->
        <path d="M2,-15 L-8,5 L-2,5 L-2,15 L8,-5 L2,-5 Z" fill="#00F2FE"/>
        <circle cx="0" cy="0" r="18" fill="url(#pig-skin)"/>
      </g>
    </g>
  </defs>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;800&amp;display=swap');
    text { font-family: 'Prompt', sans-serif; }
  </style>
`;

function buildCover(data: any) {
  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  ${getSVGDefs()}
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-grad)" />
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.5" />
  
  <!-- Glows -->
  <circle cx="1200" cy="0" r="600" fill="url(#glow-orange)" />
  <circle cx="0" cy="630" r="500" fill="url(#glow-blue)" />
  
  <!-- Decorative Abstract Shapes -->
  <path d="M 0 500 Q 300 450 600 550 T 1200 500 L 1200 630 L 0 630 Z" fill="url(#glass-grad)" />
  <path d="M 0 550 Q 400 500 800 600 T 1200 550 L 1200 630 L 0 630 Z" fill="#FF6B00" opacity="0.1" />
  
  <!-- Content -->
  <g transform="translate(80, 200)">
    <!-- Badge -->
    <rect x="0" y="-80" width="220" height="40" rx="20" fill="url(#glass-grad)" stroke="#FF6B00" stroke-width="1.5" />
    <text x="110" y="-55" font-size="16" font-weight="800" fill="#FF6B00" text-anchor="middle" letter-spacing="2">${data.badge}</text>
    
    <!-- Title -->
    <text x="0" y="20" font-size="64" font-weight="800" fill="url(#text-grad)">${data.title[0]}</text>
    ${data.title[1] ? `<text x="0" y="100" font-size="52" font-weight="800" fill="#FFFFFF">${data.title[1]}</text>` : ''}
    
    <!-- Subtitle -->
    <rect x="0" y="150" width="8" height="30" rx="4" fill="url(#primary-grad)" />
    <text x="24" y="174" font-size="28" font-weight="600" fill="#94A3B8">${data.subtitle}</text>
  </g>
  
  <!-- Mascot -->
  <use href="#pig-mascot" x="900" y="340" transform="scale(1.4) translate(-250, -100)" />
</svg>`;
  return svg.trim();
}

function buildInfographic(data: any) {
  const svg = `
<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  ${getSVGDefs()}
  
  <!-- Background -->
  <rect width="1200" height="800" fill="url(#bg-grad)" />
  <rect width="1200" height="800" fill="url(#grid)" opacity="0.4" />
  
  <!-- Glows -->
  <circle cx="600" cy="0" r="500" fill="url(#glow-orange)" opacity="0.8"/>
  <circle cx="0" cy="800" r="600" fill="url(#glow-blue)" opacity="0.6"/>
  <circle cx="1200" cy="800" r="600" fill="url(#glow-orange)" opacity="0.4"/>
  
  <!-- Header -->
  <g transform="translate(600, 120)" text-anchor="middle">
    <rect x="-100" y="-60" width="200" height="36" rx="18" fill="url(#glass-grad)" stroke="#00F2FE" stroke-width="1.5" />
    <text x="0" y="-36" font-size="16" font-weight="800" fill="#00F2FE" letter-spacing="2">FIRSTCARCENTER</text>
    <text x="0" y="20" font-size="56" font-weight="800" fill="#FFFFFF">${data.title}</text>
  </g>
  
  <!-- Cards -->
  <g transform="translate(90, 240)">
    ${data.items.map((item: any, i: number) => `
      <g transform="translate(${i * 340}, 0)">
        <rect x="0" y="0" width="320" height="460" rx="30" fill="url(#glass-grad)" stroke="rgba(255,255,255,0.1)" stroke-width="2" filter="url(#shadow)" />
        <!-- Top accent -->
        <rect x="0" y="0" width="320" height="8" rx="4" fill="url(#primary-grad)" />
        
        <!-- Number Circle -->
        <circle cx="50" cy="60" r="30" fill="#1E293B" stroke="url(#primary-grad)" stroke-width="2" />
        <text x="50" y="70" font-size="28" font-weight="800" fill="#FF6B00" text-anchor="middle">${item.num}</text>
        
        <!-- Item Title -->
        <text x="30" y="140" font-size="28" font-weight="800" fill="#FFFFFF">${item.title}</text>
        
        <!-- Divider -->
        <rect x="30" y="165" width="40" height="4" rx="2" fill="#00F2FE" opacity="0.8" />
        
        <!-- Description -->
        ${item.desc.map((line: string, lineIndex: number) => `
          <text x="30" y="${220 + (lineIndex * 36)}" font-size="22" font-weight="400" fill="#CBD5E1">${line}</text>
        `).join('')}
      </g>
    `).join('')}
  </g>
  
  <!-- Mascot (smaller, bottom center or peeking) -->
  <use href="#pig-mascot" x="600" y="680" transform="scale(0.8) translate(150, 180)" />
</svg>`;
  return svg.trim();
}

async function main() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const cover of covers) {
    const svg = buildCover(cover);
    fs.writeFileSync(path.join(outDir, cover.file), svg);
    console.log(`✅ Generated ${cover.file}`);
  }

  for (const info of infographics) {
    const svg = buildInfographic(info);
    fs.writeFileSync(path.join(outDir, info.file), svg);
    console.log(`✅ Generated ${info.file}`);
  }
}

main().catch(console.error);
