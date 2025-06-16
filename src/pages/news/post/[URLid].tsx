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
  path?: string;
  replies: CommentType[];
  expand?: {
    author?: {
      username?: string;
    };
  };
};

const NewsPostPage = () => {
  const router = useRouter();
  const { URLid } = router.query;

  const [post, setPost] = useState<RecordModel | null>(null);

  const [author, setAuthor] = useState<null | (RecordModel & {
      username: string;
      name: string;
      avatar: string;
    })>(null);
    const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hiddenReplies, setHiddenReplies] = useState<Record<string, boolean>>({});

  useEffect(() => {
  if (!URLid || typeof URLid !== "string") return;

  let isMounted = true;

  const fetchPostData = async () => {
    try {
      setLoading(true);
      
      // Current UTC time as ISO string
      const now = new Date().toISOString();
      
      // Filter posts that are published and scheduledPublish <= now
      const records = await pb.collection("posts").getFullList({
        filter: `uid = "${URLid}" && postType = "news"`,
        limit: 1,
      });
      
      if (!isMounted) return;
      
      if (records.length === 0) {
        console.log("No valid post found for URLid:", URLid);
        router.push("/news");
        return;
      }
      
      const fetchedPost = records[0];
      if (fetchedPost.scheduledPublish) {
        const scheduledDate = new Date(fetchedPost.scheduledPublish.replace(" ", "T"));
        if (new Date(scheduledDate) > new Date(now)) {
          console.log("Post is scheduled for future publication:", fetchedPost.scheduledPublish);
          router.push("/news");
          return;
        }
      }
      
      if (isMounted) {
        setPost(fetchedPost);
        
        // Fetch author with fallback
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
        
        // Fetch comments for this post
        const commentRecords = await pb.collection("comments").getFullList({
          filter: `post = "${fetchedPost.id}"`,
          sort: "path", // Changed from "created" to match blog component
          expand: "author",
        });
        
        const transformedComments = commentRecords.map((record) => ({
          id: record.id,
          content: record.content,
          parent: record.parent || null,
          path: record.path,
          replies: [],
          expand: record.expand,
        }));
        
        setComments(buildCommentsTree(transformedComments));
      }
    } catch (err) {
      if (isMounted) {
        setError(err instanceof Error ? err.message : String(err));
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  fetchPostData();

  return () => {
    isMounted = false;
  };
}, [URLid]);



  const buildCommentsTree = (flatComments: CommentType[]): CommentType[] => {
    const map = new Map();
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

  const toggleReplies = (commentId: string) => {
    setHiddenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const postComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    const currentUser = pb.authStore.model;
    if (!currentUser) {
      alert("Please log in to comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = {
        content: newComment.trim(),
        author: currentUser.id,
        post: post?.id,
        parent: replyTo,
      };

      await pb.collection("comments").create(data);

      const commentRecords = await pb.collection("comments").getFullList({
        filter: `post = "${post?.id}"`,
        sort: "created",
        expand: "author",
      });

      const transformedComments = commentRecords.map((record) => ({
        id: record.id,
        content: record.content || "",
        parent: record.parent || null,
        path: record.path || "",
        replies: [],
        expand: {
          author: record.expand?.author
            ? { username: record.expand.author.username }
            : undefined,
        },
      }));

      setComments(buildCommentsTree(transformedComments));
      setNewComment("");
      setReplyTo(null);
    } catch {
      alert("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderComments = (commentsList: CommentType[]) =>
    commentsList.map((comment) => (
      <div key={comment.id} className="pl-4 border-l-2 border-gray-300 mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold">
            <a
              href={`/user/${comment.expand?.author?.username || "unknown"}`}
              className="text-main-700 hover:underline"
            >
              {comment.expand?.author?.username || "Unknown"}
            </a>
          </span>
          {comment.replies.length > 0 && (
            <button
              className="text-xs text-main-700 hover:underline"
              onClick={() => toggleReplies(comment.id)}
            >
              {hiddenReplies[comment.id] ? "Show Replies" : "Hide Replies"}
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
              disabled={isSubmitting}
              className="mt-1 px-3 py-1 bg-main-700 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={postComment}
            >
              {isSubmitting ? "Posting..." : "Post Reply"}
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
        {comment.replies.length > 0 && !hiddenReplies[comment.id] && (
          <div className="mt-2">{renderComments(comment.replies)}</div>
        )}
      </div>
    ));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>News post not found.</p>;

  return (
    <div className="min-h-[80vh] max-w-4xl mx-auto p-5 flex flex-col mt-24 mb-8 bg-gray-300 shadow-lg rounded-lg">
      <div className="mb-4 border-b pb-2">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-600">
          Created: {new Date(post.created).toLocaleDateString()}
        </p>
        {post.scheduledPublish && (
          <p className="text-sm text-gray-600">
            Published: {new Date(post.scheduledPublish).toLocaleDateString()}
          </p>
        )}
        <p className="text-sm text-gray-600">
          Author:{" "}
          <a
            href={`/user/${author?.username || "unknown"}`}
            className="text-main-700 hover:underline"
          >
            {author?.username || "Unknown"}
          </a>
        </p>
      </div>

      <div className="prose max-w-none mb-6 break-words whitespace-pre-wrap overflow-hidden">
        {typeof post.content === "string" ? (
          <p>{post.content}</p>
        ) : (
          <>{post.content?.body || ""}</>
        )}
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
              disabled={isSubmitting}
              className="mt-2 px-4 py-2 bg-main-700 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={postComment}
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        )}
        {renderComments(comments)}
      </div>
    </div>
  );
};

export default NewsPostPage;
