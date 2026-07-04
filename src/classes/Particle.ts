import { drawHexagon, drawPentagon, drawSquare, drawCircle } from '../utils/Geometry';

export interface ParticleConfig {
  canvasWidth: number;
  canvasHeight: number;
  vortexStrength: number;
  rotationSpeed: number;
  spawnRadius: number;
  maxParticleSize: number;
  glowStrength: number;
  colors: string[];
}

export class Particle {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
  
  size: number = 0;
  shape: 'hexagon' | 'pentagon' | 'square' | 'circle' = 'circle';
  color: string = '';
  depth: number = 1.0;
  opacity: number = 1.0;
  rotation: number = 0;
  rotationSpeed: number = 0;
  
  angle: number = 0;
  distance: number = 0;
  
  baseOrbitSpeed: number = 0;
  baseSpiralSpeed: number = 0;
  hasGlow: boolean = false;
  glowColor: string = '';

  constructor(cx: number, cy: number, config: ParticleConfig, isInitial: boolean = false) {
    this.respawn(cx, cy, config, isInitial);
  }

  respawn(cx: number, cy: number, config: ParticleConfig, isInitial: boolean = false): void {
    const randType = Math.random();
    
    if (randType < 0.70) {
      this.color = Math.random() < 0.5 ? '#1E1E1E' : '#2B2B2B';
      this.hasGlow = false;
      const shapes: Array<'hexagon' | 'pentagon' | 'square'> = ['hexagon', 'pentagon', 'square'];
      this.shape = shapes[Math.floor(Math.random() * shapes.length)];
    } else if (randType < 0.90) {
      this.color = '#3E4E4E';
      this.hasGlow = false;
      this.shape = 'circle';
    } else {
      this.color = '#FF8C00';
      this.hasGlow = true;
      this.glowColor = '#FF8C00';
      this.shape = 'circle';
    }

    this.depth = 0.1 + Math.random() * 1.1; 
    
    const minSize = 8;
    const maxSize = Math.min(120, config.maxParticleSize);
    const t = (this.depth - 0.1) / 1.1;
    this.size = maxSize - t * (maxSize - minSize);
    
    this.size += (Math.random() - 0.5) * 8;
    this.size = Math.max(minSize, Math.min(maxSize, this.size));

    if (this.hasGlow) {
      this.opacity = 0.6 + Math.random() * 0.4;
    } else {
      this.opacity = 0.05 + (this.depth / 1.2) * 0.45;
    }

    this.angle = Math.random() * Math.PI * 2;
    
    if (isInitial) {
      this.distance = Math.random() * config.spawnRadius;
    } else {
      this.distance = config.spawnRadius * (0.9 + Math.random() * 0.3);
    }
    
    this.x = cx + Math.cos(this.angle) * this.distance;
    this.y = cy + Math.sin(this.angle) * this.distance;
    this.vx = 0;
    this.vy = 0;

    const speedFactor = this.depth;
    this.baseOrbitSpeed = (0.3 + Math.random() * 0.5) * speedFactor * config.rotationSpeed;
    this.baseSpiralSpeed = (0.2 + Math.random() * 0.3) * speedFactor * config.vortexStrength;
    
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02 * speedFactor;
  }

  update(
    cx: number,
    cy: number,
    mouseSpeed: number,
    mouseVx: number,
    mouseVy: number,
    config: ParticleConfig
  ): void {
    const dx = cx - this.x;
    const dy = cy - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    this.distance = dist;

    const absorptionRadius = Math.max(12, this.size * 0.2);
    if (dist < absorptionRadius) {
      this.respawn(cx, cy, config, false);
      return;
    }

    if (dist > config.spawnRadius * 2) {
      this.respawn(cx, cy, config, false);
      return;
    }

    const currentAngle = Math.atan2(dy, dx);
    const orbitAngle = currentAngle + Math.PI / 2;
    const spiralAngle = currentAngle;

    const gravityMultiplier = Math.min(2.5, 50 / (dist + 10) + 0.5);
    const spiralForce = this.baseSpiralSpeed * gravityMultiplier;
    
    const vxDesired = Math.cos(orbitAngle) * this.baseOrbitSpeed + Math.cos(spiralAngle) * spiralForce;
    const vyDesired = Math.sin(orbitAngle) * this.baseOrbitSpeed + Math.sin(spiralAngle) * spiralForce;

    const easing = 0.04;
    this.vx += (vxDesired - this.vx) * easing;
    this.vy += (vyDesired - this.vy) * easing;

    if (mouseSpeed > 4) {
      const repThreshold = 250;
      if (dist < repThreshold) {
        const forceFactor = (1.0 - dist / repThreshold) * (mouseSpeed * 0.4);
        const rx = -dx / (dist + 1);
        const ry = -dy / (dist + 1);
        
        // Repel away from vortex center
        this.vx += rx * forceFactor * this.depth;
        this.vy += ry * forceFactor * this.depth;
        
        // Drag in direction of mouse motion
        this.vx += mouseVx * forceFactor * 0.15 * this.depth;
        this.vy += mouseVy * forceFactor * 0.15 * this.depth;
      }
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.shape !== 'circle') {
      this.rotation += this.rotationSpeed;
    }
  }

  draw(ctx: CanvasRenderingContext2D, config: ParticleConfig): void {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;

    if (this.hasGlow) {
      ctx.shadowBlur = config.glowStrength * (this.size / 10);
      ctx.shadowColor = this.glowColor;
    } else {
      ctx.shadowBlur = 0;
    }

    const radius = this.size / 2;

    switch (this.shape) {
      case 'hexagon':
        drawHexagon(ctx, this.x, this.y, radius, this.rotation);
        ctx.fill();
        break;
      case 'pentagon':
        drawPentagon(ctx, this.x, this.y, radius, this.rotation);
        ctx.fill();
        break;
      case 'square':
        drawSquare(ctx, this.x, this.y, radius, this.rotation);
        ctx.fill();
        break;
      case 'circle':
      default:
        drawCircle(ctx, this.x, this.y, radius);
        ctx.fill();
        break;
    }

    ctx.restore();
  }
}
