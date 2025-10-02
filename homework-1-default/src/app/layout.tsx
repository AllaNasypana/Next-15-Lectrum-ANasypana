import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Header, Footer } from '@/components';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
      default: 'Service Dog - training, consulting, support with documents',
      template: `Service Dog | %s`
  },
  description: "Portal for owner Service Dog - training, consulting, support with documents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
      <div className={'min-h-screen flex flex-col'}>
          <Header />
          <main className={'p-4 flex-col'}>
              {children}
          </main>
          <Footer />
      </div>
      </body>
    </html>
  );
}
