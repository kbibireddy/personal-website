import { useRef } from 'react';
import { getRandomAnimationColor } from '@/utils/colors';
import { CanvasElement, useCanvas, type CanvasSetup } from '@/utils/canvas';

interface Spark {
  x: number;
  y: number;
  angle: number;
  length: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function ElectronicSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvas(canvasRef, ({ ctx, width, height }: CanvasSetup) => {
    const sparks: Spark[] = [];
    const numSparkLines = 3;

    function createSpark(): Spark {
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0;

      switch (edge) {
        case 0: // top
          x = Math.random() * width;
          y = 0;
          break;
        case 1: // right
          x = width;
          y = Math.random() * height;
          break;
        case 2: // bottom
          x = Math.random() * width;
          y = height;
          break;
        default: // left
          x = 0;
          y = Math.random() * height;
          break;
      }

      return {
        x,
        y,
        angle: Math.random() * Math.PI * 2,
        length: Math.random() * 50 + 20,
        life: Math.random() * 100 + 50,
        maxLife: Math.random() * 100 + 50,
        color: getRandomAnimationColor('sparks'),
      };
    }

    function drawSpark(spark: Spark) {
      const gradient = ctx.createLinearGradient(
        spark.x,
        spark.y,
        spark.x + Math.cos(spark.angle) * spark.length,
        spark.y + Math.sin(spark.angle) * spark.length
      );

      gradient.addColorStop(0, `${spark.color}00`);
      gradient.addColorStop(0.5, `${spark.color}FF`);
      gradient.addColorStop(1, `${spark.color}00`);

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2 * (spark.life / spark.maxLife);
      ctx.moveTo(spark.x, spark.y);
      ctx.lineTo(
        spark.x + Math.cos(spark.angle) * spark.length,
        spark.y + Math.sin(spark.angle) * spark.length
      );
      ctx.stroke();

      // Draw branching sparks
      if (spark.life > spark.maxLife * 0.7) {
        const numBranches = 2;
        for (let i = 0; i < numBranches; i++) {
          const branchAngle = spark.angle + (Math.random() - 0.5) * Math.PI / 2;
          const branchLength = spark.length * 0.5;
          
          const branchGradient = ctx.createLinearGradient(
            spark.x + Math.cos(spark.angle) * spark.length * 0.7,
            spark.y + Math.sin(spark.angle) * spark.length * 0.7,
            spark.x + Math.cos(branchAngle) * branchLength + Math.cos(spark.angle) * spark.length * 0.7,
            spark.y + Math.sin(branchAngle) * branchLength + Math.sin(spark.angle) * spark.length * 0.7
          );

          branchGradient.addColorStop(0, `${spark.color}FF`);
          branchGradient.addColorStop(1, `${spark.color}00`);

          ctx.beginPath();
          ctx.strokeStyle = branchGradient;
          ctx.lineWidth = 1 * (spark.life / spark.maxLife);
          ctx.moveTo(
            spark.x + Math.cos(spark.angle) * spark.length * 0.7,
            spark.y + Math.sin(spark.angle) * spark.length * 0.7
          );
          ctx.lineTo(
            spark.x + Math.cos(branchAngle) * branchLength + Math.cos(spark.angle) * spark.length * 0.7,
            spark.y + Math.sin(branchAngle) * branchLength + Math.sin(spark.angle) * spark.length * 0.7
          );
          ctx.stroke();
        }
      }
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(49, 51, 56, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Add new sparks
      if (sparks.length < numSparkLines) {
        sparks.push(createSpark());
      }

      // Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.life--;

        if (spark.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        // Update spark position
        spark.x += Math.cos(spark.angle) * 2;
        spark.y += Math.sin(spark.angle) * 2;

        // Randomly change direction slightly
        spark.angle += (Math.random() - 0.5) * 0.2;

        drawSpark(spark);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  });

  return <CanvasElement ref={canvasRef} className="opacity-20" />;
} 