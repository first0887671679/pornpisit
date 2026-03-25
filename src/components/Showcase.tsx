import Image from "next/image";

interface ShowcaseProps {
  images?: { src: string; alt: string; caption: string; imageRatio?: string }[];
}

const defaultImages = [
  {
    src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1600&auto=format&fit=crop",
    alt: "เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่",
    caption: "เปลี่ยนแบตเตอรี่ถึงที่ เร็ว ปลอดภัย"
  },
  {
    src: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1600&auto=format&fit=crop",
    alt: "ตรวจเช็คระบบไฟ",
    caption: "ตรวจเช็คระบบไฟด้วยอุปกรณ์มาตรฐาน"
  },
  {
    src: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=1600&auto=format&fit=crop",
    alt: "ซ่อมไดชาร์จ ไดสตาร์ท",
    caption: "ซ่อมไดชาร์จ ไดสตาร์ท โดยช่างผู้เชี่ยวชาญ"
  },
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop",
    alt: "รถยนต์พร้อมใช้งาน",
    caption: "รถของคุณกลับมาพร้อมใช้งานได้ทันที"
  },
  {
    src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1600&auto=format&fit=crop",
    alt: "ปะยางนอกสถานที่",
    caption: "ปะยางนอกสถานที่ 24 ชั่วโมง"
  },
  {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1600&auto=format&fit=crop",
    alt: "บริการถึงที่",
    caption: "พร้อมออกให้บริการทุกพื้นที่ในกรุงเทพและปริมณฑล"
  },
];

function getAspectRatio(ratio?: string): string | undefined {
  if (!ratio || ratio === "free") return undefined;
  return ratio.replace(":", "/");
}

const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A";

export default function Showcase({ images }: ShowcaseProps) {
  const displayImages = images && images.length > 0 ? images : defaultImages;
  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.06),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            ผลงานของเรา
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 md:mb-3 px-2">
            ภาพหน้างาน<span className="text-orange-500">จริง</span>
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm md:text-base px-2">ให้ผลงานเป็นเครื่องพิสูจน์ความเป็นมืออาชีพของเรา</p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
          {displayImages.map((img, idx) => {
            const ar = getAspectRatio((img as any).imageRatio);
            const isFeatured = idx === 0;
            return (
              <div
                key={idx}
                className={`relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 sm:hover:-translate-y-1 ${
                  isFeatured ? "col-span-2 sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {ar ? (
                  <div className="relative w-full" style={{ aspectRatio: ar }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={idx < 2}
                      quality={85}
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={idx < 2}
                      quality={85}
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Overlay — always visible on mobile, hover on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-400" />

                {/* Caption — always visible on mobile */}
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 sm:translate-y-2 sm:group-hover:translate-y-0 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-xs sm:text-sm font-semibold leading-snug line-clamp-2">{img.caption}</p>
                  </div>
                )}

                {/* Index badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-5 h-5 sm:w-7 sm:h-7 bg-orange-500/90 backdrop-blur-sm rounded-md sm:rounded-lg flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-[10px] sm:text-xs font-bold">{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-slate-400 text-xs sm:text-sm">ผลงานกว่า <span className="text-orange-500 font-bold">1,000+</span> งานทั่วกรุงเทพและปริมณฑล</p>
        </div>
      </div>
    </section>
  );
}
