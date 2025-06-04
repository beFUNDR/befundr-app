/**
 * LOCAL CONTEXT PROVIDER
 *
 * This provider is used to manage the local state of the application.
 */
import { useUser } from "@/hooks/dbData/useUser";
import { concatAddress } from "@/utils/utilsFunctions";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

// Context type
type LocalContextProviderType = {
  user: User | null;
  setUser: (user: User) => void;
  createUser: (publicKey: PublicKey) => Promise<boolean>;
  signWelcomeMessage: (publicKey: PublicKey) => Promise<void>;
  isAdmin: boolean;
};

// Create the default context
const LocalContext = createContext<LocalContextProviderType>({
  user: null,
  setUser: () => {},
  createUser: async () => false,
  signWelcomeMessage: async () => {},
  isAdmin: false,
});

// Create a provider for the context
export const LocalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();
  const { signMessage, publicKey } = useWallet();
  const { data: userData, isLoading: isUserLoading } = useUser(
    publicKey?.toString() || ""
  );

  const [user, setUser] = useState<User | null>(null);

  const isAdmin = useMemo(() => {
    return (
      userData?.wallet === process.env.NEXT_PUBLIC_ADMIN_1 ||
      userData?.wallet === process.env.NEXT_PUBLIC_ADMIN_2
    );
  }, [userData]);

  const signWelcomeMessage = async (publicKey: PublicKey) => {
    if (!signMessage || !publicKey)
      throw new Error("No sign message function or public key");

    const message = new TextEncoder().encode(
      `Welcome to beFUNDR ! Please sign this message to prove ownership of the wallet : ${concatAddress(
        publicKey.toBase58()
      )}`
    );

    try {
      const signature = await signMessage(message);
      // Store the signature in session storage to avoid signing again
      if (signature && signature.length > 0) {
        sessionStorage.setItem("befundr_signed", publicKey.toString());
      }
    } catch (err) {
      toast.error("Something went wrong while signing the message");
      console.error("Signature refusée ou erreur:", err);
    }
  };

  const createUser = async (publicKey: PublicKey): Promise<boolean> => {
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

      // Invalidate the user and game queries
      queryClient.invalidateQueries({
        queryKey: ["user", publicKey.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["gameProgram", publicKey.toString()],
      });

      return true;
    } catch (error) {
      console.error("Error creating user", error);
      toast.error("Error creating user");
      return false;
    }
  };

  return (
    <LocalContext.Provider
      value={{ user, setUser, createUser, signWelcomeMessage, isAdmin }}
    >
      {children}
    </LocalContext.Provider>
  );
};

// Custom hook to use the local context
export const useLocalContext = () => {
  return useContext(LocalContext);
};
