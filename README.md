# Raikan Cinta · Rahimah & Shafiee (RS)

Kad jemputan digital (e-card) untuk majlis perkahwinan Rahimah & Mohamad Shafiee.
Tema: hitam · emas · coklat. Laman statik (HTML/CSS/JS), tiada build step.

## Struktur

```
index.html                  struktur halaman + lukisan SVG (bunga emas, pelamin)
css/style.css               reka bentuk & warna tema
js/config.js                ⭐ SEMUA TEKS & TETAPAN — edit fail ini
js/app.js                   pintu pembuka, kiraan detik, galeri, RSVP, guest book, muzik
assets/photos/              gambar galeri
assets/music/lagu.mp3       muzik latar (letak sendiri)
google-apps-script/Code.gs  backend RSVP & Guest Book (Google Sheets)
```

## Edit kandungan

Buka `js/config.js`. Nama, tarikh, lokasi, doa, hashtag, gambar galeri,
nombor hubungi, muzik dan URL RSVP semua di situ.

- **Hubungi**: masih placeholder (`Nama Waris 1`, `60120000000`). Tukar kepada nama & nombor sebenar
  (format `60123456789`, tanpa `+`).
- **Kiraan detik**: `tarikhMula` dalam format `2026-10-31T11:30:00+08:00`.
- **Gambar**: letak fail dalam `assets/photos/`, tambah dalam `galeri`. `fokus` menentukan bahagian
  gambar yang ditunjukkan bila dipotong (contoh `"50% 30%"`).
- **Warna**: pemboleh ubah di bahagian atas `css/style.css` (`--emas`, `--coklat`, `--hitam`, …).

## Muzik

Letak fail MP3 sebagai `assets/music/lagu.mp3`. Muzik bermula bila tetamu tekan meterai.
Jika fail tiada, butang muzik akan disembunyikan secara automatik.

## RSVP & Guest Book (Google Sheets)

1. Cipta Google Sheet baru.
2. **Extensions → Apps Script**, tampal isi `google-apps-script/Code.gs`, Save.
3. **Deploy → New deployment → Web app**. Execute as: *Me*. Who has access: *Anyone*. Authorise.
4. Salin URL `/exec` dan letak dalam `js/config.js` → `rsvpApiUrl`.

Selagi `rsvpApiUrl` kosong, laman berjalan dalam **mod demo**: kiraan & ucapan contoh ditunjukkan,
dan RSVP hanya disimpan dalam pelayar sendiri.

Jika kod Apps Script diubah, buat **Deploy → Manage deployments → Edit → New version**
supaya URL sama terus guna kod baharu.

Untuk buang ucapan yang tak sesuai, padam barisnya dalam Sheet.

## Deploy (Netlify / Vercel)

Tiada build. Sambung repo ini:

- **Netlify**: New site → Import from Git → pilih repo. Build command kosong, publish directory `.`
  (sudah ditetapkan dalam `netlify.toml`).
- **Vercel**: New Project → pilih repo → Framework preset *Other* → Deploy.

Selepas dapat domain, tukar `og:image` dalam `index.html` kepada URL penuh
(contoh `https://nama-anda.netlify.app/assets/photos/foto-4.webp`) supaya gambar keluar
bila link dikongsi di WhatsApp.

## Uji secara lokal

```
python3 -m http.server 8000
```
Buka http://localhost:8000

---
Direka oleh Emoly Creations
