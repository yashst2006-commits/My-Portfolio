import { useEffect, useRef } from 'react';

export interface MouseState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
}

export function useMouse() {
  const mouseRef = useRef<MouseState>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    vx: 0,
    vy: 0,
    speed: 0,
  });

  const prevCoords = useRef({ 
    x: mouseRef.current.x, 
    y: mouseRef.current.y, 
    lastTime: Date.now() 
  });

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      const mouse = mouseRef.current;
      const prev = prevCoords.current;
      const now = Date.now();
      const dt = Math.max(1, now - prev.lastTime);

      mouse.x = clientX;
      mouse.y = clientY;

      const dx = clientX - prev.x;
      const dy = clientY - prev.y;
      
      mouse.vx = (dx / dt) * 16.67;
      mouse.vy = (dy / dt) * 16.67;
      mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

      prev.x = clientX;
      prev.y = clientY;
      prev.lastTime = now;
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchMove);
    };
  }, []);

  const updateVelocityDecay = () => {
    const mouse = mouseRef.current;
    
    // Decay velocity
    mouse.vx *= 0.85;
    mouse.vy *= 0.85;
    mouse.speed *= 0.85;
    
    if (mouse.speed < 0.01) {
      mouse.vx = 0;
      mouse.vy = 0;
      mouse.speed = 0;
    }
  };

  return { mouseRef, updateVelocityDecay };
}
