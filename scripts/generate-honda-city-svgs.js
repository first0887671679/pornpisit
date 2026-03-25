const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../public/images/blog');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// 1. Cover Image (Dark Blue / Glow with Mascot)
const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050914" />
      <stop offset="100%" stop-color="#12182B" />
    </linearGradient>
    <radialGradient id="glowOrange" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF6B00" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#FF6B00" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowCyan" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#00F2FE" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="none" />
      <circle cx="20" cy="20" r="1" fill="#ffffff" fill-opacity="0.1" />
      <line x1="0" y1="0" x2="40" y2="0" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1" />
      <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1" />
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <circle cx="200" cy="500" r="400" fill="url(#glowOrange)" />
  <circle cx="1000" cy="100" r="500" fill="url(#glowCyan)" />

  <g transform="translate(80, 100)">
    <rect x="0" y="0" width="180" height="40" rx="20" fill="rgba(255,107,0,0.15)" stroke="#FF6B00" stroke-width="1.5" />
    <text x="90" y="26" font-family="Prompt, sans-serif" font-size="18" font-weight="bold" fill="#FF6B00" text-anchor="middle">CASE STUDY 2026</text>
  </g>

  <g transform="translate(80, 180)">
    <text font-family="Prompt, sans-serif" font-weight="900" fill="#FFFFFF">
      <tspan x="0" y="0" font-size="72">แบตเตอรี่ Honda City</tspan>
      <tspan x="0" y="90" font-size="64">สตาร์ทไม่ติด ทำไงดี?</tspan>
    </text>
    <text x="0" y="160" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">รีวิวเปลี่ยนแบตด่วน โซนศรีนครินทร์ - บางนา</text>
    <text x="0" y="210" font-family="Prompt, sans-serif" font-size="28" font-weight="400" fill="#94A3B8">อัปเดตสเปกแบต 1.0 Turbo / EFB</text>
  </g>

  <!-- Mascot Placeholder -->
  <g transform="translate(750, 150)">
    <circle cx="200" cy="200" r="180" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2" />
    <text x="200" y="180" font-family="Prompt, sans-serif" font-size="64" text-anchor="middle" fill="#FF6B00">🐷 🔋</text>
    <text x="200" y="240" font-family="Prompt, sans-serif" font-size="24" text-anchor="middle" fill="#94A3B8">FIRSTCAR MASCOT</text>
  </g>
</svg>`;

// 2. Inline Image 1 (Diagnostic)
const inline1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#1e293b" rx="24" />
  <rect x="0" y="0" width="800" height="450" fill="rgba(255,255,255,0.03)" rx="24" />
  <circle cx="400" cy="225" r="150" fill="rgba(56, 189, 248, 0.15)" filter="blur(30px)" />
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🚗 ⚡ 🔧</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">กำลังตรวจเช็กระบบไฟ Honda City 1.0 Turbo</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: ตลาดหนามแดง เทพารักษ์</text>
  </g>
</svg>`;

// 3. Inline Image 2 (Battery Install)
const inline2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <rect width="800" height="450" fill="#0f172a" rx="24" />
  <circle cx="400" cy="225" r="150" fill="rgba(249, 115, 22, 0.15)" filter="blur(30px)" />
  <g transform="translate(400, 200)" text-anchor="middle">
    <text font-size="64">🔋 ✅ 🚀</text>
    <text y="70" font-family="Prompt, sans-serif" font-size="24" font-weight="bold" fill="#f8fafc">เปลี่ยนแบตเตอรี่ EFB สำรองไฟ ECU เรียบร้อย</text>
    <text y="110" font-family="Prompt, sans-serif" font-size="18" fill="#94a3b8">สถานที่: คอนโด ซอยแบริ่ง (สุขุมวิท 107)</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'pig-honda-city-battery-cover.svg'), coverSvg);
fs.writeFileSync(path.join(imgDir, 'honda-city-battery-case1.svg'), inline1Svg);
fs.writeFileSync(path.join(imgDir, 'honda-city-battery-case2.svg'), inline2Svg);

console.log('SVGs created successfully.');
