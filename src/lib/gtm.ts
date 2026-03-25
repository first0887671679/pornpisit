"use client";

export function trackEvent(eventName: string, eventData?: Record<string, string>) {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
}

export function trackPhoneClick() {
  trackEvent("phone_click", { action: "click", label: "phone_call" });
}

export function trackLineClick() {
  trackEvent("line_click", { action: "click", label: "line_add" });
}

export function trackFormSubmit() {
  trackEvent("form_submit", { action: "submit", label: "contact_form" });
}
