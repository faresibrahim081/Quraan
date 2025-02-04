import type { Metadata } from "next";
import { El_Messiri, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Navbar/Nav";
import ReactQueryProvider from "./ReactQueryProvider";
import Footer from "./components/Footer/Footer";

const elMessiriFont = El_Messiri({
  variable: "--font-el-messiri",
  subsets: ["arabic"],
  weight: ["400", "700"], // يمكنك إضافة المزيد من الأوزان
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "القران الكريم",
  description: "القران الكريم بقراءات متعددة",
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
        className={`${elMessiriFont.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Nav />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
