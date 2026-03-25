"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, ArrowLeft, Smartphone, Monitor, Tablet } from "lucide-react";
import Link from "next/link";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function ResponsiveSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // IDs
  const [homeId, setHomeId] = useState("");
  const [headerSecId, setHeaderSecId] = useState("");
  const [heroSecId, setHeroSecId] = useState("");
  const [footerSecId, setFooterSecId] = useState("");

  // Header / Navbar
  const [headerData, setHeaderData] = useState<any>({});
  const [headerImageUrl, setHeaderImageUrl] = useState("");
  const [logoSize, setLogoSize] = useState(40);
  const [logoSizeMobile, setLogoSizeMobile] = useState(28);
  const [navbarHeight, setNavbarHeight] = useState(56);
  const [navbarHeightMobile, setNavbarHeightMobile] = useState(48);
  const [navBgColor, setNavBgColor] = useState("#0f172a");
  const [navTextColor, setNavTextColor] = useState("#cbd5e1");
  const [navAccentColor, setNavAccentColor] = useState("#f97316");

  // Hero Banner
  const [heroData, setHeroData] = useState<any>({});
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [heroHeightMobile, setHeroHeightMobile] = useState(340);
  const [heroHeightSm, setHeroHeightSm] = useState(400);
  const [heroMinHeightMd, setHeroMinHeightMd] = useState(400);
  const [heroImageRatio, setHeroImageRatio] = useState("16/9");
  const [heroOverlayOpacity, setHeroOverlayOpacity] = useState(50);

  // Footer
  const [footerData, setFooterData] = useState<any>({});
  const [footerBgColor, setFooterBgColor] = useState("#020617");
  const [footerTextColor, setFooterTextColor] = useState("#94a3b8");
  const [footerAccentColor, setFooterAccentColor] = useState("#f97316");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/pages");
      const pages = await res.json();
      const home = pages.find((p: any) => p.slug === "home");
      if (!home) return;
      setHomeId(home.id);

      // Header
      const hSec = home.sections.find((s: any) => s.type === "header");
      if (hSec) {
        setHeaderSecId(hSec.id);
        setHeaderImageUrl(hSec.imageUrl || "");
        const d = JSON.parse(hSec.content || "{}");
        setHeaderData(d);
        setLogoSize(d.logoSize || 40);
        setLogoSizeMobile(d.logoSizeMobile || 28);
        setNavbarHeight(d.navbarHeight || 56);
        setNavbarHeightMobile(d.navbarHeightMobile || 48);
        setNavBgColor(d.navBgColor || "#0f172a");
        setNavTextColor(d.navTextColor || "#cbd5e1");
        setNavAccentColor(d.navAccentColor || "#f97316");
      }

      // Hero (first hero slide)
      const heroSec = home.sections.find((s: any) => s.type === "hero");
      if (heroSec) {
        setHeroSecId(heroSec.id);
        setHeroImageUrl(heroSec.imageUrl || "");
        const d = JSON.parse(heroSec.content || "{}");
        setHeroData(d);
        setHeroHeightMobile(d.heroHeightMobile || 340);
        setHeroHeightSm(d.heroHeightSm || 400);
        setHeroMinHeightMd(d.heroMinHeightMd || 400);
        setHeroImageRatio(d.imageRatio || heroSec.imageRatio || "16/9");
        setHeroOverlayOpacity(d.overlayOpacity ?? 50);
      }

      // Footer
      const fSec = home.sections.find((s: any) => s.type === "footer");
      if (fSec) {
        setFooterSecId(fSec.id);
        const d = JSON.parse(fSec.content || "{}");
        setFooterData(d);
        setFooterBgColor(d.footerBgColor || "#020617");
        setFooterTextColor(d.footerTextColor || "#94a3b8");
        setFooterAccentColor(d.footerAccentColor || "#f97316");
      }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const showMsg = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const handleSave = async () => {
    if (!homeId) return;
    setSaving(true);
    try {
      // Save header responsive settings (merge with existing data)
      if (headerSecId) {
        const merged = {
          ...headerData,
          logoSize, logoSizeMobile, navbarHeight, navbarHeightMobile,
          navBgColor, navTextColor, navAccentColor,
        };
        await fetch(`/api/pages/${homeId}/sections/${headerSecId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "header", title: "เมนูบนสุด",
            content: JSON.stringify(merged),
            imageUrl: headerImageUrl, isActive: true,
          }),
        });
      }

      // Save hero responsive settings
      if (heroSecId) {
        const merged = {
          ...heroData,
          heroHeightMobile, heroHeightSm, heroMinHeightMd,
          imageRatio: heroImageRatio, overlayOpacity: heroOverlayOpacity,
        };
        await fetch(`/api/pages/${homeId}/sections/${heroSecId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "hero", title: heroData.heading || "Hero Banner",
            content: JSON.stringify(merged),
            imageUrl: heroImageUrl, imageRatio: heroImageRatio,
            isActive: true,
          }),
        });
      }

      // Save footer colors
      if (footerSecId) {
        const merged = { ...footerData, footerBgColor, footerTextColor, footerAccentColor };
        await fetch(`/api/pages/${homeId}/sections/${footerSecId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "footer", title: "ท้ายเว็บ (Footer)",
            content: JSON.stringify(merged),
            isActive: true,
          }),
        });
      }

      showMsg("✅ บันทึกตั้งค่า Responsive สำเร็จ!");
    } catch (e) { console.error(e); showMsg("❌ เกิดข้อผิดพลาด"); } finally { setSaving(false); }
  };

  // Preset button component
  const Preset = ({ values, current, onChange, color = "orange" }: {
    values: number[]; current: number; onChange: (v: number) => void; color?: string;
  }) => (
    <div className="flex flex-wrap gap-1 mt-1">
      {values.map(v => (
        <button key={v} onClick={() => onChange(v)} className={`text-[10px] px-2 py-1 rounded border transition-all ${
          current === v
            ? color === "blue" ? "bg-blue-500 text-white border-blue-500" : "bg-orange-500 text-white border-orange-500"
            : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
        }`}>{v}px</button>
      ))}
    </div>
  );

  if (loading) return <div className="text-center py-12 text-slate-500">กำลังโหลด...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="text-slate-400 hover:text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-blue-500" />
            ตั้งค่า Responsive
          </h1>
          <p className="text-sm text-slate-500">ปรับขนาด UI ของทุกส่วนสำหรับมือถือ แท็บเล็ต และ Desktop</p>
        </div>
      </div>

      {msg && <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm font-medium">{msg}</div>}

      {/* ===== SECTION 1: Navbar ===== */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">🧭 Navbar — ขนาดและสี</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Size comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 pr-4 text-slate-500 font-medium">รายการ</th>
                  <th className="text-center py-2 px-2"><span className="inline-flex items-center gap-1"><Smartphone className="w-3 h-3" /> มือถือ</span></th>
                  <th className="text-center py-2 px-2"><span className="inline-flex items-center gap-1"><Monitor className="w-3 h-3" /> Desktop</span></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-medium text-slate-700">ขนาดโลโก้</td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Input type="number" min={16} max={80} value={logoSizeMobile} onChange={e => setLogoSizeMobile(Number(e.target.value) || 28)} className="w-16 h-7 text-xs text-center" />
                      <Preset values={[20, 24, 28, 32, 36, 40]} current={logoSizeMobile} onChange={setLogoSizeMobile} color="blue" />
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Input type="number" min={20} max={200} value={logoSize} onChange={e => setLogoSize(Number(e.target.value) || 40)} className="w-16 h-7 text-xs text-center" />
                      <Preset values={[32, 40, 48, 56, 64, 80]} current={logoSize} onChange={setLogoSize} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-700">ความสูง Navbar</td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Input type="number" min={36} max={80} value={navbarHeightMobile} onChange={e => setNavbarHeightMobile(Number(e.target.value) || 48)} className="w-16 h-7 text-xs text-center" />
                      <Preset values={[36, 40, 44, 48, 52, 56]} current={navbarHeightMobile} onChange={setNavbarHeightMobile} color="blue" />
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Input type="number" min={40} max={120} value={navbarHeight} onChange={e => setNavbarHeight(Number(e.target.value) || 56)} className="w-16 h-7 text-xs text-center" />
                      <Preset values={[48, 56, 64, 72, 80]} current={navbarHeight} onChange={setNavbarHeight} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual comparison */}
          <div className="flex items-center justify-center gap-4 py-3">
            <div className="text-center">
              <p className="text-[10px] text-blue-500 mb-1">📱 มือถือ</p>
              <div className="rounded-lg overflow-hidden border border-blue-200" style={{ width: 120 }}>
                <div className="h-0.5" style={{ background: navAccentColor }} />
                <div className="flex items-center justify-between px-2" style={{ backgroundColor: navBgColor, height: navbarHeightMobile * 0.6 }}>
                  <div className="rounded bg-white/20" style={{ width: logoSizeMobile * 0.8, height: logoSizeMobile * 0.5 }} />
                  <div className="w-3 h-3 rounded bg-white/20" />
                </div>
              </div>
            </div>
            <span className="text-slate-300 text-lg">→</span>
            <div className="text-center">
              <p className="text-[10px] text-orange-500 mb-1">🖥️ Desktop</p>
              <div className="rounded-lg overflow-hidden border border-orange-200" style={{ width: 200 }}>
                <div className="h-0.5" style={{ background: navAccentColor }} />
                <div className="flex items-center justify-between px-3" style={{ backgroundColor: navBgColor, height: navbarHeight * 0.6 }}>
                  <div className="rounded bg-white/20" style={{ width: logoSize * 0.8, height: logoSize * 0.5 }} />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1.5 rounded bg-white/15" />
                    <div className="w-6 h-1.5 rounded bg-white/15" />
                    <div className="w-8 h-4 rounded text-white text-[6px] flex items-center justify-center" style={{ backgroundColor: navAccentColor }}>CTA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navbar colors */}
          <div className="border-t pt-3">
            <p className="text-xs font-semibold text-slate-600 mb-2">🎨 สี Navbar</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "พื้นหลัง", value: navBgColor, set: setNavBgColor },
                { label: "ตัวอักษร", value: navTextColor, set: setNavTextColor },
                { label: "สีเน้น (CTA)", value: navAccentColor, set: setNavAccentColor },
              ].map((c, i) => (
                <div key={i}>
                  <Label className="text-xs">{c.label}</Label>
                  <div className="flex items-center gap-1.5 mt-1">
                    <input type="color" value={c.value} onChange={e => c.set(e.target.value)} className="w-7 h-7 rounded border border-slate-200 cursor-pointer p-0.5" />
                    <Input value={c.value} onChange={e => c.set(e.target.value)} className="flex-1 font-mono text-[10px] h-7" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== SECTION 2: Hero Banner ===== */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">🎯 Hero Banner — ขนาดและ Overlay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 pr-4 text-slate-500 font-medium">รายการ</th>
                  <th className="text-center py-2 px-2"><span className="inline-flex items-center gap-1"><Smartphone className="w-3 h-3" /> มือถือ</span></th>
                  <th className="text-center py-2 px-2"><span className="inline-flex items-center gap-1"><Tablet className="w-3 h-3" /> SM (640px+)</span></th>
                  <th className="text-center py-2 px-2"><span className="inline-flex items-center gap-1"><Monitor className="w-3 h-3" /> MD+ (768px+)</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-700">ความสูง</td>
                  <td className="py-3 px-2 text-center">
                    <Input type="number" min={200} max={600} value={heroHeightMobile} onChange={e => setHeroHeightMobile(Number(e.target.value) || 340)} className="w-16 h-7 text-xs text-center mx-auto" />
                    <Preset values={[240, 280, 320, 340, 380]} current={heroHeightMobile} onChange={setHeroHeightMobile} color="blue" />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <Input type="number" min={300} max={700} value={heroHeightSm} onChange={e => setHeroHeightSm(Number(e.target.value) || 400)} className="w-16 h-7 text-xs text-center mx-auto" />
                    <Preset values={[340, 380, 400, 440, 480]} current={heroHeightSm} onChange={setHeroHeightSm} color="blue" />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="text-[10px] text-slate-400">ใช้ Aspect Ratio</span>
                    <br />
                    <span className="text-xs text-slate-500">min: </span>
                    <Input type="number" min={300} max={800} value={heroMinHeightMd} onChange={e => setHeroMinHeightMd(Number(e.target.value) || 400)} className="w-16 h-7 text-xs text-center inline-block" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Aspect Ratio (Desktop)</Label>
              <div className="flex gap-1 mt-1">
                {["16/9", "4/3", "21/9", "3/2", "free"].map(r => (
                  <button key={r} onClick={() => setHeroImageRatio(r)} className={`text-[10px] px-2 py-1 rounded border transition-all ${
                    heroImageRatio === r ? "bg-orange-500 text-white border-orange-500" : "bg-white text-slate-500 border-slate-200"
                  }`}>{r}</button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs">Overlay Opacity: {heroOverlayOpacity}%</Label>
              <input type="range" min={10} max={90} value={heroOverlayOpacity} onChange={e => setHeroOverlayOpacity(Number(e.target.value))} className="w-full mt-1 accent-orange-500" />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>สว่าง (10%)</span>
                <span>มืด (90%)</span>
              </div>
            </div>
          </div>

          {/* Banner preview */}
          <div className="border-t pt-3">
            <p className="text-[10px] text-slate-400 mb-2">ตัวอย่าง Banner</p>
            <div className="flex items-end gap-3">
              <div className="text-center">
                <p className="text-[9px] text-blue-400 mb-1">📱</p>
                <div className="rounded-md overflow-hidden border border-blue-200 bg-slate-800 relative" style={{ width: 80, height: heroHeightMobile * 0.2 }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" style={{ opacity: heroOverlayOpacity / 100 }} />
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="h-1 w-8 bg-white/60 rounded mb-0.5" />
                    <div className="h-0.5 w-5 bg-orange-400/60 rounded" />
                  </div>
                </div>
                <p className="text-[8px] text-slate-400 mt-0.5">{heroHeightMobile}px</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] text-purple-400 mb-1">📱+</p>
                <div className="rounded-md overflow-hidden border border-purple-200 bg-slate-800 relative" style={{ width: 120, height: heroHeightSm * 0.2 }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" style={{ opacity: heroOverlayOpacity / 100 }} />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5">
                    <div className="h-1 w-12 bg-white/60 rounded mb-0.5" />
                    <div className="h-0.5 w-8 bg-orange-400/60 rounded" />
                  </div>
                </div>
                <p className="text-[8px] text-slate-400 mt-0.5">{heroHeightSm}px</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-[9px] text-orange-400 mb-1">🖥️</p>
                <div className="rounded-md overflow-hidden border border-orange-200 bg-slate-800 relative" style={{ width: "100%", aspectRatio: heroImageRatio === "free" ? "16/9" : heroImageRatio, minHeight: heroMinHeightMd * 0.15 }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" style={{ opacity: heroOverlayOpacity / 100 }} />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="h-1.5 w-20 bg-white/60 rounded mb-1" />
                    <div className="h-1 w-14 bg-orange-400/60 rounded" />
                  </div>
                </div>
                <p className="text-[8px] text-slate-400 mt-0.5">{heroImageRatio} / min {heroMinHeightMd}px</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== SECTION 3: Footer Colors ===== */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">🔻 Footer — สี</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "พื้นหลัง", value: footerBgColor, set: setFooterBgColor },
              { label: "ตัวอักษร", value: footerTextColor, set: setFooterTextColor },
              { label: "สีเน้น", value: footerAccentColor, set: setFooterAccentColor },
            ].map((c, i) => (
              <div key={i}>
                <Label className="text-xs">{c.label}</Label>
                <div className="flex items-center gap-1.5 mt-1">
                  <input type="color" value={c.value} onChange={e => c.set(e.target.value)} className="w-7 h-7 rounded border border-slate-200 cursor-pointer p-0.5" />
                  <Input value={c.value} onChange={e => c.set(e.target.value)} className="flex-1 font-mono text-[10px] h-7" />
                </div>
              </div>
            ))}
          </div>
          {/* Footer preview */}
          <div className="mt-3 rounded-lg overflow-hidden border border-slate-200">
            <div className="h-0.5" style={{ background: `linear-gradient(to right, ${footerAccentColor}, ${footerAccentColor}88)` }} />
            <div className="px-3 py-3" style={{ backgroundColor: footerBgColor }}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white">Footer Preview</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: `${footerAccentColor}20` }}>
                    <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: footerAccentColor }} />
                  </div>
                  <span className="text-[9px]" style={{ color: footerTextColor }}>ลิงก์ตัวอย่าง</span>
                </div>
              </div>
              <p className="text-[9px] mt-1" style={{ color: footerTextColor }}>ข้อความตัวอย่าง footer</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== SECTION 4: Tips ===== */}
      <Card className="mb-6 border-blue-100 bg-blue-50/30">
        <CardContent className="pt-4">
          <p className="text-xs font-semibold text-blue-700 mb-2">💡 เคล็ดลับ Responsive</p>
          <ul className="text-[11px] text-blue-600/80 space-y-1">
            <li>• <b>โลโก้มือถือ</b> ควรเล็กกว่า Desktop 30-50% เพื่อไม่กินพื้นที่จอ</li>
            <li>• <b>Banner มือถือ</b> ควรอยู่ 280-380px เพื่อเห็นเนื้อหาด้านล่างได้เร็ว</li>
            <li>• <b>Overlay</b> 40-60% จะทำให้อ่านข้อความได้ชัดและยังเห็นรูปพื้นหลัง</li>
            <li>• <b>Aspect Ratio 16/9</b> เหมาะกับแบนเนอร์ทั่วไป, <b>21/9</b> จะแคบและไวด์สกรีน</li>
          </ul>
        </CardContent>
      </Card>

      {/* ===== Save ===== */}
      <Button onClick={() => setShowConfirm(true)} disabled={saving} className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base mb-4">
        <Save className="w-5 h-5 mr-2" />
        {saving ? "กำลังบันทึก..." : "💾 บันทึกตั้งค่า Responsive ทั้งหมด"}
      </Button>

      <div className="text-center mb-8">
        <Link href="/admin" className="text-xs text-slate-400 hover:text-slate-600">← กลับ Dashboard</Link>
      </div>

      <ConfirmDialog
        open={showConfirm}
        title="ยืนยันการบันทึก"
        message="คุณต้องการบันทึกการตั้งค่า Responsive ทั้งหมดหรือไม่?"
        onConfirm={() => { setShowConfirm(false); handleSave(); }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
