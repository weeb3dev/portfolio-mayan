import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";

const RIPPLE_COUNT = 5;
const MOUTH_STARS = 2800;
const MOUTH_MILKY = 1600;

/**
 * Sacred cenote: limestone shaft, circular mouth packed with night sky,
 * deep turquoise water with soft expanding ripples.
 * Composition: inside looking up through the cave opening.
 */
export function CenoteScene() {
  const group = useRef<THREE.Group>(null);
  const water = useRef<THREE.Mesh>(null);
  const waterDeep = useRef<THREE.Mesh>(null);
  const waterLight = useRef<THREE.PointLight>(null);
  const mouthSky = useRef<THREE.Mesh>(null);
  const ripples = useRef<(THREE.Mesh | null)[]>([]);
  const mouthStars = useRef<THREE.Points>(null);
  const milky = useRef<THREE.Points>(null);
  const sceneT = useSceneProgress();

  const rippleGeo = useMemo(() => new THREE.RingGeometry(0.28, 0.45, 56), []);

  const stalactites = useMemo(() => {
    const items: { x: number; z: number; h: number; r: number }[] = [];
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2 + (i % 3) * 0.1;
      const rad = 5.15 + (i % 5) * 0.28;
      items.push({
        x: Math.cos(a) * rad,
        z: Math.sin(a) * rad,
        h: 0.85 + (i % 5) * 0.4,
        r: 0.09 + (i % 3) * 0.045,
      });
    }
    return items;
  }, []);

  const mouthStarData = useMemo(() => {
    const positions = new Float32Array(MOUTH_STARS * 3);
    const colors = new Float32Array(MOUTH_STARS * 3);
    const col = new THREE.Color();
    for (let i = 0; i < MOUTH_STARS; i++) {
      const u = Math.random();
      const r = Math.sqrt(u) * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const lift = Math.sqrt(Math.max(0, 1 - (r / 5.5) ** 2)) * 3.2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = lift;
      positions[i * 3 + 2] = Math.sin(theta) * r;

      const roll = Math.random();
      if (roll > 0.88) col.setHSL(0.08, 0.55, 0.9);
      else if (roll > 0.7) col.setHSL(0.62, 0.35, 0.88);
      else col.setHSL(0.55, 0.08, 0.82 + Math.random() * 0.18);
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
      const along = (Math.random() - 0.5) * 10.5;
      const across = (Math.random() - 0.5) * (1.4 + Math.random() * 2.8);
      positions[i * 3] = along * 0.5 + across * 0.3;
      positions[i * 3 + 1] = 0.8 + Math.abs(across) * 0.2 + Math.random() * 1.4;
      positions[i * 3 + 2] = Math.sin(along * 0.32) * 0.7 + across * 0.7;

      col.setHSL(0.6 + Math.random() * 0.1, 0.45, 0.55 + Math.random() * 0.4);
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

    if (water.current) {
      const mat = water.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.82 * cenote;
      mat.emissiveIntensity = (0.4 + Math.sin(t * 0.9) * 0.08) * cenote;
      water.current.position.y = -3.55 + Math.sin(t * 0.55) * 0.035;
    }

    if (waterDeep.current) {
      const mat = waterDeep.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.95 * cenote;
      waterDeep.current.position.y = -3.95;
    }

    if (waterLight.current) {
      waterLight.current.intensity = (2.4 + Math.sin(t * 1.1) * 0.3) * cenote;
    }

    if (mouthSky.current) {
      const mat = mouthSky.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.95 * cenote;
    }

    if (mouthStars.current) {
      (mouthStars.current.material as THREE.PointsMaterial).opacity = cenote;
      mouthStars.current.rotation.y = t * 0.01;
    }

    if (milky.current) {
      (milky.current.material as THREE.PointsMaterial).opacity = 0.95 * cenote;
      milky.current.rotation.z = 0.55 + Math.sin(t * 0.04) * 0.04;
    }

    ripples.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      const phase = (t * 0.28 + i / RIPPLE_COUNT) % 1;
      mesh.scale.setScalar(0.4 + phase * 5.8);
      mat.opacity = Math.max(0, (1 - phase) * 0.5 * cenote);
      mesh.position.y = -3.52 + Math.sin(t * 0.55 + i) * 0.012;
      mesh.visible = cenote > 0.05;
    });

    // Fade limestone / props via group-level trick: scale lights + material opacity on tagged meshes
    group.current.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      if (obj.userData.fadeWithCenote) {
        const m = obj.material as THREE.MeshBasicMaterial | THREE.MeshStandardMaterial;
        if (!m.userData.baseOpacity) m.userData.baseOpacity = m.opacity ?? 1;
        m.transparent = true;
        m.opacity = (m.userData.baseOpacity as number) * cenote;
      }
    });
  });

  return (
    <group ref={group} visible={false}>
      {/* Shaft walls — unlit so they read against night fog */}
      <mesh position={[0, 0.2, 0]} userData={{ fadeWithCenote: true }}>
        <cylinderGeometry args={[7.4, 6.6, 14, 64, 1, true]} />
        <meshBasicMaterial color="#6d6356" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 0.1, 0]} userData={{ fadeWithCenote: true }}>
        <cylinderGeometry args={[7.15, 6.35, 13.4, 64, 1, true]} />
        <meshBasicMaterial
          color="#3a4a4c"
          side={THREE.BackSide}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Ceiling / mouth frame */}
      <mesh
        position={[0, 5.35, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ fadeWithCenote: true }}
      >
        <ringGeometry args={[5.35, 12, 64]} />
        <meshBasicMaterial color="#4a4238" side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[0, 5.2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ fadeWithCenote: true }}
      >
        <ringGeometry args={[5.0, 5.55, 48]} />
        <meshBasicMaterial color="#7a7164" side={THREE.DoubleSide} />
      </mesh>

      {/* Jungle rim */}
      <mesh
        position={[0, 5.55, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ fadeWithCenote: true }}
      >
        <torusGeometry args={[6.6, 0.62, 10, 48]} />
        <meshBasicMaterial color="#1f3520" />
      </mesh>
      <mesh
        position={[0, 5.7, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ fadeWithCenote: true }}
      >
        <torusGeometry args={[7.5, 0.4, 8, 40]} />
        <meshBasicMaterial color="#2a4528" />
      </mesh>

      {stalactites.map((s, i) => (
        <mesh
          key={i}
          position={[s.x, 5.15 - s.h * 0.5, s.z]}
          userData={{ fadeWithCenote: true }}
        >
          <coneGeometry args={[s.r, s.h, 7]} />
          <meshBasicMaterial color="#8a8072" />
        </mesh>
      ))}

      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const a = (i / 7) * Math.PI * 2 + 0.35;
        return (
          <mesh
            key={`v${i}`}
            position={[Math.cos(a) * 5.25, 2.6, Math.sin(a) * 5.25]}
            rotation={[0.2, 0, (i % 2 ? 1 : -1) * 0.12]}
            userData={{ fadeWithCenote: true }}
          >
            <cylinderGeometry args={[0.03, 0.045, 5.4, 5]} />
            <meshBasicMaterial color="#355530" />
          </mesh>
        );
      })}

      {/* Deep pool */}
      <mesh
        ref={waterDeep}
        position={[0, -3.95, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[6.0, 72]} />
        <meshStandardMaterial
          color="#053840"
          emissive="#0a5a58"
          emissiveIntensity={0.45}
          roughness={0.6}
          metalness={0.1}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* Surface — cenote turquoise */}
      <mesh ref={water} position={[0, -3.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5.85, 72]} />
        <meshStandardMaterial
          color="#0cb0a8"
          emissive="#18d4c4"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.5}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {Array.from({ length: RIPPLE_COUNT }, (_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            ripples.current[i] = m;
          }}
          geometry={rippleGeo}
          position={[Math.cos(i * 1.7) * 0.7, -3.52, Math.sin(i * 1.7) * 0.55]}
          rotation={[-Math.PI / 2, 0, 0]}
          visible={false}
        >
          <meshBasicMaterial
            color="#b8fff4"
            transparent
            opacity={0}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            fog={false}
          />
        </mesh>
      ))}

      {/* Night sky disc through the mouth — fog disabled so stars stay bright */}
      <group position={[0, 5.85, 0]}>
        <mesh ref={mouthSky} rotation={[-Math.PI / 2, 0, 0]} renderOrder={-1}>
          <circleGeometry args={[5.25, 48]} />
          <meshBasicMaterial
            color="#071428"
            transparent
            opacity={0}
            depthWrite={false}
            fog={false}
          />
        </mesh>
        <points ref={mouthStars} frustumCulled={false} renderOrder={2}>
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
            size={0.16}
            vertexColors
            transparent
            opacity={0}
            depthWrite={false}
            depthTest={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
            fog={false}
          />
        </points>
        <points
          ref={milky}
          frustumCulled={false}
          renderOrder={3}
          rotation={[0.2, 0.35, 0.55]}
        >
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
            size={0.2}
            vertexColors
            transparent
            opacity={0}
            depthWrite={false}
            depthTest={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
            fog={false}
          />
        </points>
      </group>

      <pointLight
        ref={waterLight}
        position={[0, -2.6, 0]}
        color="#18d4c4"
        intensity={0}
        distance={22}
        decay={2}
      />
      <pointLight
        position={[0, 4.2, 0]}
        color="#8aa6ff"
        intensity={1.2}
        distance={20}
        decay={2}
      />
      <ambientLight intensity={0.35} color="#1a3040" />
    </group>
  );
}
