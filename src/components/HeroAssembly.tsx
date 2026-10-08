"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

const DURATION = 18;
const SOLID_START = 1.05;
const SOLID_END = 1.75;
const ASSEMBLE_START = 2.45;
const ASSEMBLE_END = 4.25;
const SPIN_START = 4.25;
const SPIN_END = 17.15;
const FADE_OUT = 17.15;
const LINE_COLOR = new THREE.Color("#f7f4ee");
const VIEW = new THREE.Vector3(0.58, -0.8, 0.46).normalize();

const lineVertex = `
  attribute vec3 aOther;
  attribute float aSide;
  attribute float aDraw;
  varying float vDraw;
  uniform vec2 uResolution;
  uniform float uWidth;
  void main() {
    vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec4 other = projectionMatrix * modelViewMatrix * vec4(aOther, 1.0);
    vec2 dir = other.xy / other.w - clip.xy / clip.w;
    float span = length(dir);
    dir = span < 1e-5 ? vec2(1.0, 0.0) : dir / span;
    vec2 normal = vec2(-dir.y, dir.x);
    vec2 stroke = uWidth / uResolution;
    clip.xy += (normal * aSide - dir) * stroke * clip.w;
    gl_Position = clip;
    vDraw = aDraw;
  }
`;

const lineFragment = `
  varying float vDraw;
  uniform float uProgress;
  uniform float uOpacity;
  uniform vec3 uColor;
  void main() {
    if (vDraw > uProgress) discard;
    gl_FragColor = vec4(uColor, uOpacity);
  }
`;

type Gathered = {
  name: string;
  geometry: THREE.BufferGeometry;
  center: THREE.Vector3;
};

type PartAnim = {
  pivot: THREE.Group;
  mesh: THREE.Mesh;
  lines: THREE.Mesh;
  material: THREE.MeshStandardMaterial;
  lineMaterial: THREE.ShaderMaterial;
  explode: THREE.Vector3;
};

function easeInOut(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function band(t: number, start: number, end: number) {
  return easeInOut((t - start) / (end - start));
}

function collectPart(root: THREE.Object3D) {
  const geometries: THREE.BufferGeometry[] = [];
  root.updateWorldMatrix(true, true);
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    const source = mesh.geometry.clone();
    source.applyMatrix4(mesh.matrixWorld);
    const flat = source.index ? source.toNonIndexed() : source;
    const slim = new THREE.BufferGeometry();
    slim.setAttribute("position", flat.getAttribute("position"));
    const normal = flat.getAttribute("normal");
    if (normal) slim.setAttribute("normal", normal);
    geometries.push(slim);
    source.dispose();
  });
  return mergeGeometries(geometries, false);
}

function boxOutline(box: THREE.Box3) {
  const { min, max } = box;
  const corner = [
    new THREE.Vector3(min.x, min.y, min.z),
    new THREE.Vector3(max.x, min.y, min.z),
    new THREE.Vector3(max.x, max.y, min.z),
    new THREE.Vector3(min.x, max.y, min.z),
    new THREE.Vector3(min.x, min.y, max.z),
    new THREE.Vector3(max.x, min.y, max.z),
    new THREE.Vector3(max.x, max.y, max.z),
    new THREE.Vector3(min.x, max.y, max.z),
  ];
  const segments: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
  ];
  const lengths = segments.map(([from, to]) => corner[from].distanceTo(corner[to]));
  const total = lengths.reduce((sum, length) => sum + length, 0) || 1;
  const positions: number[] = [];
  const others: number[] = [];
  const sides: number[] = [];
  const draws: number[] = [];
  let walked = 0;
  segments.forEach(([from, to], index) => {
    const start = walked / total;
    const end = (walked + lengths[index]) / total;
    walked += lengths[index];
    const push = (point: THREE.Vector3, other: THREE.Vector3, side: number, draw: number) => {
      positions.push(point.x, point.y, point.z);
      others.push(other.x, other.y, other.z);
      sides.push(side);
      draws.push(draw);
    };
    const a = corner[from];
    const b = corner[to];
    push(a, b, -1, start);
    push(a, b, 1, start);
    push(b, a, -1, end);
    push(a, b, 1, start);
    push(b, a, 1, end);
    push(b, a, -1, end);
  });

  const traced = new THREE.BufferGeometry();
  traced.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  traced.setAttribute("aOther", new THREE.Float32BufferAttribute(others, 3));
  traced.setAttribute("aSide", new THREE.Float32BufferAttribute(sides, 1));
  traced.setAttribute("aDraw", new THREE.Float32BufferAttribute(draws, 1));
  return traced;
}

function frameDistance(box: THREE.Box3, aspect: number, fov: number, margin: number, spinning: boolean) {
  const center = box.getCenter(new THREE.Vector3());
  const up = new THREE.Vector3(0, 0, 1);
  const right = new THREE.Vector3().crossVectors(VIEW, up).normalize();
  const cameraUp = new THREE.Vector3().crossVectors(right, VIEW).normalize();
  const corner = new THREE.Vector3();
  let maxRight = 0.02;
  let maxUp = 0.02;
  for (const x of [box.min.x, box.max.x]) {
    for (const y of [box.min.y, box.max.y]) {
      for (const z of [box.min.z, box.max.z]) {
        corner.set(x, y, z).sub(center);
        maxRight = Math.max(maxRight, Math.abs(corner.dot(right)));
        maxUp = Math.max(maxUp, Math.abs(corner.dot(cameraUp)));
      }
    }
  }
  if (spinning) {
    const size = box.getSize(new THREE.Vector3());
    const horizontal = 0.5 * Math.hypot(size.x, size.y);
    maxRight = Math.max(maxRight, horizontal);
    maxUp = Math.max(maxUp, size.z * 0.5 + horizontal * Math.hypot(cameraUp.x, cameraUp.y));
  }
  const vertical = THREE.MathUtils.degToRad(fov) / 2;
  const horizontalFov = Math.atan(Math.tan(vertical) * aspect);
  const distance = margin * Math.max(maxUp / Math.tan(vertical), maxRight / Math.tan(horizontalFov));
  return { center, distance };
}

export function HeroAssembly() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.16;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.01, 80);
    camera.up.set(0, 0, 1);

    scene.add(new THREE.HemisphereLight(0xf7f4ee, 0x2a2824, 0.95));
    const key = new THREE.DirectionalLight(0xfffaf4, 2.55);
    key.position.set(1.4, -1.8, 2.4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xf1eee6, 0.7);
    fill.position.set(-1.6, 1.2, 0.6);
    scene.add(fill);

    const turntable = new THREE.Group();
    const root = new THREE.Group();
    turntable.add(root);
    scene.add(turntable);

    const parts: PartAnim[] = [];
    const explodedBox = new THREE.Box3();
    const assembledBox = new THREE.Box3();
    let frame = 0;
    let stopped = false;

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const clock = new THREE.Clock(false);

    const loader = new GLTFLoader();
    loader.load(
      "/api/hero-model",
      (gltf) => {
        if (stopped) return;
        const assembly = gltf.scene.children[0] ?? gltf.scene;
        const gathered: Gathered[] = [];
        for (const child of assembly.children) {
          const geometry = collectPart(child);
          if (!geometry) continue;
          geometry.computeBoundingBox();
          const center = geometry.boundingBox?.getCenter(new THREE.Vector3()) ?? new THREE.Vector3();
          gathered.push({ name: child.children[0]?.name || child.name, geometry, center });
        }

        const bounds = new THREE.Box3();
        for (const part of gathered) {
          if (part.geometry.boundingBox) bounds.union(part.geometry.boundingBox);
        }
        const assemblyCenter = bounds.getCenter(new THREE.Vector3());
        root.position.copy(assemblyCenter).multiplyScalar(-1);

        const levels: number[] = [];
        for (const part of [...gathered].sort((a, b) => a.center.z - b.center.z)) {
          if (part.name.toLowerCase().includes("cornier")) continue;
          if (!levels.some((level) => Math.abs(level - part.center.z) < 0.08)) levels.push(part.center.z);
        }

        const explodeFor = (part: Gathered) => {
          const name = part.name.toLowerCase();
          if (name.includes("cornier")) {
            const outward = new THREE.Vector3(
              part.center.x - assemblyCenter.x,
              part.center.y - assemblyCenter.y,
              0,
            );
            if (outward.lengthSq() < 1e-6) outward.set(1, 0, 0);
            return outward.normalize().multiplyScalar(0.28);
          }
          const level = Math.max(0, levels.findIndex((item) => Math.abs(item - part.center.z) < 0.08));
          const lift = level * 0.16;
          if (name.startsWith("part_3")) return new THREE.Vector3(0, -0.7, lift);
          if (name.startsWith("part_9")) return new THREE.Vector3(0, 0, lift + 0.18);
          return new THREE.Vector3(0, 0, lift);
        };

        const ordered = [
          ...gathered.filter((part) => part.name.toLowerCase().includes("cornier")),
          ...gathered
            .filter((part) => !part.name.toLowerCase().includes("cornier"))
            .sort((a, b) => a.center.z - b.center.z),
        ];

        resize();
        for (const part of ordered) {
          const box = part.geometry.boundingBox;
          if (!box) continue;
          assembledBox.union(box);
          explodedBox.union(box.clone().translate(explodeFor(part)));
        }
        assembledBox.translate(root.position);
        explodedBox.translate(root.position);
        const preview = frameDistance(explodedBox, camera.aspect || 1, camera.fov, 1.12, false);
        camera.position.copy(preview.center).addScaledVector(VIEW, preview.distance);
        camera.lookAt(preview.center);

        for (const part of ordered) {
          const explode = explodeFor(part);
          const material = new THREE.MeshStandardMaterial({
            color: "#f6f3eb",
            metalness: 0.08,
            roughness: 0.46,
            transparent: true,
            opacity: 0,
            depthWrite: false,
          });
          const mesh = new THREE.Mesh(part.geometry, material);
          const lines = new THREE.Mesh(boxOutline(part.geometry.boundingBox ?? new THREE.Box3()));
          const lineMaterial = new THREE.ShaderMaterial({
            transparent: true,
            depthTest: true,
            depthWrite: true,
            toneMapped: false,
            side: THREE.DoubleSide,
            uniforms: {
              uProgress: { value: 0 },
              uOpacity: { value: 1 },
              uWidth: { value: 6 },
              uResolution: { value: new THREE.Vector2(canvas.width || 1, canvas.height || 1) },
              uColor: { value: LINE_COLOR },
            },
            vertexShader: lineVertex,
            fragmentShader: lineFragment,
          });
          lines.material = lineMaterial;
          lines.frustumCulled = false;

          const pivot = new THREE.Group();
          pivot.position.copy(explode);
          pivot.add(mesh, lines);
          root.add(pivot);
          parts.push({ pivot, mesh, lines, material, lineMaterial, explode });
        }
        clock.start();
      },
      undefined,
      () => {
        /* The hero stays empty if the model cannot load. */
      },
    );

    const lookTarget = new THREE.Vector3();
    const render = () => {
      if (stopped) return;
      frame = requestAnimationFrame(render);
      if (!parts.length) {
        renderer.render(scene, camera);
        return;
      }

      const seconds = reduce ? SPIN_START : clock.getElapsedTime() % DURATION;
      const fade =
        seconds < 0.35
          ? easeInOut(seconds / 0.35)
          : seconds > FADE_OUT
            ? easeInOut((DURATION - seconds) / (DURATION - FADE_OUT))
            : 1;
      const solid = reduce ? 1 : band(seconds, SOLID_START, SOLID_END);
      const exploded = reduce
        ? 0
        : seconds < ASSEMBLE_START
          ? 1
          : seconds < ASSEMBLE_END
            ? 1 - band(seconds, ASSEMBLE_START, ASSEMBLE_END)
            : 0;
      const spin =
        reduce || seconds < SPIN_START ? 0 : easeInOut((seconds - SPIN_START) / (SPIN_END - SPIN_START));
      const width = renderer.domElement.width || 1;
      const height = renderer.domElement.height || 1;
      const aspect = canvas.clientWidth / Math.max(canvas.clientHeight, 1);
      const room = aspect < 1.05 ? 1.2 : 1.08;
      const explodedFit = frameDistance(explodedBox, aspect, camera.fov, room + 0.06, false);
      const assembledFit = frameDistance(assembledBox, aspect, camera.fov, room, true);
      const distance = THREE.MathUtils.lerp(assembledFit.distance, explodedFit.distance, exploded);
      lookTarget.lerpVectors(assembledFit.center, explodedFit.center, exploded);
      camera.aspect = canvas.clientWidth / Math.max(canvas.clientHeight, 1);
      camera.updateProjectionMatrix();
      camera.position.copy(lookTarget).addScaledVector(VIEW, distance);
      camera.lookAt(lookTarget);
      turntable.rotation.z = spin * Math.PI * 2;

      parts.forEach((part, index) => {
        const start = (index / parts.length) * 0.28;
        const progress = reduce ? 1 : band(seconds, start, start + 1.05);
        const lineOpacity = fade * (1 - solid);
        part.lineMaterial.uniforms.uProgress.value = progress;
        part.lineMaterial.uniforms.uOpacity.value = lineOpacity;
        const stroke = Math.min(7, Math.max(3.5, canvas.clientWidth / 150));
        part.lineMaterial.uniforms.uWidth.value = stroke * renderer.getPixelRatio();
        (part.lineMaterial.uniforms.uResolution.value as THREE.Vector2).set(width, height);
        part.lines.visible = lineOpacity > 0.02;
        part.material.opacity = fade * solid;
        part.material.transparent = part.material.opacity < 0.98;
        part.material.depthWrite = part.material.opacity > 0.05;
        part.pivot.position.copy(part.explode).multiplyScalar(exploded);
      });

      renderer.render(scene, camera);
    };
    resize();
    frame = requestAnimationFrame(render);

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.dispose();
      for (const part of parts) {
        part.mesh.geometry.dispose();
        part.lines.geometry.dispose();
        part.material.dispose();
        part.lineMaterial.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      role="img"
      aria-label="Press brake tool support. The parts start apart, their outlines are traced, they become solid, then assemble and turn."
    />
  );
}
