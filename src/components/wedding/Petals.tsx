import { useMemo } from "react";

export function Petals() {
  const petals = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    left: (i * 37) % 100, delay: (i * 1.7) % 14, dur: 12 + ((i * 5) % 9), size: 10 + ((i * 7) % 10),
    drift: ((i % 2 ? 1 : -1) * (20 + (i * 13) % 60)) + "px", tone: i % 3,
  })), []);
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <svg key={i} viewBox="0 0 20 20" className="petal absolute -top-8"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, ["--drift" as string]: p.drift }}>
          <path d="M10 1C15 5 17 11 10 19 3 11 5 5 10 1Z"
            className={p.tone === 0 ? "fill-rose/70" : p.tone === 1 ? "fill-blush" : "fill-rose/40"} />
        </svg>
      ))}
    </div>
  );
}
