"use client"
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from './Components/ScrollProgress';
import WhatsAppIcon from './Components/WhatsAppIcon';
import { LanguageProvider } from '../context/LanguageContext';
import { useLanguage } from '../context/LanguageContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ScrollProgress />
          {children}
          <WhatsAppIcon />
        </body>
      </html>
    </LanguageProvider>
  );
}
