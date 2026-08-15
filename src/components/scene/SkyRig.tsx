import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";

export function SkyRig() {
  const sunLight = useRef<THREE.DirectionalLight>(null);
  const fill = useRef<THREE.DirectionalLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const sunMesh = useRef<THREE.Mesh>(null);
  const horizon = useRef<THREE.Mesh>(null);
  const sceneT = useSceneProgress();

  useFrame((state) => {
    const { dusk, cenote } = scenePhases(sceneT);
    const nightAmt = THREE.MathUtils.smoothstep(sceneT, 0.28, 0.55);

    // Equinox NW low-sun during dusk phase
    const equinox =
      THREE.MathUtils.smoothstep(sceneT, 0.28, 0.38) *
      (1 - THREE.MathUtils.smoothstep(sceneT, 0.48, 0.56));

    const angle = THREE.MathUtils.lerp(1.15, -0.45, nightAmt);
    let sunX = Math.cos(angle) * 30;
    let sunY = Math.sin(angle) * 24;
    let sunZ = 10;

    if (equinox > 0.01) {
      const nw = new THREE.Vector3(-22, 4.5, 18);
      sunX = THREE.MathUtils.lerp(sunX, nw.x, equinox);
      sunY = THREE.MathUtils.lerp(sunY, nw.y, equinox);
      sunZ = THREE.MathUtils.lerp(sunZ, nw.z, equinox);
    }

    if (sunLight.current) {
      sunLight.current.position.set(sunX, Math.max(sunY, 0.2), sunZ);
      const base = THREE.MathUtils.lerp(2.6, 0.05, nightAmt);
      sunLight.current.intensity = THREE.MathUtils.lerp(base, 2.1, equinox) * (1 - cenote * 0.95);
      sunLight.current.color.set(
        equinox > 0.3 ? "#ffb06a" : dusk > 0.2 ? "#ff7a3c" : "#fff2d8",
      );
      sunLight.current.visible = cenote < 0.95;
    }

    if (sunMesh.current) {
      sunMesh.current.position.set(sunX, sunY, sunZ);
      const mat = sunMesh.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.clamp(
        1.1 - nightAmt * 1.35 + equinox * 0.25 - cenote,
        0,
        1,
      );
      sunMesh.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.6, dusk));
      sunMesh.current.visible = mat.opacity > 0.02;
    }

    if (fill.current) {
      fill.current.intensity =
        THREE.MathUtils.lerp(0.5, 0.12, nightAmt) * (1 - cenote) + cenote * 0.08;
      fill.current.color.set(cenote > 0.4 ? "#12d4e6" : nightAmt > 0.55 ? "#6b7cff" : "#a8d4ff");
    }

    if (ambient.current) {
      ambient.current.intensity =
        THREE.MathUtils.lerp(0.62, 0.14, nightAmt) * (1 - cenote * 0.5) + cenote * 0.22;
      ambient.current.color.set(cenote > 0.4 ? "#0a2a32" : nightAmt > 0.55 ? "#182038" : "#d9e9ff");
    }

    if (horizon.current) {
      const mat = horizon.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.12 * (1 - cenote);
      horizon.current.visible = cenote < 0.9;
    }

    const dayBg = new THREE.Color("#74b4d6");
    const duskBg = new THREE.Color("#d4784a");
    const nightBg = new THREE.Color("#070b16");
    const cenoteBg = new THREE.Color("#020a0e");
    let bg: THREE.Color;
    if (cenote > 0.01) {
      bg = nightBg.clone().lerp(cenoteBg, cenote);
    } else if (nightAmt < 0.42) {
      bg = dayBg.clone().lerp(duskBg, nightAmt / 0.42);
    } else {
      bg = duskBg.clone().lerp(nightBg, (nightAmt - 0.42) / 0.58);
    }

    state.scene.background = bg;
    state.scene.fog = new THREE.FogExp2(
      bg.getHex(),
      THREE.MathUtils.lerp(0.016, cenote > 0.5 ? 0.028 : 0.01, Math.max(nightAmt, cenote)),
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

      <mesh ref={horizon} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, -6]}>
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
