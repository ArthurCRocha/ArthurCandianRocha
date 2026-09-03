import { useEffect, useRef } from 'react';

// Fundo animado autoral em WebGL: ruído de valor (hash + interpolação suave,
// técnica clássica de procedural noise) fluindo lentamente, tingido com as
// cores do tema atual. Lê as CSS custom properties pra acompanhar dark mode.
const VERTEX_SHADER = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 flow = vec2(uv.x * 2.6 + uTime * 0.025, uv.y * 2.6 - uTime * 0.018);
    float n = valueNoise(flow) * 0.6 + valueNoise(flow * 2.3 + 4.2) * 0.4;
    float verticalMask = smoothstep(0.0, 0.4, uv.y) * smoothstep(1.0, 0.55, uv.y);
    vec3 color = mix(uColorA, uColorB, n);
    gl_FragColor = vec4(color, n * 0.32 * verticalMask);
  }
`;

function readThemeColors() {
  const styles = getComputedStyle(document.documentElement);
  return {
    bg: styles.getPropertyValue('--color-bg-alt').trim() || '#efe8d8',
    accent: styles.getPropertyValue('--color-accent').trim() || '#b23b2e',
  };
}

export default function ShaderBackground({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const container = containerRef.current;
    if (!container) return undefined;

    let renderer;
    let frameId;
    let disposed = false;
    let cleanupResize;
    let themeObserver;

    (async () => {
      const THREE = await import('three');

      let width = container.clientWidth;
      let height = container.clientHeight;
      if (!width || !height) return;

      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      } catch {
        return;
      }
      if (disposed) {
        renderer.dispose();
        return;
      }

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const colors = readThemeColors();
      const uniforms = {
        uResolution: { value: new THREE.Vector2(width, height) },
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(colors.bg) },
        uColorB: { value: new THREE.Color(colors.accent) },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms,
        transparent: true,
      });

      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

      const clock = new THREE.Clock();
      const animate = () => {
        if (disposed) return;
        uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      const handleResize = () => {
        width = container.clientWidth;
        height = container.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height);
        uniforms.uResolution.value.set(width, height);
      };
      window.addEventListener('resize', handleResize);
      cleanupResize = () => window.removeEventListener('resize', handleResize);

      themeObserver = new MutationObserver(() => {
        const next = readThemeColors();
        uniforms.uColorA.value.set(next.bg);
        uniforms.uColorB.value.set(next.accent);
      });
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    })();

    return () => {
      disposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      if (cleanupResize) cleanupResize();
      if (themeObserver) themeObserver.disconnect();
      if (renderer) {
        renderer.dispose();
        renderer.domElement?.remove();
      }
    };
  }, []);

  return <div ref={containerRef} className={`shader-background ${className}`} aria-hidden="true" />;
}
