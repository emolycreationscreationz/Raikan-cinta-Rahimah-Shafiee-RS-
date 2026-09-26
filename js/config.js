/*
 * ============================================================
 *  TETAPAN KAD JEMPUTAN — edit fail ini sahaja untuk tukar isi
 * ============================================================
 *  Semua teks, tarikh, lokasi, gambar, muzik dan nombor telefon
 *  diambil dari sini. Reka bentuk (css/style.css) tak perlu diusik.
 */
window.MAJLIS = {
  // --- Muka depan ---
  tajuk: "Raikan Cinta",
  initials: "RS",
  pasanganPendek: "Rahimah & Shafiee",

  // --- Jemputan ---
  pembuka: "Dengan penuh kesyukuran, kami",
  bapa: "Mohammad Dewan bin Nordin",
  ibu: "Ruziah binti Mansor",
  jemputan: "menjemput Yang Berbahagia Tan Sri/ Puan Sri/ Dato'/ Datin/ Tuan/ Puan/ Encik/ Cik",
  keMajlis: "ke majlis perkahwinan puteri kami dengan pasangannya",
  pengantinPerempuan: "Rahimah",
  pengantinLelaki: "Mohamad Shafiee",

  // --- Tarikh & masa ---
  tarikhPaparan: "SABTU | 31 OKT 2026",
  tarikhSampul: "31 · 10 · 2026",          // tarikh kecil pada sampul surat
  // Masa mula majlis untuk kiraan detik (waktu Malaysia, +08:00)
  tarikhMula: "2026-10-31T11:30:00+08:00",
  tarikhTamat: "2026-10-31T15:30:00+08:00",   // untuk butang "Simpan Tarikh"
  masa: "11:30 AM - 3:30 PM",
  aturcara: [
    { label: "Bersanding", masa: "12:30 PM" }
  ],

  // --- Lokasi ---
  tempat: {
    nama: "Dewan Kampung Mela",
    alamat: "",                      // contoh: "Kampung Mela, 27200 Kuala Lipis, Pahang"
    mapsUrl: "https://maps.app.goo.gl/uwK9rxEqS2ZjjYYv5?g_st=ac",
    wazeUrl: ""                      // kosongkan jika tiada
  },

  // --- Doa ---
  doa: [
    "Ya Allah Ya Rahman Ya Rahim,",
    "berkatilah majlis perkahwinan ini.",
    "Limpahkanlah barakah dan rahmat-Mu kepada kedua mempelai ini.",
    "Kurniakanlah mereka zuriat yang soleh dan solehah.",
    "Kekalkanlah jodoh mereka hingga ke jannah."
  ],
  doaPenutup: "Amin Ya Rabbal Alamin",
  hashtag: "#RahimahShafiee",

  // --- Galeri (fokus = kedudukan gambar bila dipotong, "x% y%") ---
  galeri: [
    { src: "assets/photos/kenangan-1.webp", fokus: "52% 30%", alt: "Rahimah tersenyum di hadapan pelamin" },
    { src: "assets/photos/kenangan-2.webp", fokus: "50% 35%", alt: "Rahimah bersama dua wanita tersayang di hadapan pelamin" },
    { src: "assets/photos/kenangan-3.webp", fokus: "50% 50%", alt: "Shafiee tersenyum dengan sekuntum mawar" },
    { src: "assets/photos/kenangan-4.webp", fokus: "56% 40%", alt: "Rahimah bersama dua orang tersayang di atas pelamin berbunga" }
  ],

  // --- Hubungi (PLACEHOLDER — tukar kepada nama & nombor sebenar) ---
  // telefon: format antarabangsa tanpa + atau sengkang, contoh 60123456789
  hubungi: [
    { nama: "Bazlaa", telefon: "+6011-61216141" },
    { nama: "Ruziah", telefon: "+6014-6665827" },
  ],

  // --- Video muka depan (pilihan) ---
  // Video pengantin berjalan (potret, sudah digred warna emas-coklat).
  // Kosongkan heroVideo untuk kembali ke animasi lukisan.
  heroVideo: "assets/video/pengantin.mp4",
  heroVideoWebm: "assets/video/pengantin.webm",   // sandaran untuk pelayar tanpa MP4
  heroPoster: "assets/video/pengantin-poster.jpg",

  // --- Muzik latar (fail MP3 dalam assets/music/) ---
  muzik: "assets/music/satu-shaf-di-belakangku.mp3",   // Arvian Dwi - Satu Shaf Di Belakangku (dipotong bermula 0:27)
  muzikMula: 0,   // fail sudah bermula dari 0:27 lagu asal

  // --- RSVP & Guest Book (Google Sheets) ---
  // Tampal URL Web App Google Apps Script di sini. Kosong = mod demo.
  rsvpApiUrl: "https://script.google.com/macros/s/AKfycbxqj4dSXyB5e9DurHgNYYFokuEBXlGY0qS1y1fG__vmLkvX-yViJSQWf0HRy1ro4UY7Mg/exec",
  maksPax: 10,

  // --- Penutup ---
  penutup: "Semoga kehadiran Tuan/Puan dapat menyerikan lagi majlis dan diberkati Allah SWT",
  terimaKasih: "Terima Kasih",
  direkaOleh: "Emoly Creations"
};
