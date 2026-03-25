"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Save, Trash2, Edit, X, Eye, EyeOff, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

interface PageItem {
  id: string;
  slug: string;
  title: string;
  isActive: boolean;
  order: number;
  sections?: any[];
}

export default function PagesAdminPage() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", slug: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetch("/api/pages");
      const data = await res.json();
      setPages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch pages", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9ก-๙\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.slug) return;
    setSaving(true);
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, order: pages.length }),
      });
      if (res.ok) {
        await fetchPages();
        setFormData({ title: "", slug: "" });
        setShowAdd(false);
        showMsg("เพิ่มหน้าสำเร็จ!");
      } else {
        showMsg("เกิดข้อผิดพลาด (slug อาจซ้ำ)");
      }
    } catch (error) {
      console.error("Failed to add", error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        await fetchPages();
        setEditingId(null);
        setFormData({ title: "", slug: "" });
        showMsg("บันทึกสำเร็จ!");
      }
    } catch (error) {
      console.error("Failed to update", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ยืนยันการลบหน้านี้? (sections ทั้งหมดจะถูกลบด้วย)")) return;
    try {
      const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchPages();
        showMsg("ลบหน้าสำเร็จ!");
      }
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const handleToggleActive = async (page: PageItem) => {
    try {
      await fetch(`/api/pages/${page.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...page, isActive: !page.isActive }),
      });
      await fetchPages();
    } catch (error) {
      console.error("Failed to toggle", error);
    }
  };

  const startEdit = (page: PageItem) => {
    setEditingId(page.id);
    setShowAdd(false);
    setFormData({ title: page.title, slug: page.slug });
  };

  const renderForm = (onSubmit: () => void, submitLabel: string) => (
    <Card className="mb-6 border-orange-200 bg-orange-50/30">
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-1">
          <Label className="text-sm font-medium">ชื่อหน้า</Label>
          <Input
            value={formData.title}
            onChange={(e) => {
              const title = e.target.value;
              setFormData((prev) => ({
                ...prev,
                title,
                slug: editingId ? prev.slug : generateSlug(title),
              }));
            }}
            placeholder="เช่น หน้าแรก, บริการเปลี่ยนแบตเตอรี่"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-medium">Slug (URL path)</Label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="เช่น home, battery-service"
          />
          <p className="text-xs text-slate-400">ใช้ภาษาอังกฤษ ตัวเล็ก คั่นด้วย - (เช่น battery-service)</p>
        </div>
        <div className="flex gap-2 pt-2">
          <Button onClick={onSubmit} disabled={saving} className="bg-orange-500 hover:bg-orange-600">
            <Save className="w-4 h-4 mr-2" />
            {saving ? "กำลังบันทึก..." : submitLabel}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowAdd(false);
              setEditingId(null);
              setFormData({ title: "", slug: "" });
            }}
          >
            <X className="w-4 h-4 mr-2" />
            ยกเลิก
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6 text-slate-800">จัดการหน้าเว็บ</h1>
        <p className="text-slate-500">กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">จัดการหน้าเว็บ</h1>
        {!showAdd && !editingId && (
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => {
              setShowAdd(true);
              setFormData({ title: "", slug: "" });
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            เพิ่มหน้าใหม่
          </Button>
        )}
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
          {message}
        </div>
      )}

      {showAdd && renderForm(handleAdd, "เพิ่มหน้า")}

      <div className="space-y-3">
        {pages.length === 0 && !showAdd && (
          <div className="text-center py-12 text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg">ยังไม่มีหน้าในระบบ</p>
            <p className="text-sm mt-1">กดปุ่ม &quot;เพิ่มหน้าใหม่&quot; เพื่อเริ่มต้น</p>
          </div>
        )}
        {pages.map((page) => (
          <div key={page.id}>
            {editingId === page.id ? (
              renderForm(() => handleUpdate(page.id), "บันทึก")
            ) : (
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="py-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-orange-500" />
                      {page.title}
                    </div>
                    <div className="text-sm text-slate-400 mt-0.5">
                      /{page.slug} &middot; {page.sections?.length || 0} sections
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(page)}
                      className={page.isActive ? "text-green-600" : "text-slate-400"}
                      title={page.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                    >
                      {page.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Link href={`/admin/pages/${page.id}`}>
                      <Button variant="ghost" size="sm" className="text-orange-600" title="แก้ไขเนื้อหา">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => startEdit(page)} className="text-blue-600" title="แก้ไขชื่อ/slug">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(page.id)} className="text-red-600" title="ลบหน้า">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
