import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";

const COUNT = 1800;

export function NightStars() {
  const ref = useRef<THREE.Points>(null);
  const sceneT = useSceneProgress();

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 28 + Math.random() * 50;
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
    const { cenote } = scenePhases(sceneT);
    const nightAmt = THREE.MathUtils.smoothstep(sceneT, 0.4, 0.55);
    // Stay bright into cenote so the mouth frames the sky
    const opacity = Math.max(nightAmt * 0.95, cenote * 0.9);
    (ref.current.material as THREE.PointsMaterial).opacity = opacity;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
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
