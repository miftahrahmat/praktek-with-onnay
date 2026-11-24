import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import "./fonts";
import { F } from "./fonts";
import { C, DUR, TEXT, TOTAL } from "./content";

// ---------- util ----------
const useIn = (delay = 0, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
};

const Rise: React.FC<{
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  from?: number;
}> = ({ delay = 0, children, style, from = 50 }) => {
  const p = useIn(delay);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * from}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Fade keluar di akhir adegan
const SceneFrame: React.FC<{
  bg: string;
  dur: number;
  children: React.ReactNode;
}> = ({ bg, dur, children }) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [dur - 6, dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      <AbsoluteFill style={{ opacity: out }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

// Zona aman Reels: kosongkan 250px atas dan 350px bawah dari teks penting.
const Safe: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <AbsoluteFill
    style={{
      width: "auto",
      height: "auto",
      top: 250,
      bottom: 350,
      left: 70,
      right: 70,
      justifyContent: "center",
      alignItems: "center",
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

// Ornamen geometris Islami tipis (bintang 8 sudut) di sudut
const Star: React.FC<{ color: string; size?: number; style?: React.CSSProperties }> = ({
  color,
  size = 360,
  style,
}) => {
  const frame = useCurrentFrame();
  return (
    <svg
      width={size}
      height={size}
      viewBox="-100 -100 200 200"
      style={{ position: "absolute", transform: `rotate(${frame * 0.25}deg)`, ...style }}
      fill="none"
      stroke={color}
      strokeWidth={1.6}
    >
      <rect x={-60} y={-60} width={120} height={120} />
      <rect x={-60} y={-60} width={120} height={120} transform="rotate(45)" />
      <circle r={42} />
      <circle r={80} opacity={0.5} />
    </svg>
  );
};

// Bingkai lengkung (arch) berisi foto
const Arch: React.FC<{ w: number; h: number; progress: number; zoom: number }> = ({
  w,
  h,
  progress,
  zoom,
}) => {
  const path = (x: number, y: number, ww: number, hh: number) => {
    const s = y + hh * 0.36;
    return `M${x} ${y + hh} L${x} ${s} Q${x} ${y + hh * 0.12} ${x + ww / 2} ${y} Q${x + ww} ${y + hh * 0.12} ${x + ww} ${s} L${x + ww} ${y + hh} Z`;
  };
  const pad = 18;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ transform: `translateY(${(1 - progress) * 120}px)`, opacity: progress }}
    >
      <defs>
        <clipPath id="arch-clip">
          <path d={path(pad, pad, w - pad * 2, h - pad)} />
        </clipPath>
      </defs>
      <path d={path(4, 4, w - 8, h - 4)} fill="none" stroke={C.teal} strokeWidth={8} />
      <g clipPath="url(#arch-clip)">
        <g transform={`translate(${w / 2} ${h / 2}) scale(${zoom}) translate(${-w / 2} ${-h / 2})`}>
          <image
            href={staticFile("img/masjid.webp")}
            x={0}
            y={0}
            width={w}
            height={h}
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </g>
    </svg>
  );
};

const Button: React.FC<{ label: string; delay?: number; pulse?: boolean }> = ({
  label,
  delay = 0,
  pulse,
}) => {
  const frame = useCurrentFrame();
  const p = useIn(delay, 14);
  const s = pulse ? 1 + 0.03 * Math.sin(frame / 5) : 1;
  return (
    <div
      style={{
        background: C.oranye,
        color: C.arang,
        fontFamily: F.judul,
        fontWeight: 800,
        fontSize: 48,
        letterSpacing: 2,
        padding: "34px 64px",
        borderRadius: 999,
        transform: `scale(${p * s})`,
        opacity: p,
      }}
    >
      {label}
    </div>
  );
};

// ---------- adegan ----------
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const t = TEXT.hook;
  const bar = interpolate(frame, [30, 55], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slow = interpolate(frame, [0, DUR.hook], [1, 1.06]);
  return (
    <SceneFrame bg={C.teal} dur={DUR.hook}>
      <Star color={C.tealMuda} size={620} style={{ right: -220, top: 140, opacity: 0.6 }} />
      <Safe>
        <div style={{ transform: `scale(${slow})`, textAlign: "center", width: "100%" }}>
          <Rise>
            <div
              style={{
                fontFamily: F.judul,
                fontWeight: 300,
                fontSize: 68,
                letterSpacing: 10,
                color: C.krem,
              }}
            >
              {t.kecil}
            </div>
          </Rise>
          <Rise delay={12} from={80}>
            <div
              style={{
                fontFamily: F.judul,
                fontWeight: 800,
                fontSize: 230,
                lineHeight: 1.05,
                color: C.krem,
                marginTop: 10,
              }}
            >
              {t.besar}
            </div>
          </Rise>
          <div
            style={{
              height: 18,
              width: 560 * bar,
              background: C.oranye,
              margin: "0 auto 26px",
              borderRadius: 9,
            }}
          />
          <Rise delay={26}>
            <div
              style={{
                fontFamily: F.judul,
                fontWeight: 800,
                fontSize: 128,
                color: C.krem,
              }}
            >
              {t.sedang}
            </div>
          </Rise>
        </div>
      </Safe>
    </SceneFrame>
  );
};

const Program: React.FC = () => {
  const frame = useCurrentFrame();
  const t = TEXT.program;
  const arch = useIn(14, 18);
  const zoom = interpolate(frame, [0, DUR.program], [1, 1.14]);
  return (
    <SceneFrame bg={C.krem} dur={DUR.program}>
      <Star color={C.sage} size={520} style={{ right: -180, top: -120 }} />
      <Safe style={{ justifyContent: "flex-start" }}>
        <Rise>
          <div
            style={{
              fontFamily: F.isi,
              fontWeight: 600,
              fontSize: 32,
              letterSpacing: 8,
              color: C.teal,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            {t.label}
          </div>
        </Rise>
        <Rise delay={6}>
          <div
            style={{
              fontFamily: F.judul,
              fontWeight: 800,
              fontSize: 132,
              lineHeight: 1.02,
              color: C.teal,
              textAlign: "center",
              marginTop: 14,
            }}
          >
            {t.judul1}
            <br />
            {t.judul2}
          </div>
        </Rise>
        <div style={{ marginTop: 34 }}>
          <Arch w={560} h={640} progress={arch} zoom={zoom} />
        </div>
        <Rise delay={40}>
          <div
            style={{
              fontFamily: F.isi,
              fontWeight: 400,
              fontSize: 38,
              lineHeight: 1.4,
              color: C.arang,
              textAlign: "center",
              marginTop: 30,
              maxWidth: 860,
            }}
          >
            {t.isi}
          </div>
        </Rise>
      </Safe>
    </SceneFrame>
  );
};

const Kebutuhan: React.FC = () => {
  const t = TEXT.kebutuhan;
  return (
    <SceneFrame bg={C.teal} dur={DUR.kebutuhan}>
      <Star color={C.tealMuda} size={560} style={{ left: -240, bottom: 120, opacity: 0.6 }} />
      <Safe>
        <Rise>
          <div
            style={{
              fontFamily: F.judul,
              fontWeight: 800,
              fontSize: 92,
              lineHeight: 1.08,
              color: C.krem,
              textAlign: "center",
              marginBottom: 56,
            }}
          >
            {t.judul}
          </div>
        </Rise>
        {t.kartu.map((k, i) => (
          <Rise key={k.judul} delay={22 + i * 18} from={90} style={{ width: "100%", marginBottom: 26 }}>
            <div
              style={{
                background: C.krem,
                borderRadius: 28,
                padding: "34px 44px",
                display: "flex",
                alignItems: "center",
                gap: 36,
              }}
            >
              <div
                style={{
                  width: 22,
                  alignSelf: "stretch",
                  background: C.oranye,
                  borderRadius: 11,
                }}
              />
              <div>
                <div style={{ fontFamily: F.judul, fontWeight: 800, fontSize: 64, color: C.teal }}>
                  {k.judul}
                </div>
                <div style={{ fontFamily: F.isi, fontWeight: 400, fontSize: 42, color: C.arang }}>
                  {k.isi}
                </div>
              </div>
            </div>
          </Rise>
        ))}
      </Safe>
    </SceneFrame>
  );
};

const Donasi: React.FC = () => {
  const t = TEXT.donasi;
  return (
    <SceneFrame bg={C.krem} dur={DUR.donasi}>
      <Star color={C.sage} size={520} style={{ right: -200, top: -100 }} />
      <Safe>
        <Rise>
          <div
            style={{
              fontFamily: F.judul,
              fontWeight: 800,
              fontSize: 86,
              lineHeight: 1.08,
              color: C.teal,
              textAlign: "center",
              marginBottom: 44,
            }}
          >
            {t.judul}
          </div>
        </Rise>
        {t.langkah.map((s, i) => (
          <Rise key={s} delay={14 + i * 14} style={{ width: "100%", marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
              <div
                style={{
                  flex: "0 0 96px",
                  height: 96,
                  borderRadius: 48,
                  background: C.teal,
                  color: C.krem,
                  fontFamily: F.judul,
                  fontWeight: 800,
                  fontSize: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontFamily: F.isi, fontWeight: 600, fontSize: 44, color: C.arang, lineHeight: 1.2 }}>
                {s}
              </div>
            </div>
          </Rise>
        ))}
        <Rise delay={62} style={{ marginTop: 20 }}>
          <div
            style={{
              border: `4px dashed ${C.teal}`,
              borderRadius: 24,
              padding: "22px 36px",
              textAlign: "center",
              color: C.teal,
              fontFamily: F.isi,
              fontWeight: 600,
              fontSize: 38,
              letterSpacing: 2,
            }}
          >
            {t.labelKontak}: {t.kontak}
          </div>
        </Rise>
        <div style={{ marginTop: 36 }}>
          <Button label={t.tombol} delay={78} />
        </div>
      </Safe>
    </SceneFrame>
  );
};

const Ajakan: React.FC = () => {
  const t = TEXT.ajakan;
  const logo = useIn(30, 16);
  return (
    <SceneFrame bg={C.teal} dur={DUR.ajakan + 1000}>
      <Star color={C.tealMuda} size={620} style={{ left: -250, top: 120, opacity: 0.6 }} />
      <Safe>
        <Rise>
          <div
            style={{
              fontFamily: F.tangan,
              fontWeight: 700,
              fontSize: 120,
              color: C.krem,
              lineHeight: 1,
            }}
          >
            {t.kecil}
          </div>
        </Rise>
        <Rise delay={8}>
          <div
            style={{
              fontFamily: F.judul,
              fontWeight: 800,
              fontSize: 128,
              lineHeight: 1.02,
              color: C.krem,
              textAlign: "center",
            }}
          >
            {t.judul1}
            <br />
            {t.judul2}
          </div>
        </Rise>
        <Rise delay={18}>
          <div
            style={{
              fontFamily: F.judul,
              fontWeight: 300,
              fontSize: 56,
              letterSpacing: 12,
              color: C.krem,
              marginTop: 12,
            }}
          >
            {t.sub}
          </div>
        </Rise>
        <div
          style={{
            marginTop: 60,
            transform: `scale(${0.85 + 0.15 * logo})`,
            opacity: logo,
          }}
        >
          <Img src={staticFile("img/logo-terbalik.svg")} style={{ width: 760 }} />
        </div>
        <div style={{ marginTop: 50 }}>
          <Button label={t.tombol} delay={52} pulse />
        </div>
      </Safe>
    </SceneFrame>
  );
};

// Wipe sage di tiap pergantian adegan
const Wipe: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [at - 7, at, at + 7], [100, 0, -100], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < at - 7 || frame > at + 7) return null;
  return <AbsoluteFill style={{ background: C.sage, transform: `translateY(${y}%)` }} />;
};

export const Reels: React.FC = () => {
  const s2 = DUR.hook + DUR.program;
  const s3 = s2 + DUR.kebutuhan;
  const starts = [0, DUR.hook, s2, s3, s3 + DUR.donasi];
  const frame = useCurrentFrame();
  const vol = interpolate(frame, [0, 24, TOTAL - 45, TOTAL], [0, 0.9, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: C.krem }}>
      <Sequence from={starts[0]} durationInFrames={DUR.hook}>
        <Hook />
      </Sequence>
      <Sequence from={starts[1]} durationInFrames={DUR.program}>
        <Program />
      </Sequence>
      <Sequence from={starts[2]} durationInFrames={DUR.kebutuhan}>
        <Kebutuhan />
      </Sequence>
      <Sequence from={starts[3]} durationInFrames={DUR.donasi}>
        <Donasi />
      </Sequence>
      <Sequence from={starts[4]} durationInFrames={DUR.ajakan}>
        <Ajakan />
      </Sequence>
      {starts.slice(1).map((s) => (
        <Wipe key={s} at={s} />
      ))}
      <Audio src={staticFile("audio/backsound.wav")} volume={vol} />
    </AbsoluteFill>
  );
};
