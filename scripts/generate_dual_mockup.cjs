const { execSync } = require('child_process');
const fs = require('fs');

console.log('Compositing free-guide-dual-mockup.png with vertical guide and horizontal card...');

// 1. Create a 1920x1080 background
// 2. Resize vertical guide to ~560x792
// 3. Resize horizontal card to ~840x472
// 4. Composite both on a luxury warm studio backdrop with soft shadows and gold badges

const script = `
convert -size 1920x1080 radial-gradient:"#FFFFFF-#ECE4DA" /tmp/mockup_bg.png

# Resize vertical reset guide
convert public/images/cover-free-reset-guide.png -resize 540x764 /tmp/guide_small.png

# Add soft drop shadow to vertical guide
convert /tmp/guide_small.png \\( +clone -background black -shadow 60x20+15+25 \\) +swap -background none -layers merge +repage /tmp/guide_shadow.png

# Resize horizontal anchor card
convert public/images/cover-free-anchor-card.png -resize 920x517 /tmp/card_small.png

# Add soft drop shadow to horizontal card
convert /tmp/card_small.png \\( +clone -background black -shadow 70x25+10+30 \\) +swap -background none -layers merge +repage /tmp/card_shadow.png

# Composite on background:
# Vertical Guide placed on left/mid (x: 180, y: 150)
# Horizontal Card placed in foreground on right/lower (x: 820, y: 340)
composite -geometry +180+150 /tmp/guide_shadow.png /tmp/mockup_bg.png /tmp/step1.png
composite -geometry +820+340 /tmp/card_shadow.png /tmp/step1.png /tmp/step2.png

# Annotate badges
convert /tmp/step2.png \\
  -fill "#2D2622" -pointsize 18 -gravity northwest -annotate +260+80 "PART 01 • 72-HOUR RESET GUIDE (PORTRAIT)" \\
  -fill "#BD7469" -pointsize 18 -gravity northeast -annotate +180+80 "PART 02 • 2 A.M. EMERGENCY ANCHOR CARD (HORIZONTAL)" \\
  public/images/free-guide-dual-mockup.png

cp public/images/free-guide-dual-mockup.png public/free-guide-dual-mockup.png
`;

execSync(script);
console.log('Done generating free-guide-dual-mockup.png!');
