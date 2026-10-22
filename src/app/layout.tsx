import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingMobileBookingBar } from "@/components/FloatingMobileBookingBar";
import { BackToTopButton } from "@/components/BackToTopButton";
import { getEditableBusinessProfile } from "@/lib/server-reference";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stillpoint-mobile-massage.example.com"),
  title: {
    default:
      "Stillpoint Mobile Massage | In-Home, Corporate & Hotel Massage Services",
    template: "%s | Stillpoint Mobile Massage",
  },
  description:
    "Professional mobile massage therapy delivered to your home, workplace, hotel, or event. Request an individual appointment or corporate wellness session.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stillpoint Mobile Massage — Professional Massage, Delivered to You",
    description:
      "In-home massage services, corporate massage and workplace wellness, hotel massage appointments, and event pop-ups arranged around your space and schedule.",
    url: "/",
    siteName: "Stillpoint Mobile Massage",
    type: "website",
    images: [
      {
        url: "/images/hero-in-home.jpg",
        width: 1200,
        height: 900,
        alt: "Stillpoint Mobile Massage — serene residential massage table setup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stillpoint Mobile Massage",
    description:
      "Your Space. Your Time. Your Moment of Calm. Mobile massage therapy for homes, workplaces, hotels, and events.",
    images: ["/images/hero-in-home.jpg"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const profile = await getEditableBusinessProfile();

  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#292D29] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[8px] focus:bg-[#233C32] focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        <SiteHeader />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <SiteFooter profile={profile} />
        <FloatingMobileBookingBar />
        <BackToTopButton />
      </body>
    </html>
  );
}
