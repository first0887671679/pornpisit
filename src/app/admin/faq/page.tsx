"use client";

import CrudList from "@/components/admin/CrudList";

const fields = [
  { key: "question", label: "คำถาม", type: "text" as const, placeholder: "เช่น เปลี่ยนแบตเตอรี่ใช้เวลานานไหม?", required: true },
  { key: "answer", label: "คำตอบ", type: "textarea" as const, placeholder: "เขียนคำตอบที่ชัดเจน", required: true },
];

const defaultValues = { question: "", answer: "" };

export default function FaqAdminPage() {
  return (
    <CrudList
      title="จัดการคำถามที่พบบ่อย (FAQ)"
      apiUrl="/api/faq"
      fields={fields}
      defaultValues={defaultValues}
    />
  );
}
