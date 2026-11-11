import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { wedding } from "@/config/wedding";
import { LangToggle } from "./LangToggle";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const { t, tr } = useI18n();
  const [opening, setOpening] = useState(false);
  const open = () => { if (opening) return; setOpening(true); setTimeout(onOpen, 1500); };
  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background px-6"
      exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="absolute top-5"><LangToggle /></div>
      <p className="font-script text-4xl text-gold shimmer">{tr(wedding.bride)} {t("and")} {tr(wedding.groom)}</p>
      <div className="relative h-56 w-80 [perspective:900px]">
        {/* card inside */}
        <motion.div className="absolute inset-x-4 top-4 h-48 rounded-lg card-ornate flex items-center justify-center"
          animate={opening ? { y: -160, scale: 1.05 } : { y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}>
          <span className="font-display text-xl text-primary">{t("together")}</span>
        </motion.div>
        {/* envelope body */}
        <div className="absolute inset-0 rounded-lg bg-accent shadow-[var(--shadow-card)]" style={{ clipPath: "polygon(0 0,50% 55%,100% 0,100% 100%,0 100%)" }} />
        <div className="absolute inset-0 rounded-lg border border-gold/60 pointer-events-none" />
        {/* flap */}
        <motion.div className="absolute inset-x-0 top-0 h-32 origin-top bg-blush" style={{ clipPath: "polygon(0 0,100% 0,50% 100%)", background: "color-mix(in oklab, var(--rose) 35%, var(--blush))" }}
          animate={opening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }} transition={{ duration: 0.6 }} />
        {/* seal */}
        <motion.button onClick={open} aria-label={t("openInvite")}
          className="absolute left-1/2 top-[6.2rem] z-10 grid size-20 -translate-x-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-gold/50"
          animate={opening ? { scale: 0, opacity: 0 } : { scale: [1, 1.06, 1] }} transition={opening ? { duration: 0.3 } : { repeat: Infinity, duration: 2.4 }}>
          <svg viewBox="0 0 24 24" className="size-8 fill-current"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" /></svg>
        </motion.button>
      </div>
      <button onClick={open} className="rounded-full bg-gold px-8 py-3 font-display text-lg text-foreground shadow-md">{t("openInvite")}</button>
    </motion.div>
  );
}
