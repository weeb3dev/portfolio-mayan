import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scenePhases, useSceneProgress } from "../../hooks/useSceneProgress";

const TRI_COUNT = 7;

type Props = {
  anchors: { x: number; y: number; z: number }[];
};

/**
 * Stylized Kukulkán equinox shadow: seven light triangles
 * descending the north balustrade during the dusk scene window.
 */
export function SerpentShadow({ anchors }: Props) {
  const group = useRef<THREE.Group>(null);
  const litMats = useRef<THREE.MeshBasicMaterial[]>([]);
  const shadeMats = useRef<THREE.MeshBasicMaterial[]>([]);
  const sceneT = useSceneProgress();

  const litGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1.15, 0);
    shape.lineTo(0, 0.95);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  const shadeGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1.15, 0);
    shape.lineTo(1.15, 0.95);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  const tris = useMemo(() => {
    const list = anchors.slice(0, TRI_COUNT);
    while (list.length < TRI_COUNT && list.length > 0) {
      const last = list[list.length - 1];
      list.push({ x: last.x, y: last.y - 0.7, z: last.z + 0.55 });
    }
    return list;
  }, [anchors]);

  useFrame(() => {
    const { cenote } = scenePhases(sceneT);
    const reveal = THREE.MathUtils.smoothstep(sceneT, 0.28, 0.46);
    const fade = 1 - THREE.MathUtils.smoothstep(sceneT, 0.52, 0.62);
    const strength = reveal * fade * (1 - cenote);

    litMats.current.forEach((mat, i) => {
      if (!mat) return;
      const triIndex = i % TRI_COUNT;
      const local = THREE.MathUtils.clamp(reveal * (TRI_COUNT + 0.8) - triIndex, 0, 1);
      mat.opacity = strength * local * 0.95;
    });

    shadeMats.current.forEach((mat, i) => {
      if (!mat) return;
      const triIndex = i % TRI_COUNT;
      const local = THREE.MathUtils.clamp(reveal * (TRI_COUNT + 0.8) - triIndex, 0, 1);
      mat.opacity = strength * local * 0.7;
    });

    if (group.current) {
      group.current.visible = strength > 0.03;
    }
  });

  return (
    <group ref={group} visible={false}>
      {tris.map((a, i) => (
        <group key={`L-${i}`}>
          <group position={[-1.12, a.y + 0.05, a.z + 0.05]}>
            <mesh geometry={litGeo} rotation={[0.05, Math.PI / 2, -0.08]} renderOrder={3}>
              <meshBasicMaterial
                ref={(m) => {
                  if (m) litMats.current[i] = m;
                }}
                color="#f3d7a4"
                transparent
                opacity={0}
                depthWrite={false}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh
              geometry={shadeGeo}
              position={[0, 0, 0.02]}
              rotation={[0.05, Math.PI / 2, -0.08]}
              renderOrder={2}
            >
              <meshBasicMaterial
                ref={(m) => {
                  if (m) shadeMats.current[i] = m;
                }}
                color="#1a120e"
                transparent
                opacity={0}
                depthWrite={false}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
          {/* Mirror on right balustrade */}
          <group position={[1.12, a.y + 0.05, a.z + 0.05]} scale={[-1, 1, 1]}>
            <mesh geometry={litGeo} rotation={[0.05, Math.PI / 2, -0.08]} renderOrder={3}>
              <meshBasicMaterial
                color="#f3d7a4"
                transparent
                opacity={0}
                depthWrite={false}
                side={THREE.DoubleSide}
                ref={(m) => {
                  if (m) litMats.current[i + TRI_COUNT] = m;
                }}
              />
            </mesh>
            <mesh
              geometry={shadeGeo}
              position={[0, 0, 0.02]}
              rotation={[0.05, Math.PI / 2, -0.08]}
              renderOrder={2}
            >
              <meshBasicMaterial
                color="#1a120e"
                transparent
                opacity={0}
                depthWrite={false}
                side={THREE.DoubleSide}
                ref={(m) => {
                  if (m) shadeMats.current[i + TRI_COUNT] = m;
                }}
              />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}
