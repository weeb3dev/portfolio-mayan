import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";

/**
 * Stylized sacred quetzal — emerald body, crimson belly, long twin tail —
 * arcs across the sky during day→dusk, fades as cenote begins.
 */
export function Quetzal() {
  const group = useRef<THREE.Group>(null);
  const leftWing = useRef<THREE.Mesh>(null);
  const rightWing = useRef<THREE.Mesh>(null);
  const sceneT = useSceneProgress();
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const { cenote } = scenePhases(sceneT);

    const flight = THREE.MathUtils.smoothstep(sceneT, 0.02, 0.12);
    const exit = 1 - THREE.MathUtils.smoothstep(sceneT, 0.48, 0.58);
    const visibility = Math.max(flight * exit * (1 - cenote), 0);

    if (visibility < 0.02) {
      group.current.visible = false;
      return;
    }
    group.current.visible = true;

    const u = THREE.MathUtils.clamp((sceneT - 0.02) / 0.45, 0, 1);
    const x = THREE.MathUtils.lerp(-9, 9, u);
    const y = 4.8 + Math.sin(u * Math.PI) * 2.2;
    const z = THREE.MathUtils.lerp(6, 9, u);
    group.current.position.set(x, y, z);
    group.current.rotation.y = -0.5 + u * 0.3;
    group.current.rotation.z = Math.sin(u * Math.PI) * -0.15;
    group.current.scale.setScalar(1.6);

    const flap = reduced ? 0 : Math.sin(state.clock.elapsedTime * 9) * 0.5;
    if (leftWing.current) leftWing.current.rotation.z = 0.4 + flap;
    if (rightWing.current) rightWing.current.rotation.z = -0.4 - flap;

    group.current.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshStandardMaterial) {
        obj.material.transparent = true;
        obj.material.opacity = visibility;
        obj.material.depthWrite = visibility > 0.5;
      }
    });
  });

  return (
    <group ref={group} visible={false}>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.55, 0.45, 1.4]} />
        <meshStandardMaterial color="#1a8f4a" roughness={0.45} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.18, 0.1]}>
        <boxGeometry args={[0.42, 0.28, 1.1]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.2, 0.85]}>
        <boxGeometry args={[0.4, 0.35, 0.45]} />
        <meshStandardMaterial color="#148a42" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.12, 1.15]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.09, 0.4, 6]} />
        <meshStandardMaterial color="#f0c040" roughness={0.65} />
      </mesh>
      <mesh ref={leftWing} position={[-0.7, 0.12, 0.1]} rotation={[0.15, 0.15, 0.45]}>
        <boxGeometry args={[1.8, 0.07, 0.85]} />
        <meshStandardMaterial color="#0f6b38" roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={rightWing} position={[0.7, 0.12, 0.1]} rotation={[0.15, -0.15, -0.45]}>
        <boxGeometry args={[1.8, 0.07, 0.85]} />
        <meshStandardMaterial color="#0f6b38" roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.14, -0.12, -1.6]} rotation={[0.12, 0, 0.06]}>
        <boxGeometry args={[0.14, 0.07, 2.8]} />
        <meshStandardMaterial color="#1fa85a" roughness={0.4} />
      </mesh>
      <mesh position={[0.14, -0.12, -1.6]} rotation={[0.12, 0, -0.06]}>
        <boxGeometry args={[0.14, 0.07, 2.8]} />
        <meshStandardMaterial color="#1fa85a" roughness={0.4} />
      </mesh>
      <mesh position={[-0.14, -0.18, -3.0]}>
        <boxGeometry args={[0.2, 0.16, 0.25]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.45} />
      </mesh>
      <mesh position={[0.14, -0.18, -3.0]}>
        <boxGeometry args={[0.2, 0.16, 0.25]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.45} />
      </mesh>
    </group>
  );
}
