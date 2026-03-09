"use client";

import { useEffect, useRef, useState } from "react";

export function RsvpScrollButton() {
  const [visible, setVisible] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const target = document.getElementById("rsvp");
    if (!target) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observerRef.current.observe(target);

    return () => observerRef.current?.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#rsvp"
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#3d2b1f",
        color: "#f5f0e8",
        padding: "12px 28px",
        borderRadius: 999,
        fontFamily: "var(--font-playfair)",
        fontSize: "0.95rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        textDecoration: "none",
        boxShadow: "0 4px 20px rgba(61, 43, 31, 0.35)",
        transition: "opacity 0.2s, transform 0.2s",
      }}
    >
      RSVP
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M7 1v12M7 13l-4-4M7 13l4-4"
          stroke="#c9a26a"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
