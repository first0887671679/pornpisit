const Database = require('better-sqlite3');
const db = new Database('prisma/dev.db', { readonly: true });

const slugs = [
  'european-car-runflat-tire-repair-guide',
  'car-polishing-before-sale-guide',
  'asphalt-stain-removal-guide',
  'car-overspray-removal-guide',
];

for (const slug of slugs) {
  const row = db.prepare('SELECT slug, content FROM Post WHERE slug = ?').get(slug);
  if (!row) { console.log(`NOT FOUND: ${slug}`); continue; }
  // Find the CTA block - look for bg-slate-900 or bg-orange dark CTA blocks
  const patterns = [
    /(<div class="bg-slate-900[^]*?<\/div>\s*<\/div>\s*<\/div>)/gs,
    /(<div class="bg-orange[^]*?<\/div>\s*<\/div>\s*<\/div>)/gs,
  ];
  console.log(`\n===== ${slug} CTA blocks =====`);
  let found = false;
  for (const pat of patterns) {
    let m;
    while ((m = pat.exec(row.content)) !== null) {
      console.log(m[0]);
      console.log('---');
      found = true;
    }
  }
  if (!found) console.log('(no CTA block found)');
}
db.close();
