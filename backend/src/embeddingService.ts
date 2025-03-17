import { HfInference } from "@huggingface/inference";
import { ChromaClient } from "chromadb";

const hf = new HfInference("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");
const client = new ChromaClient({ path: "http://localhost:8000" });

async function getEmbeddings(text: string): Promise<number[]> {
  try {
    console.log("[DEBUG] Starting to generate embeddings for text:", text);
    const embedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });
    console.log("[DEBUG] Raw embeddings received:", embedding);
    const result = Array.isArray(embedding[0]) ? (embedding as number[][])[0] : (embedding as number[]);
    console.log("[DEBUG] Processed embeddings:", result);
    return result;
  } catch (error) {
    console.error("[ERROR] Error generating embeddings:", error);
    throw error;
  }
}

async function checkIfEmbeddingsExist(cardId: string): Promise<boolean> {
  try {
    const collection = await client.getOrCreateCollection({ name: "content_collection" });
    const existingEntry = await collection.get({ ids: [cardId] });
    console.log("[DEBUG] Checking if embeddings exist for cardId:", cardId, "Result:", existingEntry.ids.length > 0);
    return existingEntry.ids.length > 0;
  } catch (error) {
    console.error("[ERROR] Error checking embeddings:", error);
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
    console.log("[DEBUG] Starting to store embeddings for card:", card);
    const embeddingsExist = await checkIfEmbeddingsExist(card._id);
    if (embeddingsExist) {
      console.log("[DEBUG] Embeddings already exist for card:", card._id, "Skipping storage");
      return;
    }

    console.log("[DEBUG] Generating embeddings for card components...");
    const [titleEmbedding, descriptionEmbedding, typeEmbedding, linkEmbedding] = await Promise.all([
      getEmbeddings(card.title),
      card.description ? getEmbeddings(card.description) : Promise.resolve([]),
      getEmbeddings(card.type),
      card.link ? getEmbeddings(card.link) : Promise.resolve([]),
    ]);

    console.log("[DEBUG] Title embedding:", titleEmbedding);
    console.log("[DEBUG] Description embedding:", descriptionEmbedding);
    console.log("[DEBUG] Type embedding:", typeEmbedding);
    console.log("[DEBUG] Link embedding:", linkEmbedding);

    const combinedEmbedding = [...titleEmbedding, ...descriptionEmbedding, ...typeEmbedding, ...linkEmbedding];
    console.log("[DEBUG] Combined embedding:", combinedEmbedding);

    const combinedText = `${card.title} ${card.description || ""} ${card.type} ${card.link || ""}`.trim();
    console.log("[DEBUG] Combined text for document:", combinedText);

    const collection = await client.getOrCreateCollection({ name: "content_collection" });
    console.log("[DEBUG] Collection retrieved or created:", collection.name);

    const metadata = {
      title: card.title,
      description: card.description || "",
      type: card.type,
      link: card.link || "",
      userId: card.userId || "",
    };
    console.log("[DEBUG] Metadata to store:", metadata);

    await collection.upsert({
      ids: [card._id],
      embeddings: [combinedEmbedding],
      documents: [combinedText],
      metadatas: [metadata],
    });
    console.log("[DEBUG] Embeddings successfully stored for card:", card._id);
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
    console.log("[DEBUG] Starting query process with query:", query, "for userId:", userId);
    console.log("[DEBUG] Generating query embedding...");
    const queryEmbedding = await getEmbeddings(query);

    console.log("[DEBUG] Querying ChromaDB collection...");
    const collection = await client.getOrCreateCollection({ name: "content_collection" });

    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: 1,
      where: { userId },
    });
    console.log("[DEBUG] Raw query results:", results);

    if (!results.ids?.[0] || !results.metadatas?.[0]?.[0]) {
      console.log("[DEBUG] No matching card found in ChromaDB for query:", query);
      return null;
    }

    const bestMatch = {
      id: String(results.ids[0]),
      title: results.metadatas[0][0].title as string,
      description: results.metadatas[0][0].description as string,
      type: results.metadatas[0][0].type as string,
      link: results.metadatas[0][0].link as string,
    };
    console.log("[DEBUG] Best matching card found:", bestMatch);
    return bestMatch;
  } catch (error) {
    console.error("[ERROR] Error querying ChromaDB:", error);
    throw error;
  }
}