"use client";

import CrudList from "@/components/admin/CrudList";

const fields = [
  { key: "title", label: "หัวข้อ", type: "text" as const, placeholder: "เช่น บริการ 24 ชั่วโมง", required: true },
  { key: "description", label: "รายละเอียด", type: "textarea" as const, placeholder: "อธิบายสั้นๆ", required: true },
  { key: "icon", label: "ไอคอน (ชื่อ Lucide Icon)", type: "text" as const, placeholder: "เช่น Clock, Shield, Zap, ThumbsUp" },
];

const defaultValues = { title: "", description: "", icon: "Star" };

export default function WhyUsAdminPage() {
  return (
    <CrudList
      title="จัดการ ทำไมต้องเลือกเรา"
      apiUrl="/api/why-us"
      fields={fields}
      defaultValues={defaultValues}
    />
  );
}
