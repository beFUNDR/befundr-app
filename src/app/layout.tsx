import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/_providers";
import MenuDesktop from "@/components/menu/MenuDesktop";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "beFUNDR",
  description: "Trust and fund your community",
};

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>
        <Providers>
          <div className="flex flex-col justify-start min-h-screen bg-maincolor text-textColor-main ">
            <MenuDesktop />
            <main className="flex-grow">
              <div className="flex flex-col justify-center items-center">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
