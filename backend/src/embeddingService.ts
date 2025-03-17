import { HfInference } from "@huggingface/inference";
import { ChromaClient, IncludeEnum } from "chromadb";

const hf = new HfInference("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");
const client = new ChromaClient({ path: "http://localhost:8000" });

async function getEmbeddings(text: string): Promise<number[]> {
  try {
    console.log("[DEBUG] Generating embedding for text:", text);
    const embedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });
    const result = Array.isArray(embedding[0]) ? (embedding as number[][])[0] : (embedding as number[]);
    console.log("[DEBUG] Embedding generated (length):", result.length);
    return result;
  } catch (error) {
    console.error("[ERROR] Error generating embedding:", error);
    throw error;
  }
}

export async function storeCardEmbeddings(card: {
  _id: string;
  title: string;
  description?: string;
  type: string;
  link?: string;
  userId?: string;
}) {
  try {
    console.log("[DEBUG] Storing embeddings for card:", card);
    const combinedText = `${card.title} ${card.description || ""} ${card.type} ${card.link || ""}`.trim();
    const embedding = await getEmbeddings(combinedText);
    console.log("[DEBUG] Embedding to store (length):", embedding.length); // Confirm 384D

    const collection = await client.getOrCreateCollection({ name: "content_collection" });
    await collection.upsert({
      ids: [card._id],
      embeddings: [embedding], // Single 384D embedding
      documents: [combinedText],
      metadatas: [{
        title: card.title,
        description: card.description || "",
        type: card.type,
        link: card.link || "",
        userId: card.userId || "",
      }],
    });
    console.log("[DEBUG] Embeddings stored for card ID:", card._id);
  } catch (error) {
    console.error("[ERROR] Error storing embeddings:", error);
    throw error;
  }
}

export async function queryChromaDB(query: string, userId: string): Promise<{
  id: string;
  title: string;
  description: string;
  type: string;
  link: string;
} | null> {
  try {
    console.log("[DEBUG] Querying with:", query, "for userId:", userId);
    const queryEmbedding = await getEmbeddings(query);

    const collection = await client.getOrCreateCollection({ name: "content_collection" });
    const allItems = await collection.get({ include: [IncludeEnum.Embeddings, IncludeEnum.Metadatas] });
    console.log("[DEBUG] Collection contents:", allItems);
    if (allItems.embeddings && allItems.embeddings.length > 0) {
      console.log("[DEBUG] Stored embedding length:", allItems.embeddings[0].length);
    } else {
      console.log("[DEBUG] Collection is empty or embeddings not returned");
    }

    const results = await collection.query({
      queryEmbeddings: [queryEmbedding], // 384D embedding
      nResults: 1,
      where: { userId },
      include: [IncludeEnum.Metadatas, IncludeEnum.Distances],
    });
    console.log("[DEBUG] Query results:", results);

    if (!results.ids?.[0]?.[0] || !results.metadatas?.[0]?.[0]) {
      console.log("[DEBUG] No match found for query:", query);
      return null;
    }

    const bestMatch = {
      id: results.ids[0][0],
      title: results.metadatas[0][0].title as string,
      description: results.metadatas[0][0].description as string,
      type: results.metadatas[0][0].type as string,
      link: results.metadatas[0][0].link as string,
    };
    console.log("[DEBUG] Best match:", bestMatch, "Distance:", results.distances?.[0]?.[0]);
    return bestMatch;
  } catch (error) {
    console.error("[ERROR] Error querying ChromaDB:", error);
    throw error;
  }
}