"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import links from "./links";
import { Menu, X } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import ProfilButton from "../buttons/ProfilButton";
import { WalletButton } from "@/providers/SolanaProvider";

const MobileMenu = () => {
  //* LOCAL STATE
  const currentPathname = usePathname();
  const { connected, publicKey, signMessage } = useWallet();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (pathname: string) => {
    // Specific logic for homepage route "/"
    if (pathname === "/") {
      return currentPathname === pathname;
    }
    // other cases
    return currentPathname.startsWith(pathname);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-between items-center max-w-screen h-20 p-4 drop-shadow-lg bg-black z-30">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X size={25} className="body-header" />
          ) : (
            <Menu size={25} className="body-header" />
          )}
        </button>
        {/* <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="logo" width={150} height={120} />
        </Link> */}
        {connected ? <ProfilButton /> : <WalletButton />}
      </div>
      <div
        className={`fixed inset-y-20 left-0 flex flex-col justify-start items-center gap-10 pt-10 bg-black h4Style w-full h-full transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0 " : "-translate-x-full"
        } z-20`}
      >
        <Link
          href={"/"}
          onClick={handleLinkClick}
          className={` px-4 py-1 border-b-2 ${
            isActive("/") ? " border-accentColor" : "border-transparent"
          } transition-all`}
          key={"/"}
        >
          Home
        </Link>
        {links.map((link) => (
          <Link
            href={link.href}
            onClick={handleLinkClick}
            className={` px-4 py-1 border-b-2 ${
              isActive(link.href) ? " border-accentColor" : "border-transparent"
            } transition-all`}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MobileMenu;
