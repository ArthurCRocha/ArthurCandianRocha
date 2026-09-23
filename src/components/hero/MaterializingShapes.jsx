import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// As formas ficam nas bordas: o miolo é do texto do hero.
// phase dessincroniza a flutuação para elas não subirem em bloco.
const SHAPES = [
  { geometry: 'icosahedron', position: [-4.6, 1.4, -1], scale: 0.7, speed: 1.2, phase: 0 },
  { geometry: 'tetrahedron', position: [4.6, 0.2, -1.5], scale: 0.7, speed: 0.9, phase: 2.1 },
  { geometry: 'octahedron', position: [-4.2, -1.8, -2], scale: 0.6, speed: 1.5, phase: 4.3 },
  { geometry: 'dodecahedron', position: [3.9, 2.2, -2.5], scale: 0.5, speed: 1.1, phase: 1.2 },
  { geometry: 'icosahedron', position: [5.0, -1.9, -3], scale: 0.42, speed: 1.7, phase: 5.5 },
  { geometry: 'octahedron', position: [-5.0, 0.2, -3.5], scale: 0.45, speed: 0.8, phase: 3.4 },
];

// As formas são pano de fundo: opacas demais, competem com o texto.
const SOLID_OPACITY = 0.55;

function Geometry({ kind }) {
  if (kind === 'tetrahedron') return <tetrahedronGeometry args={[1, 0]} />;
  if (kind === 'octahedron') return <octahedronGeometry args={[1, 0]} />;
  if (kind === 'dodecahedron') return <dodecahedronGeometry args={[1, 0]} />;
  return <icosahedronGeometry args={[1, 0]} />;
}

function Shape({ config, colors, reducedMotion, register }) {
  const floater = useRef(null);
  const inner = useRef(null);
  const solid = useRef(null);
  const wire = useRef(null);
  useFrame((state, delta) => {
    if (reducedMotion || !floater.current || !inner.current) return;
    const t = state.clock.elapsedTime * config.speed + config.phase;
    floater.current.position.y = config.position[1] + Math.sin(t * 0.6) * 0.28;
    inner.current.rotation.x += delta * 0.08 * config.speed;
    inner.current.rotation.y += delta * 0.12 * config.speed;
  });

  return (
    <group ref={floater} position={config.position}>
      <group
        ref={(node) => {
          inner.current = node;
          if (node) register({ node, solid, wire, targetScale: config.scale });
        }}
        scale={reducedMotion ? config.scale : 0}
      >
        <mesh>
          <Geometry kind={config.geometry} />
          <meshStandardMaterial
            ref={solid}
            color={colors.ghost}
            roughness={0.45}
            metalness={0.05}
            transparent
            opacity={reducedMotion ? SOLID_OPACITY : 0}
          />
        </mesh>
        <mesh scale={1.001}>
          <Geometry kind={config.geometry} />
          <meshBasicMaterial
            ref={wire}
            color={colors.ghost}
            wireframe
            transparent
            opacity={0}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function MaterializingShapes({ colors, reducedMotion }) {
  const { viewport, invalidate } = useThree();
  const registry = useRef([]);

  // A escala acompanha a largura do frustum para as formas ficarem sempre
  // na borda da tela, nunca por cima da coluna de texto.
  const groupScale = useMemo(
    () => Math.min(1, Math.max(0.28, viewport.width / 11)),
    [viewport.width]
  );

  const register = (entry) => {
    if (registry.current.some((item) => item.node === entry.node)) return;
    registry.current.push(entry);
  };

  useGSAP(() => {
    if (reducedMotion) {
      invalidate();
      return;
    }

    const entries = registry.current;
    if (!entries.length) return;

    const timeline = gsap.timeline({ delay: 0.15 });

    entries.forEach(({ node, solid, wire, targetScale }, index) => {
      const at = index * 0.12;

      timeline.to(wire.current, { opacity: 0.9, duration: 0.4, ease: 'power2.out' }, at);
      timeline.to(node.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 1.1,
        ease: 'back.out(1.6)',
      }, at);
      timeline.to(wire.current, { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, at + 0.55);
      timeline.to(solid.current, {
        opacity: SOLID_OPACITY,
        duration: 0.7,
        ease: 'power2.inOut',
      }, at + 0.55);
    });

    return () => timeline.kill();
  }, { dependencies: [reducedMotion] });

  return (
    <group scale={groupScale}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 8]} intensity={1.4} />
      <directionalLight position={[-6, -3, 2]} intensity={0.5} />

      {SHAPES.map((config, index) => (
        <Shape
          key={index}
          config={config}
          colors={colors}
          reducedMotion={reducedMotion}
          register={register}
        />
      ))}
    </group>
  );
}
