'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type GalleryItem = {
  title: string
  type: string
  image: string
  alt: string
  hoverImage?: string
  hoverAlt?: string
  hoverVideo?: string
  badge?: string
  zoom?: boolean
}

const gallery: GalleryItem[] = [
  {
    title: 'Love on Fire',
    type: 'Acrylic',
    image: '/images/coral-heart-set.jpg',
    alt: 'Long coral red nails with a soft pink heart accent by Maria',
    badge: 'Recently Done!',
  },
  {
    title: 'Sunbeam French',
    type: 'Art',
    image: '/images/sunbeam-french-set.jpg',
    alt: 'Yellow French tip nails with white floral accents and gems by Maria',
  },
  {
    title: 'Midnight Confetti',
    type: 'Gel',
    image: '/images/midnight-confetti-set.jpg',
    alt: 'Deep blue glitter gel nails by Maria',
  },
  {
    title: 'French Flower',
    type: 'Art',
    image: '/images/french-bow-set.jpg',
    alt: 'White French manicure with delicate bow accents by Maria',
    hoverImage: '/images/french-bow-closeup.jpg',
    hoverAlt: 'Close-up of a white French nail with a hand-painted bow and gold gem',
  },
  {
    title: 'Neon Garden',
    type: 'Art',
    image: '/images/neon-garden-set.jpg',
    alt: 'Short nails with pink swirls, flowers, and a butterfly by Maria',
  },
  {
    title: 'Seaside Blooms',
    type: 'Acrylic',
    image: '/images/white-floral-set.png',
    alt: 'Long white glitter nails with pink flowers and gold starfish by Maria',
  },
  {
    title: 'Blue Crush',
    type: 'Acrylic',
    image: '/images/blue-glitter-set.png',
    alt: 'Long turquoise glitter nails with blue art by Maria',
  },
  {
    title: 'Electric Lime',
    type: 'Acrylic',
    image: '/images/green-gloss-set.png',
    alt: 'Glossy vivid green sculpted nails by Maria',
  },
  {
    title: 'Monsta X Spark',
    type: 'Art',
    image: '/images/monster-glitter-set.jpg',
    alt: 'Red, black, and holographic glitter nail art by Maria',
    hoverImage: '/images/monster-logo-set.jpg',
    hoverAlt: 'Black and red graphic nails with glitter accents by Maria',
  },
  {
    title: 'Disco Dust',
    type: 'Gel',
    image: '/images/silver-dip-set.jpg',
    alt: 'Short silver holographic glitter nails by Maria',
  },
  {
    title: 'Silver Lining',
    type: 'Gel',
    image: '/images/silver-glitter-set.jpg',
    alt: 'Soft square silver glitter manicure by Maria',
  },
  {
    title: 'Petal French',
    type: 'Art',
    image: '/images/floral-french-set.jpg',
    alt: 'Classic French manicure with delicate red and green floral details by Maria',
    zoom: true,
  },
  {
    title: 'Sweetheart',
    type: 'Acrylic',
    image: '/images/pink-heart-set.jpg',
    alt: 'Long blush pink nails with crystal hearts and glitter by Maria',
    hoverVideo: '/images/sweetheart-hover.mp4',
  },
  {
    title: 'Secret Garden',
    type: 'Art',
    image: '/images/garden-jewel-set.jpg',
    alt: 'Pink and clear sculpted nails with blue flowers and crystal jewels by Maria',
  },
  {
    title: 'Electric Blue',
    type: 'Gel',
    image: '/images/electric-blue-set.jpg',
    alt: 'Bright blue square gel nails by Maria',
    hoverImage: '/images/electric-blue-glow-set.jpg',
    hoverAlt: 'Electric blue glow-in-the-dark square nails by Maria',
  },
  {
    title: 'Tangerine Gems',
    type: 'Art',
    image: '/images/orange-gem-set.jpg',
    alt: 'Neon orange nails with iridescent gems and foil details by Maria',
    hoverVideo: '/images/tangerine-gems-hover.mp4',
  },
]

const services = [
  {
    name: 'The Sweet Set',
    detail:
      'A structured gel or acrylic overlay on your natural nails, or acrylic extensions, finished with one colour and nourishing cuticle oil.',
    time: '60 min',
    price: '$55',
  },
  {
    name: 'Little Treat',
    detail:
      'Acrylic overlay or extensions with simple art on 2–4 nails. Think dots, chrome, or tiny florals.',
    time: '75 min',
    price: '$68',
  },
  {
    name: 'Main Character',
    detail: 'A fully custom set with layered art, charms, aura, or hand-painted details.',
    time: '90–120 min',
    price: '$85+',
  },
  {
    name: 'Fresh Start',
    detail:
      'Gentle acrylic or gel removal, detailed cuticle care, shaping, and a strengthening treatment for your natural nails.',
    time: '45 min',
    price: '$40',
  },
]

function Flower({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="21" r="18" />
      <circle cx="78" cy="43" r="18" />
      <circle cx="67" cy="76" r="18" />
      <circle cx="33" cy="76" r="18" />
      <circle cx="22" cy="43" r="18" />
      <circle className="flower-center" cx="50" cy="50" r="15" />
    </svg>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Acrylic', 'Art', 'Gel']

  const closeMenu = () => setMenuOpen(false)
  const visibleWork = filter === 'All' ? gallery : gallery.filter((item) => item.type === filter)
  const navClasses = [
    'max-[900px]:absolute max-[900px]:inset-x-0 max-[900px]:top-0 max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-0 max-[900px]:border-b max-[900px]:border-[var(--ink)] max-[900px]:bg-[var(--cream)] max-[900px]:px-[5vw] max-[900px]:pt-[85px] max-[900px]:pb-[30px] max-[900px]:transition-[opacity,transform] max-[900px]:duration-[180ms]',
    menuOpen
      ? 'max-[900px]:pointer-events-auto max-[900px]:translate-y-0 max-[900px]:opacity-100'
      : 'max-[900px]:pointer-events-none max-[900px]:-translate-y-5 max-[900px]:opacity-0',
  ].join(' ')
  const navLinkClasses =
    "max-[900px]:border-b max-[900px]:border-[rgba(48,35,31,0.15)] max-[900px]:py-[14px] max-[900px]:font-['Playfair_Display'] max-[900px]:text-[30px]"
  const navCtaClasses =
    "max-[900px]:py-[14px] max-[900px]:font-['Playfair_Display'] max-[900px]:text-[30px]"

  return (
    <main>
      <header className="site-header max-[900px]:h-[70px]">
        <a
          className="brand"
          href="#top"
          onClick={closeMenu}
          aria-label="Marshmallowmami Nails home"
        >
          <Image
            className="brand-logo max-[900px]:h-[54px] max-[900px]:w-[54px]"
            src="/images/marshmallowmami-nail-charm-logo.png"
            alt="Marshmallowmami Nails"
            width={990}
            height={990}
            priority
          />
        </a>
        <button
          className="menu-button max-[900px]:relative max-[900px]:z-[2] max-[900px]:block"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
        </button>
        <nav className={navClasses} aria-label="Main navigation">
          <a className={navLinkClasses} href="#work" onClick={closeMenu}>
            Work
          </a>
          <a className={navLinkClasses} href="#services" onClick={closeMenu}>
            Services
          </a>
          <a className={navLinkClasses} href="#about" onClick={closeMenu}>
            About
          </a>
          <Link
            className={`${navCtaClasses} nav-cta max-[900px]:mt-5 max-[900px]:border-0 max-[900px]:rounded-none max-[900px]:px-0 max-[900px]:text-center`}
            href="/book"
            onClick={closeMenu}
          >
            Book a set
          </Link>
        </nav>
      </header>

      <section className="hero max-[900px]:grid-cols-1 max-[900px]:pt-[70px]" id="top">
        <div className="hero-copy max-[900px]:min-h-[640px] max-[900px]:px-[6vw] max-[900px]:pt-20 max-[900px]:pb-[65px] max-[640px]:min-h-[590px]">
          <div className="eyebrow">
            <span />
            Independent nail artist · Batehaven, NSW
          </div>
          <h1 className="max-[640px]:text-[64px]">
            Tiny art.
            <br />
            <em>Big mood.</em>
          </h1>
          <p>
            Thoughtful gel manicures, acrylic and playful nail art, made slowly in a cozy little
            studio. ❤︎
          </p>
          <div className="hero-actions max-[640px]:items-start max-[640px]:flex-col">
            <Link className="button button-dark" href="/book">
              Book your set <span aria-hidden="true">↗</span>
            </Link>
            <a className="text-link" href="#work">
              See my work <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="trust-note max-[640px]:mt-[55px]">
            <div className="stars" aria-label="5 out of 5 stars">
              ★ ★ ★ ★ ★
            </div>
            <span>Loved by 100+ happy hands</span>
          </div>
        </div>

        <div className="hero-visual max-[900px]:min-h-[690px] max-[640px]:min-h-[540px] max-[640px]:px-[8%] max-[640px]:py-[10%]">
          <div className="hero-image-wrap max-[640px]:min-h-[450px]">
            <Image
              src="/images/pink-heart-set.jpg"
              alt="Blush pink crystal heart nail art created by Maria"
              fill
              sizes="(max-width: 900px) 84vw, 45vw"
              priority
            />
          </div>
          <div className="hero-sticker max-[640px]:right-[1%] max-[640px]:h-[105px] max-[640px]:w-[105px]">
            <Flower className="max-[640px]:h-[30px] max-[640px]:w-[30px]" />
            <span>Soft gel specialist</span>
          </div>
          <div className="scribble">cute nails club</div>
        </div>
      </section>

      <div className="marquee" aria-label="Studio values">
        <div>
          <span>Detailed cuticle care</span>
          <i>✦</i>
          <span>Healthy nail focused</span>
          <i>✦</i>
          <span>Custom art welcome</span>
          <i>✦</i>
          <span>Good vibes only</span>
          <i>✦</i>
        </div>
      </div>

      <section className="work section max-[900px]:px-[6vw] max-[900px]:py-[100px]" id="work">
        <div className="section-heading max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-[35px]">
          <div>
            <p className="kicker">Fresh from the studio</p>
            <h2 className="max-[640px]:text-[49px]">
              Recent little <em>masterpieces.</em>
            </h2>
          </div>
          <div className="filters" aria-label="Filter nail work">
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                className={filter === item ? 'active' : ''}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {visibleWork.map((item, index) => (
            <figure
              className={`gallery-card card-${index + 1}`}
              key={item.title}
              tabIndex={item.hoverImage || item.hoverVideo ? 0 : undefined}
            >
              <div className="gallery-image">
                {item.badge && <span className="gallery-badge">{item.badge}</span>}
                <Image
                  className={[
                    item.hoverImage || item.hoverVideo ? 'gallery-image-primary' : '',
                    item.zoom ? 'gallery-image-zoomed' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 44vw, 42vw"
                />
                {item.hoverImage && (
                  <Image
                    className="gallery-image-hover"
                    src={item.hoverImage}
                    alt={item.hoverAlt ?? ''}
                    fill
                    sizes="(max-width: 640px) 44vw, 42vw"
                  />
                )}
                {item.hoverVideo && (
                  <video
                    className="gallery-image-hover"
                    src={item.hoverVideo}
                    aria-label={`Video preview of ${item.title} nails`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
              <figcaption>
                <span className="max-[640px]:text-[17px]">{item.title}</span>
                <small className="max-[640px]:hidden">{item.type}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className="services section max-[900px]:grid-cols-1 max-[900px]:gap-[70px] max-[900px]:px-[6vw] max-[900px]:py-[100px]"
        id="services"
      >
        <div className="service-intro max-[900px]:static">
          <p className="kicker">The nail menu</p>
          <h2 className="max-[640px]:text-[49px]">
            Pick your <em>pleasure.</em>
          </h2>
          <p>
            Every appointment includes detailed prep, shaping, acrylic, and cuticle oil. Come with
            an idea or let me surprise you.
          </p>
          <a className="text-link" href="#book">
            Not sure what to book? Let’s chat <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="price-list">
          {services.map((service, index) => (
            <article className="max-[640px]:grid-cols-[30px_1fr_auto]" key={service.name}>
              <span className="service-number">0{index + 1}</span>
              <div>
                <h3 className="max-[640px]:text-[23px]">{service.name}</h3>
                <p>{service.detail}</p>
                <small>{service.time}</small>
              </div>
              <strong>{service.price}</strong>
            </article>
          ))}
          <p className="price-note">Removal from another studio is +$15.</p>
        </div>
      </section>

      <section
        className="about section max-[900px]:grid-cols-1 max-[900px]:gap-[70px] max-[900px]:px-[6vw] max-[900px]:pt-[90px] max-[900px]:pb-[100px]"
        id="about"
      >
        <div className="about-collage max-[900px]:order-2 max-[640px]:min-h-[500px]">
          <div className="about-image-main max-[640px]:h-[450px] max-[640px]:w-[88%]">
            <Image
              src="/images/white-floral-set.png"
              alt="White floral nail art created by Maria"
              fill
              sizes="(max-width: 900px) 70vw, 38vw"
            />
          </div>
          <div className="about-image-small max-[640px]:h-[175px] max-[640px]:w-[42%]">
            <Image
              src="/images/green-gloss-set.png"
              alt="Bright green sculpted nails created by Maria"
              fill
              sizes="(max-width: 900px) 34vw, 18vw"
            />
          </div>
          <div className="about-badge">
            <Flower />
            <span className="about-badge-label">Certified &amp; obsessed</span>
          </div>
        </div>
        <div className="about-copy">
          <p className="kicker">Meet your nail bestie</p>
          <h2 className="max-[640px]:text-[49px]">Hi, I’m Maria.</h2>
          <p className="about-lede">
            I believe getting your nails done should feel like a tiny vacation.
          </p>
          <p>
            I’m an independent nail artist with a soft spot for tiny details, unexpected color
            combos, and making people feel really good about their hands. My one-on-one studio is
            calm, inclusive, and never rushed.
          </p>
          <div className="about-facts">
            <div>
              <strong>4+</strong>
              <span>years painting tiny canvases</span>
            </div>
            <div>
              <strong>700+</strong>
              <span>sets created with care</span>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial max-[640px]:px-[6vw] max-[640px]:py-[90px]">
        <Flower className="quote-flower" />
        <p className="kicker">Love notes</p>
        <blockquote className="max-[640px]:text-[36px]">
          “Maria is pure magic. My nails have never been healthier, and somehow she turns every
          random idea I bring into the cutest set ever.”
        </blockquote>
        <p className="client">— Jamie, regular since 2022</p>
      </section>

      <section
        className="booking section max-[900px]:grid-cols-1 max-[900px]:gap-[70px] max-[900px]:px-[6vw] max-[900px]:py-[100px]"
        id="book"
      >
        <div className="booking-copy">
          <p className="kicker">Ready when you are</p>
          <h2 className="max-[640px]:text-[49px]">
            Your dream nails are <em>one click away.</em>
          </h2>
          <p>
            Appointments are released on the 20th of each month. New clients are always welcome.
          </p>
          <Link className="button button-light" href="/book">
            Book an appointment <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="booking-info max-[900px]:mt-[10px]">
          <div>
            <span>Location</span>
            <p>
              Private home studio
              <br />
              Clare Crescent  · Batehaven, NSW
            </p>
          </div>
          <div>
            <span>Studio hours</span>
            <p>
              Mon–Sun
              <br />
              9am–6pm
            </p>
          </div>
          <div>
            <span>Say hello</span>
            <p className="social-links">
              <a
                href="https://www.instagram.com/marshmallowmami.nails/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram · @marshmallowmami.nails
              </a>
              <a
                href="https://www.tiktok.com/@marshmallowmami.nails?lang=en"
                target="_blank"
                rel="noreferrer"
              >
                TikTok · @marshmallowmami.nails
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="max-[640px]:grid-cols-1 max-[640px]:gap-5 max-[640px]:text-center">
        <a
          className="brand footer-brand max-[640px]:justify-self-center"
          href="#top"
          aria-label="Marshmallowmami Nails home"
        >
          <Image
            className="brand-logo"
            src="/images/marshmallowmami-nail-charm-logo.png"
            alt="Marshmallowmami Nails"
            width={990}
            height={990}
          />
        </a>
        <p>Small studio. Big nail energy.</p>
        <div className="max-[640px]:items-center">
          <a href="#top">Back to top ↑</a>
          <span>© 2025 Marshmallowmami Nails</span>
        </div>
      </footer>
    </main>
  )
}
