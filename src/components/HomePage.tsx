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

  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          onClick={closeMenu}
          aria-label="Marshmallowmami Nails home"
        >
          <Image
            className="brand-logo"
            src="/images/marshmallowmami-nail-charm-logo.png"
            alt="Marshmallowmami Nails"
            width={990}
            height={990}
            priority
          />
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>
            Work
          </a>
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <Link className="nav-cta" href="/book" onClick={closeMenu}>
            Book a set
          </Link>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            Independent nail artist · Batehaven, NSW
          </div>
          <h1>
            Tiny art.
            <br />
            <em>Big mood.</em>
          </h1>
          <p>
            Thoughtful gel manicures, acrylic and playful nail art, made slowly in a cozy little
            studio. ❤︎
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/book">
              Book your set <span aria-hidden="true">↗</span>
            </Link>
            <a className="text-link" href="#work">
              See my work <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="trust-note">
            <div className="stars" aria-label="5 out of 5 stars">
              ★ ★ ★ ★ ★
            </div>
            <span>Loved by 100+ happy hands</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrap">
            <Image
              src="/images/pink-heart-set.jpg"
              alt="Blush pink crystal heart nail art created by Maria"
              fill
              sizes="(max-width: 900px) 84vw, 45vw"
              priority
            />
          </div>
          <div className="hero-sticker">
            <Flower />
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

      <section className="work section" id="work">
        <div className="section-heading">
          <div>
            <p className="kicker">Fresh from the studio</p>
            <h2>
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
                <span>{item.title}</span>
                <small>{item.type}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="services section" id="services">
        <div className="service-intro">
          <p className="kicker">The nail menu</p>
          <h2>
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
            <article key={service.name}>
              <span className="service-number">0{index + 1}</span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.detail}</p>
                <small>{service.time}</small>
              </div>
              <strong>{service.price}</strong>
            </article>
          ))}
          <p className="price-note">Removal from another studio is +$15.</p>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-collage">
          <div className="about-image-main">
            <Image
              src="/images/white-floral-set.png"
              alt="White floral nail art created by Maria"
              fill
              sizes="(max-width: 900px) 70vw, 38vw"
            />
          </div>
          <div className="about-image-small">
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
          <h2>Hi, I’m Maria.</h2>
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

      <section className="testimonial">
        <Flower className="quote-flower" />
        <p className="kicker">Love notes</p>
        <blockquote>
          “Maria is pure magic. My nails have never been healthier, and somehow she turns every
          random idea I bring into the cutest set ever.”
        </blockquote>
        <p className="client">— Jamie, regular since 2022</p>
      </section>

      <section className="booking section" id="book">
        <div className="booking-copy">
          <p className="kicker">Ready when you are</p>
          <h2>
            Your dream nails are <em>one click away.</em>
          </h2>
          <p>
            Appointments are released on the 20th of each month. New clients are always welcome.
          </p>
          <Link className="button button-light" href="/book">
            Book an appointment <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="booking-info">
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

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Marshmallowmami Nails home">
          <Image
            className="brand-logo"
            src="/images/marshmallowmami-nail-charm-logo.png"
            alt="Marshmallowmami Nails"
            width={990}
            height={990}
          />
        </a>
        <p>Small studio. Big nail energy.</p>
        <div>
          <a href="#top">Back to top ↑</a>
          <span>© 2025 Marshmallowmami Nails</span>
        </div>
      </footer>
    </main>
  )
}
