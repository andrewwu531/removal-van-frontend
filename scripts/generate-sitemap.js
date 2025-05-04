import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { Readable } from "stream";

const services = [
  {
    url: "/",
    changefreq: "daily",
    priority: 1.0,
  },
  {
    url: "/services/removal",
    changefreq: "daily",
    priority: 0.8,
  },
  {
    url: "/services/house-renovation",
    changefreq: "daily",
    priority: 0.8,
  },
  {
    url: "/services/painting",
    changefreq: "daily",
    priority: 0.8,
  },
  {
    url: "/services/carpet-flooring",
    changefreq: "daily",
    priority: 0.8,
  },
  {
    url: "/services/bathroom-kitchen",
    changefreq: "daily",
    priority: 0.8,
  },
  {
    url: "/services/window-door",
    changefreq: "daily",
    priority: 0.8,
  },
  {
    url: "/services/solar-panels",
    changefreq: "daily",
    priority: 0.8,
  },
  {
    url: "/services/exterior-roofing",
    changefreq: "daily",
    priority: 0.8,
  },
  {
    url: "/services/commercial",
    changefreq: "daily",
    priority: 0.8,
  },
];

async function generateSitemap() {
  const stream = new SitemapStream({
    hostname: "https://trade-specialists.com",
  });

  return streamToPromise(Readable.from(services).pipe(stream)).then((data) =>
    data.toString()
  );
}

generateSitemap()
  .then((sitemap) => {
    createWriteStream("./public/sitemap.xml").write(sitemap);
    console.log("Sitemap generated successfully");
  })
  .catch((err) => {
    console.error("Error generating sitemap:", err);
  });
