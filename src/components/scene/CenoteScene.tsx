import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";

const RIPPLE_COUNT = 5;
const MOUTH_STARS = 2200;
const MOUTH_MILKY = 1400;

/**
 * Sacred cenote: limestone shaft, circular mouth packed with night sky,
 * deep turquoise water with soft expanding ripples.
 * Vibe: inside looking up through the cave opening.
 */
export function CenoteScene() {
  const group = useRef<THREE.Group>(null);
  const water = useRef<THREE.Mesh>(null);
  const waterDeep = useRef<THREE.Mesh>(null);
  const waterLight = useRef<THREE.PointLight>(null);
  const mouthGlow = useRef<THREE.Mesh>(null);
  const ripples = useRef<(THREE.Mesh | null)[]>([]);
  const mouthStars = useRef<THREE.Points>(null);
  const milky = useRef<THREE.Points>(null);
  const sceneT = useSceneProgress();

  const rippleGeo = useMemo(() => new THREE.RingGeometry(0.3, 0.48, 56), []);

  const stalactites = useMemo(() => {
    const items: { x: number; z: number; h: number; r: number; y: number }[] = [];
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2 + (i % 3) * 0.12;
      const rad = 5.4 + (i % 4) * 0.35;
      items.push({
        x: Math.cos(a) * rad,
        z: Math.sin(a) * rad,
        h: 0.7 + (i % 5) * 0.35,
        r: 0.08 + (i % 3) * 0.04,
        y: 5.55,
      });
    }
    return items;
  }, []);

  const mouthStarData = useMemo(() => {
    const positions = new Float32Array(MOUTH_STARS * 3);
    const colors = new Float32Array(MOUTH_STARS * 3);
    const col = new THREE.Color();
    for (let i = 0; i < MOUTH_STARS; i++) {
      // Dense disc filling the circular mouth, slight dome
      const u = Math.random();
      const r = Math.sqrt(u) * 5.8;
      const theta = Math.random() * Math.PI * 2;
      const lift = Math.sqrt(Math.max(0, 1 - (r / 5.8) ** 2)) * 2.2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = lift;
      positions[i * 3 + 2] = Math.sin(theta) * r;

      const cool = Math.random();
      col.setHSL(0.55 + cool * 0.12, 0.15, 0.75 + Math.random() * 0.25);
      if (Math.random() > 0.82) col.setHSL(0.08, 0.45, 0.85);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, []);

  const milkyData = useMemo(() => {
    const positions = new Float32Array(MOUTH_MILKY * 3);
    const colors = new Float32Array(MOUTH_MILKY * 3);
    const col = new THREE.Color();
    for (let i = 0; i < MOUTH_MILKY; i++) {
      const along = (Math.random() - 0.5) * 11;
      const across = (Math.random() - 0.5) * (1.2 + Math.random() * 2.4);
      const band = Math.sin(along * 0.35) * 0.6;
      positions[i * 3] = along * 0.55 + across * 0.35;
      positions[i * 3 + 1] = 0.4 + Math.abs(across) * 0.15 + Math.random() * 0.8;
      positions[i * 3 + 2] = band + across * 0.75 - along * 0.08;

      col.setHSL(0.58 + Math.random() * 0.08, 0.35, 0.55 + Math.random() * 0.35);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, []);

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
            if (
              !obj.userData.isWater &&
              !obj.userData.isRipple &&
              !obj.userData.isMouthSky
            ) {
              m.opacity = (m.userData.baseOpacity as number) * cenote;
            }
          }
        });
      }
    });

    if (water.current) {
      const mat = water.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.78 * cenote;
      mat.emissiveIntensity = (0.28 + Math.sin(t * 0.9) * 0.06) * cenote;
      water.current.position.y = -4.15 + Math.sin(t * 0.55) * 0.04;
    }

    if (waterDeep.current) {
      const mat = waterDeep.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.92 * cenote;
      waterDeep.current.position.y = -4.55 + Math.sin(t * 0.55) * 0.02;
    }

    if (waterLight.current) {
      waterLight.current.intensity = (1.6 + Math.sin(t * 1.1) * 0.25) * cenote;
    }

    if (mouthGlow.current) {
      const mat = mouthGlow.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.22 * cenote;
    }

    if (mouthStars.current) {
      (mouthStars.current.material as THREE.PointsMaterial).opacity = 0.95 * cenote;
      mouthStars.current.rotation.y = t * 0.008;
    }

    if (milky.current) {
      (milky.current.material as THREE.PointsMaterial).opacity = 0.85 * cenote;
      milky.current.rotation.z = Math.sin(t * 0.04) * 0.05;
    }

    ripples.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      const phase = (t * 0.28 + i / RIPPLE_COUNT) % 1;
      const scale = 0.35 + phase * 6.2;
      mesh.scale.setScalar(scale);
      mat.opacity = Math.max(0, (1 - phase) * 0.42 * cenote);
      mesh.position.y = -4.12 + Math.sin(t * 0.55 + i) * 0.015;
      mesh.visible = cenote > 0.05;
    });
  });

  return (
    <group ref={group} visible={false}>
      {/* Outer limestone shaft */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[7.6, 6.8, 16, 64, 1, true]} />
        <meshStandardMaterial
          color="#4a433a"
          side={THREE.BackSide}
          roughness={0.97}
          metalness={0.02}
        />
      </mesh>
      {/* Inner damp stone tint */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[7.35, 6.55, 15.2, 64, 1, true]} />
        <meshStandardMaterial
          color="#2a383c"
          side={THREE.BackSide}
          roughness={0.92}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Ceiling slab with circular mouth */}
      <mesh position={[0, 6.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.9, 11.5, 64]} />
        <meshStandardMaterial color="#3f3830" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      {/* Jagged-feeling inner lip */}
      <mesh position={[0, 5.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.55, 6.15, 48]} />
        <meshStandardMaterial color="#5c5348" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Jungle rim around the mouth */}
      <mesh position={[0, 6.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[7.4, 0.55, 10, 48]} />
        <meshStandardMaterial color="#1a2e1c" roughness={0.95} />
      </mesh>
      <mesh position={[0, 6.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8.2, 0.35, 8, 40]} />
        <meshStandardMaterial color="#243c22" roughness={0.95} />
      </mesh>

      {stalactites.map((s, i) => (
        <mesh key={i} position={[s.x, s.y - s.h * 0.5, s.z]}>
          <coneGeometry args={[s.r, s.h, 7]} />
          <meshStandardMaterial color="#6a6258" roughness={0.92} />
        </mesh>
      ))}

      {/* Soft vines */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2 + 0.4;
        const x = Math.cos(a) * 5.7;
        const z = Math.sin(a) * 5.7;
        return (
          <mesh key={`v${i}`} position={[x, 3.2, z]} rotation={[0.15, 0, 0.08 * (i % 2 ? 1 : -1)]}>
            <cylinderGeometry args={[0.025, 0.04, 5.2, 5]} />
            <meshStandardMaterial color="#2d4a28" roughness={0.9} />
          </mesh>
        );
      })}

      {/* Deep pool body */}
      <mesh
        ref={waterDeep}
        position={[0, -4.55, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ isWater: true }}
      >
        <circleGeometry args={[6.3, 72]} />
        <meshStandardMaterial
          color="#064850"
          emissive="#0a6a68"
          emissiveIntensity={0.35}
          roughness={0.55}
          metalness={0.15}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Surface — cenote turquoise */}
      <mesh
        ref={water}
        position={[0, -4.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ isWater: true }}
      >
        <circleGeometry args={[6.15, 72]} />
        <meshStandardMaterial
          color="#0ea8a4"
          emissive="#14c8b8"
          emissiveIntensity={0.3}
          roughness={0.12}
          metalness={0.45}
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
          position={[
            Math.cos(i * 1.7) * 0.6,
            -4.12,
            Math.sin(i * 1.7) * 0.5,
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ isRipple: true }}
          visible={false}
        >
          <meshBasicMaterial
            color="#9ef5e8"
            transparent
            opacity={0}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Night sky through the mouth */}
      <group position={[0, 7.2, 0]}>
        <mesh
          ref={mouthGlow}
          rotation={[-Math.PI / 2, 0, 0]}
          userData={{ isMouthSky: true }}
        >
          <circleGeometry args={[5.7, 48]} />
          <meshBasicMaterial
            color="#0a1630"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
        <points ref={mouthStars} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[mouthStarData.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[mouthStarData.colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.11}
            vertexColors
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
        <points ref={milky} frustumCulled={false} rotation={[0.15, 0.4, 0.55]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[milkyData.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[milkyData.colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.14}
            vertexColors
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
      </group>

      <pointLight
        ref={waterLight}
        position={[0, -3.2, 0]}
        color="#14c8b8"
        intensity={0}
        distance={20}
        decay={2}
      />
      {/* Soft sky fill from the mouth */}
      <pointLight position={[0, 5.5, 0]} color="#6a8cff" intensity={0.55} distance={18} decay={2} />
      <hemisphereLight args={["#0c2038", "#0a6860", 0.45]} />
    </group>
  );
}
