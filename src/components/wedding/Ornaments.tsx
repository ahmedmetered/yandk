import { motion } from "framer-motion";

export function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden fill="none">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B8860B" /><stop offset=".5" stopColor="#E6C45B" /><stop offset="1" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      <g stroke="url(#g)" strokeWidth="1.4" strokeLinecap="round">
        <path d="M4 76V20Q4 4 20 4h56" />
        <path d="M10 70V24Q10 10 24 10h46" opacity=".6" />
        <path d="M14 14c8 0 14 6 14 14-6 0-14-6-14-14Z" fill="url(#g)" fillOpacity=".25" />
        <path d="M28 14c6-4 14-4 18 2M14 28c-4 6-4 14 2 18" />
        <circle cx="34" cy="34" r="2.5" fill="url(#g)" />
      </g>
    </svg>
  );
}

export function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`card-ornate relative p-6 ${className}`}>
      <Corner className="absolute top-1 left-1 size-12" />
      <Corner className="absolute top-1 right-1 size-12 -scale-x-100" />
      <Corner className="absolute bottom-1 left-1 size-12 -scale-y-100" />
      <Corner className="absolute bottom-1 right-1 size-12 -scale-100" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function Divider() {
  return (
    <svg viewBox="0 0 300 30" className="mx-auto my-10 h-7 w-64" aria-hidden fill="none">
      <defs>
        <linearGradient id="dg" x1="0" x2="1"><stop offset="0" stopColor="#B8860B" stopOpacity="0" /><stop offset=".5" stopColor="#E6C45B" /><stop offset="1" stopColor="#B8860B" stopOpacity="0" /></linearGradient>
      </defs>
      <motion.path d="M10 15H125M175 15H290" stroke="url(#dg)" strokeWidth="1.5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeInOut" }} />
      <motion.path d="M150 4c6 6 6 16 0 22-6-6-6-16 0-22Zm-14 11c6-4 10-4 14 0-4 4-8 4-14 0Zm28 0c-6-4-10-4-14 0 4 4 8 4 14 0Z"
        fill="#D9667F" fillOpacity=".8" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }} style={{ transformOrigin: "150px 15px" }} />
    </svg>
  );
}

export function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.section className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay, ease: "easeOut" }}>
      {children}
    </motion.section>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-6 text-center font-display text-3xl text-gold shimmer">{children}</h2>;
}
