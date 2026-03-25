import Link from "next/link";
import { Battery, Wrench, Sparkles, PenTool, ArrowRight } from "lucide-react";

const ALL_SERVICES = [
  {
    slug: "mobile-tire-repair",
    title: "ปะยางนอกสถานที่ 24 ชม.",
    desc: "ยางแตก ยางรั่ว ช่างถึงที่ใน 30 นาที",
    icon: <PenTool className="w-5 h-5" />,
  },
  {
    slug: "battery-replacement",
    title: "เปลี่ยนแบตเตอรี่รถยนต์",
    desc: "แบตแท้ รับประกัน 1 ปี เปลี่ยนถึงที่",
    icon: <Battery className="w-5 h-5" />,
  },
  {
    slug: "alternator-starter",
    title: "ซ่อม/เปลี่ยน ไดชาร์จ ไดสตาร์ท",
    desc: "วิเคราะห์ด้วย OBD ซ่อมเสร็จหน้างาน",
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    slug: "car-polishing",
    title: "ขัดสีรถ ลบรอย ขัดไฟหน้า",
    desc: "ขัดสีรถถึงบ้าน ไม่ต้องทิ้งรถที่ร้าน",
    icon: <Sparkles className="w-5 h-5" />,
  },
];

interface ServiceCrossLinksProps {
  currentSlug: string;
}

export default function ServiceCrossLinks({ currentSlug }: ServiceCrossLinksProps) {
  const others = ALL_SERVICES.filter((s) => s.slug !== currentSlug);

  return (
    <section className="py-14 md:py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 text-center mb-8 md:mb-12">
          บริการอื่นๆ ของเรา
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {others.map((svc) => (
            <Link
              key={svc.slug}
              href={`/${svc.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 p-5 md:p-6 hover:border-orange-300 hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 mb-3 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                {svc.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1">{svc.title}</h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-3">{svc.desc}</p>
              <span className="inline-flex items-center gap-1 text-orange-500 text-xs font-semibold group-hover:text-orange-600">
                ดูรายละเอียด <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
