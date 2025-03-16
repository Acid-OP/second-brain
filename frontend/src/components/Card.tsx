import React, { useEffect, useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { RedditIcon } from "../icons/RedditIcon";
import { Linkicon } from "../icons/Linkicon";
import { DeleteComp } from "./DeleteComponent";
import { Toast } from "./Toastcomponent";
import "./youtube.css"; // Import YouTube CSS
import "./twitter.css"; // Import Twitter CSS
import "./reddit.css"; // Import Reddit CSS

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "reddit" | "link";
  _id: string;
  description?: string;
  className?: string;
}

export function Card({ title, link, type, _id, description, className }: CardProps) {
  const [showToast, setShowToast] = useState(false);

  const getRedditEmbedData = (url: string) => {
    const urlObj = new URL(url);
    const subreddit = urlObj.pathname.split("/")[2];
    return { subreddit };
  };

  const { subreddit } = type === "reddit" ? getRedditEmbedData(link) : { subreddit: "" };

  useEffect(() => {
    if (type === "reddit") {
      const script = document.createElement("script");
      script.src = "//embed.redditmedia.com/widgets/platform.js";
      script.async = true;
      script.onload = () => {
        window.dispatchEvent(new Event("resize"));
        console.log("Reddit script loaded!");
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        console.log("Twitter script loaded!");
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type, link]);

  const RenderIcon = () => {
    switch (type) {
      case "youtube":
        return <YoutubeIcon className="w-6" />;
      case "twitter":
        return <TwitterIcon className="w-6" />;
      case "reddit":
        return <RedditIcon className="w-6" />;
      case "link":
        return <Linkicon className="w-6" />;
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setShowToast(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={`${className} p-4 bg-white rounded-md border-gray-200 max-w-72 min-h-48 min-w-72 sm:w-full md:w-1/2 lg:w-1/3`}>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          {RenderIcon()}
          <span className="font-semibold text-neutral-800 text-xl tracking-wide capitalize leading-tight">
            {title}
          </span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <ShareIcon
            className="w-5 cursor-pointer"
            onClick={handleCopyLink}
          />
          <DeleteComp _id={_id} />
        </div>
      </div>

      {/* Display Description if Available */}
      {description && (
        <div className="mt-2 text-sm text-gray-600 line-clamp-2">
          {description}
        </div>
      )}

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
          ></iframe>
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
              <a href={`https://www.reddit.com/r/${subreddit}`}>{subreddit}</a>
            </blockquote>
          </div>
        )}
        {type === "link" && (
          <div className="border border-neutral-700 rounded-xl p-2">
            <a
              target="_blank"
              href={link}
              className="text-blue-500 hover:underline break-all line-clamp-2 text-sm"
              rel="noopener noreferrer"
            >
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
  );
}