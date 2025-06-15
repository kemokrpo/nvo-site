import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import PostCard from "@/components/PostCard/PostCard";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090");

interface Post {
  id: string;
  uid: string;
  title: string;
  isPublished: boolean;
  postType: string;
  created: string;
  scheduledPublish?: string;
  images?: string[]; // Add images field for PostCard compatibility
}

const NewsIndexPage = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let isMounted = true;
  const abortController = new AbortController();

  const fetchPosts = debounce(async () => {
    try {
      const now = new Date().toISOString(); // Current timestamp
      const result = await pb.collection("posts").getFullList<Post>({
        filter: `postType = "news" && (isPublished = true || scheduledPublish != "")`,
        sort: "-created",
        signal: abortController.signal,
      });

      if (isMounted) {
        const validPosts = result.filter((post) => {
          const scheduledTime = post.scheduledPublish?.replace(" ", "T");
          return post.isPublished || (scheduledTime && new Date(scheduledTime) <= new Date(now));
        });

        const postsWithImages = validPosts.map((post) => {
          let images: string[] = [];
          if ("images" in post && Array.isArray(post.images)) {
            images = post.images;
          }
          return { ...post, images };
        });

        setPosts(postsWithImages);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load news posts", error);
        }
      } else {
        console.error("Failed to load news posts", error);
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  }, 200);

  fetchPosts();

  return () => {
    isMounted = false;
    abortController.abort();
    fetchPosts.cancel();
  };
}, []);


  function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    const wrapped = (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
    wrapped.cancel = () => clearTimeout(timeout);
    return wrapped;
  }

  if (loading) return <p>Loading news...</p>;
  if (!posts) return <p>News not found</p>;

  const user = pb.authStore.record;
  const canCreateNews = isLoggedIn && user?.role === "pr";

  return (
    <div className="min-h-[80vh] max-w-6xl mx-auto p-5 flex flex-col mt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-main-700">News</h1>
        {canCreateNews && (
          <button
            onClick={() => router.push("/news/create")}
            className="px-5 py-2 rounded-md text-white bg-main-700 hover:bg-main-600 transition-colors"
          >
            Create News Post
          </button>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No news posts found.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              uid={post.uid}
              title={post.title}
              images={post.images || []}
              linkPrefix="/news"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsIndexPage;
