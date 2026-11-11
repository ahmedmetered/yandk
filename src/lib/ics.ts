const pad = (n: number) => String(n).padStart(2, "0");
const stamp = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

export function downloadIcs(opts: { title: string; start: string; minutes: number; location: string; id: string }) {
  const s = new Date(opts.start);
  const e = new Date(s.getTime() + opts.minutes * 60000);
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding//Invite//EN", "BEGIN:VEVENT",
    `UID:${opts.id}-${stamp(s)}@wedding`, `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(s)}`, `DTEND:${stamp(e)}`,
    `SUMMARY:${opts.title}`, `LOCATION:${opts.location.replace(/,/g, "\\,")}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${opts.id}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
