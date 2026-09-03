import { useEffect, useRef } from 'react';

// Move o elemento verticalmente em função da distância até o centro da
// viewport, criando profundidade entre camadas com `speed` diferentes.
// speed positivo = mais lento que o scroll (fundo); negativo = mais rápido (frente).
export default function useParallax(speed = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter;
      node.style.transform = `translate3d(0, ${(distanceFromCenter * speed * -1).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return ref;
}
