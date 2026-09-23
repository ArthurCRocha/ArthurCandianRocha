import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Revela os filhos diretos de um container em cascata quando ele entra na tela.
// Complementa o useReveal (que cuida do texto palavra a palavra) para grids,
// onde um stagger coreografado lê melhor que transições CSS independentes.
export default function useGsapReveal({ selector = ':scope > *', stagger = 0.08 } = {}) {
  const ref = useRef(null);

  useGSAP(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.querySelectorAll(selector);
    if (!targets.length) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(targets, { opacity: 0, y: 28 });

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger,
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      observer.observe(node);
      return () => observer.disconnect();
    });

    return () => mm.revert();
  }, { scope: ref });

  return ref;
}
