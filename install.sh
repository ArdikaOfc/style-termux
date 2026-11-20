#!/data/data/com.termux/files/usr/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/config.js"

pkg install -y figlet ruby neofetch
gem install lolcat --no-document

read_config_val() {
  local key="$1"
  local default_val="$2"
  local raw=""

  if [ -f "$CONFIG_FILE" ]; then
    raw="$(grep -E "^[[:space:]]*${key}[[:space:]]*:" "$CONFIG_FILE" | head -n 1 | sed -E "s/^[[:space:]]*${key}[[:space:]]*:[[:space:]]*//; s/[[:space:]]*,?[[:space:]]*(\/\/.*)?$//")"
    raw="${raw#\"}"
    raw="${raw%\"}"
    raw="${raw#\'}"
    raw="${raw%\'}"
  fi

  if [ -z "$raw" ]; then
    printf "%s" "$default_val"
  else
    printf "%s" "$raw"
  fi
}

BANNER_NAME="$(read_config_val "bannerName" "ARDIKA OFFICIAL")"
FONT_NAME="$(read_config_val "font" "slant")"
GREETING_TEXT="$(read_config_val "greeting" "Welcome back, Boss!")"
SEPARATOR_TEXT="$(read_config_val "separator" "========================================")"
SHOW_SYS_INFO="$(read_config_val "showSystemInfo" "true")"
PROMPT_USER="$(read_config_val "promptUser" "ArdikaOfc")"
MOTD_PATH="$(read_config_val "motdPath" "${PREFIX:-/data/data/com.termux/files/usr}/etc/motd")"
BASHRC_PATH="$(read_config_val "bashrcPath" "${HOME:-/data/data/com.termux/files/home}/.bashrc")"

SAFE_FONT="$(printf "%s" "$FONT_NAME" | tr -cd 'a-zA-Z0-9_-')"
[ -z "$SAFE_FONT" ] && SAFE_FONT="slant"

rm -f "$MOTD_PATH"
rm -f "${HOME:-/data/data/com.termux/files/home}/.rf-ardikaofc.txt"
mkdir -p "$(dirname "$BASHRC_PATH")"
touch "$BASHRC_PATH"

START_MARKER="# >>> ARDIKAOFC-TERMUX START >>>"
END_MARKER="# <<< ARDIKAOFC-TERMUX END <<<"

if grep -qF "$START_MARKER" "$BASHRC_PATH" && grep -qF "$END_MARKER" "$BASHRC_PATH"; then
  TMP_FILE="$(mktemp)"
  awk -v s="$START_MARKER" -v e="$END_MARKER" '
    $0 == s { skip = 1; next }
    $0 == e { skip = 0; next }
    !skip { print }
  ' "$BASHRC_PATH" > "$TMP_FILE"
  mv "$TMP_FILE" "$BASHRC_PATH"
fi

{
  echo ""
  echo "$START_MARKER"
  echo "clear"
  printf 'figlet -f %s %q | lolcat\n' "$SAFE_FONT" "$BANNER_NAME"
  if [ -n "$SEPARATOR_TEXT" ]; then
    printf 'echo %q | lolcat\n' "$SEPARATOR_TEXT"
  fi
  if [ -n "$GREETING_TEXT" ]; then
    printf 'echo %q | lolcat\n' "  $GREETING_TEXT"
  fi
  if [ -n "$SEPARATOR_TEXT" ]; then
    printf 'echo %q | lolcat\n' "$SEPARATOR_TEXT"
  fi
  if [ "$SHOW_SYS_INFO" = "true" ]; then
    echo 'if command -v neofetch >/dev/null 2>&1; then neofetch; fi'
  fi
  if [ -n "$PROMPT_USER" ]; then
    printf "PS1='\\\\[\\\\e[1;32m\\\\]┌─[\\\\[\\\\e[1;36m\\\\]%s\\\\[\\\\e[1;32m\\\\]]─[\\\\[\\\\e[1;33m\\\\]\\\\w\\\\[\\\\e[1;32m\\\\]]\\\\n└──╼ \\\\[\\\\e[1;35m\\\\]$\\\\[\\\\e[0m\\\\] '\n" "$PROMPT_USER"
  fi
  echo "$END_MARKER"
} >> "$BASHRC_PATH"

echo "Banner Termux berhasil dipasang! Jalankan: source ~/.bashrc"
