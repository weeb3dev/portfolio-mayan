import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";

const COUNT = 1600;

type Props = {
  /** Extra opacity boost inside cenote mouth */
  cenoteBoost?: boolean;
};

export function NightStars({ cenoteBoost = false }: Props) {
  const ref = useRef<THREE.Points>(null);
  const sceneT = useSceneProgress();

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 28 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = Math.abs(r * Math.cos(phi)) + (cenoteBoost ? 8 : 4);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [cenoteBoost]);

  useFrame(() => {
    if (!ref.current) return;
    const { night, cenote } = scenePhases(sceneT);
    const nightAmt = THREE.MathUtils.smoothstep(sceneT, 0.4, 0.55);
    let opacity = nightAmt * 0.95;
    if (cenoteBoost) {
      opacity = Math.max(opacity, cenote * 1.0);
    } else {
      opacity *= 1 - cenote * 0.85;
    }
    (ref.current.material as THREE.PointsMaterial).opacity = opacity;
    // silence unused
    void night;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={cenoteBoost ? 0.14 : 0.1}
        color="#f4efe4"
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
