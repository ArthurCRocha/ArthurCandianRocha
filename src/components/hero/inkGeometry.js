// Deterministic brush fibers shared by the SVG fallback and the 3D mesh.
// Coordinates describe one gesture, not a collection of floating objects.
const TAU = Math.PI * 2;
const noise = (n) => {
  const value = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export function brushPoint(t, fiber) {
  const phase = noise(fiber + 8) * TAU;
  const offset = (fiber / 82 - 0.5);
  const angle = 1.35 - t * 3.85;
  const pressure = Math.pow(Math.sin(Math.PI * t), 0.65);
  const spread = 0.09 + pressure * 0.63;
  const radius = 1.12 + offset * spread;
  const drag = Math.sin(t * 19 + phase) * 0.008 + Math.sin(t * 51 + phase) * 0.004;
  return {
    x: Math.cos(angle) * (radius + drag) + 0.12 * t,
    y: Math.sin(angle) * (radius + drag) * 1.15,
    z: Math.sin(t * 4.2 + offset) * 0.26
      + Math.sin(t * 6.7 + offset * 2.1) * 0.045 + offset * 0.18,
    width: (0.004 + noise(fiber + 31) * 0.009) * (0.15 + pressure),
  };
}

export function createBrushArrays() {
  const positions = [];
  const uvs = [];
  const fibers = [];
  const indices = [];
  for (let fiber = 0; fiber < 83; fiber++) {
    const start = noise(fiber + 103) * 0.065;
    const end = 0.88 + noise(fiber + 73) * 0.12;
    const steps = 100;
    const base = positions.length / 3;
    for (let step = 0; step <= steps; step++) {
      const t = start + (end - start) * step / steps;
      const point = brushPoint(t, fiber);
      const angle = 1.35 - t * 3.85;
      for (const side of [-1, 1]) {
        positions.push(
          point.x + Math.cos(angle) * point.width * side,
          point.y + Math.sin(angle) * point.width * side,
          point.z,
        );
        uvs.push(step / steps, side === -1 ? 0 : 1);
        fibers.push(fiber / 82);
      }
      if (step < steps) {
        const a = base + step * 2;
        indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
  }
  return {
    positions: new Float32Array(positions),
    uvs: new Float32Array(uvs),
    fibers: new Float32Array(fibers),
    indices: new Uint16Array(indices),
  };
}

export function createBrushPaths() {
  return Array.from({ length: 83 }, (_, fiber) => {
    const start = noise(fiber + 103) * 0.065;
    const end = 0.88 + noise(fiber + 73) * 0.12;
    const points = Array.from({ length: 101 }, (_, step) => {
      const point = brushPoint(start + (end - start) * step / 100, fiber);
      return `${step ? 'L' : 'M'}${(point.x * 148 + 250).toFixed(2)},${(250 - point.y * 148).toFixed(2)}`;
    });
    return { d: points.join(' '), width: (0.004 + noise(fiber + 31) * 0.009) * 296 };
  });
}
