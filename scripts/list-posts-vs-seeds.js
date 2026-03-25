const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const p = new PrismaClient();

async function main() {
  // 1. List all posts in DB
  const posts = await p.post.findMany({
    select: { slug: true, title: true, published: true },
    orderBy: { createdAt: 'asc' }
  });

  console.log('=== ALL POSTS IN DB (' + posts.length + ') ===\n');
  posts.forEach(function(x, i) {
    console.log((i + 1) + '. [' + (x.published ? 'PUB' : 'DRAFT') + '] ' + x.slug);
  });

  // 2. List all seed files
  const scriptsDir = path.join(__dirname);
  const seedFiles = fs.readdirSync(scriptsDir).filter(function(f) {
    return f.startsWith('seed-') && f.endsWith('.ts');
  });

  console.log('\n=== SEED FILES (' + seedFiles.length + ') ===\n');
  seedFiles.forEach(function(f) { console.log('  ' + f); });

  // 3. Find posts that have NO corresponding seed file
  const seedSlugs = [];
  for (const f of seedFiles) {
    const content = fs.readFileSync(path.join(scriptsDir, f), 'utf8');
    const matches = content.match(/slug:\s*['"]([^'"]+)['"]/g);
    if (matches) {
      matches.forEach(function(m) {
        const slug = m.match(/['"]([^'"]+)['"]/)[1];
        seedSlugs.push(slug);
      });
    }
  }

  console.log('\n=== POSTS IN DB WITHOUT SEED FILE ===\n');
  posts.forEach(function(x) {
    if (!seedSlugs.includes(x.slug)) {
      console.log('  NO SEED: ' + x.slug + ' (' + x.title + ')');
    }
  });

  console.log('\n=== SLUGS IN SEED FILES NOT IN DB ===\n');
  seedSlugs.forEach(function(s) {
    if (!posts.find(function(x) { return x.slug === s; })) {
      console.log('  NOT IN DB: ' + s);
    }
  });

  await p.$disconnect();
}

main().catch(console.error);
