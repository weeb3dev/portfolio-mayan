import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../../hooks/useScrollProgress";

const LEVELS = 9;

function limestoneColor(night: number) {
  const day = new THREE.Color("#c9b08a");
  const dusk = new THREE.Color("#8a6a4e");
  const nightCol = new THREE.Color("#3a3348");
  if (night < 0.5) {
    return day.clone().lerp(dusk, night * 2);
  }
  return dusk.clone().lerp(nightCol, (night - 0.5) * 2);
}

export function StepPyramid() {
  const group = useRef<THREE.Group>(null);
  const progress = useScrollProgress();

  const steps = useMemo(() => {
    return Array.from({ length: LEVELS }, (_, i) => {
      const t = i / (LEVELS - 1);
      const size = 10.5 - i * 1.05;
      const y = i * 0.72;
      return { size, y, t, i };
    });
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const night = THREE.MathUtils.smoothstep(progress, 0.12, 0.72);
    const breathe = Math.sin(state.clock.elapsedTime * 0.35) * 0.015;
    group.current.rotation.y = -0.35 + progress * 0.45 + breathe;
    group.current.position.y = -1.35 + progress * 0.35;

    group.current.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshStandardMaterial) {
        obj.material.color.copy(limestoneColor(night));
        obj.material.emissive.set("#c45c3a");
        obj.material.emissiveIntensity = night * 0.08;
        obj.material.roughness = 0.82 - night * 0.1;
      }
    });
  });

  return (
    <group ref={group} position={[0, -1.35, 0]}>
      {steps.map(({ size, y, i }) => (
        <mesh key={i} position={[0, y + 0.36, 0]} castShadow receiveShadow>
          <boxGeometry args={[size, 0.72, size]} />
          <meshStandardMaterial color="#c9b08a" roughness={0.85} metalness={0.05} />
        </mesh>
      ))}

      {/* Temple house */}
      <mesh position={[0, LEVELS * 0.72 + 0.55, 0]} castShadow>
        <boxGeometry args={[2.4, 1.1, 2.4]} />
        <meshStandardMaterial color="#b79a74" roughness={0.8} />
      </mesh>
      <mesh position={[0, LEVELS * 0.72 + 1.25, 0]} castShadow>
        <boxGeometry args={[2.9, 0.35, 2.9]} />
        <meshStandardMaterial color="#a88862" roughness={0.75} />
      </mesh>

      {/* North stairs — one tread per terrace */}
      {steps.map(({ size, y, i }) => {
        const z = size / 2 + 0.28;
        return (
          <mesh key={`stair-${i}`} position={[0, y + 0.2, z]} castShadow receiveShadow>
            <boxGeometry args={[1.45, 0.4, 0.95]} />
            <meshStandardMaterial color="#b08960" roughness={0.9} />
          </mesh>
        );
      })}

      {/* Serpent head at stair base */}
      <mesh position={[0, 0.28, steps[0].size / 2 + 1.35]} castShadow>
        <boxGeometry args={[1.55, 0.55, 1.1]} />
        <meshStandardMaterial color="#9a7550" roughness={0.85} />
      </mesh>
      <mesh position={[-0.4, 0.48, steps[0].size / 2 + 1.85]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial
          color="#f0e2c4"
          emissive="#c45c3a"
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh position={[0.4, 0.48, steps[0].size / 2 + 1.85]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial
          color="#f0e2c4"
          emissive="#c45c3a"
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}
