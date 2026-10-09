const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../public');
const imagesDir = path.resolve(publicDir, 'images');

console.log('Starting image optimization process...');

// Find all PNG and JPG files in public and public/images
function getImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getImages(fullPath));
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const allImages = getImages(publicDir);
console.log(`Found ${allImages.length} images to inspect.`);

// We only want to process unique basename targets or process each file
for (const imgPath of allImages) {
  const filename = path.basename(imgPath);
  // Skip small favicons unless needed
  if (filename.startsWith('favicon-16') || filename.startsWith('favicon-32')) continue;

  const stat = fs.statSync(imgPath);
  const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
  console.log(`Checking ${filename} (${sizeMB} MB)...`);

  // Max width depends on image type
  let maxWidth = 1400;
  let quality = 82;

  if (filename.includes('reset-guide') || filename.includes('roadmap') || filename.includes('selftrust') || filename.includes('traumabond') || filename.includes('mentalloop') || filename.includes('boundary') || filename.includes('joybank') || filename.includes('redflags') || filename.includes('homereclaim')) {
    maxWidth = 1400; // Book covers are portrait, 1400px width is super crisp (~1400x2000)
    quality = 82;
  } else if (filename.includes('anchor-card')) {
    maxWidth = 1600; // 16:9 card
    quality = 82;
  } else if (filename.includes('hero-mockup') || filename.includes('dual-mockup') || filename.includes('bonuses-mockup') || filename.includes('roadmap-mockup')) {
    maxWidth = 1600;
    quality = 82;
  } else if (filename.includes('author-portrait')) {
    maxWidth = 1000;
    quality = 82;
  } else if (filename.includes('badge') || filename.includes('logo') || filename.includes('seal')) {
    maxWidth = 800;
    quality = 88;
  }

  // 1. Generate WebP version next to it
  const webpPath = imgPath.replace(/\.(png|jpe?g)$/i, '.webp');
  try {
    // Only generate if not exists or original is newer
    execSync(`convert "${imgPath}" -resize "${maxWidth}x>" -quality ${quality} -define webp:method=6 "${webpPath}"`, { stdio: 'pipe' });
    const webpStat = fs.statSync(webpPath);
    console.log(`  -> Generated WebP: ${(webpStat.size / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error(`  Error creating webp for ${filename}:`, err.message);
  }

  // 2. If PNG is huge (> 500KB), optimize PNG in-place so older fallbacks and direct PNG requests are also super fast
  if (stat.size > 500 * 1024) {
    try {
      execSync(`convert "${imgPath}" -resize "${maxWidth}x>" -quality 85 "${imgPath}.tmp.png" && mv "${imgPath}.tmp.png" "${imgPath}"`, { stdio: 'pipe' });
      const newPngStat = fs.statSync(imgPath);
      console.log(`  -> Optimized PNG in-place: ${(newPngStat.size / (1024 * 1024)).toFixed(2)} MB`);
    } catch (err) {
      console.error(`  Error optimizing png for ${filename}:`, err.message);
    }
  }
}

console.log('Image optimization finished!');
