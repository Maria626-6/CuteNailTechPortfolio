import { getPayload } from 'payload'
import config from '@payload-config'

const MAX_FILES = 3
const MAX_FILE_SIZE = 5_000_000
const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const ID_PATTERN = /^[a-zA-Z0-9_-]+$/

type Errors = Record<string, string>

const textValue = (formData: FormData, key: string) => {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return Response.json(
      { errors: { form: 'The booking form could not be read.' } },
      { status: 400 },
    )
  }

  const customerName = textValue(formData, 'customerName')
  const email = textValue(formData, 'email').toLowerCase()
  const phone = textValue(formData, 'phone')
  const service = textValue(formData, 'service')
  const slot = textValue(formData, 'slot')
  const notes = textValue(formData, 'notes')
  const files = formData
    .getAll('inspirationImages')
    .filter((value): value is File => value instanceof File && value.size > 0)

  const errors: Errors = {}

  if (!customerName || customerName.length > 120) {
    errors.customerName = 'Enter your name (up to 120 characters).'
  }
  if (!email || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!phone || phone.length > 40 || !/^[+()\d\s.-]{7,40}$/.test(phone)) {
    errors.phone = 'Enter a valid phone number.'
  }
  if (!service || !ID_PATTERN.test(service)) {
    errors.service = 'Choose an available service.'
  }
  if (!slot || !ID_PATTERN.test(slot)) {
    errors.slot = 'Choose an available appointment time.'
  }
  if (notes.length > 2000) {
    errors.notes = 'Keep your notes under 2,000 characters.'
  }
  if (files.length > MAX_FILES) {
    errors.inspirationImages = 'You can add up to three inspiration images.'
  } else if (files.some((file) => !ACCEPTED_TYPES.has(file.type))) {
    errors.inspirationImages = 'Please use JPG, PNG, or WebP images only.'
  } else if (files.some((file) => file.size > MAX_FILE_SIZE)) {
    errors.inspirationImages = 'Each image must be smaller than 5 MB.'
  }

  if (Object.keys(errors).length) {
    return Response.json({ errors }, { status: 400 })
  }

  const payload = await getPayload({ config })
  const uploadIDs: string[] = []

  try {
    for (const [index, file] of files.entries()) {
      const bytes = Buffer.from(await file.arrayBuffer())
      const upload = await payload.create({
        collection: 'booking-inspirations',
        data: {
          alt: `Inspiration image ${index + 1} from ${customerName}`,
        },
        file: {
          data: bytes,
          mimetype: file.type,
          name: file.name || `inspiration-${index + 1}`,
          size: file.size,
        },
        context: { bookingForm: true },
        overrideAccess: false,
      })
      uploadIDs.push(String(upload.id))
    }

    const booking = await payload.create({
      collection: 'bookings',
      data: {
        bookingCode: '',
        customerName,
        email,
        phone,
        service,
        slot,
        notes: notes || undefined,
        inspirationImages: uploadIDs,
        status: 'pending',
      },
      context: { bookingForm: true },
      depth: 0,
      overrideAccess: false,
    })

    return Response.json({ bookingCode: booking.bookingCode }, { status: 201 })
  } catch (error) {
    await Promise.allSettled(
      uploadIDs.map((id) =>
        payload.delete({
          collection: 'booking-inspirations',
          id,
          overrideAccess: true,
        }),
      ),
    )

    const message = error instanceof Error ? error.message : ''
    const slotConflict = /activeSlotKey|unique|appointment time|no longer available/i.test(message)

    return Response.json(
      {
        errors: slotConflict
          ? {
              slot: 'That appointment was just taken. Refresh and choose another time.',
            }
          : {
              form: 'We couldn’t save your appointment. Please try again.',
            },
      },
      { status: slotConflict ? 409 : 500 },
    )
  }
}
