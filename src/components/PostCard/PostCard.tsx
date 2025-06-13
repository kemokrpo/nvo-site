import React from "react";
import Link from "next/link";
import SlickSlider from "@/components/SlickSlider/SlickSlider";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090");

interface PostCardProps {
  id: string;
  uid: string;
  title: string;
  images: string[];
  linkPrefix: string; // "/blog" or "/news"
}

const PostCard: React.FC<PostCardProps> = ({ id, uid, title, images, linkPrefix }) => {
  const displayImages = images.length === 0 
    ? ["/img/NeretvaRiver.jpg"] 
    : images.map((img) => {
        const baseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";
        return `${baseUrl}/api/files/posts/${id}/${img}`;
      });

  return (
    <Link
      href={`${linkPrefix}/post/${uid}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Title */}
      <div className="p-4 text-center bg-main-100">
        <h2 className="text-lg font-semibold text-main-700 truncate">{title}</h2>
      </div>

      {/* Image Section */}
      <div className="relative w-full p-4">
        <div className="relative w-full rounded-md overflow-hidden" style={{ paddingTop: "56.25%" /* 16:9 ratio */ }}>
          {displayImages.length === 1 ? (
            <img
              src={displayImages[0]}
              alt={title}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full rounded-lg">
              <SlickSlider
                images={displayImages}
                options={{ showArrows: false, showDots: false, autoplay: true, autoplayInterval: 4000 }}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
