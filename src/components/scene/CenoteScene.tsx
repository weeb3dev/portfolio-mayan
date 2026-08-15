import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";
import { NightStars } from "./NightStars";

const OFFERING_COUNT = 48;

/**
 * Inside the sacred cenote: limestone shaft, starry circular mouth,
 * fluorescent turquoise water — portal toward Xibalba / Chaac.
 */
export function CenoteScene() {
  const group = useRef<THREE.Group>(null);
  const water = useRef<THREE.Mesh>(null);
  const waterLight = useRef<THREE.PointLight>(null);
  const offerings = useRef<THREE.Points>(null);
  const sceneT = useSceneProgress();

  const offeringPos = useMemo(() => {
    const arr = new Float32Array(OFFERING_COUNT * 3);
    for (let i = 0; i < OFFERING_COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 3.2;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = -2 + Math.random() * 5;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const { cenote } = scenePhases(sceneT);
    if (!group.current) return;

    group.current.visible = cenote > 0.02;
    group.current.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => {
          if (
            m instanceof THREE.MeshStandardMaterial ||
            m instanceof THREE.MeshBasicMaterial
          ) {
            m.transparent = true;
            if (!m.userData.baseOpacity) m.userData.baseOpacity = m.opacity || 1;
            // Water keeps its own animated opacity
            if (!obj.userData.isWater) {
              m.opacity = (m.userData.baseOpacity as number) * cenote;
            }
          }
        });
      }
    });

    if (water.current) {
      const mat = water.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.85 * cenote;
      const pulse = 0.55 + Math.sin(state.clock.elapsedTime * 1.4) * 0.2;
      mat.emissiveIntensity = pulse * cenote;
      water.current.position.y = -3.8 + Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
    }

    if (waterLight.current) {
      waterLight.current.intensity = 2.8 * cenote;
    }

    if (offerings.current) {
      offerings.current.rotation.y = state.clock.elapsedTime * 0.08;
      const mat = offerings.current.material as THREE.PointsMaterial;
      mat.opacity = 0.75 * cenote;
    }
  });

  return (
    <group ref={group} visible={false} position={[0, 0, 0]}>
      {/* Shaft walls */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[7.2, 6.4, 14, 48, 1, true]} />
        <meshStandardMaterial
          color="#5a5248"
          side={THREE.BackSide}
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
      {/* Inner cooler limestone band */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[7.05, 6.25, 13.6, 48, 1, true]} />
        <meshStandardMaterial
          color="#3d4548"
          side={THREE.BackSide}
          roughness={0.9}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Rim lip */}
      <mesh position={[0, 5.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.6, 9.5, 48]} />
        <meshStandardMaterial color="#6a6054" roughness={0.92} side={THREE.DoubleSide} />
      </mesh>

      {/* Fluorescent water */}
      <mesh
        ref={water}
        position={[0, -3.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ isWater: true }}
      >
        <circleGeometry args={[6.1, 64]} />
        <meshStandardMaterial
          color="#12d4e6"
          emissive="#1af0c8"
          emissiveIntensity={0.7}
          roughness={0.15}
          metalness={0.35}
          transparent
          opacity={0}
        />
      </mesh>

      <pointLight
        ref={waterLight}
        position={[0, -2.8, 0]}
        color="#1af0c8"
        intensity={0}
        distance={22}
        decay={2}
      />

      {/* Soft fill from below */}
      <hemisphereLight args={["#0a3040", "#1af0c8", 0.35]} />

      {/* Stars framed in the circular mouth */}
      <group position={[0, 8, 0]}>
        <NightStars cenoteBoost />
      </group>

      {/* Jade / gold offering motes */}
      <points ref={offerings}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[offeringPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#7dffa8"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
