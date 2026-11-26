import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Book an appointment | Marshmallowmami Nails',
  description:
    'Schedule an appointment with Marshmallowmami Nails using Google Calendar.',
}

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#30231f]">
      <header className="border-b border-[#30231f]/10 bg-[#fffaf2]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-2 sm:gap-6 sm:px-8 sm:py-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-1.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4b43] sm:gap-3"
          >
            <Image
              src="/images/marshmallowmami-nail-charm-logo.png"
              alt=""
              width={62}
              height={62}
              className="h-11 w-11 shrink-0 rounded-full bg-[#fce9eb] object-contain sm:h-16 sm:w-16"
            />
            <span className="whitespace-nowrap font-['Playfair_Display'] text-[13px] italic sm:text-2xl">
              Marshmallowmami Nails
            </span>
          </Link>
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap rounded-full border border-[#30231f]/20 px-2 py-2 text-[11px] font-semibold transition hover:border-[#ef4b43] hover:text-[#ef4b43] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4b43] sm:px-4 sm:text-sm"
          >
            <span className="sm:hidden">Portfolio</span>
            <span className="hidden sm:inline">Back to portfolio</span>
          </Link>
        </div>
      </header>

      <section className="relative px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="mb-3 font-['Gochi_Hand'] text-xl text-[#ef4b43]">
              Your dream set starts here
            </p>
            <h1 className="font-['Playfair_Display'] text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
              Pick a time for your next <em className="text-[#ef4b43]">little treat.</em>
            </h1>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#30231f]/10 bg-white shadow-[0_20px_60px_rgba(48,35,31,0.08)]">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ20v9zjwxFGvmvOECCwBTQw6hhyJ3iTDDM3WCYfPKCU72tp4ZrP06oMkLbw0f5SbzYOrmdp6tR3?gv=true"
              title="Schedule an appointment"
              width="100%"
              height="600"
              className="block h-[600px] w-full border-0"
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="payment"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
