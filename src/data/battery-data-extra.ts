import type { BatteryProduct, CarModel } from "./battery-data";
import { moreBatteryProducts, moreModelsByBrand } from "./battery-data-more";

export const extraBatteryProducts: Omit<BatteryProduct, "id">[] = [
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS MFX-46B19L Plus", amp: 42, cca: 390, size: "B19L", terminal: "L", type: "SMF", warranty: "15 เดือน", features: ["สตาร์ทง่ายขึ้น", "เหมาะกับรถเล็กใช้งานทุกวัน"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB Gold 42B19L", amp: 40, cca: 390, size: "B19L", terminal: "L", type: "SMF", warranty: "15 เดือน", features: ["เก็บไฟดี", "ดูแลง่ายไม่ต้องเติมน้ำ"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch AMS B19L", amp: 40, cca: 370, size: "B19L", terminal: "L", type: "SMF", warranty: "15 เดือน", features: ["มาตรฐานเยอรมัน", "ทนความร้อนในเมือง"] },
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS MFX-65L Plus (60B24L)", amp: 52, cca: 500, size: "B24L", terminal: "L", type: "SMF", warranty: "15 เดือน", features: ["ไฟแน่นขึ้น", "เหมาะกับรถเก๋งใช้งานหนัก"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB Gold S-70L", amp: 52, cca: 500, size: "B24L", terminal: "L", type: "MF", warranty: "15 เดือน", features: ["สตาร์ทง่าย", "รองรับอุปกรณ์ไฟฟ้าเพิ่ม"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic 75B24L Premium", amp: 50, cca: 470, size: "B24L", terminal: "L", type: "SMF", warranty: "15 เดือน", features: ["ญี่ปุ่นพรีเมียม", "ไฟนิ่งใช้งานยาว"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic 60B24R", amp: 48, cca: 420, size: "B24R", terminal: "R", type: "MF", warranty: "12 เดือน", features: ["สำหรับรถขั้วขวา", "วัสดุคุณภาพสูง"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch AMS 55B24R", amp: 50, cca: 470, size: "B24R", terminal: "R", type: "SMF", warranty: "15 เดือน", features: ["ชาร์จกลับไว", "ทนสภาพอากาศร้อน"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch AMS 75D23L", amp: 65, cca: 600, size: "D23L", terminal: "L", type: "SMF", warranty: "15 เดือน", features: ["CCA สูง", "รองรับรถกลางใช้อุปกรณ์ไฟเยอะ"] },
  { brand: "GS", brandLogo: "/images/brands/gs.png", model: "GS Q85 Premium", amp: 70, cca: 650, size: "Q85", terminal: "L", type: "EFB", warranty: "18 เดือน", features: ["รองรับ Start-Stop เต็มระบบ", "ชาร์จกลับไว"] },
  { brand: "3K", brandLogo: "/images/brands/3k.png", model: "3K SVX80D26L", amp: 75, cca: 620, size: "D26L", terminal: "L", type: "SMF", warranty: "15 เดือน", features: ["เหมาะกับ SUV/PPV", "ทนการใช้งานหนัก"] },
  { brand: "AMARON", brandLogo: "/images/brands/amaron.png", model: "Amaron FLO 95D26L", amp: 75, cca: 640, size: "D26L", terminal: "L", type: "SMF", warranty: "24 เดือน", features: ["ประกันยาว", "ทนความร้อนดีมาก"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch AMS 105D31L", amp: 95, cca: 760, size: "D31L", terminal: "L", type: "SMF", warranty: "15 เดือน", features: ["เหมาะกับรถกระบะใช้งานหนัก", "ไฟแรงสม่ำเสมอ"] },
  { brand: "AMARON", brandLogo: "/images/brands/amaron.png", model: "Amaron FLO 105D31L", amp: 95, cca: 780, size: "D31L", terminal: "L", type: "SMF", warranty: "24 เดือน", features: ["สเปกสูง", "เหมาะกับรถพาณิชย์"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic 105D31R", amp: 90, cca: 700, size: "D31R", terminal: "R", type: "MF", warranty: "12 เดือน", features: ["รถขั้วขวา", "ไฟนิ่งและทน"] },
  { brand: "3K", brandLogo: "/images/brands/3k.png", model: "3K HDX100R", amp: 90, cca: 740, size: "D31R", terminal: "R", type: "SMF", warranty: "12 เดือน", features: ["งานหนัก", "รองรับเครื่องดีเซลได้ดี"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic M42 EFB", amp: 40, cca: 400, size: "M42", terminal: "L", type: "EFB", warranty: "15 เดือน", features: ["รองรับรถ Start-Stop", "จ่ายไฟนิ่ง"] },
  { brand: "VARTA", brandLogo: "/images/brands/varta.png", model: "Varta M42 Blue EFB", amp: 40, cca: 420, size: "M42", terminal: "L", type: "EFB", warranty: "18 เดือน", features: ["เทคโนโลยีเยอรมัน", "อายุใช้งานยาว"] },
  { brand: "FB", brandLogo: "/images/brands/fb.png", model: "FB N55 EFB", amp: 55, cca: 520, size: "N55", terminal: "L", type: "EFB", warranty: "18 เดือน", features: ["EFB แท้", "เหมาะกับรถ Eco Car รุ่นใหม่"] },
  { brand: "VARTA", brandLogo: "/images/brands/varta.png", model: "Varta N55 Blue EFB", amp: 55, cca: 540, size: "N55", terminal: "L", type: "EFB", warranty: "18 เดือน", features: ["ไฟแรง", "ชาร์จกลับดี"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch Q85 EFB", amp: 70, cca: 650, size: "Q85", terminal: "L", type: "EFB", warranty: "18 เดือน", features: ["รองรับรถ i-Stop", "ทนการชาร์จถี่"] },
  { brand: "AMARON", brandLogo: "/images/brands/amaron.png", model: "Amaron Q85 EFB", amp: 65, cca: 620, size: "Q85", terminal: "L", type: "EFB", warranty: "24 เดือน", features: ["ประกันยาว", "เหมาะกับรถญี่ปุ่นรุ่นใหม่"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch DIN45 LN1", amp: 45, cca: 450, size: "LN1", terminal: "ขั้วจม", type: "SMF", warranty: "15 เดือน", features: ["เหมาะกับ EV 12V", "กระแสไฟเสถียร"] },
  { brand: "AMARON", brandLogo: "/images/brands/amaron.png", model: "Amaron DIN45 LN1", amp: 45, cca: 460, size: "LN1", terminal: "ขั้วจม", type: "SMF", warranty: "24 เดือน", features: ["ทนความร้อน", "ดูแลง่าย"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch DIN65 LN2", amp: 65, cca: 600, size: "LN2", terminal: "ขั้วจม", type: "SMF", warranty: "15 เดือน", features: ["เหมาะกับรถเทอร์โบ", "ไฟนิ่งใช้งานจริงดี"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic DIN65 LN2", amp: 60, cca: 560, size: "LN2", terminal: "ขั้วจม", type: "SMF", warranty: "15 เดือน", features: ["คุณภาพญี่ปุ่น", "ทนแรงสั่นสะเทือน"] },
  { brand: "AMARON", brandLogo: "/images/brands/amaron.png", model: "Amaron DIN75 LN3", amp: 75, cca: 700, size: "LN3", terminal: "ขั้วจม", type: "SMF", warranty: "24 เดือน", features: ["เหมาะกับ SUV", "เก็บประจุได้นาน"] },
  { brand: "Panasonic", brandLogo: "/images/brands/panasonic.png", model: "Panasonic DIN75 LN3", amp: 75, cca: 680, size: "LN3", terminal: "ขั้วจม", type: "MF", warranty: "15 เดือน", features: ["ไฟแรง", "เหมาะกับรถครอบครัวขนาดใหญ่"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch DIN85 LN4", amp: 85, cca: 800, size: "LN4", terminal: "ขั้วจม", type: "SMF", warranty: "15 เดือน", features: ["กระแสสูง", "รองรับออปชั่นไฟฟ้าเยอะ"] },
  { brand: "AMARON", brandLogo: "/images/brands/amaron.png", model: "Amaron DIN85 LN4", amp: 80, cca: 780, size: "LN4", terminal: "ขั้วจม", type: "SMF", warranty: "24 เดือน", features: ["เหมาะกับ SUV ใหญ่", "ทนร้อนเป็นพิเศษ"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch DIN100 LN5", amp: 95, cca: 830, size: "LN5", terminal: "ขั้วจม", type: "SMF", warranty: "15 เดือน", features: ["สำหรับรถหรู", "กำลังสตาร์ทสูง"] },
  { brand: "AMARON", brandLogo: "/images/brands/amaron.png", model: "Amaron DIN100 LN5", amp: 100, cca: 840, size: "LN5", terminal: "ขั้วจม", type: "SMF", warranty: "24 เดือน", features: ["ประกันยาว", "รองรับโหลดไฟจำนวนมาก"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch AGM LN4", amp: 80, cca: 800, size: "AGM LN4", terminal: "ขั้วจม", type: "AGM", warranty: "18 เดือน", features: ["รองรับ Auto Start-Stop", "ทนชาร์จคายประจุถี่"] },
  { brand: "BOSCH", brandLogo: "/images/brands/bosch.png", model: "Bosch AGM LN5", amp: 95, cca: 850, size: "AGM LN5", terminal: "ขั้วจม", type: "AGM", warranty: "18 เดือน", features: ["สำหรับรถยุโรประดับสูง", "จ่ายไฟเสถียร"] },
];

export const extraModelsByBrand: Record<string, CarModel[]> = {
  Toyota: [
    { name: "Yaris Cross", years: "2023-ปัจจุบัน", engineCC: "1.5 Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: [] },
    { name: "Raize / Raize Turbo", years: "2020-ปัจจุบัน", engineCC: "1.0T / 1.2", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Wish", years: "2004-2017", engineCC: "1.8-2.0", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Prius / Prius Prime", years: "2016-ปัจจุบัน", engineCC: "1.8 Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: [] },
    { name: "Veloz (All-New)", years: "2022-ปัจจุบัน", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Hilux Champ", years: "2023-ปัจจุบัน", engineCC: "2.0-2.7", batterySize: "D31L", recommendedAmp: 80, batteries: [] },
    { name: "Land Cruiser Prado", years: "2010-2023", engineCC: "2.8-3.0", batterySize: "LN4", recommendedAmp: 85, batteries: [] },
    { name: "bZ4X", years: "2023-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: [] },
  ],
  Honda: [
    { name: "Jazz (GK) / Jazz Hybrid", years: "2014-2020", engineCC: "1.5 / Hybrid", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Odyssey", years: "2014-2021", engineCC: "2.4 Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: [] },
    { name: "Stream", years: "2001-2014", engineCC: "1.8-2.0", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Pilot", years: "2016-ปัจจุบัน", engineCC: "3.5", batterySize: "D26L", recommendedAmp: 75, batteries: [] },
    { name: "ZR-V", years: "2023-ปัจจุบัน", engineCC: "1.5T / Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: [] },
  ],
  Mazda: [
    { name: "Mazda 2 (DE)", years: "2010-2014", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Mazda 3 (BL/BM รุ่นก่อน Skyactiv)", years: "2010-2013", engineCC: "1.6-2.0", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Mazda 6 / Atenza", years: "2013-2023", engineCC: "2.0-2.5", batterySize: "Q85", recommendedAmp: 70, batteries: [] },
    { name: "CX-9", years: "2017-2023", engineCC: "2.5 Turbo", batterySize: "Q85", recommendedAmp: 70, batteries: [] },
    { name: "CX-60 / CX-90", years: "2023-ปัจจุบัน", engineCC: "2.5-3.3", batterySize: "LN3", recommendedAmp: 75, batteries: [] },
    { name: "MX-5 Roadster", years: "2016-ปัจจุบัน", engineCC: "2.0", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
  ],
  Nissan: [
    { name: "Livina", years: "2019-ปัจจุบัน", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Serena S-Hybrid / e-Power", years: "2013-ปัจจุบัน", engineCC: "2.0 Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: [] },
    { name: "Frontier Navara (D40)", years: "2008-2014", engineCC: "2.5", batterySize: "D31L", recommendedAmp: 80, batteries: [] },
    { name: "Cefiro / Teana (J31)", years: "2004-2008", engineCC: "2.0-2.3", batterySize: "D23L", recommendedAmp: 65, batteries: [] },
    { name: "Sunny Neo / Tiida / Latio", years: "2004-2012", engineCC: "1.6-1.8", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
  ],
  Mitsubishi: [
    { name: "Space Wagon", years: "2004-2012", engineCC: "2.4", batterySize: "D23L", recommendedAmp: 65, batteries: [] },
    { name: "Lancer Cedia", years: "2003-2012", engineCC: "1.6-1.8", batterySize: "D23L", recommendedAmp: 65, batteries: [] },
    { name: "Delica D:5 / Delica Space Gear", years: "2005-ปัจจุบัน", engineCC: "2.4-2.5", batterySize: "D31L", recommendedAmp: 80, batteries: [] },
    { name: "Eclipse Cross", years: "2018-ปัจจุบัน", engineCC: "1.5", batterySize: "LN2", recommendedAmp: 65, batteries: [] },
  ],
  Isuzu: [
    { name: "MU-7", years: "2005-2013", engineCC: "3.0", batterySize: "D31L", recommendedAmp: 80, batteries: [] },
    { name: "Dragon Eye / TFR / Spacecab", years: "1997-2002", engineCC: "2.5-3.0", batterySize: "D31R", recommendedAmp: 80, batteries: [] },
    { name: "D-Max Spark / Cab Chassis", years: "2005-ปัจจุบัน", engineCC: "2.5-3.0", batterySize: "D31L", recommendedAmp: 80, batteries: [] },
    { name: "MU-X (โฉมล่าสุด)", years: "2021-ปัจจุบัน", engineCC: "1.9-3.0", batterySize: "D26L", recommendedAmp: 75, batteries: [] },
  ],
  Suzuki: [
    { name: "APV", years: "2004-ปัจจุบัน", engineCC: "1.6", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Wagon R / Splash", years: "2012-2020", engineCC: "1.2", batterySize: "B19L", recommendedAmp: 40, batteries: [] },
    { name: "Swift Sport", years: "2018-ปัจจุบัน", engineCC: "1.4 Turbo", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Jimny Sierra", years: "2019-ปัจจุบัน", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
  ],
  Ford: [
    { name: "Mustang EcoBoost / GT", years: "2016-ปัจจุบัน", engineCC: "2.3T / 5.0", batterySize: "LN4", recommendedAmp: 85, batteries: [] },
    { name: "Escape / Kuga", years: "2013-2019", engineCC: "1.5-2.0", batterySize: "LN3", recommendedAmp: 75, batteries: [] },
    { name: "Everest (โฉมแรก)", years: "2007-2011", engineCC: "2.5-3.0", batterySize: "D31L", recommendedAmp: 80, batteries: [] },
    { name: "Transit", years: "2017-ปัจจุบัน", engineCC: "2.0 Diesel", batterySize: "LN4", recommendedAmp: 85, batteries: [] },
  ],
  MG: [
    { name: "MG6", years: "2014-2020", engineCC: "1.8T", batterySize: "LN2", recommendedAmp: 65, batteries: [] },
    { name: "MG VS HEV", years: "2022-ปัจจุบัน", engineCC: "1.5 Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: [] },
    { name: "MG7", years: "2024-ปัจจุบัน", engineCC: "1.5T-2.0T", batterySize: "LN3", recommendedAmp: 75, batteries: [] },
    { name: "Maxus 7 / V80", years: "2023-ปัจจุบัน", engineCC: "EV / Diesel", batterySize: "LN4", recommendedAmp: 85, batteries: [] },
  ],
  Chevrolet: [
    { name: "Aveo", years: "2006-2012", engineCC: "1.4-1.6", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Spin", years: "2013-2020", engineCC: "1.5", batterySize: "B24L", recommendedAmp: 50, batteries: [] },
    { name: "Orlando", years: "2012-2018", engineCC: "1.8", batterySize: "LN2", recommendedAmp: 65, batteries: [] },
  ],
  Subaru: [
    { name: "Legacy / Levorg", years: "2014-ปัจจุบัน", engineCC: "1.6-2.5", batterySize: "Q85", recommendedAmp: 70, batteries: [] },
    { name: "WRX STI", years: "2015-2021", engineCC: "2.5 Turbo", batterySize: "D23L", recommendedAmp: 65, batteries: [] },
    { name: "Forester e-Boxer", years: "2019-ปัจจุบัน", engineCC: "2.0 Hybrid", batterySize: "Q85", recommendedAmp: 70, batteries: [] },
  ],
  GWM: [
    { name: "Poer / Poer Sahar", years: "2021-ปัจจุบัน", engineCC: "2.0 Diesel / Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: [] },
    { name: "Haval H6 GT", years: "2022-ปัจจุบัน", engineCC: "1.5 Hybrid", batterySize: "LN2", recommendedAmp: 65, batteries: [] },
    { name: "Ora 07", years: "2024-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: [] },
  ],
  BYD: [
    { name: "Sealion 6 DM-i", years: "2024-ปัจจุบัน", engineCC: "1.5 Plug-in Hybrid", batterySize: "LN1", recommendedAmp: 45, batteries: [] },
    { name: "M6", years: "2024-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: [] },
    { name: "Sealion 7", years: "2025-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: [] },
  ],
  Hyundai: [
    { name: "Kona Electric", years: "2018-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: [] },
    { name: "Creta", years: "2022-ปัจจุบัน", engineCC: "1.5", batterySize: "LN2", recommendedAmp: 65, batteries: [] },
    { name: "Santa Fe", years: "2013-ปัจจุบัน", engineCC: "2.2 Diesel / Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: [] },
    { name: "Palisade", years: "2020-ปัจจุบัน", engineCC: "2.2 Diesel / 3.8", batterySize: "LN4", recommendedAmp: 85, batteries: [] },
  ],
  Kia: [
    { name: "Seltos", years: "2020-ปัจจุบัน", engineCC: "1.6", batterySize: "LN2", recommendedAmp: 65, batteries: [] },
    { name: "Sorento", years: "2016-ปัจจุบัน", engineCC: "2.2 Diesel / Hybrid", batterySize: "LN3", recommendedAmp: 75, batteries: [] },
    { name: "K2500 / Pregio", years: "2004-ปัจจุบัน", engineCC: "2.5-2.9 Diesel", batterySize: "D31L", recommendedAmp: 80, batteries: [] },
  ],
  BMW: [
    { name: "2 Series / Gran Coupe", years: "2020-ปัจจุบัน", engineCC: "1.5-2.0", batterySize: "AGM LN3", recommendedAmp: 70, batteries: [] },
    { name: "i4 / i5 / iX1", years: "2022-ปัจจุบัน", engineCC: "EV", batterySize: "AGM LN4", recommendedAmp: 80, batteries: [] },
    { name: "X7 / XM", years: "2023-ปัจจุบัน", engineCC: "3.0-4.4", batterySize: "AGM LN5", recommendedAmp: 95, batteries: [] },
  ],
  "Mercedes-Benz": [
    { name: "B-Class / GLB", years: "2019-ปัจจุบัน", engineCC: "1.3-2.0", batterySize: "AGM LN3", recommendedAmp: 70, batteries: [] },
    { name: "V-Class / Vito", years: "2016-ปัจจุบัน", engineCC: "2.0 Diesel", batterySize: "AGM LN4", recommendedAmp: 80, batteries: [] },
    { name: "G-Class", years: "2019-ปัจจุบัน", engineCC: "2.0-4.0", batterySize: "AGM LN5", recommendedAmp: 95, batteries: [] },
  ],
  Volvo: [
    { name: "EX30 / EC40", years: "2024-ปัจจุบัน", engineCC: "EV", batterySize: "AGM LN3", recommendedAmp: 70, batteries: [] },
    { name: "S80 / XC70", years: "2008-2016", engineCC: "2.0-3.0", batterySize: "AGM LN4", recommendedAmp: 80, batteries: [] },
  ],
  Audi: [
    { name: "TT / สปอร์ตคูเป้", years: "2015-ปัจจุบัน", engineCC: "2.0", batterySize: "AGM LN3", recommendedAmp: 70, batteries: [] },
    { name: "e-tron / Q8 e-tron", years: "2021-ปัจจุบัน", engineCC: "EV", batterySize: "AGM LN5", recommendedAmp: 95, batteries: [] },
  ],
  NETA: [
    { name: "Neta X", years: "2024-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: [] },
    { name: "Neta GT", years: "2024-ปัจจุบัน", engineCC: "EV", batterySize: "LN1", recommendedAmp: 45, batteries: [] },
  ],
  Peugeot: [
    { name: "408 / 508", years: "2012-2018", engineCC: "1.6 Turbo", batterySize: "LN2", recommendedAmp: 65, batteries: [] },
    { name: "Traveller", years: "2020-ปัจจุบัน", engineCC: "2.0 Diesel", batterySize: "LN3", recommendedAmp: 75, batteries: [] },
  ],
};

extraBatteryProducts.push(...moreBatteryProducts);

for (const [brand, models] of Object.entries(moreModelsByBrand)) {
  if (!extraModelsByBrand[brand]) {
    extraModelsByBrand[brand] = [];
  }
  extraModelsByBrand[brand].push(...models);
}
