import React, { useEffect, useRef, useState } from 'react';

/* ══════════════════════════════════════════════════════
   TECH LOGOS – identical to previous version
   ══════════════════════════════════════════════════════ */
const TECH_LOGOS: Record<string, React.ReactNode> = {
  'Full-Stack Web Development': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  'Backend APIs': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  'React + Next.js': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="none">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
    </svg>
  ),
  'Node.js + Express': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="none">
      <path d="M12 2L2 7l10 5 10-5-10-5-10-5zm0 5L4 11.5 12 16l8-4.5L12 7zM2 17l10 5 10-5-10-5-10 5z" fill="#68A063" />
    </svg>
  ),
  'MongoDB': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v8h-2zm0 10h2v2h-2z" fill="#4DB33D" />
    </svg>
  ),
  'Git': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="none">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="#F05032" />
    </svg>
  ),
  'GitHub': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  'Python': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="none">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.887S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031v-2.868s-.109-3.402 3.345-3.402h5.766s3.237.052 3.237-3.13V3.13S18.28 0 11.914 0zm-3.21 1.814a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z" fill="#3670A0" />
      <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.134S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.031v2.868s.109 3.402-3.345 3.402H9.455S6.218 12.286 6.218 15.468v5.402S5.72 24 12.086 24zm3.21-1.814a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z" fill="#FFD43B" />
    </svg>
  ),
  'NumPy': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="none">
      <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="#4DABCF" opacity="0.85" />
      <polyline points="2,7 12,12 22,7" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
      <line x1="12" y1="12" x2="12" y2="22" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.5" />
    </svg>
  ),
  'Pandas': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="none">
      <rect x="4" y="2" width="4" height="20" rx="2" fill="#130754" />
      <rect x="16" y="2" width="4" height="20" rx="2" fill="#E70488" />
      <rect x="9" y="8" width="6" height="4" rx="1" fill="#130754" />
      <rect x="9" y="14" width="6" height="4" rx="1" fill="#E70488" />
    </svg>
  ),
  'Scikit-Learn': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="none">
      <circle cx="12" cy="12" r="10" fill="#F89939" opacity="0.15" />
      <path d="M12 5l2 4h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" fill="#F89939" />
    </svg>
  ),
  'Hugging Face': (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none" stroke="none">
      <circle cx="16" cy="16" r="14" fill="#FFD21E" opacity="0.2" />
      <ellipse cx="10" cy="13" rx="2" ry="2.5" fill="#FFD21E" />
      <ellipse cx="22" cy="13" rx="2" ry="2.5" fill="#FFD21E" />
      <path d="M10 20 Q16 26 22 20" stroke="#FFD21E" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════
   EXPERIENCE DATA – identical content, unchanged
   ══════════════════════════════════════════════════════ */
interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  badge: string;
  period: string;
  bullets: string[];
  techs: string[];
  certificateUrl?: string;
  certificateName?: string;
  lorUrl?: string;
  lorName?: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 0,
    title: 'Full Stack Web Development Intern',
    company: 'Elevenceskills',
    badge: 'Internship',
    period: 'June 2026 – Present',
    bullets: [
      'Developing responsive frontend interfaces using React and Next.js, focusing on performance, accessibility, and a seamless user experience.',
      'Building and integrating scalable RESTful backend APIs with Node.js and Express, including JWT-based authentication and role management.',
      'Designing MongoDB database schemas to support community features such as Q&A threads, voting systems, and social interactions inspired by Stack Overflow.',
      'Collaborating via Git and GitHub using structured branching, code reviews, and pull requests to maintain clean, production-ready code.',
    ],
    techs: [
      'Full-Stack Web Development',
      'Backend APIs',
      'React + Next.js',
      'Node.js + Express',
      'MongoDB',
      'Git',
      'GitHub',
    ],
    certificateUrl: '/certificates/Yashwanth%20S%20T-ElevanceSkills-Training-Certificate.pdf',
    certificateName: 'Yashwanth_Experience_Certificate.pdf',
    lorUrl: '/certificates/ElevanceSkills-LOR-Letter.pdf',
    lorName: 'Yashwanth_Letter_of_Recommendation.pdf',
  },
  {
    id: 1,
    title: 'Artificial Intelligence & Machine Learning Intern',
    company: '8 Queens Software Technologies Pvt. Ltd.',
    badge: 'Internship',
    period: 'June 2026 – July 2026',
    bullets: [
      'Strengthened Python programming fundamentals and applied them to build practical AI and Machine Learning projects.',
      'Implemented supervised learning algorithms including linear regression, decision trees, and classification models using Scikit-Learn.',
      'Performed data preprocessing, feature engineering, and exploratory analysis on real-world datasets using NumPy and Pandas.',
      'Explored Hugging Face Transformers for introductory NLP tasks and developed an understanding of model evaluation metrics.',
    ],
    techs: [
      'Python',
      'NumPy',
      'Pandas',
      'Scikit-Learn',
      'Hugging Face',
      'Git',
      'GitHub',
    ],
    certificateUrl: '/certificates/Yashwanth S T-8Queens-OL.pdf',
    certificateName: 'Yashwanth S T-8Queens-OL.pdf',
  },
];

/* ══════════════════════════════════════════════════════
   TECH PILL – identical styling
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
        gap: '6px',
        padding: '6px 14px',
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
        <span style={{ display: 'flex', alignItems: 'center', opacity: hovered ? 1 : 0.7, transition: 'opacity 0.3s' }}>
          {TECH_LOGOS[label]}
        </span>
      )}
      {label}
    </span>
  );
};

/* ══════════════════════════════════════════════════════
   CERTIFICATE & RECOMMENDATION BUTTONS
   ══════════════════════════════════════════════════════ */
const CertButton: React.FC<{ downloadUrl: string; fileName?: string }> = ({ downloadUrl, fileName }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={downloadUrl}
      download={fileName}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: hovered ? 'rgba(255,140,0,0.12)' : 'transparent',
        color: hovered ? '#FFFFFF' : 'var(--color-orange)',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        fontSize: '13.5px',
        letterSpacing: '0.3px',
        padding: '10px 20px',
        borderRadius: '10px',
        border: `1px solid ${hovered ? 'rgba(255,140,0,0.5)' : 'rgba(255,140,0,0.3)'}`,
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(255,140,0,0.14)' : 'none',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
      Experience Certificate
    </a>
  );
};

const LorButton: React.FC<{ downloadUrl: string; fileName?: string }> = ({ downloadUrl, fileName }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={downloadUrl}
      download={fileName}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: hovered ? 'rgba(255,140,0,0.12)' : 'transparent',
        color: hovered ? '#FFFFFF' : 'var(--color-orange)',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        fontSize: '13.5px',
        letterSpacing: '0.3px',
        padding: '10px 20px',
        borderRadius: '10px',
        border: `1px solid ${hovered ? 'rgba(255,140,0,0.5)' : 'rgba(255,140,0,0.3)'}`,
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(255,140,0,0.14)' : 'none',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
      Letter of Recommendation
    </a>
  );
};

/* ══════════════════════════════════════════════════════
   EXPERIENCE CARD
   ══════════════════════════════════════════════════════ */
const ExperienceCard: React.FC<{
  exp: ExperienceItem;
}> = ({ exp }) => {
  return (
    <div
      className="exp-card"
      style={{
        background: 'var(--color-card-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '16px',
        overflow: 'hidden',
        willChange: 'transform, border-color, box-shadow',
      }}
    >
      {/* ── Always-visible header ── */}
      <div style={{ padding: '24px 28px 20px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontSize: '17px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
                lineHeight: 1.4,
                marginBottom: '6px',
              }}
            >
              {exp.title}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '14px',
                  color: 'var(--color-orange)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                }}
              >
                {exp.company}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '2px 10px',
                  background: 'rgba(255,140,0,0.08)',
                  border: '1px solid rgba(255,140,0,0.22)',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-orange)',
                  letterSpacing: '0.5px',
                }}
              >
                {exp.badge}
              </span>
            </div>
          </div>
          {/* Date badge */}
          <div
            style={{
              flexShrink: 0,
              padding: '6px 14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            {exp.period}
          </div>
        </div>
      </div>

      {/* ── Card body (always expanded) ── */}
      <div style={{ padding: '0 28px 28px 28px' }}>
        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '18px' }} />

        {/* Bullets */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {exp.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: '1.7',
                fontWeight: 400,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--color-orange)',
                  marginTop: '9px',
                  boxShadow: '0 0 6px rgba(255,140,0,0.55)',
                }}
              />
              {b}
            </li>
          ))}
        </ul>

        {/* Certificate & LOR Buttons */}
        {(exp.certificateUrl || exp.lorUrl) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
            {exp.certificateUrl && (
              <CertButton downloadUrl={exp.certificateUrl} fileName={exp.certificateName} />
            )}
            {exp.lorUrl && (
              <LorButton downloadUrl={exp.lorUrl} fileName={exp.lorName} />
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '18px' }} />

        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {exp.techs.map((t) => (
            <TechPill key={t} label={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   TIMELINE NODE
   ══════════════════════════════════════════════════════ */
const TimelineNode: React.FC = () => (
  <div className="exp-timeline-node" />
);

/* ══════════════════════════════════════════════════════
   DRONE INDICATOR (glowing circular indicator with pulse and spikes)
   ══════════════════════════════════════════════════════ */
const DroneIndicator: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ overflow: 'visible' }}>
    <defs>
      <filter id="drone-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Radiating spikes */}
    <line x1="20" y1="2" x2="20" y2="8" stroke="var(--color-orange)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <line x1="20" y1="32" x2="20" y2="38" stroke="var(--color-orange)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <line x1="2" y1="20" x2="8" y2="20" stroke="var(--color-orange)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <line x1="32" y1="20" x2="38" y2="20" stroke="var(--color-orange)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

    {/* Diagonals */}
    <line x1="7" y1="7" x2="12" y2="12" stroke="var(--color-orange)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="28" y1="28" x2="33" y2="33" stroke="var(--color-orange)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="33" y1="7" x2="28" y2="12" stroke="var(--color-orange)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="12" y1="28" x2="7" y2="33" stroke="var(--color-orange)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

    {/* Pulsing ring */}
    <circle cx="20" cy="20" r="14" stroke="var(--color-orange)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" className="drone-pulse-ring" />

    {/* Outer glow ring */}
    <circle cx="20" cy="20" r="8" stroke="var(--color-orange)" strokeWidth="1.5" opacity="0.3" />

    {/* Center glowing orb */}
    <circle cx="20" cy="20" r="5" fill="var(--color-orange)" filter="url(#drone-glow)" />
    <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
  </svg>
);

/* ══════════════════════════════════════════════════════
   MAIN EXPERIENCE SECTION
   ══════════════════════════════════════════════════════ */
const ExperienceSection: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const altWrapperRef = useRef<HTMLDivElement>(null);
  const lineTrackRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const connRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>(new Array(EXPERIENCES.length).fill(false));

  const trackTopRef = useRef<number>(0);
  const trackHeightRef = useRef<number>(0);
  const nodeOffsets = useRef<number[]>([]);

  // Refs to cache DOM elements for performance
  const measuredNodesRef = useRef<HTMLDivElement[]>([]);
  const measuredConnectorsRef = useRef<HTMLDivElement[]>([]);
  const measuredCardsRef = useRef<HTMLDivElement[]>([]);

  /* ── Header fade-in via IntersectionObserver ── */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Card/Timeline entrance trigger via IntersectionObserver ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(prev => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            // Spawn each card once, not on every scroll
            observer.unobserve(cardEl);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      observer.observe(cardEl);
      observers.push(observer);
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  /* ── Layout offsets measurement function ── */
  const measurePositions = () => {
    const wrapper = altWrapperRef.current;
    const lineTrack = lineTrackRef.current;
    if (!wrapper || !lineTrack) return;

    const validNodes = nodeRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (validNodes.length < 2) return;

    const wrapperRect = wrapper.getBoundingClientRect();

    const firstNodeRect = validNodes[0].getBoundingClientRect();
    const lastNodeRect = validNodes[validNodes.length - 1].getBoundingClientRect();

    const firstNodeCenter = (firstNodeRect.top + firstNodeRect.height / 2) - wrapperRect.top;
    const lastNodeCenter = (lastNodeRect.top + lastNodeRect.height / 2) - wrapperRect.top;

    // Center vertical line runs exactly from first node center to last node center
    lineTrack.style.top = `${firstNodeCenter}px`;
    lineTrack.style.height = `${lastNodeCenter - firstNodeCenter}px`;

    // Cache scroll tracking offsets relative to the document
    trackTopRef.current = firstNodeCenter + wrapperRect.top + window.scrollY;
    trackHeightRef.current = lastNodeCenter - firstNodeCenter;

    nodeOffsets.current = validNodes.map(nodeEl => {
      const nodeRect = nodeEl.getBoundingClientRect();
      const nodeCenter = nodeRect.top + nodeRect.height / 2 + window.scrollY;
      return nodeCenter - trackTopRef.current;
    });

    // Cache the validated elements for direct DOM manipulation in the scroll update loop
    measuredNodesRef.current = validNodes;
    measuredConnectorsRef.current = connRefs.current.filter((el): el is HTMLDivElement => el !== null);
    measuredCardsRef.current = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
  };

  /* ── ResizeObserver to dynamically update line coordinates ── */
  useEffect(() => {
    if (!altWrapperRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      measurePositions();
    });
    resizeObserver.observe(altWrapperRef.current);

    measurePositions();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /* ── Scroll progress and trailing animation loop ── */
  useEffect(() => {
    let targetY = 0;
    let currentY = 0;
    let isInitialized = false;
    let animationFrameId: number;

    const handleScroll = () => {
      if (trackHeightRef.current === 0) return;
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const relativeCenter = viewportCenter - trackTopRef.current;
      const progress = Math.max(0, Math.min(1, relativeCenter / trackHeightRef.current));
      targetY = progress * trackHeightRef.current;
    };

    const updateLoop = () => {
      if (!isInitialized) {
        currentY = targetY;
        isInitialized = true;
      } else {
        // Inertia follower (lag/lerp): currentY += (targetY - currentY) * 0.08
        currentY += (targetY - currentY) * 0.08;
      }

      // 1. Position drone (shift y by -20px to center it at currentY)
      if (droneRef.current) {
        droneRef.current.style.transform = `translate3d(-50%, ${currentY - 20}px, 0)`;
      }

      // 2. Scale the vertical fill line to draw behind the drone
      if (lineFillRef.current && trackHeightRef.current > 0) {
        lineFillRef.current.style.transform = `scaleY(${currentY / trackHeightRef.current})`;
      }

      // 3. Directly update passed timeline elements in the DOM (very performant)
      measuredNodesRef.current.forEach((nodeEl, idx) => {
        const offset = nodeOffsets.current[idx];
        if (offset === undefined) return;

        // A node is past/active when the drone is within 10px of its center or past it
        const isPast = currentY >= offset - 10;

        const nodeInner = nodeEl.querySelector('.exp-timeline-node');
        if (nodeInner) {
          if (isPast) {
            nodeInner.classList.add('is-past');
          } else {
            nodeInner.classList.remove('is-past');
          }
        }
      });

      measuredConnectorsRef.current.forEach((connEl, idx) => {
        const offset = nodeOffsets.current[idx];
        if (offset === undefined) return;

        const isPast = currentY >= offset - 10;
        if (isPast) {
          connEl.classList.add('is-past');
        } else {
          connEl.classList.remove('is-past');
        }
      });

      measuredCardsRef.current.forEach((cardEl, idx) => {
        const offset = nodeOffsets.current[idx];
        if (offset === undefined) return;

        const isPast = currentY >= offset - 10;
        const cardInner = cardEl.querySelector('.exp-card');
        if (cardInner) {
          if (isPast) {
            cardInner.classList.add('is-past');
          } else {
            cardInner.classList.remove('is-past');
          }
        }
      });

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    handleScroll();
    updateLoop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      id="experience-outer"
      ref={outerRef}
      style={{ position: 'relative', width: '100%' }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 0 40px 0',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Section Header ── */}
        <div
          id="experience"
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '52px',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(28px)',
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
            My Experience
          </h2>

          <div
            style={{
              width: '80px',
              height: '3px',
              borderRadius: '3px',
              background: 'var(--color-orange)',
              margin: '0 auto 18px auto',
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'scaleX(1)' : 'scaleX(0)',
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
            A timeline of my professional journey.
          </p>
        </div>

        {/* ── Timeline Body ── */}
        <div className="exp-alt-wrapper" ref={altWrapperRef}>
          {/* ════ CENTER SPINE ════ */}
          <div className="exp-center-spine">
            <div className="exp-line-track" ref={lineTrackRef}>
              <div
                ref={lineFillRef}
                className="exp-line-fill"
              />
              <div
                ref={droneRef}
                className="exp-drone-container"
              >
                <DroneIndicator />
              </div>
            </div>
          </div>

          {/* ════ ALTERNATING ENTRIES ════ */}
          <div className="exp-entries-col">
            {EXPERIENCES.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={exp.id} className={`exp-entry exp-entry--${isLeft ? 'left' : 'right'}`}>

                  {/* Card side */}
                  <div className="exp-card-area">
                    <div
                      className={`exp-card-slot ${revealed[i] ? 'is-revealed' : ''}`}
                      ref={el => { cardRefs.current[i] = el; }}
                    >
                      <ExperienceCard exp={exp} />
                    </div>
                  </div>

                  {/* Center Node / Connector */}
                  <div className="exp-node-col">
                    <div
                      className={`exp-h-connector ${revealed[i] ? 'is-revealed' : ''}`}
                      ref={el => { connRefs.current[i] = el; }}
                    />

                    <div
                      className={`exp-node-wrapper ${revealed[i] ? 'is-revealed' : ''}`}
                      ref={el => { nodeRefs.current[i] = el; }}
                    >
                      <TimelineNode />
                    </div>

                    <span
                      className="exp-index-label"
                      style={{
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {`0${i + 1}`}
                    </span>
                  </div>

                  <div className="exp-empty-area" />

                  {i < EXPERIENCES.length - 1 && (
                    <div className="exp-entry-gap" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dronePulse {
          0% { transform: scale(0.9); opacity: 0.3; }
          50% { transform: scale(1.25); opacity: 0.8; }
          100% { transform: scale(0.9); opacity: 0.3; }
        }
        .drone-pulse-ring {
          transform-origin: 20px 20px;
          animation: dronePulse 2s ease-in-out infinite;
        }
        .exp-drone-container {
          position: absolute;
          left: 50%;
          top: 0;
          width: 40px;
          height: 40px;
          z-index: 10;
          pointer-events: none;
        }

        .exp-alt-wrapper {
          position: relative;
          width: 100%;
          overflow: clip;
        }

        .exp-center-spine {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          pointer-events: none;
          z-index: 4;
        }

        .exp-line-track {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
        }

        .exp-line-fill {
          position: absolute;
          inset: 0;
          background: var(--color-orange);
          box-shadow: 0 0 12px var(--color-orange);
          border-radius: 2px;
          transform-origin: top center;
          transform: scaleY(0);
          will-change: transform;
        }

        .exp-entries-col {
          position: relative;
          z-index: 3;
          width: 100%;
          padding: 8px 0 0 0;
        }

        .exp-entry {
          display: grid;
          grid-template-columns: 1fr 80px 1fr;
          grid-template-rows: auto auto;
          grid-template-areas:
            "card node empty"
            "gap  gap  gap";
          align-items: start;
          position: relative;
        }

        .exp-entry--right {
          grid-template-areas:
            "empty node card"
            "gap   gap  gap";
        }

        .exp-card-area  { grid-area: card;  display: flex; flex-direction: column; }
        .exp-node-col   { grid-area: node;  display: flex; flex-direction: column; align-items: center; padding-top: 26px; }
        .exp-empty-area { grid-area: empty; }
        .exp-entry-gap  { grid-area: gap;   height: 36px; }

        .exp-entry--left  .exp-card-area  { padding-right: 20px; }
        .exp-entry--right .exp-card-area  { padding-left:  20px; }

        /* ── CARD ENTER/REVEAL TRANSITIONS ── */
        .exp-card-slot {
          width: 100%;
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .exp-entry--left .exp-card-slot {
          transform: translate3d(-50px, 0, 0);
        }
        .exp-entry--right .exp-card-slot {
          transform: translate3d(50px, 0, 0);
        }
        .exp-card-slot.is-revealed {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ── CONNECTOR AND NODE REVEALS ── */
        .exp-h-connector {
          position: absolute;
          top: 34px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), background 0.4s ease, box-shadow 0.4s ease;
        }
        .exp-entry--left .exp-h-connector {
          right: 50%;
          width: 60px;
          transform: scaleX(0);
          transform-origin: right center;
        }
        .exp-entry--right .exp-h-connector {
          left: 50%;
          width: 60px;
          transform: scaleX(0);
          transform-origin: left center;
        }
        .exp-h-connector.is-revealed {
          opacity: 1;
          transform: scaleX(1);
        }
        .exp-h-connector.is-past {
          background: var(--color-orange);
          box-shadow: 0 0 8px rgba(255, 140, 0, 0.4);
        }

        .exp-node-wrapper {
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .exp-node-wrapper.is-revealed {
          opacity: 1;
          transform: scale(1);
        }

        /* ── TIMELINE NODE ── */
        .exp-timeline-node {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          flex-shrink: 0;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.15);
          box-shadow: none;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .exp-timeline-node::after {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          box-shadow: none;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .exp-timeline-node.is-past {
          background: rgba(255, 140, 0, 0.15);
          border-color: var(--color-orange);
          box-shadow: 0 0 12px rgba(255, 140, 0, 0.6), inset 0 0 6px rgba(255, 140, 0, 0.4);
        }
        .exp-timeline-node.is-past::after {
          background: var(--color-orange);
          box-shadow: 0 0 6px var(--color-orange);
        }

        /* ── INDEX LABEL ── */
        .exp-index-label {
          margin-top: 8px;
          font-size: 12px;
          font-family: var(--font-mono);
          letter-spacing: 0.5px;
          opacity: 0.75;
        }

        /* ── CARD STYLING & ACCENT BORDERS ── */
        .exp-card {
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35);
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .exp-card:hover {
          transform: translateY(-3px);
        }

        .exp-entry--left .exp-card {
          border-right: 3px solid rgba(255, 255, 255, 0.12);
        }
        .exp-entry--right .exp-card {
          border-left: 3px solid rgba(255, 255, 255, 0.12);
        }

        .exp-entry--left .exp-card.is-past {
          border-right: 3px solid var(--color-orange);
        }
        .exp-entry--right .exp-card.is-past {
          border-left: 3px solid var(--color-orange);
        }

        .exp-card.is-past {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }
        .exp-card.is-past:hover {
          box-shadow: 0 20px 56px rgba(255, 140, 0, 0.12), 0 0 0 1px rgba(255, 140, 0, 0.08);
        }

        /* ══════════════ TABLET (≤ 900px) ══════════════ */
        @media (max-width: 900px) {
          .exp-entry {
            grid-template-columns: 1fr 60px 1fr;
          }
          .exp-center-spine {
            width: 60px;
          }
        }

        /* ══════════════ MOBILE (≤ 640px) ══════════════ */
        @media (max-width: 640px) {
          .exp-entry,
          .exp-entry--right {
            grid-template-columns: 40px 1fr;
            grid-template-areas:
              "node card"
              "gap  gap";
          }

          .exp-empty-area { display: none; }

          .exp-entry--left  .exp-card-area { padding-right: 0; padding-left: 12px; }
          .exp-entry--right .exp-card-area { padding-left:  12px; padding-right: 0; }

          .exp-center-spine {
            left: 20px;
            transform: none;
            width: 40px;
          }

          .exp-line-track {
            left: 20px;
            transform: none;
          }

          .exp-h-connector {
            top: 28px;
          }
          .exp-entry--left .exp-h-connector,
          .exp-entry--right .exp-h-connector {
            left: 20px;
            right: auto;
            width: 32px;
            transform-origin: left center;
          }

          .exp-node-col {
            padding-top: 22px;
          }

          /* Force left borders on mobile cards */
          .exp-entry--left .exp-card {
            border-right: 1px solid var(--color-card-border) !important;
            border-left: 3px solid rgba(255, 255, 255, 0.12) !important;
          }
          .exp-entry--left .exp-card.is-past {
            border-left: 3px solid var(--color-orange) !important;
          }
          .exp-entry--right .exp-card {
            border-left: 3px solid rgba(255, 255, 255, 0.12) !important;
          }
          .exp-entry--right .exp-card.is-past {
            border-left: 3px solid var(--color-orange) !important;
          }

          .exp-entry--left .exp-card-slot {
            transform: translate3d(40px, 0, 0);
          }
          .exp-entry--right .exp-card-slot {
            transform: translate3d(40px, 0, 0);
          }
        }

        @media (max-width: 480px) {
          .exp-node-col {
            padding-top: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default ExperienceSection;
