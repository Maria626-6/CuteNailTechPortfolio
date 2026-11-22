import type { CollectionConfig } from 'payload'
import { isPayloadAdmin, isPayloadAdminUser } from '@/access/isPayloadAdmin'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  orderable: true,
  admin: {
    group: 'Bookings',
    useAsTitle: 'name',
    defaultColumns: ['name', 'durationMinutes', 'priceLabel', 'active'],
  },
  access: {
    create: isPayloadAdmin,
    delete: isPayloadAdmin,
    read: ({ req }) => (isPayloadAdminUser(req.user) ? true : { active: { equals: true } }),
    update: isPayloadAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 500,
    },
    {
      name: 'durationMinutes',
      type: 'number',
      required: true,
      min: 15,
      max: 240,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'priceLabel',
      type: 'text',
      required: true,
      maxLength: 30,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
