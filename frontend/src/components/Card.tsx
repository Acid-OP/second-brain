import { useEffect } from "react";
import "./youtube.css";
import { ShareIcon } from "../icons/ShareIcon";
interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "reddit";
}

export function Card({ title, link, type }: CardProps) {
  const getRedditEmbedData = (url: string) => {
    const urlObj = new URL(url);
    const subreddit = urlObj.pathname.split("/")[2];
    return { subreddit};
  };

  const { subreddit } = getRedditEmbedData(link);

  useEffect(() => {
    if (type === "reddit") {
      const script = document.createElement("script");
      script.src = "//embed.redditmedia.com/widgets/platform.js";
      script.async = true;
      script.onload = () => {
        // Force re-initialization of embeds after the script is loaded
        window.dispatchEvent(new Event('resize'));
        console.log("Reddit script loaded!");
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type]);

  return (
    <div>
    <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 min-h-48 min-w-72">
      <div className="flex justify-between items-center pr-2">
      <span className="font-semibold text-neutral-800 text-xl tracking-wide capitalize leading-tight">{title}</span>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <ShareIcon />
      </a>
      </div>
      <div className="pt-4">
        {type === "youtube" && (
            <iframe className= "youtube-player"  src={link.replace("watch","embed").replace("?v=","/").split("&")[0]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> 
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")} />
          </blockquote>
        )}
         {type === "reddit" && (
        <div className="border border-neurtal-700 rounded-xl">
            <blockquote className="reddit-embed-bq" data-embed-height="316">
              <a href={link}>{link}</a>
              <a href={`https://www.reddit.com/r/${subreddit}`}>{subreddit}</a>
            </blockquote>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
