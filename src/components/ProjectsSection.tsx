import React, { useCallback, useEffect, useRef, useState } from 'react';
import fairtermsPreview from '../assets/fairterms_preview.png';
import stackoverflowPreview from '../assets/stackoverflow_preview.png';

/* ══════════════════════════════════════════════════════
   TECH LOGOS
   ══════════════════════════════════════════════════════ */
const TECH_LOGOS: Record<string, React.ReactNode> = {
  Python: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="none">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.887S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031v-2.868s-.109-3.402 3.345-3.402h5.766s3.237.052 3.237-3.13V3.13S18.28 0 11.914 0zm-3.21 1.814a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z" fill="#3670A0" />
      <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.134S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.031v2.868s.109 3.402-3.345 3.402H9.455S6.218 12.286 6.218 15.468v5.402S5.72 24 12.086 24zm3.21-1.814a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z" fill="#FFD43B" />
    </svg>
  ),
  FastAPI: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="none">
      <circle cx="12" cy="12" r="11" fill="#009688" opacity="0.15" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13h-2v-6h2v6zm0-8h-2V5h2v2z" fill="#009688" />
    </svg>
  ),
  RAG: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  ),
  'Hugging Face': (
    <svg width="13" height="13" viewBox="0 0 32 32" fill="none" stroke="none">
      <circle cx="16" cy="16" r="14" fill="#FFD21E" opacity="0.2" />
      <ellipse cx="10" cy="13" rx="2" ry="2.5" fill="#FFD21E" />
      <ellipse cx="22" cy="13" rx="2" ry="2.5" fill="#FFD21E" />
      <path d="M10 20 Q16 26 22 20" stroke="#FFD21E" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  'Lovable AI': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="none">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgba(255,100,120,0.8)" />
    </svg>
  ),
  NLP: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  'React.js': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00D8FF" strokeWidth="2">
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="#00D8FF" />
    </svg>
  ),
  'Node.js': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#339933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
      <path d="M12 22V12" />
      <path d="M12 12L2 7" />
      <path d="M12 12l10-5" />
    </svg>
  ),
  'Express.js': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  MongoDB: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#47A248" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c0 0-6 4.5-6 10a6 6 0 0012 0c0-5.5-6-10-6-10z" />
      <path d="M12 2v20" />
    </svg>
  ),
  'JWT Authentication': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  'REST API': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  'MVC Architecture': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="4" rx="1" />
      <rect x="3" y="10" width="18" height="4" rx="1" />
      <rect x="3" y="17" width="18" height="4" rx="1" />
    </svg>
  ),
  CSS3: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1572B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 5l1.5 14 8.5 3 8.5-3L22 5z" />
      <path d="M12 6h4l-.5 5H12M12 11h3l-.5 4.5-2.5 1-2.5-1-.2-2" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════
   PROJECT DATA – single source of truth
   ══════════════════════════════════════════════════════ */
interface Project {
  id: number;
  name: string;
  fullTitle: string;
  caption: string;
  /** Swap this value to switch between repo link and deployed site — no component changes needed */
  link: string;
  /** Always points to the GitHub repo — used for the image click-through */
  githubLink: string;
  image: string;
  imageAlt: string;
  bullets: string[];
  techs: string[];
  mockupUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 0,
    name: 'FairTerms AI',
    fullTitle: 'FairTerms AI – Intelligent Legal Document Risk Analyzer',
    caption:
      'AI-powered legal document analyzer for automated risk assessment, clause understanding, and intelligent question answering.',
    link: 'https://github.com/yashst2006-commits/T_and_C_Analyzer',
    githubLink: 'https://github.com/yashst2006-commits/T_and_C_Analyzer',
    image: fairtermsPreview,
    imageAlt: 'FairTerms AI dashboard preview',
    bullets: [
      'Developed an NLP-powered legal document analysis platform using Scikit-learn to classify risk levels and identify critical clauses from Terms & Conditions.',
      'Built a RAG (Retrieval-Augmented Generation) pipeline that enables users to ask natural language questions and receive context-aware answers directly from uploaded legal documents.',
      'Designed a FastAPI REST API supporting secure document upload, semantic retrieval, and AI-powered legal insights with high accuracy.',
      'Improved model performance through text preprocessing, TF-IDF vectorization, feature engineering, hyperparameter tuning, and comprehensive model evaluation.',
    ],
    techs: ['Python', 'FastAPI', 'RAG', 'Hugging Face', 'Lovable AI', 'NLP'],
    mockupUrl: 'fairterms-ai.vercel.app',
  },
  {
    id: 1,
    name: 'Stack Overflow Clone',
    fullTitle: 'Stack Overflow Clone: Developer Community with Social Networking',
    caption:
      'A full-stack Stack Overflow-inspired platform enhanced with modern social networking features for developer collaboration and community engagement.',
    link: 'https://github.com/yashst2006-commits/stack-overflow-clone',
    githubLink: 'https://github.com/yashst2006-commits/stack-overflow-clone',
    image: stackoverflowPreview,
    imageAlt: 'Stack Overflow Clone dashboard preview',
    bullets: [
      'Developed a full-stack Stack Overflow Clone with secure authentication, question & answer management, and a responsive developer-focused interface using the MERN Stack.',
      'Extended the platform with a complete Social Networking Module, including friend requests, public feed, photo/video sharing, likes, comments, internal sharing, and real-time social interactions.',
      'Implemented friend-based daily posting restrictions using backend business logic, ensuring users\' posting limits dynamically depend on their accepted friend count while maintaining secure REST APIs and MVC architecture.',
    ],
    techs: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Authentication', 'REST API', 'MVC Architecture', 'CSS3'],
    mockupUrl: 'stackoverflow-clone.vercel.app',
  },
];

/* ══════════════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK
   ══════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ══════════════════════════════════════════════════════
   TECH PILL
   ══════════════════════════════════════════════════════ */
const TechPill: React.FC<{ label: string }> = ({ label }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 12px',
        background: hovered ? 'rgba(255,140,0,0.10)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(255,140,0,0.45)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '30px',
        fontSize: '12px',
        color: hovered ? '#FFFFFF' : 'var(--text-secondary)',
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        cursor: 'default',
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 4px 14px rgba(255,140,0,0.12)' : 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {TECH_LOGOS[label] && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'var(--text-secondary)',
            opacity: hovered ? 1 : 0.7,
            transition: 'opacity 0.3s',
          }}
        >
          {TECH_LOGOS[label]}
        </span>
      )}
      {label}
    </span>
  );
};

/* ══════════════════════════════════════════════════════
   CHECK OUT BUTTON — with launching-arrow hover effect
   ══════════════════════════════════════════════════════ */
const CheckOutButton: React.FC<{ url: string }> = ({ url }) => {
  const [hovered, setHovered] = useState(false);

  // Single arrow SVG shape, reused twice
  const ArrowSVG = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '7px 16px',
        borderRadius: '30px',
        background: 'rgba(255,140,0,0.08)',
        border: '1px solid rgba(255,140,0,0.35)',
        color: 'var(--color-orange)',
        fontSize: '13px',
        fontWeight: 700,
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.2px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      Check out
      {/*
        Two stacked arrows inside a clipping box.
        - Arrow A (resting): sits at origin (0,0) → slides to (+6px, -6px) + fades on hover.
        - Arrow B (incoming): sits at (-6px, +6px) + opacity 0 → moves to origin + fades in on hover.
        Both use CSS transition on transform + opacity for GPU-only animation.
      */}
      <span
        style={{
          position: 'relative',
          width: '12px',
          height: '12px',
          display: 'inline-flex',
          flexShrink: 0,
        }}
      >
        {/* Arrow A – exits top-right on hover */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.28s cubic-bezier(0.2,0.8,0.2,1), opacity 0.22s ease',
            transform: hovered ? 'translate(7px, -7px)' : 'translate(0, 0)',
            opacity: hovered ? 0 : 1,
          }}
        >
          <ArrowSVG />
        </span>

        {/* Arrow B – enters from bottom-left on hover */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.28s cubic-bezier(0.2,0.8,0.2,1), opacity 0.22s ease',
            transform: hovered ? 'translate(0, 0)' : 'translate(-7px, 7px)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <ArrowSVG />
        </span>
      </span>
    </a>
  );
};

/* ══════════════════════════════════════════════════════
   3D TILT MOCKUP WRAPPER
   Wraps BrowserMockup and applies perspective/rotateXY on
   mousemove. Disabled automatically on touch devices.
   ══════════════════════════════════════════════════════ */
const TiltMockup: React.FC<{ src: string; alt: string; fullTitle: string; mockupUrl?: string }> = ({
  src,
  alt,
  fullTitle,
  mockupUrl,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Current lerped tilt values (degrees)
  const tiltRef = useRef({ rx: 0, ry: 0 });
  // Target tilt values from raw mouse position
  const targetRef = useRef({ rx: 0, ry: 0 });
  const rafIdRef = useRef<number>(0);
  const isHoveringRef = useRef(false);
  // Glare position (0–100% each axis)
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  // isTouch — disable effect on touch-only devices
  const [isTouch] = useState(() => window.matchMedia('(hover: none)').matches);

  const MAX_TILT = 9; // degrees

  // Animation loop — lerps current tilt toward target
  const animate = useCallback(() => {
    const t = tiltRef.current;
    const g = targetRef.current;
    const LERP = 0.12;

    t.rx += (g.rx - t.rx) * LERP;
    t.ry += (g.ry - t.ry) * LERP;

    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale3d(${isHoveringRef.current ? 1.03 : 1}, ${isHoveringRef.current ? 1.03 : 1}, 1)`;
    }

    // Keep running while hovered OR while still drifting back
    if (isHoveringRef.current || Math.abs(t.rx) > 0.05 || Math.abs(t.ry) > 0.05) {
      rafIdRef.current = requestAnimationFrame(animate);
    } else {
      // Snap to zero cleanly and stop
      t.rx = 0;
      t.ry = 0;
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      }
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    // Normalized -1 to +1 within the element
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // rotateX: tilt up/down → driven by vertical (ny) but inverted so top-hover tilts forward
    // rotateY: tilt left/right → driven by horizontal (nx)
    targetRef.current.rx = -ny * MAX_TILT;
    targetRef.current.ry = nx * MAX_TILT;

    // Glare follows mouse (convert to 0–100 for background-position)
    setGlare({
      x: ((nx + 1) / 2) * 100,
      y: ((ny + 1) / 2) * 100,
      opacity: 0.18,
    });
  }, [isTouch]);

  const handleMouseEnter = useCallback(() => {
    if (isTouch) return;
    isHoveringRef.current = true;
    cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(animate);
    setGlare(g => ({ ...g, opacity: 0.18 }));
  }, [animate, isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (isTouch) return;
    isHoveringRef.current = false;
    targetRef.current = { rx: 0, ry: 0 };
    // Continue the loop so it glides back smoothly
    cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(animate);
    setGlare(g => ({ ...g, opacity: 0 }));
  }, [animate, isTouch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafIdRef.current);
  }, []);

  return (
    <div
      style={{
        // Establish the 3D context on the parent so transform-style propagates
        perspective: '1000px',
        perspectiveOrigin: 'center center',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={wrapperRef}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          // Initial state: no tilt. The rAF loop updates this inline.
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
          position: 'relative',
          borderRadius: '14px',
        }}
      >
        {/* Browser mockup frame */}
        <BrowserMockup src={src} alt={alt} mockupUrl={mockupUrl} />

        {/* Glare overlay — radial gradient that tracks the cursor */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '14px',
            pointerEvents: 'none',
            // Radial highlight centred on mouse position
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,140,0,${glare.opacity}) 0%, transparent 65%)`,
            transition: isTouch ? 'none' : 'opacity 0.35s ease',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Full title caption below */}
      <p
        style={{
          marginTop: '14px',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          lineHeight: 1.5,
          opacity: 0.75,
        }}
      >
        {fullTitle}
      </p>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   BROWSER MOCKUP FRAME
   ══════════════════════════════════════════════════════ */
const BrowserMockup: React.FC<{ src: string; alt: string; mockupUrl?: string }> = ({ src, alt, mockupUrl }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div
      style={{
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.10)',
        background: 'rgba(15,15,15,0.8)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
        }}
      >
        {['rgba(255,95,87,0.85)', 'rgba(255,189,46,0.85)', 'rgba(39,201,63,0.85)'].map(
          (color, i) => (
            <div
              key={i}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: color,
                flexShrink: 0,
              }}
            />
          ),
        )}
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            marginLeft: '8px',
            height: '20px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            gap: '6px',
          }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span
            style={{
              fontSize: '10px',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.2px',
            }}
          >
            {mockupUrl || 'fairterms-ai.vercel.app'}
          </span>
        </div>
      </div>

      {/* Screenshot */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        {!imgLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,140,0,0.04) 0%, rgba(255,255,255,0.02) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,140,0,0.25)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
        {/* Bottom fade */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   PROJECT CARD – reusable two-column layout
   ══════════════════════════════════════════════════════ */
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project }) => {
  const card = useInView(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={card.ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'center',
        background: 'var(--color-card-bg)',
        border: `1px solid ${hovered ? 'var(--color-card-border-hover)' : 'var(--color-card-border)'}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '20px',
        padding: '36px',
        boxShadow: hovered
          ? '0 20px 60px rgba(255,140,0,0.08), 0 0 0 1px rgba(255,140,0,0.06)'
          : '0 8px 32px rgba(0,0,0,0.45)',
        opacity: card.isVisible ? 1 : 0,
        transform: card.isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: [
          'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          'border-color 0.35s ease',
          'box-shadow 0.35s ease',
        ].join(', '),
        willChange: 'opacity, transform',
      }}
      className="proj-card"
    >
      {/* ── LEFT: 3D Tilt Mockup (click → GitHub repo) ── */}
      <a
        href={project.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.name} on GitHub`}
        style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}
      >
        <div
          style={{
            opacity: card.isVisible ? 1 : 0,
            transform: card.isVisible ? 'translateX(0)' : 'translateX(-28px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          <TiltMockup src={project.image} alt={project.imageAlt} fullTitle={project.fullTitle} mockupUrl={project.mockupUrl} />
        </div>
      </a>

      {/* ── RIGHT: Details ── */}
      <div
        style={{
          opacity: card.isVisible ? 1 : 0,
          transform: card.isVisible ? 'translateX(0)' : 'translateX(28px)',
          transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.18s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.18s',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Name row: accent bar + name + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            {/* Vertical accent bar */}
            <div
              style={{
                flexShrink: 0,
                width: '3px',
                height: '28px',
                borderRadius: '2px',
                background: 'var(--color-orange)',
                boxShadow: '0 0 10px rgba(255,140,0,0.45)',
              }}
            />
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              {project.name}
            </h3>
          </div>

          {/* Check out button with launching-arrow effect */}
          <CheckOutButton url={project.link} />
        </div>

        {/* Caption */}
        <p
          style={{
            fontSize: '14.5px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            lineHeight: '1.75',
          }}
        >
          {project.caption}
        </p>

        {/* Bullets */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {project.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '13.5px',
                color: 'var(--text-secondary)',
                lineHeight: '1.7',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  color: 'var(--color-orange)',
                  fontSize: '10px',
                  marginTop: '5px',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 0 4px rgba(255,140,0,0.6))',
                }}
              >
                ✦
              </span>
              {b}
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.techs.map((t) => (
            <TechPill key={t} label={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   VIEW ALL PROJECTS BUTTON
   ══════════════════════════════════════════════════════ */
const ViewAllProjectsButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  const ArrowSVG = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '7px 16px',
        borderRadius: '30px',
        background: hovered ? 'rgba(255,140,0,0.15)' : 'rgba(255,140,0,0.08)',
        border: '1px solid rgba(255,140,0,0.45)',
        color: 'var(--color-orange)',
        fontSize: '13px',
        fontWeight: 700,
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.2px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        boxShadow: hovered ? '0 0 15px rgba(255,140,0,0.3)' : 'none',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      View All Projects
      <span
        style={{
          position: 'relative',
          width: '12px',
          height: '12px',
          display: 'inline-flex',
          flexShrink: 0,
        }}
      >
        {/* Arrow A – exits top-right on hover */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.28s cubic-bezier(0.2,0.8,0.2,1), opacity 0.22s ease',
            transform: hovered ? 'translate(7px, -7px)' : 'translate(0, 0)',
            opacity: hovered ? 0 : 1,
          }}
        >
          <ArrowSVG />
        </span>

        {/* Arrow B – enters from bottom-left on hover */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.28s cubic-bezier(0.2,0.8,0.2,1), opacity 0.22s ease',
            transform: hovered ? 'translate(0, 0)' : 'translate(-7px, 7px)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <ArrowSVG />
        </span>
      </span>
    </button>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN PROJECTS SECTION
   ══════════════════════════════════════════════════════ */
interface ProjectsSectionProps {
  onNavigateAll?: () => void;
  showAll?: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigateAll, showAll = false }) => {
  const header = useInView(0.2);

  return (
    <section id="projects" style={{ padding: '100px 0 80px 0', position: 'relative' }}>

      {/* ── Section Header ── */}
      <div
        ref={header.ref}
        style={{
          textAlign: 'center',
          marginBottom: '64px',
          opacity: header.isVisible ? 1 : 0,
          transform: header.isVisible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2
          style={{
            fontSize: '38px',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}
        >
          Stuff I Built
        </h2>

        <div
          style={{
            width: '80px',
            height: '3px',
            borderRadius: '3px',
            background: 'var(--color-orange)',
            margin: '0 auto 18px auto',
            opacity: header.isVisible ? 1 : 0,
            transform: header.isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        />

        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            fontWeight: 400,
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.01em',
          }}
        >
          A multidisciplinary portfolio spanning AI Systems, full-stack production systems, and Mixed Reality.
        </p>
      </div>

      {/* ── Project Cards ── */}
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
        className="proj-cards-list"
      >
        {(showAll ? PROJECTS : PROJECTS.slice(0, 2)).map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* View All Projects Button */}
      {!showAll && onNavigateAll && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '54px' }}>
          <ViewAllProjectsButton onClick={onNavigateAll} />
        </div>
      )}

      {/* ── Scoped responsive styles ── */}
      <style>{`
        @media (max-width: 960px) {
          .proj-card {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
        @media (max-width: 640px) {
          .proj-card {
            padding: 24px !important;
            border-radius: 16px !important;
          }
          .proj-cards-list {
            gap: 28px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
