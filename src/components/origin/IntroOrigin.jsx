import { useCallback, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../hero/Hero';
import Origin from './Origin';
import './Origin.css';
import { useLanguage } from '../../contexts/languageContext';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function IntroOrigin({ personalInfo, contactInfo }) {
  const { lang } = useLanguage();
  const flow = useRef(null);
  const interaction = useRef({ x: 0, y: 0, scroll: 0 });
  const connectScene = useCallback((invalidate) => {
    interaction.current.invalidate = invalidate;
    return () => {
      if (interaction.current.invalidate === invalidate) delete interaction.current.invalidate;
    };
  }, []);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      mobile: '(max-width: 700px), (hover: none) and (pointer: coarse)',
    }, (context) => {
      if (!context.conditions.motion) return;
      const mobile = context.conditions.mobile;
      const node = flow.current;
      const hero = node.querySelector('.intro');
      node.classList.add('has-transition');
      const spatial = { progress: 0 };
      const passage = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
        id: 'intro-origin',
        trigger: hero,
        start: 'top top',
        end: () => `+=${hero.offsetHeight * (mobile ? 0.8 : 1.2)}`,
        pin: true,
        scrub: mobile ? 0.35 : 0.65,
        invalidateOnRefresh: true,
      } });

      // Origin occupies the same final viewport as the departing title.
      // Pin spacing reserves travel, while a shared-height overlap removes a seam.
      passage.fromTo('.intro-detail', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.18, immediateRender: false }, 0)
        .to('.intro-name-first', { xPercent: mobile ? -55 : -48, yPercent: -12, scale: mobile ? 1.15 : 1.3, duration: 0.65 }, 0)
        .to('.intro-name-last', { xPercent: mobile ? 65 : 58, yPercent: 14, scale: mobile ? 1.2 : 1.4, duration: 0.65 }, 0)
        .to('.intro-name', { autoAlpha: 0, duration: 0.25 }, 0.38)
        .to('.intro-sun', { scale: 2.2, xPercent: -20, yPercent: 12, duration: 0.58 }, 0)
        .to('.intro-art', { xPercent: mobile ? -8 : -18, yPercent: mobile ? 16 : 8, duration: 0.65 }, 0)
        .to(spatial, { progress: 1, duration: 0.65, onUpdate: () => {
          interaction.current.scroll = spatial.progress;
          interaction.current.x = 0;
          interaction.current.y = 0;
          interaction.current.invalidate?.();
        } }, 0)
        // SVG is the spatially simpler bridge when WebGL is unavailable.
        .to('.intro-ink-fallback', { scale: mobile ? 1.45 : 2.25, duration: 0.65 }, 0)
        .to('.intro-sun', { xPercent: -55, yPercent: -90, autoAlpha: 0, duration: 0.42 }, 0.58)
        .to('.intro-art', { xPercent: mobile ? -45 : -60, autoAlpha: 0, duration: 0.32 }, 0.66)
        .to('.intro-scene', { autoAlpha: 0, duration: 0.32 }, 0.66)
        .fromTo('.origin-entry-content', { opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.26 }, 0.74);

      // Only two editorial pivots animate. All supporting facts remain in flow.
      node.querySelectorAll('[data-origin-reveal]').forEach((element) => {
        gsap.fromTo(element, { clipPath: 'inset(0 100% 0 0)' }, {
          clipPath: 'inset(0 0% 0 0)', ease: 'none',
          scrollTrigger: { trigger: element, start: 'top 94%', end: 'top 64%', scrub: 0.4 },
        });
      });
      gsap.fromTo('.origin-guides', { opacity: 0 }, {
        opacity: 1, ease: 'none',
        scrollTrigger: { trigger: '.origin-development', start: 'top 92%', end: 'top 40%', scrub: 0.4 },
      });

      const refresh = () => ScrollTrigger.refresh();
      let live = true;
      document.fonts.ready.then(() => { if (live) refresh(); });
      window.addEventListener('load', refresh, { once: true });
      return () => {
        live = false;
        window.removeEventListener('load', refresh);
        node.classList.remove('has-transition');
        interaction.current.scroll = 0;
        interaction.current.invalidate?.();
      };
    });
    return () => media.revert();
  }, { scope: flow });

  useLayoutEffect(() => { ScrollTrigger.refresh(); }, [lang]);

  return (
    <div className="narrative-flow" ref={flow}>
      <Hero personalInfo={personalInfo} contactInfo={contactInfo} interaction={interaction} connectScene={connectScene} />
      <Origin />
    </div>
  );
}
