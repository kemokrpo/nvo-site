import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import SlickSlider from "@/components/SlickSlider/SlickSlider";
import { RecordModel } from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090");

type CommentType = {
  id: string;
  content: string;
  parent?: string | null;
  path: string;
  replies: CommentType[];
  expand?: {
    author?: {
      username?: string;
    };
  };
};

const BlogPostPage = () => {
  const router = useRouter();
  const { URLid } = router.query;

  const [post, setPost] = useState<null | RecordModel>(null);
  const [author, setAuthor] = useState<null | (RecordModel & {
    username: string;
    name: string;
    avatar: string;
  })>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [hiddenBranches, setHiddenBranches] = useState<Record<string, boolean>>({});
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!URLid || typeof URLid !== "string") return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching blog posts:", await pb.collection("posts").getFullList({filter: `postType = "blog"`}));
        console.log("Fetching news posts:", await pb.collection("posts").getFullList({filter: `postType = "news"`}));
        // Fetch post
        const records = await pb.collection("posts").getFullList({
          filter: `uid = "${URLid}" && postType = "blog" && isPublished = true`,
          limit: 1,
        });

        if (!isMounted) return;

        if (records.length === 0) {
          setError("Post not found");
          setPost(null);
          setAuthor(null);
          setComments([]);
          router.push("/blog");
          return;
        }

        const fetchedPost = records[0];
        setPost(fetchedPost);

        // Fetch author
        try {
          const fetchedAuthor = await pb.collection("users").getOne(fetchedPost.author, {
            fields: "id,username,name,avatar",
          });

          setAuthor({
            id: fetchedAuthor.id,
            username: fetchedAuthor.username,
            name: fetchedAuthor.name,
            avatar: fetchedAuthor.avatar,
            collectionId: fetchedAuthor.collectionId || "users",
            collectionName: fetchedAuthor.collectionName || "users",
          });
        } catch {
          setAuthor({
            id: fetchedPost.author,
            username: "Anonymous",
            name: "Anonymous",
            avatar: "",
            collectionId: "",
            collectionName: "",
          });
        }

        // Fetch comments
        const commentRecords = await pb.collection("comments").getFullList({
          filter: `post = "${fetchedPost.id}"`,
          sort: "path",
          expand: "author",
        });

        const commentsData: CommentType[] = commentRecords.map((record) => ({
          id: record.id,
          parent: record.parent,
          path: record.path,
          content: record.content,
          replies: [],
          expand: record.expand,
        }));

        const commentsTree = buildCommentsTree(commentsData);
        setComments(commentsTree);
        setError(null);
      } catch {
        if (isMounted) {
          setError("Failed to load post and comments");
          setPost(null);
          setAuthor(null);
          setComments([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [URLid]);

  const buildCommentsTree = (flatComments: CommentType[]) => {
    const map = new Map<string, CommentType>();
    const roots: CommentType[] = [];

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

  const toggleBranch = (commentId: string) => {
    setHiddenBranches((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const postComment = async () => {
    if (!newComment.trim()) return;

    try {
      const currentUser = pb.authStore.model;
      if (!currentUser) {
        alert("Please log in to comment");
        return;
      }

      const data = {
        content: newComment.trim(),
        author: currentUser.id,
        post: post!.id,
        parent: replyTo,
      };

      await pb.collection("comments").create(data);

      setNewComment("");
      setReplyTo(null);

      // Reload comments after posting
      const commentRecords = await pb.collection("comments").getFullList({
        filter: `post = "${post!.id}"`,
        sort: "path",
        expand: "author",
      });

      const commentsData: CommentType[] = commentRecords.map((record) => ({
        id: record.id,
        parent: record.parent,
        path: record.path,
        content: record.content,
        replies: [],
        expand: record.expand,
      }));

      const updatedComments = buildCommentsTree(commentsData);
      setComments(updatedComments);
    } catch {
      alert("Failed to post comment");
    }
  };

  const renderComments = (commentsList: CommentType[]) => {
    return commentsList.map((comment) => (
      <div key={comment.id} className="pl-4 border-l-2 border-gray-300 mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold">
            <a
              href={`/user/${comment.expand?.author?.username || "#"}`}
              className="text-main-700 hover:underline"
            >
              {comment.expand?.author?.username || "Unknown"}
            </a>
          </span>
          {comment.replies.length > 0 && (
            <button
              className="text-xs text-main-700 hover:underline"
              onClick={() => toggleBranch(comment.id)}
            >
              {hiddenBranches[comment.id] ? "Show Replies" : "Hide Replies"}
            </button>
          )}
        </div>
        <div className="mb-2 whitespace-pre-wrap">{comment.content}</div>
        <button
          className="text-xs text-main-700 hover:underline mb-2"
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
        {!hiddenBranches[comment.id] && comment.replies.length > 0 && (
          <div className="mt-2">{renderComments(comment.replies)}</div>
        )}
      </div>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="min-h-[80vh] max-w-4xl mx-auto p-5 flex flex-col mt-24 bg-gray-300 shadow-lg rounded-lg mb-8">
      <div className="mb-4 border-b pb-2">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-600">Created: {new Date(post.created).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600">
          Author:{" "}
          <a href={`/user/${author?.username}`} className="text-main-700 hover:underline">
            {author?.username || "Unknown"}
          </a>
        </p>
      </div>

      <div className="prose max-w-none mb-6 break-words whitespace-pre-wrap overflow-hidden">
        {typeof post.content === "string" ? <p>{post.content}</p> : <>{post.content.body}</>}
      </div>

      {post.images?.length > 0 && (
        <div className="mt-6">
          <SlickSlider
            images={post.images.map((img: string) => pb.files.getURL(post, img))}
            options={{ showArrows: true, showDots: true }}
          />
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        {!replyTo && (
          <div className="mb-6">
            <textarea
              rows={4}
              className="w-full p-2 border rounded"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 bg-main-700 text-white rounded hover:bg-blue-700"
              onClick={postComment}
            >
              Post Comment
            </button>
          </div>
        )}
        {renderComments(comments)}
      </div>
    </div>
  );
};

export default BlogPostPage;
