import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/feature/theme-provider";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import { DOMAIN } from "@/lib/const";
import { Analytics } from "@vercel/analytics/react";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dapplang.xyz"),
  title: {
    default: "Dapplang | Decentralized Application Explorer",
    template: "%s | Dapplang",
  },
  description:
    "Discover top decentralized applications (Dapps) across Ethereum, HyperEVM, Solana, and more. Explore DeFi, NFTs, gaming, and social Dapps.",
  keywords:
    "Dapp, decentralized application, blockchain, Ethereum, HyperEVM, Solana, DeFi, NFT, gaming",
  openGraph: {
    title: "Dapplang | Decentralized Application Explorer",
    description:
      "Discover top decentralized applications (Dapps) across Ethereum, HyperEVM, Solana, and more.",
    url: DOMAIN,
    siteName: "Dapplang",
    images: ["/images/og.png"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dapplang | Decentralized Application Explorer",
    description:
      "Discover top decentralized applications (Dapps) across Ethereum, HyperEVM, Solana, and more.",
    creator: "Dapplang",
    images: ["/images/og.png"],
  },
  icons: {
    icon: "/images/icons/apple-icon.png",
    apple: "/images/icons/apple-icon.png",
    other: {
      rel: "apple-icon-precomposed.png",
      url: "/images/icons/apple-icon-precomposed.png",
    },
  },
  alternates: {
    canonical: DOMAIN,
    types: {
      "application/rss+xml": `${DOMAIN}/rss`,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={ibmPlexSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header></Header>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900 dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-800 dark:text-gray-200 font-sans">
            <main className="flex-grow container mx-auto p-6">{children}</main>
          </div>
          <Footer></Footer>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
