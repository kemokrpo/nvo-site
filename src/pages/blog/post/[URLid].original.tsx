import qs from "qs";
import Image from "next/image";
import { useRouter } from "next/router";

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

async function fetchPost(URLid: string): Promise<Post | null> {
  const query = qs.stringify({
    filters: {
      URLid: URLid, // Filter by URLid instead of id
    },
    populate: {
      Images: true,
      Author: {
        populate: ["profilePicture"],
      },
    },
  });
  console.log(`${process.env.NEXT_PUBLIC_STRAPI_URL_API}/posts?${query}`);
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL_API}/posts?${query}`;
  console.log("API URL:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    return data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function getServerSideProps({ params }: { params: { URLid: string } }) {
  const post = await fetchPost(params.URLid);

  if (!post) {
    return { notFound: true };
  }

  return { props: { post } };
}

// ... rest of your component code remains the same ...

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