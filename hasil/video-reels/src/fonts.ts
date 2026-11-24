import { continueRender, delayRender, staticFile } from "remotion";

const defs: [string, string, string][] = [
  ["Montserrat", "800", "montserrat-latin-800-normal.woff2"],
  ["Montserrat", "300", "montserrat-latin-300-normal.woff2"],
  ["Inter", "400", "inter-latin-400-normal.woff2"],
  ["Inter", "600", "inter-latin-600-normal.woff2"],
  ["Caveat", "700", "caveat-latin-700-normal.woff2"],
];

// Font dibundel lokal (tanpa internet saat render).
const handle = delayRender("memuat font");
Promise.all(
  defs.map(async ([family, weight, file]) => {
    const face = new FontFace(family, `url(${staticFile(`fonts/${file}`)})`, {
      weight,
    });
    await face.load();
    document.fonts.add(face);
  }),
)
  .then(() => continueRender(handle))
  .catch((e) => {
    console.error(e);
    continueRender(handle);
  });

export const F = {
  judul: "Montserrat, sans-serif",
  isi: "Inter, sans-serif",
  tangan: "Caveat, cursive",
};
