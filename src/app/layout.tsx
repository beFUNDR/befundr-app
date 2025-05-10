import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/_providers";
import MenuDesktop from "@/components/menu/MenuDesktop";
import Footer from "@/components/Footer";
import Image from "next/image";
import background from "../../public/images/gridBackground.svg";

export const metadata: Metadata = {
  title: "beFUNDR",
  description: "The Decentralized Incubator",
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
          <div className="flex flex-col justify-start min-h-screen bg-maincolor text-textColor-main">
            <MenuDesktop />
            <main className="flex-grow mt-18 w-full">
              <div className="relativeflex flex-col justify-center items-center w-full">
                {/* Background Image */}
                <div className="fixed inset-0 -z-10">
                  <Image
                    src={background}
                    alt="background"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/95" />:
                </div>
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
