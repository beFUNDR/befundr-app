"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import links from "./links";
import { WalletButton } from "@/providers/SolanaProvider";
import "@/app/customStyles.css";
import { useWallet } from "@solana/wallet-adapter-react";
import ProfilButton from "../buttons/ProfilButton";

const MenuDesktop = () => {
  //* GLOBAL STATE
  const currentPathname = usePathname();
  const { connected } = useWallet();

  const isActive = (pathname: string) => {
    // Specific logic for homepage route "/"
    if (pathname === "/") {
      return currentPathname === pathname;
    }
    // other cases
    return currentPathname.startsWith(pathname);
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-start items-center w-full h-16 gap-6 px-10 pt-2 drop-shadow-lg  bg-black  z-20 ">
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="logo" width={200} height={100} />
        </Link>

        <div className="flex justify-start items-center gap-4 text-h3  w-2/3 h-full ">
          {links.map((link) => (
            <Link
              href={link.href}
              className={`px-4 py-1 border-b-2 text-neutral-500 ${
                isActive(link.href)
                  ? " border-accentColor"
                  : "border-transparent"
              } transition-all ease-in-out duration-300 text-white hover:text-accent`}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {connected ? <ProfilButton /> : <WalletButton />}
      </div>
    </>
  );
};

export default MenuDesktop;
