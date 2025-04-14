import { sitemapConfig } from "../../../config/seo/sitemap-config";

export const generateSitemapUrls = () => {
  const urls = [
    {
      url: "/",
      changefreq: "weekly",
      priority: 1.0,
    },
  ];

  sitemapConfig.services.forEach((service) => {
    urls.push({
      url: `/${service.name}`,
      changefreq: service.changefreq,
      priority: service.priority,
    });
  });

  return urls;
};
