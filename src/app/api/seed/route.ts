import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Hash password with salt rounds 10 (same as seed.ts)
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Create admin user
    const admin = await prisma.adminUser.upsert({
      where: { email: 'admin@firstcar.com' },
      update: { 
        password: hashedPassword,
        name: 'Admin User'
      },
      create: {
        email: 'admin@firstcar.com',
        name: 'Admin User',
        password: hashedPassword,
      },
    });

    console.log('Admin user seeded:', admin.email);

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      admin: {
        email: admin.email,
        name: admin.name
      }
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: `Seed failed: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
