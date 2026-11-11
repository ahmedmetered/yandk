import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { LangCtx, type Lang } from "@/lib/i18n";
import { Envelope } from "@/components/wedding/Envelope";
import { Invitation } from "@/components/wedding/Invitation";
import { Petals } from "@/components/wedding/Petals";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ياسمين وكريم — دعوة زفاف | Yasmine & Karim" },
      { name: "description", content: "دعوة زفاف ياسمين وكريم — ١٨ مارس ٢٠٢٧، قاعة الزهور. أكدوا حضوركم." },
      { property: "og:title", content: "ياسمين وكريم — دعوة زفاف" },
      { property: "og:description", content: "Yasmine & Karim's wedding invitation — March 18, 2027. Kindly RSVP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [lang, setLangState] = useState<Lang>("ar");
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("wedding-lang");
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("wedding-lang", l); };

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <MotionConfig reducedMotion="user">
        <Petals />
        <AnimatePresence>{!opened && <Envelope key="env" onOpen={() => { setOpened(true); window.scrollTo(0, 0); }} />}</AnimatePresence>
        {opened && <Invitation />}
      </MotionConfig>
    </LangCtx.Provider>
  );
}
