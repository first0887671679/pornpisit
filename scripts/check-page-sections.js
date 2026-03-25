const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const pages = await prisma.page.findMany({
    include: { sections: { orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' },
  });

  for (const page of pages) {
    console.log('\n=== PAGE: ' + page.slug + ' (' + page.title + ') ===');
    console.log('  SEO Title: ' + (page.seoTitle || 'NONE'));
    console.log('  Sections: ' + page.sections.length);
    for (const s of page.sections) {
      const content = JSON.parse(s.content || '{}');
      const preview = JSON.stringify(content).substring(0, 120);
      console.log('    [' + s.order + '] ' + s.type + ' | ' + (s.title || '') + ' | ' + preview + '...');
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
