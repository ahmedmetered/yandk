import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { num, useI18n, type Key } from "@/lib/i18n";

function Digit({ value }: { value: string }) {
  return (
    <div className="relative h-14 w-16 overflow-hidden rounded-xl bg-secondary text-secondary-foreground shadow-inner [perspective:300px]">
      <div className="absolute inset-x-0 top-1/2 h-px bg-background/30 z-10" />
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span key={value} className="absolute inset-0 grid place-items-center text-3xl font-bold tabular-nums"
          initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.45 }}>{value}</motion.span>
      </AnimatePresence>
    </div>
  );
}

export function Countdown({ target }: { target: string }) {
  const { t, lang } = useI18n();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const diff = Math.max(0, new Date(target).getTime() - (now ?? 0));
  if (now !== null && diff === 0) return <p className="text-center font-display text-2xl text-primary">{t("bigDay")}</p>;
  const parts: [number, Key][] = [
    [Math.floor(diff / 864e5), "days"], [Math.floor(diff / 36e5) % 24, "hours"],
    [Math.floor(diff / 6e4) % 60, "minutes"], [Math.floor(diff / 1e3) % 60, "seconds"],
  ];
  return (
    <div className="flex justify-center gap-2">
      {parts.map(([v, k]) => (
        <div key={k} className="flex flex-col items-center gap-1">
          <Digit value={now === null ? "–" : num(String(v).padStart(2, "0"), lang)} />
          <span className="text-xs text-muted-foreground">{t(k)}</span>
        </div>
      ))}
    </div>
  );
}
