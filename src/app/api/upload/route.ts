import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

// Client upload: browser uploads directly to Vercel Blob (no 4.5MB limit)
export const runtime = "nodejs";
export const maxDuration = 30;

const ALLOWED_TYPES = [
  "image/jpeg", "image/jpg", "image/png", "image/gif",
  "image/webp", "image/svg+xml", "image/bmp", "image/tiff",
  "image/avif", "image/heic", "image/heif",
];

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        // Auth check — only logged-in users can upload
        const session = await getServerSession(authOptions);
        if (!session) {
          throw new Error("ไม่ได้รับอนุญาต กรุณา login ใหม่");
        }

        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: 10 * 1024 * 1024, // 10MB
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            user: session.user?.email || "unknown",
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("Upload completed:", blob.url, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error("Upload error:", error?.message || error);
    return NextResponse.json(
      { error: `อัพโหลดล้มเหลว: ${error?.message || "Unknown error"}` },
      { status: 400 }
    );
  }
}
