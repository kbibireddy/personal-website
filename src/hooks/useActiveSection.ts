"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { PAGE_SECTIONS } from '@/constants/sections';

/** Tracks which page section is in view for scroll-spy nav. */
export function useActiveSection(enabled = true) {
  const [activeId, setActiveId] = useState(PAGE_SECTIONS[0]?.id ?? 'summary');
  const lockedId = useRef<string | null>(null);

  const compute = useCallback(() => {
    if (lockedId.current) return;

    const ids = PAGE_SECTIONS.map((s) => s.id);
    const probe = Math.min(140, window.innerHeight * 0.18);
    let current = ids[0];

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= probe) {
        current = id;
      }
    }

    const scroller = document.scrollingElement ?? document.documentElement;
    const scrolledToBottom =
      scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 4;
    if (scrolledToBottom) {
      current = ids[ids.length - 1];
    }

    setActiveId((prev) => (prev === current ? prev : current));
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        compute();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', compute);
    window.addEventListener('resize', onScroll);
    compute();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', compute);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled, compute]);

  const lock = useCallback((id: string) => {
    lockedId.current = id;
    setActiveId(id);
  }, []);

  const unlock = useCallback(() => {
    lockedId.current = null;
    compute();
  }, [compute]);

  return { activeId, lock, unlock };
}
