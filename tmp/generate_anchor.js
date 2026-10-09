const { execSync } = require('child_process');
const fs = require('fs');

const cmd = [
  'convert',
  '-size 1920x1080 xc:"#241C18"',
  '-fill "#1A1512" -draw "roundrectangle 30,30 1890,1050 24,24"',
  '-stroke "#E2B072" -strokewidth 3 -fill none -draw "roundrectangle 44,44 1876,1036 22,22"',
  '-stroke "#C59B63" -strokewidth 1.5 -fill none -draw "roundrectangle 58,58 1862,1022 18,18"',
  '-stroke none',
  '-fill "#DECAC0" -pointsize 18 -gravity northwest -annotate +140+90 "HERHORIZON - BEDSIDE EMERGENCY RESCUE"',
  '-fill "#E2B072" -pointsize 18 -gravity northeast -annotate +140+90 "PART 02 - HORIZONTAL EMERGENCY ANCHOR CARD"',
  '-fill "#FAF4EB" -pointsize 54 -gravity northwest -annotate +140+160 "The 2 A.M."',
  '-fill "#E2B072" -pointsize 64 -gravity northwest -annotate +140+230 "Emergency Anchor Card"',
  '-fill "#CDBFB5" -pointsize 20 -gravity northwest -annotate +140+320 "For the sudden waking hours when the phantom courtroom convenes."',
  '-fill "#BD7469" -draw "roundrectangle 140,380 490,432 26,26"',
  '-fill "#FFFFFF" -pointsize 16 -gravity northwest -annotate +165+397 "HORIZONTAL BEDSIDE CARD (16:9)"',
  '-fill "#2A211C" -stroke "#E2B072" -strokewidth 2 -draw "roundrectangle 880,150 1780,930 20,20"',
  '-stroke none',
  '-fill "#FAF4EB" -pointsize 22 -gravity northwest -annotate +920+200 "The Courtroom in Your Head Has No Jurisdiction"',
  '-fill "#E2B072" -pointsize 18 -gravity northwest -annotate +920+290 "1. PALM TO STERNUM - RESET BREATH"',
  '-fill "#DEC9BE" -pointsize 16 -gravity northwest -annotate +920+325 "Drop shoulders. Place warm hand on chest. Exhale longer than you inhale."',
  '-fill "#E2B072" -pointsize 18 -gravity northwest -annotate +920+430 "2. NO DEFENSE REQUIRED IN THE DARK"',
  '-fill "#DEC9BE" -pointsize 16 -gravity northwest -annotate +920+465 "You owe no answers tonight. Repeat: Nothing is being decided right now."',
  '-fill "#E2B072" -pointsize 18 -gravity northwest -annotate +920+570 "3. DISMISS THE COURTROOM HEARING"',
  '-fill "#DEC9BE" -pointsize 16 -gravity northwest -annotate +920+605 "The verdict was already sealed the day you chose peace. Close your eyes."',
  '-fill "#A8968C" -pointsize 15 -gravity northwest -annotate +1100+740 "Keep within reach of your pillow"',
  '-fill "#8C7B71" -pointsize 15 -gravity southwest -annotate +140+70 "herhorizon.store - Complimentary Digital Tool - 1920 x 1080 px"',
  'public/images/cover-free-anchor-card.png'
].join(' ');

console.log('Rendering...');
execSync(cmd);
fs.copyFileSync('public/images/cover-free-anchor-card.png', 'public/cover-free-anchor-card.png');
console.log('Done generating cover-free-anchor-card.png!');
