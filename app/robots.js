export default function robots() {
  const baseUrl = 'https://theebayo.name.ng';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      allow:'/posts/',
      disallow: '/admin/', 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
