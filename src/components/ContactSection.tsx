import React, { useState, useEffect, useRef } from 'react';

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
   SOCIAL BUTTONS DATA & COMPONENT
   ══════════════════════════════════════════════════════ */
interface SocialLink {
  name: string;
  url: string;
  brandColor: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Gmail',
    url: 'mailto:yashwanthst2006@gmail.com',
    brandColor: '#EA4335',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/yashwanthst/', // placeholder
    brandColor: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    )
  },
  {
    name: 'X',
    url: 'https://x.com/Yashwanthst2006', // placeholder
    brandColor: '#FFFFFF',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/yash__.1106/', // placeholder
    brandColor: '#E1306C',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  }
];

const SocialButton: React.FC<{ link: SocialLink }> = ({ link }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={link.url}
      target={link.url.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={link.name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        background: hovered ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.01)',
        border: `1px solid ${hovered ? link.brandColor : 'rgba(255, 255, 255, 0.08)'}`,
        color: hovered ? link.brandColor : 'var(--text-secondary)',
        boxShadow: hovered ? `0 0 14px ${link.brandColor}25` : 'none',
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transform: hovered ? 'translateY(-2px) scale(1.08)' : 'translateY(0) scale(1)',
      }}
    >
      {link.icon}
    </a>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN CONTACT SECTION COMPONENT
   ══════════════════════════════════════════════════════ */
const ContactSection: React.FC = () => {
  const header = useInView(0.2);
  const card = useInView(0.1);
  const footer = useInView(0.15);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const isEmailValid = (em: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
  };

  const isFormValid = name.trim() !== '' && isEmailValid(email) && message.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Your message has been sent successfully. Thank you!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 0 100px 0', position: 'relative' }}>
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
          Contact Me
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
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          For internships, AI engineering work, hackathon teams, or just to talk about the ideas, feel free to send me a message.
        </p>
      </div>

      {/* ── Form Card ── */}
      <div
        ref={card.ref}
        className={`contact-card ${card.isVisible ? 'is-visible' : ''}`}
        style={{
          maxWidth: '700px',
          margin: '0 auto 54px auto',
          opacity: card.isVisible ? 1 : 0,
          transform: card.isVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Honeypot field (hidden for spam bot trap) */}
          <input
            type="text"
            name="fax_number"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Row 1: Name and Email */}
          <div className="contact-form-row-1">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="contact-label">
                Name<span style={{ color: 'var(--color-orange)', marginLeft: '2px' }}>*</span>
              </label>
              <input
                type="text"
                className="contact-input"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === 'loading'}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="contact-label">
                Email<span style={{ color: 'var(--color-orange)', marginLeft: '2px' }}>*</span>
              </label>
              <input
                type="email"
                className="contact-input"
                placeholder="john@doe.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
              />
            </div>
          </div>

          {/* Row 2: Message */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
            <label className="contact-label">
              Message<span style={{ color: 'var(--color-orange)', marginLeft: '2px' }}>*</span>
            </label>
            <textarea
              className="contact-input contact-textarea"
              placeholder="Hello there, I would like to ask you about..."
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 500))}
              maxLength={500}
              required
              disabled={status === 'loading'}
            />
          </div>

          {/* Character counter & Button row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div className="char-counter">
              {message.length}/500 characters
            </div>

            <button
              type="submit"
              disabled={!isFormValid || status === 'loading'}
              className={`contact-submit-btn ${isFormValid && status !== 'loading' ? 'is-valid' : ''}`}
            >
              {status === 'loading' ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Sending...
                  <span className="spinner" />
                </span>
              ) : (
                'Send ✈'
              )}
            </button>
          </div>
        </form>

        {/* Inline Submission Status Message */}
        {statusMessage && (
          <div
            style={{
              marginTop: '20px',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '14.5px',
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
              backgroundColor: status === 'success' ? 'rgba(52, 211, 153, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              border: `1px solid ${status === 'success' ? 'rgba(52, 211, 153, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`,
              color: status === 'success' ? '#34D399' : '#EF4444',
              transition: 'all 0.3s ease',
            }}
          >
            {statusMessage}
          </div>
        )}
      </div>

      {/* ── Social Row ── */}
      <div
        ref={footer.ref}
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '0 4px',
          opacity: footer.isVisible ? 1 : 0,
          transform: footer.isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '14px',
        }}
      >
        <div
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}
        >
          Or contact me with...
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          {SOCIAL_LINKS.map((link) => (
            <SocialButton key={link.name} link={link} />
          ))}
        </div>
      </div>

      {/* ── Scoped CSS Styles ── */}
      <style>{`
        .contact-card {
          background: var(--color-card-bg);
          border: 1px solid var(--color-card-border);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .contact-card:hover {
          border-color: rgba(255, 255, 255, 0.1);
        }

        .contact-form-row-1 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .contact-label {
          font-size: 13.5px;
          color: var(--text-secondary);
          font-weight: 500;
          font-family: var(--font-sans);
        }

        .contact-input {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 12px 16px;
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 14.5px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .contact-input::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }

        .contact-input:focus {
          border-color: var(--color-orange);
          box-shadow: 0 0 12px rgba(255, 140, 0, 0.18);
        }

        .contact-textarea {
          min-height: 150px;
          resize: vertical;
          line-height: 1.5;
        }

        .char-counter {
          font-size: 12px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }

        .contact-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.25);
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 10px;
          font-size: 14px;
          letter-spacing: 0.5px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          cursor: not-allowed;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .contact-submit-btn.is-valid {
          background: var(--color-orange);
          color: #000000;
          border-color: var(--color-orange);
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(255, 140, 0, 0.3);
        }

        .contact-submit-btn.is-valid:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 140, 0, 0.5);
        }

        .contact-submit-btn.is-valid:active {
          transform: translateY(0);
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-left-color: #000000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 640px) {
          .contact-card {
            padding: 24px;
          }
          
          .contact-form-row-1 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
