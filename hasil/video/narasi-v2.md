# Narasi V2: Reels "Makmurkan Masjid" (sudah dengan VO Speko)

Sudut: **emosional, cerita singkat.** Gambaran umum sebagai harapan, bukan laporan kejadian nyata. Tanpa angka, tanpa menyalahkan masjid.

## Naskah yang dipakai di video (±40 kata)

Naskah draf awal (±58 kata) terlalu panjang: dibacakan dengan tempo natural jadi ±34 detik. Naskah dipadatkan agar muat di ±25 detik.

| # | Waktu | VO | Teks layar |
|---|---|---|---|
| 1 Hook | 0:00–0:03,7 | "Bayangkan, selesai salat, tak ada yang buru-buru pulang." | SELESAI SALAT, BETAH DI MASJID? |
| 2 Program | 0:03,7–0:09,7 | "Pemuda jemaah dan warga betah berlama-lama. Itulah Makmurkan Masjid, program Barudak Bageur." | MAKMURKAN MASJID + keterangan |
| 3 Kebutuhan | 0:09,7–0:14,7 | "Masjid makmur tidak tumbuh sendiri. Ia butuh tangan kita." | MASJID MAKMUR BUTUH TANGAN KITA + kartu PEMUDA / JEMAAH / WARGA |
| 4 Cara donasi | 0:14,7–0:19,3 | "Hubungi pengurus Barudak Bageur, tanyakan cara berdonasi." | CARA IKUT BERDONASI, 3 langkah, kotak kontak, tombol |
| 5 Ajakan + logo | 0:19,3–0:24,9 | "Hayu, makmurkan masjid bareng-bareng. Jazakumullah khairan." | Hayu, MAKMURKAN MASJID BARENG-BARENG + logo |

Yang dibuang dari draf awal: daftar "ngaji bareng, saling sapa", kalimat "tangan-tangan yang peduli", "Caranya sederhana…lalu salurkan", dan "Sekecil apa pun, berarti".

## Naskah utuh

> Bayangkan, selesai salat, tak ada yang buru-buru pulang.
> Pemuda jemaah dan warga betah berlama-lama. Itulah Makmurkan Masjid, program Barudak Bageur.
> Masjid makmur tidak tumbuh sendiri. Ia butuh tangan kita.
> Hubungi pengurus Barudak Bageur, tanyakan cara berdonasi.
> Hayu, makmurkan masjid bareng-bareng. Jazakumullah khairan.

## Detail teknis VO

- **Layanan:** Speko (`audio.synthesize`), penyedia Minimax `speech-2.6-hd`
- **Suara:** `Indonesian_CaringMan` (pria, hangat), kecepatan 1,15×
- **Berkas:** `../video-reels/public/vo/vo1.wav` sampai `vo5.wav` (satu klip per adegan, jeda tepi sudah dipangkas)
- **Biaya:** ±US$0,09 dari kredit Speko untuk 11 klip (termasuk dua percobaan)
- **Mix:** VO volume penuh, backsound 30%, loudness akhir ±‑14,7 LUFS
- **Mengganti suara:** sintesis ulang tiap klip dengan suara lain (opsi Indonesia: Minimax `Indonesian_CalmWoman`, Cartesia "Siti - Ad Narrator" atau "Andi - Dynamic Presenter", ElevenLabs "Budi"), simpan sebagai `vo1.wav`…`vo5.wav`, lalu render ulang.

## Catatan

- "Pemuda jemaah dan warga betah berlama-lama" adalah **gambaran harapan**, jangan dibaca seolah kejadian nyata di masjid tertentu.
- Ini suara sintetis. Untuk materi resmi, pertimbangkan merekam suara pengurus.
- Nada ⚠️ belum disetujui pengurus.
- Kontak donasi di layar masih placeholder.
