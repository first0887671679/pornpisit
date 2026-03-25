import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const SINGLETON_ID = "singleton";

// Helper: get or create default settings
async function getSettings() {
  let settings = await (prisma as any).siteSettings.findUnique({
    where: { id: SINGLETON_ID },
  });
  if (!settings) {
    settings = await (prisma as any).siteSettings.create({
      data: { id: SINGLETON_ID, allowGoogleIndex: true, allowAiCrawl: true },
    });
  }
  return settings;
}

// GET: อ่านค่าปัจจุบัน (public — robots.ts ต้องเรียกได้)
export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// PUT: อัปเดตค่า (ต้อง login)
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const settings = await (prisma as any).siteSettings.upsert({
      where: { id: SINGLETON_ID },
      update: {
        allowGoogleIndex: typeof body.allowGoogleIndex === "boolean" ? body.allowGoogleIndex : undefined,
        allowAiCrawl: typeof body.allowAiCrawl === "boolean" ? body.allowAiCrawl : undefined,
      },
      create: {
        id: SINGLETON_ID,
        allowGoogleIndex: body.allowGoogleIndex ?? true,
        allowAiCrawl: body.allowAiCrawl ?? true,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
