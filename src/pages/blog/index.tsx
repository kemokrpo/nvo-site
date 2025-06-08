import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const POSTS_PER_PAGE = 3; // For testing purposes

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
        const response = await pb.collection("blogs").getList(currentPage, POSTS_PER_PAGE);
        setPosts(response.items);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <button
          onClick={() => router.push("/blog/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-md bg-main-700"
        >
          Create Post
        </button>
      </div>

      {/* Posts Section */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push(`/blog/${post.id}`)}
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 text-sm">{post.created.slice(0, 10)}</p>
            <p className="mt-2 text-gray-800 line-clamp-3">{post.content}</p>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No blog posts available. Be the first to{" "}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => router.push("/blog/create")}
            >
              create a post
            </span>
            !
          </p>
        )}
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {/* First Page Button */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-1 rounded bg-gray-200 text-black hover:bg-gray-300"
            >
              First Page
            </button>
          )}

          {/* Previous Page Button */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 rounded bg-gray-200 text-black hover:bg-gray-300"
            >
              Previous Page
            </button>
          )}

          {/* Page Number Buttons */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Page Button */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 rounded bg-gray-200 text-black hover:bg-gray-300"
            >
              Next Page
            </button>
          )}

          {/* Last Page Button */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-1 rounded bg-gray-200 text-black hover:bg-gray-300"
            >
              Last Page
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
