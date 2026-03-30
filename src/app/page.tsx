import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_CONFIG, generateFAQJsonLd, generateBreadcrumbJsonLd, generateWebPageJsonLd } from "@/lib/seo";
import { sanitizeHtml } from "@/lib/sanitize";
import {
  PhoneCall, MessageCircle, Battery, Wrench, Lightbulb, PenTool,
  Clock, Shield, ThumbsUp, Zap, MapPin, Star, ArrowRight, CircleDot, Sparkles,
  CheckCircle2, BatteryCharging,
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
  title: "PORNPISIT BATTERY บริการแบตเตอรี่รถยนต์ 24 ชม. | เปลี่ยนแบตถึงที่",
  description: "บริการเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ 24 ชม. ห้วยขวาง ดินแดง ลาดพร้าว บางกะปิ บางเขน จตุจักร ดุสิต บางซื่อ ถึงไวใน 30 นาที โทรเลย!",
  alternates: {
    canonical: "/",
  },
};

const iconMap: Record<string, React.ReactNode> = {
  Battery: <Battery className="w-7 h-7" />,
  BatteryCharging: <BatteryCharging className="w-7 h-7" />,
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
  Clock: <Clock className="w-10 h-10 text-red-500" />,
  Zap: <Zap className="w-10 h-10 text-red-500" />,
  Shield: <Shield className="w-10 h-10 text-red-500" />,
  ThumbsUp: <ThumbsUp className="w-10 h-10 text-red-500" />,
  Star: <Star className="w-10 h-10 text-red-500" />,
  Battery: <Battery className="w-10 h-10 text-red-500" />,
  BatteryCharging: <BatteryCharging className="w-10 h-10 text-red-500" />,
  CheckCircle2: <CheckCircle2 className="w-10 h-10 text-red-500" />,
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
  const homePage = await (prisma as any).page.findUnique({
    where: { slug: "home" },
    include: { sections: { where: { isActive: true }, orderBy: { order: "asc" } } },
  });

  const sections = homePage?.sections || [];

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

  const orderedSections = sections;

  // Fallback values — PORNPISIT BATTERY
  const heroHeading = heroData.heading || "บริการแบตเตอรี่รถยนต์";
  const heroSubheading = heroData.subheading || "นอกสถานที่ 24 ชั่วโมง";
  const heroDescription = heroData.description || "เปลี่ยนแบตถึงที่รวดเร็วทันใจ โดยช่างผู้เชี่ยวชาญ";
  const heroPhoneUrl = heroData.phoneUrl || "tel:0996731296";
  const heroLineUrl = heroData.lineUrl || "https://lin.ee/OBB86S4";
  const heroImage = heroSection?.imageUrl || "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1920&auto=format&fit=crop";

  const contactHeading = contactData.heading || "แบตหมด? โทรหาเราเลย!";
  const contactDescription = contactData.description || "ทีมช่างพร้อมเปลี่ยนแบตเตอรี่ถึงที่คุณตลอด 24 ชั่วโมง";
  const phone = contactData.phone || "0996731296";
  const lineId = contactData.lineId || "@398kyxfq";
  const lineUrl = contactData.lineUrl || "https://lin.ee/OBB86S4";

  const services = serviceItems.map((s: any) => ({
    title: s.title || "",
    description: s.description || "",
    icon: iconMap[getServiceIconKey(s)] || iconMap.Battery,
    href: s.href || "#",
  }));

  const whyUs = whyUsItems.map((w: any) => ({
    icon: whyUsIconMap[w.icon || "Star"] || whyUsIconMap.Star,
    title: w.title || "",
    description: w.description || "",
  }));

  const testimonials = testimonialItems.map((t: any) => ({
    name: t.name || "",
    role: t.role || "",
    avatar: t.avatar || "https://i.pravatar.cc/120",
    rating: t.rating || 5,
    content: t.content || "",
  }));

  const faqs = faqItems.map((f: any) => ({
    question: f.question || "",
    answer: f.answer || "",
  }));

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
    "บริการแบตเตอรี่รถยนต์นอกสถานที่ 24 ชั่วโมง",
    SITE_CONFIG.description,
    "/"
  );

  /* ────────────────────────────────────────────────── */
  /*  Section Renderer — Premium Redesign              */
  /* ────────────────────────────────────────────────── */
  const renderSection = (section: any) => {
    const data = parseJson(section.content);
    const type = section.type;

    /* ═══════════════════ HERO ═══════════════════ */
    if (type === "hero") {
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
          overlayOpacity: 40,
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

    /* ═══════════════════ SERVICES ═══════════════════ */
    if (type === "services") {
      const items = Array.isArray(data.items) ? data.items : [];
      return (
        <section key={section.id} id="services" className="relative overflow-hidden bg-black py-20 md:py-32 px-4">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-600/[0.03] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-500/[0.02] rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-20">
              <div className="inline-flex items-center gap-2.5 bg-red-600/10 border border-red-500/20 text-red-400 text-[11px] font-bold px-5 py-2 rounded-full mb-5 tracking-[0.2em] uppercase">
                <BatteryCharging className="w-3.5 h-3.5" />
                Our Services
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-5 leading-[1.1] tracking-tight px-2">
                {section.title || "บริการของเรา"}
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed px-2">
                {data.description || "บริการเปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่ ถึงไว บริการ 24 ชม."}
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
              {items.map((svc: any, idx: number) => (
                <Link href={svc.href || "#"} key={idx} className="group">
                  <div className="relative h-full flex flex-col bg-neutral-950 border border-neutral-800/60 rounded-2xl md:rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.15)] sm:hover:-translate-y-1">
                    {/* Top glow line */}
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/60 transition-all duration-500" />
                    {/* Hover bg glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-red-600/0 to-transparent group-hover:from-red-600/[0.04] transition-all duration-500 rounded-3xl" />

                    {/* Number */}
                    <span className="absolute top-4 right-5 text-6xl font-black text-neutral-900/80 group-hover:text-red-600/10 transition-colors duration-500 leading-none select-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 bg-red-600/10 text-red-400 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-600/30 group-hover:scale-110">
                      {iconMap[getServiceIconKey(svc)] || iconMap.Battery}
                    </div>

                    <h3 className="font-bold text-white text-base md:text-lg mb-3 leading-snug pr-8 relative">
                      {svc.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed flex-1 relative">
                      {svc.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 mt-6 text-red-400 text-sm font-semibold group-hover:text-red-300 transition-colors relative">
                      <span>ดูเพิ่มเติม</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/0 to-transparent group-hover:via-red-500/50 transition-all duration-500" />
                  </div>
                </Link>
              ))}
            </div>

            {/* ── Service Areas ── */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2.5 bg-red-600/10 border border-red-500/20 text-red-400 text-[11px] font-bold px-5 py-2 rounded-full mb-5 tracking-[0.2em] uppercase">
                <MapPin className="w-3.5 h-3.5" />
                Service Areas
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                พื้นที่ให้บริการ <span className="text-red-400">แบตเตอรี่รถยนต์</span>
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed mb-8 md:mb-10 px-2">
                ครอบคลุมย่านใจกลางกรุงเทพฯ: ห้วยขวาง ดินแดง ลาดพร้าว บางกะปิ บางเขน จตุจักร ดุสิต บางซื่อ
              </p>
              <div className="flex flex-wrap justify-center gap-2.5 mb-10">
                {["ห้วยขวาง", "ดินแดง", "ลาดพร้าว", "บางกะปิ", "บางเขน", "จตุจักร", "ดุสิต", "บางซื่อ"].map((area) => (
                  <span key={area} className="bg-neutral-900 text-neutral-300 text-xs md:text-sm font-medium px-4 py-2 rounded-full border border-neutral-800 hover:border-red-500/40 hover:bg-red-600/5 transition-all duration-300 cursor-default">
                    <MapPin className="w-3 h-3 inline-block mr-1.5 text-red-400" />{area}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-500 active:scale-[0.97] text-white font-bold text-base md:text-lg h-14 md:h-16 px-8 md:px-10 rounded-2xl transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(220,38,38,0.5)] hover:shadow-[0_8px_30px_-4px_rgba(220,38,38,0.6)]"
                >
                  <PhoneCall className="w-5 h-5" />
                  โทรเรียกช่างด่วน
                </Link>
                <Link
                  href={lineUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b34b] active:scale-[0.97] text-white font-bold text-base md:text-lg h-14 md:h-16 px-8 md:px-10 rounded-2xl transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(6,199,85,0.35)]"
                >
                  <MessageCircle className="w-5 h-5" />
                  แอดไลน์ส่งพิกัด
                </Link>
              </div>
            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════ BATTERY CHECKER ═══════════════════ */
    if (type === "battery-checker") {
      return (
        <section key={section.id} className="relative overflow-hidden bg-neutral-950 py-14 md:py-24 px-4">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-8 md:mb-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                {data.heading || section.title || "เช็ครุ่นแบตเตอรี่รถยนต์ของคุณ"}
              </h3>
              <p className="text-neutral-400 text-sm md:text-base mt-3">
                {data.description || "เลือกยี่ห้อและรุ่นรถเพื่อดูแบตเตอรี่ที่เหมาะสม"}
              </p>
            </div>
            <BatteryChecker showDropdown={data.showDropdown !== false} showBrandGrid={data.showBrandGrid !== false} />
          </div>
        </section>
      );
    }

    /* ═══════════════════ CTA BANNER ═══════════════════ */
    if (type === "cta-banner") {
      const ctaPhone = data.phone || phone;
      const ctaLineUrl = data.lineUrl || lineUrl;
      return (
        <section key={section.id} className="relative overflow-hidden bg-black py-14 md:py-24 px-4">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="relative rounded-3xl overflow-hidden border border-red-500/20 bg-gradient-to-br from-red-950/40 via-neutral-950 to-neutral-950">
              {/* Glow effects */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-600/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

              <div className="relative z-10 px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-red-600/15 border border-red-500/25 text-red-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                    <Zap className="w-3.5 h-3.5" />
                    {data.badge || "พร้อมออกให้บริการทันที"}
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                    {data.heading || "แบตหมด? อย่ารอช้า —"}<br className="hidden sm:block" />
                    <span className="text-red-400"> {data.headingSub || "โทรหาเราได้ทันที"}</span>
                  </h3>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-4">
                    {data.description || "ช่างผู้เชี่ยวชาญออกนอกสถานที่ภายใน 30 นาที · บริการ 24 ชั่วโมง"}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {(Array.isArray(data.badges) && data.badges.length > 0 ? data.badges : [
                      "✓ ออกนอกสถานที่",
                      "✓ ช่างมีประสบการณ์",
                      "✓ ราคาโปร่งใส",
                    ]).map((badge: string) => (
                      <span key={badge} className="text-xs text-neutral-400 bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto md:min-w-[240px]">
                  <Link
                    href={`tel:${ctaPhone}`}
                    className="group/btn flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-500 active:scale-[0.97] text-white font-bold rounded-2xl px-8 py-4 h-14 transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(220,38,38,0.5)] text-base"
                  >
                    <PhoneCall className="w-5 h-5 transition-transform group-hover/btn:rotate-12" />
                    <span>โทรด่วน {ctaPhone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}</span>
                  </Link>
                  <Link
                    href={ctaLineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b84d] active:scale-[0.97] text-white font-bold rounded-2xl px-8 py-4 h-14 transition-all duration-300 shadow-[0_8px_25px_-8px_rgba(6,199,85,0.35)] text-base"
                  >
                    <MessageCircle className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                    <span>ติดต่อ LINE</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════ GALLERY ═══════════════════ */
    if (type === "gallery") {
      const images = Array.isArray(data.images) ? data.images : [];
      return <Showcase key={section.id} images={images} />;
    }

    /* ═══════════════════ WHY US ═══════════════════ */
    if (type === "why-us") {
      const items = Array.isArray(data.items) ? data.items : [];
      return (
        <section key={section.id} id="why-us" className="py-20 md:py-32 px-4 relative overflow-hidden">
          {/* Red gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900" />
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '28px 28px' }} />
          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 md:mb-20">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold px-5 py-2 rounded-full mb-5 tracking-[0.2em] uppercase border border-white/20">
                {data.badge || "Why Choose Us"}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-5 leading-[1.1] tracking-tight px-2">
                {section.title || "ทำไมต้องเลือกเรา?"}
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed px-2">
                {data.subtitle || "เรามุ่งมั่นให้บริการที่ดีที่สุด เพื่อให้คุณกลับมาใช้รถได้อย่างมั่นใจ"}
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {items.map((item: any, idx: number) => (
                <div key={idx} className="group bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] hover:border-white/30 rounded-2xl md:rounded-3xl p-5 md:p-8 text-center backdrop-blur-sm transition-all duration-500 sm:hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)]">
                  <div className="w-14 h-14 md:w-18 md:h-18 mx-auto bg-white/15 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-white/25 group-hover:scale-110 transition-all duration-500 text-white [&>svg]:w-7 [&>svg]:h-7 md:[&>svg]:w-10 md:[&>svg]:h-10">
                    {whyUsIconMap[item.icon || "Star"] || whyUsIconMap.Star}
                  </div>
                  <h3 className="text-sm md:text-lg font-bold text-white mb-2 md:mb-3 leading-snug">{item.title}</h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════ TESTIMONIALS ═══════════════════ */
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

    /* ═══════════════════ FAQ ═══════════════════ */
    if (type === "faq") {
      const items = Array.isArray(data.items) ? data.items : [];
      return (
        <section key={section.id} id="faq" className="py-20 md:py-32 px-4 bg-neutral-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.03),transparent_70%)]" />
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-10 md:mb-16">
              <div className="inline-flex items-center gap-2.5 bg-red-600/10 border border-red-500/20 text-red-400 text-[11px] font-bold px-5 py-2 rounded-full mb-5 tracking-[0.2em] uppercase">
                FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 px-2 leading-[1.1] tracking-tight">
                {section.title || "คำถามที่พบบ่อย"}
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto text-sm md:text-base px-2">
                {data.subtitle || "รวมคำตอบสำหรับคำถามที่ลูกค้าสอบถามบ่อยที่สุด"}
              </p>
            </div>
            <div className="space-y-3">
              {items.map((faq: any, idx: number) => (
                <details key={idx} className="group bg-neutral-900/80 rounded-2xl border border-neutral-800/60 hover:border-red-500/30 overflow-hidden transition-all duration-300 hover:shadow-[0_4px_20px_-6px_rgba(220,38,38,0.1)]">
                  <summary className="flex items-center justify-between cursor-pointer p-5 md:p-6 font-semibold text-white hover:text-red-400 transition-colors select-none list-none text-sm md:text-base">
                    <span className="pr-4">{faq.question}</span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-red-600/10 group-open:bg-red-600 flex items-center justify-center transition-all duration-300">
                      <svg className="w-4 h-4 text-red-400 group-open:text-white group-open:rotate-45 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    </div>
                  </summary>
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-neutral-400 leading-relaxed border-t border-neutral-800/50 pt-4 text-sm">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════ CONTACT ═══════════════════ */
    if (type === "contact") {
      return (
        <section key={section.id} id="contact" className="py-20 md:py-32 px-4 bg-black relative overflow-hidden">
          {/* Dramatic glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-red-600/[0.06] rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-700/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-red-500/[0.03] rounded-full blur-2xl" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-600/15 border border-red-500/25 text-red-300 text-[11px] font-bold px-5 py-2 rounded-full mb-6 md:mb-8 tracking-[0.2em] uppercase">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              {data.badge || "พร้อมให้บริการ 24/7"}
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-[1.05] tracking-tight px-2">
              {data.heading || contactHeading}
            </h2>
            <p className="text-neutral-400 text-base md:text-xl mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed px-2">
              {data.description || contactDescription}
            </p>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-3 sm:gap-4 mb-10 md:mb-14 px-2">
              <Link
                href={`tel:${data.phone || phone}`}
                className="inline-flex items-center justify-center gap-2 md:gap-3 bg-red-600 hover:bg-red-500 active:scale-[0.97] text-white font-bold text-sm md:text-xl h-14 md:h-18 px-6 md:px-12 rounded-2xl transition-all duration-300 shadow-[0_8px_40px_-8px_rgba(220,38,38,0.5)] hover:shadow-[0_12px_50px_-8px_rgba(220,38,38,0.65)] sm:hover:-translate-y-0.5"
              >
                <PhoneCall className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                <span className="truncate">{(data.phone || phone).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</span>
              </Link>
              <Link
                href={data.lineUrl || lineUrl}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 md:gap-3 bg-[#06C755] hover:bg-[#05b34b] active:scale-[0.97] text-white font-bold text-sm md:text-xl h-14 md:h-18 px-6 md:px-12 rounded-2xl transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(6,199,85,0.35)] sm:hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                <span className="truncate">Line: {data.lineId || lineId}</span>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {(Array.isArray(data.trustSignals) && data.trustSignals.length > 0 ? data.trustSignals : [
                { icon: "MapPin", label: "ห้วยขวาง ดินแดง ลาดพร้าว" },
                { icon: "Clock", label: "บริการ 24 ชั่วโมง" },
                { icon: "Shield", label: "รับประกันคุณภาพ" },
              ]).map((t: any, i: number) => {
                const trustIcons: Record<string, React.ReactNode> = {
                  MapPin: <MapPin className="w-4 h-4" />,
                  Clock: <Clock className="w-4 h-4" />,
                  Shield: <Shield className="w-4 h-4" />,
                  Star: <Star className="w-4 h-4" />,
                  Zap: <Zap className="w-4 h-4" />,
                  ThumbsUp: <ThumbsUp className="w-4 h-4" />,
                };
                return (
                  <div key={i} className="flex items-center gap-2 text-neutral-400 text-xs md:text-sm">
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

    /* ═══════════════════ TEXT ═══════════════════ */
    if (type === "text") {
      return (
        <section key={section.id} className="py-16 md:py-28 px-4 bg-neutral-950">
          <div className="max-w-4xl mx-auto">
            {section.title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 md:mb-6 text-center px-2">{section.title}</h2>
            )}
            <div className="text-neutral-300 leading-relaxed text-sm md:text-lg whitespace-pre-line">
              {data.body || ""}
            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════ IMAGE ═══════════════════ */
    if (type === "image") {
      return (
        <section key={section.id} className="py-12 md:py-20 px-4 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            {section.title && (
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 md:mb-6 px-2">{section.title}</h2>
            )}
            {section.imageUrl && (
              <div className="relative w-full rounded-2xl overflow-hidden" style={getAspectStyle(data.imageRatio)}>
                <Image src={section.imageUrl} alt={data.alt || section.title || ""} fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 90vw, 896px" />
              </div>
            )}
            {data.caption && <p className="text-neutral-400 mt-4 text-sm md:text-base">{data.caption}</p>}
          </div>
        </section>
      );
    }

    /* ═══════════════════ TEXT-IMAGE ═══════════════════ */
    if (type === "text-image") {
      const pos = data.imagePosition || "right";
      const isImageLeft = pos === "left";
      const isVertical = pos === "top" || pos === "bottom";
      const isTop = pos === "top";

      return (
        <section key={section.id} className="py-16 md:py-28 px-4 bg-neutral-950">
          <div className="max-w-6xl mx-auto">
            {section.title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-5 md:mb-8 text-center px-2">{section.title}</h2>
            )}
            <div className={`flex ${isVertical ? "flex-col" : "flex-col md:flex-row"} gap-5 md:gap-8 items-center`}>
              {(isImageLeft || isTop) && section.imageUrl && (
                <div className={`${isVertical ? "w-full" : "w-full md:w-1/2"} relative rounded-2xl overflow-hidden`} style={getAspectStyle(data.imageRatio)}>
                  <Image src={section.imageUrl} alt={section.title || ""} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                </div>
              )}
              <div className={`${isVertical ? "w-full" : "w-full md:w-1/2"} text-neutral-300 leading-relaxed text-sm md:text-lg whitespace-pre-line`}>
                {data.body || ""}
              </div>
              {(!isImageLeft && !isTop) && section.imageUrl && (
                <div className={`${isVertical ? "w-full" : "w-full md:w-1/2"} relative rounded-2xl overflow-hidden`} style={getAspectStyle(data.imageRatio)}>
                  <Image src={section.imageUrl} alt={section.title || ""} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════ HEADER (skip — in layout) ═══════════════════ */
    if (type === "header") {
      return null;
    }

    /* ═══════════════════ SUB-HEADER ═══════════════════ */
    if (type === "sub-header") {
      const bgColors: Record<string, string> = {
        orange: "bg-gradient-to-r from-red-800 via-red-600 to-red-800",
        blue: "bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700",
        green: "bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600",
        red: "bg-gradient-to-r from-red-700 via-rose-600 to-red-700",
        slate: "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800",
        black: "bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950",
      };
      const bgClass = bgColors[data.bgColor || "orange"] || bgColors.orange;
      return (
        <div key={section.id} className={`${bgClass} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)]" />
          <div className="relative max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 py-1.5 sm:py-2.5 px-3 sm:px-4 text-[10px] sm:text-sm font-medium text-white whitespace-nowrap overflow-hidden">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50" />
              <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/80" />
            </span>
            <span className="truncate min-w-0">{data.text || ""}</span>
            {data.linkUrl && data.linkLabel && (
              <Link
                href={data.linkUrl}
                className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 font-bold px-2.5 sm:px-3 py-0.5 rounded-full transition-all text-[10px] sm:text-xs flex-shrink-0"
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

    /* ═══════════════════ FOOTER (skip — in layout) ═══════════════════ */
    if (type === "footer") {
      return null;
    }

    /* ═══════════════════ CUSTOM ═══════════════════ */
    if (type === "custom") {
      return (
        <section key={section.id} className="py-16 px-4 bg-black">
          <div className="max-w-6xl mx-auto" dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content || "") }} />
        </section>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
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
