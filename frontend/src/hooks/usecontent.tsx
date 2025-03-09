import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Content {
    _id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube" | "reddit" | "link";
    userId: string;
    tags: string[];
}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);

    function refresh() {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                setContents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching content:", error);
            });
    }

    async function deleteContent(id: string) {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                headers: { "Authorization": localStorage.getItem("token") },
                data: { id }
            });
        console.log("Delete response:", response.data); // Log success response
            
            setContents((prevContents) => 
                prevContents.filter((content) => content._id !== id)
            );
        } catch (error) {
            console.error("Error deleting content:", error);
            alert("Failed to delete content. Please try again."); // User feedback
            refresh(); // Optional: Sync with server on error
        }
    }

    useEffect(() => {
        refresh();
        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return { contents, refresh, deleteContent };
}