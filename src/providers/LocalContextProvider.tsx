"use client";
import { useGetUser } from "@/features/users/hooks/useUser";
import { User } from "@/features/users/types/user.types";
import { fetcher } from "@/shared/api/fetcher";
/**
 * LOCAL CONTEXT PROVIDER
 *
 * This provider is used to manage the local state of the application.
 */
//TODO refactor this provider as it's too generic
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
  setUser: () => {},
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
  const { data: userData } = useGetUser(publicKey?.toString() || "");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const isAdmin = useMemo(() => {
    return (
      userData?.wallet === process.env.NEXT_PUBLIC_ADMIN_1 ||
      userData?.wallet === process.env.NEXT_PUBLIC_ADMIN_2
    );
  }, [userData]);

  const createUser = async (publicKey: PublicKey): Promise<boolean> => {
    try {
      const res = await fetcher("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        bodyParams: { wallet: publicKey.toString() },
      });

      //TODO this should be done in the /api/user route for better performance
      const resGameProgram = await fetcher("/api/game-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        bodyParams: { userId: publicKey.toString() },
      });

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
    <LocalContext.Provider value={{ user, setUser, createUser, isAdmin }}>
      {children}
    </LocalContext.Provider>
  );
};

// Custom hook to use the local context
export const useLocalContext = () => {
  return useContext(LocalContext);
};
