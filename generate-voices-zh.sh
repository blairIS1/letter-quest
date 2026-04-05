#!/bin/bash
# Generates Chinese MP3 voice lines from voices-zh.json
# Uses zh-CN-XiaoyiNeural (child-like Chinese voice)

DIR="public/audio"
JSON="voices-zh.json"
VOICE="zh-CN-XiaoyiNeural"
RATE="-5%"

if [ ! -f "$JSON" ]; then echo "❌ $JSON not found"; exit 1; fi
mkdir -p "$DIR"

echo "🎤 Chinese Voice: $VOICE | Rate: $RATE"

count=0
for key in $(jq -r 'keys[]' "$JSON"); do
  text=$(jq -r --arg k "$key" '.[$k]' "$JSON")
  out="$DIR/${key}.mp3"
  if [ -f "$out" ] && [ "$1" != "--force" ]; then
    echo "  ✅ $key (exists)"
  else
    echo "  🎙️ $key"
    edge-tts --voice "$VOICE" --rate="$RATE" --text "$text" --write-media "$out" 2>/dev/null
    count=$((count + 1))
  fi
done

echo ""
echo "Done! Generated $count Chinese voice files."
