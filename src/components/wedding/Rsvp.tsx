import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { num, fmtDate, useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { wedding } from "@/config/wedding";

type Reply = { name: string; attending: boolean; guests: number; message: string };

function Hearts() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <motion.svg key={i} viewBox="0 0 24 24" className={`absolute left-1/2 top-1/3 size-5 ${i % 2 ? "fill-rose" : "fill-blush"}`}
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
  const reduced = useReducedMotion();
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
    <div className="reply-card relative">
      <p className="mb-5 text-center text-sm text-muted-foreground">{t("rsvpBy")} <b className="text-primary">{fmtDate(wedding.rsvpDeadline, lang, false)}</b></p>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" className="relative px-5 py-10 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Hearts />
            <p className="font-display text-2xl leading-relaxed text-primary">{t(done.attending ? "thanksYes" : "thanksNo").replace("{name}", done.name)}</p>
            <Button variant="link" onClick={reset} className="mt-6 text-sm text-secondary underline underline-offset-4">{t("again")}</Button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} className="reply-form space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .85 }} noValidate>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">{t("name")}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder={t("namePh")}
                className="w-full rounded-sm border-0 border-b border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
              {errors.name && <span className="mt-1 block text-sm text-destructive">{t("errName")}</span>}
            </label>
            <div>
              <span className="mb-2 block text-sm font-medium">{t("attending")}</span>
              <div className="relative grid grid-cols-2 rounded-sm bg-muted p-1">
                {attending !== null && (
                  <motion.div layout className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-sm ${attending ? "bg-secondary" : "bg-primary"}`}
                    style={{ insetInlineStart: attending ? 4 : "50%" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                {[true, false].map((v) => (
                  <Button variant="ghost" type="button" key={String(v)} onClick={() => setAttending(v)} aria-pressed={attending === v}
                    className={`relative z-10 h-auto rounded-sm py-2.5 hover:bg-transparent text-sm transition-colors ${attending === v ? "text-primary-foreground" : ""}`}>
                    {t(v ? "yes" : "no")}
                  </Button>
                ))}
              </div>
              {errors.attend && <span className="mt-1 block text-sm text-destructive">{t("errAttend")}</span>}
            </div>
            <AnimatePresence>
              {attending && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <span className="mb-2 block text-sm font-medium">{t("guests")}</span>
                  <div className="flex items-center justify-center gap-6">
                    <Button type="button" aria-label="-" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1}
                      variant="ghost" className="size-11 rounded-sm bg-accent text-2xl disabled:opacity-40">−</Button>
                    <motion.span key={guests} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="w-8 text-center text-3xl font-bold text-secondary">{num(guests, lang)}</motion.span>
                    <Button type="button" aria-label="+" onClick={() => setGuests((g) => Math.min(wedding.maxGuests, g + 1))} disabled={guests >= wedding.maxGuests}
                      variant="ghost" className="size-11 rounded-sm bg-accent text-2xl disabled:opacity-40">+</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">{t("message")}</span>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={500} rows={3} placeholder={t("messagePh")}
                className="w-full rounded-sm border-0 border-b border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <motion.div className="reply-stub" exit={reduced ? { opacity: 0 } : { x: 90, y: 75, rotate: 12, opacity: 0 }} transition={{ duration: .75, ease: "easeIn" }}><Button type="submit" className="h-auto w-full rounded-sm bg-secondary py-3.5 font-display text-lg text-secondary-foreground hover:bg-secondary/90">{t("send")}<span aria-hidden="true">↗</span></Button></motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
