import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
import ReactQueryProviders from "@/hooks/useReactQuery";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "예약 결제 페이지",
  description: "예약 결제 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ReactQueryProviders>{children}</ReactQueryProviders>
        <Footer />
      </body>
    </html>
  );
}
