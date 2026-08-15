import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";

type HeadProps = {
  side: "left" | "right";
  baseZ: number;
};

/** Low-poly Kukulkán head at balustrade base — open mouth, eye socket, snout */
function SerpentHead({ side, baseZ }: HeadProps) {
  const eyeMat = useRef<THREE.MeshStandardMaterial>(null);
  const sceneT = useSceneProgress();
  const x = side === "left" ? -1.05 : 1.05;
  const yaw = side === "left" ? 0.25 : -0.25;

  useFrame((state) => {
    if (!eyeMat.current) return;
    const { dusk } = scenePhases(sceneT);
    const complete = THREE.MathUtils.smoothstep(sceneT, 0.42, 0.5);
    const pulse =
      0.45 + dusk * 1.1 + complete * (0.7 + Math.sin(state.clock.elapsedTime * 2.2) * 0.3);
    eyeMat.current.emissiveIntensity = pulse;
  });

  return (
    <group position={[x, 0.45, baseZ + 1.75]} rotation={[0, yaw, 0]} scale={1.35}>
      <mesh castShadow position={[0, 0.1, 0.15]} userData={{ skipTint: true }}>
        <boxGeometry args={[0.85, 0.65, 1.35]} />
        <meshStandardMaterial color="#9a7550" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.32, 0.85]} userData={{ skipTint: true }}>
        <boxGeometry args={[0.72, 0.28, 0.65]} />
        <meshStandardMaterial color="#8d6a48" roughness={0.88} />
      </mesh>
      <mesh
        castShadow
        position={[0, -0.08, 0.75]}
        rotation={[0.4, 0, 0]}
        userData={{ skipTint: true }}
      >
        <boxGeometry args={[0.65, 0.2, 0.6]} />
        <meshStandardMaterial color="#7a5a3e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.1, 0.85]} userData={{ skipTint: true }}>
        <boxGeometry args={[0.48, 0.28, 0.4]} />
        <meshStandardMaterial color="#2a1810" roughness={1} />
      </mesh>
      <mesh
        position={[side === "left" ? 0.32 : -0.32, 0.34, 0.3]}
        userData={{ skipTint: true }}
      >
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color="#3a2a1c" roughness={0.95} />
      </mesh>
      <mesh
        position={[side === "left" ? 0.38 : -0.38, 0.36, 0.4]}
        userData={{ skipTint: true }}
      >
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial
          ref={eyeMat}
          color="#f0e2c4"
          emissive="#ff6a3a"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh position={[0, 0.5, -0.2]} userData={{ skipTint: true }}>
        <boxGeometry args={[0.6, 0.16, 0.65]} />
        <meshStandardMaterial color="#a88862" roughness={0.85} />
      </mesh>
    </group>
  );
}

export function KukulkanHeads({ baseZ }: { baseZ: number }) {
  return (
    <>
      <SerpentHead side="left" baseZ={baseZ} />
      <SerpentHead side="right" baseZ={baseZ} />
    </>
  );
}
