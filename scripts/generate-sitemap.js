import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { Readable } from "stream";
import { generateSitemapUrls } from "../src/components/seo/utils/sitemap.js";
import { sitemapConfig } from "../src/config/seo/sitemap-config.js";

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: sitemapConfig.hostname });
  const urls = generateSitemapUrls();

  urls.forEach((url) => sitemap.write(url));
  sitemap.end();

  const data = await streamToPromise(Readable.from([sitemap]));
  createWriteStream("./public/sitemap.xml").write(data.toString());
}

generateSitemap().catch(console.error);
