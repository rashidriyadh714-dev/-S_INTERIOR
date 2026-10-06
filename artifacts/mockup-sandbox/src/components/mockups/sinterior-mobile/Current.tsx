import './_group.css';
import { useState, type PointerEvent } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X, Phone, MessageCircle, MapPin, DraftingCompass, Building2, Ruler, ScanLine } from 'lucide-react';

const asset = (name: string) => `/__mockup/images/${name}`;
const phoneLink = 'tel:+94769866660';
const whatsappLink = 'https://wa.me/94767698007?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20project.';

const sections = [
  ['Work', '#work'],
  ['Services', '#services'],
  ['Approach', '#approach'],
  ['About', '#about'],
];

function tiltHero(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  event.currentTarget.style.setProperty('--tilt-x', `${((0.5 - y) * 3.2).toFixed(2)}deg`);
  event.currentTarget.style.setProperty('--tilt-y', `${((x - 0.5) * 4).toFixed(2)}deg`);
}

function resetHeroTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--tilt-x', '0deg');
  event.currentTarget.style.setProperty('--tilt-y', '0deg');
}

function BrandMark() {
  return (
    <a href="#top" aria-label="S Interior & Construction, home" className="flex items-center gap-3 no-underline">
      <span className="relative flex h-11 w-11 items-center justify-center border border-[#b6975d] text-[#b6975d]">
        <span className="serif text-[28px] leading-none">S</span>
        <span className="absolute bottom-[5px] right-[5px] h-1.5 w-1.5 rounded-full bg-[#b6975d]" />
      </span>
      <span className="leading-tight">
        <span className="display block text-[12px] font-extrabold tracking-[.12em] text-[#192438]">S INTERIOR</span>
        <span className="mt-1 block text-[9px] font-semibold tracking-[.19em] text-[#7f786c]">& CONSTRUCTION</span>
      </span>
    </a>
  );
}

export function Current() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div id="top" className="min-h-[100dvh] overflow-hidden bg-[#f4f0e7] text-[#192438]">
      <header className="sticky top-0 z-40 border-b border-[#192438]/10 bg-[#f4f0e7]/95 backdrop-blur-md">
        <div className="wrap relative flex h-[78px] items-center justify-between">
          <BrandMark />
          <nav aria-label="Main navigation" className="desktop-nav flex items-center gap-9 text-[11px] font-semibold tracking-[.08em] text-[#44494e]">
            {sections.map(([label, href]) => <a className="nav-link" href={href} key={label}>{label}</a>)}
            <a href="#contact" data-testid="link-start-conversation" className="nav-contact-link ml-1 inline-flex h-10 items-center gap-3 bg-[#192438] px-5 text-[10px] uppercase tracking-[.12em] text-[#f4f0e7] transition-colors hover:bg-[#293751]">
              Start a conversation <ArrowUpRight size={14} strokeWidth={1.6} />
            </a>
          </nav>
          <button data-testid="button-toggle-navigation" className="mobile-menu h-10 w-10 items-center justify-center border border-[#192438]/20" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          {menuOpen && <nav className="mobile-nav-panel z-50 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col">
              {sections.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="border-b border-[#192438]/10 py-3 text-sm font-medium no-underline">{label}</a>)}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-5 flex items-center justify-between bg-[#192438] px-4 py-3 text-sm text-[#f4f0e7] no-underline">Start a conversation <ArrowUpRight size={16} /></a>
            </div>
          </nav>}
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-[76px]">
          <div className="wrap hero-grid grid grid-cols-[.86fr_1.14fr] items-center gap-12">
            <div className="hero-copy reveal relative z-10 py-5">
              <div className="eyebrow mb-8">Kuliyapitiya · Sri Lanka</div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.17em] text-[#777367]">S Interior &amp; Construction</p>
              <h1 className="hero-title display mb-6 max-w-[570px] text-[clamp(54px,6.2vw,86px)] font-semibold leading-[.99] tracking-[-.065em]">
                Spaces made<br /><span className="serif font-medium italic tracking-[-.045em] text-[#9c7c49]">to matter.</span>
              </h1>
              <p className="max-w-[410px] text-[15px] leading-[1.85] text-[#5f625f]">
                Architecture, interiors and construction shaped around the way you want to live, work and welcome.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a href="#work" data-testid="link-explore-work" className="hero-primary-cta inline-flex items-center gap-3 bg-[#192438] px-6 py-4 text-[10px] font-semibold uppercase tracking-[.13em] text-[#f4f0e7] no-underline transition-colors hover:bg-[#293751]">
                  Explore selected work <ArrowDown size={14} />
                </a>
                <a href={phoneLink} className="text-[11px] font-semibold tracking-[.04em] text-[#454b52] no-underline hover:text-[#9c7c49]">Call 076 986 6660</a>
              </div>
              <div className="mt-12 flex items-center gap-3 border-t border-[#192438]/15 pt-5 text-[10px] uppercase tracking-[.13em] text-[#777367]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b6975d]" /> Design. Build. Trust.
              </div>
            </div>
            <figure onPointerMove={tiltHero} onPointerLeave={resetHeroTilt} className="hero-photo grain relative m-0 min-h-[455px] overflow-hidden bg-[#d6d1c5] shadow-[0_28px_65px_rgba(25,36,56,.16)] md:min-h-[540px]">
              <img src={asset('platinum-grand-hotel.jpg')} alt="Architectural visualization of the Platinum Grand Hotel entrance and facade" width="1024" height="512" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101a2b]/60 via-transparent to-[#101a2b]/10" />
              <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 text-[#f5f1e9] md:p-8">
                <span>
                  <span className="mb-2 block text-[9px] uppercase tracking-[.2em] text-[#e0c893]">Featured architectural visualization</span>
                  <span className="serif text-[25px]">Platinum Grand Hotel</span>
                </span>
                <span className="border border-white/45 px-3 py-2 text-[9px] uppercase tracking-[.16em]">Exterior study</span>
              </figcaption>
              <a href="#work" data-testid="link-hotel-details" aria-label="View Platinum Grand Hotel project details" className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white transition-colors hover:bg-white/15"><ArrowUpRight size={17} strokeWidth={1.3} /></a>
            </figure>
          </div>
          <div className="wrap mt-10 flex items-center justify-between border-t border-[#192438]/15 pt-5 text-[9px] uppercase tracking-[.16em] text-[#7e7a70]">
            <span>Independent design &amp; building practice</span><span className="hidden sm:inline">Rooted in Kuliyapitiya · Sri Lanka</span>
          </div>
        </section>

        <section id="work" className="section-pad bg-[#192438] py-24 text-[#f4f0e7]">
          <div className="wrap">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="eyebrow mb-5 !text-[#cfb47f]">Selected work &amp; visual studies</div>
                <h2 className="display max-w-[600px] text-[clamp(34px,5vw,59px)] font-medium leading-[1.08] tracking-[-.05em]">A considered approach,<br /><span className="serif font-medium italic text-[#cfb47f]">from first line to finish.</span></h2>
              </div>
              <p className="max-w-[290px] pb-1 text-[13px] leading-[1.8] text-[#c5c4be]">A small selection of design imagery. Each image is presented for what it is: a visualization or interior reference, not a claim of a completed commission.</p>
            </div>
            <article className="project-layout grid grid-cols-[1.5fr_.72fr] items-end gap-9">
              <figure className="project-frame relative m-0 overflow-hidden bg-[#263349]">
                <img src={asset('platinum-grand-hotel.jpg')} alt="Platinum Grand Hotel facade visualization, showing layered screens and arrival court" width="1024" height="512" loading="lazy" className="project-image block aspect-[1.78] w-full object-cover" />
                <span className="absolute left-5 top-5 bg-[#192438]/85 px-3 py-2 text-[9px] uppercase tracking-[.17em] text-[#e4d2aa]">Architectural visualization</span>
              </figure>
              <div className="pb-2">
                <p className="mb-3 text-[10px] uppercase tracking-[.18em] text-[#cfb47f]">01 / Hospitality</p>
                <h3 className="serif mb-4 text-[34px] font-medium leading-tight">Platinum Grand<br />Hotel</h3>
                <p className="mb-7 text-[13px] leading-[1.9] text-[#c5c4be]">An exterior design visualization focused on a welcoming arrival, layered facade screens and a clear relationship between landscape and entrance.</p>
                <span className="inline-flex items-center gap-3 border-t border-white/20 pt-4 text-[10px] uppercase tracking-[.15em] text-[#e4d2aa]">Design intent · Exterior</span>
              </div>
            </article>
            <div className="interior-grid mt-20 grid grid-cols-2 gap-5 md:gap-8">
              <figure className="project-frame relative m-0 overflow-hidden bg-[#263349]">
                <img src={asset('extra-1.jpg')} alt="Interior reference showing a warm dining and living space with soft daylight" width="1024" height="512" loading="lazy" className="project-image block aspect-[1.52] w-full object-cover" />
                <figcaption className="flex items-center justify-between border-b border-white/20 py-4 text-[10px] uppercase tracking-[.13em] text-[#e4d2aa]"><span>Interior reference · View 01</span><span>02</span></figcaption>
              </figure>
              <figure className="project-frame relative m-0 mt-0 overflow-hidden bg-[#263349] md:mt-20">
                <img src={asset('extra-2.jpg')} alt="Alternate view of a light-filled dining interior with timber furniture and woven pendant" width="1024" height="512" loading="lazy" className="project-image block aspect-[1.52] w-full object-cover" />
                <figcaption className="flex items-center justify-between border-b border-white/20 py-4 text-[10px] uppercase tracking-[.13em] text-[#e4d2aa]"><span>Interior reference · View 02</span><span>03</span></figcaption>
              </figure>
            </div>
            <p className="mt-5 max-w-[690px] text-[11px] leading-[1.8] text-[#aeb3b7]">The two interior photographs show alternate views of one interior setting and are included as a design reference. They are not presented as separate completed projects.</p>
          </div>
        </section>

        <section id="services" className="section-pad py-24">
          <div className="wrap service-grid grid grid-cols-[.75fr_1.25fr] gap-20">
            <div className="pt-2">
              <div className="eyebrow mb-5">What we do</div>
              <h2 className="display text-[clamp(36px,4.5vw,56px)] font-medium leading-[1.08] tracking-[-.055em]">One studio.<br /><span className="serif italic text-[#9c7c49]">Joined-up thinking.</span></h2>
              <p className="mt-6 max-w-[330px] text-[13px] leading-[1.9] text-[#66665f]">Good building starts with listening. We bring design and delivery into the same conversation, from early ideas to the details that make a space feel resolved.</p>
              <a href="#contact" className="outline-link mt-7 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.14em]">Discuss your brief <ArrowUpRight size={14} /></a>
            </div>
            <div className="border-t border-[#192438]/20">
              <div className="service-row flex gap-5 border-b border-[#192438]/20 px-3 py-6 md:py-7">
                <DraftingCompass className="mt-1 shrink-0 text-[#9c7c49]" size={23} strokeWidth={1.3} />
                <div className="flex-1">
                  <h3 className="display mb-2 text-[19px] font-semibold tracking-[-.025em]">Architectural &amp; building design</h3>
                  <p className="max-w-[500px] text-[12px] leading-[1.8] text-[#66665f]">Concept development, spatial planning and design visualisation for residential and commercial briefs.</p>
                </div><span className="pt-1 text-[10px] text-[#9a9387]">01</span>
              </div>
              <div className="service-row flex gap-5 border-b border-[#192438]/20 px-3 py-6 md:py-7">
                <Building2 className="mt-1 shrink-0 text-[#9c7c49]" size={23} strokeWidth={1.3} />
                <div className="flex-1">
                  <h3 className="display mb-2 text-[19px] font-semibold tracking-[-.025em]">Interior design</h3>
                  <p className="max-w-[500px] text-[12px] leading-[1.8] text-[#66665f]">Interior layouts and material direction that bring comfort, function and a coherent character together.</p>
                </div><span className="pt-1 text-[10px] text-[#9a9387]">02</span>
              </div>
              <div className="service-row flex gap-5 border-b border-[#192438]/20 px-3 py-6 md:py-7">
                <Ruler className="mt-1 shrink-0 text-[#9c7c49]" size={23} strokeWidth={1.3} />
                <div className="flex-1">
                  <h3 className="display mb-2 text-[19px] font-semibold tracking-[-.025em]">Construction</h3>
                  <p className="max-w-[500px] text-[12px] leading-[1.8] text-[#66665f]">Construction coordination and delivery, with clear communication and attention to the work on site.</p>
                </div><span className="pt-1 text-[10px] text-[#9a9387]">03</span>
              </div>
              <div className="service-row flex gap-5 border-b border-[#192438]/20 px-3 py-6 md:py-7">
                <ScanLine className="mt-1 shrink-0 text-[#9c7c49]" size={23} strokeWidth={1.3} />
                <div className="flex-1">
                  <h3 className="display mb-2 text-[19px] font-semibold tracking-[-.025em]">CNC signage</h3>
                  <p className="max-w-[500px] text-[12px] leading-[1.8] text-[#66665f]">Custom-cut signage and lettering, designed to make a considered first impression for your space.</p>
                </div><span className="pt-1 text-[10px] text-[#9a9387]">04</span>
              </div>
            </div>
          </div>
        </section>

        <section id="approach" className="relative overflow-hidden bg-[#e8e2d6] py-20 md:py-24">
          <div className="wrap approach-grid grid grid-cols-[.56fr_1fr] items-center gap-14">
            <div className="relative">
              <div className="absolute -left-5 -top-5 h-full w-full border border-[#b6975d]/50" />
              <img src={asset('studio-process.jpg')} alt="Design work in progress at a studio desk with architectural drawings and a 3D model on screen" width="1024" height="683" loading="lazy" className="relative z-10 block aspect-[1.3] w-full object-cover" />
              <span className="absolute bottom-[-17px] right-[-14px] z-20 bg-[#192438] px-4 py-3 text-[9px] uppercase tracking-[.15em] text-[#e9d8b3]">Design, with the details in view</span>
            </div>
            <div>
              <div className="eyebrow mb-5">A clear process</div>
              <h2 className="display mb-7 text-[clamp(35px,4vw,52px)] font-medium leading-[1.08] tracking-[-.055em]">Careful at every<br /><span className="serif italic text-[#9c7c49]">scale of the work.</span></h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-7">
                <div className="border-t border-[#192438]/20 pt-4"><span className="text-[10px] font-semibold tracking-[.14em] text-[#a07f4c]">01 / LISTEN</span><p className="mt-2 text-[12px] leading-[1.8] text-[#5f625f]">Understand the site, your priorities and the practical brief.</p></div>
                <div className="border-t border-[#192438]/20 pt-4"><span className="text-[10px] font-semibold tracking-[.14em] text-[#a07f4c]">02 / SHAPE</span><p className="mt-2 text-[12px] leading-[1.8] text-[#5f625f]">Develop a clear direction with space for your feedback.</p></div>
                <div className="border-t border-[#192438]/20 pt-4"><span className="text-[10px] font-semibold tracking-[.14em] text-[#a07f4c]">03 / DETAIL</span><p className="mt-2 text-[12px] leading-[1.8] text-[#5f625f]">Resolve the design and align decisions before work begins.</p></div>
                <div className="border-t border-[#192438]/20 pt-4"><span className="text-[10px] font-semibold tracking-[.14em] text-[#a07f4c]">04 / DELIVER</span><p className="mt-2 text-[12px] leading-[1.8] text-[#5f625f]">Stay connected through construction and the finishing touches.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-pad py-24">
          <div className="wrap profile-grid grid grid-cols-[.8fr_1.2fr] items-center gap-16">
            <figure className="profile-photo relative m-0 min-h-[510px] bg-[#d5cec0]">
              <img src={asset('site-portrait.jpg')} alt="M. Sabry Ismath, principal of S Interior & Construction, at a building site" width="762" height="1024" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#192438]/90 to-transparent px-6 pb-6 pt-16 text-[#f4f0e7]">
                <span className="serif block text-[26px]">M. Sabry Ismath</span><span className="mt-1 block text-[9px] uppercase tracking-[.18em] text-[#e4d2aa]">Principal · S Interior &amp; Construction</span>
              </figcaption>
            </figure>
            <div>
              <div className="eyebrow mb-5">The practice</div>
              <h2 className="display max-w-[570px] text-[clamp(38px,5vw,63px)] font-medium leading-[1.04] tracking-[-.06em]">Design that stays<br />grounded in <span className="serif italic text-[#9c7c49]">real life.</span></h2>
              <p className="mt-7 max-w-[520px] text-[14px] leading-[1.95] text-[#5f625f]">S Interior &amp; Construction is the practice of M. Sabry Ismath, based in Kuliyapitiya. The work brings architectural and interior design together with construction thinking—so the choices on paper can make sense on site, and in everyday use.</p>
              <p className="mt-4 max-w-[520px] text-[14px] leading-[1.95] text-[#5f625f]">Whether you are planning a new space, refining an interior or looking for custom CNC signage, the first step is a straightforward conversation about what you need.</p>
              <div className="mt-8 flex items-center gap-4 border-t border-[#192438]/15 pt-5 text-[10px] uppercase tracking-[.15em] text-[#777367]"><MapPin size={15} className="text-[#9c7c49]" /> Kuliyapitiya, Sri Lanka</div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-[#192438] py-20 text-[#f4f0e7] md:py-24">
          <div className="absolute -right-20 -top-28 h-[430px] w-[430px] rounded-full border border-[#cfb47f]/10" />
          <div className="absolute -right-2 -top-10 h-[290px] w-[290px] rounded-full border border-[#cfb47f]/10" />
          <div className="wrap contact-grid relative grid grid-cols-[1fr_.7fr] gap-16">
            <div>
              <div className="eyebrow mb-5 !text-[#cfb47f]">Start with a conversation</div>
              <h2 className="display max-w-[590px] text-[clamp(44px,6vw,76px)] font-medium leading-[1.02] tracking-[-.06em]">Have a place<br />in mind<span className="serif italic text-[#cfb47f]">?</span></h2>
              <p className="mt-6 max-w-[440px] text-[14px] leading-[1.9] text-[#c5c4be]">Tell us what you are planning. We would be glad to hear about your project and talk through a practical next step.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#cfb47f] px-6 py-4 text-[10px] font-bold uppercase tracking-[.13em] text-[#192438] no-underline transition-colors hover:bg-[#dfc99d]"><MessageCircle size={15} /> WhatsApp us</a>
                <a href={phoneLink} className="inline-flex items-center gap-3 border border-white/35 px-6 py-4 text-[10px] font-semibold uppercase tracking-[.13em] text-[#f4f0e7] no-underline transition-colors hover:bg-white/10"><Phone size={14} /> Call the studio</a>
              </div>
            </div>
            <div className="self-end border-t border-white/25 pt-6">
              <span className="block text-[9px] uppercase tracking-[.18em] text-[#cfb47f]">Direct contact</span>
              <a href={phoneLink} className="mt-3 block text-[22px] font-medium tracking-[.03em] text-[#f4f0e7] no-underline hover:text-[#cfb47f]">076 986 6660</a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-[13px] text-[#c5c4be] no-underline hover:text-[#cfb47f]"><MessageCircle size={14} /> WhatsApp 076 769 8007 <ArrowUpRight size={13} /></a>
              <span className="mt-7 block text-[10px] uppercase tracking-[.15em] text-[#b2b3b2]">Kuliyapitiya · Sri Lanka</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#121c2d] py-7 text-[#c5c4be]">
        <div className="wrap footer-row flex items-center justify-between">
          <div className="flex items-center gap-3"><span className="serif text-[24px] text-[#cfb47f]">S</span><span className="text-[9px] uppercase tracking-[.14em]">S Interior &amp; Construction</span></div>
          <p className="m-0 text-[10px] tracking-[.04em]">Design. Build. Trust.</p>
          <a href="#top" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[.15em] text-[#e2d7c1] no-underline hover:text-[#cfb47f]">Back to top <ArrowUpRight size={13} /></a>
        </div>
      </footer>
    </div>
  );
}

