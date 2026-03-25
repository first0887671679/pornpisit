const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const headers = await p.pageSection.findMany({
    where: { type: 'header' },
    select: { id: true, type: true, content: true, imageUrl: true }
  });
  
  for (const s of headers) {
    const c = JSON.parse(s.content);
    console.log('imageUrl:', s.imageUrl || 'NULL');
    console.log('brandName:', c.brandName);
    console.log('logoUrl in content:', c.logoUrl || 'NONE');
    console.log('logoRatio:', c.logoRatio || 'NONE');
  }

  // Check hero slides for image URLs
  const heroes = await p.pageSection.findMany({
    where: { type: 'hero' },
    select: { id: true, content: true, imageUrl: true, title: true }
  });

  console.log('\n=== HERO SECTIONS ===');
  for (const h of heroes) {
    const c = JSON.parse(h.content);
    console.log('Title:', h.title);
    console.log('imageUrl field:', h.imageUrl || 'NULL');
    if (c.slides) {
      c.slides.forEach(function(s, i) {
        console.log('  slide ' + i + ' imageUrl:', s.imageUrl || 'NONE');
      });
    }
  }

  await p.$disconnect();
}

main().catch(console.error);
