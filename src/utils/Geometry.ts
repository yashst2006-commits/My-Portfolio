/**
 * Geometry helpers for rendering geometric shapes on HTML5 Canvas.
 */

/**
 * Draws a regular polygon with a specified number of sides, radius, and rotation.
 */
export function drawPolygon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  sides: number,
  rotation: number
): void {
  if (sides < 3) return;
  ctx.beginPath();
  const angleStep = (Math.PI * 2) / sides;
  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep + rotation;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.closePath();
}

/**
 * Draws a hexagon (6 sides).
 */
export function drawHexagon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number
): void {
  drawPolygon(ctx, x, y, radius, 6, rotation);
}

/**
 * Draws a pentagon (5 sides).
 */
export function drawPentagon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number
): void {
  drawPolygon(ctx, x, y, radius, 5, rotation);
}

/**
 * Draws a square (4 sides).
 */
export function drawSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number
): void {
  drawPolygon(ctx, x, y, radius, 4, rotation);
}

/**
 * Draws a circle.
 */
export function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
): void {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
}
