import React, { useEffect, useState } from 'react';

interface TypingHeadingProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const TypingHeading: React.FC<TypingHeadingProps> = ({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: number;

    if (isDeleting) {
      timer = window.setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timer = window.setTimeout(() => {
        setText((prev) => currentPhrase.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === currentPhrase) {
      timer = window.setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {text}
      <span
        style={{
          marginLeft: '2px',
          borderRight: '3px solid var(--color-orange)',
          animation: 'blink 0.75s step-end infinite',
        }}
      />
      <style>{`
        @keyframes blink {
          from, to { border-color: transparent }
          50% { border-color: var(--color-orange); }
        }
      `}</style>
    </span>
  );
};

export default TypingHeading;
