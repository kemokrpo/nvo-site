import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";  // For generating unique IDs

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    post: "",
    images: [], // to store images
    URLid: "", // to store the generated URLid
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // Store the user ID
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data;
        setUserId(userData.id); // Set the user ID
      } catch (err) {
        setError("Error fetching user data.");
        console.error(err);
      }
    };

    fetchUser();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPostData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    // Validate title and post content
    if (!postData.title || !postData.post) {
      setError("Title and post content are required.");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      router.push("/login");
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Generate a unique URLid using uuid
      const URLid = uuidv4();  // UUID will ensure uniqueness across posts
  
      const formData = new FormData();
      formData.append("data[Title]", postData.title);
  
      // Ensure the post content has the correct structure (inline Text nodes only)
      const postContent = JSON.stringify([
        {
          type: "paragraph",  // Block type (could be 'paragraph', 'heading', etc.)
          children: [
            {
              type: "text",  // Inline node type should be 'text' for plain text
              text: postData.post,  // Your actual post content
            },
          ],
        },
      ]);
  
      formData.append("data[Post]", postContent);
      formData.append("data[URLid]", URLid);
      formData.append("data[Author]", userId || ""); // Attach the userId (current user)
  
      // Append images if there are any
      postData.images.forEach((image, index) => {
        formData.append(`files.Images`, image);
      });
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        setSuccess("Post created successfully!");
        router.push("/blog"); // Redirect after successful creation
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "An error occurred.");
      console.error("Error creating post:", err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create a New Post</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={postData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="post" className="block text-sm font-medium text-gray-700">
            Post Content
          </label>
          <textarea
            name="post"
            id="post"
            value={postData.post}
            onChange={handleInputChange}
            rows={5}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Upload Images (optional)
          </label>
          <input
            type="file"
            name="images"
            id="images"
            onChange={handleFileChange}
            multiple
            className="mt-1 block w-full text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
