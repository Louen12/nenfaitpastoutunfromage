"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { SITE } from "@/lib/config/site";

const ELFSIGHT_APP_ID = "elfsight-app-3f80913d-7148-444f-9f91-187eeada7b8a";
const LOAD_TIMEOUT_MS = 7000;

export default function InstagramFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "fallback">("loading");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "fallback" : prev));
    }, LOAD_TIMEOUT_MS);

    const observer = new MutationObserver(() => {
      if (container.children.length > 0 || container.shadowRoot) {
        setStatus("loaded");
        clearTimeout(timer);
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="space-y-4">
      {/* Overrides CSS pour le widget Elfsight */}
      <style>{`
        .eapps-instagram-feed-posts-grid-load-more button {
          background-color: #1d5b3a !important;
          border-radius: 9999px !important;
        }
        .eapps-instagram-feed-posts-grid-load-more button:hover {
          opacity: 0.9 !important;
        }
        .elfsight-app-3f80913d-7148-444f-9f91-187eeada7b8a a[href*="elfsight"],
        .eapps-instagram-feed a[href*="elfsight"],
        .eapps-widget-toolbar {
          opacity: 0.25 !important;
          transform: scale(0.85) !important;
          filter: grayscale(1) !important;
          transition: opacity 0.2s !important;
        }
        .elfsight-app-3f80913d-7148-444f-9f91-187eeada7b8a a[href*="elfsight"]:hover,
        .eapps-instagram-feed a[href*="elfsight"]:hover,
        .eapps-widget-toolbar:hover {
          opacity: 0.5 !important;
        }
      `}</style>

      <div className="flex items-center gap-3">
        <span className="block w-8 h-px bg-vert" />
        <span className="text-[11px] font-mono uppercase tracking-widest text-vert">
          @nenfaispas.fromage
        </span>
      </div>

      <h2 className="text-2xl font-serif font-bold text-encre leading-tight">
        Côté <em className="text-vert italic">coulisses</em>
      </h2>
      <p className="text-sm text-mute font-sans leading-relaxed">
        Notre quotidien de fromager ambulant, en images.
      </p>

      {status !== "fallback" && (
        <div
          ref={containerRef}
          className="min-h-[320px] rounded-2xl overflow-hidden"
        >
          <div
            className={ELFSIGHT_APP_ID}
            data-elfsight-app-lazy
          />
        </div>
      )}

      {status === "fallback" && <FallbackCard />}

      <a
        href={SITE.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-vert px-5 py-2.5 text-sm font-sans font-semibold text-creme-clair transition hover:opacity-90"
      >
        <InstagramIcon />
        Suivez-nous sur Instagram
      </a>

      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
      />
    </section>
  );
}

function FallbackCard() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-ligne bg-white px-6 py-10 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-vert/10">
        <InstagramIcon className="size-7 text-vert" />
      </div>
      <p className="max-w-xs text-sm text-texte leading-relaxed">
        Retrouvez nos dernières actualités directement sur Instagram
      </p>
      <a
        href={SITE.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-vert px-5 py-2.5 text-sm font-sans font-semibold text-creme-clair transition hover:opacity-90"
      >
        Voir le compte Instagram
      </a>
    </div>
  );
}

function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
