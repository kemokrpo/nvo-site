export async function fetcher(url, option = {}) {
  let response;
  if (!option) {
    response = await fetch(url);
  } else {
    response = await fetch(url, option);
  }

  const data = await response.json();
  return data;
}

export function getStrapiURL(path) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
}
