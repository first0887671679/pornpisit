import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const content = await prisma.homeContent.findFirst();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const existing = await prisma.homeContent.findFirst();
    let content;
    if (existing) {
      content = await prisma.homeContent.update({
        where: { id: existing.id },
        data: {
          heroTitle: body.heroTitle,
          heroSub: body.heroSub,
          aboutText: body.aboutText,
        },
      });
    } else {
      content = await prisma.homeContent.create({
        data: {
          heroTitle: body.heroTitle,
          heroSub: body.heroSub,
          aboutText: body.aboutText,
        },
      });
    }
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
