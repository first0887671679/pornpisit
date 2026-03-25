/**
 * Restore FAQ sections that were accidentally deleted during CTA replacement.
 * 
 * Strategy:
 * 1. Read old content from backup DB (before CTA update)
 * 2. Extract everything AFTER the old CTA block (bg-slate-900) — this is the FAQ + remaining content
 * 3. Append it to the current content in the live DB
 */
const Database = require('better-sqlite3');

const backupDb = new Database('scripts/dev-backup.db', { readonly: true });
const liveDb = new Database('prisma/dev.db');

const slugs = [
  'car-polishing-before-sale-guide',
  'asphalt-stain-removal-guide',
  'car-overspray-removal-guide',
  'european-car-runflat-tire-repair-guide',
];

// The old CTA ended with this pattern - we need to find what came AFTER it
// The old CTA was: <div class="bg-slate-900 text-white ...">...</div>\n</div>\n</div>
// After that CTA block, there was FAQ content

for (const slug of slugs) {
  const oldRow = backupDb.prepare('SELECT content FROM Post WHERE slug = ?').get(slug);
  const liveRow = liveDb.prepare('SELECT id, content FROM Post WHERE slug = ?').get(slug);

  if (!oldRow || !liveRow) {
    console.log(`⚠️ Missing data for: ${slug}`);
    continue;
  }

  // Find the old CTA block end in original content
  // The old CTA starts with: <div class="bg-slate-900 text-white
  const ctaStartIdx = oldRow.content.indexOf('<div class="bg-slate-900 text-white');
  if (ctaStartIdx === -1) {
    console.log(`⚠️ No old CTA found in backup for: ${slug}`);
    continue;
  }

  // Find where the old CTA div closes - need to count nested divs
  let depth = 0;
  let ctaEndIdx = -1;
  let i = ctaStartIdx;
  while (i < oldRow.content.length) {
    if (oldRow.content.startsWith('<div', i)) {
      depth++;
      i += 4;
    } else if (oldRow.content.startsWith('</div>', i)) {
      depth--;
      if (depth === 0) {
        ctaEndIdx = i + 6; // after </div>
        break;
      }
      i += 6;
    } else {
      i++;
    }
  }

  if (ctaEndIdx === -1) {
    console.log(`⚠️ Could not find CTA end for: ${slug}`);
    continue;
  }

  // Everything after the old CTA block is the FAQ + remaining content
  const afterCta = oldRow.content.slice(ctaEndIdx).trim();

  if (!afterCta) {
    console.log(`⚠️ No content after old CTA for: ${slug}`);
    continue;
  }

  // Check if FAQ is actually in there
  const hasFaq = afterCta.includes('FAQPage') || afterCta.includes('คำถามที่พบบ่อย');
  console.log(`${slug}: afterCta length=${afterCta.length}, hasFAQ=${hasFaq}`);
  console.log(`  Preview: ${afterCta.slice(0, 150)}...`);

  // Append FAQ content to the end of current live content
  const newContent = liveRow.content.trim() + '\n\n' + afterCta;
  liveDb.prepare("UPDATE Post SET content = ?, updatedAt = datetime('now') WHERE id = ?").run(newContent, liveRow.id);
  console.log(`✅ Restored FAQ for: ${slug}\n`);
}

backupDb.close();
liveDb.close();
console.log('Done.');
