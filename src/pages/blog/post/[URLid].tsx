import qs from "qs";
import Image from "next/image";

// Define the structure of the post data based on your Strapi model
type Post = {
  id: number;
  Title: string;
  Post: Array<{
    children: Array<{
      text: string;
    }>;
  }>;
  Images: Array<{ url: string }>;
  URLid: string;
  Author: {
    username: string;
  };
  createdAt: string;
};

async function fetchPost(URLid: string): Promise<Post | null> {
  const query = qs.stringify({
    filters: {
      URLid: URLid,
    },
    populate: "*", // Fetch all related fields
  });

  const postsPromise = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?${query}`);
  const response = await postsPromise.json();

  return response.data.length > 0 ? response.data[0] : null;
}

type Params = {
  URLid: string;
};

export async function getServerSideProps({ params }: { params: Params }) {
  const { URLid } = params;

  const post = await fetchPost(URLid);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}

type Props = {
  post: Post;
};

const PostPage = ({ post }: Props) => {
  if (!post) {
    return <div>Post not found!</div>;
  }

  const descriptionContent =
    post.Post?.map((block) => {
      if (block.children) {
        return block.children.map((child) => child.text).join(" ");
      }
      return "";
    }).join(" ") || "No content available.";

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-orange-400">{post.Title}</h1>
        <p className="text-sm text-gray-400 mt-2">
          Posted on {new Date(post.createdAt).toLocaleDateString()} by {post.Author.username}
        </p>
        <div className="flex items-center space-x-6 my-6">
          {post.Images.length > 0 && (
            <Image
              className="rounded-lg"
              src={`${process.env.NEXT_PUBLIC_API_URL2}${post.Images[0].url}`}
              alt={post.Title}
              width={128}
              height={128}
              objectFit="cover"
              unoptimized
            />
          )}
        </div>
        <p className="text-gray-300 text-sm mt-4">{descriptionContent}</p>
        {post.Images.length > 1 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {post.Images.slice(1).map((image, index) => (
              <Image
                key={index}
                src={`${process.env.NEXT_PUBLIC_API_URL2}${image.url}`}
                alt={`Image ${index + 1}`}
                width={300}
                height={200}
                className="rounded-lg"
                unoptimized
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
