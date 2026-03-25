"use client";

import CrudList from "@/components/admin/CrudList";

const fields = [
  { key: "name", label: "ชื่อลูกค้า", type: "text" as const, placeholder: "เช่น คุณนัท", required: true },
  { key: "role", label: "ใช้บริการอะไร", type: "text" as const, placeholder: "เช่น ผู้ใช้บริการเปลี่ยนแบตเตอรี่" },
  { key: "content", label: "ข้อความรีวิว", type: "textarea" as const, placeholder: "เขียนรีวิวจากลูกค้า", required: true },
  { key: "avatar", label: "URL รูปโปรไฟล์", type: "url" as const, placeholder: "https://..." },
  { key: "rating", label: "คะแนน (1-5)", type: "number" as const, placeholder: "5" },
];

const defaultValues = { name: "", role: "", content: "", avatar: "", rating: 5 };

export default function TestimonialsAdminPage() {
  return (
    <CrudList
      title="จัดการรีวิวลูกค้า"
      apiUrl="/api/testimonials"
      fields={fields}
      defaultValues={defaultValues}
    />
  );
}
