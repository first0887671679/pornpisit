import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { put } from "@vercel/blob";

export const runtime = "nodejs";
export const maxDuration = 30;

const ALLOWED_TYPES = [
  "image/jpeg", "image/jpg", "image/png", "image/gif",
  "image/webp", "image/svg+xml", "image/bmp", "image/tiff",
  "image/avif", "image/heic", "image/heif",
];

export async function POST(req: Request) {
  try {
    // Auth check - only logged-in users can upload
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "ไม่ได้รับอนุญาต กรุณา login ใหม่" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "กรุณาเลือกไฟล์" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "ประเภทไฟล์ไม่รองรับ" },
        { status: 400 }
      );
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "ขนาดไฟล์ต้องไม่เกิน 10MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = file.name.split(".").pop();
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: "public",
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: uniqueFilename,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    console.error("Upload error:", error?.message || error);
    return NextResponse.json(
      { error: `อัพโหลดล้มเหลว: ${error?.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
