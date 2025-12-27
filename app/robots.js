export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      allow: '/post/slug',
      disallow: '/admin/',
    },
    sitemap: 'https://blog.theebayo.name.ng/sitemap.xml',
  }
}