import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";  // For generating unique IDs

// Define the type for postData
type PostData = {
  title: string;
  post: string;
  images: File[]; // Explicitly define images as File[]
  URLid: string;
};

const CreatePost = () => {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    post: "",
    images: [], // Initialize as an empty array of File objects
    URLid: "",
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
      setPostData((prev) => ({ ...prev, images: Array.from(e.target.files) })); // Correctly typed
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
      // Step 1: Upload images (if any)
      let imageIds: number[] = [];
      if (postData.images.length > 5) {
        setError("You can upload a maximum of 5 images.");
        return;
      }
      if (postData.images.length > 0) {
        const uploadFormData = new FormData();
        postData.images.forEach((image) => {
          uploadFormData.append("files", image); // Use "files" for Strapi's upload endpoint
        });
      
        const uploadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/upload`,
          uploadFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Extract image IDs from the upload response
        imageIds = uploadResponse.data.map((image: any) => image.id);
      }
  
      // Step 2: Create the post with the image IDs
      const URLid = uuidv4(); // Generate a unique URLid
  
      const postResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/posts`,
        {
          data: {
            Title: postData.title,
            Post: JSON.stringify([
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    text: postData.post,
                  },
                ],
              },
            ]),
            URLid,
            Author: userId || "", // Attach the userId (current user)
            Images: imageIds, // Associate uploaded image IDs with the post
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (postResponse.status === 200 || postResponse.status === 201) {
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
    <div className="container mx-auto p-4 h-[65vh] translate-y-[4rem]">
      <h1 className="text-xl font-bold mb-6 dark:text-dt-dark">Create a New Post</h1> {/* Reduced margin-bottom */}
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-dt-dark">
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
          <label htmlFor="post" className="block text-sm font-medium text-gray-700 dark:text-dt-dark">
            Post Content
          </label>
          <textarea
            name="post"
            id="post"
            value={postData.post}
            onChange={handleInputChange}
            rows={10}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
          />
        </div>
  
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 dark:text-dt-dark">
            Upload Images (optional, max 5)
          </label>
          <input
            type="file"
            name="images"
            id="images"
            onChange={handleFileChange}
            multiple
            className="mt-1 block w-full text-sm dark:text-dt-dark"
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
  
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default CreatePost;