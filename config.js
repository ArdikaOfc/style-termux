export const config = {
  bannerName: "ARDIKA OFFICIAL",
  font: "slant",
  greeting: "Welcome back, Boss!",
  separator: "========================================",
  showSystemInfo: true,
  promptUser: "ArdikaOfc",
  motdPath: `${process.env.PREFIX || "/data/data/com.termux/files/usr"}/etc/motd`,
  bashrcPath: `${process.env.HOME || "/data/data/com.termux/files/home"}/.bashrc`,
};

export default config;
