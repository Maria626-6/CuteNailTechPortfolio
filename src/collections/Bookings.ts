import type { CollectionConfig } from 'payload'
import { isPayloadAdmin, isPayloadAdminUser } from '@/access/isPayloadAdmin'

type RelationshipValue = string | number | { id?: string | number } | null | undefined

const relationshipID = (value: RelationshipValue) => {
  if (typeof value === 'string' || typeof value === 'number') return value
  if (value && typeof value === 'object') return value.id
  return undefined
}

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Booking',
    plural: 'Bookings',
  },
  admin: {
    group: 'Bookings',
    useAsTitle: 'bookingCode',
    defaultColumns: ['bookingCode', 'customerName', 'service', 'slot', 'status'],
  },
  access: {
    create: ({ req }) => isPayloadAdminUser(req.user) || req.context.bookingForm === true,
    delete: isPayloadAdmin,
    read: isPayloadAdmin,
    update: isPayloadAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (!data) return data

        if (operation === 'create' && !data?.bookingCode) {
          const time = Date.now().toString(36).toUpperCase()
          const random = crypto.randomUUID().slice(0, 4).toUpperCase()
          data.bookingCode = `MM-${time}-${random}`
        }

        if (Array.isArray(data?.inspirationImages) && data.inspirationImages.length > 3) {
          throw new Error('A booking can include up to three inspiration images.')
        }

        return data
      },
    ],
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        const serviceID =
          relationshipID(data?.service as RelationshipValue) ??
          relationshipID(originalDoc?.service as RelationshipValue)
        const slotID =
          relationshipID(data?.slot as RelationshipValue) ??
          relationshipID(originalDoc?.slot as RelationshipValue)
        const status = data?.status ?? originalDoc?.status ?? 'pending'

        if (!serviceID || !slotID) {
          throw new Error('A valid service and appointment slot are required.')
        }

        if (status === 'cancelled') {
          data.activeSlotKey = null
          return data
        }

        const serviceChanged =
          operation === 'create' ||
          String(serviceID) !== String(relationshipID(originalDoc?.service as RelationshipValue))
        const slotChanged =
          operation === 'create' ||
          String(slotID) !== String(relationshipID(originalDoc?.slot as RelationshipValue))

        if (serviceChanged || slotChanged) {
          const [service, slot] = await Promise.all([
            req.payload.findByID({
              collection: 'services',
              id: serviceID,
              overrideAccess: true,
              depth: 0,
            }),
            req.payload.findByID({
              collection: 'availability-slots',
              id: slotID,
              overrideAccess: true,
              depth: 0,
            }),
          ])

          if (!service.active) {
            throw new Error('The selected service is no longer available.')
          }

          if (slot.status !== 'open' || new Date(slot.startAt).getTime() <= Date.now()) {
            throw new Error('The selected appointment time is no longer available.')
          }

          const slotLength = new Date(slot.endAt).getTime() - new Date(slot.startAt).getTime()
          if (slotLength < service.durationMinutes * 60_000) {
            throw new Error('The selected appointment is too short for this service.')
          }
        }

        data.activeSlotKey = String(slotID)
        return data
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        const slotID = relationshipID(doc.slot as RelationshipValue)
        if (!slotID) return doc

        const desiredStatus = doc.status === 'cancelled' ? 'open' : 'booked'
        await req.payload.update({
          collection: 'availability-slots',
          id: slotID,
          data: { status: desiredStatus },
          overrideAccess: true,
          req,
        })

        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        const slotID = relationshipID(doc.slot as RelationshipValue)
        if (!slotID) return doc

        const slot = await req.payload.findByID({
          collection: 'availability-slots',
          id: slotID,
          overrideAccess: true,
          depth: 0,
        })

        if (new Date(slot.startAt).getTime() > Date.now()) {
          await req.payload.update({
            collection: 'availability-slots',
            id: slotID,
            data: { status: 'open' },
            overrideAccess: true,
            req,
          })
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'bookingCode',
      type: 'text',
      unique: true,
      index: true,
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
      maxLength: 120,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      maxLength: 40,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
    {
      name: 'slot',
      type: 'relationship',
      relationTo: 'availability-slots',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      maxLength: 2_000,
    },
    {
      name: 'inspirationImages',
      type: 'upload',
      relationTo: 'booking-inspirations',
      hasMany: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      access: {
        create: () => false,
        update: ({ req }) => isPayloadAdminUser(req.user),
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'activeSlotKey',
      type: 'text',
      unique: true,
      index: true,
      access: {
        create: () => false,
        read: ({ req }) => isPayloadAdminUser(req.user),
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },
  ],
}
