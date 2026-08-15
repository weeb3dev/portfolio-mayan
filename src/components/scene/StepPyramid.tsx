import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";
import { SerpentShadow } from "./SerpentShadow";
import { KukulkanHeads } from "./KukulkanHeads";

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
  const sceneT = useSceneProgress();

  const steps = useMemo(() => {
    return Array.from({ length: LEVELS }, (_, i) => {
      const size = 10.5 - i * 1.05;
      const y = i * 0.72;
      return { size, y, i };
    });
  }, []);

  const stairAnchors = useMemo(
    () =>
      [...steps]
        .reverse()
        .slice(0, 7)
        .map(({ size, y }) => ({
          x: 0,
          y: y + 0.2,
          z: size / 2 + 0.28,
        })),
    [steps],
  );

  useFrame((state) => {
    if (!group.current) return;
    const { cenote } = scenePhases(sceneT);
    const night = THREE.MathUtils.smoothstep(sceneT, 0.28, 0.55);
    const breathe = Math.sin(state.clock.elapsedTime * 0.35) * 0.015;
    // Freeze rotation as we approach cenote crossfade
    const rotAmt = Math.min(sceneT, 0.58);
    group.current.rotation.y = -0.35 + rotAmt * 0.45 + breathe * (1 - cenote);
    group.current.position.y = -1.35 + rotAmt * 0.35;

    group.current.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      if (obj.userData.skipTint) return;
      const mat = obj.material;
      if (!(mat instanceof THREE.MeshStandardMaterial)) return;
      mat.color.copy(limestoneColor(night));
      mat.emissive.set("#c45c3a");
      mat.emissiveIntensity = night * 0.08 * (1 - cenote);
      mat.roughness = 0.82 - night * 0.1;
      mat.transparent = true;
      mat.opacity = 1 - cenote;
    });

    group.current.visible = cenote < 0.98;
  });

  const baseZ = steps[0].size / 2;

  return (
    <group ref={group} position={[0, -1.35, 0]}>
      {steps.map(({ size, y, i }) => (
        <mesh key={i} position={[0, y + 0.36, 0]} castShadow receiveShadow>
          <boxGeometry args={[size, 0.72, size]} />
          <meshStandardMaterial color="#c9b08a" roughness={0.85} metalness={0.05} />
        </mesh>
      ))}

      <mesh position={[0, LEVELS * 0.72 + 0.55, 0]} castShadow>
        <boxGeometry args={[2.4, 1.1, 2.4]} />
        <meshStandardMaterial color="#b79a74" roughness={0.8} />
      </mesh>
      <mesh position={[0, LEVELS * 0.72 + 1.25, 0]} castShadow>
        <boxGeometry args={[2.9, 0.35, 2.9]} />
        <meshStandardMaterial color="#a88862" roughness={0.75} />
      </mesh>

      {steps.map(({ size, y, i }) => {
        const z = size / 2 + 0.28;
        return (
          <group key={`stair-${i}`}>
            <mesh position={[0, y + 0.2, z]} castShadow receiveShadow>
              <boxGeometry args={[1.45, 0.4, 0.95]} />
              <meshStandardMaterial color="#b08960" roughness={0.9} />
            </mesh>
            <mesh position={[-0.95, y + 0.45, z]} castShadow receiveShadow>
              <boxGeometry args={[0.35, 0.85, 1.05]} />
              <meshStandardMaterial color="#a07a52" roughness={0.88} />
            </mesh>
            <mesh position={[0.95, y + 0.45, z]} castShadow receiveShadow>
              <boxGeometry args={[0.35, 0.85, 1.05]} />
              <meshStandardMaterial color="#a07a52" roughness={0.88} />
            </mesh>
          </group>
        );
      })}

      <SerpentShadow anchors={stairAnchors} />
      <KukulkanHeads baseZ={baseZ} />
    </group>
  );
}
