import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { wedding } from "@/config/wedding";
import { Button } from "@/components/ui/button";
import { LangToggle } from "./LangToggle";
import { Monogram, StarPattern } from "./Ornaments";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const { t, tr } = useI18n();
  const [opening, setOpening] = useState(false);
  const reduced = useReducedMotion();
  const open = () => { if (opening) return; setOpening(true); setTimeout(onOpen, reduced ? 0 : 1800); };
  return <motion.div className="envelope-screen fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6" exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .5 }}>
    <div className="envelope-backdrop" aria-hidden="true"><div className="envelope-backdrop-arch" /><div className="envelope-backdrop-scallop" /></div>
    <div className="absolute top-5 z-20"><LangToggle /></div>
    <p className="envelope-names relative z-10 mb-10 text-center font-script text-5xl leading-relaxed text-gold shimmer">{tr(wedding.bride)} {t("and")} {tr(wedding.groom)}</p>
    <div className="envelope-object relative [perspective:1000px]">
      <div className="envelope-lining absolute inset-0"><StarPattern /></div>
      <motion.div className="envelope-card absolute inset-x-5 top-4 flex flex-col items-center justify-center gap-5 bg-background" animate={opening ? { y: -145 } : { y: 0 }} transition={{ delay: .65, duration: .9 }}>
        <Monogram className="text-primary" /><span className="font-display text-xl text-secondary">{t("together")}</span>
      </motion.div>
      <div className="envelope-pocket absolute inset-0" />
      <motion.div className="envelope-flap absolute inset-x-0 top-0 origin-top" animate={opening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }} transition={{ delay: .3, duration: .65 }} />
      <Button onClick={open} variant="ghost" aria-label={t("openInvite")} disabled={opening} className="wax-seal absolute left-1/2 z-10 -translate-x-1/2 rounded-full p-0 hover:bg-transparent disabled:opacity-100">
        {[0, 1].map((half) => <motion.span key={half} className={`seal-half seal-half-${half}`} animate={opening ? { x: half ? 48 : -48, y: half ? 32 : 22, rotate: half ? 26 : -26, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }} transition={{ duration: .65 }}><Monogram /></motion.span>)}
      </Button>
    </div>
    <Button onClick={open} variant="link" disabled={opening} className="relative z-10 mt-10 h-auto whitespace-normal font-display text-xl text-secondary underline underline-offset-8">{t("openInvite")}<span aria-hidden="true">↗</span></Button>
  </motion.div>;
}