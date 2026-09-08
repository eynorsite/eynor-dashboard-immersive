import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EYNOR Dashboard Immersif",
  description: "Interface immersive 3D pour la gestion des formations EYNOR - Habilitation électrique NF C 18-510",
  keywords: ["formation", "habilitation électrique", "dashboard", "3D", "immersif"],
  authors: [{ name: "EYNOR Formation" }],
  openGraph: {
    title: "EYNOR Dashboard Immersif",
    description: "Interface immersive 3D pour la gestion des formations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
