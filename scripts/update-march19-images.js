const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Find the SQLite database
const dbPaths = [
  path.join(__dirname, '..', 'prisma', 'dev.db'),
  path.join(__dirname, '..', 'dev.db'),
];

let dbPath = null;
for (const p of dbPaths) {
  if (fs.existsSync(p)) {
    dbPath = p;
    break;
  }
}

if (!dbPath) {
  console.error('❌ ไม่พบไฟล์ dev.db');
  process.exit(1);
}

console.log(`📂 Database: ${dbPath}`);

// 7 posts to update (March 19, 2026)
const updates = [
  { slug: 'alternator-burnt-repair-guide', cover: '/images/blog/pig-alternator-burnt-cover.svg', info: 'pig-alternator-burnt-info.svg' },
  { slug: 'alternator-repair-price-guide', cover: '/images/blog/pig-alternator-repair-price-cover.svg', info: 'pig-alternator-repair-price-info.svg' },
  { slug: 'hybrid-car-dead-battery-guide', cover: '/images/blog/pig-hybrid-battery-dead-cover.svg', info: 'pig-hybrid-battery-dead-info.svg' },
  { slug: 'pickup-truck-battery-guide', cover: '/images/blog/pig-pickup-battery-cover.svg', info: 'pig-pickup-battery-info.svg' },
  { slug: 'runflat-tire-repair-guide', cover: '/images/blog/pig-runflat-tire-repair-cover.svg', info: 'pig-runflat-tire-repair-info.svg' },
  { slug: 'starter-motor-brush-repair-guide', cover: '/images/blog/pig-starter-brush-cover.svg', info: 'pig-starter-brush-info.svg' },
  { slug: 'woman-flat-tire-survival-guide', cover: '/images/blog/pig-woman-flat-tire-cover.svg', info: 'pig-woman-flat-tire-info.svg' },
];

// Build SQL
let sql = '';
for (const u of updates) {
  // Update coverImage
  sql += `UPDATE Post SET coverImage = '${u.cover}', updatedAt = datetime('now') WHERE slug = '${u.slug}';\n`;
  // Also update content: replace old cover image src with new one in HTML content
  sql += `UPDATE Post SET content = REPLACE(content, 'src="/images/blog/${u.info.replace('-info.','-cover.')}', 'src="${u.cover}') WHERE slug = '${u.slug}';\n`;
}

// Verify query
sql += `SELECT slug, coverImage FROM Post WHERE slug IN (${updates.map(u => `'${u.slug}'`).join(',')});\n`;

// Write temp SQL file and execute with sqlite3
const tmpSql = path.join(__dirname, '_tmp_update.sql');
fs.writeFileSync(tmpSql, sql);

try {
  const result = execSync(`sqlite3 "${dbPath}" < "${tmpSql}"`, { encoding: 'utf-8', shell: true });
  console.log('✅ อัปเดตสำเร็จ!');
  if (result.trim()) console.log(result);
} catch (err) {
  // sqlite3 CLI might not be available, try alternative
  console.log('⚠️ sqlite3 CLI ไม่พร้อมใช้งาน ลองใช้วิธีอื่น...');
  
  // Fallback: use better-sqlite3 or sql.js via dynamic require
  try {
    const Database = require('better-sqlite3');
    const db = new Database(dbPath);
    
    for (const u of updates) {
      db.prepare(`UPDATE Post SET coverImage = ?, updatedAt = datetime('now') WHERE slug = ?`).run(u.cover, u.slug);
      console.log(`✅ Updated: ${u.slug} -> ${u.cover}`);
    }
    
    const rows = db.prepare(`SELECT slug, coverImage FROM Post WHERE slug IN (${updates.map(() => '?').join(',')})`).all(...updates.map(u => u.slug));
    console.log('\n📋 ผลลัพธ์:');
    rows.forEach(r => console.log(`  ${r.slug} => ${r.coverImage}`));
    
    db.close();
  } catch (err2) {
    console.error('❌ ไม่สามารถอัปเดตได้ กรุณารันคำสั่งนี้ใน terminal:');
    console.error(`  npx prisma generate`);
    console.error(`  จากนั้นรัน: npx tsx scripts/update-march19-images-prisma.ts`);
  }
} finally {
  if (fs.existsSync(tmpSql)) fs.unlinkSync(tmpSql);
}
