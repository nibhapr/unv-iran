import type { Metadata } from "next";
import { metadata as siteMetadata } from './metadata';
import ClientLayout from './client-layout';

// Export metadata for the root layout
export const metadata: Metadata = {
  metadataBase: siteMetadata.metadataBase,
  title: siteMetadata.title,
  description: siteMetadata.description.default,
  icons: siteMetadata.icons
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
} 