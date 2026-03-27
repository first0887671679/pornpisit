"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Save, Trash2, Edit, X, GripVertical, Eye, EyeOff } from "lucide-react";

export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "url";
  placeholder?: string;
  required?: boolean;
}

interface CrudListProps {
  title: string;
  apiUrl: string;
  fields: FieldConfig[];
  defaultValues: Record<string, any>;
}

export default function CrudList({ title, apiUrl, fields, defaultValues }: CrudListProps) {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>(defaultValues);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, order: items.length }),
      });
      if (res.ok) {
        await fetchItems();
        setFormData(defaultValues);
        setShowAdd(false);
        showMessage("เพิ่มสำเร็จ!");
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
      const res = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        await fetchItems();
        setEditingId(null);
        setFormData(defaultValues);
        showMessage("บันทึกสำเร็จ!");
      }
    } catch (error) {
      console.error("Failed to update", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ยืนยันการลบ?")) return;
    try {
      const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchItems();
        showMessage("ลบสำเร็จ!");
      }
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const handleToggleActive = async (item: any) => {
    try {
      await fetch(`${apiUrl}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, isActive: !item.isActive }),
      });
      await fetchItems();
    } catch (error) {
      console.error("Failed to toggle", error);
    }
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setShowAdd(false);
    const data: Record<string, any> = {};
    fields.forEach((f) => {
      data[f.key] = item[f.key] ?? "";
    });
    if (item.order !== undefined) data.order = item.order;
    if (item.isActive !== undefined) data.isActive = item.isActive;
    setFormData(data);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(defaultValues);
  };

  const renderField = (field: FieldConfig) => {
    if (field.type === "textarea") {
      return (
        <textarea
          value={formData[field.key] || ""}
          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
          rows={3}
          placeholder={field.placeholder}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      );
    }
    return (
      <Input
        type={field.type === "number" ? "number" : "text"}
        value={formData[field.key] || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            [field.key]: field.type === "number" ? parseInt(e.target.value) || 0 : e.target.value,
          })
        }
        placeholder={field.placeholder}
      />
    );
  };

  const renderForm = (onSubmit: () => void, submitLabel: string) => (
    <Card className="mb-6 border-red-200 bg-red-50/30">
      <CardContent className="pt-6 space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            <Label className="text-sm font-medium">{field.label}</Label>
            {renderField(field)}
          </div>
        ))}
        <div className="flex gap-2 pt-2">
          <Button onClick={onSubmit} disabled={saving} className="bg-red-600 hover:bg-red-700">
            <Save className="w-4 h-4 mr-2" />
            {saving ? "กำลังบันทึก..." : submitLabel}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowAdd(false);
              cancelEdit();
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
        <h1 className="text-3xl font-bold mb-6 text-slate-800">{title}</h1>
        <p className="text-slate-500">กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
        {!showAdd && !editingId && (
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => {
              setShowAdd(true);
              setFormData(defaultValues);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            เพิ่มใหม่
          </Button>
        )}
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
          {message}
        </div>
      )}

      {showAdd && renderForm(handleAdd, "เพิ่ม")}

      <div className="space-y-3">
        {items.length === 0 && !showAdd && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-lg">ยังไม่มีข้อมูล</p>
            <p className="text-sm mt-1">กดปุ่ม "เพิ่มใหม่" เพื่อเริ่มต้น</p>
          </div>
        )}
        {items.map((item) => (
          <div key={item.id}>
            {editingId === item.id ? (
              renderForm(() => handleUpdate(item.id), "บันทึก")
            ) : (
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="py-4 flex items-center gap-4">
                  <GripVertical className="w-5 h-5 text-slate-300 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800 truncate">
                      {item[fields[0]?.key] || "ไม่มีชื่อ"}
                    </div>
                    {fields[1] && (
                      <div className="text-sm text-slate-500 truncate mt-0.5">
                        {item[fields[1].key]}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {item.isActive !== undefined && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(item)}
                        className={item.isActive ? "text-green-600" : "text-slate-400"}
                        title={item.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                      >
                        {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => startEdit(item)} className="text-blue-600">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-red-600">
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
