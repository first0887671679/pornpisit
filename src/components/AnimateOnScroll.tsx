"use client";

import { useEffect, useRef, useState } from "react";

const ANIMATIONS: Record<string, { from: string; to: string }> = {
  fadeIn: {
    from: "opacity-0",
    to: "opacity-100",
  },
  fadeInUp: {
    from: "opacity-0 translate-y-10",
    to: "opacity-100 translate-y-0",
  },
  fadeInDown: {
    from: "opacity-0 -translate-y-10",
    to: "opacity-100 translate-y-0",
  },
  fadeInLeft: {
    from: "opacity-0 -translate-x-10",
    to: "opacity-100 translate-x-0",
  },
  fadeInRight: {
    from: "opacity-0 translate-x-10",
    to: "opacity-100 translate-x-0",
  },
  zoomIn: {
    from: "opacity-0 scale-90",
    to: "opacity-100 scale-100",
  },
  zoomOut: {
    from: "opacity-0 scale-110",
    to: "opacity-100 scale-100",
  },
  slideUp: {
    from: "opacity-0 translate-y-16",
    to: "opacity-100 translate-y-0",
  },
  slideDown: {
    from: "opacity-0 -translate-y-16",
    to: "opacity-100 translate-y-0",
  },
  bounceIn: {
    from: "opacity-0 scale-75",
    to: "opacity-100 scale-100",
  },
  flipIn: {
    from: "opacity-0 rotateX-90",
    to: "opacity-100 rotateX-0",
  },
};

const SPEED_MAP: Record<string, string> = {
  slow: "duration-[1200ms]",
  normal: "duration-700",
  fast: "duration-[400ms]",
};

interface AnimateOnScrollProps {
  animation?: string;
  speed?: string;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

export default function AnimateOnScroll({
  animation = "none",
  speed = "normal",
  delay = 0,
  children,
  className = "",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!animation || animation === "none") {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay]);

  if (!animation || animation === "none") {
    return <div className={className}>{children}</div>;
  }

  const anim = ANIMATIONS[animation];
  if (!anim) {
    return <div className={className}>{children}</div>;
  }

  const speedCls = SPEED_MAP[speed] || SPEED_MAP.normal;

  // For bounceIn we add a special bounce easing
  const easingCls = animation === "bounceIn"
    ? "ease-[cubic-bezier(0.34,1.56,0.64,1)]"
    : "ease-out";

  return (
    <div
      ref={ref}
      className={`transition-all ${speedCls} ${easingCls} ${visible ? anim.to : anim.from} ${className}`}
      style={animation === "flipIn" ? {
        transform: visible ? "perspective(600px) rotateX(0deg)" : "perspective(600px) rotateX(90deg)",
        opacity: visible ? 1 : 0,
        transition: `all ${speed === "slow" ? "1.2s" : speed === "fast" ? "0.4s" : "0.7s"} ${easingCls === "ease-out" ? "ease-out" : easingCls}`,
      } : undefined}
    >
      {children}
    </div>
  );
}
