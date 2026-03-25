import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const contact = await prisma.contactInfo.findFirst();
    return NextResponse.json(contact);
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
    const existing = await prisma.contactInfo.findFirst();
    let contact;
    if (existing) {
      contact = await prisma.contactInfo.update({
        where: { id: existing.id },
        data: {
          phone: body.phone,
          lineId: body.lineId,
          lineUrl: body.lineUrl,
          address: body.address,
        },
      });
    } else {
      contact = await prisma.contactInfo.create({
        data: {
          phone: body.phone,
          lineId: body.lineId,
          lineUrl: body.lineUrl,
          address: body.address,
        },
      });
    }
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
