import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import MaterializingShapes from './MaterializingShapes';
import useThemeColors from './useThemeColors';

export default function HeroScene({ theme }) {
  const colors = useThemeColors(theme);
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(true);

  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fora da viewport o loop de render para: o contexto WebGL sobrevive,
  // mas deixa de consumir GPU enquanto o resto da página é lido.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-scene" ref={containerRef} aria-hidden="true">
      <Canvas
        frameloop={isActive && !reducedMotion ? 'always' : 'demand'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <MaterializingShapes colors={colors} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
