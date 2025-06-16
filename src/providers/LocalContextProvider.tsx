"use client";
/**
 * LOCAL CONTEXT PROVIDER
 *
 * This provider is used to manage the local state of the application.
 */
//TODO refactor this provider as it's too generic
import { useUser } from "@/hooks/dbData/useUser";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

// Context type
type LocalContextProviderType = {
  user: User | null;
  setUser: (user: User) => void;
  createUser: (publicKey: PublicKey) => Promise<boolean>;
  isAdmin: boolean;
};

// Create the default context
const LocalContext = createContext<LocalContextProviderType>({
  user: null,
  setUser: () => { },
  createUser: async () => false,
  isAdmin: false,
});

// Create a provider for the context
export const LocalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();
  const { publicKey } = useWallet();
  const { useGetUser } = useUser();
  const { data: userData } = useGetUser(publicKey?.toString() || "");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userData) {
      setUser(userData.data);
    }
  }, [userData]);

  const isAdmin = useMemo(() => {
    return (
      userData?.data.wallet === process.env.NEXT_PUBLIC_ADMIN_1 ||
      userData?.data.wallet === process.env.NEXT_PUBLIC_ADMIN_2
    );
  }, [userData]);

  const createUser = async (publicKey: PublicKey): Promise<boolean> => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet: publicKey.toString() }),
      });

      if (!res.ok) throw new Error("Error while creating user");

      //TODO this should be done in the /api/user route for better performance
      const resGameProgram = await fetch("/api/gameprogram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: publicKey.toString() }),
      });

      if (!resGameProgram.ok) throw new Error("Error while creating game program");

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
      value={{ user, setUser, createUser, isAdmin }}
    >
      {children}
    </LocalContext.Provider>
  );
};

// Custom hook to use the local context
export const useLocalContext = () => {
  return useContext(LocalContext);
};