import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/_providers";
import MenuDesktop from "@/components/menu/MenuDesktop";
import Footer from "@/components/Footer";
import Image from "next/image";
import background from "../../public/images/gridBackground.svg";
import MobileWarning from "@/components/displayElements/MobileWarning";

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
          {/* Affichage mobile */}
          <div className="md:hidden">
            <MobileWarning />
          </div>
          {/* Affichage desktop */}
          <div className="hidden md:flex flex-col justify-start min-h-screen bg-black text-textColor-main">
            <MenuDesktop />
            <main className="flex-grow mt-20 w-full">
              <div className="relativeflex flex-col justify-center items-center w-full">
                {/* Background Image */}
                <div className="fixed inset-0 -z-10">
                  <Image
                    src={background}
                    alt="background"
                    fill
                    className="object-cover opacity-20"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20" />
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
