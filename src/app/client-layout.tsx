"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from './Components/ScrollProgress';
import WhatsAppIcon from './Components/WhatsAppIcon';
import { LanguageProvider } from '../context/LanguageContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <ScrollProgress />
          {children}
          <WhatsAppIcon />
        </body>
      </html>
    </LanguageProvider>
  );
} 