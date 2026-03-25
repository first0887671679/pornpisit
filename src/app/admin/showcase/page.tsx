"use client";

import CrudList from "@/components/admin/CrudList";

const fields = [
  { key: "alt", label: "ชื่อ/คำอธิบายรูป (Alt Text)", type: "text" as const, placeholder: "เช่น เปลี่ยนแบตเตอรี่รถยนต์", required: true },
  { key: "caption", label: "คำบรรยายใต้ภาพ", type: "text" as const, placeholder: "เช่น เปลี่ยนแบตเตอรี่ถึงที่ เร็ว ปลอดภัย" },
  { key: "src", label: "URL รูปภาพ", type: "url" as const, placeholder: "https://...", required: true },
];

const defaultValues = { src: "", alt: "", caption: "" };

export default function ShowcaseAdminPage() {
  return (
    <CrudList
      title="จัดการภาพผลงาน (Gallery)"
      apiUrl="/api/showcase"
      fields={fields}
      defaultValues={defaultValues}
    />
  );
}
