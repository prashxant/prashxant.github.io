import "./global.css";
import type { Metadata } from "next";

import { Navbar } from "../components/nav";

import Footer from "../components/footer";
import { baseUrl } from "./sitemap";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemePaletteHydrator } from "@/components/ThemePaletteSlider";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Prashant Sharma ",
    template: "| My little home in Internet",
  },
  description: "This is my portfolio.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "My Portfolio",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <ThemeProvider>
          <ThemePaletteHydrator />
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
