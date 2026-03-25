const Database = require('better-sqlite3');
const db = new Database('prisma/dev.db', { readonly: true });

const slugs = [
  'car-polishing-before-sale-guide',
  'asphalt-stain-removal-guide',
  'car-overspray-removal-guide',
  'european-car-runflat-tire-repair-guide',
];

for (const slug of slugs) {
  const row = db.prepare('SELECT slug, content FROM Post WHERE slug = ?').get(slug);
  if (!row) { console.log(`NOT FOUND: ${slug}`); continue; }
  const hasFaq = row.content.includes('FAQPage');
  const hasSchemaQ = row.content.includes('schema.org/Question');
  console.log(`${slug}: FAQPage=${hasFaq}, Question=${hasSchemaQ}, contentLen=${row.content.length}`);
  // Show last 200 chars to see if FAQ is at the end
  console.log(`  TAIL: ...${row.content.slice(-200)}\n`);
}
db.close();
