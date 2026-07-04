import React, { useState } from 'react';
import ProjectsSection from './ProjectsSection';

interface ProjectsPageProps {
  onBack: () => void;
}

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 18px',
        borderRadius: '30px',
        background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
        border: hovered ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.12)',
        color: '#FFFFFF',
        fontSize: '13px',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        boxShadow: hovered ? '0 4px 12px rgba(255,255,255,0.05)' : 'none',
        transform: hovered ? 'translateX(-2px)' : 'translateX(0)',
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      Back
    </button>
  );
};

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack }) => {
  return (
    <main
      style={{
        flex: 1,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '120px 24px 80px 24px',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
      }}
    >
      {/* Top-left Back button */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '32px' }}>
        <BackButton onClick={onBack} />
      </div>

      <ProjectsSection showAll={true} />
    </main>
  );
};

export default ProjectsPage;
