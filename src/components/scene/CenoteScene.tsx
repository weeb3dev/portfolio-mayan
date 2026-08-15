import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";
import { NightStars } from "./NightStars";

const RIPPLE_COUNT = 4;

/**
 * Inside the sacred cenote: limestone shaft, starry circular mouth,
 * fluorescent turquoise water with expanding ripples.
 */
export function CenoteScene() {
  const group = useRef<THREE.Group>(null);
  const water = useRef<THREE.Mesh>(null);
  const waterLight = useRef<THREE.PointLight>(null);
  const ripples = useRef<(THREE.Mesh | null)[]>([]);
  const sceneT = useSceneProgress();

  const rippleGeo = useMemo(() => new THREE.RingGeometry(0.35, 0.55, 48), []);

  useFrame((state) => {
    const { cenote } = scenePhases(sceneT);
    if (!group.current) return;
    const t = state.clock.elapsedTime;

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
            if (!obj.userData.isWater && !obj.userData.isRipple) {
              m.opacity = (m.userData.baseOpacity as number) * cenote;
            }
          }
        });
      }
    });

    if (water.current) {
      const mat = water.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.88 * cenote;
      const pulse = 0.5 + Math.sin(t * 1.3) * 0.18;
      mat.emissiveIntensity = pulse * cenote;
      water.current.position.y = -3.8 + Math.sin(t * 0.65) * 0.05;
    }

    if (waterLight.current) {
      waterLight.current.intensity = 2.8 * cenote;
    }

    // Expanding concentric ripples on the water surface
    ripples.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      const phase = (t * 0.35 + i / RIPPLE_COUNT) % 1;
      const scale = 0.4 + phase * 5.5;
      mesh.scale.setScalar(scale);
      mat.opacity = Math.max(0, (1 - phase) * 0.55 * cenote);
      mesh.position.y = -3.78 + Math.sin(t * 0.65 + i) * 0.02;
      mesh.visible = cenote > 0.05;
    });
  });

  return (
    <group ref={group} visible={false} position={[0, 0, 0]}>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[7.2, 6.4, 14, 48, 1, true]} />
        <meshStandardMaterial
          color="#5a5248"
          side={THREE.BackSide}
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
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

      <mesh position={[0, 5.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.6, 9.5, 48]} />
        <meshStandardMaterial color="#6a6054" roughness={0.92} side={THREE.DoubleSide} />
      </mesh>

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

      {Array.from({ length: RIPPLE_COUNT }, (_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            ripples.current[i] = m;
          }}
          geometry={rippleGeo}
          position={[0, -3.78, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ isRipple: true }}
          visible={false}
        >
          <meshBasicMaterial
            color="#b8fff0"
            transparent
            opacity={0}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      <pointLight
        ref={waterLight}
        position={[0, -2.8, 0]}
        color="#1af0c8"
        intensity={0}
        distance={22}
        decay={2}
      />

      <hemisphereLight args={["#0a3040", "#1af0c8", 0.35]} />

      <group position={[0, 8, 0]}>
        <NightStars cenoteBoost />
      </group>
    </group>
  );
}
