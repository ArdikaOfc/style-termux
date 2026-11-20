import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import config from "./config.js";

const __filename = fileURLToPath(import.meta.url);

const START_MARKER = "# >>> ARDIKAOFC-TERMUX START >>>";
const END_MARKER = "# <<< ARDIKAOFC-TERMUX END <<<";

function shellEscape(value) {
  return `'${String(value).replace(/'/g, "'\\''")}'`;
}

export function removeDefaultMotd(motdPath = config.motdPath) {
  if (motdPath && fs.existsSync(motdPath)) {
    fs.rmSync(motdPath, { force: true });
  }
}

export function buildBannerBlock(cfg = config) {
  const bannerName = String(cfg.bannerName || "ARDIKA OFFICIAL");
  const safeFont =
    String(cfg.font || "slant").replace(/[^a-zA-Z0-9_-]/g, "") || "slant";
  const greeting = cfg.greeting !== undefined ? String(cfg.greeting) : "";
  const separator = cfg.separator !== undefined ? String(cfg.separator) : "";
  const showSystemInfo = Boolean(cfg.showSystemInfo);
  const promptUser = cfg.promptUser
    ? String(cfg.promptUser).replace(/'/g, "'\\''")
    : "";

  const lines = [
    "",
    START_MARKER,
    "clear",
    `figlet -f ${safeFont} ${shellEscape(bannerName)} | lolcat`,
  ];

  if (separator) {
    lines.push(`echo ${shellEscape(separator)} | lolcat`);
  }
  if (greeting) {
    lines.push(`echo ${shellEscape(`  ${greeting}`)} | lolcat`);
  }
  if (separator) {
    lines.push(`echo ${shellEscape(separator)} | lolcat`);
  }
  if (showSystemInfo) {
    lines.push("if command -v neofetch >/dev/null 2>&1; then neofetch; fi");
  }
  if (promptUser) {
    lines.push(
      `PS1='\\[\\e[1;32m\\]┌─[\\[\\e[1;36m\\]${promptUser}\\[\\e[1;32m\\]]─[\\[\\e[1;33m\\]\\w\\[\\e[1;32m\\]]\\n└──╼ \\[\\e[1;35m\\]$\\[\\e[0m\\] '`
    );
  }

  lines.push(END_MARKER, "");
  return lines.join("\n");
}

function stripExistingBlock(content) {
  const startIdx = content.indexOf(START_MARKER);
  const endIdx = content.indexOf(END_MARKER);

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = content.slice(0, startIdx).trimEnd();
    const after = content.slice(endIdx + END_MARKER.length).trimStart();
    return [before, after].filter(Boolean).join("\n\n");
  }
  return content.trimEnd();
}

export function applyBannerToShell(cfg = config) {
  removeDefaultMotd(cfg.motdPath);

  const bashrcPath =
    cfg.bashrcPath ||
    `${process.env.HOME || "/data/data/com.termux/files/home"}/.bashrc`;

  fs.mkdirSync(path.dirname(bashrcPath), { recursive: true });

  const current = fs.existsSync(bashrcPath)
    ? fs.readFileSync(bashrcPath, "utf8")
    : "";

  const cleaned = stripExistingBlock(current);
  const block = buildBannerBlock(cfg);
  const updated = cleaned ? `${cleaned}${block}` : `${block.trimStart()}`;

  fs.writeFileSync(bashrcPath, updated, "utf8");
}

export function removeBannerFromShell(cfg = config) {
  const bashrcPath =
    cfg.bashrcPath ||
    `${process.env.HOME || "/data/data/com.termux/files/home"}/.bashrc`;

  if (!fs.existsSync(bashrcPath)) return;

  const current = fs.readFileSync(bashrcPath, "utf8");
  const cleaned = stripExistingBlock(current);
  fs.writeFileSync(bashrcPath, cleaned ? `${cleaned}\n` : "", "utf8");
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === __filename;

if (isDirectRun) {
  if (process.argv.includes("--remove")) {
    removeBannerFromShell(config);
    console.log("Banner Termux berhasil dihapus dari .bashrc.");
  } else {
    applyBannerToShell(config);
    console.log("Banner Termux berhasil dipasang.");
  }
}
