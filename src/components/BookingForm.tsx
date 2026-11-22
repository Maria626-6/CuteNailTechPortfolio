'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

type ServiceOption = {
  id: string
  name: string
  description: string
  durationMinutes: number
  priceLabel: string
}

type SlotOption = {
  id: string
  dateLabel: string
  timeLabel: string
  startAt: string
}

type BookingFormProps = {
  services: ServiceOption[]
  slots: SlotOption[]
}

type FieldErrors = Record<string, string>

const MAX_FILES = 3
const MAX_FILE_SIZE = 5_000_000
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function BookingForm({ services, slots }: BookingFormProps) {
  const [serviceID, setServiceID] = useState('')
  const [slotID, setSlotID] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingCode, setBookingCode] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files],
  )

  useEffect(() => () => previews.forEach((preview) => URL.revokeObjectURL(preview.url)), [previews])

  function addFiles(incoming: File[]) {
    const imageFiles = incoming.filter((file) => ACCEPTED_TYPES.includes(file.type))
    const oversized = imageFiles.some((file) => file.size > MAX_FILE_SIZE)

    if (imageFiles.length !== incoming.length) {
      setErrors((current) => ({
        ...current,
        inspirationImages: 'Please use JPG, PNG, or WebP images only.',
      }))
      return
    }
    if (oversized) {
      setErrors((current) => ({
        ...current,
        inspirationImages: 'Each image must be smaller than 5 MB.',
      }))
      return
    }
    if (files.length + imageFiles.length > MAX_FILES) {
      setErrors((current) => ({
        ...current,
        inspirationImages: 'You can add up to three inspiration images.',
      }))
      return
    }

    setFiles((current) => [...current, ...imageFiles])
    setErrors((current) => ({ ...current, inspirationImages: '' }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    formData.set('service', serviceID)
    formData.set('slot', slotID)
    formData.delete('inspirationImages')
    files.forEach((file) => formData.append('inspirationImages', file))

    try {
      const response = await fetch('/api/booking-request', {
        method: 'POST',
        body: formData,
      })
      const result = (await response.json()) as {
        bookingCode?: string
        errors?: FieldErrors
        message?: string
      }

      if (!response.ok || !result.bookingCode) {
        setErrors(
          result.errors ?? {
            form: result.message ?? 'We couldn’t save your appointment. Please try again.',
          },
        )
        return
      }

      setBookingCode(result.bookingCode)
    } catch {
      setErrors({
        form: 'We couldn’t reach the booking service. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (bookingCode) {
    return (
      <section
        aria-live="polite"
        className="rounded-[2rem] border border-[#30231f]/10 bg-white p-7 shadow-[0_25px_70px_rgba(48,35,31,0.12)] sm:p-10"
      >
        <div className="mx-auto max-w-lg py-12 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#bfd1a2] text-2xl">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-8 w-8 fill-none stroke-current stroke-2"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          </span>
          <p className="mt-6 font-['Gochi_Hand'] text-xl text-[#ef4b43]">
            You&apos;re all booked in
          </p>
          <h2 className="mt-2 font-['Playfair_Display'] text-4xl">Thanks, lovely!</h2>
          <p className="mt-4 leading-7 text-[#30231f]/70">
            Your request has been saved. Keep this booking code handy and I’ll be in touch to
            confirm the details.
          </p>
          <p className="mx-auto mt-6 w-fit rounded-full bg-[#fce9eb] px-5 py-3 font-mono text-lg font-bold tracking-wide">
            {bookingCode}
          </p>
        </div>
      </section>
    )
  }

  const errorMessages = Object.values(errors).filter(Boolean)

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onPaste={(event) => {
        const pastedFiles = Array.from(event.clipboardData.files)
        if (pastedFiles.length) addFiles(pastedFiles)
      }}
      className="rounded-[2rem] border border-[#30231f]/10 bg-white p-5 shadow-[0_25px_70px_rgba(48,35,31,0.12)] sm:p-8"
    >
      {errorMessages.length > 0 && (
        <div
          role="alert"
          className="mb-8 rounded-2xl border border-[#ef4b43]/25 bg-[#fce9eb] p-4 text-sm"
        >
          <p className="font-bold">Please check the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <fieldset>
        <legend className="font-['Playfair_Display'] text-3xl">1. Choose your set</legend>
        <p className="mt-2 text-sm text-[#30231f]/60">
          All services include a tidy finish and cuticle oil.
        </p>
        {services.length ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const selected = serviceID === service.id
              return (
                <label
                  key={service.id}
                  className={`relative cursor-pointer rounded-2xl border p-4 transition ${
                    selected
                      ? 'border-[#ef4b43] bg-[#fce9eb]'
                      : 'border-[#30231f]/10 hover:border-[#f6b8c2]'
                  }`}
                >
                  <input
                    type="radio"
                    name="service"
                    value={service.id}
                    checked={selected}
                    onChange={() => setServiceID(service.id)}
                    className="sr-only"
                    required
                  />
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-bold">{service.name}</span>
                    <span className="shrink-0 font-['Gochi_Hand'] text-lg text-[#ef4b43]">
                      {service.priceLabel}
                    </span>
                  </span>
                  <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-[#30231f]/45">
                    {service.durationMinutes} min
                  </span>
                  <span className="mt-2 block text-sm leading-5 text-[#30231f]/65">
                    {service.description}
                  </span>
                </label>
              )
            })}
          </div>
        ) : (
          <p className="mt-5 rounded-2xl bg-[#fffaf2] p-5 text-sm">
            Services are being prepared. Please check back shortly.
          </p>
        )}
        {errors.service && <p className="mt-2 text-sm text-[#c92f28]">{errors.service}</p>}
      </fieldset>

      <div className="my-8 h-px bg-[#30231f]/10" />

      <fieldset>
        <legend className="font-['Playfair_Display'] text-3xl">2. Pick a time</legend>
        <p className="mt-2 text-sm text-[#30231f]/60">
          Times are shown in Batemans Bay local time.
        </p>
        {slots.length ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {slots.map((slot) => {
              const selected = slotID === slot.id
              return (
                <label
                  key={slot.id}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 transition ${
                    selected
                      ? 'border-[#30231f] bg-[#30231f] text-white'
                      : 'border-[#30231f]/10 hover:border-[#f6b8c2]'
                  }`}
                >
                  <input
                    type="radio"
                    name="slot"
                    value={slot.id}
                    checked={selected}
                    onChange={() => setSlotID(slot.id)}
                    className="sr-only"
                    required
                  />
                  <span className="block text-sm font-bold">{slot.dateLabel}</span>
                  <span
                    className={`mt-1 block text-sm ${
                      selected ? 'text-white/70' : 'text-[#ef4b43]'
                    }`}
                  >
                    {slot.timeLabel}
                  </span>
                </label>
              )
            })}
          </div>
        ) : (
          <p className="mt-5 rounded-2xl bg-[#fffaf2] p-5 text-sm">
            There aren&apos;t any open times right now. New appointments are added regularly, so
            please check back soon.
          </p>
        )}
        {errors.slot && <p className="mt-2 text-sm text-[#c92f28]">{errors.slot}</p>}
      </fieldset>

      <div className="my-8 h-px bg-[#30231f]/10" />

      <fieldset>
        <legend className="font-['Playfair_Display'] text-3xl">3. Tell me about you</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FormField
            label="Name"
            name="customerName"
            autoComplete="name"
            error={errors.customerName}
            maxLength={120}
          />
          <FormField
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            error={errors.phone}
            maxLength={40}
          />
          <div className="sm:col-span-2">
            <FormField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              error={errors.email}
              maxLength={200}
            />
          </div>
          <label className="sm:col-span-2">
            <span className="text-sm font-bold">Notes or nail ideas</span>
            <span className="mt-1 block text-xs text-[#30231f]/50">
              Tell me about length, shape, colours, art, or anything else I should know.
            </span>
            <textarea
              name="notes"
              rows={5}
              maxLength={2000}
              className="mt-2 w-full resize-y rounded-2xl border border-[#30231f]/15 bg-[#fffaf2]/50 px-4 py-3 outline-none transition focus:border-[#ef4b43] focus:ring-2 focus:ring-[#f6b8c2]/40"
            />
            {errors.notes && (
              <span className="mt-1 block text-sm text-[#c92f28]">{errors.notes}</span>
            )}
          </label>
        </div>
      </fieldset>

      <div className="my-8 h-px bg-[#30231f]/10" />

      <fieldset>
        <legend className="font-['Playfair_Display'] text-3xl">Inspiration photos</legend>
        <p className="mt-2 text-sm leading-6 text-[#30231f]/60">
          Upload or paste up to three JPG, PNG, or WebP images. Maximum 5 MB each.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          name="inspirationImages"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="sr-only"
          onChange={(event) => {
            addFiles(Array.from(event.target.files ?? []))
            event.target.value = ''
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 w-full rounded-2xl border-2 border-dashed border-[#f6b8c2] bg-[#fce9eb]/45 px-5 py-7 text-sm font-bold transition hover:bg-[#fce9eb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4b43]"
        >
          Choose inspiration photos
          <span className="mt-1 block font-normal text-[#30231f]/55">
            or paste an image anywhere in this form
          </span>
        </button>
        {errors.inspirationImages && (
          <p className="mt-2 text-sm text-[#c92f28]">{errors.inspirationImages}</p>
        )}
        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {previews.map(({ file, url }, index) => (
              <div
                key={`${file.name}-${file.lastModified}`}
                className="relative aspect-square overflow-hidden rounded-2xl bg-[#fce9eb]"
              >
                <Image
                  src={url}
                  alt={`Inspiration preview ${index + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() =>
                    setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))
                  }
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#30231f] text-lg leading-none text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting || !serviceID || !slotID || !services.length || !slots.length}
        className="mt-8 w-full rounded-full bg-[#ef4b43] px-6 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#d93e37] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30231f] focus-visible:ring-offset-2"
      >
        {isSubmitting ? 'Saving your appointment…' : 'Request this appointment'}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-[#30231f]/50">
        Your appointment is held once submitted and confirmed personally.
      </p>
    </form>
  )
}

function FormField({
  label,
  error,
  type = 'text',
  ...inputProps
}: {
  label: string
  error?: string
  type?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label>
      <span className="text-sm font-bold">{label}</span>
      <input
        {...inputProps}
        type={type}
        required
        aria-invalid={Boolean(error)}
        className="mt-2 w-full rounded-2xl border border-[#30231f]/15 bg-[#fffaf2]/50 px-4 py-3 outline-none transition focus:border-[#ef4b43] focus:ring-2 focus:ring-[#f6b8c2]/40"
      />
      {error && <span className="mt-1 block text-sm text-[#c92f28]">{error}</span>}
    </label>
  )
}
