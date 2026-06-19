import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Scissors, Sparkles, Droplet, Heart, Flower2, Crown, Palette, Waves,
  Star, MapPin, Phone, Mail, Clock, Instagram, Facebook, ChevronLeft, ChevronRight, Check, X,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import portraitImg from "@/assets/portrait.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hairstylist Ivi — Luxury Hair & Massage Studio" },
      { name: "description", content: "Premium hairdressing and wellness services tailored to you. Bespoke styling, balayage, bridal hair and restorative massage." },
      { property: "og:title", content: "Hairstylist Ivi — Luxury Hair & Massage Studio" },
      { property: "og:description", content: "Beauty, style and relaxation, crafted with quiet precision." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: "Hairstylist Ivi",
          description: "Luxury hair and massage studio offering bespoke styling and wellness treatments.",
          telephone: "+1 (555) 010-2200",
          address: { "@type": "PostalAddress", streetAddress: "12 Maison Lane", addressLocality: "Mayfair", postalCode: "W1K 5AB" },
          openingHours: ["Tu-Fr 09:00-19:00", "Sa 09:00-17:00"],
        }),
      },
    ],
  }),
  component: Home,
});

/* ----------------------- Reveal on scroll ----------------------- */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ----------------------- Nav ----------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "#about"], ["Services", "#services"], ["Gallery", "#gallery"],
    ["Reviews", "#reviews"], ["Booking", "#booking"], ["Contact", "#contact"],
  ];
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "color-mix(in oklab, var(--ivory) 85%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid color-mix(in oklab, var(--gold-soft) 25%, transparent)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border" style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
            <span className="font-display text-lg italic">I</span>
          </span>
          <span className="font-display text-xl tracking-wide" style={{ color: scrolled ? "var(--noir)" : "var(--ivory)" }}>
            Hairstylist <em className="not-italic" style={{ color: "var(--gold)" }}>Ivi</em>
          </span>
        </a>
        <nav className="hidden items-center gap-9 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[13px] tracking-[0.18em] uppercase transition-colors duration-300"
               style={{ color: scrolled ? "var(--noir)" : "var(--ivory)" }}>
              <span className="opacity-80 hover:opacity-100" style={{ borderBottom: "1px solid transparent" }}>{label}</span>
            </a>
          ))}
        </nav>
        <a href="#booking" className="hidden rounded-full px-5 py-2.5 text-[12px] tracking-[0.22em] uppercase transition lg:inline-block"
           style={{ background: "var(--gradient-gold)", color: "var(--noir)" }}>
          Book Now
        </a>
        <button onClick={() => setOpen(true)} className="lg:hidden" style={{ color: scrolled ? "var(--noir)" : "var(--ivory)" }} aria-label="Menu">
          <div className="flex flex-col gap-1.5"><span className="h-px w-7 bg-current" /><span className="h-px w-7 bg-current" /></div>
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" style={{ background: "var(--ivory)" }}>
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-display text-xl">Hairstylist <em className="not-italic" style={{ color: "var(--gold)" }}>Ivi</em></span>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-6 w-6" /></button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 px-6 pt-16">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="font-display text-3xl">{label}</a>
            ))}
            <a href="#booking" onClick={() => setOpen(false)} className="mt-6 rounded-full px-8 py-3 text-[12px] tracking-[0.22em] uppercase"
               style={{ background: "var(--gradient-gold)", color: "var(--noir)" }}>Book Appointment</a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ----------------------- Hero ----------------------- */
function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <img src={heroImg} alt="Interior of Hairstylist Ivi luxury salon" width={1920} height={1080}
           className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,14,8,0.35) 0%, rgba(20,14,8,0.15) 35%, rgba(20,14,8,0.65) 100%)" }} />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
        <div className="max-w-3xl animate-fade-in-slow" style={{ color: "var(--ivory)" }}>
          <div className="mb-8 flex items-center gap-4">
            <span className="gold-divider" />
            <span className="eyebrow" style={{ color: "var(--gold-soft)" }}>Hair · Wellness · Atelier</span>
          </div>
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Beauty, Style<br />
            <em className="not-italic" style={{ color: "var(--gold-soft)" }}>&amp; Relaxation.</em>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed opacity-85 sm:text-lg">
            Professional hairdressing and wellness services tailored to you — crafted in a quiet, considered atelier where every visit feels like a retreat.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#booking" className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-[12px] tracking-[0.24em] uppercase transition hover:scale-[1.02]"
               style={{ background: "var(--gradient-gold)", color: "var(--noir)" }}>
              Book Appointment
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#services" className="inline-flex items-center gap-3 rounded-full border px-8 py-4 text-[12px] tracking-[0.24em] uppercase transition hover:bg-white/10"
               style={{ borderColor: "rgba(255,255,255,0.4)", color: "var(--ivory)" }}>
              View Services
            </a>
          </div>
        </div>
        <div className="mt-16 hidden items-center justify-between border-t pt-6 lg:flex" style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--ivory)" }}>
          {[
            ["15+", "Years of craft"],
            ["2,400+", "Bespoke clients"],
            ["18", "Signature treatments"],
            ["★ 4.98", "Average rating"],
          ].map(([k, v]) => (
            <div key={v} className="flex items-baseline gap-3">
              <span className="font-display text-2xl" style={{ color: "var(--gold-soft)" }}>{k}</span>
              <span className="text-[11px] tracking-[0.22em] uppercase opacity-70">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Section header ----------------------- */
function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="flex items-center justify-center gap-3">
        <span className="gold-divider" />
        <span className="eyebrow">{eyebrow}</span>
        <span className="gold-divider" />
      </div>
      <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{title}</h2>
      {sub && <p className="mt-5 text-base leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}

/* ----------------------- About ----------------------- */
function About() {
  return (
    <section id="about" className="relative px-6 py-28 lg:px-10 lg:py-40" style={{ background: "var(--cream)" }}>
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-sm" style={{ background: "var(--gradient-gold)", opacity: 0.18 }} />
            <img src={portraitImg} alt="Portrait of Ivi, founder of Hairstylist Ivi" width={1024} height={1024} loading="lazy"
                 className="w-full rounded-sm object-cover" style={{ boxShadow: "var(--shadow-lifted)" }} />
            <div className="glass-card absolute -bottom-8 -right-4 hidden max-w-[230px] rounded-sm p-5 sm:block">
              <p className="font-display text-base italic leading-snug">"Hair is the finest thread of confidence — I weave it with care."</p>
              <p className="eyebrow mt-3">— Ivi</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7 lg:pt-10">
          <div className="flex items-center gap-3"><span className="gold-divider" /><span className="eyebrow">The Atelier</span></div>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            A quiet sanctuary for hair, <em className="text-gold">style</em> and stillness.
          </h2>
          <p className="mt-7 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Founded by Ivi after more than fifteen years inside Europe's most discerning ateliers, the studio was conceived as an antidote to the ordinary salon — unhurried, deeply personal, and devoted to craft. Every consultation begins with listening.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            From precision cuts and luminous balayage to restorative massage, each service is delivered with measured artistry and the finest plant-based products. You arrive a guest; you leave transformed.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {[
              ["L'Oréal Pro", "Master Colorist"],
              ["Vidal Sassoon", "Cutting Academy"],
              ["ITEC", "Massage Therapy"],
            ].map(([a, b]) => (
              <div key={a}>
                <p className="font-display text-lg">{a}</p>
                <p className="eyebrow mt-1.5">{b}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------- Services ----------------------- */
const services = {
  Hair: [
    { icon: Scissors, name: "Women's Haircut", desc: "Bespoke cut and finish, considered to your face shape and lifestyle.", price: 85 },
    { icon: Scissors, name: "Men's Haircut", desc: "Precision tailoring, hot-towel finish and refined grooming.", price: 55 },
    { icon: Palette, name: "Hair Coloring", desc: "Full-spectrum colour using ammonia-free formulations.", price: 120 },
    { icon: Sparkles, name: "Balayage", desc: "Hand-painted luminosity that grows out beautifully.", price: 220 },
    { icon: Sparkles, name: "Highlights", desc: "Dimensional brightening, dialled to your tone.", price: 180 },
    { icon: Droplet, name: "Hair Treatments", desc: "Restorative rituals with botanical bond builders.", price: 90 },
    { icon: Crown, name: "Wedding Hairstyles", desc: "Bridal and bridal-party styling, on location or in studio.", price: 260 },
  ],
  Massage: [
    { icon: Heart, name: "Relaxation Massage", desc: "Long, flowing strokes to release tension and slow the mind. 60 min.", price: 95 },
    { icon: Waves, name: "Deep Tissue Massage", desc: "Targeted pressure that reaches stubborn knots. 60 min.", price: 110 },
    { icon: Flower2, name: "Neck & Back Therapy", desc: "Focused 45-minute reset for desk-bound shoulders.", price: 75 },
    { icon: Sparkles, name: "Wellness Packages", desc: "Half-day rituals: hair, scalp massage and bodywork.", price: 280 },
  ],
};

function Services() {
  const [tab, setTab] = useState<"Hair" | "Massage">("Hair");
  const list = services[tab];
  return (
    <section id="services" className="px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Services" title={<>The <em className="text-gold">Menu</em></>}
          sub="A considered range of hair and wellness rituals, each refined over years of practice." />
        <div className="mt-12 flex items-center justify-center">
          <div className="inline-flex rounded-full border p-1" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            {(["Hair", "Massage"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className="rounded-full px-7 py-2.5 text-[11px] tracking-[0.24em] uppercase transition"
                style={tab === t ? { background: "var(--gradient-gold)", color: "var(--noir)" } : { color: "var(--taupe)" }}>
                {t} Services
              </button>
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <Reveal key={s.name} delay={i * 60}>
              <article className="hover-lift group flex h-full flex-col rounded-sm border bg-card p-8"
                       style={{ borderColor: "color-mix(in oklab, var(--gold-soft) 30%, transparent)" }}>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full border" style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
                    <s.icon className="h-5 w-5" strokeWidth={1.2} />
                  </span>
                  <span className="eyebrow">From</span>
                </div>
                <h3 className="mt-7 font-display text-2xl leading-tight">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-8 flex items-end justify-between border-t pt-5" style={{ borderColor: "var(--border)" }}>
                  <div>
                    <span className="font-display text-3xl">€{s.price}</span>
                  </div>
                  <a href="#booking" className="text-[11px] tracking-[0.22em] uppercase transition group-hover:text-gold" style={{ color: "var(--taupe)" }}>
                    Book →
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Gallery ----------------------- */
const galleryItems = [
  { src: g1, alt: "Balayage close-up", cls: "row-span-2" },
  { src: g5, alt: "Bridal updo", cls: "" },
  { src: g3, alt: "Sleek brunette cut", cls: "row-span-2" },
  { src: g2, alt: "Spa treatment room", cls: "" },
  { src: g4, alt: "Premium hair products", cls: "" },
  { src: g6, alt: "Massage still life", cls: "" },
];
function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="px-6 py-28 lg:px-10 lg:py-40" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Portfolio" title={<>Work that <em className="text-gold">speaks softly.</em></>}
          sub="A selection of recent transformations from the chair and treatment room." />
        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[240px]">
          {galleryItems.map((g) => (
            <button key={g.alt} onClick={() => setOpen(g.src)}
                    className={`group relative overflow-hidden rounded-sm ${g.cls}`}>
              <img src={g.src} alt={g.alt} loading="lazy"
                   className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                   style={{ background: "linear-gradient(180deg, rgba(20,14,8,0) 40%, rgba(20,14,8,0.55) 100%)" }} />
              <span className="absolute bottom-4 left-4 text-[11px] tracking-[0.22em] uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ color: "var(--ivory)" }}>{g.alt}</span>
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 animate-fade-in-slow" onClick={() => setOpen(null)}
             style={{ background: "rgba(15,10,5,0.92)", backdropFilter: "blur(10px)" }}>
          <button className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "var(--ivory)" }}><X className="h-5 w-5" /></button>
          <img src={open} alt="Preview" className="max-h-[88vh] max-w-[92vw] rounded-sm object-contain" />
        </div>
      )}
    </section>
  );
}

/* ----------------------- Testimonials ----------------------- */
const reviews = [
  { name: "Camille Laurent", role: "Returning client · 3 yrs", quote: "Ivi has a rare touch — she listens, then quietly delivers exactly the hair you didn't know you wanted. The studio itself feels like a soft exhale.", stars: 5 },
  { name: "Sofia Marchetti", role: "Balayage client", quote: "The most considered colour appointment I've ever had. The light she paints into the hair is unmatched, and the after-care advice is exceptional.", stars: 5 },
  { name: "Eleni Demetriou", role: "Bridal client", quote: "My wedding morning was made calm and beautiful. Hair held all day and night — and the massage the week before was pure gold.", stars: 5 },
  { name: "Marina Aalto", role: "Wellness package", quote: "I came in tense and left rebuilt. The half-day ritual is worth every minute. A true sanctuary.", stars: 5 },
];
function Testimonials() {
  const [i, setI] = useState(0);
  const r = reviews[i];
  return (
    <section id="reviews" className="px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Kind Words" title={<>From our <em className="text-gold">guests.</em></>} />
        <Reveal className="mt-16">
          <div className="relative rounded-sm border p-10 sm:p-16" style={{ borderColor: "color-mix(in oklab, var(--gold-soft) 35%, transparent)", background: "var(--card)" }}>
            <div className="flex justify-center gap-1">
              {Array.from({ length: r.stars }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" style={{ color: "var(--gold)" }} />)}
            </div>
            <p className="mt-8 text-center font-display text-2xl leading-snug italic sm:text-3xl lg:text-4xl">
              "{r.quote}"
            </p>
            <div className="mt-10 text-center">
              <p className="font-display text-lg">{r.name}</p>
              <p className="eyebrow mt-1">{r.role}</p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-4">
              <button onClick={() => setI((i - 1 + reviews.length) % reviews.length)} aria-label="Previous"
                      className="grid h-11 w-11 place-items-center rounded-full border hover:bg-accent transition">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {reviews.map((_, k) => (
                  <button key={k} onClick={() => setI(k)} className="h-1.5 rounded-full transition-all"
                          style={{ width: k === i ? 28 : 8, background: k === i ? "var(--gold)" : "var(--border)" }} />
                ))}
              </div>
              <button onClick={() => setI((i + 1) % reviews.length)} aria-label="Next"
                      className="grid h-11 w-11 place-items-center rounded-full border hover:bg-accent transition">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------- Why ----------------------- */
const whys = [
  { t: "Individual Approach", d: "Every appointment begins with a consultation — no two visits look the same." },
  { t: "Professional Experience", d: "Fifteen+ years of craft across Europe's most respected ateliers." },
  { t: "Premium Products", d: "We work exclusively with botanically-derived, conscious formulations." },
  { t: "Relaxing Atmosphere", d: "A calm, low-light interior conceived as a sanctuary, not a salon." },
  { t: "Personalised Care", d: "Aftercare rituals and at-home guidance, tailored to your hair and life." },
  { t: "Discretion & Time", d: "Generous appointment windows. Never rushed, never overlapping." },
];
function Why() {
  return (
    <section className="px-6 py-28 lg:px-10 lg:py-40" style={{ background: "var(--noir)", color: "var(--ivory)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="gold-divider" /><span className="eyebrow" style={{ color: "var(--gold-soft)" }}>Why Ivi</span><span className="gold-divider" />
          </div>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Six reasons we are <em style={{ color: "var(--gold-soft)" }}>chosen.</em>
          </h2>
        </div>
        <div className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "rgba(255,255,255,0.08)" }}>
          {whys.map((w, i) => (
            <Reveal key={w.t} delay={i * 50}>
              <div className="h-full p-10" style={{ background: "var(--noir)" }}>
                <span className="font-display text-3xl" style={{ color: "var(--gold-soft)" }}>0{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl">{w.t}</h3>
                <p className="mt-4 text-sm leading-relaxed opacity-70">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Booking ----------------------- */
function Booking() {
  const allServices = [...services.Hair, ...services.Massage].map((s) => s.name);
  const [service, setService] = useState(allServices[0]);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const next7 = Array.from({ length: 8 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1); return d;
  });
  const times = ["09:30", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];

  return (
    <section id="booking" className="px-6 py-28 lg:px-10 lg:py-40" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Reservations" title={<>Reserve your <em className="text-gold">moment.</em></>}
          sub="Select your treatment and a moment that suits you. We'll confirm by message within the hour." />
        {submitted ? (
          <Reveal className="mt-16">
            <div className="glass-card rounded-sm p-16 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
                <Check className="h-6 w-6" style={{ color: "var(--noir)" }} />
              </div>
              <h3 className="mt-6 font-display text-3xl">Request received</h3>
              <p className="mt-3 text-muted-foreground">We'll confirm your appointment shortly. À bientôt.</p>
              <button onClick={() => { setSubmitted(false); setDate(""); setTime(""); }} className="mt-8 eyebrow underline-offset-4 hover:underline">
                Make another booking
              </button>
            </div>
          </Reveal>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="mt-16 grid gap-px overflow-hidden rounded-sm lg:grid-cols-2"
                style={{ background: "color-mix(in oklab, var(--gold-soft) 30%, transparent)" }}>
            <div className="space-y-7 bg-card p-8 sm:p-10">
              <div>
                <label className="eyebrow">Service</label>
                <select value={service} onChange={(e) => setService(e.target.value)}
                        className="mt-3 w-full border-0 border-b bg-transparent py-3 font-display text-xl outline-none focus:border-b-2"
                        style={{ borderColor: "var(--border)" }}>
                  {allServices.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="eyebrow">Choose a day</label>
                <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-4 xl:grid-cols-8">
                  {next7.map((d) => {
                    const key = d.toISOString().slice(0, 10);
                    const active = date === key;
                    return (
                      <button type="button" key={key} onClick={() => setDate(key)}
                              className="flex flex-col items-center rounded-sm border py-3 text-center transition"
                              style={{
                                borderColor: active ? "var(--gold)" : "var(--border)",
                                background: active ? "var(--gradient-gold)" : "transparent",
                                color: active ? "var(--noir)" : "inherit",
                              }}>
                        <span className="text-[10px] tracking-[0.18em] uppercase opacity-70">
                          {d.toLocaleDateString("en", { weekday: "short" })}
                        </span>
                        <span className="font-display text-xl">{d.getDate()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="eyebrow">Available times</label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {times.map((t) => {
                    const active = time === t;
                    return (
                      <button type="button" key={t} onClick={() => setTime(t)}
                              className="rounded-full border px-5 py-2 text-sm transition"
                              style={{
                                borderColor: active ? "var(--gold)" : "var(--border)",
                                background: active ? "var(--gradient-gold)" : "transparent",
                                color: active ? "var(--noir)" : "inherit",
                              }}>{t}</button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="space-y-5 bg-card p-8 sm:p-10">
              <div>
                <label className="eyebrow">Full name</label>
                <input required className="mt-3 w-full border-0 border-b bg-transparent py-3 outline-none focus:border-b-2"
                       style={{ borderColor: "var(--border)" }} placeholder="Your name" />
              </div>
              <div>
                <label className="eyebrow">Email</label>
                <input required type="email" className="mt-3 w-full border-0 border-b bg-transparent py-3 outline-none focus:border-b-2"
                       style={{ borderColor: "var(--border)" }} placeholder="you@email.com" />
              </div>
              <div>
                <label className="eyebrow">Phone</label>
                <input className="mt-3 w-full border-0 border-b bg-transparent py-3 outline-none focus:border-b-2"
                       style={{ borderColor: "var(--border)" }} placeholder="+1 555 …" />
              </div>
              <div>
                <label className="eyebrow">Notes (optional)</label>
                <textarea rows={3} className="mt-3 w-full border-0 border-b bg-transparent py-3 outline-none focus:border-b-2 resize-none"
                       style={{ borderColor: "var(--border)" }} placeholder="Anything we should know" />
              </div>
              <div className="rounded-sm p-4 text-sm" style={{ background: "color-mix(in oklab, var(--gold-soft) 20%, transparent)" }}>
                <p className="font-display text-base">{service}</p>
                <p className="eyebrow mt-1">
                  {date ? new Date(date).toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long" }) : "Select a day"} {time && `· ${time}`}
                </p>
              </div>
              <button type="submit" disabled={!date || !time}
                      className="w-full rounded-full py-4 text-[12px] tracking-[0.24em] uppercase transition disabled:opacity-40"
                      style={{ background: "var(--gradient-gold)", color: "var(--noir)" }}>
                Request Appointment
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* ----------------------- Contact ----------------------- */
function Contact() {
  return (
    <section id="contact" className="px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="flex items-center gap-3"><span className="gold-divider" /><span className="eyebrow">Visit</span></div>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Come find <em className="text-gold">us.</em>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Tucked just off the main avenue, the studio is a short walk from the metro. Appointments only — please arrive a few moments early.
          </p>
          <div className="mt-10 space-y-6">
            {[
              [MapPin, "12 Maison Lane, Mayfair, W1K 5AB"],
              [Phone, "+1 (555) 010-2200"],
              [Mail, "hello@hairstylist-ivi.com"],
              [Clock, "Tue–Fri 09:00 – 19:00 · Sat 09:00 – 17:00"],
            ].map(([Icon, text], k) => {
              const I = Icon as typeof MapPin;
              return (
                <div key={k} className="flex items-start gap-5">
                  <span className="mt-1 grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
                    <I className="h-4 w-4" strokeWidth={1.4} />
                  </span>
                  <span className="pt-1.5 text-base">{text as string}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex gap-3">
            {[Instagram, Facebook].map((Icon, k) => (
              <a key={k} href="#" className="grid h-11 w-11 place-items-center rounded-full border transition hover:bg-accent"
                 style={{ borderColor: "var(--border)" }}>
                <Icon className="h-4 w-4" strokeWidth={1.4} />
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-sm border" style={{ borderColor: "color-mix(in oklab, var(--gold-soft) 35%, transparent)" }}>
            <iframe
              title="Studio location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.156%2C51.508%2C-0.146%2C51.512&layer=mapnik"
              className="h-[280px] w-full sm:h-[360px]" style={{ filter: "sepia(0.25) saturate(0.9)" }} />
          </div>
          <form className="mt-8 space-y-5 rounded-sm border bg-card p-8" style={{ borderColor: "var(--border)" }}>
            <p className="font-display text-2xl">Send a message</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <input placeholder="Name" className="border-0 border-b bg-transparent py-3 outline-none focus:border-b-2" style={{ borderColor: "var(--border)" }} />
              <input placeholder="Email" type="email" className="border-0 border-b bg-transparent py-3 outline-none focus:border-b-2" style={{ borderColor: "var(--border)" }} />
            </div>
            <textarea placeholder="Your message" rows={4} className="w-full resize-none border-0 border-b bg-transparent py-3 outline-none focus:border-b-2"
                      style={{ borderColor: "var(--border)" }} />
            <button type="button" className="rounded-full px-7 py-3 text-[11px] tracking-[0.24em] uppercase"
                    style={{ background: "var(--gradient-gold)", color: "var(--noir)" }}>Send</button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------- Footer ----------------------- */
function Footer() {
  return (
    <footer className="px-6 pt-20 pb-10 lg:px-10" style={{ background: "var(--noir)", color: "var(--ivory)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
                <span className="font-display text-lg italic">I</span>
              </span>
              <span className="font-display text-2xl">Hairstylist <em className="not-italic" style={{ color: "var(--gold-soft)" }}>Ivi</em></span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-70">
              A quiet atelier devoted to hair and wellness. Considered, unhurried, and crafted to feel like a moment for yourself.
            </p>
          </div>
          <div className="lg:col-span-2">
            <p className="eyebrow" style={{ color: "var(--gold-soft)" }}>Navigate</p>
            <ul className="mt-5 space-y-3 text-sm">
              {["About", "Services", "Gallery", "Reviews", "Booking", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="opacity-70 hover:opacity-100">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow" style={{ color: "var(--gold-soft)" }}>Contact</p>
            <ul className="mt-5 space-y-3 text-sm opacity-70">
              <li>12 Maison Lane, Mayfair</li>
              <li>+1 (555) 010-2200</li>
              <li>hello@hairstylist-ivi.com</li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow" style={{ color: "var(--gold-soft)" }}>Instagram</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[g1, g3, g5, g2, g4, g6].map((src, k) => (
                <a key={k} href="#" className="aspect-square overflow-hidden">
                  <img src={src} alt="Instagram preview" loading="lazy" className="h-full w-full object-cover transition-transform hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs opacity-60 sm:flex-row sm:items-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <span>© {new Date().getFullYear()} Hairstylist Ivi. All rights reserved.</span>
          <span className="tracking-[0.22em] uppercase">Crafted with quiet care.</span>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------- Page ----------------------- */
function Home() {
  return (
    <div className="overflow-hidden">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <Why />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
