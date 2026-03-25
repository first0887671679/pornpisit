"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Phone, MessageCircle, MapPin } from "lucide-react";

export default function ContactSettingsPage() {
  const [phone, setPhone] = useState("");
  const [lineId, setLineId] = useState("");
  const [lineUrl, setLineUrl] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPhone(data.phone || "");
          setLineId(data.lineId || "");
          setLineUrl(data.lineUrl || "");
          setAddress(data.address || "");
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, lineId, lineUrl, address }),
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
      <h1 className="text-3xl font-bold mb-6 text-slate-800">ตั้งค่าช่องทางติดต่อ</h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>ข้อมูลช่องทางติดต่อ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" />
              เบอร์โทรศัพท์
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="080-000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lineId" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#00B900]" />
              Line ID
            </Label>
            <Input
              id="lineId"
              value={lineId}
              onChange={(e) => setLineId(e.target.value)}
              placeholder="@yourlineid"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lineUrl" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#00B900]" />
              Line URL
            </Label>
            <Input
              id="lineUrl"
              value={lineUrl}
              onChange={(e) => setLineUrl(e.target.value)}
              placeholder="https://line.me/ti/p/~@yourlineid"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              พื้นที่ให้บริการ
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="กรุงเทพและปริมณฑล"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-orange-500 hover:bg-orange-600"
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
