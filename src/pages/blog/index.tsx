import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

type UserProfile = {
  username: string;
  email: string;
  role: { id: number; name: string };
  firstName: string;
  lastName: string;
  profilePicture: { url: string } | null;
  phoneNumber: string;
  dateOfBirth: string;
  bio: string;
};

type Post = {
  id: number;
  Title: string;
  createdAt: string;
};

const BlogPage = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [canCreatePost, setCanCreatePost] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]); // State for posts
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    // Fetch user role and posts
    const fetchUserRoleAndPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // Fetch user data with populated role
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/users/me?populate[role]=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = userResponse.data;
        setUserData(userData);

        // Set permissions based on role
        if (userData.role.id === 1 || userData.role.id === 3 || userData.role.id === 4 || userData.role.id === 5) {
          setCanCreatePost(true);
        }

        // Fetch posts
        const postsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/posts`
        );
        setPosts(postsResponse.data.data); // Store fetched posts in state

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    if (isClient) {
      fetchUserRoleAndPosts();
    }
  }, [isClient]);

  if (loading) return <p>Loading...</p>; // Show loading state

  if (!userData) return <p>Loading user data...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-dt-dark">Blog</h1>
      <div>
        <p className="text-lg dark:text-dt-dark">
          Welcome {userData.firstName} {userData.lastName}!
        </p>

        {/* Show create button if the user has the right role */}
        {canCreatePost && (
          <button
            onClick={() => router.push("/blog/create")}
            className="btn mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Create Blog Post
          </button>
        )}

        {/* Display list of posts */}
        <div className="mt-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="mb-4">
                <h2 className="text-xl font-semibold text-dt-light dark:text-dt-dark">{post.Title}</h2>
                <p className="text-sm text-dt-light dark:text-dt-dark">
                  Posted on {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
