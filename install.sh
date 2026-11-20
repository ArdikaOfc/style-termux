#!/data/data/com.termux/files/usr/bin/bash
set -e

pkg update -y && pkg upgrade -y
pkg install -y figlet ruby neofetch nodejs-lts
gem install lolcat --no-document

node banner.js
source "$HOME/.bashrc" || true
