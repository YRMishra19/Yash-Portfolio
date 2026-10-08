import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { COLORS } from "./palette";

/** Shared, smoothed pointer position (-1..1) read by every animated group. */
function usePointer() {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return target;
}

const BAR_HEIGHTS = [0.55, 0.9, 0.7, 1.25, 1.0, 1.55, 1.3];
const BAR_COLORS = [COLORS.sand, COLORS.sage, COLORS.green, COLORS.sandDeep, COLORS.greenBright, COLORS.green, COLORS.sage];

function BarChart() {
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const grow = Math.min(1, t * 0.7);
    const eased = 1 - Math.pow(1 - grow, 3);
    bars.current.forEach((mesh, i) => {
      if (!mesh) return;
      const h = BAR_HEIGHTS[i] * eased * (0.9 + 0.1 * Math.sin(t * 1.1 + i * 0.9));
      mesh.scale.y = Math.max(h, 0.001);
      mesh.position.y = h / 2;
    });
  });
  return (
    <group position={[1.75, 0.55, -0.2]} rotation={[0.18, -0.55, 0.05]} scale={0.68}>
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[2.1, 0.06, 0.62]} />
        <meshStandardMaterial color={COLORS.sand} roughness={0.7} transparent opacity={0.85} />
      </mesh>
      {BAR_HEIGHTS.map((_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            bars.current[i] = m;
          }}
          position={[-0.9 + i * 0.3, 0.001, 0]}
        >
          <boxGeometry args={[0.2, 1, 0.26]} />
          <meshStandardMaterial color={BAR_COLORS[i]} roughness={0.42} metalness={0.12} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitRings() {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outer.current) outer.current.rotation.z = t * 0.12;
    if (inner.current) inner.current.rotation.z = -t * 0.2;
  });
  return (
    <group position={[0, 0.25, -1.1]}>
      <group rotation={[1.15, 0.15, 0]}>
        <group ref={outer}>
          <mesh>
            <torusGeometry args={[2.35, 0.012, 12, 220]} />
            <meshBasicMaterial color={COLORS.green} transparent opacity={0.5} />
          </mesh>
          {[0, 2.1, 4.2].map((a, i) => (
            <mesh key={i} position={[Math.cos(a) * 2.35, Math.sin(a) * 2.35, 0]}>
              <sphereGeometry args={[0.075, 20, 20]} />
              <meshStandardMaterial color={COLORS.greenBright} emissive={COLORS.green} emissiveIntensity={0.9} />
            </mesh>
          ))}
        </group>
      </group>
      <group rotation={[0.55, -0.75, 0.2]}>
        <group ref={inner}>
          <mesh>
            <torusGeometry args={[1.85, 0.01, 12, 200]} />
            <meshBasicMaterial color={COLORS.sandDeep} transparent opacity={0.65} />
          </mesh>
          {[0.8, 3.6].map((a, i) => (
            <mesh key={i} position={[Math.cos(a) * 1.85, Math.sin(a) * 1.85, 0]}>
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshStandardMaterial color={COLORS.sandDeep} emissive={COLORS.sandDeep} emissiveIntensity={0.5} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

function DataNode() {
  const wire = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const sats = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (wire.current) {
      wire.current.rotation.y = t * 0.35;
      wire.current.rotation.x = t * 0.2;
    }
    if (core.current) core.current.rotation.y = -t * 0.6;
    if (sats.current) sats.current.rotation.y = t * 0.5;
  });
  return (
    <group position={[-2.05, 1.55, -0.2]}>
      <mesh ref={wire}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color={COLORS.green} wireframe transparent opacity={0.75} />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color={COLORS.sage} emissive={COLORS.greenBright} emissiveIntensity={0.7} flatShading />
      </mesh>
      <group ref={sats}>
        {[0, 2.1, 4.2].map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * 0.95, Math.sin(a * 1.7) * 0.3, Math.sin(a) * 0.95]}>
            <sphereGeometry args={[0.045, 14, 14]} />
            <meshStandardMaterial color={COLORS.sandDeep} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function CoinStack() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.4;
      group.current.position.y = 2.05 + Math.sin(t * 0.9) * 0.06;
    }
  });
  return (
    <group ref={group} position={[-0.5, 2.05, -0.3]} rotation={[0.35, 0, 0.15]} scale={0.72}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[(i % 2) * 0.05, i * 0.1, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.075, 40]} />
          <meshStandardMaterial color={i % 2 ? COLORS.sand : COLORS.green} roughness={0.35} metalness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const n = 150;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2.6 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.15;
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.9;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 1.2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.04;
  });
  return (
    <points ref={ref} geometry={geometry} position={[0, 0.2, 0]}>
      <pointsMaterial color={COLORS.green} size={0.035} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

function World() {
  const pointer = usePointer();
  const root = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = root.current;
    if (!g) return;
    g.rotation.y += (pointer.current.x * 0.35 - g.rotation.y) * 0.05;
    g.rotation.x += (pointer.current.y * 0.14 - g.rotation.x) * 0.05;
  });
  return (
    <group ref={root}>
      <OrbitRings />
      <BarChart />
      <DataNode />
      <CoinStack />
      <Particles />
    </group>
  );
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering while the hero is scrolled out of view.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.2, 9], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[3, 4, 5]} intensity={1.9} color="#fff4de" />
        <pointLight position={[-4, 1, 3]} intensity={14} distance={12} color={COLORS.greenBright} />
        <World />
      </Canvas>
    </div>
  );
}
