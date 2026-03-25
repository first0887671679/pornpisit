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
  if (!row) {
    console.log(`\n=== NOT FOUND: ${slug} ===\n`);
    continue;
  }
  // Get last 3000 chars of content to find the CTA
  const tail = row.content.slice(-3000);
  console.log(`\n========== ${slug} (last 3000 chars) ==========`);
  console.log(tail);
  console.log(`\n========== END ${slug} ==========\n`);
}

db.close();
