import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
export function LangToggle() {
  const { lang, setLang } = useI18n();
  return <div className="language-toggle inline-flex items-center gap-1 bg-background p-1 text-sm" role="group" aria-label="Language">
    {(["ar", "en"] as const).map((l) => <Button variant="ghost" size="sm" key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-sm px-3 ${l === "ar" ? "language-ar" : "language-en"} ${lang === l ? "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground" : "text-secondary"}`}>{l === "ar" ? "العربية" : "English"}</Button>)}
  </div>;
}