"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import links from "./links";
import { WalletButton } from "@/providers/SolanaProvider";
import "@/app/customStyles.css";
import { useWallet } from "@solana/wallet-adapter-react";
import ProfilButton from "../buttons/ProfilButton";
import { useEffect, useState } from "react";
import WelcomeModal from "../modals/WelcomeModal";
import { useGameProgramByUserId } from "@/hooks/dbData/useGameProgram";
import PointCardSmall from "../cards/PointCardSmall";
import ButtonLabelSecondarySmall from "../buttons/_ButtonLabelSecondarySmall";
import { useLocalContext } from "@/providers/LocalContextProvider";
import { Menu as MenuIcon, X } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useUser } from "@/hooks/dbData/useUser";

const MenuComponent = () => {
  //* GLOBAL STATE
  const { createUser, isAdmin } = useLocalContext();
  const { user } = useAuth();
  const currentPathname = usePathname();
  const { connected, publicKey, signMessage } = useWallet();
  const { useGetUser } = useUser();
  const { data: userData, isLoading: isUserLoading } = useGetUser(
    publicKey?.toString() || ""
  );
  const { data: gameProgramData } = useGameProgramByUserId(
    publicKey?.toString() || ""
  );

  //* LOCAL STATE
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //* FUNCTIONS
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

  useEffect(() => {
    // avoid user creation before signature
    if (!user) return;

    const handleCreateUser = async () => {
      if (!publicKey) return;
      const isSuccess = await createUser(publicKey);
      if (isSuccess) {
        setIsWelcomeModalOpen(true);
      }
    };

    if (
      connected &&
      (!userData || userData.data.wallet === "not_found") &&
      !isUserLoading &&
      publicKey
    ) {
      handleCreateUser();
    }
  }, [connected, publicKey, userData, isUserLoading, user]);

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex fixed inset-0 justify-start items-center w-full h-20 gap-6 px-10 pt-2 drop-shadow-lg bg-black z-20">
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="logo" width={200} height={100} />
        </Link>

        <div className="flex justify-start items-center gap-4 text-h3 w-2/3 h-full">
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
        {isAdmin && (
          <button className="flex gap-2">
            <ButtonLabelSecondarySmall label="Admin action 1" />
            <ButtonLabelSecondarySmall label="Admin action 2" />
          </button>
        )}
        {gameProgramData && (
          <PointCardSmall points={gameProgramData.data.points} />
        )}
        {connected ? <ProfilButton /> : <WalletButton />}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden fixed inset-0 flex justify-between items-center max-w-screen h-20 p-4 drop-shadow-lg bg-black z-30">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X size={25} className="body-header" />
          ) : (
            <MenuIcon size={25} className="body-header" />
          )}
        </button>
        {connected ? <ProfilButton /> : <WalletButton />}
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-y-20 left-0 flex flex-col justify-start items-center gap-10 pt-10 bg-black h4Style w-full h-full transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } z-20`}
      >
        <Link
          href={"/"}
          onClick={handleLinkClick}
          className={`px-4 py-1 border-b-2 ${
            isActive("/") ? "border-accentColor" : "border-transparent"
          } transition-all`}
          key={"/"}
        >
          Home
        </Link>
        {links.map((link) => (
          <Link
            href={link.href}
            onClick={handleLinkClick}
            className={`px-4 py-1 border-b-2 ${
              isActive(link.href) ? "border-accentColor" : "border-transparent"
            } transition-all`}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {isWelcomeModalOpen && (
        <WelcomeModal onClose={() => setIsWelcomeModalOpen(false)} />
      )}
    </>
  );
};

export default MenuComponent;
