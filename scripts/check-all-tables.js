const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Check all tables for data
  const tables = [
    { name: 'Post', query: () => prisma.post.count() },
    { name: 'SeoSetting', query: () => prisma.seoSetting.count().catch(() => 'TABLE NOT FOUND') },
    { name: 'Service', query: () => prisma.service.count().catch(() => 'TABLE NOT FOUND') },
    { name: 'Showcase', query: () => prisma.showcase.count().catch(() => 'TABLE NOT FOUND') },
    { name: 'Testimonial', query: () => prisma.testimonial.count().catch(() => 'TABLE NOT FOUND') },
    { name: 'Faq', query: () => prisma.faq.count().catch(() => 'TABLE NOT FOUND') },
    { name: 'WhyUs', query: () => prisma.whyUs.count().catch(() => 'TABLE NOT FOUND') },
    { name: 'HomeContent', query: () => prisma.homeContent.count().catch(() => 'TABLE NOT FOUND') },
    { name: 'Page', query: () => prisma.page.count().catch(() => 'TABLE NOT FOUND') },
    { name: 'User', query: () => prisma.user.count().catch(() => 'TABLE NOT FOUND') },
  ];

  console.log('=== DATABASE TABLE STATUS ===\n');
  for (const t of tables) {
    try {
      const count = await t.query();
      console.log(t.name + ': ' + count + ' records');
    } catch (e) {
      console.log(t.name + ': ERROR - ' + e.message);
    }
  }

  // Check SeoSetting details
  console.log('\n=== SEO SETTINGS ===');
  try {
    const seo = await prisma.seoSetting.findMany();
    seo.forEach(s => console.log(JSON.stringify({ id: s.id, siteName: s.siteName, logoUrl: s.logoUrl }, null, 2)));
  } catch(e) { console.log('Error: ' + e.message); }

  // Check HomeContent
  console.log('\n=== HOME CONTENT ===');
  try {
    const hc = await prisma.homeContent.findMany();
    hc.forEach(h => console.log(JSON.stringify({ id: h.id, heroTitle: h.heroTitle }, null, 2)));
  } catch(e) { console.log('Error: ' + e.message); }

  // Check Services
  console.log('\n=== SERVICES ===');
  try {
    const svcs = await prisma.service.findMany({ select: { id: true, title: true } });
    svcs.forEach(s => console.log('  - ' + s.title));
  } catch(e) { console.log('Error: ' + e.message); }

  // Check Showcase
  console.log('\n=== SHOWCASE ===');
  try {
    const sc = await prisma.showcase.findMany({ select: { id: true, title: true } });
    sc.forEach(s => console.log('  - ' + s.title));
  } catch(e) { console.log('Error: ' + e.message); }

  await prisma.$disconnect();
}

main().catch(console.error);
