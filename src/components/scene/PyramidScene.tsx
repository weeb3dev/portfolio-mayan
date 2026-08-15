import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";
import { StepPyramid } from "./StepPyramid";
import { SkyRig } from "./SkyRig";
import { MilkyWay } from "./MilkyWay";
import { NightStars } from "./NightStars";
import { Quetzal } from "./Quetzal";
import { CenoteScene } from "./CenoteScene";

function CameraRig() {
  const sceneT = useSceneProgress();

  useFrame((state) => {
    const { cenote } = scenePhases(sceneT);
    const plaza = 1 - cenote;

    const plazaPos = new THREE.Vector3(
      THREE.MathUtils.lerp(0.6, -1.2, Math.min(sceneT, 0.58) / 0.58),
      THREE.MathUtils.lerp(3.8, 5.2, Math.min(sceneT, 0.58) / 0.58),
      THREE.MathUtils.lerp(14.5, 11.8, Math.min(sceneT, 0.58) / 0.58),
    );
    const plazaLook = new THREE.Vector3(0, 2.2 + Math.min(sceneT, 0.58) * 0.6, 0);

    // Inside cenote: mid-shaft, see both starry mouth and glowing water
    const cenotePos = new THREE.Vector3(0.2, -1.5, 5.2);
    const cenoteLook = new THREE.Vector3(0, -1.2, 0);

    const target = plazaPos.lerp(cenotePos, cenote);
    const look = plazaLook.lerp(cenoteLook, cenote);

    state.camera.position.lerp(target, 0.07);
    state.camera.lookAt(look);
    void plaza;
  });

  return null;
}

function Ground() {
  const ref = useRef<THREE.Mesh>(null);
  const sceneT = useSceneProgress();

  useFrame(() => {
    if (!ref.current) return;
    const { cenote } = scenePhases(sceneT);
    const night = THREE.MathUtils.smoothstep(sceneT, 0.28, 0.55);
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    const day = new THREE.Color("#6a7a48");
    const dusk = new THREE.Color("#3d3428");
    const nightCol = new THREE.Color("#0e0f16");
    mat.color.copy(
      night < 0.5
        ? day.clone().lerp(dusk, night * 2)
        : dusk.clone().lerp(nightCol, (night - 0.5) * 2),
    );
    mat.transparent = true;
    mat.opacity = 1 - cenote;
    ref.current.visible = cenote < 0.98;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.36, 0]} receiveShadow>
      <circleGeometry args={[56, 72]} />
      <meshStandardMaterial color="#6a7a48" roughness={0.95} metalness={0} />
    </mesh>
  );
}

export function PyramidScene() {
  return (
    <div className="canvas-root" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0.6, 3.8, 14.5], fov: 42, near: 0.1, far: 200 }}
        shadows
      >
        <Suspense fallback={null}>
          <CameraRig />
          <SkyRig />
          <NightStars />
          <MilkyWay />
          <Quetzal />
          <StepPyramid />
          <Ground />
          <CenoteScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
