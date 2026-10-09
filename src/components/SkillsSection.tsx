import React, { useEffect, useRef, useState } from 'react';
import {
  SiPython,
  SiC,
  SiJavascript,
  SiTypescript,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiPytorch,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFastapi,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiFigma,
  SiUnity,
  SiGit,
  SiGithub,
  SiJupyter,
  SiStreamlit,
} from 'react-icons/si';
import {
  TbBrandCSharp,
  TbBrandCss3,
  TbBrandAdobe,
  TbDatabase,
  TbBrain,
  TbFileSearch,
  TbChartScatter,
  TbChartLine,
  TbDevices,
  TbVectorTriangle,
  TbDeviceGamepad2,
} from 'react-icons/tb';

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
   SKILLS DATA DEFINITIONS
   ══════════════════════════════════════════════════════ */
interface SkillItemData {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  category: string;
  skills: SkillItemData[];
}

const SKILLS_DATA: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', icon: <SiPython size={17} /> },
      { name: 'C', icon: <SiC size={17} /> },
      { name: 'C#', icon: <TbBrandCSharp size={18} /> },
      { name: 'JavaScript', icon: <SiJavascript size={17} /> },
      { name: 'TypeScript', icon: <SiTypescript size={17} /> },
      { name: 'SQL', icon: <TbDatabase size={18} /> },
    ],
  },
  {
    category: 'AI · ML',
    skills: [
      { name: 'Scikit-learn', icon: <SiScikitlearn size={17} /> },
      { name: 'Pandas', icon: <SiPandas size={17} /> },
      { name: 'NumPy', icon: <SiNumpy size={17} /> },
      { name: 'PyTorch', icon: <SiPytorch size={17} /> },
      { name: 'NLP', icon: <TbBrain size={18} /> },
      { name: 'RAG', icon: <TbFileSearch size={18} /> },
    ],
  },
  {
    category: 'Data Analytics and Visualization',
    skills: [
      { name: 'Matplotlib', icon: <TbChartLine size={18} /> },
      { name: 'Seaborn', icon: <TbChartScatter size={18} /> },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML', icon: <SiHtml5 size={17} /> },
      { name: 'CSS', icon: <TbBrandCss3 size={18} /> },
      { name: 'React', icon: <SiReact size={17} /> },
      { name: 'Next.js', icon: <SiNextdotjs size={17} /> },
      { name: 'TailwindCSS', icon: <SiTailwindcss size={17} /> },
      { name: 'Responsive Design', icon: <TbDevices size={18} /> },
    ],
  },
  {
    category: 'Backend and APIs',
    skills: [
      { name: 'FastAPI', icon: <SiFastapi size={17} /> },
      { name: 'Node.js', icon: <SiNodedotjs size={17} /> },
      { name: 'Express.js', icon: <SiExpress size={17} /> },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MySQL', icon: <SiMysql size={17} /> },
      { name: 'MongoDB', icon: <SiMongodb size={17} /> },
      { name: 'SQLite', icon: <SiSqlite size={17} /> },
      { name: 'FAISS', icon: <TbVectorTriangle size={18} /> },
    ],
  },
  {
    category: 'Design',
    skills: [
      { name: 'Figma', icon: <SiFigma size={17} /> },
      { name: 'Adobe XD', icon: <TbBrandAdobe size={18} /> },
      { name: '2D/3D Games', icon: <TbDeviceGamepad2 size={18} /> },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Unity', icon: <SiUnity size={17} /> },
      { name: 'Git', icon: <SiGit size={17} /> },
      { name: 'GitHub', icon: <SiGithub size={17} /> },
      { name: 'Jupyter', icon: <SiJupyter size={17} /> },
      { name: 'Streamlit', icon: <SiStreamlit size={17} /> },
    ],
  },
];

/* ══════════════════════════════════════════════════════
   SKILL CARD COMPONENT
   ══════════════════════════════════════════════════════ */
interface SkillCardProps {
  category: string;
  skills: SkillItemData[];
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
      <div className="skills-items-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-item">
            <div className="skill-icon-tile">
              {skill.icon}
            </div>
            <span className="skill-item-name" title={skill.name}>
              {skill.name}
            </span>
          </div>
        ))}
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
          align-items: stretch;
        }

        .skills-card {
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: border-box;
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
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-mono);
        }

        .skills-items-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          align-content: start;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          cursor: default;
          transition: transform 250ms ease, border-color 250ms ease, background-color 250ms ease, box-shadow 250ms ease;
          min-width: 0;
          box-sizing: border-box;
        }

        .skill-item:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 140, 0, 0.4);
          background: rgba(255, 140, 0, 0.04);
          box-shadow: 0 4px 14px rgba(255, 140, 0, 0.08);
        }

        .skill-icon-tile {
          width: 32px;
          height: 32px;
          min-width: 32px;
          min-height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 140, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: transform 250ms ease, border-color 250ms ease, color 250ms ease, background-color 250ms ease;
          flex-shrink: 0;
        }

        .skill-item:hover .skill-icon-tile {
          transform: scale(1.08);
          border-color: rgba(255, 140, 0, 0.5);
          background: rgba(255, 140, 0, 0.10);
          color: var(--color-orange);
        }

        .skill-item-name {
          font-size: 13.5px;
          font-weight: 500;
          font-family: var(--font-sans);
          color: rgba(255, 255, 255, 0.9);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: transform 250ms ease, color 250ms ease;
        }

        .skill-item:hover .skill-item-name {
          transform: translateX(2px);
          color: #FFFFFF;
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

          .skills-items-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          
          .skill-item {
            padding: 8px 10px;
          }

          .skill-item-name {
            font-size: 13px;
          }
        }

        /* ── Respect prefers-reduced-motion ── */
        @media (prefers-reduced-motion: reduce) {
          .skill-item,
          .skill-item:hover,
          .skill-icon-tile,
          .skill-item:hover .skill-icon-tile,
          .skill-item-name,
          .skill-item:hover .skill-item-name,
          .skills-card,
          .skills-card:hover {
            transform: none !important;
            transition: border-color 250ms ease, background-color 250ms ease, color 250ms ease, box-shadow 250ms ease !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
