import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FIRSTCARCENTER - บริการดูแลรักษารถยนต์นอกสถานที่ 24 ชั่วโมง";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorations */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #3b82f6, #eab308, #3b82f6)",
            display: "flex",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
              display: "flex",
            }}
          >
            FIRSTCARCENTER
          </div>

          {/* Divider */}
          <div
            style={{
              width: "120px",
              height: "4px",
              background: "linear-gradient(90deg, #3b82f6, #eab308)",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: 600,
              color: "#e2e8f0",
              display: "flex",
            }}
          >
            บริการดูแลรักษารถยนต์นอกสถานที่
          </div>

          {/* Sub tagline */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: "#94a3b8",
              display: "flex",
            }}
          >
            24 ชั่วโมง | ถึงไวใน 30 นาที
          </div>

          {/* Services */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "24px",
            }}
          >
            {["ปะยาง", "เปลี่ยนแบตเตอรี่", "ไดชาร์จ", "ขัดสีรถ"].map(
              (service) => (
                <div
                  key={service}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "999px",
                    border: "1px solid rgba(148,163,184,0.3)",
                    color: "#cbd5e1",
                    fontSize: "18px",
                    display: "flex",
                  }}
                >
                  {service}
                </div>
              )
            )}
          </div>
        </div>

        {/* Phone */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              color: "#eab308",
              fontWeight: 700,
              display: "flex",
            }}
          >
            📞 088-767-1679
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#64748b",
              display: "flex",
            }}
          >
            |
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              display: "flex",
            }}
          >
            firstcarcenterthailand.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
