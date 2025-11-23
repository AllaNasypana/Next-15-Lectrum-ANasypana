import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Geist, Geist_Mono } from "next/font/google";
import { Header} from '../components'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const font = localFont({
    src: [
        {
            path: '../../public/fonts/soehne-buch.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/soehne-kraftig.woff2',
            weight: '500',
            style: 'normal',
        }
    ],
    variable: '--font-soehne'
})


export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
    title: {
        default: "SssSite",
        template: "%s | SssSite",
    },
    description: "The demo of SssSite.",
    keywords: ["Next.js", "SEO", "App Router", "Metadata"],
    openGraph: {
        type: "website",
        url: "https://ssssite.com",
        title: "SssSite",
        description: "Bla bla bla",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Open Graph Image",
            },
        ],
    },
    alternates: {
        canonical: `/`,
        languages: {
            "uk-UA": '/ua'
        }
    },
    twitter: {
        card: "summary_large_image",
        creator: "@ddddd",
    },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <link
            rel="preload"
            href="/fonts/soehne-buch.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
        />
        <link
            rel="preload"
            href="/fonts/soehne-kraftig.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
        />
        <link
            rel="preload"
            href="/images/sailing.jpg"
            as="image"
            fetchPriority="high"
        />
    </head>
      <body
        className={`${font.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Header />
      <main className={'flex w-full flex-col items-center justify-center p-6 '}>
          {children}
      </main>

      </body>
    </html>
  );
}
