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
  const productsFile = path.join(__dirname, '..', 'client', 'src', 'lib', 'products.ts');
  const updateLogFile = path.join(__dirname, '..', 'update-log.txt');
  const missingImagesFile = path.join(__dirname, '..', 'missing-images.txt');

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
    const scrapedProducts = [];

    // The site might render products in a grid. Based on the screenshot, they are in cards.
    // Let's look for images that are likely product images
    $('img').each((i, el) => {
        const imgUrl = $(el).attr('src');
        if (!imgUrl) return;

        // Find the text near the image
        const parent = $(el).closest('div');
        const container = $(el).closest('a, .card, .product-item, .item');
        
        let name = '';
        if (container.length) {
            name = container.find('h4, .name, .title').text().trim();
        }
        
        if (!name && parent.length) {
            name = parent.text().trim().split('\n')[0].trim();
        }

        if (name && name.length > 2 && name.length < 100 && imgUrl) {
            let fullUrl = imgUrl.startsWith('http') ? imgUrl : new URL(imgUrl, url).href;
            if (!scrapedProducts.find(p => p.name === name)) {
                scrapedProducts.push({ name, imgUrl: fullUrl });
            }
        }
    });

    console.log(`Found ${scrapedProducts.length} candidate products on page`);

    const downloaded = [];
    for (const product of scrapedProducts) {
      try {
        const safeName = product.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileName = `${safeName}.jpg`;
        const filePath = path.join(imgDir, fileName);

        const response = await axios({
          url: product.imgUrl,
          method: 'GET',
          responseType: 'stream',
          timeout: 10000
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
        // Skip errors
      }
    }

    let productsContent = fs.readFileSync(productsFile, 'utf8');
    let log = 'Update Log:\n';
    let missing = 'Missing Images:\n';

    const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '').trim();

    // Use a simpler matching strategy
    const lines = productsContent.split('\n');
    let updatedContent = '';
    let currentProductName = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const nameMatch = line.match(/\"name\": \"(.*?)\"/);
        if (nameMatch) {
            currentProductName = nameMatch[1];
        }

        const imgMatch = line.match(/\"imageUrl\": \"(.*?)\"/);
        if (imgMatch && currentProductName) {
            const match = downloaded.find(s => {
                const sNorm = normalize(s.originalName);
                const pNorm = normalize(currentProductName);
                return sNorm.includes(pNorm) || pNorm.includes(sNorm);
            });

            if (match) {
                updatedContent += line.replace(/\"imageUrl\": \".*?\"/, `\"imageUrl\": \"${match.localPath}\"`) + '\n';
                log += `Updated: ${currentProductName} with ${match.localPath}\n`;
                currentProductName = ''; // Reset after update
                continue;
            } else {
                missing += `${currentProductName}\n`;
            }
        }
        updatedContent += line + '\n';
    }

    fs.writeFileSync(productsFile, updatedContent.trim() + '\n');
    fs.writeFileSync(updateLogFile, log);
    fs.writeFileSync(missingImagesFile, missing);
    console.log('Update completed.');

  } catch (err) {
    console.error(`Scraping failed: ${err.message}`);
  }
}

scrapeAndDownload();
