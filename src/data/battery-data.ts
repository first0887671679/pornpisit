// ─── Battery Data by Car Brand / Model ───

import { extraBatteryProducts, extraModelsByBrand } from "./battery-data-extra";

export interface BatteryProduct {
  id: string;
  brand: string;        // ยี่ห้อแบตเตอรี่ เช่น GS, FB, Panasonic, 3K, VARTA, AMARON, BOSCH
  brandLogo: string;    // URL รูปโลโก้ยี่ห้อ
  model: string;        // รุ่นแบตเตอรี่ เช่น "GS MFX-60L"
  amp: number;          // แอมป์ เช่น 50
  cca: number;          // ค่า CCA เช่น 480
  size: string;         // ขนาดรหัสแบต เช่น "B24L", "LN2", "Q85"
  terminal: "L" | "R" | "ขั้วจม";  // ขั้ว
  type: string;         // ประเภท (MF=กึ่งแห้ง, SMF=แห้ง, EFB=StartStop, AGM=ยุโรปพรีเมียม, LE=EV)
  warranty: string;     // ระยะประกัน เช่น "12 เดือน", "18 เดือน", "24 เดือน"
  features: string[];   // จุดเด่น 2-3 ข้อ
}

export interface CarModel {
  name: string;          // ชื่อรุ่นรถ
  years: string;         // ปีที่มีการเปิดตัวโฉมนี้
  engineCC: string;      // ขนาดเครื่องยนต์
  batterySize: string;   // ขนาดแบตมาตรฐานที่ติดรถ
  recommendedAmp: number;// แอมป์ที่แนะนำขั้นต่ำ
  batteries: BatteryProduct[];
}

export interface CarBrand {
  name: string;
  nameEn: string;
  logo: string;
  models: CarModel[];
}

// ─── Battery Products Data ───
const allProducts: Omit<BatteryProduct, "id">[] = [
  // --- B19L / B20L (35-42 Ah) สำหรับ Eco Cars 1.0-1.2 ---
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS MFX-50L (44B19L)", amp: 40, cca: 380, size: "B19L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["เหมาะกับ Eco Car", "ไฟแรง สตาร์ทติดง่าย"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB S-40L (34B19L)", amp: 35, cca: 340, size: "B19L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["ไฟสม่ำเสมอ", "ทนทาน"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic 40B19L", amp: 35, cca: 330, size: "B19L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["เทคโนโลยีญี่ปุ่น", "คุ้มค่า"] },
  { brand: "3K", brandLogo: "/images/brands/3k.png", model: "3K PMF50L", amp: 40, cca: 360, size: "B19L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["ยอดนิยม", "ราคาประหยัดเหมาะสม"] },
  { brand: "AMARON", brandLogo: "/images/brands/amaron.png", model: "Amaron Go 42B20L", amp: 38, cca: 360, size: "B19L", terminal: "L", type: "SMF", warranty: "12 เดือน", features: ["ไม่ต้องดูแลน้ำกลั่นเลย", "ซีลปิดสนิท"] },

  // --- B24L / B24R (45-55 Ah) สำหรับ B-Segment, C-Segment 1.5-1.8 ---
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS MFX-60L (55B24L)", amp: 50, cca: 480, size: "B24L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["แผ่นธาตุทนความร้อน", "พลังไฟสูง"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB S-65L (S-55B24L)", amp: 50, cca: 480, size: "B24L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["เก็บไฟแน่น", "อายุใช้งานยาวนาน"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic 60B24L", amp: 48, cca: 420, size: "B24L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["วัสดุคุณภาพสูง", "คายประจุต่ำ"] },
  { brand: "3K", brandLogo: "/images/brands/3k.png", model: "3K SVX60L", amp: 50, cca: 400, size: "B24L", terminal: "L", type: "SMF", warranty: "12 เดือน", features: ["แห้งสนิท", "ดูแลง่าย"] },
  { brand: "AMARON", brandLogo: "/images/brands/amaron.png", model: "Amaron Hi-Life 55B24L", amp: 45, cca: 380, size: "B24L", terminal: "L", type: "SMF", warranty: "24 เดือน", features: ["ประกัน 2 ปีเต็ม", "ทนทานเป็นพิเศษ"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch AMS 65B24L", amp: 52, cca: 480, size: "B24L", terminal: "L", type: "SMF", warranty: "15 เดือน", features: ["มาตรฐานเยอรมัน", "ชาร์จไฟกลับเร็ว"] },

  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS MFX-60R (55B24R)", amp: 50, cca: 480, size: "B24R", terminal: "R", type: "MF", warranty: "12 เดือน", features: ["สำหรับรถขั้วขวา (R)", "พลังไฟสูง"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB S-65R", amp: 50, cca: 480, size: "B24R", terminal: "R", type: "MF", warranty: "12 เดือน", features: ["เก็บไฟแน่น", "รถรุ่นเก่าขั้วขวา"] },

  // --- D23L / D23R (60-65 Ah) สำหรับ D-Segment 2.0-2.5 ---
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS MFX-70L (65D23L)", amp: 65, cca: 512, size: "D23L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["ไฟสม่ำเสมอ", "รองรับออปชั่นเยอะ"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB S-75L (S-65D23L)", amp: 65, cca: 550, size: "D23L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["พลังสตาร์ทสูง", "ตอบสนองอุปกรณ์ไฟฟ้าได้ดี"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic 75D23L", amp: 65, cca: 520, size: "D23L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["คุณภาพเสถียร", "ทนทานการสั่นสะเทือน"] },
  { brand: "3K", brandLogo: "/images/brands/3k.png", model: "3K ADX75L", amp: 65, cca: 540, size: "D23L", terminal: "L", type: "SMF", warranty: "12 เดือน", features: ["ซีลแบบพิเศษ", "ชาร์จเร็ว"] },
  { brand: "AMARON", brandLogo: "/images/brands/amaron.png", model: "Amaron Pro 85D23L", amp: 60, cca: 550, size: "D23L", terminal: "L", type: "SMF", warranty: "24 เดือน", features: ["ประกัน 2 ปีเต็ม", "แข็งแกร่งทนอากาศร้อน"] },

  // --- D26L / D26R (70-75 Ah) สำหรับ SUV, PPV, Pickup ---
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS MFX-80L (75D26L)", amp: 75, cca: 600, size: "D26L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["เหมาะกับเครื่องยนต์ใหญ่", "ทนต่อการใช้งานหนัก"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB S-85L (S-80D26L)", amp: 75, cca: 630, size: "D26L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["จ่ายไฟคงที่", "สำหรับรถ SUV และกระบะ"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic 80D26L", amp: 70, cca: 560, size: "D26L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["กระแสไฟสม่ำเสมอ", "ผลิตจากวัสดุพรีเมียม"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch AMS 80D26L", amp: 75, cca: 650, size: "D26L", terminal: "L", type: "SMF", warranty: "15 เดือน", features: ["รอบเดินเบานิ่ง", "อายุยาวกว่า MF ทั่วไป"] },

  // --- D31L / D31R (80-100 Ah) สำหรับ Pickup 2.5-3.0 ขึ้นไป ---
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS MFX-90L (85D31L)", amp: 80, cca: 610, size: "D31L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["กระบะเครื่อง 2500cc+", "ทนทานสมบุกสมบัน"] },
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS MFX-190L (105D31L)", amp: 90, cca: 710, size: "D31L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["ความจุสูงพิเศษ", "ไฟแรง สตาร์ทติดง่าย"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB S-130L (S-105D31L)", amp: 90, cca: 720, size: "D31L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["ประสิทธิภาพสูงสุด", "รถใช้งานหนัก พาณิชย์"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic 115D31L", amp: 90, cca: 700, size: "D31L", terminal: "L", type: "MF", warranty: "12 เดือน", features: ["สำหรับรถบรรทุกเล็ก", "จ่ายไฟนิ่ง"] },
  { brand: "3K", brandLogo: "/images/brands/3k.png", model: "3K HDX100L", amp: 90, cca: 750, size: "D31L", terminal: "L", type: "SMF", warranty: "12 เดือน", features: ["พลังสูง CCA เยอะ", "สำหรับงานหนักสมบูรณ์แบบ"] },
  
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS MFX-90R (85D31R)", amp: 80, cca: 610, size: "D31R", terminal: "R", type: "MF", warranty: "12 เดือน", features: ["รถกระบะขั้วขวาเก่า", "D-Max ก่อยโฉม V-Cross"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB S-130R", amp: 90, cca: 720, size: "D31R", terminal: "R", type: "MF", warranty: "12 เดือน", features: ["ทนทาน", "ไฟแรงพิเศษ"] },

  // --- EFB/ISS Series (Start-Stop System) ---
  // M-42 (คล้าย B20)
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS M42 (EFB)", amp: 40, cca: 400, size: "M42", terminal: "L", type: "EFB", warranty: "18 เดือน", features: ["รองรับ Idling Stop", "ทนทานการชาร์จถี่"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB M42 (EFB)", amp: 40, cca: 410, size: "M42", terminal: "L", type: "EFB", warranty: "18 เดือน", features: ["สำหรับรถตัดต่อเครื่องยนต์", "อายุยาวนานกว่า"] },
  // N-55 (คล้าย B24)
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS N55 (EFB)", amp: 55, cca: 500, size: "N55", terminal: "L", type: "EFB", warranty: "18 เดือน", features: ["ECO Car 1.2 Start-Stop", "ชาร์จเร็ว"] },
  { brand: "PANASONIC", brandLogo: "/images/brands/panasonic.png", model: "Panasonic N55 (EFB)", amp: 55, cca: 500, size: "N55", terminal: "L", type: "EFB", warranty: "12 เดือน", features: ["รับประกันคุณภาพ", "ญี่ปุ่นแท้"] },
  // Q-85 (คล้าย D23L)
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS Q85 (EFB)", amp: 70, cca: 630, size: "Q85", terminal: "L", type: "EFB", warranty: "18 เดือน", features: ["รองรับระะบบ Start-Stop", "ชาร์จกลับไว 2 เท่า"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB Q85 (EFB)", amp: 70, cca: 630, size: "Q85", terminal: "L", type: "EFB", warranty: "18 เดือน", features: ["ลดการปล่อยมลพิษ", "โครงสร้างแผ่นธาตุหนาขึ้น"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic Q85", amp: 65, cca: 520, size: "Q85", terminal: "L", type: "EFB", warranty: "12 เดือน", features: ["Eco Series Japan", "จ่ายไฟนิ่งสม่ำเสมอ"] },
  { brand: "VARTA", brandLogo: "/images/brands/varta.png", model: "Varta Q85 Silver EFB", amp: 70, cca: 660, size: "Q85", terminal: "L", type: "EFB", warranty: "18 เดือน", features: ["เทคโนโลยีเยอรมัน", "cca สูงจัด"] },

  // --- DIN Series (รถยุโรป, รถใหม่ๆ ปลายทางขั้วจม) ---
  // LN1 / DIN45
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS LN1-MF", amp: 45, cca: 400, size: "LN1", terminal: "ขั้วจม", type: "MF", warranty: "12 เดือน", features: ["ฟิตพอดีช่องใส่", "ขั้วจมมาตรฐานยุโรป"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB LN1", amp: 45, cca: 400, size: "LN1", terminal: "ขั้วจม", type: "MF", warranty: "12 เดือน", features: ["ดีไซน์สำหรับยุโรป/EV 12V", "ทนทาน"] },
  { brand: "VARTA", brandLogo: "/images/brands/varta.png", model: "Varta Blue LN1", amp: 44, cca: 440, size: "LN1", terminal: "ขั้วจม", type: "SMF", warranty: "12 เดือน", features: ["แบรนด์พรีเมียมยุโรป", "ทนความร้อนเยี่ยม"] },
  
  // LN2 / DIN65
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS LN2-MF (DIN65)", amp: 65, cca: 580, size: "LN2", terminal: "ขั้วจม", type: "MF", warranty: "12 เดือน", features: ["ตรงรุ่น CHR/MG/Honda Turbo", "ไฟแรง 65Ah"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB LN2 (DIN65)", amp: 65, cca: 580, size: "LN2", terminal: "ขั้วจม", type: "MF", warranty: "12 เดือน", features: ["ผลิตตามสเปกยุโรป", "ไม่ต้องดูแลเลย"] },
  { brand: "VARTA", brandLogo: "/images/brands/varta.png", model: "Varta Blue LN2", amp: 60, cca: 540, size: "LN2", terminal: "ขั้วจม", type: "SMF", warranty: "18 เดือน", features: ["อายุการใช้งานยาวนาน", "ไฟเดินนิ่งมาก"] },
  { brand: "AMARON", brandLogo: "/images/brands/amaron.png", model: "Amaron DIN65", amp: 65, cca: 600, size: "LN2", terminal: "ขั้วจม", type: "SMF", warranty: "24 เดือน", features: ["รับประกัน 2 ปี!!", "สู้ร้อนทนทาน"] },

  // LN3 / DIN75
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS LN3-MF (DIN75)", amp: 75, cca: 720, size: "LN3", terminal: "ขั้วจม", type: "MF", warranty: "12 เดือน", features: ["สำหรับรถ SUV ยุโรป, Revo, Fortuner", "รองรับออปชั่นไฟฟ้าเยอะ"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB LN3 (DIN75)", amp: 75, cca: 720, size: "LN3", terminal: "ขั้วจม", type: "MF", warranty: "12 เดือน", features: ["กำลังสตาร์ทสูง 720 CCA", "รักษาประจุไฟได้ดีเยื่ยม"] },
  { brand: "VARTA", brandLogo: "/images/brands/varta.png", model: "Varta Blue LN3", amp: 74, cca: 680, size: "LN3", terminal: "ขั้วจม", type: "SMF", warranty: "18 เดือน", features: ["ทนทานระดับสากล", "สำหรับรถกินไฟเยอะ"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch DIN75 LN3", amp: 75, cca: 680, size: "LN3", terminal: "ขั้วจม", type: "SMF", warranty: "15 เดือน", features: ["ของแต่งมาตรฐานเยอรมัน", "มั่นใจได้เสมอ"] },
  
  // LN4 / DIN85
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS LN4-MF (DIN85)", amp: 85, cca: 780, size: "LN4", terminal: "ขั้วจม", type: "MF", warranty: "12 เดือน", features: ["สำหรับรถยุโรปขนาดใหญ่/Raptor", "แอมป์สูงลิ่ว"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB LN4 (DIN85)", amp: 85, cca: 780, size: "LN4", terminal: "ขั้วจม", type: "MF", warranty: "12 เดือน", features: ["รับโหลดไฟฟ้ามหาศาล", "สตาร์ทง่ายในทุกสภาวะ"] },
  { brand: "VARTA", brandLogo: "/images/brands/varta.png", model: "Varta Blue LN4", amp: 80, cca: 740, size: "LN4", terminal: "ขั้วจม", type: "SMF", warranty: "18 เดือน", features: ["มาตรฐานเยอรมัน", "กระแสเสถียรสุดติ่ง"] },

  // LN5 / DIN100
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS LN5-MF (DIN100)", amp: 100, cca: 850, size: "LN5", terminal: "ขั้วจม", type: "MF", warranty: "12 เดือน", features: ["สำหรับรถหรู Supercar, Van ขนาดใหญ่"] },
  { brand: "VARTA", brandLogo: "/images/brands/varta.png", model: "Varta Silver LN5", amp: 100, cca: 830, size: "LN5", terminal: "ขั้วจม", type: "SMF", warranty: "18 เดือน", features: ["รุ่นท็อป Silver Dynamic", "ดีที่สุดของสมรรถนะ"] },

  // --- AGM Series (สำหรับรถยุโรป High-end ที่มี Auto Start-Stop) ---
  { brand: "VARTA", brandLogo: "/images/brands/varta.png", model: "Varta AGM LN3 (70Ah)", amp: 70, cca: 760, size: "AGM LN3", terminal: "ขั้วจม", type: "AGM", warranty: "18 เดือน", features: ["AGM แท้ 100%", "อายุยาวกว่า 3 เท่า", "BMW/Benz เลือกใช้"] },
  { brand: "VARTA", brandLogo: "/images/brands/varta.png", model: "Varta AGM LN4 (80Ah)", amp: 80, cca: 800, size: "AGM LN4", terminal: "ขั้วจม", type: "AGM", warranty: "18 เดือน", features: ["สุดยอดพลังงาน", "เก็บไฟดีเยี่ยม"] },
  { brand: "VARTA", brandLogo: "/images/brands/varta.png", model: "Varta AGM LN5 (95Ah)", amp: 95, cca: 850, size: "AGM LN5", terminal: "ขั้วจม", type: "AGM", warranty: "18 เดือน", features: ["รองรับระะบบไฟฟ้าสูงสุดของรถยุโรปรุ่น Top"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch AGM LN3", amp: 70, cca: 760, size: "AGM LN3", terminal: "ขั้วจม", type: "AGM", warranty: "18 เดือน", features: ["เทคโนโลยีแผ่นแก้วซับน้ำกรด", "ทนทานเป็นพิเศษ"] },
];

const batteryCatalog = [...allProducts, ...extraBatteryProducts];

function getBats(sizes: string[]): BatteryProduct[] {
  const keywordSet = new Set(sizes);
  return batteryCatalog
    .filter((p) => keywordSet.has(p.size))
    .map((p, idx) => ({ ...p, id: `${p.brand}-${p.size}-${idx}` }));
}

// Helper:
const B19L = getBats(["B19L", "M42"]);
const B24L = getBats(["B24L", "N55"]);
const B24R = getBats(["B24R"]);
const D23L = getBats(["D23L", "Q85"]);
const D26L = getBats(["D26L"]);
const D31L = getBats(["D31L"]);
const D31R = getBats(["D31R"]);
const Q85 = getBats(["Q85", "D23L"]);
const LN1 = getBats(["LN1"]);
const LN2 = getBats(["LN2"]);
const LN3 = getBats(["LN3", "AGM LN3"]);
const LN4 = getBats(["LN4", "AGM LN4"]);
const LN5 = getBats(["LN5", "AGM LN5"]);
const AGM_LN3 = getBats(["AGM LN3"]);
const AGM_LN4 = getBats(["AGM LN4"]);
const AGM_LN5 = getBats(["AGM LN5"]);

// ─── Car Brands Data ───
const baseCarBrands: CarBrand[] = [
  {
    name: "Toyota",
    nameEn: "Toyota",
    logo: "/images/cars/toyota.png",
    models: [
      { name: "Yaris / Yaris Ativ (โฉมแรก)", years: "2013-2016", engineCC: "1.2", batterySize: "Q85", recommendedAmp: 70, batteries: Q85 },
      { name: "Yaris / Yaris Ativ (โฉมใหม่)", years: "2017-ปัจจุบัน", engineCC: "1.2", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "Vios (Gen 2-3)", years: "2007-2022", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Sienta", years: "2016-ปัจจุบัน", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Corolla Altis (รุ่นเก่าเกรด 1.6-1.8)", years: "2008-2018", engineCC: "1.6-1.8", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Corolla Altis (โฉม TNGA)", years: "2019-ปัจจุบัน", engineCC: "1.6-1.8 / Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "Corolla Cross", years: "2020-ปัจจุบัน", engineCC: "1.8 / Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "C-HR", years: "2018-ปัจจุบัน", engineCC: "1.8 / Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "Camry (ACV40, ACV50)", years: "2006-2018", engineCC: "2.0-2.5", batterySize: "D26L", recommendedAmp: 75, batteries: D26L },
      { name: "Camry (TNGA)", years: "2019-ปัจจุบัน", engineCC: "2.0-2.5 / Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Avanza / Veloz", years: "2012-ปัจจุบัน", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Innova Crysta", years: "2016-2022", engineCC: "2.8", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Innova Zenix", years: "2023-ปัจจุบัน", engineCC: "2.0 Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "Hilux Vigo (2.5, 3.0)", years: "2004-2015", engineCC: "2.5-3.0", batterySize: "D31L", recommendedAmp: 80, batteries: D31L },
      { name: "Hilux Revo / Fortuner", years: "2015-ปัจจุบัน", engineCC: "2.4-2.8", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Fortuner (โฉมแรก หน้าแชมป์)", years: "2005-2015", engineCC: "2.5-3.0", batterySize: "D31L", recommendedAmp: 80, batteries: D31L },
      { name: "Alphard / Vellfire (Gen3)", years: "2015-2023", engineCC: "2.5 / Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Alphard / Vellfire (Gen4)", years: "2023-ปัจจุบัน", engineCC: "2.5 / Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Majesty", years: "2019-ปัจจุบัน", engineCC: "2.8", batterySize: "LN4", recommendedAmp: 85, batteries: LN4 },
      { name: "Hiace / Commuter", years: "2005-2018", engineCC: "2.5-3.0", batterySize: "D31R", recommendedAmp: 80, batteries: D31R },
      { name: "Commuter (โฉมใหม่)", years: "2019-ปัจจุบัน", engineCC: "2.8", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
    ]
  },
  {
    name: "Honda",
    nameEn: "Honda",
    logo: "/images/cars/honda.png",
    models: [
      { name: "Brio / Brio Amaze", years: "2011-2019", engineCC: "1.2", batterySize: "B19L", recommendedAmp: 40, batteries: B19L },
      { name: "City / Jazz (โฉมเก่า 1.5)", years: "2008-2019", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "City (Turbo 1.0 / e:HEV)", years: "2020-ปัจจุบัน", engineCC: "1.0T / 1.5 Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "Civic (FD, FB, FC, FK)", years: "2006-2021", engineCC: "1.5T-2.0", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Civic (FE 1.5T / e:HEV)", years: "2022-ปัจจุบัน", engineCC: "1.5T / Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Accord (G8, G9)", years: "2008-2018", engineCC: "2.0-2.4", batterySize: "D26L", recommendedAmp: 75, batteries: D26L },
      { name: "Accord (G10 1.5T / 2.0 Hybrid)", years: "2019-2023", engineCC: "1.5T / 2.0H", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Accord (G11 e:HEV)", years: "2023-ปัจจุบัน", engineCC: "2.0 Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "CR-V (G3-G4)", years: "2007-2016", engineCC: "2.0-2.4", batterySize: "D26L", recommendedAmp: 75, batteries: D26L },
      { name: "CR-V (G5 2.4 เบนซิน)", years: "2017-2022", engineCC: "2.4", batterySize: "D26L", recommendedAmp: 75, batteries: D26L },
      { name: "CR-V (G5 1.6 ดีเซล)", years: "2017-2022", engineCC: "1.6 Diesel", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "CR-V (G6 1.5T / e:HEV)", years: "2023-ปัจจุบัน", engineCC: "1.5T / Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "HR-V (โฉม 1.8)", years: "2015-2021", engineCC: "1.8", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "HR-V (e:HEV)", years: "2022-ปัจจุบัน", engineCC: "1.5 Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "WR-V / BR-V (All New)", years: "2022-ปัจจุบัน", engineCC: "1.5", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "BR-V (โฉมเก่า) / Mobilio", years: "2014-2021", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Freed", years: "2010-2015", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "StepWGN Spada", years: "2010-2016", engineCC: "2.0", batterySize: "B24L", recommendedAmp: 50, batteries: B24L }
    ]
  },
  {
    name: "Mazda",
    nameEn: "Mazda",
    logo: "/images/cars/mazda.png",
    models: [
      { name: "Mazda 2 (Skyactiv เบนซิน/ดีเซล)", years: "2015-ปัจจุบัน", engineCC: "1.3/1.5", batterySize: "Q85", recommendedAmp: 70, batteries: Q85 },
      { name: "Mazda 3 (Skyactiv)", years: "2014-ปัจจุบัน", engineCC: "2.0", batterySize: "Q85", recommendedAmp: 70, batteries: Q85 },
      { name: "CX-3", years: "2015-ปัจจุบัน", engineCC: "2.0", batterySize: "Q85", recommendedAmp: 70, batteries: Q85 },
      { name: "CX-30", years: "2020-ปัจจุบัน", engineCC: "2.0", batterySize: "Q85", recommendedAmp: 70, batteries: Q85 },
      { name: "CX-5 (เบนซิน 2.0 / 2.5)", years: "2013-ปัจจุบัน", engineCC: "2.0-2.5", batterySize: "Q85", recommendedAmp: 70, batteries: Q85 },
      { name: "CX-5 (ดีเซล 2.2)", years: "2013-ปัจจุบัน", engineCC: "2.2 Diesel", batterySize: "D31L", recommendedAmp: 90, batteries: D31L },
      { name: "CX-8 (เบนซิน / ดีเซล)", years: "2019-ปัจจุบัน", engineCC: "2.2-2.5", batterySize: "Q85", recommendedAmp: 70, batteries: Q85 },
      { name: "BT-50 Pro", years: "2012-2020", engineCC: "2.2-3.2", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "BT-50 (ใหม่ เครื่องอีซูซุ)", years: "2021-ปัจจุบัน", engineCC: "1.9-3.0", batterySize: "D26L", recommendedAmp: 75, batteries: D26L }
    ]
  },
  {
    name: "Nissan",
    nameEn: "Nissan",
    logo: "/images/cars/nissan.png",
    models: [
      { name: "Almera / Note / March (1.2L)", years: "2010-2019", engineCC: "1.2", batterySize: "Q85", recommendedAmp: 70, batteries: Q85 },
      { name: "Almera (1.0 Turbo)", years: "2020-ปัจจุบัน", engineCC: "1.0T", batterySize: "Q85", recommendedAmp: 70, batteries: Q85 },
      { name: "Sylphy / Pulsar", years: "2012-2020", engineCC: "1.6-1.8", batterySize: "D23L", recommendedAmp: 65, batteries: D23L },
      { name: "Teana (J32, L33)", years: "2009-2020", engineCC: "2.0-2.5", batterySize: "D23L", recommendedAmp: 65, batteries: D23L },
      { name: "Kicks (e-Power)", years: "2020-ปัจจุบัน", engineCC: "1.2 Hybrid", batterySize: "LN1", recommendedAmp: 45, batteries: LN1 },
      { name: "Navara (NP300, Pro-4X)", years: "2014-ปัจจุบัน", engineCC: "2.3-2.5", batterySize: "D26L", recommendedAmp: 75, batteries: D26L },
      { name: "Terra", years: "2018-ปัจจุบัน", engineCC: "2.3", batterySize: "D26L", recommendedAmp: 75, batteries: D26L },
      { name: "X-Trail (T32)", years: "2014-2020", engineCC: "2.0-2.5", batterySize: "D23L", recommendedAmp: 65, batteries: D23L },
      { name: "X-Trail (Hybrid)", years: "2014-2020", engineCC: "2.0 Hybrid", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Urvan (E25, E26)", years: "-ปัจจุบัน", engineCC: "2.5-3.0", batterySize: "D31L", recommendedAmp: 80, batteries: D31R } // Note: E26 often uses D31L/R depending on ver
    ]
  },
  {
    name: "Mitsubishi",
    nameEn: "Mitsubishi",
    logo: "/images/cars/mitsubishi.png",
    models: [
      { name: "Mirage / Attrage", years: "2012-ปัจจุบัน", engineCC: "1.2", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Xpander / Xpander Cross", years: "2018-ปัจจุบัน", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Xpander HEV", years: "2024-ปัจจุบัน", engineCC: "1.6 Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "Lancer EX", years: "2009-2016", engineCC: "1.8-2.0", batterySize: "D23L", recommendedAmp: 65, batteries: D23L },
      { name: "Triton (โฉมก่อน)", years: "2005-2023", engineCC: "2.4-2.5", batterySize: "D31L", recommendedAmp: 80, batteries: D31L },
      { name: "Triton (All-New 2024)", years: "2024-ปัจจุบัน", engineCC: "2.4", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Pajero Sport (โฉมแรก)", years: "2008-2015", engineCC: "2.4-3.2", batterySize: "D31L", recommendedAmp: 80, batteries: D31L },
      { name: "Pajero Sport (โฉมใหม่)", years: "2015-ปัจจุบัน", engineCC: "2.4", batterySize: "D31L", recommendedAmp: 80, batteries: D31L },
      { name: "Outlander PHEV", years: "2020-ปัจจุบัน", engineCC: "2.4 PHEV", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 }
    ]
  },
  {
    name: "Isuzu",
    nameEn: "Isuzu",
    logo: "/images/cars/isuzu.png",
    models: [
      { name: "D-Max / MU-X (1.9 Blue Power)", years: "2016-ปัจจุบัน", engineCC: "1.9", batterySize: "D26L", recommendedAmp: 75, batteries: D26L },
      { name: "D-Max / MU-X (3.0 Ddi)", years: "2020-ปัจจุบัน", engineCC: "3.0", batterySize: "D26L", recommendedAmp: 75, batteries: D26L },
      { name: "D-Max / MU-X (2.5 / 3.0 รุ่นเก่า)", years: "2005-2015", engineCC: "2.5-3.0", batterySize: "D31L", recommendedAmp: 80, batteries: D31L },
      { name: "D-Max (2.5 / 3.0 ปี 2002-2011 ขั้วขวา)", years: "2002-2011", engineCC: "2.5-3.0", batterySize: "D31R", recommendedAmp: 80, batteries: D31R }
    ]
  },
  {
    name: "Suzuki",
    nameEn: "Suzuki",
    logo: "/images/cars/suzuki.png",
    models: [
      { name: "Swift (1.2)", years: "2012-ปัจจุบัน", engineCC: "1.2", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Celerio", years: "2014-ปัจจุบัน", engineCC: "1.0", batterySize: "B19L", recommendedAmp: 40, batteries: B19L },
      { name: "Ciaz", years: "2015-ปัจจุบัน", engineCC: "1.2", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Ertiga / XL7", years: "2013-ปัจจุบัน", engineCC: "1.4-1.5", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Ertiga Hybrid", years: "2023-ปัจจุบัน", engineCC: "1.5 Mild Hybrid", batterySize: "LN1", recommendedAmp: 45, batteries: LN1 },
      { name: "Jimny", years: "2019-ปัจจุบัน", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: B24L },
      { name: "Carry", years: "2006-ปัจจุบัน", engineCC: "1.5-1.6", batterySize: "B24L", recommendedAmp: 50, batteries: B24L }
    ]
  },
  {
    name: "Ford",
    nameEn: "Ford",
    logo: "/images/cars/ford.png",
    models: [
      { name: "Ranger / Everest (T6 / MC 2.2, 3.2)", years: "2012-2021", engineCC: "2.2-3.2", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Ranger / Everest (Next-Gen 2.0 Turbo)", years: "2022-ปัจจุบัน", engineCC: "2.0T", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Ranger Raptor (2.0 Bi-Turbo / 3.0 V6)", years: "2018-ปัจจุบัน", engineCC: "2.0T / 3.0V6", batterySize: "LN4", recommendedAmp: 85, batteries: LN4 },
      { name: "Fiesta / Ecosport", years: "2010-2018", engineCC: "1.4-1.6", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "Focus", years: "2012-2018", engineCC: "1.5-2.0", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 }
    ]
  },
  {
    name: "MG",
    nameEn: "MG",
    logo: "/images/cars/mg.png",
    models: [
      { name: "MG3 / MG5", years: "2015-ปัจจุบัน", engineCC: "1.5", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "MG ZS", years: "2017-ปัจจุบัน", engineCC: "1.5", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "MG HS / HS PHEV", years: "2019-ปัจจุบัน", engineCC: "1.5T", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "MG Extender", years: "2019-ปัจจุบัน", engineCC: "2.0T", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "MG EP / ES / MG4 / ZS EV", years: "2020-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: LN1 },
      { name: "MG Maxus 9", years: "2023-ปัจจุบัน", engineCC: "EV", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 }
    ]
  },
  {
    name: "Chevrolet",
    nameEn: "Chevrolet",
    logo: "/images/cars/chevrolet.png",
    models: [
      { name: "Colorado / Trailblazer", years: "2012-2020", engineCC: "2.5-2.8", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Captiva (Gen1)", years: "2007-2018", engineCC: "2.0 Diesel, 2.4", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Captiva (Gen2)", years: "2019-2021", engineCC: "1.5T", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "Cruze / Sonic", years: "2012-2018", engineCC: "1.4-1.8", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "Cruze 2.0 Diesel", years: "2012-2018", engineCC: "2.0 Diesel", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 },
      { name: "Optra", years: "2003-2010", engineCC: "1.6-1.8", batterySize: "D23L", recommendedAmp: 65, batteries: D23L }
    ]
  },
  {
    name: "Subaru",
    nameEn: "Subaru",
    logo: "/images/cars/subaru.png",
    models: [
      { name: "XV / Forester", years: "2012-ปัจจุบัน", engineCC: "2.0", batterySize: "Q85", recommendedAmp: 70, batteries: Q85 },
      { name: "Outback", years: "2015-ปัจจุบัน", engineCC: "2.5", batterySize: "Q85", recommendedAmp: 70, batteries: Q85 },
      { name: "BRZ / WRX", years: "2013-ปัจจุบัน", engineCC: "2.0-2.4", batterySize: "D23L", recommendedAmp: 65, batteries: D23L }
    ]
  },
  {
    name: "GWM",
    nameEn: "GWM",
    logo: "/images/cars/gwm.png",
    models: [
      { name: "Haval H6 (HEV/PHEV) / Jolion", years: "2021-ปัจจุบัน", engineCC: "1.5 Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 },
      { name: "ORA Good Cat", years: "2021-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: LN1 },
      { name: "Tank 300 / 500", years: "2023-ปัจจุบัน", engineCC: "2.0 Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: LN3 }
    ]
  },
  {
    name: "BYD",
    nameEn: "BYD",
    logo: "/images/cars/byd.png",
    models: [
      { name: "Atto 3 / Dolphin / Seal", years: "2022-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: LN1 }
    ]
  },
  {
    name: "Hyundai",
    nameEn: "Hyundai",
    logo: "/images/cars/hyundai.png",
    models: [
      { name: "H-1 / Staria", years: "2008-ปัจจุบัน", engineCC: "2.2-2.5 Diesel", batterySize: "D31R", recommendedAmp: 90, batteries: D31R },
      { name: "Tucson", years: "2010-2015", engineCC: "2.0", batterySize: "D26L", recommendedAmp: 75, batteries: D26L },
      { name: "Elantra", years: "2012-2017", engineCC: "1.8", batterySize: "D23L", recommendedAmp: 65, batteries: D23L },
      { name: "Ioniq 5 / Ioniq 6", years: "2023-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: LN1 }
    ]
  },
  {
    name: "Kia",
    nameEn: "Kia",
    logo: "/images/cars/kia.png",
    models: [
      { name: "Carnival (Gen3, Gen4)", years: "2015-ปัจจุบัน", engineCC: "2.2 Diesel", batterySize: "D31L", recommendedAmp: 90, batteries: D31L },
      { name: "EV6 / EV9", years: "2023-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: LN1 }
    ]
  },
  {
    name: "BMW",
    nameEn: "BMW",
    logo: "/images/cars/bmw.png",
    models: [
      { name: "Series 1 / X1 / X2", years: "2010-ปัจจุบัน", engineCC: "1.5-2.0", batterySize: "AGM LN3", recommendedAmp: 70, batteries: AGM_LN3 },
      { name: "Series 3 / Series 4 / Series 5", years: "2012-ปัจจุบัน", engineCC: "2.0", batterySize: "AGM LN4", recommendedAmp: 80, batteries: AGM_LN4 },
      { name: "Series 7 / X3 / X4 / X5 / X6", years: "2010-ปัจจุบัน", engineCC: "2.0-3.0", batterySize: "AGM LN5", recommendedAmp: 95, batteries: AGM_LN5 }
    ]
  },
  {
    name: "Mercedes-Benz",
    nameEn: "Mercedes-Benz",
    logo: "/images/cars/benz.png",
    models: [
      { name: "A-Class / GLA / CLA", years: "2013-ปัจจุบัน", engineCC: "1.3-2.0", batterySize: "AGM LN3", recommendedAmp: 70, batteries: AGM_LN3 },
      { name: "C-Class / GLC / E-Class", years: "2012-ปัจจุบัน", engineCC: "1.5-2.0", batterySize: "AGM LN4", recommendedAmp: 80, batteries: AGM_LN4 },
      { name: "S-Class / GLE / GLS", years: "2010-ปัจจุบัน", engineCC: "2.0-3.0", batterySize: "AGM LN5", recommendedAmp: 95, batteries: AGM_LN5 }
    ]
  },
  {
    name: "Volvo",
    nameEn: "Volvo",
    logo: "/images/cars/volvo.png",
    models: [
      { name: "XC40 / C40", years: "2018-ปัจจุบัน", engineCC: "2.0 / EV", batterySize: "AGM LN3", recommendedAmp: 70, batteries: AGM_LN3 },
      { name: "XC60 / S60 / V60", years: "2010-ปัจจุบัน", engineCC: "2.0", batterySize: "AGM LN4", recommendedAmp: 80, batteries: AGM_LN4 },
      { name: "XC90 / S90", years: "2015-ปัจจุบัน", engineCC: "2.0", batterySize: "AGM LN5", recommendedAmp: 95, batteries: AGM_LN5 }
    ]
  },
  {
    name: "Audi",
    nameEn: "Audi",
    logo: "/images/cars/audi.png",
    models: [
      { name: "A1 / A3 / Q2 / Q3", years: "2012-ปัจจุบัน", engineCC: "1.4-2.0", batterySize: "AGM LN3", recommendedAmp: 70, batteries: AGM_LN3 },
      { name: "A4 / A5 / Q5", years: "2010-ปัจจุบัน", engineCC: "2.0", batterySize: "AGM LN4", recommendedAmp: 80, batteries: AGM_LN4 },
      { name: "A6 / A7 / A8 / Q7 / Q8", years: "2010-ปัจจุบัน", engineCC: "2.0-3.0", batterySize: "AGM LN5", recommendedAmp: 95, batteries: AGM_LN5 }
    ]
  },
  {
    name: "NETA",
    nameEn: "NETA",
    logo: "/images/cars/neta.png",
    models: [
      { name: "Neta V / Neta V-II", years: "2023-ปัจจุบัน", engineCC: "EV", batterySize: "B19L", recommendedAmp: 40, batteries: B19L }
    ]
  },
  {
    name: "Peugeot",
    nameEn: "Peugeot",
    logo: "/images/cars/peugeot.png",
    models: [
      { name: "2008 / 3008 / 5008", years: "2019-ปัจจุบัน", engineCC: "1.2-1.6", batterySize: "LN2", recommendedAmp: 65, batteries: LN2 }
    ]
  }
];

function resolveBatteriesBySize(size: string): BatteryProduct[] {
  return getBats([size]);
}

const mergedExtraModelsByBrand: Record<string, CarModel[]> = Object.fromEntries(
  Object.entries(extraModelsByBrand).map(([brand, models]) => [
    brand,
    models.map((model) => ({
      ...model,
      batteries: resolveBatteriesBySize(model.batterySize),
    })),
  ])
) as Record<string, CarModel[]>;

export const carBrands: CarBrand[] = baseCarBrands.map((brand) => ({
  ...brand,
  models: [...brand.models, ...(mergedExtraModelsByBrand[brand.nameEn] ?? [])],
}));
