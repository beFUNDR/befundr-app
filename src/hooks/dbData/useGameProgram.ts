import { getDocument } from "@/utils/firebaseClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const getGameProgramByUserId = async (userId: string) => {
  try {
    const { result, error } = await getDocument<GameProgram>(
      "gamePrograms",
      userId
    );
    if (error) {
      throw error;
    }
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.error("Error fetching game program for the user:", error);
    throw error;
  }
};

export const useGameProgramByUserId = (userId: string) =>
  useQuery({
    queryKey: ["gameProgram", userId],
    queryFn: () => getGameProgramByUserId(userId),
    enabled: !!userId,
  });

// Fonction pour initialiser un game program pour un utilisateur
export const initGameProgram = async (userId: string) => {
  // Appel à l'API pour créer le document (coté client, on utilise fetch)
  const response = await fetch("/api/gameProgram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, points: 0 }),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de l'initialisation du game program");
  }
  return response.json();
};

export const useInitGameProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => initGameProgram(userId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["gameProgram", variables.userId],
      });
    },
  });
};
