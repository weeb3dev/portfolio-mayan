import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../../hooks/useScrollProgress";

const COUNT = 2600;

export function MilkyWay() {
  const points = useRef<THREE.Points>(null);
  const progress = useScrollProgress();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const col = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      const t = (i / COUNT) * Math.PI * 2;
      const arm = (Math.random() - 0.5) * 16;
      const along = (Math.random() - 0.5) * 52;
      const lift = Math.sin(t * 0.5) * 2 + (Math.random() - 0.5) * 3.5;

      positions[i * 3] = along * 0.85 + Math.cos(t) * 2;
      positions[i * 3 + 1] = 10 + lift + arm * 0.15;
      positions[i * 3 + 2] = arm - 8 + Math.sin(along * 0.08) * 4;

      const warm = Math.random();
      col.setHSL(0.08 + warm * 0.1, 0.4, 0.6 + Math.random() * 0.35);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const night = THREE.MathUtils.smoothstep(progress, 0.2, 0.52);
    const mat = points.current.material as THREE.PointsMaterial;
    mat.opacity = Math.min(1, night * 0.95);
    points.current.rotation.z = progress * 0.35;
    points.current.position.x =
      -6 + progress * 14 + Math.sin(state.clock.elapsedTime * 0.05) * 0.4;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        fog={false}
      />
    </points>
  );
}
