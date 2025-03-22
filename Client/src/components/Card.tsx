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
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showDeleteToast, setShowDeleteToast] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
        case "youtube":
          return <YoutubeIcon className="w-4 sm:w-5 md:w-6 lg:w-6" />;
        case "twitter":
          return <TwitterIcon className="w-4 sm:w-5 md:w-6 lg:w-6" />;
        case "reddit":
          return <RedditIcon className="w-4 sm:w-5 md:w-6 lg:w-6" />;
        case "link":
          return <Linkicon className="w-4 sm:w-5 md:w-6 lg:w-6" />;
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
          setShowDeleteToast(true);
          setIsModalOpen(false);
          setTimeout(() => {
            setIsDeleted(true);
            if (onDelete) onDelete(_id);
          }, 5);
        }
      } catch (e) {
        console.error("Delete failed:", e);
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
            className={`${className || ""} p-2 sm:p-3 md:p-3 lg:p-4 bg-white rounded-md border-gray-200 max-w-[18rem] sm:max-w-64 md:max-w-72 lg:max-w-72 min-h-32 sm:min-h-40 md:min-h-44 lg:min-h-48 min-w-[18rem] sm:min-w-64 md:min-w-72 lg:min-w-72 w-full sm:w-full md:w-1/2 lg:w-1/3 transition-all duration-500 ${
              isHighlighted ? "bg-purple-100 border-2 border-purple-500 shadow-lg" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-2 lg:gap-2">
                {RenderIcon()}
                <span className="font-semibold text-neutral-800 text-base sm:text-lg md:text-lg lg:text-xl tracking-wide capitalize leading-tight">
                  {title}
                </span>
              </div>
              <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-2 lg:gap-2">
                <ShareIcon className="w-4 sm:w-4 md:w-5 lg:w-5 cursor-pointer" onClick={handleCopyLink} />
                <button onClick={handleDeleteClick} className="cursor-pointer">
                  <DeleteIcon className="w-4 sm:w-4 md:w-5 lg:w-5 h-4 sm:h-4 md:h-5 lg:h-5" />
                </button>
              </div>
            </div>
            {description && (
              <div className="mt-2 sm:mt-2 md:mt-3 lg:mt-3 text-xs sm:text-xs md:text-sm lg:text-sm text-gray-600 line-clamp-3 overflow-hidden">
                {description}
              </div>
            )}
            <div className="mt-2 sm:mt-3 md:mt-3 lg:mt-4">
              {type === "youtube" && (
                <iframe
                  className="youtube-player w-full h-24 sm:h-28 md:h-32 lg:h-36"
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
                <div className="bg-gray-50 rounded-md p-1 sm:p-1 md:p-2 lg:p-2 border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-200">
                  <a
                    target="_blank"
                    href={link}
                    className="flex items-center gap-1 sm:gap-1 md:gap-2 lg:gap-2 text-[#7950f2] font-medium hover:bg-gray-100 rounded-md p-1 sm:p-1 md:p-2 lg:p-2 break-all line-clamp-2 text-xs sm:text-xs md:text-sm lg:text-sm"
                    rel="noopener noreferrer"
                  >
                    <Linkicon className="w-3 sm:w-4 md:w-5 lg:w-5 h-3 sm:h-4 md:h-5 lg:h-5 flex-shrink-0" />
                    <span>{link}</span>
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