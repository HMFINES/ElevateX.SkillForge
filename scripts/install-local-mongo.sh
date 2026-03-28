#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RUNTIME_DIR="$ROOT_DIR/.local-runtime"
DOWNLOAD_DIR="$RUNTIME_DIR/downloads"
VERSION="${MONGODB_VERSION:-8.0.6}"
ARCHIVE="mongodb-macos-arm64-$VERSION.tgz"
URL="https://fastdl.mongodb.org/osx/$ARCHIVE"
INSTALL_DIR="$RUNTIME_DIR/mongodb-$VERSION"
ARCHIVE_PATH="$DOWNLOAD_DIR/$ARCHIVE"

mkdir -p "$DOWNLOAD_DIR"

if [[ -x "$INSTALL_DIR/bin/mongod" ]]; then
  echo "MongoDB $VERSION is already installed at $INSTALL_DIR"
  exit 0
fi

echo "Downloading MongoDB $VERSION..."
curl -L "$URL" -o "$ARCHIVE_PATH"

echo "Extracting MongoDB $VERSION..."
tar -xzf "$ARCHIVE_PATH" -C "$RUNTIME_DIR"

EXTRACTED_DIR_NAME="$(tar -tzf "$ARCHIVE_PATH" | head -n 1 | cut -d/ -f1)"
EXTRACTED_DIR="$RUNTIME_DIR/$EXTRACTED_DIR_NAME"

if [[ -z "$EXTRACTED_DIR_NAME" || ! -d "$EXTRACTED_DIR" ]]; then
  echo "Expected extracted directory $EXTRACTED_DIR was not found"
  exit 1
fi

mv "$EXTRACTED_DIR" "$INSTALL_DIR"
echo "MongoDB installed at $INSTALL_DIR"
