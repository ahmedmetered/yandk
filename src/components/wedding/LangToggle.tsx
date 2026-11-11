import { useI18n } from "@/lib/i18n";
export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="inline-flex rounded-full border border-gold/60 bg-card/80 p-1 text-sm backdrop-blur" role="group" aria-label="Language">
      {(["ar", "en"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}
          style={{ fontFamily: l === "ar" ? "Tajawal" : "Lato" }}>
          {l === "ar" ? "العربية" : "English"}
        </button>
      ))}
    </div>
  );
}
