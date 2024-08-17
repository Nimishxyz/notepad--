'use client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
export const metadata = {
  title: 'Notepad--',
  description: 'Reverse Typing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <SpeedInsights />
      <Analytics />
    </html>
  )
}
