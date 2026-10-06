import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/languageContext';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function useNowMotion(root) {
  const { lang } = useLanguage();
  useGSAP(() => {
    const node = root.current;
    const arrival = node.querySelector('.now-arrival');
    const thread = node.querySelector('.now-thread');
    const stroke = node.querySelector('.now-thread-stroke');
    const departure = node.previousElementSibling?.querySelector('.path-continuation');
    let frame;
    let disposed = false;

    const measure = () => {
      const width = arrival.clientWidth;
      const height = arrival.offsetHeight;
      // Continue the approved Path SVG's last point (1100, 350 in a 1000×380
      // viewBox). It exits off-paper, then returns as a quieter, unfinished line.
      const startX = departure ? departure.getBoundingClientRect().left - arrival.getBoundingClientRect().left + departure.clientWidth * 1.1 : width * 1.1;
      const startY = departure ? -departure.offsetHeight * 30 / 380 : 0;
      thread.setAttribute('viewBox', `0 0 ${width} ${height}`);
      stroke.setAttribute('d', `M${startX} ${startY} C${startX + width * .12} ${startY + height * .08} ${width * .86} ${height * .25} ${width * .78} ${height * .39} S${width * .65} ${height * .67} ${width * .61} ${height * .71} Q${width * .59} ${height * .73} ${width * .57} ${height * .73}`);
    };
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (disposed) return;
        measure();
        ScrollTrigger.refresh();
      });
    };
    measure();
    const observer = new ResizeObserver(refresh);
    observer.observe(arrival);
    if (departure) observer.observe(departure);
    document.fonts.ready.then(refresh);

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(stroke, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { id: 'path-now-arrival', trigger: arrival, start: 'top 90%', end: 'bottom 60%', scrub: .6 },
      });
      gsap.fromTo('.now-red-seed', { scale: .08 }, { scale: 1, ease: 'none',
        scrollTrigger: { id: 'now-red-beginning', trigger: '.now-outgoing', start: 'top 80%', end: 'bottom bottom', scrub: .8 },
      });
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.revert();
    };
  }, { scope: root, dependencies: [lang], revertOnUpdate: true });
}
