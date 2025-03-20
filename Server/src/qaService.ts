import { queryChromaDB } from "./embeddingService.js";

export async function queryWithQA(query: string, userId: string): Promise<{
  id: string;
  title: string;
  description: string;
  type: string;
  link: string;
} | null> {
  try {
    console.log("[DEBUG] Starting queryWithQA with query:", query, "and userId:", userId);
    const bestMatch = await queryChromaDB(query, userId);
    console.log("[DEBUG] Final result from queryWithQA:", bestMatch || "No card found");
    return bestMatch;
  } catch (error) {
    console.error("[ERROR] Error in queryWithQA:", error);
    throw error;
  }
}