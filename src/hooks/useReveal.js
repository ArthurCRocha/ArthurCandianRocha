import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Marca um elemento como "visível" quando ele entra na viewport, uma única vez.
// Com prefers-reduced-motion, já nasce visível (sem observer, sem animação).
export default function useReveal(options) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => (
    prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
  ));

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px', ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
}
