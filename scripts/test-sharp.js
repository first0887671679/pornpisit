const sharp = require('sharp');
const fs = require('fs');

const svg = `
<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#1e293b" />
  <text x="50" y="100" font-family="Leelawadee UI, Tahoma, sans-serif" font-size="40" fill="#ffffff">ทดสอบภาษาไทย Firstcar</text>
</svg>
`;

sharp(Buffer.from(svg))
  .toFile('public/images/test-thai.png')
  .then(() => console.log('Successfully generated test-thai.png'))
  .catch(err => console.error('Error:', err));
