"use client";

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
  const label = formatCareerTenure(getCareerTenureFromStart(new Date(startIso)));
  const [amount, unit = 'years'] = label.split(/\s+/);

  return (
    <span className={className}>
      {amount}
      <span className="ml-[0.25em]">{unit}</span>
    </span>
  );
}

interface IntroductionWithTenureProps {
  paragraphs: string[];
  startIso: string | null;
  className?: string;
  timerClassName?: string;
}

/** Renders intro paragraphs, swapping {{careerTenure}} for rounded years (9+ / 9.5). */
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
