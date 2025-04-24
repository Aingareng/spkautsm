#!/usr/bin/env bash
# scripts/mkfeature.sh
# Cara pakai: ./scripts/mkfeature.sh product

set -euo pipefail

if [ -z "${1-}" ]; then
  echo "❌  Masukkan nama fitur (huruf kecil, tanpa spasi)."
  echo "   Contoh: ./scripts/mkfeature.sh product"
  exit 1
fi

FEATURE_NAME="$(tr '[:upper:]' '[:lower:]' <<< "$1")"
BASE="src/features/$FEATURE_NAME"

for dir in services components store hooks types utils; do
  mkdir -p "$BASE/$dir"
  touch "$BASE/$dir/.gitkeep"
done

echo "✅  Fitur '$FEATURE_NAME' berhasil dibuat di $BASE"
