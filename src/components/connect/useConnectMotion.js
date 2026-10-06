import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/languageContext';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function useConnectMotion(root) {
  const { lang } = useLanguage();
  useGSAP(() => {
    const node = root.current;
    const field = node.querySelector('.connect-field');
    const seed = node.previousElementSibling?.querySelector('.now-red-seed');
    if (!seed) return;
    let frame;
    let disposed = false;

    const metrics = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const size = seed.clientWidth;
      const styles = getComputedStyle(seed);
      const bottom = parseFloat(styles.bottom);
      const centerX = parseFloat(styles.left) + size / 2;
      return {
        // A conservative inscribed radius covers every viewport corner while
        // preserving the original SVG's irregular edge during the expansion.
        scale: Math.hypot(width / 2, height / 2) * 1.2 / (size * .36),
        shift: `${width / 2 - centerX}px`,
        lift: `${bottom + size / 2 - height / 2}px`,
      };
    };
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const position = (trigger) => seed.classList.toggle('is-connect-expanding', trigger.progress > 0);
      gsap.fromTo(seed, { '--connect-scale': 1, '--connect-shift': '0px', '--connect-lift': '0px' }, {
        '--connect-scale': () => metrics().scale,
        '--connect-shift': () => metrics().shift,
        '--connect-lift': () => metrics().lift,
        ease: 'none',
        scrollTrigger: {
          id: 'now-connect-red', trigger: node,
          // Pick up where Now's approved initial growth reaches its final size.
          start: 'top bottom', endTrigger: field, end: 'top 20%',
          scrub: true, invalidateOnRefresh: true,
          onUpdate: position, onRefresh: position,
        },
      });
      return () => seed.classList.remove('is-connect-expanding');
    });

    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(node.querySelector('.connect-arrival'));
    observer.observe(field);
    document.fonts.ready.then(refresh);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.revert();
      seed.classList.remove('is-connect-expanding');
    };
  }, { scope: root, dependencies: [lang], revertOnUpdate: true });
}
