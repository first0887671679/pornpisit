const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  // 1. Get all posts from DB
  const dbPosts = await prisma.post.findMany({
    select: { id: true, slug: true, title: true, published: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

  // 2. Extract all slugs from seed scripts
  const scriptsDir = path.join(__dirname);
  const seedFiles = fs.readdirSync(scriptsDir).filter(f => f.startsWith('seed-') && f.endsWith('.ts'));
  
  const seedSlugs = {};
  for (const file of seedFiles) {
    const content = fs.readFileSync(path.join(scriptsDir, file), 'utf8');
    // Match slug values
    const slugMatches = content.match(/slug:\s*["']([^"']+)["']/g);
    if (slugMatches) {
      for (const m of slugMatches) {
        const slug = m.match(/slug:\s*["']([^"']+)["']/)[1];
        if (!seedSlugs[slug]) seedSlugs[slug] = [];
        seedSlugs[slug].push(file);
      }
    }
  }

  console.log('=== SEED SLUGS vs DB ===\n');
  
  // 3. Check: slugs in seed but NOT in DB (deleted posts)
  const dbSlugSet = new Set(dbPosts.map(p => p.slug));
  const seedSlugSet = new Set(Object.keys(seedSlugs));
  
  const deletedButInSeed = [];
  for (const slug of Object.keys(seedSlugs)) {
    if (!dbSlugSet.has(slug)) {
      deletedButInSeed.push({ slug, files: seedSlugs[slug] });
    }
  }
  
  if (deletedButInSeed.length > 0) {
    console.log('DELETED from DB but still in seed scripts (will be re-created on next seed):');
    deletedButInSeed.forEach(item => {
      console.log('  DELETED: ' + item.slug + ' -> ' + item.files.join(', '));
    });
  } else {
    console.log('No deleted posts found that are still in seed scripts.');
  }

  // 4. Check: duplicate/similar slugs
  console.log('\n=== SIMILAR SLUG GROUPS ===\n');
  const slugWords = {};
  for (const slug of [...dbSlugSet, ...seedSlugSet]) {
    const base = slug.replace(/-guide$/, '').replace(/-2026$/, '').replace(/-seo$/, '');
    if (!slugWords[base]) slugWords[base] = [];
    slugWords[base].push(slug);
  }
  
  for (const [base, slugs] of Object.entries(slugWords)) {
    const uniqueSlugs = [...new Set(slugs)];
    if (uniqueSlugs.length > 1) {
      console.log('GROUP: ' + uniqueSlugs.join(' | '));
    }
  }

  // 5. Check: slugs that appear in multiple seed files
  console.log('\n=== SLUGS IN MULTIPLE SEED FILES ===\n');
  for (const [slug, files] of Object.entries(seedSlugs)) {
    const uniqueFiles = [...new Set(files)];
    if (uniqueFiles.length > 1) {
      console.log('MULTI: ' + slug + ' -> ' + uniqueFiles.join(', '));
    }
  }

  // 6. List all DB posts
  console.log('\n=== ALL ' + dbPosts.length + ' POSTS IN DB ===\n');
  dbPosts.forEach((p, i) => {
    const status = p.published ? 'PUB' : 'DRF';
    const date = new Date(p.createdAt).toISOString().split('T')[0];
    const inSeed = seedSlugs[p.slug] ? seedSlugs[p.slug].join(', ') : 'NO SEED FILE';
    console.log((i+1) + '. [' + status + '] ' + date + ' | ' + p.slug + ' | seed: ' + inSeed);
  });

  await prisma.$disconnect();
}

main().catch(console.error);
