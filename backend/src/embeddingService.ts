import { HfInference } from "@huggingface/inference";
import { ChromaClient } from "chromadb";

// Initialize Hugging Face API and ChromaDB client
const hf = new HfInference(); // Replace with your actual API key
const client = new ChromaClient({
  path: "http://localhost:8000", // Use 'path' instead of 'url'
});

// Function to generate embeddings using Hugging Face
async function getEmbeddings(text: string): Promise<number[]> {
  try {
    console.log("[DEBUG] Starting to generate embeddings for text:", text); // Debug log
    const embedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });
    console.log("[DEBUG] Raw embeddings received:", embedding); // Debug log

    // Ensure the embedding is a flat array
    const result = Array.isArray(embedding[0]) ? (embedding as number[][])[0] : (embedding as number[]);
    console.log("[DEBUG] Processed embeddings:", result); // Debug log
    return result;
  } catch (error) {
    console.error("[ERROR] Error generating embeddings:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
}

// Function to check if embeddings already exist in ChromaDB
async function checkIfEmbeddingsExist(cardId: string): Promise<boolean> {
  try {
    const collection = await client.getOrCreateCollection({
      name: "content_collection",
    });
    const existingEntry = await collection.get({ ids: [cardId] });
    return existingEntry.ids.length > 0;
  } catch (error) {
    console.error("[ERROR] Error checking embeddings:", error);
    throw error;
  }
}

// Function to store embeddings in ChromaDB
export async function storeCardEmbeddings(card: {
  _id: string; // Unique ID from MongoDB
  title: string;
  description?: string; // Optional description
  type: string;
  link?: string; // Optional link
}) {
  try {
    console.log("[DEBUG] Starting to store embeddings for card:", card); // Debug log

    // Check if embeddings already exist for this card
    const embeddingsExist = await checkIfEmbeddingsExist(card._id);
    if (embeddingsExist) {
      console.log("[DEBUG] Embeddings already exist for card:", card._id);
      return; // Skip embedding generation if they already exist
    }

    // Generate embeddings concurrently for title, description, type, and link (if provided)
    console.log("[DEBUG] Generating embeddings concurrently...");
    const [titleEmbedding, descriptionEmbedding, typeEmbedding, linkEmbedding] = await Promise.all([
      getEmbeddings(card.title),
      card.description ? getEmbeddings(card.description) : Promise.resolve([]),
      getEmbeddings(card.type),
      card.link ? getEmbeddings(card.link) : Promise.resolve([]),
    ]);

    console.log("[DEBUG] Title embeddings generated:", titleEmbedding);
    console.log("[DEBUG] Description embeddings generated:", descriptionEmbedding);
    console.log("[DEBUG] Type embeddings generated:", typeEmbedding);
    console.log("[DEBUG] Link embeddings generated:", linkEmbedding);

    // Combine embeddings into a single vector
    const combinedEmbedding = [
      ...titleEmbedding,
      ...descriptionEmbedding,
      ...typeEmbedding,
      ...linkEmbedding,
    ];
    console.log("[DEBUG] Combined embeddings:", combinedEmbedding); // Debug log

    // Store embeddings in ChromaDB
    console.log("[DEBUG] Retrieving or creating ChromaDB collection...");
    const collection = await client.getOrCreateCollection({
      name: "content_collection",
    });
    console.log("[DEBUG] ChromaDB collection retrieved:", collection.name); // Debug log

    // Provide default values for optional fields
    const metadata = {
      title: card.title,
      description: card.description || "", // Default to empty string if undefined
      type: card.type,
      link: card.link || "", // Default to empty string if undefined
    };
    console.log("[DEBUG] Metadata for embeddings:", metadata); // Debug log

    // Upsert embeddings into ChromaDB
    console.log("[DEBUG] Upserting embeddings into ChromaDB...");
    await collection.upsert({
      ids: [card._id], // Use the card's unique _id as the ID in ChromaDB
      embeddings: [combinedEmbedding],
      metadatas: [metadata],
    });

    console.log("[DEBUG] Embeddings stored for card:", card._id); // Debug log
  } catch (error) {
    console.error("[ERROR] Error storing embeddings:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
}

// Function to delete embeddings from ChromaDB
export async function deleteCardEmbeddings(cardId: string) {
  try {
    console.log("[DEBUG] Starting to delete embeddings for card:", cardId); // Debug log

    // Retrieve the ChromaDB collection
    const collection = await client.getOrCreateCollection({
      name: "content_collection",
    });

    // Delete embeddings for the given card ID
    await collection.delete({ ids: [cardId] });

    console.log("[DEBUG] Embeddings deleted for card:", cardId); // Debug log
  } catch (error) {
    console.error("[ERROR] Error deleting embeddings:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
}