import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/languageContext';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function usePathMotion(root) {
  const { lang } = useLanguage();
  useGSAP(() => {
    const node = root.current;
    const field = node.querySelector('.path-field');
    const svg = node.querySelector('.path-line');
    const moments = [...node.querySelectorAll('.path-moment')];
    let frame;
    let disposed = false;

    // Use layout coordinates, not animated bounds. The SVG follows the actual
    // text height in either language and gets its own narrow-screen routing.
    const measure = () => {
      const width = field.clientWidth;
      const height = field.offsetHeight;
      const compact = window.matchMedia('(max-width: 700px)').matches;
      const entry = node.querySelector('.path-entry');
      const departureLabel = node.previousElementSibling?.querySelector('.work-end');
      const extension = (departureLabel?.offsetHeight ?? 0) * 720 / entry.offsetHeight;
      node.querySelector('.path-entry-stroke').setAttribute('d', `M350 ${-extension} V0 C350 90 830 80 830 250 S750 480 600 550 S350 600 350 720`);
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      let previous = { x: width * .35, y: 0 };
      moments.forEach((moment, index) => {
        const anchor = moment.querySelector('.path-anchor');
        const next = { x: moment.offsetLeft + anchor.offsetLeft, y: moment.offsetTop + anchor.offsetTop };
        const sameRow = index === 1 && !compact;
        const turn = sameRow ? previous.y - 65 : Math.max(previous.y + 30, moment.offsetTop - (compact ? 36 : 60));
        let d;
        if (moment.dataset.language === 'technical') {
          d = `M${previous.x} ${previous.y} V${turn} H${next.x} V${next.y}`;
        } else if (moment.dataset.language === 'combined') {
          const radius = Math.min(32, Math.abs(next.x - previous.x) / 2);
          const direction = next.x >= previous.x ? 1 : -1;
          d = `M${previous.x} ${previous.y} V${turn - radius} Q${previous.x} ${turn} ${previous.x + radius * direction} ${turn} H${next.x - radius * direction} Q${next.x} ${turn} ${next.x} ${turn + radius} V${next.y}`;
        } else {
          d = `M${previous.x} ${previous.y} C${previous.x} ${turn} ${next.x} ${turn} ${next.x} ${next.y}`;
        }
        const group = svg.querySelector(`[data-line="${moment.dataset.moment}"]`);
        group.querySelectorAll('path').forEach((path) => path.setAttribute('d', d));
        previous = next;
      });
      // Complete the last moment's thread to meet the quiet outgoing stroke.
      const last = svg.querySelector('[data-line="mobile"] .path-stroke');
      if (last) last.setAttribute('d', `${last.getAttribute('d')} C${previous.x} ${height - 90} ${width * .35} ${height - 90} ${width * .35} ${height}`);
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
    observer.observe(field);
    document.fonts.ready.then(refresh);

    const media = gsap.matchMedia();
    media.add({ motion: '(prefers-reduced-motion: no-preference)', compact: '(max-width: 700px)' }, (context) => {
      measure();
      if (!context.conditions.motion) return;
      const compact = context.conditions.compact;
      const entry = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        id: 'work-path-arrival', trigger: '.path-entry', start: 'top 92%', end: 'bottom 40%', scrub: .45,
      } });
      entry.fromTo('.path-entry-stroke, .path-entry-echo', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0)
        .fromTo('.path-entry-echo', { x: compact ? 8 : 22, opacity: 0 }, { x: 0, opacity: .18, duration: 1 }, 0)
        .fromTo('#path-title span', { y: compact ? 14 : 26 }, { y: 0, stagger: .06, duration: .8 }, .1);

      moments.forEach((moment) => {
        const line = svg.querySelector(`[data-line="${moment.dataset.moment}"]`);
        const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
          id: `path-${moment.dataset.moment}`, trigger: moment,
          start: 'top 95%', end: compact ? 'top 24%' : 'top 20%', scrub: .4,
        } });
        timeline.fromTo(line.querySelectorAll('path'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0)
          // Keep every role, period and summary at full text contrast.
          .fromTo(moment.querySelector('.path-moment-body'), { y: compact ? 12 : 22 }, { y: 0, duration: .65 }, .25);
        const date = moment.querySelector('.path-date-emphasis');
        if (date) timeline.fromTo(date, { x: compact ? -8 : -20 }, { x: 0, duration: .8 }, .1);
        const echo = line.querySelector('.path-stroke-echo');
        if (echo) timeline.fromTo(echo, { x: compact ? 5 : 15, y: -8, opacity: 0 }, { x: 2, y: -2, opacity: .18, duration: 1 }, 0);
        const guides = moment.querySelector('.path-guides');
        if (guides) timeline.fromTo(guides, { scaleX: .65, opacity: .1 }, { scaleX: 1, opacity: .5, duration: 1 }, 0);
      });

      gsap.fromTo('.path-exit-stroke', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { id: 'path-continuing', trigger: '.path-continuation', start: 'top 95%', end: 'bottom bottom', scrub: .4 },
      });
    });
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      media.revert();
    };
  }, { scope: root, dependencies: [lang], revertOnUpdate: true });
}
