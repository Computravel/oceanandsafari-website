import type { Metadata } from "next";
import { Cormorant_Garant, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ocean & Safari | Luxury Travel Specialists",
  description:
    "Bespoke ocean island holidays, African safaris and luxury cruises. Your journey begins the moment you enquire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable}`}>
        {children}
      </body>
    </html>
  );
}