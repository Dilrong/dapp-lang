import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/feature/theme-provider";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import { DOMAIN } from "@/lib/const";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Dapplang - Decentralized Application Explorer",
  description:
    "Discover top decentralized applications (Dapps) across Ethereum, HyperEVM, Solana, and more. Explore DeFi, NFTs, gaming, and social Dapps.",
  keywords:
    "Dapp, decentralized application, blockchain, Ethereum, HyperEVM, Solana, DeFi, NFT, gaming",
  openGraph: {
    title: "Dapplang - Decentralized Application Explorer",
    description:
      "Discover top decentralized applications (Dapps) across Ethereum, HyperEVM, Solana, and more.",
    url: DOMAIN,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dapplang - Decentralized Application Explorer",
    description:
      "Discover top decentralized applications (Dapps) across Ethereum, HyperEVM, Solana, and more.",
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
      </body>
    </html>
  );
}
