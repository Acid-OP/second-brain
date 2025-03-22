import axios from "axios";
import { useEffect, useState, useCallback } from "react";

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

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Memoize refresh to prevent unnecessary re-renders
  const refresh = useCallback(async () => {
    setLoading(true); // Reset loading state
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContents(response.data || []); // Default to empty array if null
      setError(null);
    } catch (error: any) {
      console.error("Error fetching content:", error.response?.data || error.message);
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

      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { id },
      });
      if (response.status === 200) {
        setContents((prevContents) => prevContents.filter((content) => content._id !== id));
        setError(null);
      }
    } catch (error: any) {
      console.error("Error deleting content:", error.response?.data || error.message);
      setError("Failed to delete content. Please try again.");
      await refresh(); // Sync with server on error
    }
  }, [refresh]); // refresh is a dependency since it’s used inside

  // Fetch content on mount
  useEffect(() => {
    refresh();
  }, [refresh]); // refresh is stable due to useCallback

  return { contents, loading, error, refresh, deleteContent };
}