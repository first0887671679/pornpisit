"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Bot, Shield, ShieldOff, Save, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

interface SiteSettings {
  allowGoogleIndex: boolean;
  allowAiCrawl: boolean;
}

export default function IndexingAdminPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    allowGoogleIndex: true,
    allowAiCrawl: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [original, setOriginal] = useState<SiteSettings>({
    allowGoogleIndex: true,
    allowAiCrawl: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    setHasChanges(
      settings.allowGoogleIndex !== original.allowGoogleIndex ||
      settings.allowAiCrawl !== original.allowAiCrawl
    );
  }, [settings, original]);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/site-settings");
      const data = await res.json();
      if (data && !data.error) {
        const s = {
          allowGoogleIndex: data.allowGoogleIndex,
          allowAiCrawl: data.allowAiCrawl,
        };
        setSettings(s);
        setOriginal(s);
      }
    } catch (error) {
      console.error("Failed to fetch settings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const data = await res.json();
        const s = {
          allowGoogleIndex: data.allowGoogleIndex,
          allowAiCrawl: data.allowAiCrawl,
        };
        setOriginal(s);
        setSettings(s);
        setMessage("บันทึกสำเร็จ! การเปลี่ยนแปลงจะมีผลทันที");
        setTimeout(() => setMessage(""), 5000);
      } else {
        setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่");
      }
    } catch (error) {
      setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <span className="ml-3 text-slate-500">กำลังโหลด...</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-slate-800">ควบคุมการ Index</h1>
      <p className="text-slate-500 mb-6">เปิด/ปิด การให้ Google และ AI เข้าถึงเว็บไซต์</p>

      {message && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
          message.includes("สำเร็จ")
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message.includes("สำเร็จ") ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Google Index Toggle */}
        <Card className={`transition-all duration-300 ${settings.allowGoogleIndex ? "border-green-200 bg-green-50/30" : "border-red-200 bg-red-50/30"}`}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings.allowGoogleIndex ? "bg-green-100" : "bg-red-100"}`}>
                <Globe className={`w-5 h-5 ${settings.allowGoogleIndex ? "text-green-600" : "text-red-600"}`} />
              </div>
              <div>
                <span className="text-lg">Google Index</span>
                <p className="text-xs font-normal text-slate-500 mt-0.5">ควบคุมการ index ของ Google</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    สถานะ: {settings.allowGoogleIndex ? (
                      <span className="text-green-600">เปิดอยู่ ✓</span>
                    ) : (
                      <span className="text-red-600">ปิดอยู่ ✗</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {settings.allowGoogleIndex
                      ? "Google สามารถ crawl และแสดงเว็บบนผลค้นหาได้"
                      : "Google จะไม่แสดงเว็บในผลค้นหา"}
                  </p>
                </div>
                <button
                  onClick={() => setSettings(s => ({ ...s, allowGoogleIndex: !s.allowGoogleIndex }))}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    settings.allowGoogleIndex
                      ? "bg-green-500 focus:ring-green-500"
                      : "bg-red-400 focus:ring-red-400"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      settings.allowGoogleIndex ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className={`p-3 rounded-lg text-xs ${settings.allowGoogleIndex ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {settings.allowGoogleIndex ? (
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">ปกติ — เปิด index</p>
                      <p className="mt-1">robots.txt: allow / | meta robots: index, follow</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <ShieldOff className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">⚠️ ปิด index — เว็บจะหายจาก Google</p>
                      <p className="mt-1">robots.txt: disallow / | meta robots: noindex, nofollow</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Crawl Toggle */}
        <Card className={`transition-all duration-300 ${settings.allowAiCrawl ? "border-green-200 bg-green-50/30" : "border-orange-200 bg-orange-50/30"}`}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings.allowAiCrawl ? "bg-green-100" : "bg-orange-100"}`}>
                <Bot className={`w-5 h-5 ${settings.allowAiCrawl ? "text-green-600" : "text-orange-600"}`} />
              </div>
              <div>
                <span className="text-lg">AI Crawling</span>
                <p className="text-xs font-normal text-slate-500 mt-0.5">ควบคุม AI bots (ChatGPT, Claude ฯลฯ)</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    สถานะ: {settings.allowAiCrawl ? (
                      <span className="text-green-600">เปิดอยู่ ✓</span>
                    ) : (
                      <span className="text-orange-600">ปิดอยู่ ✗</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {settings.allowAiCrawl
                      ? "AI bots สามารถ crawl เนื้อหาเว็บได้"
                      : "AI bots จะถูกบล็อกไม่ให้ crawl เว็บ"}
                  </p>
                </div>
                <button
                  onClick={() => setSettings(s => ({ ...s, allowAiCrawl: !s.allowAiCrawl }))}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    settings.allowAiCrawl
                      ? "bg-green-500 focus:ring-green-500"
                      : "bg-orange-400 focus:ring-orange-400"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      settings.allowAiCrawl ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className={`p-3 rounded-lg text-xs ${settings.allowAiCrawl ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}>
                {settings.allowAiCrawl ? (
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">ปกติ — AI อ่านเว็บได้</p>
                      <p className="mt-1">ChatGPT, Claude, Perplexity, Bing AI สามารถอ้างอิงเนื้อหาเว็บได้</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <ShieldOff className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">บล็อก AI bots</p>
                      <p className="mt-1">GPTBot, ChatGPT-User, Claude-Web, Google-Extended, CCBot, Bytespider, Diffbot, PerplexityBot, Amazonbot</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="mt-8 max-w-4xl">
        {hasChanges && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            คุณมีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก
          </div>
        )}
        <Button
          onClick={handleSave}
          disabled={saving || !hasChanges}
          className={`px-6 py-3 text-base ${
            hasChanges
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-slate-300 cursor-not-allowed"
          }`}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              กำลังบันทึก...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              บันทึกการตั้งค่า
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
