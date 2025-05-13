import React, { RefObject, useEffect } from 'react';

export interface CanvasSetup {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

export function useCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  animate: (setup: CanvasSetup) => (() => void) | void
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Start animation
    const setup: CanvasSetup = {
      canvas,
      ctx,
      width: canvas.width,
      height: canvas.height,
    };

    const cleanup = animate(setup);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (cleanup) cleanup();
    };
  }, [canvasRef, animate]);
}

interface CanvasElementProps {
  ref: RefObject<HTMLCanvasElement>;
  className?: string;
}

export const CanvasElement = React.forwardRef<HTMLCanvasElement, Omit<CanvasElementProps, 'ref'>>((props, ref) => {
  const { className = '' } = props;
  return (
    <canvas
      ref={ref}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  );
}); 