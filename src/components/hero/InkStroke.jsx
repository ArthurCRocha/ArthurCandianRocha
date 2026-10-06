import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { DoubleSide, Vector2 } from 'three';
import { createBrushArrays } from './inkGeometry';

const vertexShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  attribute float aFiber;
  varying vec2 vUv;
  varying float vElevation;
  void main() {
    vUv = uv;
    vec3 p = position;
    float pressure = sin(uv.x * 3.14159265);
    float layer = aFiber - 0.5;
    p.z += sin(uv.x * 7.0 + layer * 2.0 + uTime * 0.16) * 0.055 * pressure;
    p.x += sin(uv.x * 5.0 + uTime * 0.09) * 0.01 * pressure;
    p.z += (uPointer.x * layer * 0.1 + uPointer.y * 0.025) * pressure;
    p.z += uScroll * pressure * 0.24;
    vElevation = p.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;
const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main() {
    float grain = hash(floor(vUv * vec2(850.0, 12.0)));
    float dry = smoothstep(0.65, 0.98, vUv.x);
    if (grain < dry * 0.2) discard;
    // Matte pigment: relief changes density, never specular highlights.
    float density = smoothstep(-0.3, 0.35, vElevation);
    float ink = mix(0.0035, 0.011, density) + grain * 0.0015;
    gl_FragColor = vec4(vec3(ink), 1.0);
    #include <colorspace_fragment>
  }
`;

export default function InkStroke({ interaction, reducedMotion, mobile, stretch, onReady }) {
  const group = useRef(null);
  const material = useRef(null);
  const ready = useRef(false);
  const arrays = useMemo(() => createBrushArrays(), []);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uScroll: { value: 0 }, uPointer: { value: new Vector2() },
  }), []);
  const elapsed = useRef(0);
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => () => { ready.current = false; }, []);

  useEffect(() => {
    if (!reducedMotion) return;
    group.current.rotation.set(0.055, -0.12, -0.16);
    group.current.position.set(0, 0, 0);
    material.current.uniforms.uTime.value = 0;
    material.current.uniforms.uScroll.value = 0;
    material.current.uniforms.uPointer.value.set(0, 0);
    elapsed.current = 0;
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    invalidate();
  }, [camera, invalidate, reducedMotion]);

  useFrame((state, delta) => {
    if (!ready.current) {
      ready.current = true;
      // Notify after the first canvas frame; SVG remains until then.
      onReady();
    }
    if (reducedMotion) return;
    if (!mobile) elapsed.current += Math.min(delta, 0.05);
    const { x, y, scroll } = interaction.current;
    // Mobile follows the already-scrubbed scroll without an idle animation loop.
    const damping = mobile ? 1 : 1 - Math.exp(-Math.min(delta, 0.05) * 3);
    const shaderUniforms = material.current.uniforms;
    shaderUniforms.uTime.value = elapsed.current;
    shaderUniforms.uScroll.value += (scroll - shaderUniforms.uScroll.value) * damping;
    shaderUniforms.uPointer.value.x += (x - shaderUniforms.uPointer.value.x) * damping;
    shaderUniforms.uPointer.value.y += (y - shaderUniforms.uPointer.value.y) * damping;
    group.current.rotation.y += (-0.12 + x * 0.022 + scroll * 0.09 - group.current.rotation.y) * damping;
    group.current.rotation.x += (0.055 - y * 0.015 - group.current.rotation.x) * damping;
    state.camera.position.x += (x * 0.022 - state.camera.position.x) * damping;
    state.camera.position.y += (y * 0.016 - state.camera.position.y) * damping;
    group.current.position.z += (scroll * (mobile ? 0.08 : 0.2) - group.current.position.z) * damping;
    state.camera.position.z += (5 - scroll * (mobile ? 1.15 : 2.1) - state.camera.position.z) * damping;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group} rotation={[0.055, -0.12, -0.16]} scale={[stretch, 1, 1]}>
      <mesh>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[arrays.positions, 3]} />
          <bufferAttribute attach="attributes-uv" args={[arrays.uvs, 2]} />
          <bufferAttribute attach="attributes-aFiber" args={[arrays.fibers, 1]} />
          <bufferAttribute attach="index" args={[arrays.indices, 1]} />
        </bufferGeometry>
        <shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} side={DoubleSide} />
      </mesh>
    </group>
  );
}
