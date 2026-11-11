import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { fmtDate, fmtTime, num, useI18n } from "@/lib/i18n";
import { downloadIcs } from "@/lib/ics";
import { Divider, FadeUp, Frame, SectionTitle, Monogram, PaperLayers } from "./Ornaments";
import { Countdown } from "./Countdown";
import { Rsvp } from "./Rsvp";
import { LangToggle } from "./LangToggle";

const icons: Record<string, string> = {
  glass: "M8 2h8l-1 7a3 3 0 0 1-6 0L8 2Zm4 10v7m-4 3h8",
  rings: "M9 14a5 5 0 1 0 0 .01M15 14a5 5 0 1 0 0 .01M10 4l2-2 2 2",
  dinner: "M4 3v8a2 2 0 0 0 4 0V3M6 11v10M18 3c-2 0-3 3-3 7h3v11",
  music: "M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
};

export function Invitation() {
  const { t, tr, lang, dir } = useI18n();
  const blessing = tr(wedding.blessing).trim();
  const slide = dir === "rtl" ? 40 : -40;

  return (
    <motion.main key={lang} className="invitation relative mx-auto max-w-2xl px-5 pb-16"
      initial={{ opacity: 0, x: slide }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
      <header className="sticky top-0 z-30 -mx-5 mb-4 flex items-center justify-between bg-background/80 px-5 py-3 backdrop-blur">
        <Monogram className="header-monogram text-secondary" />
        <LangToggle />
      </header>

      <motion.section className="invitation-cover relative pt-6" initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
        <PaperLayers className="cover-layers" /><div className="cover-content relative px-6 py-16 text-center">
          <p className="text-sm text-secondary">{t("together")}</p>
          <h1 className="my-6 font-script text-6xl leading-[1.4] text-gold shimmer">
            {tr(wedding.bride)}<span className="mx-2 block text-3xl text-primary">{t("and")}</span>{tr(wedding.groom)}
          </h1>
          <p className="text-muted-foreground">{t("youAreInvited")}</p>
          <div className="mx-auto my-6 h-px w-24 bg-gold" />
          <p className="font-display text-xl text-primary">{fmtDate(wedding.date, lang)}</p>
          <p className="mt-1 text-secondary">{fmtTime(wedding.date, lang)} · {tr(wedding.venue)}</p>
        </div>
      </motion.section>

      {blessing && (<><Divider /><FadeUp><p className="text-center font-display text-2xl leading-relaxed text-secondary">{blessing}</p></FadeUp></>)}

      <Divider />
      <FadeUp><SectionTitle>{t("countdown")}</SectionTitle><Countdown target={wedding.date} /></FadeUp>

      <Divider />
      <FadeUp>
        <SectionTitle>{t("events")}</SectionTitle>
        <div className="event-grid grid gap-6 sm:grid-cols-2">
          {wedding.events.filter((e) => e.show).map((e, i) => (
            <motion.div key={e.id} initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
              <Frame className="text-center">
                <h3 className="font-display text-2xl text-primary">{tr(e.title)}</h3>
                <p className="mt-2 text-lg font-bold text-secondary">{fmtTime(e.start, lang)}</p>
                <p className="mt-1">{tr(e.place)}</p>
                <p className="text-sm text-muted-foreground">{tr(e.address)}</p>
                <div className="mt-4 flex justify-center gap-2">
                  <Button asChild variant="secondary" className="h-auto rounded-sm px-3 py-2 text-xs"><a href={e.mapLink} target="_blank" rel="noreferrer">{t("openMap")}</a></Button>
                  <Button variant="ghost" onClick={() => downloadIcs({ id: e.id, title: `${tr(e.title)} – ${tr(wedding.bride)} ${t("and")} ${tr(wedding.groom)}`, start: e.start, minutes: e.durationMinutes, location: `${tr(e.place)}, ${tr(e.address)}` })}
                    className="h-auto rounded-sm px-3 py-2 text-xs text-secondary">{t("addCal")}</Button>
                </div>
              </Frame>
            </motion.div>
          ))}
        </div>
      </FadeUp>

      <Divider />
      <FadeUp>
        <SectionTitle>{t("program")}</SectionTitle>
        <ol className="relative ms-6 border-s border-gold/70">
          {wedding.program.map((p, i) => (
            <motion.li key={i} className="mb-7 ps-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <span className="absolute -start-5 grid size-10 place-items-center rounded-full bg-accent" style={{ animationDelay: `${i * 0.4}s` }}>
                <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-primary" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={icons[p.icon]} /></svg>
              </span>
              <p className="text-sm font-bold text-secondary">{num(p.time, lang)}</p>
              <p className="font-display text-xl">{tr(p.title)}</p>
            </motion.li>
          ))}
        </ol>
      </FadeUp>

      <Divider />
      <FadeUp className="text-center">
        <SectionTitle>{t("dress")}</SectionTitle>
        <p className="mb-5 text-muted-foreground">{tr(wedding.dressCode.text)}</p>
        <div className="flex justify-center gap-3">
          {wedding.dressCode.colors.map((c, i) => (
            <motion.span key={c} className="size-11 rounded-full shadow-[var(--shadow-paper)]" style={{ background: c }}
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }} />
          ))}
        </div>
      </FadeUp>

      <Divider />
      <FadeUp className="reply-section"><SectionTitle>{t("rsvp")}</SectionTitle><Rsvp /></FadeUp>

      <Divider />
      <footer className="paper-footer text-center">
        <Monogram className="footer-monogram mb-6 text-secondary" />
        <p className="font-script text-3xl text-gold shimmer">{tr(wedding.bride)} {t("and")} {tr(wedding.groom)}</p>
        <p className="mt-3 text-muted-foreground">{t("footer")}</p>
        <span className="mt-6 inline-block px-3 py-1 text-xs text-muted-foreground">{t("demo")}</span>
      </footer>
    </motion.main>
  );
}
