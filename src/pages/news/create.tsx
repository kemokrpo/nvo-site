import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090");

const NewsCreatePage = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [scheduledPublish, setScheduledPublish] = useState<Date | null>(null);
  const user = pb.authStore.record;

  // Redirect to news page if not logged in or not "pr" role
  useEffect(() => {
    if (typeof window !== "undefined" && (!isLoggedIn || user?.role !== "pr")) {
      router.push("/news");
    }
  }, [isLoggedIn, user, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 10);
      setImages(selectedFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !body.trim()) {
      setError("Title and body are required.");
      return;
    }

    if (!scheduledPublish) {
      setError("You must select a scheduled publication date.");
      return;
    }

    setLoading(true);

    try {
      const currentUser = pb.authStore.model;
      if (!currentUser) throw new Error("User not authenticated.");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", currentUser.id);
      formData.append("uid", uuidv4());
      formData.append("postType", "news");
      formData.append("isPublished", "false");
      formData.append("scheduledPublish", scheduledPublish.toISOString());
      formData.append("content", JSON.stringify({ body }));

      images.forEach((file) => {
        formData.append("images", file);
      });

      const record = await pb.collection("posts").create(formData);
      router.push(`/news/post/${record.uid}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create news post.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn || user?.role !== "pr") {
    return null; // Avoid rendering the form until authentication is verified
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-300 rounded-md shadow-md mt-24 mb-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-main-700">Create News Article</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-main-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-semibold mb-1">
            Content
          </label>
          <textarea
            id="body"
            rows={8}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-main-700 resize-y"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-semibold mb-1">
            Images (up to 10)
          </label>
          <input
            id="images"
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600"
          />
        </div>

        <div>
          <label htmlFor="scheduledPublish" className="block text-sm font-semibold mb-1">
            Scheduled Publication Date
          </label>
          <DateTimePicker
            onChange={setScheduledPublish}
            value={scheduledPublish}
            minDate={new Date()}
            disableClock
            required
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-main-700 text-white font-semibold rounded-md hover:bg-main-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Scheduling..." : "Schedule News"}
        </button>
      </form>
    </div>
  );
};

export default NewsCreatePage;
