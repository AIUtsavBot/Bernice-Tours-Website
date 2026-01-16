import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Bernice Tours N Travels | Passport, Visa & Flight Booking Services",
  description: "Your trusted partner for passport services, visa assistance, and flight bookings. Experience seamless travel planning with Bernice Tours N Travels. Contact us for all your travel documentation needs.",
  keywords: "passport services, visa assistance, flight booking, travel agency, Bernice Tours, international travel, visa application, passport renewal",
  authors: [{ name: "Bernice Tours N Travels" }],
  openGraph: {
    title: "Bernice Tours N Travels | Passport, Visa & Flight Booking Services",
    description: "Your trusted partner for passport services, visa assistance, and flight bookings.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
