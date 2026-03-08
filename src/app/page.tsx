import Image from "next/image";
import { RsvpForm } from "./components/RsvpForm";

// ─── Photo frame / stub ──────────────────────────────────────────────────────

type PhotoProps = {
  src?: string;
  alt: string;
  rotate?: number;
  width?: number;
  height?: number;
  className?: string;
};

function Photo({ src, alt, rotate = 0, width = 300, height = 380, className = "" }: PhotoProps) {
  return (
    <div
      className={`photo-frame ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, display: "inline-block" }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ display: "block", objectFit: "cover", width: "100%", height: "100%" }}
        />
      ) : (
        <div className="photo-stub" style={{ width, height: height * 0.75 }}>
          <span>{alt}</span>
          <span style={{ fontSize: 10, opacity: 0.65, marginTop: 4 }}>Photo coming soon</span>
        </div>
      )}
    </div>
  );
}

// ─── Sparkle decoration ───────────────────────────────────────────────────────

function Sparkle({ style }: { style?: React.CSSProperties }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        color: "#c9a26a",
        opacity: 0.55,
        fontSize: "1rem",
        userSelect: "none",
        ...style,
      }}
    >
      ✦
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main style={{ backgroundColor: "var(--cream)", minHeight: "100vh" }}>
      {/* ── Collage Section ── */}
      <section
        style={{
          backgroundColor: "#c9b49a",
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
          padding: "40px 28px 48px",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Top row: large wedding photo left, two smaller right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              gap: 20,
              alignItems: "start",
              marginBottom: 20,
            }}
          >
            {/* Large wedding exit — spans 2 rows */}
            <div style={{ gridRow: "1 / 3" }}>
              <Photo alt="Wedding Exit · 1976" rotate={-2} width={300} height={400} />
            </div>
            <Photo alt="Tom & Jane · Toasting" rotate={3.5} width={220} height={165} />
            <Photo alt="Tom & Jane · Portrait" rotate={-1.5} width={220} height={165} />
          </div>

          {/* Bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Photo alt="Tom & Jane · Present Day" rotate={-2.5} width={280} height={210} />
            <Photo alt="Tom & Jane · Scenic Overlook" rotate={2} width={280} height={210} />
          </div>
        </div>
      </section>

      {/* ── Invitation Text Section ── */}
      <section
        style={{
          backgroundColor: "var(--cream)",
          padding: "52px 24px 48px",
        }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "32px 40px",
            alignItems: "center",
          }}
        >
          {/* Left: headline */}
          <div style={{ textAlign: "center" }}>
            <div className="section-rule" style={{ marginBottom: 14 }}>
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1rem",
                  letterSpacing: "0.15em",
                  color: "var(--brown-medium)",
                  whiteSpace: "nowrap",
                }}
              >
                Join Us To Celebrate
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.9rem, 5.5vw, 2.9rem)",
                fontWeight: 800,
                letterSpacing: "0.06em",
                color: "var(--brown)",
                margin: "0 0 6px",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              Tom &amp; Jane Bernard
            </h1>

            <div className="section-rule" style={{ marginTop: 10 }}>
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.3rem",
                  letterSpacing: "0.18em",
                  fontVariant: "small-caps",
                  color: "var(--brown)",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                50 Years!
              </span>
            </div>
          </div>

          {/* Right: event details */}
          <div
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "var(--brown)",
              lineHeight: 1.85,
              textAlign: "right",
              whiteSpace: "nowrap",
            }}
          >
            <p style={{ margin: 0, fontWeight: 600 }}>Sunday, June 7th, 2026</p>
            <p style={{ margin: 0 }}>1:00pm – 5:00pm</p>
            <p style={{ margin: 0 }}>The Center at Stonehill Village</p>
            <p style={{ margin: 0 }}>1300 Shorthill Dr,</p>
            <p style={{ margin: 0 }}>Xenia, OH 45385</p>
            <p style={{ margin: "6px 0 0", fontSize: "0.95rem", color: "var(--brown-medium)" }}>
              RSVP at bernard50th.com
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div
        style={{
          height: 1,
          backgroundColor: "var(--brown-light)",
          maxWidth: 420,
          margin: "0 auto",
          opacity: 0.35,
        }}
      />

      {/* ── Story Section ── */}
      <section
        style={{
          backgroundColor: "#f8f5f0",
          padding: "56px 24px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Sparkle decorations */}
        <Sparkle style={{ top: 28, left: 28 }} />
        <Sparkle style={{ top: 28, right: 28 }} />
        <Sparkle style={{ top: 72, left: 56 }} />
        <Sparkle style={{ top: 72, right: 56 }} />
        <Sparkle style={{ bottom: 28, left: 28 }} />
        <Sparkle style={{ bottom: 28, right: 28 }} />
        <Sparkle style={{ bottom: 72, left: 56 }} />
        <Sparkle style={{ bottom: 72, right: 56 }} />

        <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Two photos from back of invite */}
          <div
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
              marginBottom: 48,
              flexWrap: "wrap",
            }}
          >
            <Photo alt="Tom & Jane · Recent" rotate={-3} width={240} height={180} />
            <Photo alt="Wedding Portrait Close-up" rotate={2.5} width={200} height={240} />
          </div>

          {/* Lead quote */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)",
              fontWeight: 600,
              fontStyle: "italic",
              color: "var(--brown)",
              lineHeight: 1.65,
              textAlign: "center",
              margin: "0 0 28px",
            }}
          >
            Join us as we celebrate Tom and Jane building a life, a family, and a legacy together
            across a half-century of marriage.
          </p>

          {/* Body text */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.05rem",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--brown-medium)",
              lineHeight: 2.1,
              textAlign: "center",
              margin: "0 0 28px",
            }}
          >
            Through years of shared love, laughter, challenges, scouting adventures, church events,
            endless aviation trivia, and an uncountable number of perfect pies, they&apos;ve built
            an example of commitment and endurance that has shaped all our lives.
          </p>

          {/* No gifts note */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "var(--brown)",
              textAlign: "center",
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            ✦ &nbsp;Please NO GIFTS &nbsp;~&nbsp; Cards gladly received.&nbsp; ✦
          </p>
        </div>
      </section>

      {/* ── RSVP Section ── */}
      <section
        style={{
          backgroundColor: "var(--cream)",
          padding: "56px 24px 72px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 440, margin: "0 auto" }}>
          <div className="section-rule" style={{ marginBottom: 12 }}>
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "var(--brown)",
                textTransform: "uppercase",
              }}
            >
              RSVP
            </span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.15rem",
              fontStyle: "italic",
              color: "var(--brown-medium)",
              marginBottom: 32,
            }}
          >
            Kindly reply by <strong style={{ color: "var(--brown)" }}>[Deadline Date]</strong>
          </p>

          <RsvpForm />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          backgroundColor: "var(--cream-dark)",
          padding: "20px 24px",
          textAlign: "center",
          borderTop: "1px solid rgba(155, 138, 112, 0.3)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.9rem",
            fontStyle: "italic",
            color: "var(--brown-light)",
            margin: 0,
          }}
        >
          Tom &amp; Jane Bernard &nbsp;✦&nbsp; 50 Years &nbsp;✦&nbsp; June 7th, 2026
        </p>
      </footer>
    </main>
  );
}
