import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useId, useRef } from "react";
import { wedding } from "@/config/wedding";
import { useI18n } from "@/lib/i18n";

export function StarPattern({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return <svg className={`star-pattern ${className}`} width="100%" height="100%" aria-hidden="true">
    <defs><pattern id={id} width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M24 5 29.5 10.7 37.4 10.6 37.3 18.5 43 24 37.3 29.5 37.4 37.4 29.5 37.3 24 43 18.5 37.3 10.6 37.4 10.7 29.5 5 24 10.7 18.5 10.6 10.6 18.5 10.7Z" fill="none" stroke="currentColor" strokeWidth=".7" />
    </pattern></defs><rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>;
}

export function Monogram({ className = "" }: { className?: string }) {
  const { tr, t } = useI18n();
  return <span className={`monogram ${className}`} aria-label={`${tr(wedding.bride).charAt(0)} ${t("and")} ${tr(wedding.groom).charAt(0)}`}>
    <span>{tr(wedding.bride).charAt(0)}</span><span className="monogram-and">{t("and")}</span><span>{tr(wedding.groom).charAt(0)}</span>
  </span>;
}

export function PaperLayers({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const back = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const front = useTransform(scrollYProgress, [0, 1], [8, -8]);
  return <div ref={ref} className={`paper-layers ${className}`} aria-hidden="true">
    <motion.div className="paper-arch paper-arch-back" style={{ y: reduced ? 0 : back }} />
    <motion.div className="paper-arch paper-arch-middle" style={{ y: reduced ? 0 : front }} />
    <div className="paper-arch paper-arch-front"><StarPattern /></div>
  </div>;
}

export function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`paper-frame relative ${className}`}><StarPattern /><div className="relative">{children}</div></div>;
}

export function Divider() {
  const reduced = useReducedMotion();
  return <svg viewBox="0 0 300 2" className="foil-divider mx-auto my-12 h-1 w-56" aria-hidden="true">
    <defs><linearGradient id="foil-line"><stop stopColor="var(--gold-deep)" /><stop offset=".5" stopColor="var(--gold-highlight)" /><stop offset="1" stopColor="var(--gold-deep)" /></linearGradient></defs>
    <motion.path d="M0 1H300" stroke="url(#foil-line)" strokeWidth="1" initial={{ pathLength: reduced ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 1.8 }} />
  </svg>;
}

export function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.section className={`paper-section ${className}`} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : .7, delay: reduced ? 0 : delay }}>
    <PaperLayers /><div className="paper-section-content">{children}</div>
  </motion.section>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-7 text-center font-display text-3xl text-gold shimmer">{children}</h2>;
}