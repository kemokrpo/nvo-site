import { fetcher } from "./api";

export function getStrapiMedia(url) {
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
}
