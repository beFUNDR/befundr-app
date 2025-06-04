import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/_providers";
import MenuDesktop from "@/components/menu/MenuDesktop";
import Footer from "@/components/Footer";
import Image from "next/image";
import background from "../../public/images/gridBackground.svg";
import MobileMenu from "@/components/menu/MobileMenu";

export const metadata: Metadata = {
  title: "beFUNDR",
  description: "The Decentralized Incubator",
  icons: {
    icon: [
      {
        url: "/images/icons/icon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/icons/icon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/images/icons/icon-dark.png",
    apple: "/images/icons/icon-dark.png",
  },
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
          {/* <div className="md:hidden">
            <MobileWarning />
          </div> */}
          {/* Affichage desktop */}
          <div className="flex flex-col justify-start min-h-screen max-w-screen text-textColor-main relative">
            {/* Fond noir */}
            <div className="fixed inset-0 -z-20 bg-black" />
            {/* SVG */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
              <Image
                src={background}
                alt="background"
                fill
                className="object-cover opacity-10"
                priority
              />
            </div>
            <div className="hidden lg:block">
              <MenuDesktop />
            </div>
            <div className="block lg:hidden">
              <MobileMenu />
            </div>
            <main className="flex-grow mt-20 w-full">
              <div className="relative flex flex-col justify-center items-center w-full ">
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
