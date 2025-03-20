import { pipeline } from "@xenova/transformers";
import { ChromaClient, IncludeEnum } from "chromadb";

let embedder: any;
(async () => {
  try {
    console.log("[DEBUG] Loading self-hosted model: sentence-transformers/all-MiniLM-L6-v2");
    embedder = await pipeline('feature-extraction', 'sentence-transformers/all-MiniLM-L6-v2', {
      quantized: false, // Use unquantized model (model.onnx)
    });
    console.log("[DEBUG] Self-hosted model loaded successfully");
  } catch (error) {
    console.error("[ERROR] Failed to load model:", error);
  }
})();

const client = new ChromaClient({ path: "http://localhost:8000" });

async function getEmbeddings(text: string): Promise<number[]> {
  if (!embedder) {
    console.error("[ERROR] Model not yet loaded");
    throw new Error("Model not yet loaded. Please wait and try again.");
  }
  try {
    console.log("[DEBUG] Generating embedding for text:", text);
    const embedding = await embedder(text, { pooling: 'mean', normalize: true });
    const result: number[] = Array.from(embedding.data as Float32Array);
    console.log("[DEBUG] Embedding generated successfully, length:", result.length, "Sample:", result.slice(0, 5));
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
    console.log("[DEBUG] Starting storeCardEmbeddings for card:", card);
    const combinedText = `${card.title} ${card.description || ""} ${card.type} ${card.link || ""}`.trim();
    console.log("[DEBUG] Combined text for embedding:", combinedText);

    const embedding = await getEmbeddings(combinedText);
    console.log("[DEBUG] Embedding to store, length:", embedding.length, "Sample:", embedding.slice(0, 5));

    console.log("[DEBUG] Connecting to ChromaDB collection: content_collection");
    const collection = await client.getOrCreateCollection({ name: "content_collection" });
    console.log("[DEBUG] Collection ready, upserting data for card ID:", card._id);

    await collection.upsert({
      ids: [card._id],
      embeddings: [embedding],
      documents: [combinedText],
      metadatas: [{
        title: card.title,
        description: card.description || "",
        type: card.type,
        link: card.link || "",
        userId: card.userId || "",
      }],
    });
    console.log("[DEBUG] Embeddings and metadata stored successfully for card ID:", card._id);
  } catch (error) {
    console.error("[ERROR] Error storing embeddings in ChromaDB:", error);
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
    console.log("[DEBUG] Starting queryChromaDB with query:", query, "for userId:", userId);
    const queryEmbedding = await getEmbeddings(query);
    console.log("[DEBUG] Query embedding generated, length:", queryEmbedding.length, "Sample:", queryEmbedding.slice(0, 5));

    console.log("[DEBUG] Accessing ChromaDB collection: content_collection");
    const collection = await client.getOrCreateCollection({ name: "content_collection" });

    console.log("[DEBUG] Fetching all items for inspection");
    const allItems = await collection.get({ include: [IncludeEnum.Embeddings, IncludeEnum.Metadatas] });
    console.log("[DEBUG] Collection contents (ids):", allItems.ids);
    if (allItems.embeddings && allItems.embeddings.length > 0) {
      console.log("[DEBUG] Stored embeddings count:", allItems.embeddings.length, "Sample length:", allItems.embeddings[0].length);
    } else {
      console.log("[DEBUG] Collection is empty or embeddings not returned");
    }

    console.log("[DEBUG] Querying collection with embedding and userId filter");
    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: 1,
      where: { userId },
      include: [IncludeEnum.Metadatas, IncludeEnum.Distances],
    });
    console.log("[DEBUG] Query results:", {
      ids: results.ids,
      metadatas: results.metadatas,
      distances: results.distances,
    });

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
    console.log("[DEBUG] Best match found:", bestMatch, "Distance:", results.distances?.[0]?.[0]);
    return bestMatch;
  } catch (error) {
    console.error("[ERROR] Error querying ChromaDB:", error);
    throw error;
  }
}