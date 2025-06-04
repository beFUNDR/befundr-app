"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import links from "./links";
import { WalletButton } from "@/providers/SolanaProvider";
import "@/app/customStyles.css";
import { useWallet } from "@solana/wallet-adapter-react";
import ProfilButton from "../buttons/ProfilButton";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import WelcomeModal from "../modals/WelcomeModal";
import { useUser } from "@/hooks/dbData/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { useGameProgramByUserId } from "@/hooks/dbData/useGameProgram";
import PointCardSmall from "../cards/PointCardSmall";
import ButtonLabelSecondarySmall from "../buttons/_ButtonLabelSecondarySmall";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { concatAddress } from "@/utils/utilsFunctions";

const MenuDesktop = () => {
  //* GLOBAL STATE
  const currentPathname = usePathname();
  const { connected, publicKey, signMessage } = useWallet();
  const queryClient = useQueryClient();
  const { data: userData, isLoading: isUserLoading } = useUser(
    publicKey?.toString()
  );
  const { data: gameProgramData } = useGameProgramByUserId(
    publicKey?.toString() || ""
  );

  //* LOCAL STATE
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const isAdmin = useMemo(() => {
    return (
      userData?.wallet === process.env.NEXT_PUBLIC_ADMIN_1 ||
      userData?.wallet === process.env.NEXT_PUBLIC_ADMIN_2
    );
  }, [userData]);

  useEffect(() => {
    const signWelcomeMessage = async () => {
      if (!signMessage || !publicKey) return;

      const message = new TextEncoder().encode(
        `Welcome to beFUNDR ! Please sign this message to prove ownership of the wallet : ${concatAddress(
          publicKey.toBase58()
        )}`
      );

      try {
        const signature = await signMessage(message);
        const signatureBase58 = bs58.encode(signature);
        // Store the signature in session storage to avoid signing again
        sessionStorage.setItem("befundr_signed", "true");
      } catch (err) {
        console.error("Signature refusée ou erreur:", err);
      }
    };

    const hasSigned =
      typeof window !== "undefined" &&
      sessionStorage.getItem("befundr_signed") === "true";

    console.log("hasSigned", hasSigned);

    if (connected && !hasSigned) {
      signWelcomeMessage();
    }
  }, [connected, signMessage, publicKey]);

  //* FUNCTIONS
  const isActive = (pathname: string) => {
    // Specific logic for homepage route "/"
    if (pathname === "/") {
      return currentPathname === pathname;
    }
    // other cases
    return currentPathname.startsWith(pathname);
  };

  useEffect(() => {
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

        const resGameProgram = await fetch("/api/gameprogram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: publicKey.toString() }),
        });

        if (!resGameProgram.ok) throw new Error("Erreur création game program");

        setIsWelcomeModalOpen(true);

        // Invalidate the user and game queries
        queryClient.invalidateQueries({
          queryKey: ["user", publicKey.toString()],
        });
        queryClient.invalidateQueries({
          queryKey: ["gameProgram", publicKey.toString()],
        });
      } catch (error) {
        console.error("Error creating user", error);
        toast.error("Error creating user");
      }
    };

    if (
      connected &&
      (!userData || userData === "not_found") &&
      !isUserLoading
    ) {
      createUser();
    }
  }, [connected, publicKey, userData, isUserLoading]);

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
        {isAdmin && (
          <button className="flex gap-2">
            <ButtonLabelSecondarySmall label="Admin action 1" />
            <ButtonLabelSecondarySmall label="Admin action 2" />
          </button>
        )}
        {gameProgramData && <PointCardSmall points={gameProgramData.points} />}
        {connected ? <ProfilButton /> : <WalletButton />}
      </div>

      {isWelcomeModalOpen && (
        <WelcomeModal onClose={() => setIsWelcomeModalOpen(false)} />
      )}
    </>
  );
};

export default MenuDesktop;
