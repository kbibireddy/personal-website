import { WorkExperience } from '@/types/resume';

const MONTH_NAMES = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const PERIOD_SEPARATOR = /[–-]/;
const MIN_TENURE_YEARS = 0.5;

function parseMonthYear(dateStr: string): Date | null {
  const [monthStr, yearStr] = dateStr.trim().split(/\s+/);
  const monthIndex = MONTH_NAMES.indexOf(monthStr.toLowerCase().slice(0, 3));
  const year = parseInt(yearStr, 10);

  if (monthIndex === -1 || Number.isNaN(year)) {
    return null;
  }

  return new Date(year, monthIndex, 1);
}

function parseWorkPeriod(period: string): { start: Date; end: Date } | null {
  const parts = period.split(PERIOD_SEPARATOR).map((part) => part.trim());
  if (parts.length === 0) {
    return null;
  }

  const start = parseMonthYear(parts[0]);
  if (!start) {
    return null;
  }

  const endPart = parts[1] ?? 'Present';
  const end = /^present$/i.test(endPart) ? new Date() : parseMonthYear(endPart);
  if (!end) {
    return null;
  }

  return { start, end };
}

function getMonthsBetween(start: Date, end: Date): number {
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

export function getYearsRoundedToHalf(period: string): number | null {
  const parsed = parseWorkPeriod(period);
  if (!parsed) {
    return null;
  }

  const years = getMonthsBetween(parsed.start, parsed.end) / 12;
  return Math.max(MIN_TENURE_YEARS, Math.round(years * 2) / 2);
}

export function formatYearsSinceStart(period: string): string {
  const years = getYearsRoundedToHalf(period);
  if (years === null) {
    return '';
  }

  const display = Number.isInteger(years) ? years.toString() : years.toFixed(1);
  const label = years === 1 ? 'year' : 'years';
  return `(${display} ${label})`;
}

export interface CareerTenure {
  years: number;
  months: number;
  days: number;
}

function getEarliestCareerStart(workExperience: WorkExperience[]): Date | null {
  const startDates = workExperience
    .map((job) => parseWorkPeriod(job.period)?.start)
    .filter((date): date is Date => date !== undefined);

  if (startDates.length === 0) {
    return null;
  }

  return startDates.reduce((earliest, current) =>
    current < earliest ? current : earliest
  );
}

/** Calendar years / months / days from earliest role start through today. */
export function getCareerTenure(
  workExperience: WorkExperience[],
  asOf: Date = new Date()
): CareerTenure {
  const start = getEarliestCareerStart(workExperience);
  if (!start) {
    return { years: 0, months: 0, days: 0 };
  }

  let years = asOf.getFullYear() - start.getFullYear();
  let months = asOf.getMonth() - start.getMonth();
  let days = asOf.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0).getDate();
    days += daysInPrevMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
  };
}

export function getTotalCareerYears(workExperience: WorkExperience[]): number {
  const tenure = getCareerTenure(workExperience);
  return Math.max(1, tenure.years);
}

export function formatCareerTenure(tenure: CareerTenure): string {
  const yearLabel = tenure.years === 1 ? 'year' : 'years';
  const monthLabel = tenure.months === 1 ? 'month' : 'months';
  const dayLabel = tenure.days === 1 ? 'day' : 'days';
  return `${tenure.years} ${yearLabel}, ${tenure.months} ${monthLabel}, ${tenure.days}+ ${dayLabel}`;
}

const CAREER_TENURE_TOKEN = /\{\{\s*careerTenure\s*\}\}/g;

export function formatIntroduction(
  introduction: string[],
  workExperience: WorkExperience[],
  asOf: Date = new Date()
): string[] {
  const tenureLabel = formatCareerTenure(getCareerTenure(workExperience, asOf));
  return introduction.map((paragraph) =>
    paragraph.replace(CAREER_TENURE_TOKEN, tenureLabel)
  );
}

const CAREER_YEARS_PATTERN = /\d+\+ years/;

export function formatProfessionalSummary(summary: string, totalYears: number): string {
  if (!CAREER_YEARS_PATTERN.test(summary)) {
    return summary;
  }

  return summary.replace(CAREER_YEARS_PATTERN, `${totalYears}+ years`);
}
