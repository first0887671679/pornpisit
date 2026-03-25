const fs = require('fs');
const path = require('path');

const scriptsDir = __dirname;
const seedFiles = fs.readdirSync(scriptsDir).filter(function(f) {
  return f.startsWith('seed-') && f.endsWith('.ts');
});

let updatedCount = 0;

for (const file of seedFiles) {
  const filePath = path.join(scriptsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Pattern 1: findUnique + if(existing) update else create
  // Replace the update branch with a skip
  content = content.replace(
    /if \(existing\) \{\s*await prisma\.post\.update\(\{\s*where: \{ slug: postData\.slug \},\s*data: postData,\s*\}\);\s*console\.log\(`[^\n]*updated[^\n]*`\);/gi,
    'if (existing) {\n      console.log(`⏭️ Post already exists, skipping: ${postData.title}`);'
  );

  // Pattern 2: for upsert-based seeds
  content = content.replace(
    /await prisma\.post\.upsert\(\{\s*where: \{ slug: post\.slug \},\s*update: post,\s*create: post,\s*\}\);/g,
    'const ex = await prisma.post.findUnique({ where: { slug: post.slug } });\n      if (ex) { console.log(`⏭️ Skipping existing: ${post.title}`); continue; }\n      await prisma.post.create({ data: post });'
  );

  // Pattern 3: for upsert using postData
  content = content.replace(
    /await prisma\.post\.upsert\(\{\s*where: \{ slug: postData\.slug \},\s*update: postData,\s*create: postData,\s*\}\);/g,
    'const ex = await prisma.post.findUnique({ where: { slug: postData.slug } });\n    if (ex) { console.log(`⏭️ Skipping existing: ${postData.title}`); return; }\n    await prisma.post.create({ data: postData });'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log('[UPDATED] ' + file);
  } else {
    console.log('[NO CHANGE] ' + file);
  }
}

console.log('\nUpdated ' + updatedCount + ' of ' + seedFiles.length + ' seed files');
