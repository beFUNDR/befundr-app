import { useQuery } from "@tanstack/react-query";
import { getAllDocumentsFromCollection } from "@/utils/firebaseClient";

// Fonction utilitaire pure pour récupérer tous les documents de la collection "partners"
export const getAllPartners = async () => {
  try {
    const { results, error } = await getAllDocumentsFromCollection<Partner>(
      "partners"
    );
    if (error) {
      throw error;
    }
    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des partenaires:", error);
    throw error;
  }
};

// Hook React Query pour utiliser getAllPartners
export const useGetAllPartners = () => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: getAllPartners,
  });
};
