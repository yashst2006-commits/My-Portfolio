import React, { useState, useEffect, useRef, useCallback } from 'react';

const MENU_ITEMS = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'];

/* Maps each menu label to its section element id */
const SECTION_IDS: Record<string, string> = {
  Home: 'hero',
  About: 'about',
  Experience: 'experience',
  Projects: 'projects',
  Skills: 'skills',
  Contact: 'contact',
};

export const Navbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const headerRef = useRef<HTMLElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const index = hoveredIndex !== null ? hoveredIndex : activeIndex;
    const currentEl = itemsRef.current[index];
    if (currentEl) {
      setSliderStyle({
        left: `${currentEl.offsetLeft}px`,
        width: `${currentEl.offsetWidth}px`,
        opacity: 1,
      });
    } else {
      setSliderStyle({
        opacity: 0,
      });
    }
  }, [activeIndex, hoveredIndex]);

  // IntersectionObserver Scroll-Spy logic
  useEffect(() => {
    const elements = Object.values(SECTION_IDS)
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -55% 0px', // trigger when crossing the middle/upper-middle part
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isScrollingRef.current) return;

      const intersecting = entries.filter((entry) => entry.isIntersecting);
      if (intersecting.length > 0) {
        // Sort to pick the one closest to the top of the viewport
        const bestEntry = intersecting.reduce((acc, curr) => {
          return curr.boundingClientRect.top < acc.boundingClientRect.top ? curr : acc;
        }, intersecting[0]);

        const id = bestEntry.target.id;
        const key = Object.keys(SECTION_IDS).find((k) => SECTION_IDS[k] === id);
        if (key) {
          const idx = MENU_ITEMS.indexOf(key);
          if (idx !== -1) {
            setActiveIndex(idx);
          }
        }
      }
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Smooth-scrolls to a section by id, accounting for the live navbar height.
   * Falls back to the /projects cross-page navigation case.
   */
  const smoothScrollTo = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) {
      // We're on a sub-page (e.g. /projects) – navigate home with a scroll intent
      window.history.pushState({}, '', `/?scroll=${sectionId}`);
      window.location.href = `/?scroll=${sectionId}`;
      return;
    }

    const navbarHeight = headerRef.current?.offsetHeight ?? 72;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  }, []);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
      e.preventDefault();

      // Temporarily lock scroll-spy updates to avoid jittering on intermediate sections
      isScrollingRef.current = true;
      setActiveIndex(idx);
      setMobileMenuOpen(false);
      smoothScrollTo(SECTION_IDS[MENU_ITEMS[idx]]);

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // unlocks scroll-spy once scrolling completes
    },
    [smoothScrollTo],
  );

  return (
    <>
      <header
        ref={headerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: isScrolled ? 'rgba(11, 11, 11, 0.65)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
          animation: 'navEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isScrolled ? '16px 24px' : '24px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'padding 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* LEFT: Logo branding */}
          <div style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'var(--font-display)', letterSpacing: '2px', color: '#FFFFFF' }}>
            <span style={{ color: 'var(--color-orange)' }}>YASH</span>WANTH.
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <div className="nav-pill-container" style={{ position: 'relative', display: 'flex' }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                backgroundColor: 'rgba(15, 15, 15, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '30px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {/* Sliding background pill indicator */}
              <div
                style={{
                  position: 'absolute',
                  top: '4px',
                  bottom: '4px',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(255, 140, 0, 0.12)',
                  border: '1px solid rgba(255, 140, 0, 0.25)',
                  transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                  zIndex: 0,
                  pointerEvents: 'none',
                  ...sliderStyle,
                }}
              />

              {MENU_ITEMS.map((item, idx) => (
                <a
                  key={item}
                  ref={(el) => { itemsRef.current[idx] = el; }}
                  href={`#${SECTION_IDS[item]}`}
                  onClick={(e) => handleLinkClick(e, idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    padding: '8px 18px',
                    color: activeIndex === idx || hoveredIndex === idx ? '#FFFFFF' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'color 0.25s ease',
                    borderRadius: '24px',
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Social GitHub and LeetCode link buttons */}
          <div className="nav-social-container" style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <a
              href="https://github.com/yashst2006-commits"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                color: 'var(--text-secondary)',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-orange)';
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>

            <a
              href="https://leetcode.com/u/yash_leet06/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode"
              style={{
                color: 'var(--text-secondary)',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-orange)';
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.111.696-1.744.696-.642 0-1.277-.245-1.743-.696L5.045 15.6c-.957-.927-.957-2.428 0-3.355l7.39-7.14c.484-.469 1.132-.72 1.777-.72h3.864c.558 0 1.01.439 1.01.98 0 .54-.452.98-1.01.98h-3.864c-.208 0-.435.1-.6.26l-7.39 7.14c-.208.2-.208.528 0 .729l4.88 4.716c.208.2.54.2.748 0l2.69-2.607c.559-.541 1.465-.541 2.024 0a1.353 1.353 0 0 1 0 1.956zm-1.897-4.148c.373-.362.977-.362 1.35 0L19.46 17.5c.373.361.373.947 0 1.309a1.01 1.01 0 0 1-1.35 0l-3.905-3.774a.893.893 0 0 1 0-1.253zM15.426 6.07c.373-.361.977-.361 1.35 0l3.905 3.774c.373.361.373.947 0 1.309a1.01 1.01 0 0 1-1.35 0l-3.905-3.774a.893.893 0 0 1 0-1.309z" />
              </svg>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'none',
              padding: '6px',
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE MENU DRAWER OVERLAY */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '280px',
          backgroundColor: 'rgba(11, 11, 11, 0.98)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          padding: '30px 24px',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {MENU_ITEMS.map((item, idx) => (
            <a
              key={item}
              href={`#${SECTION_IDS[item]}`}
              onClick={(e) => handleLinkClick(e, idx)}
              style={{
                color: activeIndex === idx ? 'var(--color-orange)' : '#FFFFFF',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.5px',
                transition: 'color 0.25s ease',
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '20px', alignItems: 'center', paddingTop: '30px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: '#FFFFFF', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-orange)';
              e.currentTarget.style.transform = 'scale(1.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>

          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            style={{ color: '#FFFFFF', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-orange)';
              e.currentTarget.style.transform = 'scale(1.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.111.696-1.744.696-.642 0-1.277-.245-1.743-.696L5.045 15.6c-.957-.927-.957-2.428 0-3.355l7.39-7.14c.484-.469 1.132-.72 1.777-.72h3.864c.558 0 1.01.439 1.01.98 0 .54-.452.98-1.01.98h-3.864c-.208 0-.435.1-.6.26l-7.39 7.14c-.208.2-.208.528 0 .729l4.88 4.716c.208.2.54.2.748 0l2.69-2.607c.559-.541 1.465-.541 2.024 0a1.353 1.353 0 0 1 0 1.956zm-1.897-4.148c.373-.362.977-.362 1.35 0L19.46 17.5c.373.361.373.947 0 1.309a1.01 1.01 0 0 1-1.35 0l-3.905-3.774a.893.893 0 0 1 0-1.253zM15.426 6.07c.373-.361.977-.361 1.35 0l3.905 3.774c.373.361.373.947 0 1.309a1.01 1.01 0 0 1-1.35 0l-3.905-3.774a.893.893 0 0 1 0-1.309z" />
            </svg>
          </a>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 1999,
          }}
        />
      )}
    </>
  );
};

export default Navbar;
