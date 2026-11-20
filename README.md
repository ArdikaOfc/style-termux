<div align="center">
  <img src="https://github.com/ArdikaOfc.png" width="130" style="border-radius: 50%;" alt="ArdikaOfc Profile" />
  <h1>Termux Aesthetic Banner</h1>
  <p>Skrip otomatis untuk merapikan tampilan awal (MOTD) dan prompt Termux menggunakan Figlet, Lolcat, serta logo Android bawaan Neofetch secara aman tanpa mengganggu bot WhatsApp maupun proyek Node.js.</p>

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
- **Banner Nama Gradasi:** Menampilkan teks *ASCII art* kustom berwarna lewat `figlet` dan `lolcat`.
- **Informasi Sistem & Logo Android:** Menampilkan info perangkat dengan logo bawaan `neofetch`.
- **Custom Shell Prompt (`PS1`):** Mengubah prompt terminal menjadi lebih rapi dan berwarna.
- **Aman untuk Bot WhatsApp & Node.js:** Tidak memaksa menimpa paket Node.js yang sedang dipakai sehingga menjalankan bot WhatsApp tetap lancar.
- **Pengaturan Terpusat:** Nama banner, font, sapaan, dan prompt mudah diubah melalui `config.js`.

---

## 🚀 Cara Pasang di Termux

Jalankan perintah berikut di Termux:

```bash
pkg install git -y
git clone [https://github.com/ArdikaOfc/style-termux.git](https://github.com/ArdikaOfc/style-termux.git)
cd style-termux
chmod +x install.sh
bash install.sh
source ~/.bashrc
```

---

## ⚙️ Kustomisasi Tampilan

1. Buka file `config.js`:
   ```bash
   cd ~/style-termux
   nano config.js
   ```
2. Ubah nilai sesuai keinginan kamu:
   ```javascript
   export const config = {
     bannerName: "ARDIKA OFC",
     font: "slant", // Cek font lain dengan: showfigfonts
     greeting: "Welcome back, Boss!",
     separator: "========================================",
     showSystemInfo: true,
     promptUser: "ArdikaOfc",
   };
   ```
3. Simpan (**CTRL + X**, lalu **Y**, dan **Enter**), lalu terapkan:
   ```bash
   bash install.sh && source ~/.bashrc
   ```

---

## 📁 Struktur File

```text
style-termux/
├── banner.js      # Modul ESM opsional untuk kelola banner via Node.js
├── config.js      # File konfigurasi nama, font, dan prompt
├── install.sh     # Skrip pemasangan otomatis berbasis Bash
├── package.json   # Konfigurasi modul ESM
└── README.md      # Dokumentasi repositori
```

---

## 👤 Author

- **GitHub:** [ArdikaOfc](https://github.com/ArdikaOfc)
