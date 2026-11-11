/**
 * ✏️ WEDDING DETAILS — edit everything here.
 * Each text field has an Arabic (ar) and English (en) value.
 */
export type L = { ar: string; en: string };

export const wedding = {
  bride: { ar: "ياسمين", en: "Yasmine" } as L,
  groom: { ar: "كريم", en: "Karim" } as L,
  /** Local date-time of the main celebration (ISO, no timezone = visitor's local time) */
  date: "2027-03-18T20:00:00",
  venue: { ar: "قاعة الزهور", en: "Al Zohour Hall" } as L,
  address: {
    ar: "١٢ شارع النيل، الزمالك، القاهرة",
    en: "12 El Nile Street, Zamalek, Cairo",
  } as L,
  mapLink: "https://maps.google.com/?q=Zamalek,Cairo",
  /** Leave both empty to hide the blessing section */
  blessing: { ar: "", en: "" } as L,
  rsvpDeadline: "2027-03-01",
  maxGuests: 5,
  events: [
    {
      id: "katb",
      show: true,
      title: { ar: "كتب الكتاب", en: "Marriage Contract" } as L,
      start: "2027-03-18T18:00:00",
      durationMinutes: 90,
      place: { ar: "مسجد الزمالك", en: "Zamalek Mosque" } as L,
      address: { ar: "شارع حسن صبري، الزمالك، القاهرة", en: "Hassan Sabry St, Zamalek, Cairo" } as L,
      mapLink: "https://maps.google.com/?q=Zamalek+Mosque,Cairo",
    },
    {
      id: "farah",
      show: true,
      title: { ar: "حفل الفرح", en: "Wedding Celebration" } as L,
      start: "2027-03-18T20:00:00",
      durationMinutes: 300,
      place: { ar: "قاعة الزهور", en: "Al Zohour Hall" } as L,
      address: { ar: "١٢ شارع النيل، الزمالك، القاهرة", en: "12 El Nile Street, Zamalek, Cairo" } as L,
      mapLink: "https://maps.google.com/?q=Zamalek,Cairo",
    },
  ],
  program: [
    { time: "20:00", icon: "glass", title: { ar: "استقبال الضيوف", en: "Guests arrive" } as L },
    { time: "21:00", icon: "rings", title: { ar: "زفة العروسين", en: "The couple's entrance" } as L },
    { time: "22:00", icon: "dinner", title: { ar: "العشاء", en: "Dinner is served" } as L },
    { time: "23:00", icon: "music", title: { ar: "الرقص والاحتفال", en: "Dancing till late" } as L },
  ],
  dressCode: {
    text: {
      ar: "نتمنى أن تشاركونا الفرحة بألوان ناعمة وأنيقة",
      en: "Elegant attire in soft, festive tones would make our day",
    } as L,
    colors: ["#F6C6CF", "#D9667F", "#1F6F5C", "#E6C45B", "#FFF9F0"],
  },
};
