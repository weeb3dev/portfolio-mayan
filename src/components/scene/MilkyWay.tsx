import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../../hooks/useScrollProgress";

const COUNT = 1800;

export function MilkyWay() {
  const points = useRef<THREE.Points>(null);
  const progress = useScrollProgress();

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    const col = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      // Elliptical band across the sky
      const t = (i / COUNT) * Math.PI * 2;
      const arm = (Math.random() - 0.5) * 14;
      const along = (Math.random() - 0.5) * 48;
      const lift = Math.sin(t * 0.5) * 2 + (Math.random() - 0.5) * 3;

      positions[i * 3] = along * 0.85 + Math.cos(t) * 2;
      positions[i * 3 + 1] = 10 + lift + arm * 0.15;
      positions[i * 3 + 2] = arm - 8 + Math.sin(along * 0.08) * 4;

      sizes[i] = 0.35 + Math.random() * 1.4;

      const warm = Math.random();
      col.setHSL(0.08 + warm * 0.08, 0.35, 0.65 + Math.random() * 0.3);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    return { positions, sizes, colors };
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const night = THREE.MathUtils.smoothstep(progress, 0.28, 0.78);
    const mat = points.current.material as THREE.PointsMaterial;
    mat.opacity = night * 0.85;
    points.current.rotation.z = progress * 0.35;
    points.current.position.x = -6 + progress * 14 + Math.sin(state.clock.elapsedTime * 0.05) * 0.4;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
