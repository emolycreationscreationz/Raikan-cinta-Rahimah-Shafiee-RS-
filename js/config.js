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
  masa: "11:30 AM - 3:30 PM",
  aturcara: [
    { label: "Bersanding", masa: "12:30 PM" }
  ],

  // --- Lokasi ---
  tempat: {
    nama: "Dewan Terbuka Kampung Mela",
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
    { src: "assets/photos/foto-4.webp", fokus: "54% 50%", alt: "Rahimah dan Shafiee berdiri di hadapan pelamin" },
    { src: "assets/photos/foto-1.webp", fokus: "50% 50%", alt: "Shafiee menyembunyikan sekuntum mawar untuk Rahimah" },
    { src: "assets/photos/foto-2.webp", fokus: "46% 50%", alt: "Shafiee menghulurkan mawar kepada Rahimah" },
    { src: "assets/photos/foto-3.webp", fokus: "47% 50%", alt: "Rahimah menunjukkan cincin" }
  ],

  // --- Hubungi (PLACEHOLDER — tukar kepada nama & nombor sebenar) ---
  // telefon: format antarabangsa tanpa + atau sengkang, contoh 60123456789
  hubungi: [
    { nama: "Bazlaa", telefon: "+6011-61216141" },
    { nama: "Ruziah", telefon: "+6014-6665827" },
  ],

  // --- Video muka depan (pilihan) ---
  // Kosong = animasi lukisan pengantin berjalan. Isi laluan fail MP4
  // (contoh "assets/video/pengantin.mp4") untuk guna video sendiri.
  heroVideo: "",
  heroPoster: "",

  // --- Muzik latar (letak fail MP3 di assets/music/lagu.mp3) ---
  muzik: "assets/music/lagu.mp3",

  // --- RSVP & Guest Book (Google Sheets) ---
  // Tampal URL Web App Google Apps Script di sini. Kosong = mod demo.
  rsvpApiUrl: "",
  maksPax: 10,

  // --- Penutup ---
  penutup: "Semoga kehadiran Tuan/Puan dapat menyerikan lagi majlis dan diberkati Allah SWT",
  terimaKasih: "Terima Kasih",
  direkaOleh: "Emoly Creations"
};
