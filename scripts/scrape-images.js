import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function scrapeAndDownload() {
  const url = 'https://www.w-o-s.co.za/store/packaging-material';
  const imgDir = path.join(__dirname, '..', 'public', 'images', 'packaging-material');
  
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
  }

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);
    const products = [];

    // Improved selectors based on the provided content
    $('div.card, div.product-item, div.item').each((i, el) => {
      const name = $(el).find('h4, .product-name, .name').text().trim();
      let imgUrl = $(el).find('img').attr('src');
      
      if (!name) return;
      
      if (imgUrl && !imgUrl.startsWith('http')) {
        imgUrl = new URL(imgUrl, url).href;
      }
      
      if (imgUrl) {
        products.push({ name, imgUrl });
      }
    });

    // If still 0, try a more generic approach searching for images next to text
    if (products.length === 0) {
      $('img').each((i, el) => {
        const imgUrl = $(el).attr('src');
        const parent = $(el).closest('div');
        const name = parent.find('h4, .name, a').text().trim();
        
        if (name && imgUrl) {
          let fullUrl = imgUrl.startsWith('http') ? imgUrl : new URL(imgUrl, url).href;
          products.push({ name, imgUrl: fullUrl });
        }
      });
    }

    console.log(`Found ${products.length} products on page`);

    const downloaded = [];
    for (const product of products) {
      try {
        const safeName = product.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileName = `${safeName}.jpg`;
        const filePath = path.join(imgDir, fileName);

        const response = await axios({
          url: product.imgUrl,
          method: 'GET',
          responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });

        downloaded.push({
          originalName: product.name,
          localPath: `/images/packaging-material/${fileName}`
        });
        console.log(`Downloaded: ${product.name}`);
      } catch (err) {
        console.error(`Failed to download ${product.name}: ${err.message}`);
      }
    }

    fs.writeFileSync(path.join(__dirname, '..', 'scraped-data.json'), JSON.stringify(downloaded, null, 2));
  } catch (err) {
    console.error(`Scraping failed: ${err.message}`);
  }
}

scrapeAndDownload();
