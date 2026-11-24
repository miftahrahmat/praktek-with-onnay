"""Backsound orisinal 25 detik: pad hangat + petikan lembut (tanpa sampel berhak cipta).
Tempo 90 BPM, progresi C - G - Am - F, lalu resolusi di C. Mono -> stereo WAV 44.1 kHz."""
import math, struct, wave, random
SR = 44100
DUR = 25.0
N = int(SR * DUR)
BPM = 90
beat = 60 / BPM
bar = beat * 4
def hz(m): return 440 * 2 ** ((m - 69) / 12)
# akord per birama (MIDI): C, G, Am, F ... diulang
chords = [[48,55,64],[43,55,62],[45,57,64],[41,57,65]]
L = [0.0] * N; R = [0.0] * N
random.seed(7)
def add(t0, dur, f, amp, kind, pan=0.5):
    i0 = int(t0 * SR); n = int(dur * SR)
    for k in range(n):
        i = i0 + k
        if i >= N: break
        t = k / SR
        if kind == "pad":
            a = min(1, t / 0.8) * min(1, (dur - t) / 0.8)
            s = (math.sin(2*math.pi*f*t) + 0.4*math.sin(2*math.pi*f*2.003*t) + 0.2*math.sin(2*math.pi*f*0.998*t)) / 1.6
        else:  # pluck
            a = math.exp(-t * 3.2) * min(1, t / 0.005)
            s = math.sin(2*math.pi*f*t) + 0.35*math.sin(2*math.pi*f*2*t)*math.exp(-t*5) + 0.15*math.sin(2*math.pi*f*3*t)*math.exp(-t*8)
        v = s * a * amp
        L[i] += v * (1 - pan); R[i] += v * pan
nb = int(DUR / bar) + 1
for b in range(nb):
    ch = chords[b % 4] if b < nb - 1 else chords[0]
    for m in ch:
        add(b * bar, bar + 0.6, hz(m), 0.07, "pad", 0.5)
    # petikan arpeggio per 1/2 beat mulai birama ke-2 (setelah hook)
    if b >= 1:
        notes = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 24]
        for s in range(8):
            m = notes[[0,1,2,3,2,1,2,1][s]]
            add(b * bar + s * beat / 2, 1.4, hz(m), 0.06 if s % 2 == 0 else 0.04, "pluck", 0.35 + 0.3 * (s % 2))
# kick/ketukan lembut tiap beat dari 4 detik (frame program) -- hanya detak rendah halus
for bt in range(int(4 / beat), int(DUR / beat)):
    t0 = bt * beat
    for k in range(int(0.25 * SR)):
        i = int(t0 * SR) + k
        if i >= N: break
        t = k / SR
        v = math.sin(2*math.pi*(55 + 70*math.exp(-t*30))*t) * math.exp(-t*14) * 0.16
        L[i] += v; R[i] += v
# fade in/out + normalisasi
pk = max(max(abs(x) for x in L), max(abs(x) for x in R))
g = 0.8 / pk
with wave.open("public/audio/backsound.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    frames = bytearray()
    for i in range(N):
        t = i / SR
        env = min(1, t / 1.0) * min(1, (DUR - t) / 2.0)
        frames += struct.pack("<hh", int(max(-1, min(1, L[i]*g*env)) * 32767), int(max(-1, min(1, R[i]*g*env)) * 32767))
    w.writeframes(bytes(frames))
print("ok")
