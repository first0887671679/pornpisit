"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

export default function ContentPage() {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/home-content")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setHeroTitle(data.heroTitle || "");
          setHeroSub(data.heroSub || "");
          setAboutText(data.aboutText || "");
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/home-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroTitle, heroSub, aboutText }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-800">จัดการหน้า Home</h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>ข้อความหน้าแรก (Hero Section)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">หัวข้อหลัก (Hero Title)</Label>
            <Input
              id="heroTitle"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroSub">หัวข้อรอง (Hero Subtitle)</Label>
            <Input
              id="heroSub"
              value={heroSub}
              onChange={(e) => setHeroSub(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutText">ข้อความแนะนำ (About Text)</Label>
            <textarea
              id="aboutText"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-red-600 hover:bg-red-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "กำลังบันทึก..." : "บันทึก"}
            </Button>
            {saved && (
              <span className="text-green-600 text-sm font-medium">บันทึกสำเร็จ!</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
