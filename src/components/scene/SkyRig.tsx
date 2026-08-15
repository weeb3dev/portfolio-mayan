import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../../hooks/useScrollProgress";

export function SkyRig() {
  const sunLight = useRef<THREE.DirectionalLight>(null);
  const fill = useRef<THREE.DirectionalLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const sunMesh = useRef<THREE.Mesh>(null);
  const progress = useScrollProgress();

  useFrame((state) => {
    const night = THREE.MathUtils.smoothstep(progress, 0.1, 0.75);
    const dusk = THREE.MathUtils.smoothstep(progress, 0.2, 0.55);

    // Equinox NW low-sun window for Kukulkán shadow
    const equinox =
      THREE.MathUtils.smoothstep(progress, 0.32, 0.42) *
      (1 - THREE.MathUtils.smoothstep(progress, 0.52, 0.62));

    const angle = THREE.MathUtils.lerp(1.15, -0.45, night);
    let sunX = Math.cos(angle) * 30;
    let sunY = Math.sin(angle) * 24;
    let sunZ = 10;

    if (equinox > 0.01) {
      // Swing toward northwest, low on the horizon
      const nw = new THREE.Vector3(-22, 4.5, 18);
      sunX = THREE.MathUtils.lerp(sunX, nw.x, equinox);
      sunY = THREE.MathUtils.lerp(sunY, nw.y, equinox);
      sunZ = THREE.MathUtils.lerp(sunZ, nw.z, equinox);
    }

    if (sunLight.current) {
      sunLight.current.position.set(sunX, Math.max(sunY, 0.2), sunZ);
      sunLight.current.intensity = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(2.6, 0.05, night),
        2.1,
        equinox,
      );
      sunLight.current.color.set(
        equinox > 0.3 ? "#ffb06a" : dusk < 0.6 ? "#fff2d8" : "#ff7a3c",
      );
    }

    if (sunMesh.current) {
      sunMesh.current.position.set(sunX, sunY, sunZ);
      const mat = sunMesh.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.clamp(1.1 - night * 1.35 + equinox * 0.25, 0, 1);
      sunMesh.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.6, dusk));
    }

    if (fill.current) {
      fill.current.intensity = THREE.MathUtils.lerp(0.5, 0.15, night);
      fill.current.color.set(night > 0.55 ? "#6b7cff" : "#a8d4ff");
    }

    if (ambient.current) {
      ambient.current.intensity = THREE.MathUtils.lerp(0.62, 0.16, night);
      ambient.current.color.set(night > 0.55 ? "#182038" : "#d9e9ff");
    }

    const dayBg = new THREE.Color("#74b4d6");
    const duskBg = new THREE.Color("#d4784a");
    const nightBg = new THREE.Color("#070b16");
    const bg =
      night < 0.42
        ? dayBg.clone().lerp(duskBg, night / 0.42)
        : duskBg.clone().lerp(nightBg, (night - 0.42) / 0.58);

    state.scene.background = bg;
    state.scene.fog = new THREE.FogExp2(
      bg.getHex(),
      THREE.MathUtils.lerp(0.016, 0.011, night),
    );
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.6} />
      <directionalLight
        ref={sunLight}
        castShadow
        intensity={2.6}
        position={[18, 22, 10]}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={70}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-12}
      />
      <directionalLight ref={fill} intensity={0.45} position={[-14, 7, -12]} />

      <mesh ref={sunMesh} position={[18, 22, 10]}>
        <sphereGeometry args={[1.35, 24, 24]} />
        <meshBasicMaterial color="#ffe2a8" transparent opacity={1} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, -6]}>
        <ringGeometry args={[10, 38, 64]} />
        <meshBasicMaterial
          color="#c45c3a"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
