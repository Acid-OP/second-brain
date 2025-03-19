import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface User {
  _id: string;
  username: string;
}

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "reddit" | "link";
  userId: User;
  tags: string[];
  description?: string;
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  const refresh = async () => {
    try {
      console.log("[DEBUG] Fetching content from:", `${BACKEND_URL}/api/v1/content`);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add "Bearer" prefix for JWT
        },
      });
      console.log("[DEBUG] Content fetched:", response.data);
      setContents(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("[ERROR] Error fetching content:", error);
      setError("Failed to fetch content. Please check your network connection."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: `Bearer ${token}` }, // Add "Bearer" prefix for JWT
        data: { id },
      });
      console.log("[DEBUG] Delete response:", response.data);
      if (response.status === 200) {
        setContents((prevContents) => prevContents.filter((content) => content._id !== id));
      }
    } catch (error) {
      console.error("[ERROR] Error deleting content:", error);
      setError("Failed to delete content. Please try again."); // Set error message
      await refresh(); // Sync with server on error
    }
  };

  useEffect(() => {
    refresh(); // Fetch once on mount
  }, []); // No dependencies

  return { contents, loading, error, refresh, deleteContent }; // Return loading and error states
}