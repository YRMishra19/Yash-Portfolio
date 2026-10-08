import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { COLORS } from "./palette";

/** A slowly turning 3D "data network" whose rotation and depth follow the page scroll. */
function Network() {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scroll.current = window.scrollY / max;
    };
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const { points, lines, cubes } = useMemo(() => {
    const n = 90;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      pts.push(new THREE.Vector3((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 11, (Math.random() - 0.5) * 9));
    }
    const pos = new Float32Array(n * 3);
    pts.forEach((p, i) => p.toArray(pos, i * 3));
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const seg: number[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (pts[i].distanceTo(pts[j]) < 2.6) seg.push(...pts[i].toArray(), ...pts[j].toArray());
      }
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(seg), 3));

    const cubePos = Array.from({ length: 7 }, () => [
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 9,
      (Math.random() - 0.5) * 7,
      0.25 + Math.random() * 0.35,
    ]);
    return { points: pg, lines: lg, cubes: cubePos };
  }, []);

  useFrame(({ clock, camera }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    const targetY = scroll.current * Math.PI * 1.4 + t * 0.02 + pointer.current.x * 0.12;
    const targetX = -0.25 + scroll.current * 0.5 + pointer.current.y * 0.06;
    g.rotation.y += (targetY - g.rotation.y) * 0.06;
    g.rotation.x += (targetX - g.rotation.x) * 0.06;
    camera.position.z += (11 - scroll.current * 2.5 - camera.position.z) * 0.05;
  });

  return (
    <group ref={group}>
      <points geometry={points}>
        <pointsMaterial color={COLORS.green} size={0.07} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
      </points>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={COLORS.green} transparent opacity={0.13} />
      </lineSegments>
      {cubes.map(([x, y, z, s], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[i, i * 0.7, 0]} scale={s}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={i % 2 ? COLORS.sandDeep : COLORS.green} wireframe transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

export default function AmbientScene() {
  return (
    <Canvas
      dpr={1}
      camera={{ position: [0, 0, 11], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
    >
      <Network />
    </Canvas>
  );
}
