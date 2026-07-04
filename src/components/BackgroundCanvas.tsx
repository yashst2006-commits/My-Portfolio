import React, { useEffect, useRef } from 'react';
import { ParticleEngine } from '../classes/ParticleEngine';
import { useMouse } from '../hooks/useMouse';
import { useAnimationFrame } from '../hooks/useAnimationFrame';

interface BackgroundCanvasProps {
  particleCount?: number;
  particleColors?: string[];
  vortexStrength?: number;
  rotationSpeed?: number;
  maxParticleSize?: number;
  glowStrength?: number;
  mouseFollowSpeed?: number;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({
  particleCount = 200,
  particleColors = ['#1E1E1E', '#2B2B2B', '#3E4E4E', '#FF8C00'],
  vortexStrength = 1.0,
  rotationSpeed = 1.0,
  maxParticleSize = 120,
  glowStrength = 25,
  mouseFollowSpeed = 0.06,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<ParticleEngine | null>(null);
  
  const { mouseRef, updateVelocityDecay } = useMouse();

  const tick = () => {
    const canvas = canvasRef.current;
    const engine = engineRef.current;
    if (!canvas || !engine) return;

    const mouse = mouseRef.current;
    engine.tick(mouse.x, mouse.y, mouse.speed, mouse.vx, mouse.vy);
    updateVelocityDecay();
  };

  useAnimationFrame(tick);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const engine = new ParticleEngine(ctx, width, height, {
      particleCount,
      particleColors,
      vortexStrength,
      rotationSpeed,
      maxParticleSize,
      glowStrength,
      mouseFollowSpeed,
    });
    engineRef.current = engine;

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      engine.resize(w, h);
      
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        const mouse = mouseRef.current;
        engine.tick(mouse.x, mouse.y, mouse.speed, mouse.vx, mouse.vy);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      engineRef.current = null;
    };
  }, [
    particleCount,
    particleColors,
    vortexStrength,
    rotationSpeed,
    maxParticleSize,
    glowStrength,
    mouseFollowSpeed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      id="portfolio-background-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: '#0B0B0B',
        display: 'block',
      }}
    />
  );
};

export default BackgroundCanvas;
