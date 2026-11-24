# Reels "Makmurkan Masjid": Naskah, VO, dan Backsound

- **Format:** 1080 × 1920 px (9:16), 30 fps, **24 detik**
- **File video:** [`makmurkan-masjid-reels.mp4`](makmurkan-masjid-reels.mp4) (sudah berisi backsound, VO belum direkam)
- **Proyek sumber:** [`../video-reels/`](../video-reels/)
- **Ide inti:** pertanyaan yang dekat dengan jemaah ("betah nggak di masjid?"), lalu ajakan yang hangat. Tidak menyalahkan masjid, tidak memakai angka.

## Tabel adegan

| # | Waktu | Adegan | Visual dan teks layar | VO (±2,7 kata/detik) | Backsound |
|---|---|---|---|---|---|
| 1 | 0:00–0:03,3 | **Hook** | Latar teal. "SELESAI SALAT," (Montserrat Light) lalu **BETAH** (ExtraBold, besar), garis oranye memanjang, "DI MASJID?" | "Selesai salat… betah nggak, di masjid?" | Pad lembut masuk perlahan (fade in), belum ada ketukan. Jeda napas setelah "salat". |
| 2 | 0:03,3–0:09 | **Program** | Latar krem. "PROGRAM UTAMA", **MAKMURKAN MASJID**, foto masjid dalam bingkai lengkung, zoom pelan. Keterangan: "Supaya pemuda, jemaah, dan warga istiqomah dan betah berlama-lama beribadah." | "Ini Makmurkan Masjid, program Barudak Bageur. Supaya pemuda, jemaah, dan warga istiqomah, dan betah beribadah." | Petikan arpeggio dan detak rendah halus masuk. Tenang, hangat. |
| 3 | 0:09–0:14,7 | **Kebutuhan** | Latar teal. "MASJID MAKMUR BUTUH KITA", tiga kartu muncul bergantian: PEMUDA (ikut terlibat), JEMAAH (betah beribadah), WARGA (saling menguatkan). | "Masjid yang makmur butuh kita semua. Pemuda yang terlibat, jemaah yang betah, warga yang saling menguatkan." | Ritme stabil. Tiap kartu sejajar dengan satu frasa VO. |
| 4 | 0:14,7–0:19,7 | **Cara donasi** | Latar krem. "CARA IKUT BERDONASI", tiga langkah bernomor, kotak kontak, tombol oranye "SALURKAN DONASIMU". | "Caranya mudah. Hubungi pengurus Barudak Bageur, tanyakan cara berdonasi, lalu salurkan." | Musik sedikit turun supaya langkah terdengar jelas. |
| 5 | 0:19,7–0:24 | **Ajakan + logo** | Latar teal. Caveat "Hayu,", **MAKMURKAN MASJID**, "BARENG-BARENG", **logo terbalik** (BB + Barudak Bageur), tombol oranye berdenyut "IKUT SEKARANG". | "Hayu, makmurkan masjid bareng-bareng. Barudak Bageur. Jazakumullah khairan." | Resolusi ke akor C, lalu fade out 2 detik. |

Pergantian adegan memakai wipe sage (`#CFDCD3`) selama ±14 frame.

## Naskah VO utuh (±62 kata)

> Selesai salat… betah nggak, di masjid?
> Ini Makmurkan Masjid, program Barudak Bageur. Supaya pemuda, jemaah, dan warga istiqomah, dan betah beribadah.
> Masjid yang makmur butuh kita semua. Pemuda yang terlibat, jemaah yang betah, warga yang saling menguatkan.
> Caranya mudah. Hubungi pengurus Barudak Bageur, tanyakan cara berdonasi, lalu salurkan.
> Hayu, makmurkan masjid bareng-bareng. Barudak Bageur. Jazakumullah khairan.

**Arahan suara:** hangat, santai, seperti sesama warga yang mengajak. Bukan nada iklan atau ceramah. Tempo sedang, ada jeda singkat di akhir tiap kalimat. Kata "Hayu" dibaca ramah, tidak menekan. Tulis "salat", "istiqomah", dan "jazakumullah khairan" sesuai ejaan yang dipakai pengurus.

## Backsound

- **File:** `../video-reels/public/audio/backsound.wav` (dibuat oleh `../video-reels/scripts/buat-backsound.py`)
- **Sifat:** musik **orisinal buatan skrip** (pad + petikan + detak lembut), tempo 90 BPM, progresi C – G – Am – F lalu C. Bebas hak cipta, tetapi sederhana, setara musik latar sementara.
- **Mood:** teduh, hangat, penuh harapan. Tanpa vokal, tanpa suasana pesta.
- **Mengganti musik:** taruh lagu berlisensi sebagai `public/audio/backsound.wav` (24 detik, atau potong lewat `volume` di `Composition.tsx`), lalu render ulang. Cari kata kunci "warm acoustic", "gentle piano and guitar", 85–95 BPM.
- **Saat VO dipasang:** turunkan musik ke ±25–30% di bawah suara (ducking), terutama di adegan 2–4.

## Yang harus dicek pengurus sebelum tayang

1. **Kontak donasi (adegan 4) masih placeholder** ("ISI NO. WA / KONTAK"). Ganti di `src/content.ts` (`donasi.kontak`). Anda memilih tanpa nomor rekening, jadi hanya kontak.
2. **Kebutuhan (adegan 3) masih draft.** Anda memilih mengisi kebutuhan spesifik, tetapi rinciannya belum masuk. Sementara dipakai tiga kelompok penerima manfaat yang sudah ✅ (pemuda, jemaah, warga). Kirim rincian spesifik dan saya ganti.
3. **Suara ⚠️ belum disetujui pengurus** (BRAND_KIT bagian 4), termasuk kata "Hayu" dan "betah nggak".
4. **Foto masjid** adalah foto aset repo. Pastikan boleh dipakai. Bila ada foto kegiatan di masjid sendiri, itu lebih kuat (dan jangan pakai wajah tanpa izin).
5. Tidak ada angka, nama donatur, testimoni, atau klaim capaian di video ini.

## Mengubah dan merender ulang

```bash
cd hasil/video-reels
npm install
npx remotion studio          # pratinjau
npx remotion render MakmurkanMasjidReels ../video/makmurkan-masjid-reels.mp4
```
