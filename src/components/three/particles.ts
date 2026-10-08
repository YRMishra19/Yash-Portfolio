import * as THREE from "three";

export type ParticleData = { position: Float32Array; seed: Float32Array; size: Float32Array };

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function alloc(n: number): ParticleData {
  return { position: new Float32Array(n * 3), seed: new Float32Array(n), size: new Float32Array(n) };
}

/** DATA - a structured 3D lattice, like a data cube. */
export function buildLattice(n: number): ParticleData {
  const d = alloc(n);
  const G = 9;
  const step = 0.36;
  for (let i = 0; i < n; i++) {
    const gx = Math.floor(Math.random() * G);
    const gy = Math.floor(Math.random() * G);
    const gz = Math.floor(Math.random() * G);
    d.position.set(
      [(gx - (G - 1) / 2) * step + rand(-0.03, 0.03), (gy - (G - 1) / 2) * step + rand(-0.03, 0.03), (gz - (G - 1) / 2) * step + rand(-0.03, 0.03)],
      i * 3,
    );
    const edge = gx === 0 || gx === G - 1 || gy === 0 || gy === G - 1 || gz === 0 || gz === G - 1;
    d.seed[i] = Math.random();
    d.size[i] = edge ? rand(0.9, 1.5) : rand(0.35, 0.7);
  }
  return d;
}

/** BUSINESS - a glowing skyline of columns, like a growth chart in 3D. */
export function buildSkyline(n: number): ParticleData {
  const d = alloc(n);
  const cols: { x: number; z: number; h: number }[] = [];
  const C = 7;
  for (let ix = 0; ix < C; ix++) {
    for (let iz = 0; iz < C; iz++) {
      const x = (ix - (C - 1) / 2) * 0.5;
      const z = (iz - (C - 1) / 2) * 0.5;
      const falloff = 1 - Math.min(0.6, Math.hypot(x, z) / 5);
      cols.push({ x, z, h: (0.35 + Math.pow(Math.random(), 1.7) * 2.3) * falloff });
    }
  }
  const total = cols.reduce((s, c) => s + c.h, 0);
  for (let i = 0; i < n; i++) {
    let r = Math.random() * total;
    let col = cols[0];
    for (const c of cols) {
      r -= c.h;
      if (r <= 0) {
        col = c;
        break;
      }
    }
    const cap = Math.random() < 0.16;
    const y = (cap ? col.h : Math.random() * col.h) - 1.15;
    d.position.set([col.x + rand(-0.035, 0.035), y, col.z + rand(-0.035, 0.035)], i * 3);
    d.seed[i] = Math.random();
    d.size[i] = cap ? rand(1.1, 1.8) : rand(0.35, 0.75);
  }
  return d;
}

/** AI - layers of nodes joined by connections, like a neural network. */
export function buildNeural(n: number): ParticleData {
  const d = alloc(n);
  const layers = [4, 6, 7, 6, 3];
  const nodes: THREE.Vector3[][] = layers.map((count, li) =>
    Array.from({ length: count }, () => new THREE.Vector3(-1.6 + li * 0.8, rand(-1.25, 1.25), rand(-1.0, 1.0))),
  );
  const nodeShare = Math.floor(n * 0.2);
  const flat = nodes.flat();
  for (let i = 0; i < n; i++) {
    let p: THREE.Vector3;
    let size: number;
    if (i < nodeShare) {
      const base = flat[i % flat.length];
      p = base.clone().add(new THREE.Vector3(rand(-0.05, 0.05), rand(-0.05, 0.05), rand(-0.05, 0.05)));
      size = rand(1.6, 2.4);
    } else {
      const li = Math.floor(Math.random() * (layers.length - 1));
      const a = nodes[li][Math.floor(Math.random() * nodes[li].length)];
      const b = nodes[li + 1][Math.floor(Math.random() * nodes[li + 1].length)];
      p = a.clone().lerp(b, Math.random());
      size = rand(0.3, 0.65);
    }
    d.position.set([p.x, p.y, p.z], i * 3);
    d.seed[i] = Math.random();
    d.size[i] = size;
  }
  return d;
}

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixel;
  uniform float uSize;
  attribute float aSeed;
  attribute float aSize;
  varying float vTwinkle;
  void main() {
    vec3 p = position;
    float t = uTime;
    p += 0.055 * vec3(sin(t * 0.8 + aSeed * 40.0), cos(t * 0.7 + aSeed * 31.0), sin(t * 0.6 + aSeed * 23.0));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vTwinkle = 0.62 + 0.38 * sin(t * 1.6 + aSeed * 60.0);
    gl_PointSize = aSize * uSize * uPixel * (115.0 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a = pow(a, 2.0);
    gl_FragColor = vec4(uColor * 1.35, a * uOpacity * vTwinkle);
  }
`;

export function makeParticleMaterial(color: string, size = 1) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixel: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uSize: { value: size },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: 1 },
    },
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

export function makeGeometry(d: ParticleData) {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(d.position, 3));
  g.setAttribute("aSeed", new THREE.BufferAttribute(d.seed, 1));
  g.setAttribute("aSize", new THREE.BufferAttribute(d.size, 1));
  return g;
}
