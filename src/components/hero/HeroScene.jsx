import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import InkStroke from './InkStroke';

function CompositionCamera({ framing }) {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  useLayoutEffect(() => {
    // Preserve the original art viewport, then extend the frustum to the full
    // Intro. The gesture keeps its composition without internal canvas edges.
    camera.setViewOffset(framing.width, framing.height, -framing.left, -framing.top, size.width, size.height);
    camera.updateProjectionMatrix();
    invalidate();
    return () => camera.clearViewOffset();
  }, [camera, framing, invalidate, size.width, size.height]);
  return null;
}

function ContextLifecycle({ onFailure, connectScene }) {
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => connectScene(invalidate), [connectScene, invalidate]);
  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = (event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener('webglcontextlost', onLost);
    return () => {
      canvas.removeEventListener('webglcontextlost', onLost);
    };
  }, [gl, onFailure]);
  return null;
}

export default function HeroScene({ interaction, connectScene, framing, reducedMotion, mobile, stretch, onReady, onFailure }) {
  const container = useRef(null);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(container.current);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="intro-canvas" ref={container} aria-hidden="true">
      <Canvas
        frameloop={visible && pageVisible && !reducedMotion && !mobile ? 'always' : 'demand'}
        dpr={mobile ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 37 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: 'low-power' }}
        fallback={null}
      >
        <ContextLifecycle onFailure={onFailure} connectScene={connectScene} />
        <CompositionCamera framing={framing} />
        <InkStroke interaction={interaction} reducedMotion={reducedMotion} mobile={mobile} stretch={stretch} onReady={onReady} />
      </Canvas>
    </div>
  );
}
