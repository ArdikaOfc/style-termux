import fs from "node:fs";
import { execSync } from "node:child_process";
import config from "./config.js";

export function removeDefaultMotd(motdPath = config.motdPath) {
  if (fs.existsSync(motdPath)) {
    fs.rmSync(motdPath, { force: true });
  }
}

export function buildBannerBlock(cfg = config) {
  const safeName = String(cfg.bannerName || "TERMUX").replace(/"/g, '\\"');
  const safeFont = String(cfg.font || "slant").replace(/[^a-zA-Z0-9_-]/g, "");
  const safeGreeting = String(cfg.greeting || "").replace(/"/g, '\\"');
  const safeSep = String(cfg.separator || "").replace(/"/g, '\\"');
  const safePromptUser = String(cfg.promptUser || "user").replace(/'/g, "'\\''");

  const lines = [
    "",
    "# >>> ARDIKAOFC-TERMUX START >>>",
    "clear",
    `figlet -f ${safeFont} "${safeName}" | lolcat`,
  ];

  if (safeSep) {
    lines.push(`echo "${safeSep}" | lolcat`);
  }
  if (safeGreeting) {
    lines.push(`echo "  ${safeGreeting}" | lolcat`);
  }
  if (safeSep) {
    lines.push(`echo "${safeSep}" | lolcat`);
  }
  if (cfg.showSystemInfo) {
    lines.push("if command -v neofetch >/dev/null 2>&1; then neofetch; fi");
  }
  if (safePromptUser) {
    lines.push(
      `PS1='\\[\\e[1;32m\\]┌─[\\[\\e[1;36m\\]${safePromptUser}\\[\\e[1;32m\\]]─[\\[\\e[1;33m\\]\\w\\[\\e[1;32m\\]]\\n└──╼ \\[\\e[1;35m\\]$\\[\\e[0m\\] '`
    );
  }

  lines.push("# <<< ARDIKAOFC-TERMUX END <<<", "");
  return lines.join("\n");
}

export function applyBannerToShell(cfg = config) {
  removeDefaultMotd(cfg.motdPath);

  const startMarker = "# >>> ARDIKAOFC-TERMUX START >>>";
  const endMarker = "# <<< ARDIKAOFC-TERMUX END <<<";
  const block = buildBannerBlock(cfg);

  let current = fs.existsSync(cfg.bashrcPath)
    ? fs.readFileSync(cfg.bashrcPath, "utf8")
    : "";

  const startIdx = current.indexOf(startMarker);
  const endIdx = current.indexOf(endMarker);

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = current.slice(0, startIdx).trimEnd();
    const after = current.slice(endIdx + endMarker.length).trimStart();
    current = [before, block.trim(), after].filter(Boolean).join("\n\n") + "\n";
  } else {
    current = `${current.trimEnd()}${block}`;
  }

  fs.writeFileSync(cfg.bashrcPath, current, "utf8");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  applyBannerToShell(config);
  console.log("Banner Termux berhasil dipasang.");
}
