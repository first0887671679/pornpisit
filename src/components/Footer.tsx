import Link from "next/link";
import { PhoneCall, MessageCircle, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-extrabold text-orange-500 mb-4">FIRSTCARCENTER</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              บริการดูแลรักษารถยนต์นอกสถานที่ 24 ชั่วโมง
              ถึงที่รวดเร็วทันใจ โดยช่างผู้เชี่ยวชาญ
            </p>
            <div className="flex items-center gap-2 mt-4 text-slate-400 text-sm">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>เปิดให้บริการตลอด 24 ชั่วโมง</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>กรุงเทพและปริมณฑล</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">บริการของเรา</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>
                <Link href="/services/battery" className="hover:text-orange-400 transition-colors">
                  เปลี่ยนแบตเตอรี่รถยนต์
                </Link>
              </li>
              <li>
                <Link href="/services/alternator-starter" className="hover:text-orange-400 transition-colors">
                  ซ่อม/เปลี่ยน ไดชาร์จ ไดสตาร์ท
                </Link>
              </li>
              <li>
                <Link href="/services/headlight-restoration" className="hover:text-orange-400 transition-colors">
                  ขัดไฟหน้ารถ
                </Link>
              </li>
              <li>
                <Link href="/services/tire-repair" className="hover:text-orange-400 transition-colors">
                  ปะยางนอกสถานที่
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">ติดต่อเรา</h4>
            <div className="space-y-3">
              <Link
                href="tel:0887671679"
                className="flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors"
              >
                <PhoneCall className="w-5 h-5 text-orange-400" />
                <span>088-767-1679</span>
              </Link>
              <Link
                href="https://lin.ee/xxqKaZn"
                target="_blank"
                className="flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-[#00B900]" />
                <span>@730ohrmd</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} FIRSTCARCENTER. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
