import type { Metadata } from 'next'
import '../../src/app/(frontend)/styles.css'

export const metadata: Metadata = {
  title: 'Marshmallowmami Nails',
  description:
    'Independent nail artist in Batemans Bay, NSW, offering acrylic sets and playful custom nail art.',
}

export default function NetlifyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
