import React, { useEffect, useRef, useState } from 'react';

/* ─── Contact Info Data ─── */
const CONTACT_ITEMS = [
  {
    label: 'Email',
    value: 'yashwanthst2006@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4l-10 8L2 4" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Chennai, Tamil Nadu, India',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Education',
    value: 'B.E Computer Science and Engineering\n(Artificial Intelligence & Machine Learning)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
      </svg>
    ),
  },
];

/* ─── Education Data ─── */
const EDUCATION = [
  {
    title: 'B.E Computer Science and Engineering\n(Artificial Intelligence & Machine Learning)',
    institution: 'Sri Sairam Engineering College',
    duration: '2024 – Present',
    score: 'CGPA: 8.1 / 10.0',
  },
  {
    title: 'Higher Secondary Education',
    institution: 'Velammal Vidhyashram, Padappai',
    duration: '2022 – 2024',
    score: 'Percentage: 79 / 100',
  },
  {
    title: 'Secondary Education',
    institution: 'Velammal Vidhyashram, Padappai',
    duration: '2022',
    score: 'Percentage: 82 / 100',
  },
];

/* ─── Intersection Observer Hook ─── */
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

/* ─── About Section Component ─── */
const AboutSection: React.FC = () => {
  const header = useInView(0.2);
  const leftCard = useInView(0.1);
  const rightCard = useInView(0.1);

  return (
    <section id="about" style={{ padding: '100px 0 60px 0', position: 'relative' }}>

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
          About Me
        </h2>

        {/* Accent line */}
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
          Get to know the person behind the code.
        </p>
      </div>

      {/* ── Two‑Column Grid ── */}
      <div className="about-grid">

        {/* ━━━━━ LEFT: Personal Info Card ━━━━━ */}
        <div
          ref={leftCard.ref}
          className="glass-panel about-left-card"
          style={{
            opacity: leftCard.isVisible ? 1 : 0,
            transform: leftCard.isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* About paragraph */}
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '15px',
              lineHeight: '1.8',
              fontWeight: 400,
              marginBottom: '28px',
            }}
          >
            I am an AI &amp; Machine Learning student who enjoys building intelligent applications
            and solving real-world problems through technology. My interests span Artificial
            Intelligence, Machine Learning, Full-Stack Development, and immersive technologies
            like AR/VR. I love learning new technologies, building impactful projects, and
            continuously improving my skills to create innovative digital experiences.
          </p>

          {/* Contact items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {CONTACT_ITEMS.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255, 140, 0, 0.08)',
                    border: '1px solid rgba(255, 140, 0, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-orange)',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '3px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#FFFFFF',
                      fontWeight: 500,
                      lineHeight: '1.5',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ━━━━━ RIGHT: Education Timeline ━━━━━ */}
        <div
          ref={rightCard.ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            opacity: rightCard.isVisible ? 1 : 0,
            transform: rightCard.isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
          }}
        >
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              color: '#FFFFFF',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
            </svg>
            Education
          </h3>

          {EDUCATION.map((edu, idx) => (
            <EducationCard key={idx} {...edu} delay={idx * 0.12} parentVisible={rightCard.isVisible} />
          ))}
        </div>
      </div>

      {/* ── Scoped Styles ── */}
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 36px;
          align-items: stretch;
        }

        .about-left-card {
          padding: 36px !important;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 600px) {
          .about-left-card {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ─── Education Card Sub‑component ─── */
const EducationCard: React.FC<{
  title: string;
  institution: string;
  duration: string;
  score: string;
  delay: number;
  parentVisible: boolean;
}> = ({ title, institution, duration, score, delay, parentVisible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-card-bg)',
        border: `1px solid ${hovered ? 'var(--color-card-border-hover)' : 'var(--color-card-border)'}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '16px',
        padding: '24px 28px',
        boxShadow: hovered
          ? '0 12px 40px 0 rgba(255, 140, 0, 0.08)'
          : '0 12px 40px 0 rgba(0, 0, 0, 0.5)',
        transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transform: hovered
          ? 'translateY(-4px)'
          : parentVisible
            ? 'translateY(0)'
            : 'translateY(20px)',
        opacity: parentVisible ? 1 : 0,
        transitionDelay: `${delay}s`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            color: '#FFFFFF',
            lineHeight: '1.45',
            marginBottom: '8px',
            whiteSpace: 'pre-line',
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontSize: '13.5px',
            color: 'var(--text-secondary)',
            fontWeight: 400,
            marginBottom: '6px',
          }}
        >
          {institution}
        </p>
        <span
          style={{
            fontSize: '12px',
            color: 'var(--color-orange)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            letterSpacing: '0.3px',
          }}
        >
          {duration}
        </span>
      </div>

      <div
        style={{
          flexShrink: 0,
          padding: '8px 16px',
          background: 'rgba(255, 140, 0, 0.06)',
          border: '1px solid rgba(255, 140, 0, 0.12)',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-orange)',
          whiteSpace: 'nowrap',
        }}
      >
        {score}
      </div>
    </div>
  );
};

export default AboutSection;
