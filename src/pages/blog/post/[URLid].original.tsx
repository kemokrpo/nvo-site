import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import SlickSlider from "@/components/SlickSlider/SlickSlider";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090");

const BlogPostPage = () => {
  const router = useRouter();
  const { URLid } = router.query;

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [hiddenReplies, setHiddenReplies] = useState({});

  useEffect(() => {
    if (!URLid || typeof URLid !== "string") return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const records = await pb.collection("posts").getFullList({
          filter: `uid = "${URLid}" && postType = "blog" && isPublished = true`,
          limit: 1,
        });

        if (records.length === 0) {
          setError("Post not found");
          setPost(null);
          setAuthor(null);
          setComments([]);
          return;
        }

        const fetchedPost = records[0];
        setPost(fetchedPost);

        const fetchedAuthor = await pb.collection("users").getOne(fetchedPost.author);
        setAuthor(fetchedAuthor);

        const commentRecords = await pb.collection("comments").getFullList({
          filter: `post = "${fetchedPost.id}"`,
          sort: "created",
          expand: "author",
        });

        const commentsWithReplies = buildCommentsTree(commentRecords);
        setComments(commentsWithReplies);
      } catch (err) {
        setError("Failed to load data");
        setPost(null);
        setAuthor(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [URLid]);

  const buildCommentsTree = (flatComments) => {
    const map = new Map();
    const roots = [];

    flatComments.forEach((c) => {
      c.replies = [];
      map.set(c.id, c);
    });

    flatComments.forEach((c) => {
      if (c.parent) {
        const parent = map.get(c.parent);
        if (parent) parent.replies.push(c);
      } else {
        roots.push(c);
      }
    });

    return roots;
  };

  const toggleReplies = (commentId) => {
    setHiddenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderComments = (commentsList) => {
    return commentsList.map((comment) => (
      <div key={comment.id} className="pl-4 border-l-2 border-gray-300 mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold">{comment.expand.author?.username || "Unknown"}</span>
          {comment.replies.length > 0 && (
            <button
              className="text-xs text-blue-600 hover:underline"
              onClick={() => toggleReplies(comment.id)}
            >
              {hiddenReplies[comment.id] ? "Show Replies" : "Hide Replies"}
            </button>
          )}
        </div>
        <div className="mb-2 whitespace-pre-wrap">{comment.content}</div>
        <button
          className="text-xs text-blue-600 hover:underline mb-2"
          onClick={() => setReplyTo(comment.id)}
        >
          Reply
        </button>

        {replyTo === comment.id && (
          <div className="mb-4">
            <textarea
              rows={3}
              className="w-full p-2 border rounded"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your reply..."
            />
            <button
              className="mt-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={postComment}
            >
              Post Reply
            </button>
            <button
              className="ml-2 px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={() => {
                setReplyTo(null);
                setNewComment("");
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {!hiddenReplies[comment.id] &&
          comment.replies &&
          comment.replies.length > 0 &&
          renderComments(comment.replies)}
      </div>
    ));
  };

  const postComment = async () => {
    // Your post comment logic
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="min-h-[80vh] max-w-4xl mx-auto p-5 flex flex-col mt-24 bg-white shadow-lg rounded-lg">
      <div className="mb-4 border-b pb-2">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-600">Created: {new Date(post.created).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600">Author: {author?.username || "Unknown"}</p>
      </div>

      <div className="prose max-w-none mb-6 break-words whitespace-pre-wrap overflow-hidden">
        {typeof post.content === "string" ? <p>{post.content}</p> : <>{post.content.body}</>}
      </div>

      {post.images?.length > 0 && (
        <div className="mt-6">
          <SlickSlider
            images={post.images.map((img) => pb.files.getURL(post, img))}
            options={{ showArrows: true, showDots: true }}
          />
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        {renderComments(comments)}
      </div>
    </div>
  );
};

export default BlogPostPage;
