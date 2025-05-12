import { DOMAIN } from "@/lib/const";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/*"],
      },
    ],
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
