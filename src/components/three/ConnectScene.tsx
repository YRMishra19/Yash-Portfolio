import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { makeGlowTexture } from "./textures";

type SceneProps = { mobile: boolean; finePointer: boolean; active: boolean };

const YOU = new THREE.Color("#f3c76b");
const ME = new THREE.Color("#33d6b4");

/** Two glowing nodes (you / me) joined by a living stream of data. */
function World({ mobile, finePointer }: Omit<SceneProps, "active">) {
  const { size } = useThree();
  const aspect = size.width / size.height;
  const portrait = size.width < 700;
  // Visible world size at z = 0 (camera sits at z = 11, fov 40)
  const hv = 2 * Math.tan((40 * Math.PI) / 360) * 11;
  const wv = hv * aspect;

  const streamN = mobile ? 110 : 240;
  const dustN = mobile ? 90 : 260;

  const glow = useMemo(() => makeGlowTexture(), []);

  // The two nodes flank the headline; the stream arches over it like a bridge.
  const a = useMemo(
    () => new THREE.Vector3(-wv * (portrait ? 0.34 : 0.36), hv * (portrait ? 0.465 : 0.31), 0),
    [wv, hv, portrait],
  );
  const b = useMemo(
    () => new THREE.Vector3(wv * (portrait ? 0.34 : 0.36), hv * (portrait ? 0.465 : 0.31), 0),
    [wv, hv, portrait],
  );
  const bow = hv * (portrait ? 0.07 : 0.1);

  const stream = useMemo(() => {
    const seeds = new Float32Array(streamN * 4);
    for (let i = 0; i < streamN; i++) {
      seeds[i * 4] = Math.random(); // phase along path
      seeds[i * 4 + 1] = (Math.random() - 0.5) * 2; // lateral spread
      seeds[i * 4 + 2] = (Math.random() - 0.5) * 2; // depth spread
      seeds[i * 4 + 3] = 0.05 + Math.random() * 0.07; // speed
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(streamN * 3), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(streamN * 3), 3));
    return { seeds, geometry: g };
  }, [streamN]);

  const dust = useMemo(() => {
    const pos = new Float32Array(dustN * 3);
    const col = new Float32Array(dustN * 3);
    const c = new THREE.Color();
    for (let i = 0; i < dustN; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = -Math.random() * 9;
      c.set(Math.random() > 0.5 ? "#6fe0c8" : "#9fb8ff").multiplyScalar(0.28 + Math.random() * 0.5);
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [dustN]);

  const root = useRef<THREE.Group>(null);
  const haloA = useRef<THREE.Sprite>(null);
  const haloB = useRef<THREE.Sprite>(null);
  const coreA = useRef<THREE.Sprite>(null);
  const coreB = useRef<THREE.Sprite>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const ctrl = useMemo(() => new THREE.Vector3(), []);
  const colTmp = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    if (!finePointer) return;
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [finePointer]);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const k = Math.min(1, dt * 3);

    if (root.current) {
      root.current.rotation.y += (pointer.current.x * 0.18 - root.current.rotation.y) * k * 0.6;
      root.current.rotation.x += (pointer.current.y * 0.1 - root.current.rotation.x) * k * 0.6;
    }

    // Curved path control point rises/falls gently so the stream breathes.
    ctrl.set((a.x + b.x) / 2, (a.y + b.y) / 2 + bow * 2 + Math.sin(t * 0.5) * 0.4, 1.2);

    const pos = stream.geometry.attributes.position as THREE.BufferAttribute;
    const col = stream.geometry.attributes.color as THREE.BufferAttribute;
    const s = stream.seeds;
    for (let i = 0; i < streamN; i++) {
      const ph = (s[i * 4] + t * s[i * 4 + 3]) % 1;
      const u = ph;
      // quadratic bezier a -> ctrl -> b
      const iu = 1 - u;
      tmp.set(
        iu * iu * a.x + 2 * iu * u * ctrl.x + u * u * b.x,
        iu * iu * a.y + 2 * iu * u * ctrl.y + u * u * b.y,
        iu * iu * a.z + 2 * iu * u * ctrl.z + u * u * b.z,
      );
      // spread is widest mid-way, tight at the nodes
      const w = Math.sin(u * Math.PI);
      tmp.x += s[i * 4 + 1] * 0.32 * w;
      tmp.y += s[i * 4 + 1] * 0.26 * w;
      tmp.z += s[i * 4 + 2] * 0.7 * w;
      pos.setXYZ(i, tmp.x, tmp.y, tmp.z);
      colTmp.copy(YOU).lerp(ME, u).multiplyScalar(0.15 + 0.85 * w);
      col.setXYZ(i, colTmp.r, colTmp.g, colTmp.b);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;

    const pulse = 0.5 + 0.5 * Math.sin(t * 1.4);
    const pulse2 = 0.5 + 0.5 * Math.sin(t * 1.4 + 2.2);
    haloA.current?.scale.setScalar((portrait ? 2.6 : 3.8) + pulse * 0.7);
    haloB.current?.scale.setScalar((portrait ? 2.8 : 4.1) + pulse2 * 0.7);
    coreA.current?.scale.setScalar(portrait ? 0.7 : 1.0);
    coreB.current?.scale.setScalar(portrait ? 0.8 : 1.15);
    if (ringA.current) {
      ringA.current.rotation.z = t * 0.35;
      ringA.current.rotation.x = 1.1 + Math.sin(t * 0.4) * 0.15;
    }
    if (ringB.current) {
      ringB.current.rotation.z = -t * 0.3;
      ringB.current.rotation.x = 1.0 + Math.cos(t * 0.45) * 0.15;
    }
  });

  const mat = (c: THREE.Color, o: number) => (
    <spriteMaterial map={glow} color={c} transparent opacity={o} depthWrite={false} blending={THREE.AdditiveBlending} />
  );

  return (
    <group ref={root}>
      <points geometry={dust}>
        <pointsMaterial
          map={glow}
          vertexColors
          size={mobile ? 0.2 : 0.16}
          sizeAttenuation
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points geometry={stream.geometry} frustumCulled={false}>
        <pointsMaterial
          map={glow}
          vertexColors
          size={mobile ? 0.34 : 0.28}
          sizeAttenuation
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group position={a}>
        <sprite ref={haloA}>{mat(YOU, 0.5)}</sprite>
        <sprite ref={coreA}>{mat(new THREE.Color("#fff3d2"), 0.95)}</sprite>
        <mesh ref={ringA}>
          <torusGeometry args={[portrait ? 0.6 : 0.8, 0.01, 8, 120]} />
          <meshBasicMaterial color={YOU} transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      <group position={b}>
        <sprite ref={haloB}>{mat(ME, 0.55)}</sprite>
        <sprite ref={coreB}>{mat(new THREE.Color("#d8fff5"), 0.95)}</sprite>
        <mesh ref={ringB}>
          <torusGeometry args={[portrait ? 0.7 : 0.95, 0.01, 8, 120]} />
          <meshBasicMaterial color={ME} transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}

export default function ConnectScene({ mobile, finePointer, active }: SceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, mobile ? 1.5 : 2]}
      camera={{ position: [0, 0, 11], fov: 40, near: 0.1, far: 80 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <World mobile={mobile} finePointer={finePointer} />
    </Canvas>
  );
}
