/**
 * RSVP & Guest Book — Raikan Cinta RS
 * ------------------------------------
 * 1. Buka Google Sheet baru > Extensions > Apps Script.
 * 2. Padam kod asal, tampal fail ini, Save.
 * 3. Deploy > New deployment > Type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Salin URL Web App (berakhir dengan /exec) ke js/config.js -> rsvpApiUrl.
 *
 * Setiap RSVP masuk sebagai satu baris dalam tab "RSVP".
 * Untuk sembunyikan ucapan yang tak sesuai, padam baris itu dalam Sheet.
 */

var NAMA_TAB = 'RSVP';
var KEPALA = ['Masa', 'Nama', 'Kehadiran', 'Pax', 'Ucapan'];

function tab_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(NAMA_TAB);
  if (!sh) {
    sh = ss.insertSheet(NAMA_TAB);
    sh.appendRow(KEPALA);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Elak formula injection bila teks bermula dengan = + - @
function bersih_(s, maks) {
  s = String(s == null ? '' : s).trim().slice(0, maks);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doGet() {
  var nilai = tab_().getDataRange().getValues().slice(1);
  var hadir = 0, tidak = 0, ucapan = [];
  nilai.forEach(function (r) {
    var k = String(r[2]);
    if (k === 'Hadir') hadir += Number(r[3]) || 1;
    else if (k === 'Tidak Hadir') tidak += 1;
    var u = String(r[4]).replace(/^'/, '').trim();
    if (u) ucapan.push({ nama: String(r[1]).replace(/^'/, ''), ucapan: u });
  });
  ucapan.reverse(); // terbaru di atas
  return json_({ ok: true, hadir: hadir, tidakHadir: tidak, ucapan: ucapan });
}

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var nama = bersih_(d.nama, 60);
    var kehadiran = d.kehadiran === 'Hadir' || d.kehadiran === 'Tidak Hadir' ? d.kehadiran : '';
    if (!nama || !kehadiran) return json_({ ok: false, error: 'Nama dan kehadiran diperlukan' });
    var pax = kehadiran === 'Hadir' ? Math.min(Math.max(parseInt(d.pax, 10) || 1, 1), 20) : 0;
    var ucapan = bersih_(d.ucapan, 300);

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      tab_().appendRow([new Date(), nama, kehadiran, pax, ucapan]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
