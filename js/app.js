(function () {
  'use strict';

  var C = window.MAJLIS || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var kurangGerak = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, teks) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (teks != null) e.textContent = teks;
    return e;
  }
  function simpan(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function baca(k, asal) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : asal; } catch (e) { return asal; } }

  /* ---------- Isi teks dari config ---------- */
  function isi() {
    $$('[data-f]').forEach(function (e) {
      var v = C[e.getAttribute('data-f')];
      if (v != null) e.textContent = v;
    });

    var t = C.tempat || {};
    $('#namaTempat').textContent = t.nama || '';
    $('#alamatTempat').textContent = t.alamat || '';
    $('#lokasiNama').textContent = t.nama || '';
    $('#lokasiAlamat').textContent = t.alamat || '';
    if (t.mapsUrl) $('#lnkMaps').href = t.mapsUrl; else $('#lnkMaps').hidden = true;
    if (t.wazeUrl) { $('#lnkWaze').href = t.wazeUrl; $('#lnkWaze').hidden = false; }

    var ul = $('#aturcara');
    (C.aturcara || []).forEach(function (a) {
      var li = el('li');
      li.appendChild(el('span', 'label', a.label));
      li.appendChild(el('span', 'jam', a.masa));
      ul.appendChild(li);
    });

    var doa = $('#doaTeks');
    (C.doa || []).forEach(function (baris) { doa.appendChild(el('p', null, baris)); });

    var hub = $('#senaraiHubungi');
    (C.hubungi || []).forEach(function (h) {
      var li = el('li');
      var nama = el('div', 'hubungi__nama', h.nama);
      nama.appendChild(el('span', 'hubungi__peranan', h.peranan));
      li.appendChild(nama);
      var no = String(h.telefon || '').replace(/[^0-9]/g, '');
      var wa = el('a'); wa.href = 'https://wa.me/' + no; wa.target = '_blank'; wa.rel = 'noopener';
      wa.setAttribute('aria-label', 'WhatsApp ' + h.nama);
      wa.innerHTML = '<svg><use href="#i-wa"/></svg>';
      var tel = el('a'); tel.href = 'tel:+' + no;
      tel.setAttribute('aria-label', 'Telefon ' + h.nama);
      tel.innerHTML = '<svg><use href="#i-telefon"/></svg>';
      li.appendChild(wa); li.appendChild(tel);
      hub.appendChild(li);
    });

    var pax = $('#fPax');
    for (var i = 1; i <= (C.maksPax || 10); i++) pax.appendChild(new Option(String(i), String(i)));
  }

  /* ---------- Pintu pembuka ---------- */
  function pintu() {
    var p = $('#pintu');
    $('#bukaJemputan').addEventListener('click', function () {
      p.classList.add('buka');
      document.body.classList.remove('terkunci');
      window.scrollTo(0, 0);
      mainMuzik();
      kelopak();
      setTimeout(function () { p.remove(); }, kurangGerak ? 50 : 1700);
    });
  }

  /* ---------- Muzik ---------- */
  var lagu, btnMuzik;
  function mainMuzik() {
    if (!C.muzik) return;
    lagu.play().then(function () { btnMuzik.classList.add('main'); btnMuzik.setAttribute('aria-pressed', 'true'); })
      .catch(function () {});
  }
  function muzik() {
    lagu = $('#lagu'); btnMuzik = $('#btnMuzik');
    if (!C.muzik) { btnMuzik.hidden = true; return; }
    lagu.src = C.muzik;
    lagu.addEventListener('error', function () { btnMuzik.hidden = true; });
    btnMuzik.addEventListener('click', function () {
      if (lagu.paused) mainMuzik();
      else { lagu.pause(); btnMuzik.classList.remove('main'); btnMuzik.setAttribute('aria-pressed', 'false'); }
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && !lagu.paused) { lagu.pause(); lagu._auto = true; }
      else if (!document.hidden && lagu._auto) { lagu._auto = false; mainMuzik(); }
    });
  }

  /* ---------- Kiraan detik ---------- */
  function kiraDetik() {
    var sasaran = new Date(C.tarikhMula).getTime();
    if (isNaN(sasaran)) return;
    var k = {};
    $$('[data-k]').forEach(function (e) { k[e.getAttribute('data-k')] = e; });
    function dua(n) { return n < 10 ? '0' + n : String(n); }
    function kemas() {
      var s = Math.max(0, Math.floor((sasaran - Date.now()) / 1000));
      k.hari.textContent = Math.floor(s / 86400);
      k.jam.textContent = dua(Math.floor(s % 86400 / 3600));
      k.minit.textContent = dua(Math.floor(s % 3600 / 60));
      k.saat.textContent = dua(s % 60);
    }
    kemas();
    setInterval(kemas, 1000);
  }

  /* ---------- Galeri ---------- */
  function galeri() {
    var trek = $('#galeriTrek'), titik = $('#galeriTitik');
    var gambar = C.galeri || [];
    if (!gambar.length) { $('#galeri').hidden = true; return; }
    gambar.forEach(function (g, i) {
      var b = el('button', 'galeri__slaid');
      b.type = 'button';
      b.setAttribute('aria-label', 'Besarkan gambar ' + (i + 1));
      var img = el('img');
      img.src = g.src; img.alt = g.alt || ''; img.loading = 'lazy'; img.decoding = 'async';
      if (g.fokus) img.style.objectPosition = g.fokus;
      b.appendChild(img);
      b.addEventListener('click', function () {
        $('#lightboxImg').src = g.src; $('#lightboxImg').alt = g.alt || '';
        buka('lightbox');
      });
      trek.appendChild(b);
      var d = el('button');
      d.type = 'button';
      d.setAttribute('aria-label', 'Gambar ' + (i + 1));
      d.addEventListener('click', function () { ke(i); rehat(); });
      titik.appendChild(d);
    });
    var dots = $$('button', titik), semasa = 0, henti = 0;
    function tanda(i) { dots.forEach(function (d, j) { d.setAttribute('aria-current', j === i ? 'true' : 'false'); }); }
    function ke(i) { trek.scrollTo({ left: i * trek.clientWidth, behavior: kurangGerak ? 'auto' : 'smooth' }); }
    function rehat() { henti = Date.now() + 7000; }
    trek.addEventListener('scroll', function () {
      var i = Math.round(trek.scrollLeft / trek.clientWidth);
      if (i !== semasa) { semasa = i; tanda(i); }
    }, { passive: true });
    trek.addEventListener('pointerdown', rehat, { passive: true });
    trek.addEventListener('touchstart', rehat, { passive: true });
    tanda(0);
    if (!kurangGerak && gambar.length > 1) {
      setInterval(function () {
        if (Date.now() < henti || document.hidden) return;
        ke((semasa + 1) % gambar.length);
      }, 4000);
    }
  }

  /* ---------- Lapisan / dialog ---------- */
  var terakhirFokus = null;
  function buka(id) {
    var l = document.getElementById(id);
    if (!l) return;
    terakhirFokus = document.activeElement;
    l.classList.add('aktif');
    // Elak papan kekunci telefon terbuka sendiri
    var sentuh = window.matchMedia && matchMedia('(pointer: coarse)').matches;
    var f = sentuh ? $('[data-tutup]', l) : $('input, select, textarea, [data-tutup]', l);
    if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 60);
  }
  function tutup(l) {
    l.classList.remove('aktif');
    if (terakhirFokus && terakhirFokus.focus) terakhirFokus.focus({ preventScroll: true });
  }
  function lapisan() {
    $$('[data-buka]').forEach(function (b) {
      b.addEventListener('click', function () { buka(b.getAttribute('data-buka')); });
    });
    $$('.lapisan').forEach(function (l) {
      l.addEventListener('click', function (e) {
        if (e.target === l || e.target.closest('[data-tutup]')) tutup(l);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var a = $('.lapisan.aktif');
      if (a) tutup(a);
    });
    $('#btnRefresh').addEventListener('click', function () { location.reload(); });
  }

  /* ---------- Toast ---------- */
  var toastT;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('tunjuk');
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove('tunjuk'); }, 3200);
  }

  /* ---------- RSVP & Guest Book ---------- */
  // Mod demo digunakan bila rsvpApiUrl kosong: data contoh + simpanan pelayar sahaja.
  var DEMO = [
    { nama: 'Aina', kehadiran: 'Hadir', pax: 3, ucapan: 'Tahniah Rahimah & Shafiee! Semoga berkekalan hingga ke jannah.' },
    { nama: 'Kak Long', kehadiran: 'Hadir', pax: 5, ucapan: 'Selamat pengantin baru adikku. Semoga dipermudahkan segala urusan.' },
    { nama: 'Hafiz', kehadiran: 'Tidak Hadir', pax: 1, ucapan: 'Tahniah buat kedua mempelai. Maaf tak dapat hadir, doakan semua berjalan lancar.' },
    { nama: 'Syazwani', kehadiran: 'Hadir', pax: 2, ucapan: 'Barakallahu lakuma wa baraka alaikuma. Congrats both of you!' },
    { nama: 'Pak Ngah Mela', kehadiran: 'Hadir', pax: 4, ucapan: 'Semoga diberkati Allah selalu. Jumpa di Dewan Terbuka nanti.' }
  ];
  var KUNCI_DEMO = 'rs-rsvp-demo';

  function ringkas(rows) {
    var hadir = 0, tidak = 0, ucapan = [];
    rows.forEach(function (r) {
      if (r.kehadiran === 'Hadir') hadir += Number(r.pax) || 1;
      else if (r.kehadiran === 'Tidak Hadir') tidak += 1;
      if (r.ucapan && String(r.ucapan).trim()) ucapan.push({ nama: r.nama, ucapan: r.ucapan });
    });
    return { ok: true, hadir: hadir, tidakHadir: tidak, ucapan: ucapan };
  }

  function muat() {
    if (!C.rsvpApiUrl) {
      return Promise.resolve(ringkas(baca(KUNCI_DEMO, []).concat(DEMO)));
    }
    return fetch(C.rsvpApiUrl + '?action=list&t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.json(); });
  }

  function hantar(d) {
    if (!C.rsvpApiUrl) {
      var ada = baca(KUNCI_DEMO, []);
      ada.unshift(d);
      simpan(KUNCI_DEMO, ada);
      return Promise.resolve({ ok: true });
    }
    // text/plain supaya tiada CORS preflight ke Google Apps Script
    return fetch(C.rsvpApiUrl, { method: 'POST', body: JSON.stringify(d) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw new Error((j && j.error) || 'Ralat pelayan'); return j; });
  }

  function papar(data) {
    $('#kiraHadir').textContent = data.hadir;
    $('#kiraTidak').textContent = data.tidakHadir;
    var box = $('#senaraiUcapan');
    box.textContent = '';
    if (!data.ucapan || !data.ucapan.length) {
      box.appendChild(el('p', 'ucapan__kosong', 'Belum ada ucapan. Jadilah yang pertama!'));
      return;
    }
    data.ucapan.forEach(function (u) {
      var item = el('div', 'ucapan__item');
      item.appendChild(el('p', 'ucapan__teks', u.ucapan));
      item.appendChild(el('p', 'ucapan__nama', u.nama));
      box.appendChild(item);
    });
    box.scrollTop = 0;
  }

  function segar() {
    return muat().then(papar).catch(function () {
      $('#senaraiUcapan').textContent = '';
      $('#senaraiUcapan').appendChild(el('p', 'ucapan__kosong', 'Ucapan tidak dapat dimuatkan. Tekan Refresh untuk cuba lagi.'));
    });
  }

  function borang() {
    var f = $('#borangRsvp'), hadir = $('#fHadir'), pax = $('#fPax'), ralat = $('#borangRalat'), btn = $('#btnHantar');
    function kemasPax() { pax.disabled = hadir.value === 'Tidak Hadir'; }
    hadir.addEventListener('change', kemasPax);
    kemasPax();
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      ralat.textContent = '';
      var d = {
        nama: $('#fNama').value.trim(),
        kehadiran: hadir.value,
        pax: hadir.value === 'Hadir' ? Number(pax.value) || 1 : 0,
        ucapan: $('#fUcapan').value.trim()
      };
      if (!d.nama) { ralat.textContent = 'Sila isi nama anda.'; $('#fNama').focus(); return; }
      if (!d.kehadiran) { ralat.textContent = 'Sila pilih kehadiran.'; hadir.focus(); return; }
      btn.disabled = true; btn.textContent = 'MENGHANTAR…';
      hantar(d).then(function () {
        f.reset(); kemasPax();
        tutup($('#modalRsvp'));
        toast('Terima kasih, ' + d.nama + '! RSVP anda telah diterima.');
        return segar();
      }).catch(function () {
        ralat.textContent = 'RSVP tidak dapat dihantar. Semak sambungan internet dan cuba lagi.';
      }).then(function () {
        btn.disabled = false; btn.textContent = 'HANTAR';
      });
    });
  }

  /* Guest Book skrol perlahan seperti dalam video */
  function autoSkrol() {
    if (kurangGerak) return;
    var box = $('#senaraiUcapan'), rehatHingga = 0, baki = 0, nampak = false;
    function rehat(ms) { rehatHingga = Date.now() + ms; }
    ['pointerdown', 'wheel', 'touchstart', 'focusin'].forEach(function (ev) {
      box.addEventListener(ev, function () { rehat(5000); }, { passive: true });
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { nampak = en[0].isIntersecting; }).observe(box);
    } else nampak = true;
    (function langkah() {
      if (nampak && Date.now() > rehatHingga && box.scrollHeight > box.clientHeight + 4) {
        baki += 0.4;
        if (baki >= 1) { box.scrollTop += Math.floor(baki); baki %= 1; }
        if (box.scrollTop + box.clientHeight >= box.scrollHeight - 1) {
          rehat(2500);
          setTimeout(function () { box.scrollTo({ top: 0, behavior: 'smooth' }); }, 2000);
        }
      }
      requestAnimationFrame(langkah);
    })();
  }

  /* ---------- Reveal ketika skrol ---------- */
  function reveal() {
    if (!('IntersectionObserver' in window) || kurangGerak) return;
    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (x.isIntersecting) { x.target.classList.add('terlihat'); io.unobserve(x.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
    $$('.reveal').forEach(function (e) { io.observe(e); });
  }

  /* ---------- Kelopak emas jatuh ---------- */
  var kelopakMula = false;
  function kelopak() {
    if (kelopakMula || kurangGerak) return;
    kelopakMula = true;
    var cv = $('#kelopak'), ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0;
    function saiz() {
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    saiz();
    addEventListener('resize', saiz);
    var WARNA = [['#f6e3a8', '#c9a45c'], ['#fff1c8', '#d9b86e'], ['#e8d29b', '#9c7a3c']];
    function baru(atas) {
      return {
        x: Math.random() * W,
        y: atas ? -20 - Math.random() * H * 0.3 : Math.random() * H,
        s: 3 + Math.random() * 4.5,
        vy: 0.35 + Math.random() * 0.55,
        vx: -0.2 + Math.random() * 0.4,
        r: Math.random() * Math.PI * 2,
        vr: -0.02 + Math.random() * 0.04,
        f: Math.random() * Math.PI * 2,
        w: WARNA[Math.floor(Math.random() * WARNA.length)],
        a: 0.55 + Math.random() * 0.4
      };
    }
    var N = W < 600 ? 16 : 24, ps = [];
    for (var i = 0; i < N; i++) ps.push(baru(false));
    function lukis(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.scale(1, 0.55 + 0.45 * Math.sin(p.f));
      ctx.globalAlpha = p.a;
      var g = ctx.createLinearGradient(0, -p.s, 0, p.s);
      g.addColorStop(0, p.w[0]); g.addColorStop(1, p.w[1]);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, -p.s);
      ctx.bezierCurveTo(p.s * 0.9, -p.s * 0.6, p.s * 0.7, p.s * 0.7, 0, p.s);
      ctx.bezierCurveTo(-p.s * 0.7, p.s * 0.7, -p.s * 0.9, -p.s * 0.6, 0, -p.s);
      ctx.fill();
      ctx.restore();
    }
    (function bingkai() {
      if (!document.hidden) {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < ps.length; i++) {
          var p = ps[i];
          p.f += 0.03;
          p.y += p.vy;
          p.x += p.vx + Math.sin(p.f) * 0.35;
          p.r += p.vr;
          if (p.y > H + 20 || p.x < -30 || p.x > W + 30) ps[i] = baru(true);
          lukis(p);
        }
      }
      requestAnimationFrame(bingkai);
    })();
  }

  /* ---------- Mula ---------- */
  isi();
  pintu();
  muzik();
  kiraDetik();
  galeri();
  lapisan();
  borang();
  reveal();
  segar();
  autoSkrol();
})();
