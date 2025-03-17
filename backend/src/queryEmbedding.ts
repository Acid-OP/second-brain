import { HfInference } from "@huggingface/inference";

const hf = new HfInference("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"); // Replace with your actual API key

// Generate embeddings for a query
export async function generateQueryEmbedding(query: string): Promise<number[]> {
  try {
    console.log("[DEBUG] Generating embedding for query:", query);
    const embedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2", // Same model as content embeddings
      inputs: query,
    });
    const result = Array.isArray(embedding[0]) ? (embedding as number[][])[0] : (embedding as number[]);
    console.log("[DEBUG] Query embedding generated:", result);
    return result;
  } catch (error) {
    console.error("[ERROR] Error generating query embedding:", error);
    throw error;
  }
}