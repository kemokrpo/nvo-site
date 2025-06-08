import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/AuthContext";

const CreatePostPage = ({ postType }: { postType: "blog" | "news" }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  // Redirect to home if the user is not logged in
  // Inside CreatePostPage
useEffect(() => {
  if (isLoggedIn === false) {
    router.push("/");
  }
}, [isLoggedIn, router]);

if (isLoggedIn === null) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <p>Loading...</p>
    </div>
  );
}

if (!isLoggedIn) {
  return null;
}



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(filesArray.slice(0, 10)); // Limit to 10 files
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

      // Get the `pocketbase_auth` from localStorage
      const authData = JSON.parse(localStorage.getItem("pocketbase_auth") || "{}");

      // Extract user ID from the stored auth data
      const authorId = authData?.record?.id;

      if (!authorId) {
        throw new Error("User ID is missing from localStorage. Ensure the user is logged in.");
      }

      // Prepare the post data
      const postData = {
        title: formData.title,
        author: authorId, // Relating the post to the logged-in user
        uid: uuidv4(), // Generate unique UID for URL
        postType,
        isPublished: true, // Automatically mark as published
        content: formData.content,
      };

      // Create the post
      const createdPost = await pb.collection("posts").create(postData);

      // Upload images if any
      if (imageFiles.length > 0) {
        const formDataUpload = new FormData();
        imageFiles.forEach((file) => formDataUpload.append("images", file));

        await pb.collection("posts").update(createdPost.id, formDataUpload);
      }

      // Redirect after successful creation
      router.push(`/blog/${createdPost.id}`);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {postType === "blog" ? "Create Blog Post" : "Create News Post"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Images */}
        <div>
          <label htmlFor="images" className="block text-lg font-medium">
            Upload Images (up to 10)
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
          {imageFiles.length > 0 && (
            <p className="text-sm text-gray-600">
              Selected {imageFiles.length} file(s)
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-lg font-medium">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border p-2 rounded h-40 resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
