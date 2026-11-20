
<div align="center">
  <img src="https://github.com/ArdikaOfc.png" width="130" style="border-radius: 50%;" alt="ArdikaOfc Profile" />
  <h1>Termux Aesthetic Banner</h1>
  <p>Skrip otomatis untuk mempercantik tampilan awal (MOTD) dan prompt Termux menggunakan Figlet, Lolcat, dan Neofetch berbasis Node.js (ESM).</p>

  <p>
    <a href="https://github.com/ArdikaOfc">
      <img src="https://img.shields.io/badge/Author-ArdikaOfc-blue?style=for-the-badge&logo=github" alt="Author" />
    </a>
    <img src="https://img.shields.io/badge/Platform-Termux%20Android-success?style=for-the-badge&logo=android" alt="Platform" />
    <img src="https://img.shields.io/badge/Node.js-ESM-339933?style=for-the-badge&logo=nodedotjs" alt="Node.js" />
  </p>
</div>

---

## ✨ Fitur Utama

- **Menghapus MOTD Bawaan:** Membersihkan teks sambutan standar Termux secara otomatis.
- **Banner Nama Gradasi:** Menampilkan teks *ASCII art* kustom dengan efek warna pelangi menggunakan `figlet` dan `lolcat`.
- **Informasi Sistem:** Menampilkan logo OS dan spesifikasi perangkat lewat `neofetch`.
- **Custom Shell Prompt (`PS1`):** Mengubah tampilan `~ $` standar menjadi prompt modern berwarna lengkap dengan nama pengguna dan direktori aktif.
- **Konfigurasi Terpusat:** Pengaturan nama, font, sapaan, dan prompt cukup diubah melalui satu file (`config.js`).

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
     bannerName: "ARDIKA OFC",
     font: "slant", // Cek font lain dengan perintah: showfigfonts
     greeting: "Welcome back, Boss!",
     separator: "========================================",
     showSystemInfo: true,
     promptUser: "ArdikaOfc",
   };
   ```
3. Simpan perubahan (**CTRL + X**, lalu **Y**, dan **Enter**), kemudian terapkan ulang:
   ```bash
   node banner.js && source ~/.bashrc
   ```

---

## 📁 Struktur File

```text
style-termux/
├── banner.js      # Logika pembuatan dan injeksi banner ke ~/.bashrc
├── config.js      # File konfigurasi nama, font, dan prompt
├── install.sh     # Skrip instalasi paket dependensi Termux
├── package.json   # Konfigurasi modul ESM
└── README.md      # Dokumentasi repositori
```

---

## 👤 Author

- **GitHub:** [ArdikaOfc](https://github.com/ArdikaOfc)
