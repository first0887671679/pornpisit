/**
 * One-time migration script to update internal links in live DB
 * Run: npx tsx prisma/update-links.ts
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const homePage = await (prisma as any).page.findUnique({
    where: { slug: 'home' },
    include: { sections: true },
  })

  if (!homePage) {
    console.log('Home page not found')
    return
  }

  const sections = homePage.sections as any[]

  // ── 1. Update header links ──
  const headerSec = sections.find((s: any) => s.type === 'header')
  if (headerSec) {
    const data = JSON.parse(headerSec.content || '{}')
    data.links = [
      { label: 'หน้าแรก', href: '/' },
      { label: 'ปะยางนอกสถานที่', href: '/mobile-tire-repair' },
      { label: 'เปลี่ยนแบตเตอรี่', href: '/battery-replacement' },
      { label: 'ไดชาร์จ ไดสตาร์ท', href: '/alternator-starter' },
      { label: 'ขัดสีรถ ขัดไฟหน้า', href: '/car-polishing' },
      { label: 'เช็คราคาแบต', href: '/check-price' },
    ]
    await (prisma as any).pageSection.update({
      where: { id: headerSec.id },
      data: { content: JSON.stringify(data) },
    })
    console.log('✅ Header links updated')
  }

  // ── 2. Update services items ──
  const servicesSec = sections.find((s: any) => s.type === 'services')
  if (servicesSec) {
    const data = JSON.parse(servicesSec.content || '{}')
    data.items = [
      {
        title: 'ปะยางนอกสถานที่ 24 ชม.',
        description: 'ยางแตก ยางรั่ว ช่างปะยางถึงที่ภายใน 30 นาที โซนห้วยขวาง ดินแดง ลาดพร้าว บางกะปิ บางเขน จตุจักร ดุสิต บางซื่อ',
        icon: 'PenTool',
        href: '/mobile-tire-repair',
      },
      {
        title: 'เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่',
        description: 'รถสตาร์ทไม่ติด? ช่างพร้อมนำแบตแท้ไปเปลี่ยนถึงที่ รับประกัน 1 ปี',
        icon: 'Battery',
        href: '/battery-replacement',
      },
      {
        title: 'ซ่อม/เปลี่ยน ไดชาร์จ ไดสตาร์ท',
        description: 'วิเคราะห์อาการแม่นยำด้วย OBD ซ่อมเสร็จหน้างาน ไม่ต้องลากรถ',
        icon: 'Wrench',
        href: '/alternator-starter',
      },
      {
        title: 'ขัดสีรถ ลบรอย ขัดไฟหน้า',
        description: 'บริการขัดสีรถลบรอย ขัดไฟหน้าเหลืองให้ใสปิ๊ง นอกสถานที่ถึงบ้าน',
        icon: 'Sparkles',
        href: '/car-polishing',
      },
    ]
    await (prisma as any).pageSection.update({
      where: { id: servicesSec.id },
      data: { content: JSON.stringify(data) },
    })
    console.log('✅ Services items updated')
  }

  // ── 3. Update footer serviceLinks ──
  const footerSec = sections.find((s: any) => s.type === 'footer')
  if (footerSec) {
    const data = JSON.parse(footerSec.content || '{}')
    data.serviceLinks = [
      { label: 'ปะยางนอกสถานที่ 24 ชม.', href: '/mobile-tire-repair' },
      { label: 'เปลี่ยนแบตเตอรี่รถยนต์', href: '/battery-replacement' },
      { label: 'ซ่อม/เปลี่ยน ไดชาร์จ ไดสตาร์ท', href: '/alternator-starter' },
      { label: 'ขัดสีรถ ลบรอย ขัดไฟหน้า', href: '/car-polishing' },
      { label: 'เช็คราคาแบตเตอรี่', href: '/check-price' },
    ]
    await (prisma as any).pageSection.update({
      where: { id: footerSec.id },
      data: { content: JSON.stringify(data) },
    })
    console.log('✅ Footer serviceLinks updated')
  }

  console.log('\n🎉 All internal links updated successfully!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
