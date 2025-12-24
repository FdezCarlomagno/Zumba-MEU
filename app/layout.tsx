import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const nunito = Nunito({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "600", "700", "900"] })

export const metadata: Metadata = {
  title: "Zumba MEU - Dance. Play. Celebrate.",
  description:
    "High-energy Zumba classes, kids disco parties, and birthday celebrations. Book your next event with Zumba MEU today!",
  generator: "v0.app",
  keywords: ["zumba", "kids dance", "disco party", "birthday party", "dance classes", "family events"],
  openGraph: {
    title: "Zumba MEU - Dance. Enjoy. Celebrate.",
    description: "High-energy Zumba classes, kids disco parties, and birthday celebrations.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=BBH+Hegarty&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
