import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        width: '100%',
        padding: '54px 24px 40px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      {/* Made with [heart] by Yashwanth S T. */}
      <div
        style={{
          fontSize: '14.5px',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          flexWrap: 'wrap',
        }}
      >
        <span>Made with</span>
        <span
          className="footer-heart-icon"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-orange)',
            animation: 'pulse 1.4s ease-in-out infinite',
            transformOrigin: 'center',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="currentColor"
            style={{ display: 'block' }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
        <span>by Yashwanth S T.</span>
      </div>

      {/* © 2026 All rights reserved. */}
      <div
        style={{
          fontSize: '12.5px',
          color: 'rgba(255, 255, 255, 0.35)',
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          letterSpacing: '0.02em',
        }}
      >
        &copy; 2026 All rights reserved.
      </div>

      {/* Pulsing heart keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.18);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
