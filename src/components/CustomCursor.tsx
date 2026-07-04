import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if the device is a desktop (non-touch and wide screen)
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isWide = window.innerWidth >= 1024;
      setIsDesktop(!hasTouch && isWide);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice, { passive: true });
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const dotEl = dotRef.current;
    const squareEl = squareRef.current;
    if (!dotEl || !squareEl) return;

    // Track mouse position and trailing square position
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const square = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    let isVisible = false;
    let isHovered = false;
    let currentScale = 1.0;
    let currentBorderOpacity = 0.5;
    let animationFrameId: number;

    // Check accessibility media query for reduced motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        squareEl.style.display = 'none';
      } else {
        squareEl.style.display = 'block';
      }
    };
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    // Initial check for reduced motion
    if (prefersReducedMotion) {
      squareEl.style.display = 'none';
    }

    // Add active class to body to hide browser's default cursor
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dotEl.style.opacity = '1';
        if (!prefersReducedMotion) {
          squareEl.style.opacity = '1';
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dotEl.style.opacity = '0';
      squareEl.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dotEl.style.opacity = '1';
      if (!prefersReducedMotion) {
        squareEl.style.opacity = '1';
      }
    };

    // Use event delegation for detecting hovered interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      let current: HTMLElement | null = target;
      let interactive = false;

      while (current && current !== document.documentElement) {
        const tagName = current.tagName;
        if (
          tagName === 'A' ||
          tagName === 'BUTTON' ||
          tagName === 'INPUT' ||
          tagName === 'SELECT' ||
          tagName === 'TEXTAREA' ||
          current.getAttribute('role') === 'button' ||
          current.classList.contains('glass-panel') ||
          current.classList.contains('tech-badge') ||
          window.getComputedStyle(current).cursor === 'pointer'
        ) {
          interactive = true;
          break;
        }
        current = current.parentElement;
      }

      if (interactive) {
        isHovered = true;
        dotEl.classList.add('hovered');
        squareEl.classList.add('hovered');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      let current: HTMLElement | null = target;
      let interactive = false;

      while (current && current !== document.documentElement) {
        const tagName = current.tagName;
        if (
          tagName === 'A' ||
          tagName === 'BUTTON' ||
          tagName === 'INPUT' ||
          tagName === 'SELECT' ||
          tagName === 'TEXTAREA' ||
          current.getAttribute('role') === 'button' ||
          current.classList.contains('glass-panel') ||
          current.classList.contains('tech-badge') ||
          window.getComputedStyle(current).cursor === 'pointer'
        ) {
          interactive = true;
          break;
        }
        current = current.parentElement;
      }

      if (interactive) {
        isHovered = false;
        dotEl.classList.remove('hovered');
        squareEl.classList.remove('hovered');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    // Tick loop (60+ FPS high refresh rate targeting)
    const tick = () => {
      // 1. Primary dot position updates instantly
      dot.x = mouse.x;
      dot.y = mouse.y;

      // Translate center of the 6px dot (offset by -3px)
      dotEl.style.transform = `translate3d(${dot.x - 3}px, ${dot.y - 3}px, 0)`;

      // 2. Secondary square updates with lerp trailing
      if (!prefersReducedMotion) {
        const lerpFactor = 0.15; // Delay / easing catch-up factor
        square.x += (mouse.x - square.x) * lerpFactor;
        square.y += (mouse.y - square.y) * lerpFactor;

        // Smoothly interpolate scale and border opacity to avoid transitions conflict
        const targetScale = isHovered ? 1.15 : 1.0;
        const targetBorderOpacity = isHovered ? 0.95 : 0.5;

        currentScale += (targetScale - currentScale) * lerpFactor;
        currentBorderOpacity += (targetBorderOpacity - currentBorderOpacity) * lerpFactor;

        // Translate center of the 30px square (offset by -15px)
        squareEl.style.transform = `translate3d(${square.x - 15}px, ${square.y - 15}px, 0) scale(${currentScale})`;
        squareEl.style.borderColor = `rgba(255, 140, 0, ${currentBorderOpacity})`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '0%',
          backgroundColor: 'var(--color-orange)',
          boxShadow: '0 0 10px var(--color-orange)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
        }}
      />
      <div
        ref={squareRef}
        className="custom-cursor-square"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '1px solid rgba(255, 140, 0, 0.5)',
          borderRadius: '3px',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      <style>{`
        /* Hide standard cursor only on fine-pointer desktop devices */
        @media (hover: hover) and (pointer: fine) {
          body.custom-cursor-active,
          body.custom-cursor-active * {
            cursor: none !important;
          }
        }

        .custom-cursor-dot.hovered {
          box-shadow: 0 0 14px 2px var(--color-orange);
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
