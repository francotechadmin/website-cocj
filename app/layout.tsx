import React from "react";
import { Metadata, Viewport } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Conectando a Otros Con Jesus 2026",
    template: "%s | Conectando a Otros Con Jesus 2026"
  },
  description: "Únete a nosotros del 11-13 de Septiembre 2026 para un fin de semana transformador de adoración, enseñanza bíblica y renovación espiritual. Conferencia anual diseñada para familias, jóvenes y creyentes.",
  keywords: ["conferencia cristiana", "altar familiar", "adoración", "conferencia familiar", "retiro espiritual", "conferencia 2026", "conferencia religiosa", "renovación espiritual"],
  authors: [{ name: "Conectando a Otros Con Jesus" }],
  openGraph: {
    title: "Conectando a Otros Con Jesus 2026 - Conectando a Otros con Jesús",
    description: "Conferencia anual del 11-13 de Septiembre 2026. Un fin de semana de adoración, compañerismo y renovación espiritual.",
    type: "website",
    locale: "es_ES",
    siteName: "Conectando a Otros Con Jesus 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conectando a Otros Con Jesus 2026 - Altar Familiar",
    description: "Conferencia anual del 11-13 de Septiembre 2026. Un fin de semana de adoración, compañerismo y renovación espiritual.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ea580c" },
    { media: "(prefers-color-scheme: dark)", color: "#ea580c" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(fontSans.variable, nunito.variable, lato.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
