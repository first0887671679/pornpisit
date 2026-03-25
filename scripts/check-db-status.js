const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== DATABASE STATUS ===\n');

  const checks = [
    ['AdminUser', prisma.adminUser],
    ['Service', prisma.service],
    ['HomeContent', prisma.homeContent],
    ['ContactInfo', prisma.contactInfo],
    ['WhyUsItem', prisma.whyUsItem],
    ['Testimonial', prisma.testimonial],
    ['FaqItem', prisma.faqItem],
    ['ShowcaseImage', prisma.showcaseImage],
    ['SeoMeta', prisma.seoMeta],
    ['Page', prisma.page],
    ['PageSection', prisma.pageSection],
    ['Post', prisma.post],
  ];

  for (const [name, model] of checks) {
    try {
      const count = await model.count();
      console.log(name + ': ' + count + ' records');
    } catch (e) {
      console.log(name + ': ERROR - ' + e.message);
    }
  }

  // Details
  console.log('\n--- AdminUser ---');
  try { const r = await prisma.adminUser.findMany({ select: { id: true, email: true, name: true } }); console.log(JSON.stringify(r)); } catch(e) { console.log(e.message); }

  console.log('\n--- HomeContent ---');
  try { const r = await prisma.homeContent.findMany(); console.log(JSON.stringify(r)); } catch(e) { console.log(e.message); }

  console.log('\n--- ContactInfo ---');
  try { const r = await prisma.contactInfo.findMany(); console.log(JSON.stringify(r)); } catch(e) { console.log(e.message); }

  console.log('\n--- SeoMeta ---');
  try { const r = await prisma.seoMeta.findMany(); console.log(JSON.stringify(r)); } catch(e) { console.log(e.message); }

  console.log('\n--- Service ---');
  try { const r = await prisma.service.findMany({ select: { id: true, slug: true, title: true } }); console.log(JSON.stringify(r)); } catch(e) { console.log(e.message); }

  console.log('\n--- ShowcaseImage ---');
  try { const r = await prisma.showcaseImage.findMany({ select: { id: true, src: true, alt: true } }); console.log(JSON.stringify(r)); } catch(e) { console.log(e.message); }

  console.log('\n--- WhyUsItem ---');
  try { const r = await prisma.whyUsItem.findMany({ select: { id: true, title: true } }); console.log(JSON.stringify(r)); } catch(e) { console.log(e.message); }

  console.log('\n--- Testimonial ---');
  try { const r = await prisma.testimonial.findMany({ select: { id: true, name: true } }); console.log(JSON.stringify(r)); } catch(e) { console.log(e.message); }

  console.log('\n--- FaqItem ---');
  try { const r = await prisma.faqItem.findMany({ select: { id: true, question: true } }); console.log(JSON.stringify(r)); } catch(e) { console.log(e.message); }

  console.log('\n--- Page ---');
  try { const r = await prisma.page.findMany({ select: { id: true, slug: true, title: true } }); console.log(JSON.stringify(r)); } catch(e) { console.log(e.message); }

  await prisma.$disconnect();
}

main().catch(console.error);
