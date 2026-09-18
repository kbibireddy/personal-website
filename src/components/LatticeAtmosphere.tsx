"use client";

import { useEffect, useRef } from 'react';
import { Theme } from '@/types/theme';

interface Props {
  theme: Theme;
}

/**
 * Full-bleed atmosphere: faint lattice grid + mouse-tracking signal spotlight.
 * Presentation only — no content or link changes.
 */
export default function LatticeAtmosphere({ theme }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const spot = spotRef.current;
    if (!root || !spot) return;

    let raf = 0;
    let targetX = window.innerWidth * 0.35;
    let targetY = window.innerHeight * 0.28;
    let currentX = targetX;
    let currentY = targetY;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      spot.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const spotColor =
    theme === 'meta'
      ? 'rgba(13, 148, 136, 0.16)'
      : theme === 'discord'
        ? 'rgba(56, 189, 248, 0.14)'
        : 'rgba(45, 212, 191, 0.14)';

  const gridColor =
    theme === 'meta'
      ? 'rgba(15, 23, 42, 0.06)'
      : 'rgba(226, 232, 240, 0.045)';

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 75%)',
        }}
      />
      <div
        ref={spotRef}
        className="absolute left-0 top-0 h-[42rem] w-[42rem] rounded-full blur-3xl will-change-transform"
        style={{
          background: `radial-gradient(circle, ${spotColor} 0%, transparent 68%)`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute -left-24 top-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl opacity-60"
        style={{
          background:
            theme === 'meta'
              ? 'radial-gradient(circle, rgba(14, 165, 233, 0.12), transparent 70%)'
              : 'radial-gradient(circle, rgba(14, 116, 144, 0.22), transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] h-[32rem] w-[32rem] rounded-full blur-3xl opacity-50"
        style={{
          background:
            theme === 'meta'
              ? 'radial-gradient(circle, rgba(13, 148, 136, 0.1), transparent 70%)'
              : 'radial-gradient(circle, rgba(45, 212, 191, 0.12), transparent 70%)',
        }}
      />
    </div>
  );
}
