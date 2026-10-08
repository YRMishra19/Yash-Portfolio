import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { buildLattice, buildNeural, buildSkyline, makeGeometry, makeParticleMaterial } from "./particles";
import { makeGlowTexture, makeStreakTexture } from "./textures";

export const STORY_COLORS = { data: "#33d6b4", biz: "#f3c76b", ai: "#8fd0ff" } as const;
const COLOR_LIST = [STORY_COLORS.data, STORY_COLORS.biz, STORY_COLORS.ai];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

type Layout = { from: THREE.Vector3[]; to: THREE.Vector3[]; camFar: number; camNear: number; scale: number };
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const LANDSCAPE: Layout = {
  from: [V(-4.7, 0.7, 0), V(4.7, 0.7, 0), V(0, -2.5, 0.6)],
  to: [V(-0.4, 0.15, 0), V(0.4, 0.15, 0), V(0, -0.25, 0)],
  camFar: 12.5,
  camNear: 8.8,
  scale: 1.3,
};
const PORTRAIT: Layout = {
  from: [V(0, 3.1, 0), V(-1.7, -1.5, 0), V(1.7, -1.5, 0)],
  to: [V(-0.3, 0.2, 0), V(0.3, 0.2, 0), V(0, -0.2, 0)],
  camFar: 15,
  camNear: 11,
  scale: 0.8,
};

type SceneProps = {
  progress: MotionValue<number>;
  mobile: boolean;
  finePointer: boolean;
  active: boolean;
};

function World({ progress, mobile, finePointer }: Omit<SceneProps, "active">) {
  const { size, camera } = useThree();
  const portrait = size.width / size.height < 1;

  const count = mobile ? 420 : 1100;
  const streamCount = mobile ? 46 : 90;

  const { geos, mats, glow, streak } = useMemo(() => {
    const geos = [buildLattice(count), buildSkyline(count), buildNeural(count)].map(makeGeometry);
    const mats = COLOR_LIST.map((c) => makeParticleMaterial(c, mobile ? 1.15 : 1));
    return { geos, mats, glow: makeGlowTexture(), streak: makeStreakTexture() };
  }, [count, mobile]);

  const groups = useRef<(THREE.Group | null)[]>([null, null, null]);
  const world = useRef<THREE.Group>(null);
  const core = useRef<THREE.Sprite>(null);
  const flare = useRef<THREE.Sprite>(null);
  const halo = useRef<THREE.Sprite>(null);
  const rings = useRef<(THREE.Mesh | null)[]>([null, null, null]);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!finePointer) return;
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [finePointer]);

  // Particle streams that flow between the three clusters.
  const streams = useMemo(() => {
    const pairs: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 0],
    ];
    return pairs.map(([a, b]) => {
      const offsets = Float32Array.from({ length: streamCount }, () => Math.random());
      const speeds = Float32Array.from({ length: streamCount }, () => 0.07 + Math.random() * 0.1);
      const lanes = Float32Array.from({ length: streamCount }, () => (Math.random() - 0.5) * 2);
      const pos = new Float32Array(streamCount * 3);
      const col = new Float32Array(streamCount * 3);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      return { a, b, offsets, speeds, lanes, pos, col, geo };
    });
  }, [streamCount]);

  const tmp = useMemo(
    () => ({ p0: new THREE.Vector3(), p1: new THREE.Vector3(), p2: new THREE.Vector3(), ca: new THREE.Color(), cb: new THREE.Color() }),
    [],
  );

  const dust = useMemo(() => {
    const n = mobile ? 160 : 420;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 16 + Math.random() * 20;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph) * 0.7;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 8;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [mobile]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const raw = clamp01(progress.get());
    const conv = ease(clamp01((raw - 0.04) / 0.66));
    const ignite = ease(clamp01((raw - 0.58) / 0.42));
    const layout = portrait ? PORTRAIT : LANDSCAPE;

    // Clusters glide from their own corners into one shared centre.
    groups.current.forEach((g, k) => {
      if (!g) return;
      g.position.lerpVectors(layout.from[k], layout.to[k], conv);
      const s = layout.scale * (1 - 0.3 * conv);
      g.scale.setScalar(s);
      g.rotation.y += delta * (0.16 + k * 0.05) * (k === 1 ? -1 : 1);
      g.rotation.x = Math.sin(t * 0.25 + k) * 0.12;
      mats[k].uniforms.uTime.value = t;
      mats[k].uniforms.uOpacity.value = 0.55 + 0.45 * Math.min(1, raw * 6 + 0.2);
    });

    // Streams.
    streams.forEach((s) => {
      const ga = groups.current[s.a];
      const gb = groups.current[s.b];
      if (!ga || !gb) return;
      tmp.p0.copy(ga.position);
      tmp.p2.copy(gb.position);
      tmp.p1
        .copy(tmp.p0)
        .add(tmp.p2)
        .multiplyScalar(0.5)
        .add(V(0, 1.3 * (1 - conv) + 0.25, 0.9 * (1 - conv)));
      tmp.ca.set(COLOR_LIST[s.a]);
      tmp.cb.set(COLOR_LIST[s.b]);
      for (let i = 0; i < streamCount; i++) {
        const u = (s.offsets[i] + t * s.speeds[i]) % 1;
        const iu = 1 - u;
        const spread = 0.16 * (1 - conv * 0.6);
        const x = iu * iu * tmp.p0.x + 2 * iu * u * tmp.p1.x + u * u * tmp.p2.x + Math.sin(t * 1.3 + i) * spread * s.lanes[i];
        const y = iu * iu * tmp.p0.y + 2 * iu * u * tmp.p1.y + u * u * tmp.p2.y + Math.cos(t * 1.1 + i * 1.7) * spread * s.lanes[i];
        const z = iu * iu * tmp.p0.z + 2 * iu * u * tmp.p1.z + u * u * tmp.p2.z + s.lanes[i] * spread;
        s.pos[i * 3] = x;
        s.pos[i * 3 + 1] = y;
        s.pos[i * 3 + 2] = z;
        const fade = Math.sin(Math.PI * u) * 0.95 + 0.05;
        s.col[i * 3] = (tmp.ca.r * iu + tmp.cb.r * u) * fade;
        s.col[i * 3 + 1] = (tmp.ca.g * iu + tmp.cb.g * u) * fade;
        s.col[i * 3 + 2] = (tmp.ca.b * iu + tmp.cb.b * u) * fade;
      }
      s.geo.attributes.position.needsUpdate = true;
      s.geo.attributes.color.needsUpdate = true;
    });

    // Core ignition: soft halo, bright heart, anamorphic streak, expanding rings.
    const pulse = 1 + 0.06 * Math.sin(t * 2.2);
    const flash = Math.exp(-Math.pow((raw - 0.9) / 0.05, 2));
    if (halo.current) {
      const s = (0.2 + 4.2 * ignite + 0.9 * flash) * pulse * (portrait ? 0.75 : 1);
      halo.current.scale.set(s, s, 1);
      (halo.current.material as THREE.SpriteMaterial).opacity = 0.42 * ignite;
    }
    if (core.current) {
      const s = (0.1 + 0.95 * ignite + 0.4 * flash) * pulse * (portrait ? 0.8 : 1);
      core.current.scale.set(s, s, 1);
      (core.current.material as THREE.SpriteMaterial).opacity = 0.9 * ignite;
    }
    if (flare.current) {
      const w = (0.5 + 10 * ignite + 2.5 * flash) * (portrait ? 0.55 : 1);
      flare.current.scale.set(w, 0.38 + 0.2 * flash, 1);
      (flare.current.material as THREE.SpriteMaterial).opacity = 0.5 * ignite;
    }
    rings.current.forEach((r, i) => {
      if (!r) return;
      const k = (t * (0.18 + i * 0.05) + i * 0.33) % 1;
      const s = (0.6 + k * (3.4 + i * 0.8)) * ignite * (portrait ? 0.7 : 1);
      r.scale.setScalar(Math.max(s, 0.001));
      (r.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.4 * ignite;
      r.rotation.x = 1.15 + i * 0.35;
      r.rotation.y = t * 0.1 * (i + 1);
    });

    // Camera dolly and world drift.
    const w = world.current;
    if (w) {
      const targetY = raw * 0.9 + t * 0.03 + pointer.current.x * 0.16;
      const targetX = pointer.current.y * 0.08;
      w.rotation.y += (targetY - w.rotation.y) * 0.05;
      w.rotation.x += (targetX - w.rotation.x) * 0.05;
    }
    const camZ = layout.camFar + (layout.camNear - layout.camFar) * ease(clamp01(raw / 0.85));
    camera.position.z += (camZ - camera.position.z) * 0.08;
    camera.position.y += ((-0.15 * raw) - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <points geometry={dust}>
        <pointsMaterial
          map={glow}
          color="#9fc7ba"
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <group ref={world}>
        {geos.map((geo, k) => (
          <group
            key={k}
            ref={(g) => {
              groups.current[k] = g;
            }}
          >
            <points geometry={geo} material={mats[k]} />
          </group>
        ))}
        {streams.map((s, i) => (
          <points key={i} geometry={s.geo} frustumCulled={false}>
            <pointsMaterial
              map={glow}
              vertexColors
              size={mobile ? 0.26 : 0.22}
              sizeAttenuation
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
        ))}
        <group>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              ref={(m) => {
                rings.current[i] = m;
              }}
            >
              <torusGeometry args={[1, 0.006, 8, 160]} />
              <meshBasicMaterial color={COLOR_LIST[i]} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
          ))}
          <sprite ref={halo}>
            <spriteMaterial map={glow} color="#ffe9b8" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
          </sprite>
          <sprite ref={flare}>
            <spriteMaterial map={streak} color="#bfeaff" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
          </sprite>
          <sprite ref={core}>
            <spriteMaterial map={glow} color="#ffffff" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
          </sprite>
        </group>
      </group>
    </>
  );
}

export default function ConvergenceScene({ progress, mobile, finePointer, active }: SceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, mobile ? 1.5 : 2]}
      camera={{ position: [0, 0, 12.5], fov: 40, near: 0.1, far: 120 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <World progress={progress} mobile={mobile} finePointer={finePointer} />
    </Canvas>
  );
}
