import { useRef } from 'react';
import { getRandomAnimationColor } from '@/utils/colors';
import { CanvasElement, useCanvas, type CanvasSetup } from '@/utils/canvas';

interface Star {
  x: number;
  y: number;
  z: number;
  opacity: number;
  color: string;
}

export default function SpaceTimeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvas(canvasRef, ({ ctx, width, height }: CanvasSetup) => {
    // Star properties
    const stars: Star[] = [];
    const numStars = 400;
    const maxDepth = 1000;
    const centerX = width / 2;
    const centerY = height / 2;

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - centerX,
        y: Math.random() * height - centerY,
        z: Math.random() * maxDepth,
        opacity: Math.random(),
        color: getRandomAnimationColor('stars'),
      });
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(20, 20, 20, 0.3)';
      ctx.fillRect(0, 0, width, height);

      // Update and draw stars
      stars.forEach((star) => {
        // Move stars closer (decrease z)
        star.z -= 2;

        // Reset star when it gets too close
        if (star.z <= 0) {
          star.z = maxDepth;
          star.x = Math.random() * width - centerX;
          star.y = Math.random() * height - centerY;
          star.color = getRandomAnimationColor('stars'); // New color when reset
        }

        // Project 3D position to 2D with perspective
        const scale = maxDepth / (star.z + 1);
        const x2d = star.x * scale + centerX;
        const y2d = star.y * scale + centerY;

        // Calculate size based on distance
        const size = Math.max(0.5, 2 * (maxDepth - star.z) / maxDepth);
        
        // Calculate brightness based on distance
        const brightness = Math.min(1, (maxDepth - star.z) / maxDepth);

        // Draw star with its color
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${Math.floor(brightness * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Optional: Add glow effect for closer stars
        if (star.z < maxDepth / 2) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color}${Math.floor(brightness * 50).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  });

  return <CanvasElement ref={canvasRef} />;
} 