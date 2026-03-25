// Centralized SEO Configuration for Firstcar
// Update these values to match your actual business information

export const SITE_CONFIG = {
  name: "FIRSTCARCENTER",
  siteName: "FIRSTCARCENTER บริการดูแลรักษารถยนต์นอกสถานที่ 24 ชม.",
  url: "https://firstcarcenterthailand.com",
  locale: "th_TH",
  language: "th",
  phone: "0887671679",
  phoneFormatted: "088-767-1679",
  lineId: "@730ohrmd",
  lineUrl: "https://lin.ee/xxqKaZn",
  email: "info@firstcar-service.com",
  facebook: "https://www.facebook.com/profile.php?id=61577014751997",
  googleMap: "https://maps.app.goo.gl/Ur2fJNEtkoq8NxXE8",
  address: {
    street: "123 Main St",
    locality: "Bangkok",
    region: "Bangkok",
    postalCode: "10110",
    country: "TH",
  },
  geo: {
    latitude: 13.7563,
    longitude: 100.5018,
  },
  logo: "https://firstcarcenterthailand.com/opengraph-image",
  ogImage: "https://firstcarcenterthailand.com/opengraph-image",
  description:
    "FIRSTCARCENTER ช่างซ่อมรถนอกสถานที่ 24 ชม. บริการช่วยเหลือรถเสียฉุกเฉิน โซนบางนา ศรีนครินทร์ สมุทรปราการ ปะยาง เปลี่ยนแบตเตอรี่ ไดชาร์จ ไดสตาร์ท ขัดสีรถ ขัดไฟหน้า ถึงไวใน 30 นาที",
  shortDescription:
    "FIRSTCARCENTER ช่างซ่อมรถนอกสถานที่ ถึงไวใน 30 นาที ปะยาง เปลี่ยนแบต ไดชาร์จ ขัดสี โซนบางนา ศรีนครินทร์ สมุทรปราการ",
  keywords: [
    "ช่างซ่อมรถนอกสถานที่",
    "ช่างซ่อมรถนอกสถานที่ 24 ชม",
    "ช่วยเหลือรถเสียฉุกเฉิน",
    "ปะยางนอกสถานที่ 24 ชม",
    "ร้านปะยางใกล้ฉัน",
    "ปะยางนอกสถานที่ บางนา",
    "เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่",
    "ร้านแบตเตอรี่รถยนต์ใกล้ฉัน",
    "ร้านแบตเตอรี่ บางนา ศรีนครินทร์",
    "ซ่อมไดชาร์จนอกสถานที่",
    "เปลี่ยนไดสตาร์ทนอกสถานที่",
    "ขัดสีรถยนต์นอกสถานที่",
    "ขัดไฟหน้ารถนอกสถานที่",
    "ช่างซ่อมรถ บางนา",
    "ช่างซ่อมรถ ศรีนครินทร์",
    "ช่างซ่อมรถ สมุทรปราการ",
    "ซ่อมรถนอกสถานที่ เทพารักษ์",
    "บริการรถยนต์ฉุกเฉิน 24 ชั่วโมง",
  ],
};

// JSON-LD Structured Data: LocalBusiness
export function generateLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.siteName,
    alternateName: "FIRSTCARCENTER Service",
    image: SITE_CONFIG.logo,
    logo: {
      "@type": "ImageObject",
      url: SITE_CONFIG.logo,
    },
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.locality,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    currenciesAccepted: "THB",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    areaServed: [
      {
        "@type": "City",
        name: "สมุทรปราการ",
        containsPlace: [
          { "@type": "Place", name: "ศรีนครินทร์" },
          { "@type": "Place", name: "เทพารักษ์" },
          { "@type": "Place", name: "แพรกษา" },
          { "@type": "Place", name: "วัดด่านสำโรง" },
          { "@type": "Place", name: "วัดหนามแดง" },
        ],
      },
      {
        "@type": "City",
        name: "กรุงเทพมหานคร",
        containsPlace: [
          { "@type": "Place", name: "สุขุมวิท" },
          { "@type": "Place", name: "บางนา" },
          { "@type": "Place", name: "แบริ่ง" },
          { "@type": "Place", name: "ลาซาล" },
        ],
      },
    ],
    sameAs: [SITE_CONFIG.lineUrl, SITE_CONFIG.facebook, SITE_CONFIG.googleMap],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "บริการดูแลรักษารถยนต์",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "ปะยางนอกสถานที่ 24 ชม.",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "ปะยางนอกสถานที่ 24 ชม.",
                url: `${SITE_CONFIG.url}/mobile-tire-repair`,
                description:
                  "บริการปะยางนอกสถานที่ตลอด 24 ชั่วโมง โซนบางนา ศรีนครินทร์ สมุทรปราการ ถึงไวใน 30 นาที",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "เปลี่ยนแบตเตอรี่รถยนต์นอกสถานที่",
                url: `${SITE_CONFIG.url}/battery-replacement`,
                description:
                  "บริการเปลี่ยนแบตเตอรี่รถยนต์ถึงที่ รวดเร็วทันใจ พร้อมเช็คระบบไฟฟรี รับประกัน 1 ปีเต็ม",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "ซ่อม/เปลี่ยน ไดชาร์จ ไดสตาร์ท",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "ซ่อม/เปลี่ยน ไดชาร์จ ไดสตาร์ท",
                url: `${SITE_CONFIG.url}/alternator-starter`,
                description:
                  "ตรวจเช็คและซ่อมไดชาร์จ ไดสตาร์ทนอกสถานที่ อะไหล่แท้ทุกชิ้น วิเคราะห์ด้วย OBD",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "ขัดสีรถ ลบรอย ขัดไฟหน้า",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "ขัดสีรถ ลบรอย ขัดไฟหน้า",
                url: `${SITE_CONFIG.url}/car-polishing`,
                description:
                  "บริการขัดสีรถลบรอย ขัดไฟหน้าเหลืองให้ใสปิ๊ง นอกสถานที่ถึงบ้าน ไม่ต้องทิ้งรถที่ร้าน",
              },
            },
          ],
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// JSON-LD: WebSite with SearchAction
export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.siteName,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: SITE_CONFIG.language,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
  };
}

// JSON-LD: WebPage
export function generateWebPageJsonLd(
  title: string,
  description: string,
  path: string = "/"
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_CONFIG.url}${path}#webpage`,
    url: `${SITE_CONFIG.url}${path}`,
    name: title,
    description: description,
    isPartOf: {
      "@id": `${SITE_CONFIG.url}/#website`,
    },
    about: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: SITE_CONFIG.language,
  };
}

// JSON-LD: BreadcrumbList
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// JSON-LD: FAQ
export function generateFAQJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// JSON-LD: Service
export function generateServiceJsonLd(
  name: string,
  description: string,
  path: string
) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}${cleanPath}#service`,
    name: name,
    description: description,
    url: `${SITE_CONFIG.url}${cleanPath}`,
    provider: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    areaServed: [
      {
        "@type": "City",
        name: "กรุงเทพมหานคร",
      },
      {
        "@type": "City",
        name: "สมุทรปราการ",
      },
    ],
    serviceType: "Auto Repair",
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: SITE_CONFIG.phone,
      serviceUrl: `${SITE_CONFIG.url}${cleanPath}`,
    },
  };
}
