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

  const [post, setPost] = useState<null | RecordModel>(null);
  const [author, setAuthor] = useState<null | (RecordModel & {
    username: string;
    name?: string;
    avatar?: string;
  })>(null);

  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [hiddenReplies, setHiddenReplies] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!URLid || typeof URLid !== "string") return;

    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const now = new Date().toISOString();
        const records = await pb.collection("posts").getFullList({
          filter: `uid = "${URLid}" && postType = "news" && (isPublished = true || (scheduledPublish <= "${now}" && scheduledPublish != ""))`,
          limit: 1,
        });

        if (!isMounted) return;

        if (records.length === 0) {
          setError("News post not found or not yet published");
          setPost(null);
          setAuthor(null);
          setComments([]);
          return;
        }

        const fetchedPost = records[0];
        setPost(fetchedPost);

        try {
          const fetchedAuthor = await pb.collection("users").getOne(fetchedPost.author, {
            fields: "id,username,name,avatar"
          });

          setAuthor({
            id: fetchedAuthor.id,
            username: fetchedAuthor.username,
            name: fetchedAuthor.name,
            avatar: fetchedAuthor.avatar,
            collectionId: fetchedAuthor.collectionId || "users",
            collectionName: fetchedAuthor.collectionName || "users",
          });
        } catch (err) {
          console.log("Couldn't fetch author details, using minimal info");
          setAuthor({
            id: fetchedPost.author,
            username: "Anonymous",
            name: "Anonymous",
            avatar: "",
            collectionId: "",
            collectionName: "",
          });
        }

        const commentRecords = await pb.collection("comments").getFullList({
          filter: `post = "${fetchedPost.id}"`,
          sort: "created",
          expand: "author",
        });

        const commentsData: CommentType[] = commentRecords.map(record => ({
          id: record.id,
          parent: (record as any).parentId || null,
          content: record.content,
          replies: [],
          expand: record.expand,
        }));

        const commentsWithReplies = buildCommentsTree(commentsData);
        setComments(commentsWithReplies);

      } catch (err) {
        if (isMounted) {
          setError("Failed to load news post");
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
      abortController.abort();
    };
  }, [URLid]);

  const buildCommentsTree = (flatComments: CommentType[]) => {
    const map = new Map<string, CommentType>();
    const roots: CommentType[] = [];

    flatComments.forEach(c => {
      c.replies = [];
      map.set(c.id, c);
    });

    flatComments.forEach(c => {
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
    setHiddenReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  async function postComment() {
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

      const commentRecords = await pb.collection("comments").getFullList({
        filter: `post = "${post!.id}"`,
        sort: "created",
        expand: "author",
      });

      const commentsData: CommentType[] = commentRecords.map(record => ({
        id: record.id,
        parent: (record as any).parentId || null,
        content: record.content,
        replies: [],
        expand: record.expand,
      }));

      const updatedComments = buildCommentsTree(commentsData);
      setComments(updatedComments);

    } catch (err) {
      alert("Failed to post comment");
    }
  }

  const renderComments = (commentsList: CommentType[]) => {
    return commentsList.map(comment => (
      <div key={comment.id} className="pl-4 border-l-2 border-gray-300 mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold">
            <a
              href={`/user/${comment.expand?.author?.username || "#"}`}
              className="text-blue-600 hover:underline"
            >
              {comment.expand?.author?.username || "Unknown"}
            </a>
          </span>
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
              onChange={e => setNewComment(e.target.value)}
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
        {comment.replies.length > 0 && !hiddenReplies[comment.id] && (
          <div className="mt-2">{renderComments(comment.replies)}</div>
        )}
      </div>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>News post not found.</p>;

  return (
    <div className="min-h-[80vh] max-w-4xl mx-auto p-5 flex flex-col mt-24 bg-white shadow-lg rounded-lg">
      <div className="mb-4 border-b pb-2">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-600">Created: {new Date(post.created).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600">
          Author:{" "}
          <a
            href={`/user/${author?.username}`}
            className="text-blue-600 hover:underline"
          >
            {author?.username || "Unknown"}
          </a>
        </p>
      </div>

      <div className="prose max-w-none mb-6 break-words whitespace-pre-wrap">
        {post.content}
      </div>

      {/* Slider if you want to show gallery (like blog) */}
      {post.gallery && Array.isArray(post.gallery) && post.gallery.length > 0 && (
        <SlickSlider images={post.gallery} />
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {renderComments(comments)}

        <div className="mt-6">
          <textarea
            rows={4}
            className="w-full p-2 border rounded"
            placeholder="Write a comment..."
            value={replyTo ? newComment : newComment}
            onChange={e => setNewComment(e.target.value)}
          />

          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={postComment}
          >
            Post Comment
          </button>

          {replyTo && (
            <button
              className="ml-3 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={() => {
                setReplyTo(null);
                setNewComment("");
              }}
            >
              Cancel Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPostPage;
