import axios from "axios";
import { useEffect, useState, useCallback } from "react";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize refresh to prevent unnecessary re-renders
  const refresh = useCallback(async () => {
    setLoading(true); // Reset loading state
    try {
      console.log("[DEBUG] Fetching content from:", `${BACKEND_URL}/api/v1/content`);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("[DEBUG] Content fetched:", response.data);
      setContents(response.data || []); // Default to empty array if null
      setError(null);
    } catch (error: any) {
      console.error("[ERROR] Error fetching content:", error.response?.data || error.message);
      setError("Failed to fetch content. Please check your network or login status.");
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies since token is from localStorage

  // Memoize deleteContent to prevent re-renders
  const deleteContent = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      console.log("[DEBUG] Deleting content with ID:", id);
      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { id },
      });
      console.log("[DEBUG] Delete response:", response.data);
      if (response.status === 200) {
        setContents((prevContents) => prevContents.filter((content) => content._id !== id));
        setError(null);
      }
    } catch (error: any) {
      console.error("[ERROR] Error deleting content:", error.response?.data || error.message);
      setError("Failed to delete content. Please try again.");
      await refresh(); // Sync with server on error
    }
  }, [refresh]); // refresh is a dependency since it’s used inside

  // Debug mounting and fetch only once
  useEffect(() => {
    console.log("[DEBUG] useContent hook mounted");
    refresh();
    return () => {
      console.log("[DEBUG] useContent hook unmounted");
    };
  }, [refresh]); // refresh is stable due to useCallback

  return { contents, loading, error, refresh, deleteContent };
}