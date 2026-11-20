#!/data/data/com.termux/files/usr/bin/bash
set -e

pkg update -y && pkg upgrade -y
pkg install -y figlet ruby neofetch
gem install lolcat --no-document

rm -f "$PREFIX/etc/motd"

BASHRC="$HOME/.bashrc"
touch "$BASHRC"

sed -i '/# >>> ARDIKAOFC-TERMUX START >>>/,/# <<< ARDIKAOFC-TERMUX END <<</d' "$BASHRC"

cat << 'EOF' >> "$BASHRC"

# >>> ARDIKAOFC-TERMUX START >>>
clear
figlet -f slant "ARDIKA OFFICIAL" | lolcat
echo "========================================" | lolcat
echo "  Welcome back, Boss!" | lolcat
echo "========================================" | lolcat
if command -v neofetch >/dev/null 2>&1; then neofetch; fi
PS1='\[\e[1;32m\]┌─[\[\e[1;36m\]ArdikaOfc\[\e[1;32m\]]─[\[\e[1;33m\]\w\[\e[1;32m\]]\n└──╼ \[\e[1;35m\]$\[\e[0m\] '
# <<< ARDIKAOFC-TERMUX END <<<
EOF

echo "Banner Termux berhasil dipasang. Ketik: source ~/.bashrc"
