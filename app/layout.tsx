import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JourneyPal — Your relocation tracker for moving to Korea",
  description:
    "Stay on top of every step of your move to Korea. Visa, housing, banking, ARC, settling in. Built by someone who moved from NZ to Korea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased bg-white text-ink`}>
        {children}
      </body>
    </html>
  );
}
