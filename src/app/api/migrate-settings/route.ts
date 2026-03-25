import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/migrate-settings — สร้าง SiteSettings record ถ้ายังไม่มี
export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-sync-secret") || req.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.SYNC_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // ลองสร้างตาราง SiteSettings ผ่าน raw SQL (PostgreSQL)
    await (prisma as any).$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SiteSettings" (
        "id" TEXT NOT NULL DEFAULT 'singleton',
        "allowGoogleIndex" BOOLEAN NOT NULL DEFAULT true,
        "allowAiCrawl" BOOLEAN NOT NULL DEFAULT true,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
      )
    `);

    // สร้าง default record
    const now = new Date().toISOString();
    await (prisma as any).$executeRawUnsafe(`
      INSERT INTO "SiteSettings" ("id", "allowGoogleIndex", "allowAiCrawl", "updatedAt")
      VALUES ('singleton', true, true, '${now}')
      ON CONFLICT ("id") DO NOTHING
    `);

    const settings = await (prisma as any).$queryRawUnsafe(`SELECT * FROM "SiteSettings" WHERE "id" = 'singleton'`);

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
