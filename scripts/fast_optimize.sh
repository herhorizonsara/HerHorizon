#!/bin/bash
set -e

echo "Starting high-speed parallel optimization..."

optimize_file() {
  local f="$1"
  local base=$(basename "$f")
  
  # Determine max width based on image role
  local maxw=1200
  local q=80
  
  if [[ "$base" == *"anchor-card"* ]]; then
    maxw=1440
    q=80
  elif [[ "$base" == *"hero-mockup"* ]] || [[ "$base" == *"dual-mockup"* ]] || [[ "$base" == *"bonuses-mockup"* ]]; then
    maxw=1440
    q=80
  elif [[ "$base" == *"portrait"* ]]; then
    maxw=800
    q=82
  elif [[ "$base" == *"badge"* ]] || [[ "$base" == *"seal"* ]] || [[ "$base" == *"logo"* ]]; then
    maxw=600
    q=85
  else
    maxw=1200
    q=80
  fi

  local webp="${f%.*}.webp"
  
  # 1. Create WebP if not already generated or if empty
  if [ ! -f "$webp" ] || [ ! -s "$webp" ]; then
    convert "$f" -resize "${maxw}x>" -quality "$q" -define webp:method=4 "$webp"
  fi

  # 2. Compress the PNG itself if larger than 600KB
  local size=$(stat -c%s "$f" 2>/dev/null || echo 0)
  if [ "$size" -gt 600000 ]; then
    convert "$f" -resize "${maxw}x>" -quality 82 "$f.tmp.png" && mv "$f.tmp.png" "$f"
  fi
}

export -f optimize_file

# Run across 4 parallel jobs
find public -type f \( -name "*.png" -o -name "*.jpg" \) ! -name "favicon-16*" ! -name "favicon-32*" | xargs -n 1 -P 4 -I {} bash -c 'optimize_file "$@"' _ {}

echo "Optimization complete!"
