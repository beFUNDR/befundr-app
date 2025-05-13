import { getDocument } from "@/utils/firebaseClient";
import { useQuery } from "@tanstack/react-query";

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
      throw new Error("Error fetching game program for the user");
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
