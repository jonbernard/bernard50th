import Image, { StaticImageData } from "next/image";
import { RsvpForm } from "./components/RsvpForm";
import { RsvpScrollButton } from "./components/RsvpScrollButton";

// ─── Photo frame / stub ──────────────────────────────────────────────────────

type PhotoProps = {
  src?: string;
  alt: string;
  rotate?: number;
  aspectRatio?: string;
};

function Photo({ src, alt, rotate = 0, aspectRatio = "4/3" }: PhotoProps) {
  return (
    <div className="photo-frame" style={{ transform: `rotate(${rotate}deg)` }}>
      {src ? (
        <div style={{ aspectRatio, position: "relative" }}>
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "cover", display: "block" }}
          />
        </div>
      ) : (
        <div className="photo-stub" style={{ aspectRatio }} />
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
        opacity: 0.5,
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
          padding: "40px 32px 52px",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {/* Top row: large wedding photo left, two smaller stacked right */}
          <div className="collage-top-grid">
            <div className="collage-large-photo">
              <Photo
                alt="Wedding Exit · 1976"
                rotate={-2}
                aspectRatio="3/4"
                src="/images/bernard-1.jpg"
              />
            </div>
            <Photo
              alt="Tom & Jane · Toasting"
              rotate={3.5}
              aspectRatio="4/3"
              src="/images/bernard-2.jpg"
            />
            <Photo
              alt="Tom & Jane · Portrait"
              rotate={-1.5}
              aspectRatio="4/3"
              src="/images/bernard-3.jpg"
            />
          </div>
        </div>
      </section>

      {/* ── Invitation Text Section ── */}
      <section
        style={{ backgroundColor: "var(--cream)", padding: "56px 32px 52px" }}
      >
        <div
          className="invite-grid"
          style={{ maxWidth: 900, margin: "0 auto" }}
        >
          {/* Left: headline */}
          <div style={{ textAlign: "center" }}>
            <div className="section-rule" style={{ marginBottom: 14 }}>
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.05rem",
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
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
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
                  fontSize: "1.4rem",
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
            className="invite-details"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.15rem",
              fontStyle: "italic",
              color: "var(--brown)",
              lineHeight: 1.9,
            }}
          >
            <p style={{ margin: 0, fontWeight: 600 }}>Sunday, June 7th, 2026</p>
            <p style={{ margin: 0 }}>1:00pm – 5:00pm</p>
            <p style={{ margin: 0 }}>The Center at Stonehill Village</p>
            <p style={{ margin: 0 }}>1300 Shorthill Dr,</p>
            <p style={{ lineHeight: 1, margin: 0 }}>Xenia, OH 45385</p>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: "1rem",
                color: "var(--brown-medium)",
              }}
            >
              bernard50th.com
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div
        style={{
          height: 1,
          backgroundColor: "var(--brown-light)",
          margin: "0 auto",
          opacity: 0.35,
        }}
      />

      {/* ── Collage Section ── */}
      <section
        style={{
          backgroundColor: "#c9b49a",
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)",
          padding: "40px 32px 52px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Bottom row */}
          <div className="collage-bottom-grid">
            <Photo
              alt="Tom & Jane · Present Day"
              rotate={-2.5}
              aspectRatio="4/3"
              src="/images/bernard-4.jpg"
            />
            <Photo
              alt="Tom & Jane · Scenic Overlook"
              rotate={2}
              aspectRatio="4/3"
              src="/images/bernard-5.jpg"
            />
          </div>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section
        style={{
          backgroundColor: "#f8f5f0",
          padding: "60px 32px 90px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Sparkle style={{ top: 28, left: 28 }} />
        <Sparkle style={{ top: 28, right: 28 }} />
        <Sparkle style={{ top: 76, left: 60 }} />
        <Sparkle style={{ top: 76, right: 60 }} />
        <Sparkle style={{ bottom: 28, left: 28 }} />
        <Sparkle style={{ bottom: 28, right: 28 }} />
        <Sparkle style={{ bottom: 76, left: 60 }} />
        <Sparkle style={{ bottom: 76, right: 60 }} />

        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Two photos from back of invite */}
          <div className="story-photos">
            <div className="story-photo-a">
              <Photo
                alt="Tom & Jane · Recent"
                rotate={-3}
                aspectRatio="4/3"
                src="/images/bernard-6.jpg"
              />
            </div>
            <div className="story-photo-b">
              <Photo
                alt="Wedding Portrait Close-up"
                rotate={2.5}
                aspectRatio="3/4"
                src="/images/bernard-7.jpg"
              />
            </div>
          </div>

          {/* Lead quote */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.35rem, 3vw, 1.8rem)",
              fontWeight: 600,
              fontStyle: "italic",
              color: "var(--brown)",
              lineHeight: 1.65,
              textAlign: "center",
              margin: "0 0 28px",
            }}
          >
            Join us as we celebrate Tom and Jane building a life, a family, and
            a legacy together across a half-century of marriage.
          </p>

          {/* Body text */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--brown-medium)",
              lineHeight: 2.1,
              textAlign: "center",
              margin: "0 0 28px",
            }}
          >
            Through years of shared love, laughter, challenges, scouting
            adventures, church events, endless aviation trivia, and an
            uncountable number of perfect pies, they&apos;ve built an example of
            commitment and endurance that has shaped all our lives.
          </p>

          <div
            style={{
              height: 1,
              backgroundColor: "var(--brown-light)",
              margin: "72px auto",
              opacity: 0.35,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              fontWeight: 500,
              fontStyle: "italic",
              color: "var(--brown)",
              lineHeight: 1.5,
              textAlign: "center",
              margin: "0 0 28px",
            }}
          >
            Hors D'oeuvres, Refreshments, and Desserts will be served.
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              fontWeight: 500,
              fontStyle: "italic",
              color: "var(--brown)",
              lineHeight: 1.5,
              textAlign: "center",
              margin: "0 0 28px",
            }}
          >
            This party will be an Open House from 1pm - 5pm. You are invited to
            be there the entire time, or as much as you are able.
          </p>

          {/* No gifts */}
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
            ✦&nbsp; Please NO GIFTS. If you would like to bring a card, that
            will gladly be received. &nbsp;✦
          </p>
        </div>
      </section>

      {/* ── RSVP Section ── */}
      <section
        id="rsvp"
        style={{
          backgroundColor: "var(--cream)",
          padding: "60px 24px 80px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
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
            Kindly reply by{" "}
            <strong style={{ color: "var(--brown)" }}>June 4th</strong>
          </p>

          <RsvpForm />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          backgroundColor: "var(--cream-dark)",
          padding: "22px 24px",
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
          Tom &amp; Jane Bernard &nbsp;✦&nbsp; 50 Years &nbsp;✦&nbsp; June 7th,
          2026
        </p>
      </footer>

      <RsvpScrollButton />
    </main>
  );
}
