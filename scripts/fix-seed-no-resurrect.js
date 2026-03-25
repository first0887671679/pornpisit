/**
 * Fix all seed scripts to use "create-only" pattern.
 * If a post was deleted from admin, running seed should NOT bring it back.
 * 
 * Pattern 1 (upsert): prisma.post.upsert({ where: { slug }, update: ..., create: ... })
 *   -> Replace with: findUnique + skip if exists, create if not
 * 
 * Pattern 2 (find+update+create): if (existing) { update } else { create }
 *   -> Replace with: if (existing) { skip } (no update, no create if deleted)
 * 
 * Pattern 3 (seed-posts.ts loop with upsert): 
 *   -> Replace with findUnique + create only if not exists
 */

const fs = require('fs');
const path = require('path');

const scriptsDir = path.join(__dirname);
const files = fs.readdirSync(scriptsDir).filter(f => f.startsWith('seed-') && f.endsWith('.ts'));

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(scriptsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // === Pattern 1: seed-posts.ts style upsert in loop ===
  // Replace: await prisma.post.upsert({ where: { slug: post.slug }, update: post, create: post });
  if (file === 'seed-posts.ts') {
    content = content.replace(
      /const existing = await prisma\.post\.findUnique\(\{ where: \{ slug: post\.slug \} \}\);\s*await prisma\.post\.upsert\(\{\s*where: \{ slug: post\.slug \},\s*update: post,\s*create: post,\s*\}\);\s*console\.log\(`\s*\$\{existing \? "UPDATED" : "OK"\}: "\$\{post\.title\}"`\);/,
      `const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
      if (existing) {
        console.log(\`  SKIP (already exists): "\${post.title}"\`);
        continue;
      }
      await prisma.post.create({ data: post });
      console.log(\`  CREATED: "\${post.title}"\`);`
    );
  }

  // === Pattern 2: Individual seed files with upsert ===
  // prisma.post.upsert({ where: { slug: postData.slug }, update: postData, create: postData })
  content = content.replace(
    /const post = await prisma\.post\.upsert\(\{\s*where: \{ slug: postData\.slug \},\s*update: postData,\s*create: postData,\s*\}\);/g,
    `const existingPost = await prisma.post.findUnique({ where: { slug: postData.slug } });
    if (existingPost) {
      console.log(\`⏭️ Post already exists, skipping: \${postData.title}\`);
      return;
    }
    const post = await prisma.post.create({ data: postData });`
  );

  // === Pattern 3: Individual seed files with find + update/create ===
  // if (existing) { await prisma.post.update(... } else { await prisma.post.create(...) }
  // Replace update with skip
  content = content.replace(
    /if \(existing\) \{\s*await prisma\.post\.update\(\{\s*where: \{ slug: postData\.slug \},\s*data: postData,\s*\}\);\s*console\.log\(`✅ Successfully updated post: \$\{postData\.title\}`\);/g,
    `if (existing) {
      console.log(\`⏭️ Post already exists, skipping: \${postData.title}\`);`
  );

  // Also handle: if (existingPost) { const updatedPost = await prisma.post.update(... } else { ... }
  content = content.replace(
    /if \(existingPost\) \{\s*const updatedPost = await prisma\.post\.update\(\{\s*where: \{ slug: postData\.slug \},\s*data: postData,\s*\}\);\s*console\.log\(`✅ Successfully updated post: \$\{updatedPost\.title\}`\);/g,
    `if (existingPost) {
      console.log(\`⏭️ Post already exists, skipping: \${postData.title}\`);`
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('UPDATED: ' + file);
    updatedCount++;
  } else {
    console.log('NO CHANGE: ' + file);
  }
}

console.log('\nTotal updated: ' + updatedCount);
