import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_CONFIG, generateFAQJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from "@/lib/seo";
import { sanitizeHtml } from "@/lib/sanitize";
import {
  PhoneCall, MessageCircle, Battery, Wrench, Lightbulb, PenTool,
  Clock, Shield, ThumbsUp, Zap, MapPin, Star, ArrowRight, CircleDot, Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Showcase from "@/components/Showcase";
import Testimonials from "@/components/Testimonials";
import Brands from "@/components/Brands";

const HeroSlider = dynamic(() => import("@/components/HeroSlider"));
const BatteryChecker = dynamic(() => import("@/components/BatteryChecker"));
const AnimateOnScroll = dynamic(() => import("@/components/AnimateOnScroll"));

export const revalidate = 60;

export const metadata: Metadata = {
  title: "ช่างซ่อมรถนอกสถานที่ 24 ชม. ปะยาง เปลี่ยนแบต บางนา ศรีนครินทร์",
  description: "บริการช่วยเหลือรถเสียฉุกเฉิน 24 ชม. ช่างซ่อมรถนอกสถานที่ โซนบางนา ศรีนครินทร์ สมุทรปราการ ปะยาง เปลี่ยนแบต ไดชาร์จ ถึงไวใน 30 นาที โทรเลย!",
  alternates: {
    canonical: "/",
  },
};

const iconMap: Record<string, React.ReactNode> = {
  Battery: <Battery className="w-7 h-7" />,
  Wrench: <Wrench className="w-7 h-7" />,
  Lightbulb: <Lightbulb className="w-7 h-7" />,
  PenTool: <PenTool className="w-7 h-7" />,
  Shield: <Shield className="w-7 h-7" />,
  Clock: <Clock className="w-7 h-7" />,
  Zap: <Zap className="w-7 h-7" />,
  ThumbsUp: <ThumbsUp className="w-7 h-7" />,
  Star: <Star className="w-7 h-7" />,
  CircleDot: <CircleDot className="w-7 h-7" />,
  Sparkles: <Sparkles className="w-7 h-7" />,
};

const whyUsIconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-10 h-10 text-red-600" />,
  Zap: <Zap className="w-10 h-10 text-red-600" />,
  Shield: <Shield className="w-10 h-10 text-red-600" />,
  ThumbsUp: <ThumbsUp className="w-10 h-10 text-red-600" />,
  Star: <Star className="w-10 h-10 text-red-600" />,
};

function getServiceIconKey(service: { title?: string; href?: string; icon?: string }) {
  const title = (service.title || "").toLowerCase();
  const href = (service.href || "").toLowerCase();

  if (href.includes("mobile-tire-repair") || title.includes("ปะยาง") || title.includes("ยาง")) {
    return "CircleDot";
  }

  if (href.includes("battery-replacement") || title.includes("แบต")) {
    return "Battery";
  }

  if (href.includes("alternator-starter") || title.includes("ไดชาร์จ") || title.includes("ไดสตาร์ท")) {
    return "Wrench";
  }

  if (href.includes("car-polishing") || title.includes("ขัดสี") || title.includes("ลบรอย") || title.includes("ขัดไฟหน้า")) {
    return "Sparkles";
  }

  return service.icon || "Battery";
}

function parseJson(str: string): Record<string, any> {
  try { return JSON.parse(str); } catch { return {}; }
}

function getAspectStyle(ratio?: string): React.CSSProperties {
  if (!ratio || ratio === "free") return { aspectRatio: "16/9" };
  // Support both "4:3" and "4/3" formats
  const normalized = ratio.replace(":", "/");
  return { aspectRatio: normalized };
}

function getSection(sections: any[], type: string) {
  return sections.find((s: any) => s.type === type && s.isActive);
}

function getAllSections(sections: any[], type: string) {
  return sections.filter((s: any) => s.type === type && s.isActive);
}

export default async function Home() {
  // Fetch from the new Page/PageSection model
  const homePage = await (prisma as any).page.findUnique({
    where: { slug: "home" },
    include: { sections: { where: { isActive: true }, orderBy: { order: "asc" } } },
  });

  const sections = homePage?.sections || [];

  // Parse section data
  const heroSection = getSection(sections, "hero");
  const heroData = heroSection ? parseJson(heroSection.content) : {};

  const servicesSection = getSection(sections, "services");
  const servicesData = servicesSection ? parseJson(servicesSection.content) : {};
  const serviceItems = Array.isArray(servicesData.items) ? servicesData.items : [];

  const gallerySection = getSection(sections, "gallery");
  const galleryData = gallerySection ? parseJson(gallerySection.content) : {};
  const galleryImages = Array.isArray(galleryData.images) ? galleryData.images : [];

  const whyUsSection = getSection(sections, "why-us");
  const whyUsData = whyUsSection ? parseJson(whyUsSection.content) : {};
  const whyUsItems = Array.isArray(whyUsData.items) ? whyUsData.items : [];

  const testimonialsSection = getSection(sections, "testimonials");
  const testimonialsData = testimonialsSection ? parseJson(testimonialsSection.content) : {};
  const testimonialItems = Array.isArray(testimonialsData.items) ? testimonialsData.items : [];

  const faqSection = getSection(sections, "faq");
  const faqData = faqSection ? parseJson(faqSection.content) : {};
  const faqItems = Array.isArray(faqData.items) ? faqData.items : [];

  const contactSection = getSection(sections, "contact");
  const contactData = contactSection ? parseJson(contactSection.content) : {};

  // Also get sections in their defined order for rendering
  const orderedSections = sections;

  // Fallback values
  const heroHeading = heroData.heading || "บริการดูแลรักษารถยนต์";
  const heroSubheading = heroData.subheading || "นอกสถานที่ 24 ชั่วโมง";
  const heroDescription = heroData.description || "ถึงที่รวดเร็วทันใจ แก้ปัญหารถยนต์ฉุกเฉินโดยช่างผู้เชี่ยวชาญ";
  const heroPhoneUrl = heroData.phoneUrl || "tel:0887671679";
  const heroLineUrl = heroData.lineUrl || "https://lin.ee/xxqKaZn";
  const heroImage = heroSection?.imageUrl || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop";

  const contactHeading = contactData.heading || "รถเสีย? อย่ารอช้า โทรหาเราเลย!";
  const contactDescription = contactData.description || "ทีมช่างผู้เชี่ยวชาญพร้อมออกให้บริการถึงที่คุณตลอด 24 ชั่วโมง";
  const phone = contactData.phone || "0887671679";
  const lineId = contactData.lineId || "@730ohrmd";
  const lineUrl = contactData.lineUrl || "https://lin.ee/xxqKaZn";

  // Build services with icons
  const services = serviceItems.map((s: any) => ({
    title: s.title || "",
    description: s.description || "",
    icon: iconMap[getServiceIconKey(s)] || iconMap.Battery,
    href: s.href || "#",
  }));

  // Build whyUs with icons
  const whyUs = whyUsItems.map((w: any) => ({
    icon: whyUsIconMap[w.icon || "Star"] || whyUsIconMap.Star,
    title: w.title || "",
    description: w.description || "",
  }));

  // Build testimonials
  const testimonials = testimonialItems.map((t: any) => ({
    name: t.name || "",
    role: t.role || "",
    avatar: t.avatar || "https://i.pravatar.cc/120",
    rating: t.rating || 5,
    content: t.content || "",
  }));

  // Build FAQs
  const faqs = faqItems.map((f: any) => ({
    question: f.question || "",
    answer: f.answer || "",
  }));

  // Build showcase images
  const showcaseImages = galleryImages.map((img: any) => ({
    src: img.src || "",
    alt: img.alt || "",
    caption: img.caption || "",
  }));

  const faqJsonLd = generateFAQJsonLd(faqs);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "หน้าแรก", url: SITE_CONFIG.url },
  ]);
  const webPageJsonLd = generateWebPageJsonLd(
    "บริการดูแลรักษารถยนต์นอกสถานที่ 24 ชั่วโมง",
    SITE_CONFIG.description,
    "/"
  );

  // Render sections in order
  const renderSection = (section: any) => {
    const data = parseJson(section.content);
    const type = section.type;

    if (type === "hero") {
      // รองรับทั้งแบบ slides ใหม่ และแบบเดิม (single hero)
      let heroSlides: any[] = [];
      if (Array.isArray(data.slides) && data.slides.length > 0) {
        heroSlides = data.slides;
      } else {
        heroSlides = [{
          heading: data.heading || heroHeading,
          subheading: data.subheading || heroSubheading,
          description: data.description || heroDescription,
          phoneUrl: data.phoneUrl || heroPhoneUrl,
          lineUrl: data.lineUrl || heroLineUrl,
          imageUrl: section.imageUrl || heroImage,
          textAlign: "center",
          overlayOpacity: 30,
        }];
      }
      return (
        <HeroSlider
          key={section.id}
          slides={heroSlides}
          autoSlide={data.autoSlide !== false}
          intervalMs={data.intervalMs || 5000}
        />
      );
    }

    if (type === "services") {
      const items = Array.isArray(data.items) ? data.items : [];
      return (
        <section key={section.id} id="services" className="relative overflow-hidden bg-slate-950 py-16 md:py-24 px-4">
          {/* Background decorative orbs */}
          <div className="absolute top-0 left-0 w-72 h-72 md:w-[600px] md:h-[600px] bg-red-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 md:w-[400px] md:h-[400px] bg-red-400/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">

            {/* ── Section Header ── */}
            <div className="text-center mb-10 md:mb-16">
              <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 text-red-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 md:mb-5 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                Our Services
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-3 md:mb-4 leading-tight px-2">
                {section.title || "บริการของเรา"}
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed px-2">
                {data.description || "ครบทุกบริการดูแลรักษารถยนต์นอกสถานที่ พร้อมช่างผู้เชี่ยวชาญ"}
              </p>
            </div>

            {/* ── Cards Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-20">
              {items.map((svc: any, idx: number) => (
                <Link href={svc.href || "#"} key={idx} className="group">
                  {/* Mobile: horizontal layout | Desktop: vertical card */}
                  <div className="relative h-full flex flex-row sm:flex-col bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-300 active:scale-[0.98] sm:hover:-translate-y-2 hover:border-red-600/40 hover:shadow-2xl hover:shadow-red-600/10 gap-4 sm:gap-0">

                    {/* Hover glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-transparent group-hover:from-red-600/5 transition-all duration-300 rounded-2xl pointer-events-none" />

                    {/* Top accent line */}
                    <div className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent group-hover:via-red-400/80 transition-all duration-300" />

                    {/* Number + Icon — left side on mobile */}
                    <div className="relative flex-shrink-0 flex flex-col items-center gap-2 sm:items-start sm:mb-5">
                      {/* Number badge (desktop only) */}
                      <span className="hidden sm:block absolute top-0 right-0 text-5xl font-black text-slate-800 group-hover:text-red-600/20 transition-colors duration-300 leading-none select-none -mr-2 -mt-2">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {/* Icon box */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 bg-red-600/10 text-red-400 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-600/40">
                        {iconMap[getServiceIconKey(svc)] || iconMap.Battery}
                      </div>
                      {/* Mobile number badge below icon */}
                      <span className="sm:hidden text-xs font-black text-slate-700 select-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content — right side on mobile, full-width on desktop */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="font-bold text-white text-sm sm:text-base mb-1.5 sm:mb-2.5 leading-snug sm:pr-8">
                        {svc.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed flex-1 line-clamp-3 sm:line-clamp-none">
                        {svc.description}
                      </p>
                      {/* CTA link */}
                      <div className="flex items-center gap-1 mt-3 sm:mt-5 text-red-400 text-xs font-semibold group-hover:text-red-300 transition-colors">
                        <span>ดูเพิ่มเติม</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Bottom border accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600/0 to-transparent group-hover:via-red-600/60 transition-all duration-300 rounded-b-2xl" />
                  </div>
                </Link>
              ))}
            </div>

            {/* ── พื้นที่ให้บริการ ── */}
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white mb-3 md:mb-4">
                พื้นที่ให้บริการ <span className="text-red-400">ช่างซ่อมรถฉุกเฉิน</span>
                <br className="hidden sm:block" />
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-slate-400">(กรุงเทพฯ - สมุทรปราการ)</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-6 md:mb-8 px-2">
                ครอบคลุมโซนกรุงเทพฯ: สุขุมวิทตอนปลาย, บางนา, แบริ่ง, ลาซาล และโซนสมุทรปราการ: ศรีนครินทร์, เทพารักษ์, แพรกษา, วัดด่านสำโรง, วัดหนามแดง
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {["สุขุมวิท", "บางนา", "แบริ่ง", "ลาซาล", "ศรีนครินทร์", "เทพารักษ์", "แพรกษา", "สำโรง", "วัดด่าน", "วัดหนามแดง"].map((area) => (
                  <span key={area} className="bg-slate-800 text-slate-300 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full border border-slate-700">
                    <MapPin className="w-3 h-3 inline-block mr-1 text-red-400" />{area}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-400 active:scale-[0.97] text-white font-bold text-sm md:text-base h-12 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all shadow-lg shadow-red-600/30"
                >
                  <PhoneCall className="w-4 h-4 md:w-5 md:h-5" />
                  โทรเรียกช่างด่วน
                </Link>
                <Link
                  href={lineUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34b] active:scale-[0.97] text-white font-bold text-sm md:text-base h-12 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all shadow-lg shadow-[#06C755]/25"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  แอดไลน์ส่งพิกัด
                </Link>
              </div>
            </div>

          </div>
        </section>
      );
    }

    if (type === "battery-checker") {
      return (
        <section key={section.id} className="relative overflow-hidden bg-slate-950 py-12 md:py-20 px-4">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                {data.heading || section.title || "เช็ครุ่นแบตเตอรี่รถยนต์ของคุณ"}
              </h3>
              <p className="text-slate-400 text-sm md:text-base mt-2">
                {data.description || "เลือกยี่ห้อและรุ่นรถเพื่อดูแบตเตอรี่ที่เหมาะสม"}
              </p>
            </div>
            <BatteryChecker showDropdown={data.showDropdown !== false} showBrandGrid={data.showBrandGrid !== false} />
          </div>
        </section>
      );
    }

    if (type === "cta-banner") {
      const ctaPhone = data.phone || phone;
      const ctaLineUrl = data.lineUrl || lineUrl;
      return (
        <section key={section.id} className="relative overflow-hidden bg-slate-950 py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-red-600/20">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/15 via-red-700/10 to-slate-900/80" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              <div className="relative z-10 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/30 text-red-300 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wider uppercase">
                    <Zap className="w-3 h-3" />
                    {data.badge || "พร้อมออกให้บริการทันที"}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                    {data.heading || "รถเสีย? อย่ารอช้า —"}<br className="hidden sm:block" />
                    <span className="text-red-400"> {data.headingSub || "โทรหาเราได้เลย"}</span>
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {data.description || "ช่างผู้เชี่ยวชาญออกนอกสถานที่ภายใน 30 นาที · บริการ 24 ชั่วโมง"}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                    {(Array.isArray(data.badges) && data.badges.length > 0 ? data.badges : [
                      "✓ ออกนอกสถานที่",
                      "✓ ช่างมีประสบการณ์",
                      "✓ ราคาโปร่งใส",
                    ]).map((badge: string) => (
                      <span key={badge} className="text-xs text-slate-400 bg-slate-800/60 border border-slate-700/50 px-2.5 py-1 rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto md:min-w-[220px]">
                  <Link
                    href={`tel:${ctaPhone}`}
                    className="group/btn flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-400 active:scale-[0.97] text-white font-bold rounded-2xl px-6 py-4 h-14 md:h-auto transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-400/40 text-base md:text-base"
                  >
                    <PhoneCall className="w-5 h-5 md:w-5 md:h-5 transition-transform group-hover/btn:rotate-12" />
                    <span>โทรด่วน {ctaPhone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}</span>
                  </Link>
                  <Link
                    href={ctaLineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b84d] active:scale-[0.97] text-white font-bold rounded-2xl px-6 py-4 h-14 md:h-auto transition-all duration-200 shadow-lg shadow-[#06C755]/25 hover:shadow-[#06C755]/40 text-base md:text-base"
                  >
                    <MessageCircle className="w-5 h-5 md:w-5 md:h-5 transition-transform group-hover/btn:scale-110" />
                    <span>ติดต่อ LINE</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (type === "gallery") {
      const images = Array.isArray(data.images) ? data.images : [];
      return <Showcase key={section.id} images={images} />;
    }

    if (type === "why-us") {
      const items = Array.isArray(data.items) ? data.items : [];
      return (
        <section key={section.id} id="why-us" className="py-16 md:py-24 px-4 bg-gradient-to-br from-red-600 via-red-600 to-red-700 relative overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-10 md:mb-16">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">{data.badge || "Why Choose Us"}</div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-3 md:mb-4 leading-tight px-2">{section.title || "ทำไมต้องเลือกเรา?"}</h2>
              <p className="text-white/75 max-w-xl mx-auto text-sm md:text-lg px-2">{data.subtitle || "เรามุ่งมั่นให้บริการที่ดีที่สุด เพื่อให้คุณกลับมาใช้รถได้อย่างมั่นใจ"}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {items.map((item: any, idx: number) => (
                <div key={idx} className="group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl md:rounded-2xl p-4 md:p-7 text-center backdrop-blur-sm transition-all duration-300 sm:hover:-translate-y-1">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-5 group-hover:bg-white/30 transition-all text-white [&>svg]:w-7 [&>svg]:h-7 md:[&>svg]:w-10 md:[&>svg]:h-10">
                    {whyUsIconMap[item.icon || "Star"] || whyUsIconMap.Star}
                  </div>
                  <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2 leading-snug">{item.title}</h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (type === "testimonials") {
      const items = Array.isArray(data.items) ? data.items : [];
      return <Testimonials key={section.id} items={items.map((t: any) => ({
        name: t.name || "",
        role: t.role || "",
        avatar: t.avatar || "https://i.pravatar.cc/120",
        rating: t.rating || 5,
        content: t.content || "",
      }))} />;
    }

    if (type === "faq") {
      const items = Array.isArray(data.items) ? data.items : [];
      return (
        <section key={section.id} id="faq" className="py-16 md:py-24 px-4 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.04),transparent_70%)] pointer-events-none" />
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-8 md:mb-14">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">{data.badge || "FAQ"}</div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4 px-2">{section.title || "คำถามที่พบบ่อย"}</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base px-2">{data.subtitle || "รวมคำตอบสำหรับคำถามที่ลูกค้าสอบถามบ่อยที่สุด"}</p>
            </div>
            <div className="space-y-2.5 md:space-y-3">
              {items.map((faq: any, idx: number) => (
                <details key={idx} className="group bg-white rounded-xl md:rounded-2xl border border-slate-200 hover:border-red-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                  <summary className="flex items-center justify-between cursor-pointer p-4 md:p-5 font-semibold text-slate-800 hover:text-red-600 transition-colors select-none list-none text-sm md:text-base">
                    <span className="pr-3 md:pr-4">{faq.question}</span>
                    <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-red-50 group-open:bg-red-600 flex items-center justify-center transition-all">
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-600 group-open:text-white group-open:rotate-45 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    </div>
                  </summary>
                  <div className="px-4 md:px-5 pb-4 md:pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 md:pt-4 text-xs md:text-sm">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (type === "contact") {
      return (
        <section key={section.id} id="contact" className="py-16 md:py-24 px-4 bg-slate-900 relative overflow-hidden">
          {/* Glowing orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[600px] md:h-[600px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-red-700/10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/30 text-red-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 md:mb-6 tracking-widest uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              {data.badge || "พร้อมให้บริการ 24/7"}
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-3 md:mb-5 leading-tight px-2">
              {data.heading || contactHeading}
            </h2>
            <p className="text-slate-400 text-sm md:text-lg mb-6 md:mb-10 max-w-xl mx-auto leading-relaxed px-2">
              {data.description || contactDescription}
            </p>
            {/* CTA Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-2.5 sm:gap-4 mb-8 md:mb-12 px-2">
              <Link
                href={`tel:${data.phone || phone}`}
                className="inline-flex items-center justify-center gap-2 md:gap-3 bg-red-600 hover:bg-red-400 active:scale-[0.97] text-white font-bold text-sm md:text-lg h-12 md:h-16 px-4 md:px-10 rounded-xl md:rounded-2xl transition-all duration-200 shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 sm:hover:-translate-y-1"
              >
                <PhoneCall className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0" />
                <span className="truncate">{(data.phone || phone).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</span>
              </Link>
              <Link
                href={data.lineUrl || lineUrl}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 md:gap-3 bg-[#06C755] hover:bg-[#05b34b] active:scale-[0.97] text-white font-bold text-sm md:text-lg h-12 md:h-16 px-4 md:px-10 rounded-xl md:rounded-2xl transition-all duration-200 shadow-lg shadow-green-600/25 sm:hover:-translate-y-1"
              >
                <MessageCircle className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0" />
                <span className="truncate">Line: {data.lineId || lineId}</span>
              </Link>
            </div>
            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              {(Array.isArray(data.trustSignals) && data.trustSignals.length > 0 ? data.trustSignals : [
                { icon: "MapPin", label: "กรุงเทพฯ และปริมณฑล" },
                { icon: "Clock", label: "บริการตลอด 24 ชั่วโมง" },
                { icon: "Shield", label: "รับประกันคุณภาพงาน" },
              ]).map((t: any, i: number) => {
                const trustIcons: Record<string, React.ReactNode> = {
                  MapPin: <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />,
                  Clock: <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />,
                  Shield: <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />,
                  Star: <Star className="w-3.5 h-3.5 md:w-4 md:h-4" />,
                  Zap: <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" />,
                  ThumbsUp: <ThumbsUp className="w-3.5 h-3.5 md:w-4 md:h-4" />,
                };
                return (
                  <div key={i} className="flex items-center gap-1.5 md:gap-2 text-slate-400 text-xs md:text-sm">
                    <div className="text-red-400">{trustIcons[t.icon] || trustIcons.Star}</div>
                    {t.label}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    if (type === "text") {
      return (
        <section key={section.id} className="py-14 md:py-28 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            {section.title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 md:mb-6 text-center px-2">{section.title}</h2>
            )}
            <div className="text-gray-600 leading-relaxed text-sm md:text-lg whitespace-pre-line">
              {data.body || ""}
            </div>
          </div>
        </section>
      );
    }

    if (type === "image") {
      return (
        <section key={section.id} className="py-10 md:py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            {section.title && (
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 md:mb-6 px-2">{section.title}</h2>
            )}
            {section.imageUrl && (
              <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden" style={getAspectStyle(data.imageRatio)}>
                <Image src={section.imageUrl} alt={data.alt || section.title || ""} fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 90vw, 896px" />
              </div>
            )}
            {data.caption && <p className="text-gray-500 mt-3 md:mt-4 text-sm md:text-base">{data.caption}</p>}
          </div>
        </section>
      );
    }

    if (type === "text-image") {
      const pos = data.imagePosition || "right";
      const isImageLeft = pos === "left";
      const isVertical = pos === "top" || pos === "bottom";
      const isTop = pos === "top";

      return (
        <section key={section.id} className="py-14 md:py-28 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            {section.title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 md:mb-8 text-center px-2">{section.title}</h2>
            )}
            <div className={`flex ${isVertical ? "flex-col" : "flex-col md:flex-row"} gap-5 md:gap-8 items-center`}>
              {(isImageLeft || isTop) && section.imageUrl && (
                <div className={`${isVertical ? "w-full" : "w-full md:w-1/2"} relative rounded-xl sm:rounded-2xl overflow-hidden`} style={getAspectStyle(data.imageRatio)}>
                  <Image src={section.imageUrl} alt={section.title || ""} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                </div>
              )}
              <div className={`${isVertical ? "w-full" : "w-full md:w-1/2"} text-gray-600 leading-relaxed text-sm md:text-lg whitespace-pre-line`}>
                {data.body || ""}
              </div>
              {(!isImageLeft && !isTop) && section.imageUrl && (
                <div className={`${isVertical ? "w-full" : "w-full md:w-1/2"} relative rounded-xl sm:rounded-2xl overflow-hidden`} style={getAspectStyle(data.imageRatio)}>
                  <Image src={section.imageUrl} alt={section.title || ""} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }

    if (type === "header") {
      // Header is now rendered globally in RootLayout, skip here
      return null;
    }

    if (type === "sub-header") {
      const bgColors: Record<string, string> = {
        orange: "bg-gradient-to-r from-red-800 via-red-600 to-red-800",
        blue:   "bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700",
        green:  "bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600",
        red:    "bg-gradient-to-r from-red-700 via-rose-600 to-red-700",
        slate:  "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800",
        black:  "bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950",
      };
      const bgClass = bgColors[data.bgColor || "orange"] || bgColors.orange;
      return (
        <div key={section.id} className={`${bgClass} relative overflow-hidden`}>
          {/* Shimmer line */}
          <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)]" />
          <div className="relative max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-3 py-1 sm:py-2 px-3 sm:px-4 text-[10px] sm:text-sm font-medium text-white whitespace-nowrap overflow-hidden">
            {/* Blinking dot */}
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50" />
              <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/80" />
            </span>
            <span className="truncate min-w-0">{data.text || ""}</span>
            {data.linkUrl && data.linkLabel && (
              <Link
                href={data.linkUrl}
                className="inline-flex items-center gap-1 bg-white/25 hover:bg-white/35 font-bold px-2 sm:px-3 py-0.5 rounded-full transition-all text-[10px] sm:text-xs flex-shrink-0"
              >
                {data.linkLabel}
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      );
    }

    if (type === "footer") {
      // Footer is now rendered globally in RootLayout, skip here
      return null;
    }

    if (type === "custom") {
      return (
        <section key={section.id} className="py-16 px-4">
          <div className="max-w-6xl mx-auto" dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content || "") }} />
        </section>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      {/* Render all sections in order from DB */}
      {orderedSections.map((section: any) => {
        const rendered = renderSection(section);
        if (!rendered) return null;
        const sData = parseJson(section.content);
        const noAnimate = ["header", "sub-header", "footer"].includes(section.type);
        if (noAnimate || !sData.animation || sData.animation === "none") return rendered;
        return (
          <AnimateOnScroll
            key={`anim-${section.id}`}
            animation={sData.animation}
            speed={sData.animationSpeed || "normal"}
            delay={sData.animationDelay || 0}
          >
            {rendered}
          </AnimateOnScroll>
        );
      })}

    </div>
  );
}
