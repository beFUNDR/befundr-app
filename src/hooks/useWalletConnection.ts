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
            console.log("Utilisateur non trouvé, création possible");
          } else {
            toast.error(
              "Erreur lors de la récupération des données utilisateur"
            );
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données utilisateur:",
            error
          );
          toast.error("Erreur lors de la récupération des données utilisateur");
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
        });
      }
    };

    fetchUserData();
  }, [connected, publicKey, setUser]);

  return { connected, publicKey };
};
