/**
 * Revert all seed scripts back to upsert pattern.
 * This undoes the create-only change and restores the ability to update existing posts.
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

  // === Fix seed-posts.ts: create-only back to upsert ===
  if (file === 'seed-posts.ts') {
    content = content.replace(
      /const existing = await prisma\.post\.findUnique\(\{ where: \{ slug: post\.slug \} \}\);\s*if \(existing\) \{\s*console\.log\(`\s*SKIP \(already exists\): "\$\{post\.title\}"`\);\s*continue;\s*\}\s*await prisma\.post\.create\(\{ data: post \}\);\s*console\.log\(`\s*CREATED: "\$\{post\.title\}"`\);/,
      `await prisma.post.upsert({
        where: { slug: post.slug },
        update: post,
        create: post,
      });
      console.log(\`  OK: "\${post.title}"\`);`
    );
  }

  // === Fix individual seed files: Pattern A - findUnique + skip -> upsert ===
  content = content.replace(
    /const existingPost = await prisma\.post\.findUnique\(\{ where: \{ slug: postData\.slug \} \}\);\s*if \(existingPost\) \{\s*console\.log\(`⏭️ Post already exists, skipping: \$\{postData\.title\}`\);\s*return;\s*\}\s*const post = await prisma\.post\.create\(\{ data: postData \}\);/g,
    `const post = await prisma.post.upsert({
      where: { slug: postData.slug },
      update: postData,
      create: postData,
    });`
  );

  // === Fix individual seed files: Pattern B - if(existing) skip else create -> if(existing) update else create ===
  content = content.replace(
    /if \(existing\) \{\s*console\.log\(`⏭️ Post already exists, skipping: \$\{postData\.title\}`\);/g,
    `if (existing) {
      await prisma.post.update({
        where: { slug: postData.slug },
        data: postData,
      });
      console.log(\`✅ Successfully updated post: \${postData.title}\`);`
  );

  // === Fix: if(existingPost) skip -> if(existingPost) update ===
  content = content.replace(
    /if \(existingPost\) \{\s*console\.log\(`⏭️ Post already exists, skipping: \$\{postData\.title\}`\);/g,
    `if (existingPost) {
      const updatedPost = await prisma.post.update({
        where: { slug: postData.slug },
        data: postData,
      });
      console.log(\`✅ Successfully updated post: \${updatedPost.title}\`);`
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('REVERTED: ' + file);
    updatedCount++;
  } else {
    console.log('NO CHANGE: ' + file);
  }
}

console.log('\nTotal reverted: ' + updatedCount);
