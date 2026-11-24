// Semua teks di layar ada di sini. Ganti di file ini, lalu render ulang.
// Bagian bertanda DRAFT/PLACEHOLDER belum dikonfirmasi pengurus.

export const FPS = 30;

// Durasi adegan (frame), disesuaikan dengan panjang VO. Total 745 frame = ±24,8 detik.
export const DUR = {
  hook: 110,
  program: 180,
  kebutuhan: 150,
  donasi: 140,
  ajakan: 165,
} as const;

// Mulai VO tiap adegan (frame setelah awal adegan) dan berkas VO
export const VO_OFFSET = 12;
export const VO_FILES = ["vo1", "vo2", "vo3", "vo4", "vo5"] as const;

export const TOTAL = Object.values(DUR).reduce((a, b) => a + b, 0);

export const C = {
  krem: "#F7F3EA",
  teal: "#14605F",
  tealMuda: "#588C89",
  oranye: "#E8731A",
  arang: "#1D2B2A",
  sage: "#CFDCD3",
  putih: "#FFFFFF",
} as const;

export const TEXT = {
  hook: {
    kecil: "SELESAI SALAT,",
    besar: "BETAH",
    sedang: "DI MASJID?",
  },
  program: {
    label: "PROGRAM UTAMA",
    judul1: "MAKMURKAN",
    judul2: "MASJID",
    // Dari harapan yang sudah dikonfirmasi (BRAND_KIT bagian 1)
    isi: "Supaya pemuda, jemaah, dan warga istiqomah dan betah berlama-lama beribadah.",
  },
  // DRAFT: diturunkan dari penerima manfaat yang sudah dikonfirmasi.
  // Ganti dengan kebutuhan spesifik dari pengurus bila sudah ada.
  kebutuhan: {
    judul: "MASJID MAKMUR BUTUH TANGAN KITA",
    kartu: [
      { judul: "PEMUDA", isi: "ikut terlibat" },
      { judul: "JEMAAH", isi: "betah beribadah" },
      { judul: "WARGA", isi: "saling menguatkan" },
    ],
  },
  donasi: {
    judul: "CARA IKUT BERDONASI",
    langkah: [
      "Hubungi pengurus Barudak Bageur",
      "Tanyakan cara berdonasi",
      "Salurkan, lalu kabari kami",
    ],
    labelKontak: "HUBUNGI",
    // PLACEHOLDER: isi kontak/WA resmi sebelum tayang
    kontak: "ISI NO. WA / KONTAK",
    tombol: "SALURKAN DONASIMU",
  },
  ajakan: {
    kecil: "Hayu,",
    judul1: "MAKMURKAN",
    judul2: "MASJID",
    sub: "BARENG-BARENG",
    tombol: "IKUT SEKARANG",
  },
};
