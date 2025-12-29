export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      allow: '/posts',
      allow: '/posts/slug',
      disallow: '/admin/',
    },
    sitemap: 'https://blog.theebayo.name.ng/sitemap.xml',
  }
}