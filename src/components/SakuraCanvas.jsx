import { useEffect, useRef } from 'react';

// Pétalas de sakura caindo em WebGL — decoração do hero.
// Não roda se o usuário pedir menos movimento ou se não houver WebGL;
// nesses casos o padrão seigaiha em CSS (App.css) já cobre o fundo.
export default function SakuraCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    let renderer;
    let frameId;
    let disposed = false;
    let cleanupResize;

    (async () => {
      const THREE = await import('three');

      let width = container.clientWidth;
      let height = container.clientHeight;
      if (!width || !height) return;

      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return;
      }
      if (disposed) {
        renderer.dispose();
        return;
      }

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      camera.position.z = 20;

      const petalCount = width < 640 ? 35 : 80;
      const geometry = new THREE.PlaneGeometry(0.4, 0.28);
      const material = new THREE.MeshBasicMaterial({
        color: 0xb23b2e,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const petals = new THREE.InstancedMesh(geometry, material, petalCount);
      scene.add(petals);

      const dummy = new THREE.Object3D();
      const state = Array.from({ length: petalCount }, () => ({
        x: (Math.random() - 0.5) * 26,
        y: Math.random() * 24 - 12,
        z: (Math.random() - 0.5) * 12,
        speed: 0.01 + Math.random() * 0.015,
        drift: 0.3 + Math.random() * 0.7,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        phase: Math.random() * Math.PI * 2,
      }));

      state.forEach((p, i) => {
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(p.phase, p.rotation, p.rotation);
        dummy.updateMatrix();
        petals.setMatrixAt(i, dummy.matrix);
      });

      const animate = () => {
        if (disposed) return;
        state.forEach((p, i) => {
          p.y -= p.speed;
          p.phase += 0.01;
          p.x += Math.sin(p.phase) * 0.01 * p.drift;
          p.rotation += p.rotSpeed;
          if (p.y < -12) {
            p.y = 12;
            p.x = (Math.random() - 0.5) * 26;
          }
          dummy.position.set(p.x, p.y, p.z);
          dummy.rotation.set(p.phase, p.rotation, p.rotation);
          dummy.updateMatrix();
          petals.setMatrixAt(i, dummy.matrix);
        });
        petals.instanceMatrix.needsUpdate = true;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      const handleResize = () => {
        width = container.clientWidth;
        height = container.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener('resize', handleResize);
      cleanupResize = () => window.removeEventListener('resize', handleResize);
    })();

    return () => {
      disposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      if (cleanupResize) cleanupResize();
      if (renderer) {
        renderer.dispose();
        renderer.domElement?.remove();
      }
    };
  }, []);

  return <div ref={containerRef} className="sakura-canvas" aria-hidden="true" />;
}
