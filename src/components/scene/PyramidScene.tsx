import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { StepPyramid } from "./StepPyramid";
import { SkyRig } from "./SkyRig";
import { MilkyWay } from "./MilkyWay";
import { NightStars } from "./NightStars";

function CameraRig() {
  const progress = useScrollProgress();

  useFrame((state) => {
    const t = progress;
    const target = new THREE.Vector3(
      THREE.MathUtils.lerp(0.6, -1.2, t),
      THREE.MathUtils.lerp(3.8, 5.6, t),
      THREE.MathUtils.lerp(14.5, 11.5, t),
    );
    state.camera.position.lerp(target, 0.06);
    state.camera.lookAt(0, 2.2 + t * 0.8, 0);
  });

  return null;
}

function Ground() {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useScrollProgress();

  useFrame(() => {
    if (!ref.current) return;
    const night = THREE.MathUtils.smoothstep(progress, 0.15, 0.7);
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    const day = new THREE.Color("#6a7a48");
    const dusk = new THREE.Color("#3d3428");
    const nightCol = new THREE.Color("#0e0f16");
    mat.color.copy(
      night < 0.5 ? day.clone().lerp(dusk, night * 2) : dusk.clone().lerp(nightCol, (night - 0.5) * 2),
    );
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
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0.6, 3.8, 14.5], fov: 42, near: 0.1, far: 200 }}
        shadows
      >
        <Suspense fallback={null}>
          <CameraRig />
          <SkyRig />
          <NightStars />
          <MilkyWay />
          <StepPyramid />
          <Ground />
        </Suspense>
      </Canvas>
    </div>
  );
}
