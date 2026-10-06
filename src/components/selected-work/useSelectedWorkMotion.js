import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/languageContext';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function useSelectedWorkMotion(root) {
  const { lang } = useLanguage();
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      compact: '(max-width: 700px), (hover: none) and (pointer: coarse)',
    }, (context) => {
      if (!context.conditions.motion) return;
      const compact = context.conditions.compact;
      const node = root.current;

      gsap.fromTo('.work-arrival-frame', { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { id: 'craft-work-frame', trigger: '.work-arrival', start: 'top 92%', end: 'bottom 35%', scrub: 0.4 },
      });

      const system = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        id: 'work-prodisel', trigger: '.work-cover-prodisel', start: 'top 72%', end: 'bottom 25%', scrub: 0.5,
      } });
      system.fromTo('.work-system-plane-back', { x: compact ? 15 : 48, y: 30, rotation: -7, rotationY: compact ? 0 : -12 },
        { x: 0, y: -18, rotation: 0, rotationY: 0, duration: 1 }, 0)
        .fromTo('.work-system-plane-front', { x: compact ? -12 : -35, y: 15, rotation: 3, rotationY: compact ? 0 : -8 },
          { x: 0, y: 0, rotation: 0, rotationY: 0, duration: 1 }, 0)
        .fromTo('.work-red-field', { yPercent: 8 }, { yPercent: -3, duration: 1 }, 0);

      gsap.fromTo('.work-transfer i', { rotation: -8, x: compact ? 15 : 70, scaleX: 0.75 }, {
        rotation: 0, x: 0, scaleX: 1, ease: 'none', stagger: 0.06,
        scrollTrigger: { id: 'work-paper-transfer', trigger: '.work-transfer', start: 'top 85%', end: 'bottom 40%', scrub: 0.4 },
      });

      const documents = node.querySelectorAll('.work-document');
      const documentField = node.querySelector('.work-documents');
      const scattered = compact
        ? [{ x: -28, y: 0, rotation: -9, scale: 0.94 }, { x: 32, y: 24, rotation: 7, scale: 0.96 }, { x: -8, y: 62, rotation: -4, scale: 1 }]
        : [{ x: -65, y: -34, rotation: -12, scale: 0.94 }, { x: 70, y: -5, rotation: 8, scale: 0.92 }, { x: -20, y: 72, rotation: -5, scale: 1 }, { x: 95, y: 120, rotation: 4, scale: 0.97 }];
      const alignment = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        id: 'work-cv-alignment', trigger: '.work-cover-cv-standardization', start: 'top 68%',
        // Complete the alignment while the full front sheet is in view, also
        // on short landscape screens. Layout offsets exclude animated transforms.
        end: () => {
          const top = Math.max(24, (window.innerHeight - documents[0].offsetHeight) * 0.25);
          return `top ${top - documentField.offsetTop - documents[0].offsetTop}px`;
        },
        scrub: 0.45, invalidateOnRefresh: true,
      } });
      documents.forEach((document, index) => {
        if (compact && index === 3) return;
        alignment.fromTo(document, scattered[index], { x: index * (compact ? 9 : 12), y: index * (compact ? 9 : 12), rotation: 0, scale: 1, duration: 1 }, 0);
      });
      alignment.fromTo('.work-document-axis', { opacity: 0.2 }, { opacity: 1, duration: 0.7 }, 0.3);

      gsap.fromTo('.work-departure-frame', { opacity: 0.6 }, {
        opacity: 0.12, ease: 'none',
        scrollTrigger: { id: 'work-path-thread', trigger: '.work-departure', start: 'top 88%', end: 'bottom 95%', scrub: 0.4 },
      });

    });
    return () => media.revert();
  }, { scope: root });

  useLayoutEffect(() => {
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(refresh);
  }, [lang]);
}
