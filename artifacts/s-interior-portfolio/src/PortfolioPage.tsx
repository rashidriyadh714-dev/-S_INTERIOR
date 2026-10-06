import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  DraftingCompass,
  MapPin,
  Menu,
  MessageCircle,
  Pause,
  Phone,
  Play,
  Ruler,
  ScanLine,
  X,
} from 'lucide-react';

const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
const phoneLink = 'tel:+94769866660';
const whatsappLink = 'https://wa.me/94767698007?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20project.';

const slides = [
  {
    image: 'platinum-grand-hotel.jpg',
    alt: 'Architectural visualization of the Platinum Grand Hotel entrance, layered facade screens and arrival court',
    eyebrow: 'Featured architectural visualization',
    title: 'Platinum Grand Hotel',
    tag: 'Exterior study',
    position: 'center 53%',
  },
  {
    image: 'extra-1.jpg',
    alt: 'Interior reference, view one: a warm dining and living space with soft daylight, timber furniture and a woven pendant',
    eyebrow: 'Interior reference · View 01',
    title: 'A light-filled dining interior',
    tag: 'Reference study',
    position: 'center 57%',
  },
  {
    image: 'extra-2.jpg',
    alt: 'Interior reference, view two of the same dining setting, with a woven pendant and sheer curtains',
    eyebrow: 'Interior reference · View 02',
    title: 'The same setting, another view',
    tag: 'Reference study',
    position: 'center 55%',
  },
];

const navItems = [
  ['Work', '#work'],
  ['Services', '#services'],
  ['Approach', '#approach'],
  ['About', '#about'],
];

export function PortfolioPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [touching, setTouching] = useState(false);
  const touchStart = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const slide = slides[activeSlide];
  const isPaused = hovered || focused || userPaused || reducedMotion || touching;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [activeSlide, isPaused]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuToggleRef.current?.focus();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const goTo = (index: number) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  const handleCarouselKey = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeSlide - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeSlide + 1);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    setTouching(true);
    touchStart.current = event.touches[0]?.clientX ?? null;
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStart.current;
    const startY = touchStartY.current;
    touchStart.current = null;
    touchStartY.current = null;
    setTouching(false);
    if (startX === null || startY === null) return;
    const dx = (event.changedTouches[0]?.clientX ?? startX) - startX;
    const dy = (event.changedTouches[0]?.clientY ?? startY) - startY;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.15) goTo(activeSlide + (dx < 0 ? 1 : -1));
  };

  return (
    <div className="si-page" id="top">
      <style>{`
        .si-page {
          --si-ink: #192438;
          --si-paper: #f4f0e7;
          --si-gold: #b6975d;
          --si-copy: #5f625f;
          min-height: 100dvh;
          overflow: clip;
          background: var(--si-paper);
          color: var(--si-ink);
          font-family: var(--app-font-sans, 'DM Sans', sans-serif);
          -webkit-font-smoothing: antialiased;
        }
        .si-page * { box-sizing: border-box; }
        .si-page a { color: inherit; }
        .si-page button { color: inherit; font: inherit; -webkit-tap-highlight-color: transparent; }
        .si-page img { display: block; max-width: 100%; }
        .si-wrap { width: min(1180px, calc(100% - 56px)); margin-inline: auto; }
        .si-display { font-family: 'Manrope', 'DM Sans', sans-serif; }
        .si-serif { font-family: 'Playfair Display', Georgia, serif; }
        .si-eyebrow { display:flex; align-items:center; gap:10px; color:#8d7146; font-size:9px; font-weight:700; letter-spacing:.2em; line-height:1.5; text-transform:uppercase; }
        .si-eyebrow:before { content:""; width:24px; height:1px; flex:0 0 24px; background:var(--si-gold); }
        .si-header { position:sticky; z-index:30; top:0; border-bottom:1px solid #19243817; background:rgba(244,240,231,.96); backdrop-filter:blur(14px); }
        .si-header-inner { min-height:76px; display:flex; align-items:center; justify-content:space-between; gap:20px; }
        .si-brand { display:inline-flex; align-items:center; gap:11px; text-decoration:none; }
        .si-mark { position:relative; display:grid; width:40px; height:40px; place-items:center; border:1px solid var(--si-gold); color:var(--si-gold); }
        .si-mark:after { position:absolute; right:4px; bottom:4px; width:5px; height:5px; border-radius:50%; background:var(--si-gold); content:""; }
        .si-brand-s { font:27px/1 'Playfair Display', Georgia, serif; }
        .si-brand-name { display:block; font:800 11px/1.4 'Manrope', sans-serif; letter-spacing:.12em; }
        .si-brand-sub { display:block; margin-top:3px; color:#79756d; font-size:8px; font-weight:700; letter-spacing:.17em; }
        .si-nav { display:flex; align-items:center; gap:clamp(16px,2.4vw,32px); }
        .si-nav a { position:relative; padding:12px 0; color:#45494e; font-size:10px; font-weight:600; letter-spacing:.06em; text-decoration:none; }
        .si-nav a:not(.si-nav-cta):after { position:absolute; right:0; bottom:6px; left:0; height:1px; background:var(--si-gold); content:""; transform:scaleX(0); transform-origin:right; transition:transform .22s ease; }
        .si-nav a:hover:after,.si-nav a:focus-visible:after { transform:scaleX(1); transform-origin:left; }
        .si-nav .si-nav-cta { display:flex; min-height:42px; align-items:center; gap:10px; padding:0 15px; background:var(--si-ink); color:var(--si-paper); font-size:9px; letter-spacing:.1em; text-transform:uppercase; }
        .si-menu-toggle { display:none; width:44px; height:44px; align-items:center; justify-content:center; border:1px solid #19243838; background:transparent; }
        .si-mobile-nav { display:none; }
        .si-hero { padding:clamp(34px,5.4vw,72px) 0 26px; }
         .si-hero-grid { display:grid; grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr); align-items:center; gap:clamp(30px,4.1vw,56px); }
        .si-hero-copy { padding:10px 0; }
        .si-location { margin:0 0 27px; color:#777367; font-size:10px; font-weight:700; letter-spacing:.17em; text-transform:uppercase; }
        .si-kicker { margin:0 0 12px; color:#777367; font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; }
         .si-title { max-width:540px; margin:0; font-size:clamp(50px,5.4vw,76px); font-weight:600; letter-spacing:-.07em; line-height:.99; }
        .si-title em { color:#9c7c49; font-family:'Playfair Display', Georgia, serif; font-weight:500; letter-spacing:-.05em; }
        .si-intro { max-width:390px; margin:22px 0 0; color:var(--si-copy); font-size:14px; line-height:1.85; }
        .si-hero-actions { display:flex; flex-wrap:wrap; align-items:center; gap:16px 24px; margin-top:27px; }
        .si-button-primary { display:inline-flex; min-height:50px; align-items:center; justify-content:center; gap:12px; padding:0 18px; background:var(--si-ink); color:var(--si-paper)!important; font-size:9px; font-weight:700; letter-spacing:.12em; text-decoration:none; text-transform:uppercase; transition:background .2s ease; }
        .si-button-primary:hover { background:#293751; }
        .si-phone-link { min-height:44px; display:inline-flex; align-items:center; color:#454b52!important; font-size:11px; font-weight:700; text-decoration:none; }
        .si-promise { display:flex; align-items:center; gap:10px; margin-top:31px; padding-top:17px; border-top:1px solid #19243825; color:#777367; font-size:9px; letter-spacing:.14em; text-transform:uppercase; }
        .si-promise:before { width:6px; height:6px; flex:0 0 6px; border-radius:50%; background:var(--si-gold); content:""; }
        .si-carousel { min-width:0; }
        .si-carousel-frame { position:relative; isolation:isolate; aspect-ratio:1.3 / 1; overflow:hidden; background:#d6d1c5; box-shadow:0 22px 48px #19243824; touch-action:pan-y; }
        .si-slide-image { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:opacity .38s ease, transform 1.2s cubic-bezier(.2,.7,.2,1); }
        .si-slide-image.is-active { transform:scale(1.015); }
        .si-photo-shade { position:absolute; z-index:1; inset:25% 0 0; background:linear-gradient(0deg,rgba(16,26,43,.76),transparent 83%); pointer-events:none; }
        .si-slide-content { position:absolute; z-index:2; right:18px; bottom:18px; left:20px; display:flex; align-items:flex-end; justify-content:space-between; gap:12px; color:#f5f1e9; pointer-events:none; }
        .si-caption-eyebrow { display:block; margin-bottom:6px; color:#e0c893; font-size:8px; font-weight:700; letter-spacing:.17em; line-height:1.4; text-transform:uppercase; }
        .si-caption-title { display:block; max-width:300px; font:clamp(20px,2.35vw,28px)/1.18 'Playfair Display',Georgia,serif; }
        .si-slide-tag { flex:0 0 auto; border:1px solid #ffffff83; padding:9px 10px; font-size:8px; letter-spacing:.11em; text-transform:uppercase; }
        .si-carousel-controls { display:flex; min-height:56px; align-items:center; justify-content:space-between; gap:12px; border-bottom:1px solid #19243829; }
        .si-counter { display:flex; align-items:baseline; gap:7px; min-width:54px; color:#777367; font-size:10px; letter-spacing:.1em; }
        .si-counter strong { color:var(--si-ink); font-size:14px; font-weight:600; }
        .si-controls-right { display:flex; align-items:center; gap:7px; }
         .si-control { display:inline-flex; width:44px; height:44px; align-items:center; justify-content:center; border:1px solid #1924382a; background:transparent; cursor:pointer; transition:background .18s ease,border-color .18s ease; }
        .si-control:hover { border-color:#19243865; background:#e9e3d7; }
         .si-control:disabled { cursor:not-allowed; opacity:.52; }
         .si-control:focus-visible,.si-dot:focus-visible,.si-menu-toggle:focus-visible,.si-page a:focus-visible,.si-carousel:focus-visible { outline:2px solid var(--si-gold); outline-offset:3px; }
        .si-dots { display:flex; align-items:center; gap:5px; margin-inline:2px 6px; }
         .si-dot { width:32px; height:44px; display:grid; place-items:center; border:0; background:transparent; cursor:pointer; }
        .si-dot:before { width:6px; height:6px; border-radius:50%; background:#bcb5a7; content:""; transition:width .2s ease,background .2s ease,border-radius .2s ease; }
        .si-dot[aria-current="true"]:before { width:21px; border-radius:5px; background:var(--si-gold); }
        .si-carousel-note { margin:10px 0 0; color:#777367; font-size:9px; line-height:1.6; }
        .si-under-hero { display:flex; justify-content:space-between; gap:12px; margin-top:24px; padding-top:14px; border-top:1px solid #19243825; color:#777367; font-size:8px; letter-spacing:.13em; text-transform:uppercase; }
        .si-work { padding:82px 0 88px; background:var(--si-ink); color:var(--si-paper); }
        .si-work-head { display:flex; align-items:flex-end; justify-content:space-between; gap:32px; margin-bottom:36px; }
        .si-work h2,.si-services h2,.si-approach h2,.si-about h2,.si-contact h2 { margin:14px 0 0; font-size:clamp(34px,4.7vw,56px); font-weight:500; letter-spacing:-.06em; line-height:1.06; }
        .si-work h2 em,.si-services h2 em,.si-approach h2 em,.si-about h2 em,.si-contact h2 em { color:#cfb47f; font-family:'Playfair Display',Georgia,serif; font-weight:500; }
        .si-work-head > p { max-width:290px; margin:0 0 2px; color:#c5c4be; font-size:12px; line-height:1.8; }
        .si-project-feature { display:grid; grid-template-columns:minmax(0,1.5fr) minmax(210px,.72fr); align-items:end; gap:35px; }
        .si-project-image { width:100%; aspect-ratio:1.78; object-fit:cover; }
        .si-project-image-wrap { position:relative; overflow:hidden; background:#263349; }
        .si-project-badge { position:absolute; top:14px; left:14px; padding:8px 10px; background:#192438df; color:#e4d2aa; font-size:8px; letter-spacing:.13em; text-transform:uppercase; }
        .si-project-copy .si-index { margin:0 0 11px; color:#cfb47f; font-size:9px; letter-spacing:.17em; text-transform:uppercase; }
        .si-project-copy h3 { margin:0 0 12px; font:32px/1.12 'Playfair Display',Georgia,serif; }
        .si-project-copy p { margin:0; color:#c5c4be; font-size:12px; line-height:1.8; }
        .si-project-kind { display:inline-block; margin-top:20px; padding-top:13px; border-top:1px solid #ffffff34; color:#e4d2aa; font-size:8px; letter-spacing:.12em; text-transform:uppercase; }
        .si-interior-block { margin-top:54px; padding-top:25px; border-top:1px solid #ffffff2b; }
        .si-interior-title { display:flex; align-items:baseline; justify-content:space-between; gap:12px; margin-bottom:17px; }
        .si-interior-title h3 { margin:0; font:23px/1.2 'Playfair Display',Georgia,serif; }
        .si-interior-title span { color:#cfb47f; font-size:8px; letter-spacing:.14em; text-transform:uppercase; }
        .si-interior-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .si-interior-grid figure { min-width:0; margin:0; }
        .si-interior-grid img { width:100%; aspect-ratio:1.52; object-fit:cover; }
        .si-interior-grid figcaption { display:flex; justify-content:space-between; gap:10px; padding-top:12px; border-bottom:1px solid #ffffff35; padding-bottom:12px; color:#e4d2aa; font-size:8px; letter-spacing:.11em; text-transform:uppercase; }
        .si-reference-note { max-width:690px; margin:15px 0 0; color:#aeb3b7; font-size:10px; line-height:1.8; }
        .si-services { padding:82px 0; }
        .si-services-grid { display:grid; grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr); gap:clamp(36px,8vw,100px); }
        .si-services h2 { margin-top:14px; }
        .si-services h2 em,.si-about h2 em { color:#9c7c49; }
        .si-services-lead { max-width:330px; margin:20px 0 0; color:var(--si-copy); font-size:12px; line-height:1.9; }
        .si-text-link { display:inline-flex; min-height:44px; align-items:center; gap:10px; margin-top:17px; border-bottom:1px solid var(--si-gold); color:var(--si-ink); font-size:9px; font-weight:700; letter-spacing:.13em; text-decoration:none; text-transform:uppercase; }
        .si-service-list { border-top:1px solid #19243830; }
        .si-service-row { display:flex; align-items:flex-start; gap:17px; padding:21px 10px; border-bottom:1px solid #19243830; }
        .si-service-icon { flex:0 0 auto; margin-top:2px; color:#9c7c49; }
        .si-service-body { flex:1; min-width:0; }
        .si-service-row h3 { margin:0 0 5px; font:700 16px/1.4 'Manrope',sans-serif; letter-spacing:-.025em; }
        .si-service-row p { max-width:500px; margin:0; color:#66665f; font-size:11px; line-height:1.8; }
        .si-service-num { padding-top:3px; color:#9a9387; font-size:9px; }
        .si-approach { padding:70px 0 78px; background:#e8e2d6; }
        .si-approach-grid { display:grid; grid-template-columns:minmax(0,.72fr) minmax(0,1fr); align-items:center; gap:clamp(34px,7vw,86px); }
        .si-process-photo { position:relative; padding:0 12px 12px 0; }
        .si-process-photo:before { position:absolute; inset:12px 0 0 12px; border:1px solid #b6975d88; content:""; }
        .si-process-photo img { position:relative; z-index:1; width:100%; aspect-ratio:1.3; object-fit:cover; }
        .si-photo-label { position:absolute; z-index:2; right:0; bottom:0; max-width:calc(100% - 20px); padding:11px 12px; background:var(--si-ink); color:#e9d8b3; font-size:8px; letter-spacing:.11em; text-transform:uppercase; }
        .si-approach h2 { margin-bottom:26px; }
        .si-approach h2 em { color:#9c7c49; }
        .si-process-grid { display:grid; grid-template-columns:1fr 1fr; gap:19px 23px; }
        .si-process-step { padding-top:12px; border-top:1px solid #19243835; }
        .si-process-step span { color:#a07f4c; font-size:9px; font-weight:700; letter-spacing:.13em; }
        .si-process-step p { margin:7px 0 0; color:#5f625f; font-size:11px; line-height:1.75; }
        .si-about { padding:82px 0; }
        .si-about-grid { display:grid; grid-template-columns:minmax(0,.75fr) minmax(0,1.1fr); align-items:center; gap:clamp(34px,8vw,100px); }
        .si-profile { position:relative; min-height:430px; background:#d5cec0; }
        .si-profile img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 43%; }
        .si-profile-caption { position:absolute; right:0; bottom:0; left:0; padding:42px 19px 17px; background:linear-gradient(0deg,#192438ed,transparent); color:var(--si-paper); }
        .si-profile-caption strong { display:block; font:24px/1.2 'Playfair Display',Georgia,serif; font-weight:500; }
        .si-profile-caption span { display:block; margin-top:5px; color:#e4d2aa; font-size:8px; letter-spacing:.15em; text-transform:uppercase; }
        .si-about h2 { margin-top:14px; font-size:clamp(35px,4.5vw,56px); }
        .si-about-copy { max-width:520px; margin:20px 0 0; color:var(--si-copy); font-size:12px; line-height:1.9; }
        .si-about-copy + .si-about-copy { margin-top:13px; }
        .si-about-location { display:flex; align-items:center; gap:10px; margin-top:22px; padding-top:15px; border-top:1px solid #19243825; color:#777367; font-size:9px; letter-spacing:.14em; text-transform:uppercase; }
        .si-contact { position:relative; overflow:hidden; padding:72px 0; background:var(--si-ink); color:var(--si-paper); }
        .si-contact:after { position:absolute; top:-130px; right:-95px; width:310px; height:310px; border:1px solid #cfb47f22; border-radius:50%; content:""; pointer-events:none; }
        .si-contact-grid { position:relative; z-index:1; display:grid; grid-template-columns:minmax(0,1fr) minmax(225px,.65fr); gap:56px; }
        .si-contact h2 { margin-top:13px; font-size:clamp(42px,5.7vw,70px); }
        .si-contact-copy { max-width:440px; margin:17px 0 0; color:#c5c4be; font-size:12px; line-height:1.85; }
        .si-contact-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:25px; }
        .si-contact-actions a { display:inline-flex; min-height:48px; align-items:center; justify-content:center; gap:10px; padding:0 16px; font-size:9px; font-weight:700; letter-spacing:.1em; text-decoration:none; text-transform:uppercase; }
        .si-whatsapp { background:#cfb47f; color:var(--si-ink)!important; }
        .si-call { border:1px solid #ffffff66; color:var(--si-paper)!important; }
        .si-direct { align-self:end; padding-top:19px; border-top:1px solid #ffffff3c; }
        .si-direct-label { color:#cfb47f; font-size:8px; letter-spacing:.16em; text-transform:uppercase; }
        .si-direct-phone { display:block; margin-top:12px; color:var(--si-paper)!important; font-size:21px; font-weight:600; letter-spacing:.03em; text-decoration:none; }
        .si-direct-wa { display:inline-flex; min-height:42px; align-items:center; gap:7px; color:#c5c4be!important; font-size:11px; text-decoration:none; }
        .si-direct-place { display:block; margin-top:12px; color:#b2b3b2; font-size:8px; letter-spacing:.14em; text-transform:uppercase; }
        .si-footer { padding:18px 0; background:#121c2d; color:#c5c4be; }
        .si-footer-inner { display:flex; align-items:center; justify-content:space-between; gap:14px; }
        .si-footer-brand { display:flex; align-items:center; gap:9px; font-size:8px; letter-spacing:.13em; text-transform:uppercase; }
        .si-footer-brand b { color:#cfb47f; font:23px/1 'Playfair Display',Georgia,serif; }
        .si-footer p { margin:0; font-size:9px; }
         .si-footer a { display:inline-flex; min-height:44px; align-items:center; gap:6px; color:#e2d7c1; font-size:8px; letter-spacing:.12em; text-decoration:none; text-transform:uppercase; }
        @media (max-width: 850px) {
          .si-wrap { width:min(100% - 40px, 680px); }
          .si-header-inner { min-height:68px; }
          .si-nav { display:none; }
          .si-menu-toggle { display:inline-flex; }
          .si-mobile-nav { position:absolute; top:100%; right:0; left:0; display:block; padding:8px 20px 20px; border-top:1px solid #19243814; background:var(--si-paper); box-shadow:0 18px 28px #19243818; }
          .si-mobile-nav a { display:flex; min-height:48px; align-items:center; justify-content:space-between; border-bottom:1px solid #19243819; color:#45494e; font-size:12px; font-weight:600; text-decoration:none; }
          .si-mobile-nav .si-mobile-cta { margin-top:13px; padding:0 14px; border:0; background:var(--si-ink); color:var(--si-paper); }
          .si-hero { padding-top:33px; }
          .si-hero-grid { grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr); gap:27px; }
          .si-title { font-size:clamp(44px,6.3vw,56px); }
          .si-carousel-frame { aspect-ratio:1.03 / 1; }
          .si-slide-content { right:13px; bottom:14px; left:15px; }
          .si-slide-tag { display:none; }
          .si-work,.si-services,.si-about { padding-block:66px; }
          .si-approach { padding-block:62px; }
          .si-project-feature { grid-template-columns:minmax(0,1.35fr) minmax(185px,.8fr); gap:22px; }
          .si-project-copy h3 { font-size:27px; }
          .si-services-grid { gap:38px; }
          .si-approach-grid { grid-template-columns:minmax(0,.8fr) minmax(0,1fr); gap:32px; }
          .si-profile { min-height:390px; }
          .si-contact-grid { gap:35px; }
        }
        @media (max-width: 620px) {
          .si-wrap { width:calc(100% - 36px); }
          .si-header-inner { min-height:64px; }
          .si-mark { width:37px; height:37px; }
          .si-brand-name { font-size:10px; }
          .si-brand-sub { font-size:7px; }
          .si-hero { padding:29px 0 22px; }
          .si-hero-grid { grid-template-columns:1fr; gap:24px; }
          .si-hero-copy { padding:0; }
          .si-location { margin-bottom:19px; font-size:9px; }
          .si-kicker { margin-bottom:10px; font-size:9px; }
          .si-title { max-width:390px; font-size:clamp(48px,13.5vw,66px); }
          .si-intro { max-width:390px; margin-top:16px; font-size:13px; line-height:1.75; }
          .si-hero-actions { gap:8px 15px; margin-top:20px; }
          .si-button-primary { min-height:48px; padding:0 14px; font-size:8px; }
          .si-phone-link { min-height:48px; font-size:10px; }
          .si-promise { margin-top:17px; padding-top:13px; font-size:8px; }
          .si-carousel-frame { aspect-ratio:.91 / 1; }
          .si-slide-content { right:13px; bottom:14px; left:15px; }
          .si-caption-eyebrow { margin-bottom:5px; font-size:7px; }
          .si-caption-title { max-width:275px; font-size:22px; }
          .si-carousel-controls { min-height:54px; }
          .si-control { width:42px; height:42px; }
          .si-dots { gap:2px; margin-right:0; }
          .si-dot { width:30px; }
          .si-under-hero { margin-top:19px; padding-top:12px; font-size:7px; letter-spacing:.1em; }
          .si-under-hero span:last-child { text-align:right; }
          .si-work,.si-services,.si-about { padding-block:58px; }
          .si-work-head { display:block; margin-bottom:26px; }
          .si-work h2,.si-services h2,.si-approach h2 { font-size:36px; }
          .si-work-head > p { max-width:400px; margin-top:15px; font-size:11px; }
          .si-project-feature { grid-template-columns:1fr; gap:18px; }
          .si-project-image { aspect-ratio:1.17; }
          .si-project-copy h3 { font-size:29px; }
          .si-project-copy p { font-size:11px; }
          .si-project-kind { margin-top:14px; }
          .si-interior-block { margin-top:34px; padding-top:20px; }
          .si-interior-title { align-items:flex-start; flex-direction:column; gap:5px; }
          .si-interior-title h3 { font-size:22px; }
          .si-interior-grid { grid-template-columns:1fr; gap:22px; }
          .si-interior-grid img { aspect-ratio:1.32; }
          .si-interior-grid figcaption { font-size:8px; }
          .si-reference-note { font-size:9px; }
          .si-services-grid,.si-approach-grid,.si-about-grid { grid-template-columns:1fr; gap:28px; }
          .si-services-lead { margin-top:14px; font-size:11px; }
          .si-service-row { gap:13px; padding:17px 4px; }
          .si-service-row h3 { font-size:15px; }
          .si-service-row p { font-size:10px; }
          .si-service-icon { width:20px; height:20px; }
          .si-approach { padding-block:50px 56px; }
          .si-process-photo { width:min(100%,430px); }
          .si-process-photo img { aspect-ratio:1.23; }
          .si-photo-label { font-size:7px; }
          .si-approach h2 { margin-bottom:22px; }
          .si-process-grid { gap:16px; }
          .si-process-step p { font-size:10px; }
          .si-profile { min-height:0; aspect-ratio:.91; max-height:520px; }
          .si-about h2 { font-size:38px; }
          .si-about-copy { margin-top:16px; font-size:11px; }
          .si-contact { padding-block:56px; }
          .si-contact-grid { grid-template-columns:1fr; gap:28px; }
          .si-contact h2 { font-size:48px; }
          .si-contact-copy { font-size:11px; }
          .si-contact-actions { display:grid; grid-template-columns:1fr 1fr; }
          .si-contact-actions a { min-height:48px; padding-inline:8px; font-size:8px; }
          .si-direct { max-width:none; }
          .si-footer-inner { flex-wrap:wrap; }
          .si-footer p { order:3; width:100%; }
        }
        @media (max-width: 360px) {
          .si-wrap { width:calc(100% - 28px); }
          .si-title { font-size:46px; }
          .si-contact-actions { grid-template-columns:1fr; }
          .si-under-hero { font-size:6px; }
          .si-dots { display:none; }
          .si-carousel-controls { gap:8px; }
          .si-controls-right { gap:4px; }
          .si-counter { min-width:44px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .si-page *, .si-page *:before, .si-page *:after { scroll-behavior:auto!important; animation-duration:.01ms!important; animation-iteration-count:1!important; transition-duration:.01ms!important; }
        }
      `}</style>

      <header className="si-header">
        <div className="si-wrap si-header-inner">
          <a href="#top" className="si-brand" aria-label="S Interior & Construction, home">
            <span className="si-mark"><span className="si-brand-s">S</span></span>
            <span>
              <span className="si-brand-name">S INTERIOR</span>
              <span className="si-brand-sub">&amp; CONSTRUCTION</span>
            </span>
          </a>
          <nav className="si-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
            <a className="si-nav-cta" href="#contact">Start a conversation <ArrowUpRight size={14} /></a>
          </nav>
          <button
            type="button"
            className="si-menu-toggle"
            ref={menuToggleRef}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="si-mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          {menuOpen && (
            <nav id="si-mobile-navigation" className="si-mobile-nav" aria-label="Mobile navigation">
              {navItems.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={15} /></a>
              ))}
              <a className="si-mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>Start a conversation <ArrowUpRight size={15} /></a>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section className="si-hero" aria-labelledby="si-main-title">
          <div className="si-wrap si-hero-grid">
            <div className="si-hero-copy">
              <p className="si-location">Kuliyapitiya · Sri Lanka</p>
              <p className="si-kicker">S Interior &amp; Construction</p>
              <h1 id="si-main-title" className="si-display si-title">Spaces made<br /><em>to matter.</em></h1>
              <p className="si-intro">Architecture, interiors and construction shaped around the way you want to live, work and welcome.</p>
              <div className="si-hero-actions">
                <a className="si-button-primary" href="#work">Explore selected work <ArrowDown size={14} /></a>
                <a className="si-phone-link" href={phoneLink}>Call 076 986 6660</a>
              </div>
              <div className="si-promise">Design. Build. Trust.</div>
            </div>

            <div
              className="si-carousel"
              role="region"
              aria-roledescription="carousel"
              aria-label="Selected architecture and interior imagery"
              tabIndex={0}
              onKeyDown={handleCarouselKey}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setFocused(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={() => {
                touchStart.current = null;
                touchStartY.current = null;
                setTouching(false);
              }}
            >
              <div className="si-carousel-frame" aria-live="off">
                {slides.map((item, index) => (
                  <img
                    key={item.image}
                    className={`si-slide-image${index === activeSlide ? ' is-active' : ''}`}
                    src={asset(item.image)}
                    alt={item.alt}
                    aria-hidden={index !== activeSlide}
                    style={{
                      opacity: index === activeSlide ? 1 : 0,
                      objectPosition: item.position,
                      zIndex: index === activeSlide ? 0 : -1,
                    }}
                    draggable={false}
                  />
                ))}
                <div className="si-photo-shade" />
                <div className="si-slide-content" aria-live={isPaused ? 'polite' : 'off'} aria-atomic="true">
                  <span>
                    <span className="si-caption-eyebrow">{slide.eyebrow}</span>
                    <span className="si-caption-title">{slide.title}</span>
                  </span>
                  <span className="si-slide-tag">{slide.tag}</span>
                </div>
              </div>
              <div className="si-carousel-controls">
                <span className="si-counter" aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}>
                  <strong>{String(activeSlide + 1).padStart(2, '0')}</strong><span>/ {String(slides.length).padStart(2, '0')}</span>
                </span>
                <div className="si-controls-right">
                  <div className="si-dots" role="group" aria-label="Choose slide">
                    {slides.map((item, index) => (
                      <button
                        key={item.image}
                        type="button"
                        className="si-dot"
                        aria-label={`Show ${item.eyebrow.toLowerCase()}`}
                        aria-current={index === activeSlide}
                        onClick={() => goTo(index)}
                      />
                    ))}
                  </div>
                  <button type="button" className="si-control" aria-label="Previous slide" onClick={() => goTo(activeSlide - 1)}>
                    <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button
                    type="button"
                    className="si-control"
                    aria-label="Next slide"
                    onClick={() => goTo(activeSlide + 1)}
                  >
                    <ArrowRight size={16} />
                  </button>
                  <button
                    type="button"
                    className="si-control"
                    aria-label={reducedMotion ? 'Automatic slide advance is off because reduced motion is enabled' : userPaused ? 'Resume automatic slide advance' : 'Pause automatic slide advance'}
                    aria-pressed={userPaused}
                    disabled={reducedMotion}
                    onClick={() => setUserPaused((paused) => !paused)}
                  >
                    {userPaused ? <Play size={14} /> : <Pause size={14} />}
                  </button>
                </div>
              </div>
              <p className="si-carousel-note">
                {reducedMotion
                  ? 'Automatic movement is off because reduced motion is enabled.'
                  : 'Use the arrows, slide markers or swipe to browse. Auto-advance pauses while you interact.'}
              </p>
            </div>
          </div>
          <div className="si-wrap si-under-hero">
            <span>Independent design &amp; building practice</span>
            <span>Rooted in Kuliyapitiya · Sri Lanka</span>
          </div>
        </section>

        <section id="work" className="si-work">
          <div className="si-wrap">
            <div className="si-work-head">
              <div>
                <div className="si-eyebrow" style={{ color: '#cfb47f' }}>Selected work &amp; visual studies</div>
                <h2 className="si-display">A considered approach,<br /><em>from first line to finish.</em></h2>
              </div>
              <p>A small selection of design imagery. Each image is presented for what it is: a visualization or interior reference, not a claim of a completed commission.</p>
            </div>
            <article className="si-project-feature">
              <div className="si-project-image-wrap">
                <img className="si-project-image" src={asset('platinum-grand-hotel.jpg')} alt="Platinum Grand Hotel facade visualization, showing layered screens and arrival court" width="1024" height="512" loading="lazy" />
                <span className="si-project-badge">Architectural visualization</span>
              </div>
              <div className="si-project-copy">
                <p className="si-index">01 / Hospitality</p>
                <h3>Platinum Grand Hotel</h3>
                <p>An exterior design visualization focused on a welcoming arrival, layered facade screens and a clear relationship between landscape and entrance.</p>
                <span className="si-project-kind">Design intent · Exterior</span>
              </div>
            </article>
            <div className="si-interior-block">
              <div className="si-interior-title">
                <h3>One interior setting, two views</h3>
                <span>Design reference · Not separate commissions</span>
              </div>
              <div className="si-interior-grid">
                <figure>
                  <img src={asset('extra-1.jpg')} alt="Interior reference, view 01: warm dining and living space with soft daylight" width="1024" height="512" loading="lazy" />
                  <figcaption><span>Interior reference · View 01</span><span>02</span></figcaption>
                </figure>
                <figure>
                  <img src={asset('extra-2.jpg')} alt="Interior reference, view 02: alternate view of the same light-filled dining interior" width="1024" height="512" loading="lazy" />
                  <figcaption><span>Interior reference · View 02</span><span>03</span></figcaption>
                </figure>
              </div>
              <p className="si-reference-note">These photographs show alternate views of one interior setting and are included as a design reference. They are not presented as separate completed projects.</p>
            </div>
          </div>
        </section>

        <section id="services" className="si-services">
          <div className="si-wrap si-services-grid">
            <div>
              <div className="si-eyebrow">What we do</div>
              <h2 className="si-display">One studio.<br /><em>Joined-up thinking.</em></h2>
              <p className="si-services-lead">Good building starts with listening. We bring design and delivery into the same conversation, from early ideas to the details that make a space feel resolved.</p>
              <a className="si-text-link" href="#contact">Discuss your brief <ArrowUpRight size={14} /></a>
            </div>
            <div className="si-service-list">
              <div className="si-service-row">
                <DraftingCompass className="si-service-icon" size={23} strokeWidth={1.35} />
                <div className="si-service-body"><h3>Architectural &amp; building design</h3><p>Concept development, spatial planning and design visualisation for residential and commercial briefs.</p></div><span className="si-service-num">01</span>
              </div>
              <div className="si-service-row">
                <Building2 className="si-service-icon" size={23} strokeWidth={1.35} />
                <div className="si-service-body"><h3>Interior design</h3><p>Interior layouts and material direction that bring comfort, function and a coherent character together.</p></div><span className="si-service-num">02</span>
              </div>
              <div className="si-service-row">
                <Ruler className="si-service-icon" size={23} strokeWidth={1.35} />
                <div className="si-service-body"><h3>Construction</h3><p>Construction coordination and delivery, with clear communication and attention to the work on site.</p></div><span className="si-service-num">03</span>
              </div>
              <div className="si-service-row">
                <ScanLine className="si-service-icon" size={23} strokeWidth={1.35} />
                <div className="si-service-body"><h3>CNC signage</h3><p>Custom-cut signage and lettering, designed to make a considered first impression for your space.</p></div><span className="si-service-num">04</span>
              </div>
            </div>
          </div>
        </section>

        <section id="approach" className="si-approach">
          <div className="si-wrap si-approach-grid">
            <div className="si-process-photo">
              <img src={asset('studio-process.jpg')} alt="Design work in progress at a studio desk with architectural drawings and a 3D model on screen" width="1024" height="683" loading="lazy" />
              <span className="si-photo-label">Design, with the details in view</span>
            </div>
            <div>
              <div className="si-eyebrow">A clear process</div>
              <h2 className="si-display">Careful at every<br /><em>scale of the work.</em></h2>
              <div className="si-process-grid">
                <div className="si-process-step"><span>01 / LISTEN</span><p>Understand the site, your priorities and the practical brief.</p></div>
                <div className="si-process-step"><span>02 / SHAPE</span><p>Develop a clear direction with space for your feedback.</p></div>
                <div className="si-process-step"><span>03 / DETAIL</span><p>Resolve the design and align decisions before work begins.</p></div>
                <div className="si-process-step"><span>04 / DELIVER</span><p>Stay connected through construction and the finishing touches.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="si-about">
          <div className="si-wrap si-about-grid">
            <figure className="si-profile">
              <img src={asset('site-portrait.jpg')} alt="M. Sabry Ismath, principal of S Interior & Construction, at a building site" width="762" height="1024" loading="lazy" />
              <figcaption className="si-profile-caption"><strong>M. Sabry Ismath</strong><span>Principal · S Interior &amp; Construction</span></figcaption>
            </figure>
            <div>
              <div className="si-eyebrow">The practice</div>
              <h2 className="si-display">Design that stays<br />grounded in <em>real life.</em></h2>
              <p className="si-about-copy">S Interior &amp; Construction is the practice of M. Sabry Ismath, based in Kuliyapitiya. The work brings architectural and interior design together with construction thinking—so the choices on paper can make sense on site, and in everyday use.</p>
              <p className="si-about-copy">Whether you are planning a new space, refining an interior or looking for custom CNC signage, the first step is a straightforward conversation about what you need.</p>
              <div className="si-about-location"><MapPin size={15} color="#9c7c49" /> Kuliyapitiya, Sri Lanka</div>
            </div>
          </div>
        </section>

        <section id="contact" className="si-contact">
          <div className="si-wrap si-contact-grid">
            <div>
              <div className="si-eyebrow" style={{ color: '#cfb47f' }}>Start with a conversation</div>
              <h2 className="si-display">Have a place<br />in mind<em>?</em></h2>
              <p className="si-contact-copy">Tell us what you are planning. We would be glad to hear about your project and talk through a practical next step.</p>
              <div className="si-contact-actions">
                <a className="si-whatsapp" href={whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> WhatsApp us</a>
                <a className="si-call" href={phoneLink}><Phone size={14} /> Call the studio</a>
              </div>
            </div>
            <div className="si-direct">
              <span className="si-direct-label">Direct contact</span>
              <a className="si-direct-phone" href={phoneLink}>076 986 6660</a>
              <a className="si-direct-wa" href={whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} /> WhatsApp 076 769 8007 <ArrowUpRight size={13} /></a>
              <span className="si-direct-place">Kuliyapitiya · Sri Lanka</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="si-footer">
        <div className="si-wrap si-footer-inner">
          <div className="si-footer-brand"><b>S</b><span>S Interior &amp; Construction</span></div>
          <p>Design. Build. Trust.</p>
          <a href="#top">Back to top <ArrowUpRight size={13} /></a>
        </div>
      </footer>
    </div>
  );
}

export default PortfolioPage;
