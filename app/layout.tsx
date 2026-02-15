import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import Footer from "./components/Footer/Footer";
import Head from "next/head";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import { AudioProvider } from "./Context/AudioContext";
import Nav from "./components/Navbar/Nav";


export const metadata: Metadata = {
  title: "القرآن الكريم",
  description: "منصة متكاملة لقراءة القرآن الكريم والاستماع إليه بقراءات متعددة، مع واجهة بسيطة وتجربة روحانية مميزة.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`flex flex-col min-h-screen font-hafs antialiased`}
      >
        <Head>
          <link rel="icon" href="/favicon.png" sizes="any" />
        </Head>
        <Nav />
        <ReactQueryProvider>
          <AudioProvider>
            <main className="flex-grow">{children}</main>
            <ScrollTop />
          </AudioProvider>
        </ReactQueryProvider>
        <Footer />
      </body>
    </html>
  );
}
