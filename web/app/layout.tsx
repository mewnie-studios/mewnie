import type { Metadata } from "next";
import { Geist, Geist_Mono, Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// redeploy
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});


const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mewnie",
  description: "Progress you can feel, Growth you can see.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable} ${jakarta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
