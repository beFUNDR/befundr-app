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
import toast from "react-hot-toast";
import WelcomeModal from "../modals/WelcomeModal";
import { useUser } from "@/hooks/dbData/useUser";
import { useQueryClient } from "@tanstack/react-query";
import ApplyButton from "../buttons/ApplyButton";

const MenuDesktop = () => {
  //* GLOBAL STATE
  const currentPathname = usePathname();
  const { connected, publicKey } = useWallet();
  const queryClient = useQueryClient();
  const { data: userData } = useUser(publicKey?.toString());

  //* LOCAL STATE
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  //* FUNCTIONS
  const isActive = (pathname: string) => {
    // Specific logic for homepage route "/"
    if (pathname === "/") {
      return currentPathname === pathname;
    }
    // other cases
    return currentPathname.startsWith(pathname);
  };

  const createUser = async () => {
    if (!publicKey || userData !== "not_found") return;

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet: publicKey.toString() }),
      });

      if (!res.ok) throw new Error("Erreur création utilisateur");
      // const data = await res.json();
      // setUser(data);
      setIsWelcomeModalOpen(true);

      // Invalidate the user query
      queryClient.invalidateQueries({
        queryKey: ["user", publicKey.toString()],
      });
    } catch (error) {
      console.error("Error creating user", error);
      toast.error("Error creating user");
    }
  };

  useEffect(() => {
    if (connected && userData === "not_found") {
      console.log("creating user from use effect");
      createUser();
    }
  }, [connected, publicKey]);

  return (
    <>
      <div className="fixed inset-0 flex justify-start items-center w-full h-20 gap-6 px-10 pt-2 drop-shadow-lg  bg-black  z-20 ">
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
        <ApplyButton />
        {connected ? <ProfilButton /> : <WalletButton />}
      </div>

      {isWelcomeModalOpen && (
        <WelcomeModal onClose={() => setIsWelcomeModalOpen(false)} />
      )}
    </>
  );
};

export default MenuDesktop;
