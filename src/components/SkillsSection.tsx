import React, { useEffect, useRef, useState } from 'react';

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
   COUNT UP COMPONENT
   ══════════════════════════════════════════════════════ */
interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  startTrigger: boolean;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 1000, delay = 0, startTrigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;

    let startTimestamp: number | null = null;
    let timerId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuad: progress * (2 - progress) for smooth deceleration
      const easedProgress = progress * (2 - progress);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        timerId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    const delayTimer = setTimeout(() => {
      timerId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(timerId);
    };
  }, [end, duration, delay, startTrigger]);

  return <>{count}</>;
};

/* ══════════════════════════════════════════════════════
   SKILLS DATA
   ══════════════════════════════════════════════════════ */
interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const SKILLS_DATA: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', percentage: 92 },
      { name: 'C', percentage: 69 },
      { name: 'C#', percentage: 60 },
      { name: 'JavaScript', percentage: 65 },
      { name: 'TypeScript', percentage: 60 },
      { name: 'SQL', percentage: 88 }
    ]
  },
  {
    category: 'AI · ML',
    skills: [
      { name: 'Scikit-learn', percentage: 92 },
      { name: 'Pandas', percentage: 89 },
      { name: 'NumPy', percentage: 86 },
      { name: 'PyTorch', percentage: 69 },
      { name: 'NLP', percentage: 71 },
      { name: 'RAG', percentage: 80 }
    ]
  },
  {
    category: 'Data Analytics and Visualization',
    skills: [
      { name: 'Matplotlib', percentage: 90 },
      { name: 'Seaborn', percentage: 83 }
    ]
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML', percentage: 90 },
      { name: 'CSS', percentage: 85 },
      { name: 'React', percentage: 80 },
      { name: 'Next.js', percentage: 72 },
      { name: 'TailwindCSS', percentage: 70 },
      { name: 'Responsive Design', percentage: 88 }
    ]
  },
  {
    category: 'Backend and APIs',
    skills: [
      { name: 'FastAPI', percentage: 90 },
      { name: 'Node.js', percentage: 70 },
      { name: 'Express.js', percentage: 72 }
    ]
  },
  {
    category: 'Database',
    skills: [
      { name: 'MySQL', percentage: 90 },
      { name: 'MongoDB', percentage: 70 },
      { name: 'SQLite', percentage: 72 },
      { name: 'FAISS', percentage: 82 }
    ]
  },
  {
    category: 'Design',
    skills: [
      { name: 'Figma', percentage: 90 },
      { name: 'Adobe XD', percentage: 92 },
      { name: '2D/3D Games', percentage: 89 }
    ]
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Unity', percentage: 89 },
      { name: 'Git', percentage: 75 },
      { name: 'GitHub', percentage: 90 },
      { name: 'Jupyter', percentage: 81 },
      { name: 'Streamlit', percentage: 89 }
    ]
  }
];

const ACCENT_COLOR = 'var(--color-orange)';

/* ══════════════════════════════════════════════════════
   SKILL CARD COMPONENT
   ══════════════════════════════════════════════════════ */
interface SkillCardProps {
  category: string;
  skills: Skill[];
  cardIndex: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, skills, cardIndex }) => {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`skills-card ${isVisible ? 'is-visible' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${cardIndex * 80}ms`,
      }}
    >
      <div className="skills-category-header">
        {category}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {skills.map((skill, index) => {
          const color = ACCENT_COLOR;
          const staggerDelay = index * 90; // 90ms stagger delay between rows

          return (
            <div key={skill.name} className="skill-row">
              <div className="skill-name">
                {skill.name}
              </div>
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill"
                  style={{
                    backgroundColor: color,
                    transform: isVisible ? `scaleX(${skill.percentage / 100})` : 'scaleX(0)',
                    transition: `transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) ${staggerDelay}ms`,
                    boxShadow: isVisible ? `0 0 10px ${color}25` : 'none',
                  }}
                />
              </div>
              <div className="skill-percentage" style={{ color }}>
                <span className="skill-percentage-num">
                  <CountUp end={skill.percentage} duration={1100} delay={staggerDelay} startTrigger={isVisible} />
                </span>
                %
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN SKILLS SECTION COMPONENT
   ══════════════════════════════════════════════════════ */
const SkillsSection: React.FC = () => {
  const header = useInView(0.2);
  const tagline = useInView(0.1);

  return (
    <section id="skills" style={{ padding: '100px 0 80px 0', position: 'relative' }}>
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
          Skills
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
          Tech stack & tools I actually use.
        </p>
      </div>

      {/* ── Grid of cards ── */}
      <div className="skills-grid">
        {SKILLS_DATA.map((cat, i) => (
          <SkillCard
            key={cat.category}
            category={cat.category}
            skills={cat.skills}
            cardIndex={i}
          />
        ))}
      </div>

      {/* ── Closing Tagline ── */}
      <div
        ref={tagline.ref}
        style={{
          textAlign: 'center',
          marginTop: '48px',
          padding: '0 24px',
          opacity: tagline.isVisible ? 0.8 : 0,
          transform: tagline.isVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
        }}
      >
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            fontWeight: 400,
            fontFamily: 'var(--font-sans)',
            fontStyle: 'italic',
            letterSpacing: '0.02em',
            lineHeight: '1.5',
          }}
        >
          &hellip;and many more tools picked based on the problem, not the buzzwords.
        </p>
      </div>

      {/* ── Scoped CSS Styles ── */}
      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .skills-card {
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .skills-card:hover {
          border-color: var(--color-card-border-hover);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px 0 rgba(255, 140, 0, 0.08);
        }

        .skills-category-header {
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--text-secondary);
          text-transform: uppercase;
          padding-bottom: 10px;
          margin-bottom: 22px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-mono);
        }

        .skill-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .skill-name {
          width: 140px;
          min-width: 140px;
          font-size: 14.5px;
          color: #FFFFFF;
          font-weight: 500;
          font-family: var(--font-sans);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .skill-bar-track {
          flex: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .skill-bar-fill {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          border-radius: 3px;
          transform-origin: left;
        }

        .skill-percentage {
          width: 50px;
          min-width: 50px;
          text-align: right;
          font-size: 14.5px;
          font-weight: 700;
          font-family: var(--font-mono);
        }

        .skill-percentage-num {
          font-weight: 700;
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 960px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 560px) {
          .skills-card {
            padding: 20px;
          }
          
          .skill-name {
            width: 110px;
            min-width: 110px;
            font-size: 13.5px;
          }

          .skill-percentage {
            font-size: 13.5px;
            width: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
