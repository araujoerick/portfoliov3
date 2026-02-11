import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Erick Araujo | Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack com foco em React, Next.js e NestJS com TypeScript. Especializado em aplicações Web3, microserviços e interfaces Pixel Perfect com alta performance.",
  keywords: [
    "Erick Araujo",
    "Desenvolvedor Full Stack",
    "React",
    "Next.js",
    "TypeScript",
    "NestJS",
    "Web3",
    "Blockchain",
    "Microserviços",
    "Freelancer",
  ],
  authors: [{ name: "Erick Araujo" }],
  creator: "Erick Araujo",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://araujo-portfolio.vercel.app",
    siteName: "Erick Araujo",
    title: "Erick Araujo | Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack especializado em React, Next.js, TypeScript e aplicações Web3 com interfaces Pixel Perfect e alta performance.",
    images: [
      {
        url: "/logo-og.png",
        width: 1200,
        height: 630,
        alt: "Erick Araujo | Desenvolvedor Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@araujoerick",
    creator: "@araujoerick",
    title: "Erick Araujo | Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack especializado em React, Next.js, TypeScript e aplicações Web3 com interfaces Pixel Perfect e alta performance.",
    images: ["/logo-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
