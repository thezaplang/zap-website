#!/usr/bin/env bash

set -euo pipefail

REPO="${ZAP_REPO:-thezaplang/zap}"
API_URL="https://api.github.com/repos/${REPO}/releases/latest"
ASSET_REGEX="${ZAP_ASSET_REGEX:-zap-.*-linux-x86_64\\.tar\\.gz}"

if [ -t 1 ]; then
  C_RESET=$'\033[0m'
  C_BOLD=$'\033[1m'
  C_GREEN=$'\033[32m'
  C_YELLOW=$'\033[33m'
  C_BLUE=$'\033[34m'
  C_RED=$'\033[31m'
else
  C_RESET=''
  C_BOLD=''
  C_GREEN=''
  C_YELLOW=''
  C_BLUE=''
  C_RED=''
fi

info() {
  printf '%s[info]%s %s\n' "$C_BLUE" "$C_RESET" "$1"
}

success() {
  printf '%s[ok]%s %s\n' "$C_GREEN" "$C_RESET" "$1"
}

warn() {
  printf '%s[warn]%s %s\n' "$C_YELLOW" "$C_RESET" "$1"
}

die() {
  printf '%s[error]%s %s\n' "$C_RED" "$C_RESET" "$1" >&2
  exit 1
}

fetch_to_stdout() {
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$1"
    return 0
  fi

  if command -v wget >/dev/null 2>&1; then
    wget -qO- "$1"
    return 0
  fi

  die "curl or wget is required"
}

download_file() {
  local url=$1
  local output=$2

  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$url" -o "$output"
    return 0
  fi

  if command -v wget >/dev/null 2>&1; then
    wget -qO "$output" "$url"
    return 0
  fi

  die "curl or wget is required"
}

json_get_tag() {
  sed -n 's/.*"tag_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1
}

json_get_asset_url() {
  grep -Eo '"browser_download_url"[[:space:]]*:[[:space:]]*"[^"]+"' |
    sed 's/.*"browser_download_url"[[:space:]]*:[[:space:]]*"\([^"]*\)"/\1/' |
    grep -E "$ASSET_REGEX" |
    head -n 1
}

TMP_DIR=$(mktemp -d)
ARCHIVE_PATH="$TMP_DIR/zap-release.tar.gz"
EXTRACT_DIR="$TMP_DIR/unpack"

cleanup() {
  rm -rf "$TMP_DIR"
}

trap cleanup EXIT

info "Fetching latest release metadata from ${REPO}"
RELEASE_JSON=$(fetch_to_stdout "$API_URL") || die "Failed to fetch release metadata"

TAG_NAME=$(printf '%s\n' "$RELEASE_JSON" | json_get_tag)
[ -n "$TAG_NAME" ] || die "Could not determine latest release tag"

ASSET_URL=$(printf '%s\n' "$RELEASE_JSON" | json_get_asset_url)
[ -n "$ASSET_URL" ] || die "Could not find a matching linux x86_64 release asset"

info "Latest release: ${C_BOLD}${TAG_NAME}${C_RESET}"
info "Downloading asset"
download_file "$ASSET_URL" "$ARCHIVE_PATH" || die "Failed to download release asset"

mkdir -p "$EXTRACT_DIR"
tar -xzf "$ARCHIVE_PATH" -C "$EXTRACT_DIR" || die "Failed to extract release archive"

if [ -x "$EXTRACT_DIR/install.sh" ]; then
  INSTALL_DIR="$EXTRACT_DIR"
elif [ -f "$EXTRACT_DIR/install.sh" ]; then
  chmod +x "$EXTRACT_DIR/install.sh"
  INSTALL_DIR="$EXTRACT_DIR"
else
  INSTALL_DIR=$(find "$EXTRACT_DIR" -mindepth 1 -maxdepth 2 -type f -name install.sh -print -quit)
  [ -n "$INSTALL_DIR" ] || die "install.sh was not found in the release archive"
  INSTALL_DIR=$(dirname "$INSTALL_DIR")
  chmod +x "$INSTALL_DIR/install.sh"
fi

success "Downloaded and extracted ${TAG_NAME}"
info "Running bundled installer"
cd "$INSTALL_DIR"

if [ ! -t 0 ] && [ -r /dev/tty ]; then
  exec </dev/tty
fi

exec ./install.sh "$@"
