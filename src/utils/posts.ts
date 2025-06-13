// utils/posts.ts
import PocketBase from "pocketbase";

const pb = new PocketBase("YOUR_POCKETBASE_URL");

export const fetchPostsByType = async (postType: "blog" | "news") => {
  const nowISO = new Date().toISOString();

  let filter = `postType = "${postType}" && isPublished = true`;

  if (postType === "news") {
    // Show only news where scheduledPublish is <= now OR no scheduledPublish
    filter += ` && (scheduledPublish <= "${nowISO}" || scheduledPublish = null)`;
  }

  const records = await pb.collection("posts").getFullList({
    filter,
    sort: "-created",
  });

  return records;
};
