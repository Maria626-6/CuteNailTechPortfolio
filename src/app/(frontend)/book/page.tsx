import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { connection } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { BookingForm } from '@/components/BookingForm'

export const metadata: Metadata = {
  title: 'Book an appointment | Marshmallowmami Nails',
  description:
    'Choose your acrylic service and appointment time with Marshmallowmami Nails in Batemans Bay.',
}

const dateFormatter = new Intl.DateTimeFormat('en-AU', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'Australia/Sydney',
})

const timeFormatter = new Intl.DateTimeFormat('en-AU', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'Australia/Sydney',
})

export default async function BookPage() {
  await connection()
  const payload = await getPayload({ config })
  const now = new Date().toISOString()

  const [serviceResult, slotResult] = await Promise.all([
    payload.find({
      collection: 'services',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      sort: '_order',
      where: { active: { equals: true } },
    }),
    payload.find({
      collection: 'availability-slots',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      sort: 'startAt',
      where: {
        status: { equals: 'open' },
        startAt: { greater_than: now },
      },
    }),
  ])

  const services = serviceResult.docs.map((service) => ({
    id: String(service.id),
    name: service.name,
    description: service.description,
    durationMinutes: service.durationMinutes,
    priceLabel: service.priceLabel,
  }))

  const slots = slotResult.docs.map((slot) => ({
    id: String(slot.id),
    dateLabel: dateFormatter.format(new Date(slot.startAt)),
    timeLabel: `${timeFormatter.format(new Date(slot.startAt))}–${timeFormatter.format(new Date(slot.endAt))}`,
    startAt: slot.startAt,
  }))

  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#30231f]">
      <header className="border-b border-[#30231f]/10 bg-[#fffaf2]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4b43]"
          >
            <Image
              src="/images/marshmallowmami-nail-charm-logo.png"
              alt=""
              width={62}
              height={62}
              className="h-14 w-14 object-contain"
            />
            <span className="hidden font-['Playfair_Display'] text-xl italic sm:block">
              Marshmallowmami Nails
            </span>
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[#30231f]/20 px-4 py-2 text-sm font-semibold transition hover:border-[#ef4b43] hover:text-[#ef4b43] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4b43]"
          >
            Back to portfolio
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 py-12 sm:px-8 sm:py-16">
        <div
          aria-hidden="true"
          className="absolute -top-20 right-[-5rem] h-72 w-72 rounded-full bg-[#f6b8c2]/45 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-20 left-[-8rem] h-80 w-80 rounded-full bg-[#f6d269]/30 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="mb-4 font-['Gochi_Hand'] text-xl text-[#ef4b43]">
              Your dream set starts here
            </p>
            <h1 className="max-w-xl font-['Playfair_Display'] text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
              Pick a time for your next <em className="text-[#ef4b43]">little treat.</em>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#30231f]/70">
              Choose your service and a real available appointment. You can add notes and up to
              three inspiration photos so I know exactly what you&apos;re dreaming of.
            </p>

            <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1">
              {[
                ['01', 'Choose a service'],
                ['02', 'Pick an open time'],
                ['03', 'Share your details'],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="flex items-center gap-3 rounded-2xl border border-[#30231f]/10 bg-white/60 p-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fce9eb] font-['Gochi_Hand'] text-[#ef4b43]">
                    {number}
                  </span>
                  <span className="font-semibold">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-[#30231f] p-6 text-[#fffaf2]">
              <p className="font-['Playfair_Display'] text-xl italic">Batemans Bay, NSW</p>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Exact studio details are shared after your appointment is confirmed.
              </p>
            </div>
          </div>

          <BookingForm services={services} slots={slots} />
        </div>
      </section>
    </main>
  )
}
