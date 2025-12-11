import { writeFileSync } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

// Your website URL
const hostname = 'https://www.yourwebsite.com';

// List of all routes/pages
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/news', changefreq: 'daily', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.5 },
  // Add more pages as needed
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname });
  const xml = await streamToPromise(
    links.reduce((stream, link) => stream.write(link) && stream, sitemap)
  );
  writeFileSync(resolve('./dist/sitemap.xml'), xml.toString());
  console.log('Sitemap generated successfully!');
}

generateSitemap();
