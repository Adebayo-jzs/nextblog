export default async function sitemap() {
  const baseUrl = 'https://blog.theebayo.name.ng';
  const posts = await getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    ...postUrls,
  ];
}