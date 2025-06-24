import { useQuery } from "@tanstack/react-query";
import {
  getAllDocumentsFromCollection,
  getDocument,
} from "@/shared/utils/firebase-client";

// Query to get all partners
const getAllPartners = async () => {
  try {
    const { results, error } =
      await getAllDocumentsFromCollection<Partner>("partners");
    if (error) {
      throw error;
    }
    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des partenaires:", error);
    throw error;
  }
};

export const useGetAllPartners = () => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: getAllPartners,
  });
};

// Query to get a partner by id
const getPartnerById = async (partnerId: string) => {
  const { result, error } = await getDocument<Partner>("partners", partnerId);
  if (error) {
    throw error;
  }
  return result;
};

export const useGetPartnerById = (partnerId: string) => {
  return useQuery({
    queryKey: ["partners", partnerId],
    queryFn: () => getPartnerById(partnerId),
  });
};
