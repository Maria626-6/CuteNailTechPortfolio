import type { CollectionConfig } from 'payload'
import { isPayloadAdmin, isPayloadAdminUser } from '@/access/isPayloadAdmin'

export const BookingInspirations: CollectionConfig = {
  slug: 'booking-inspirations',
  labels: {
    singular: 'Booking Inspiration',
    plural: 'Booking Inspirations',
  },
  admin: {
    group: 'Bookings',
    useAsTitle: 'alt',
  },
  access: {
    create: ({ req }) => isPayloadAdminUser(req.user) || req.context.bookingForm === true,
    delete: isPayloadAdmin,
    read: isPayloadAdmin,
    update: isPayloadAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      maxLength: 200,
    },
  ],
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'private, no-store')
      return headers
    },
  },
}
