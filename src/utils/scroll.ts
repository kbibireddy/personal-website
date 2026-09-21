function scrollingElement(): Element {
  return document.scrollingElement ?? document.documentElement;
}

function getScrollTop(): number {
  return scrollingElement().scrollTop;
}

function setScrollTop(top: number) {
  scrollingElement().scrollTop = top;
}

/** Instant section scroll. Avoids CSS smooth-scroll + overflow-anchor fighting RAF tweens. */
export function animateScrollToId(id: string, offset = 0): Promise<void> {
  const element = document.getElementById(id);
  if (!element) return Promise.resolve();

  const unbounded = element.getBoundingClientRect().top + getScrollTop() - offset;
  const max = Math.max(0, scrollingElement().scrollHeight - window.innerHeight);
  const end = Math.max(0, Math.min(unbounded, max));

  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  setScrollTop(end);
  html.style.scrollBehavior = previousBehavior;

  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}
