import { metaData } from "@/app/config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${metaData.baseUrl}/sitemap.xml`,
  };
}
