<div align="center">
  <img src="https://github.com/ArdikaOfc.png" width="130" style="border-radius: 50%;" alt="ArdikaOfc Profile" />
  <h1>Termux Aesthetic Banner</h1>
  <p>Skrip otomatis untuk mempercantik tampilan awal (MOTD) dan prompt Termux menggunakan Figlet, Lolcat, dan Neofetch secara aman tanpa merusak lingkungan Node.js maupun bot WhatsApp.</p>

  <p>
    <a href="https://github.com/ArdikaOfc">
      <img src="https://img.shields.io/badge/Author-ArdikaOfc-blue?style=for-the-badge&logo=github" alt="Author" />
    </a>
    <img src="https://img.shields.io/badge/Platform-Termux%20Android-success?style=for-the-badge&logo=android" alt="Platform" />
    <img src="https://img.shields.io/badge/Shell-Bash%20%26%20ESM-339933?style=for-the-badge&logo=gnubash" alt="Shell" />
  </p>
</div>

---

## ✨ Fitur Utama

- **Menghapus MOTD Bawaan:** Membersihkan teks sambutan standar Termux secara otomatis.
- **Banner Nama Gradasi:** Menampilkan teks *ASCII art* kustom dengan efek warna pelangi menggunakan `figlet` dan `lolcat`.
- **Informasi Sistem:** Menampilkan logo OS dan spesifikasi perangkat lewat `neofetch`.
- **Custom Shell Prompt (`PS1`):** Mengubah tampilan `~ $` standar menjadi prompt modern berwarna lengkap dengan nama pengguna dan direktori aktif.
- **Aman untuk Bot WhatsApp & Node.js:** Proses instalasi banner tidak memaksa menimpa paket `nodejs` secara sembarangan sehingga aman untuk menjalankan script bot WhatsApp.
- **Konfigurasi Terpusat:** Pengaturan nama, font, sapaan, dan prompt cukup diubah melalui `config.js`.

---

## 🚀 Cara Pemasangan di Termux

Jalankan perintah berikut secara berurutan di aplikasi Termux:

```bash
pkg update && pkg upgrade -y
pkg install git -y
git clone [https://github.com/ArdikaOfc/style-termux.git](https://github.com/ArdikaOfc/style-termux.git)
cd style-termux
chmod +x install.sh
bash install.sh
source ~/.bashrc
```

---

## 🛠️ Panduan Menjalankan Bot WhatsApp Setelah Pasang Banner

Agar menjalankan bot WhatsApp (Node.js) lancar tanpa kendala, pastikan paket `libicu` dan `nodejs` sinkron dengan repositori Termux:

1. **Masuk ke direktori proyek bot WhatsApp kamu**, misalnya:
   ```bash
   cd ~/nama-folder-bot
   ```
2. **Jalankan bot seperti biasa:**
   ```bash
   npm start
   ```
   *(Atau sesuai perintah start pada `package.json` bot kamu, misalnya `node index.js`).*

### 🔧 Solusi Jika Muncul Error `CANNOT LINK EXECUTABLE "node": library "libicui18n.so..." not found`

Error ini muncul jika versi library `libicu` pada sistem Termux belum sinkron dengan biner `node` setelah update paket. Perbaiki dengan langkah berikut:

1. Ganti mirror repositori ke server yang terbaru:
   ```bash
   termux-change-repo
   ```
   Pilih **Single mirror**, lalu pilih mirror aktif (misalnya *Albatross*, *Grimler*, atau *Tsinghua*).
2. Sinkronkan ulang paket `libicu` dan Node.js:
   ```bash
   pkg update -y && pkg upgrade -y
   pkg reinstall -y libicu nodejs-lts
   ```
3. Cek apakah `node` sudah normal:
   ```bash
   node -v
   ```

---

## ⚙️ Kustomisasi Tampilan

Untuk mengubah nama banner, gaya font, atau teks sapaan:

1. Buka file konfigurasi:
   ```bash
   cd ~/style-termux
   nano config.js
   ```
2. Sesuaikan nilai pada objek `config`:
   ```javascript
   export const config = {
     bannerName: "ARDIKA OFFICIAL",
     font: "slant", // Cek font lain dengan perintah: showfigfonts
     greeting: "Welcome back, Boss!",
     separator: "========================================",
     showSystemInfo: true,
     promptUser: "ArdikaOfc",
   };
   ```
3. Simpan perubahan (**CTRL + X**, lalu **Y**, dan **Enter**), kemudian terapkan ulang:
   ```bash
   bash install.sh && source ~/.bashrc
   ```

---

## 📁 Struktur File

```text
style-termux/
├── banner.js      # Modul ESM opsional untuk kelola banner via Node.js
├── config.js      # File konfigurasi nama, font, dan prompt
├── install.sh     # Skrip instalasi banner berbasis Bash (aman dari error libicu)
├── package.json   # Konfigurasi modul ESM
└── README.md      # Dokumentasi repositori
```

---

## 👤 Author

- **GitHub:** [ArdikaOfc](https://github.com/ArdikaOfc)
