import { useId } from 'react';

// Less than one pixel of edge variation at normal display sizes.
const edge = Array.from({ length: 160 }, (_, index) => {
  const angle = index / 160 * Math.PI * 2;
  const radius = 296 * (1 + Math.sin(angle * 3 + 0.4) * 0.0014 + Math.cos(angle * 7) * 0.001);
  return `${index ? 'L' : 'M'}${(300 + Math.cos(angle) * radius).toFixed(3)},${(300 + Math.sin(angle) * radius).toFixed(3)}`;
}).join(' ') + ' Z';

export default function PigmentSun() {
  const filterId = useId();
  return (
    <svg viewBox="0 0 600 600" focusable="false" className="intro-pigment">
      <defs>
        <filter id={filterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".014 .019" numOctaves="2" seed="23" stitchTiles="stitch" result="wash" />
          <feColorMatrix in="wash" type="matrix" values=".333 .333 .333 0 0 .333 .333 .333 0 0 .333 .333 .333 0 0 0 0 0 0 .05" result="wash-tone" />
          <feBlend in="SourceGraphic" in2="wash-tone" mode="soft-light" result="pigment" />
          <feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="1" seed="7" stitchTiles="stitch" result="grain" />
          <feColorMatrix in="grain" type="matrix" values=".333 .333 .333 0 0 .333 .333 .333 0 0 .333 .333 .333 0 0 0 0 0 0 .035" result="grain-tone" />
          <feBlend in="pigment" in2="grain-tone" mode="soft-light" result="printed" />
          <feComposite in="printed" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <path d={edge} fill="currentColor" filter={`url(#${filterId})`} />
    </svg>
  );
}
