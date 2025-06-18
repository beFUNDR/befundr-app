import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useLocalContext } from "@/providers/LocalContextProvider";
import toast from "react-hot-toast";

export const useWalletConnection = () => {
  const { publicKey, connected } = useWallet();
  const { setUser } = useLocalContext();

  useEffect(() => {
    const fetchUserData = async () => {
      if (connected && publicKey) {
        try {
          const response = await fetch(
            `/api/user?wallet=${publicKey.toString()}`
          );
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else if (response.status === 404) {
            // L'utilisateur n'existe pas encore, on peut le créer ici si nécessaire
            console.log("User not found, creation possible");
          } else {
            toast.error("Error while fetching user data");
          }
        } catch (error) {
          console.error("Error while fetching user data:", error);
          toast.error("Error while fetching user data");
        }
      } else {
        setUser({
          wallet: "",
          name: "",
          avatar: "",
          bio: "",
          telegram: "",
          twitter: "",
          website: "",
          discord: "",
          skills: [],
          isCompleteProfile: false,
        });
      }
    };

    fetchUserData();
  }, [connected, publicKey, setUser]);

  return { connected, publicKey };
};
