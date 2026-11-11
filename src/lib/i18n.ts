import { createContext, useContext } from "react";
import type { L } from "@/config/wedding";

export type Lang = "ar" | "en";

export const strings = {
  openInvite: { ar: "افتح الدعوة", en: "Open the invitation" },
  youAreInvited: { ar: "يتشرفون بدعوتكم لحضور حفل زفافهما", en: "request the pleasure of your company at their wedding" },
  and: { ar: "و", en: "&" },
  together: { ar: "بكل الحب والفرح", en: "With joy in our hearts" },
  countdown: { ar: "العد التنازلي", en: "Counting down" },
  days: { ar: "يوم", en: "Days" },
  hours: { ar: "ساعة", en: "Hours" },
  minutes: { ar: "دقيقة", en: "Minutes" },
  seconds: { ar: "ثانية", en: "Seconds" },
  bigDay: { ar: "اليوم هو يوم الفرح!", en: "Today is the day!" },
  events: { ar: "المناسبات", en: "The Celebrations" },
  openMap: { ar: "افتح الخريطة", en: "Open map" },
  addCal: { ar: "أضف للتقويم", en: "Add to calendar" },
  program: { ar: "برنامج الليلة", en: "The Evening" },
  dress: { ar: "لباس الحفل", en: "Dress Code" },
  rsvp: { ar: "تأكيد الحضور", en: "RSVP" },
  rsvpBy: { ar: "نرجو التأكيد قبل", en: "Kindly reply by" },
  name: { ar: "الاسم الكريم", en: "Your name" },
  namePh: { ar: "اكتب اسمك", en: "Full name" },
  attending: { ar: "هل ستشرفنا بالحضور؟", en: "Will you join us?" },
  yes: { ar: "بكل سرور", en: "Joyfully accept" },
  no: { ar: "أعتذر", en: "Regretfully decline" },
  guests: { ar: "عدد الحضور", en: "Number of guests" },
  message: { ar: "رسالة للعروسين", en: "A note for the couple" },
  messagePh: { ar: "دعواتك وتهانيك…", en: "Your wishes…" },
  send: { ar: "إرسال", en: "Send reply" },
  errName: { ar: "من فضلك اكتب اسمك", en: "Please tell us your name" },
  errAttend: { ar: "من فضلك اختر الحضور أو الاعتذار", en: "Please let us know if you can come" },
  thanksYes: { ar: "شكرًا لك يا {name}! وجودك سيكمل فرحتنا", en: "Thank you, {name}! We can't wait to celebrate with you" },
  thanksNo: { ar: "شكرًا لك يا {name}، سنفتقدك ودعواتك تكفينا", en: "Thank you, {name}. You'll be missed, and your wishes mean the world" },
  again: { ar: "إرسال رد آخر", en: "Send another reply" },
  footer: { ar: "شكرًا لمشاركتكم فرحتنا", en: "Thank you for being part of our story" },
  demo: { ar: "نموذج تجريبي", en: "Demo template" },
} satisfies Record<string, L>;

export type Key = keyof typeof strings;

const easternDigits = "٠١٢٣٤٥٦٧٨٩";
export function num(n: number | string, lang: Lang) {
  const s = String(n);
  return lang === "ar" ? s.replace(/\d/g, (d) => easternDigits.charAt(+d)) : s;
}

export function fmtDate(iso: string, lang: Lang, withWeekday = true) {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
    weekday: withWeekday ? "long" : undefined,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function fmtTime(iso: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "ar",
  setLang: () => {},
});

export function useI18n() {
  const { lang, setLang } = useContext(LangCtx);
  const t = (k: Key) => strings[k][lang];
  const tr = (v: L) => v[lang];
  return { lang, setLang, t, tr, dir: lang === "ar" ? "rtl" : "ltr" as "rtl" | "ltr" };
}
