import { Particle } from './Particle';
import type { ParticleConfig } from './Particle';

export class ParticleEngine {
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private particles: Particle[] = [];
  
  // Vortex center position (interpolated towards mouse)
  private cx: number = 0;
  private cy: number = 0;

  // Config parameters
  private config: ParticleConfig;
  private mouseFollowSpeed: number;
  private initialCount: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    options: {
      particleCount: number;
      particleColors: string[];
      vortexStrength: number;
      rotationSpeed: number;
      spawnRadius?: number;
      maxParticleSize: number;
      glowStrength: number;
      mouseFollowSpeed: number;
    }
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    
    this.cx = width / 2;
    this.cy = height / 2;
    
    this.initialCount = options.particleCount;
    this.mouseFollowSpeed = options.mouseFollowSpeed;
    
    const computedSpawnRadius = options.spawnRadius || Math.sqrt(width * width + height * height) * 0.7;

    this.config = {
      canvasWidth: width,
      canvasHeight: height,
      vortexStrength: options.vortexStrength,
      rotationSpeed: options.rotationSpeed,
      spawnRadius: computedSpawnRadius,
      maxParticleSize: options.maxParticleSize,
      glowStrength: options.glowStrength,
      colors: options.particleColors,
    };

    this.init();
  }

  private init(): void {
    this.particles = [];
    for (let i = 0; i < this.initialCount; i++) {
      this.particles.push(new Particle(this.cx, this.cy, this.config, true));
    }
  }

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.config.canvasWidth = width;
    this.config.canvasHeight = height;
    this.config.spawnRadius = Math.sqrt(width * width + height * height) * 0.7;
  }

  public tick(
    mx: number,
    my: number,
    mouseSpeed: number,
    mouseVx: number,
    mouseVy: number
  ): void {
    this.cx += (mx - this.cx) * this.mouseFollowSpeed;
    this.cy += (my - this.cy) * this.mouseFollowSpeed;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(this.cx, this.cy, mouseSpeed, mouseVx, mouseVy, this.config);
    }

    this.particles.sort((a, b) => a.depth - b.depth);

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(this.ctx, this.config);
    }
  }
}
