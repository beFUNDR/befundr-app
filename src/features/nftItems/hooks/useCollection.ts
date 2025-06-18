import { useQuery } from "@tanstack/react-query";
import { getAllDocumentsFromCollection } from "@/shared/utils/firebaseClient";

// Fonction utilitaire pure pour récupérer tous les documents de la collection "collections"
export const getAllCollections = async () => {
  try {
    const { results, error } =
      await getAllDocumentsFromCollection<Collection>("collections");
    if (error) {
      throw error;
    }
    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des collections:", error);
    throw error;
  }
};

// Hook React Query pour utiliser getAllCollections
export const useGetAllCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: getAllCollections,
  });
};
