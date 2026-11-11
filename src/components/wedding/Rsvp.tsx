import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { num, fmtDate, useI18n } from "@/lib/i18n";
import { wedding } from "@/config/wedding";

type Reply = { name: string; attending: boolean; guests: number; message: string };

function Hearts() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <motion.svg key={i} viewBox="0 0 24 24" className={`absolute left-1/2 top-1/3 size-5 ${i % 2 ? "fill-rose" : "fill-gold"}`}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }} animate={{ x: Math.cos(a) * 130, y: Math.sin(a) * 110, scale: 1.2, opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}>
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" />
          </motion.svg>
        );
      })}
    </div>
  );
}

export function Rsvp() {
  const { t, lang } = useI18n();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; attend?: boolean }>({});
  const [, setReplies] = useState<Reply[]>([]);
  const [done, setDone] = useState<Reply | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = z.string().trim().min(1).max(100).safeParse(name);
    const errs = { name: !n.success, attend: attending === null };
    setErrors(errs);
    if (errs.name || errs.attend) return;
    const r = { name: name.trim(), attending: !!attending, guests: attending ? guests : 0, message: message.trim().slice(0, 500) };
    setReplies((p) => [...p, r]);
    setDone(r);
  };
  const reset = () => { setName(""); setAttending(null); setGuests(1); setMessage(""); setDone(null); };

  return (
    <div className="relative">
      <p className="mb-5 text-center text-sm text-muted-foreground">{t("rsvpBy")} <b className="text-primary">{fmtDate(wedding.rsvpDeadline, lang, false)}</b></p>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" className="relative py-10 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Hearts />
            <p className="font-display text-2xl leading-relaxed text-primary">{t(done.attending ? "thanksYes" : "thanksNo").replace("{name}", done.name)}</p>
            <button onClick={reset} className="mt-6 text-sm text-secondary underline underline-offset-4">{t("again")}</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} noValidate>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">{t("name")}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder={t("namePh")}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
              {errors.name && <span className="mt-1 block text-sm text-destructive">{t("errName")}</span>}
            </label>
            <div>
              <span className="mb-2 block text-sm font-medium">{t("attending")}</span>
              <div className="relative grid grid-cols-2 rounded-full border border-input bg-muted p-1">
                {attending !== null && (
                  <motion.div layout className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full ${attending ? "bg-secondary" : "bg-primary"}`}
                    style={{ insetInlineStart: attending ? 4 : "50%" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                {[true, false].map((v) => (
                  <button type="button" key={String(v)} onClick={() => setAttending(v)} aria-pressed={attending === v}
                    className={`relative z-10 rounded-full py-2.5 text-sm transition-colors ${attending === v ? "text-primary-foreground" : ""}`}>
                    {t(v ? "yes" : "no")}
                  </button>
                ))}
              </div>
              {errors.attend && <span className="mt-1 block text-sm text-destructive">{t("errAttend")}</span>}
            </div>
            <AnimatePresence>
              {attending && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <span className="mb-2 block text-sm font-medium">{t("guests")}</span>
                  <div className="flex items-center justify-center gap-6">
                    <button type="button" aria-label="-" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1}
                      className="size-11 rounded-full border border-gold text-2xl disabled:opacity-40">−</button>
                    <motion.span key={guests} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="w-8 text-center text-3xl font-bold text-secondary">{num(guests, lang)}</motion.span>
                    <button type="button" aria-label="+" onClick={() => setGuests((g) => Math.min(wedding.maxGuests, g + 1))} disabled={guests >= wedding.maxGuests}
                      className="size-11 rounded-full border border-gold text-2xl disabled:opacity-40">+</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">{t("message")}</span>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={500} rows={3} placeholder={t("messagePh")}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <button type="submit" className="w-full rounded-full bg-primary py-3.5 font-display text-lg text-primary-foreground shadow-[var(--shadow-card)] active:scale-[.98]">{t("send")}</button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
