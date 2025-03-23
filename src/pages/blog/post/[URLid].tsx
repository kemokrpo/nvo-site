import qs from "qs";
import Image from "next/image";
import { useRouter } from "next/router";


// Define the structure of the post data based on your Strapi model
type Post = {
  id: number;
  attributes: {
    Title: string;
    Post: Array<{
      type: string;
      children: Array<{
        text: string;
      }>;
    }>;
    Images: {
      data: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
    URLid: string;
    createdAt: string;
    Author: {
      data: {
        attributes: {
          username: string;
          profilePicture: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
};

async function fetchPost(id: number): Promise<Post | null> {
  const query = qs.stringify({
    filters: {
      id: id, // Filter by the ID field
    },
    populate: {
      Images: true, // Populate the Images field
      Author: {
        populate: ["profilePicture"], // Populate the Author and their profilePicture
      },
    },
  }
  
);

const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/posts?${query}`;
console.log("API URL:", apiUrl); // Log the full API URL

  try {
    const postsPromise = await fetch(apiUrl);

    if (!postsPromise.ok) {
      throw new Error(`HTTP error! Status: ${postsPromise.status}`);
    }

    const response = await postsPromise.json();
    console.log("API Response:", response); // Log the API response

    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

type Params = {
  id: string;
};

export async function getServerSideProps({ params }: { params: Params }) {
  const { id } = params;

  const post = await fetchPost(Number(id)); // Convert the ID to a number

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
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <div>Post not found!</div>;
  }

  // Construct image URLs
  const imageUrls = post.attributes.Images.data.map((image) => (
    `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.attributes.url}`
  ));

  // Construct post content
  const postContent = post.attributes.Post.map((block) => {
    if (block.children) {
      return block.children.map((child) => child.text).join(" ");
    }
    return "";
  }).join(" ");

  // Construct author data
  const author = post.attributes.Author.data.attributes;
  const profilePictureUrl = author.profilePicture.data
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${author.profilePicture.data.attributes.url}`
    : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Author Section */}
      <div className="flex items-center mb-6">
        {profilePictureUrl && (
          <div className="w-12 h-12 relative mr-4">
            <Image
              src={profilePictureUrl}
              alt={author.username}
              layout="fill"
              className="rounded-full"
              objectFit="cover"
              unoptimized // Use this if you encounter issues with image optimization
            />
          </div>
        )}
        <div>
          <p className="font-semibold text-lg">{author.username}</p>
          <p className="text-sm text-gray-500">
            Posted on {new Date(post.attributes.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{post.attributes.Title}</h1>

      {/* Post Content */}
      <div className="prose dark:prose-invert">
        <p>{postContent}</p>
      </div>

      {/* Images */}
      {imageUrls.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative h-64">
              <Image
                src={url}
                alt={`Post image ${index + 1}`}
                layout="fill"
                className="rounded-lg object-cover"
                unoptimized // Use this if you encounter issues with image optimization
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostPage;