import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../../hooks/useScrollProgress";

const COUNT = 2400;

export function NightStars() {
  const ref = useRef<THREE.Points>(null);
  const progress = useScrollProgress();

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 28 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = Math.abs(r * Math.cos(phi)) + 4;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    // Come in earlier and hold bright through the rest of the page
    const night = THREE.MathUtils.smoothstep(progress, 0.22, 0.55);
    (ref.current.material as THREE.PointsMaterial).opacity = Math.min(1, night * 1.05);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.13}
        color="#f4efe4"
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
        fog={false}
      />
    </points>
  );
}
