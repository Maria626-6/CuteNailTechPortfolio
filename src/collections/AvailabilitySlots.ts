import type { CollectionConfig } from 'payload'
import { isPayloadAdmin, isPayloadAdminUser } from '@/access/isPayloadAdmin'

export const AvailabilitySlots: CollectionConfig = {
  slug: 'availability-slots',
  labels: {
    singular: 'Availability Slot',
    plural: 'Availability Slots',
  },
  admin: {
    group: 'Bookings',
    useAsTitle: 'label',
    defaultColumns: ['label', 'startAt', 'endAt', 'status'],
  },
  access: {
    create: isPayloadAdmin,
    delete: isPayloadAdmin,
    read: ({ req }) =>
      isPayloadAdminUser(req.user)
        ? true
        : {
            status: { equals: 'open' },
            startAt: { greater_than: new Date().toISOString() },
          },
    update: isPayloadAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.startAt) return data

        const formatter = new Intl.DateTimeFormat('en-AU', {
          dateStyle: 'medium',
          timeStyle: 'short',
          timeZone: 'Australia/Sydney',
        })

        data.label = formatter.format(new Date(data.startAt))
        return data
      },
    ],
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'startAt',
      type: 'date',
      required: true,
      index: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'open',
      index: true,
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Booked', value: 'booked' },
        { label: 'Blocked', value: 'blocked' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'internalNote',
      type: 'textarea',
      maxLength: 500,
    },
  ],
}
