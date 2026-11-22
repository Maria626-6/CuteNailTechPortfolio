import type { Access } from 'payload'

export const isPayloadAdmin: Access = ({ req }) => req.user?.collection === 'admins'

export const isPayloadAdminUser = (user: unknown) =>
  Boolean(user && typeof user === 'object' && 'collection' in user && user.collection === 'admins')
