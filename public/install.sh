#!/usr/bin/env sh

set -eu

REPO="thezaplang/zapup"
API_URL="https://api.github.com/repos/${REPO}/releases/latest"

info() {
  printf '%s\n' "info: $1"
}

die() {
  printf '%s\n' "error: $1" >&2
  exit 1
}

command -v curl >/dev/null 2>&1 || die "curl is required to install Zap"

tmp_dir=$(mktemp -d) || die "could not create a temporary directory"
zapup_path="$tmp_dir/zapup"

cleanup() {
  rm -rf "$tmp_dir"
}

trap cleanup EXIT HUP INT TERM

info "Fetching the latest zapup release"
release_json=$(curl --proto '=https' --tlsv1.2 -sSfL "$API_URL") || die "could not fetch release metadata"

tag_name=$(printf '%s\n' "$release_json" |
  sed -n 's/.*"tag_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' |
  head -n 1)
asset_url=$(printf '%s\n' "$release_json" |
  sed -n 's/.*"browser_download_url"[[:space:]]*:[[:space:]]*"\([^"]*\/zapup\)".*/\1/p' |
  head -n 1)

[ -n "$tag_name" ] || die "could not determine the latest release version"
[ -n "$asset_url" ] || die "the latest release does not contain a zapup binary"

info "Downloading zapup ${tag_name}"
curl -4 --proto '=https' --tlsv1.2 -fL --progress-bar "$asset_url" -o "$zapup_path" || die "could not download zapup"
chmod +x "$zapup_path" || die "could not make zapup executable"
info "Downloaded zapup ${tag_name}"

if [ ! -t 0 ] && [ -r /dev/tty ]; then
  exec < /dev/tty
fi

info "Starting zapup install"
exec "$zapup_path" install "$@"
