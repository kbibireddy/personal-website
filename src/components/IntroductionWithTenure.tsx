"use client";

import { useEffect, useState } from 'react';
import {
  formatCareerTenure,
  getCareerTenureFromStart,
} from '@/utils/dates';

const TENURE_SPLIT = /\{\{\s*careerTenure\s*\}\}/;

interface CareerTenureTimerProps {
  /** ISO timestamp of career start (earliest role). */
  startIso: string;
  className?: string;
}

export function CareerTenureTimer({ startIso, className }: CareerTenureTimerProps) {
  const [label, setLabel] = useState(() =>
    formatCareerTenure(getCareerTenureFromStart(new Date(startIso)))
  );

  useEffect(() => {
    const tick = () => {
      setLabel(formatCareerTenure(getCareerTenureFromStart(new Date(startIso))));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startIso]);

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {label}
    </span>
  );
}

interface IntroductionWithTenureProps {
  paragraphs: string[];
  startIso: string | null;
  className?: string;
  timerClassName?: string;
}

/** Renders intro paragraphs, swapping {{careerTenure}} for a live ticking timer. */
export default function IntroductionWithTenure({
  paragraphs,
  startIso,
  className,
  timerClassName,
}: IntroductionWithTenureProps) {
  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => {
        if (!startIso || !TENURE_SPLIT.test(paragraph)) {
          return <p key={index}>{paragraph}</p>;
        }
        const parts = paragraph.split(TENURE_SPLIT);
        return (
          <p key={index}>
            {parts.map((part, partIndex) => (
              <span key={partIndex}>
                {part}
                {partIndex < parts.length - 1 && (
                  <CareerTenureTimer startIso={startIso} className={timerClassName} />
                )}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
