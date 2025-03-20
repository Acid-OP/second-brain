import { useEffect, useState, ReactElement, forwardRef } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { RedditIcon } from "../icons/RedditIcon";
import { Linkicon } from "../icons/Linkicon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { DeleteConfirmationModal } from "./DeleteConfirmationModel";
import { Toast } from "./Toastcomponent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import "./youtube.css";
import "./twitter.css";
import "./reddit.css";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "reddit" | "link";
  _id: string;
  description?: string;
  className?: string;
  isHighlighted?: boolean;
  onDelete?: (id: string) => void;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, link, type, _id, description, className, isHighlighted = false, onDelete }, ref): ReactElement | null => {
    const [showToast, setShowToast] = useState<boolean>(false); // Share toast
    const [showDeleteToast, setShowDeleteToast] = useState<boolean>(false); // Delete toast
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
      let script: HTMLScriptElement | null = null;
      if (type === "reddit") {
        script = document.createElement("script");
        script.src = "//embed.redditmedia.com/widgets/platform.js";
        script.async = true;
        script.onload = () => {
          window.dispatchEvent(new Event("resize"));
        };
        document.body.appendChild(script);
      } else if (type === "twitter") {
        script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          setTimeout(() => {
            const iframe = document.querySelector(".twitter-embed-container iframe");
            if (iframe) {
              const container = iframe.closest(".twitter-embed-container");
              if (container) (container as HTMLElement).style.height = `${iframe.clientHeight}px`;
            }
          }, 1000);
        };
        document.body.appendChild(script);
      }
      return () => {
        if (script && document.body.contains(script)) document.body.removeChild(script);
      };
    }, [type, link]);

    const RenderIcon = (): ReactElement => {
      switch (type) {
        case "youtube": return <YoutubeIcon className="w-6" />;
        case "twitter": return <TwitterIcon className="w-6" />;
        case "reddit": return <RedditIcon className="w-6" />;
        case "link": return <Linkicon className="w-6" />;
      }
    };

    const handleCopyLink = async (): Promise<void> => {
      try {
        await navigator.clipboard.writeText(link);
        setShowToast(true);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    const handleDeleteClick = () => {
      setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { id: _id },
        });
        if (response.status === 200) {
          setShowDeleteToast(true); // Show toast FIRST
          setIsModalOpen(false); // Close modal
          setTimeout(() => {
            setIsDeleted(true); // Delay card removal
            if (onDelete) onDelete(_id); // Notify parent after toast
          }, 5); // Short delay to let toast render
        }
      } catch (e) {
        console.error("[ERROR] Delete failed:", e);
        setIsModalOpen(false);
      }
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    return (
      <>
        {showDeleteToast && (
          <Toast
            message="Deleted successfully!"
            duration={3000}
            onClose={() => setShowDeleteToast(false)}
          />
        )}
        {!isDeleted && (
          <div
            ref={ref}
            className={`${className || ""} p-4 bg-white rounded-md border-gray-200 max-w-72 min-h-48 min-w-72 sm:w-full md:w-1/2 lg:w-1/3 transition-all duration-500 ${
              isHighlighted ? "bg-purple-100 border-2 border-purple-500 shadow-lg" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                {RenderIcon()}
                <span className="font-semibold text-neutral-800 text-xl tracking-wide capitalize leading-tight">{title}</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <ShareIcon className="w-5 cursor-pointer" onClick={handleCopyLink} />
                <button onClick={handleDeleteClick} className="cursor-pointer">
                  <DeleteIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            {description && <div className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</div>}
            <div className="pt-4">
              {type === "youtube" && (
                <iframe
                  className="youtube-player"
                  src={link.replace("watch", "embed").replace("?v=", "/").split("&")[0]}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
              {type === "twitter" && (
                <div className="twitter-embed-container">
                  <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")} />
                  </blockquote>
                </div>
              )}
              {type === "reddit" && (
                <div className="reddit-embed-container">
                  <blockquote className="reddit-embed-bq" data-embed-height="316">
                    <a href={link}>{link}</a>
                  </blockquote>
                </div>
              )}
              {type === "link" && (
                <div className="border border-neutral-700 rounded-xl p-2">
                  <a target="_blank" href={link} className="text-blue-500 hover:underline break-all line-clamp-2 text-sm" rel="noopener noreferrer">
                    {link}
                  </a>
                </div>
              )}
            </div>
            {showToast && (
              <Toast
                message="Link copied to your clipboard!"
                duration={3000}
                onClose={() => setShowToast(false)}
              />
            )}
          </div>
        )}
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      </>
    );
  }
);