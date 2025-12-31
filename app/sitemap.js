import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://blog.theebayo.name.ng",
      lastModified: new Date(),
    },
  ];
}