import { useEffect, useRef } from 'react';

export function useAnimationFrame(callback: () => void, active: boolean = true) {
  const callbackRef = useRef(callback);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!active) {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
      return;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;

    const loop = () => {
      if (prefersReducedMotion) return;
      callbackRef.current();
      frameIdRef.current = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (frameIdRef.current === null && !prefersReducedMotion) {
        frameIdRef.current = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    };

    const handleQueryChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        stopLoop();
        // Draw static frame
        callbackRef.current();
      } else {
        startLoop();
      }
    };

    reducedMotionQuery.addEventListener('change', handleQueryChange);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    if (!prefersReducedMotion) {
      startLoop();
    } else {
      callbackRef.current();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', startLoop);
    window.addEventListener('blur', stopLoop);

    return () => {
      stopLoop();
      reducedMotionQuery.removeEventListener('change', handleQueryChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', startLoop);
      window.removeEventListener('blur', stopLoop);
    };
  }, [active]);
}
