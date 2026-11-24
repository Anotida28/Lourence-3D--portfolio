import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const FONT = "/fonts/rubik-spray-paint.woff";

// Each line is sprayed on in turn. Times are seconds from when the wall
// first turns towards the camera.
const LINES = [
  {
    text: "LOOK",
    color: "#ff4d9d",
    size: 0.95,
    x: -0.45,
    y: 0.55,
    tilt: 0.05,
    start: 0,
    duration: 0.85,
    drips: 2,
  },
  {
    text: "WITHIN!",
    color: "#4cc9f0",
    size: 1.05,
    x: 0.15,
    y: -0.5,
    tilt: -0.03,
    start: 1,
    duration: 1.15,
    drips: 3,
  },
];

const DRIP_TIME = 1.1;
const MAX_PARTICLES = 420;
const PARTICLE_LIFE = 0.45;

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOut = (t) => 1 - (1 - t) ** 3;
const clamp01 = (t) => Math.min(1, Math.max(0, t));

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Thin plane anchored at its top edge, so scaling Y makes it run downwards.
const dripGeometry = new THREE.PlaneGeometry(0.05, 1).translate(0, -0.5, 0);
const blobGeometry = new THREE.CircleGeometry(0.038, 12);

/**
 * "LOOK WITHIN!" sprayed onto the outside of the back wall like graffiti.
 * Each time the wall turns towards the camera the tag is re-sprayed: a
 * zig-zagging nozzle reveals each line with a cloud of paint mist, then
 * drips run down from the letters. Once the wall faces away it resets.
 */
const GraffitiTag = (props) => {
  const root = useRef();
  const lineGroups = useRef([]);
  const texts = useRef([]);
  const drips = useRef([]);
  const layout = useRef(LINES.map(() => null));
  const anim = useRef({ playing: false, start: 0 });

  const particles = useMemo(() => {
    const positions = new Float32Array(MAX_PARTICLES * 3);
    const colors = new Float32Array(MAX_PARTICLES * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return {
      geometry,
      positions,
      colors,
      velocity: new Float32Array(MAX_PARTICLES * 3),
      life: new Float32Array(MAX_PARTICLES),
      tint: LINES.map((l) => new THREE.Color(l.color)),
      lineOf: new Uint8Array(MAX_PARTICLES),
      next: 0,
    };
  }, []);

  const scratch = useMemo(
    () => ({
      normal: new THREE.Vector3(),
      worldPos: new THREE.Vector3(),
      toCamera: new THREE.Vector3(),
      nozzle: new THREE.Vector3(),
    }),
    [],
  );

  // Once troika has laid out a line, pick which letters get drips.
  const handleSync = (index) => (mesh) => {
    const info = mesh.textRenderInfo;
    if (!info) return;
    const [minX, minY, maxX, maxY] = info.blockBounds;
    const glyphs = info.glyphBounds;
    const count = glyphs ? glyphs.length / 4 : 0;
    const line = LINES[index];

    const picks = [];
    for (let d = 0; d < line.drips; d++) {
      // Spread drips across the word, one per slice, with a little jitter.
      const slot = count
        ? Math.min(
            count - 1,
            Math.floor(((d + 0.3 + Math.random() * 0.4) / line.drips) * count),
          )
        : 0;
      const gx = count
        ? (glyphs[slot * 4] + glyphs[slot * 4 + 2]) / 2
        : minX + ((d + 0.5) / line.drips) * (maxX - minX);
      const gy = count ? glyphs[slot * 4 + 1] : minY;
      picks.push({
        x: gx + (Math.random() - 0.5) * line.size * 0.15,
        y: gy + line.size * 0.14,
        length:
          line.size *
          (index === LINES.length - 1
            ? 0.35 + Math.random() * 0.45
            : 0.18 + Math.random() * 0.22),
        delay: Math.random() * 0.35,
      });
    }

    layout.current[index] = { minX, minY, maxX, maxY, picks };
    picks.forEach((p, d) => {
      const drip = drips.current[index]?.[d];
      if (drip) drip.position.set(p.x, p.y, 0.004);
    });
  };

  const emit = (lineIndex, x, y, size) => {
    const p = particles;
    for (let n = 0; n < 10; n++) {
      const i = p.next;
      p.next = (p.next + 1) % MAX_PARTICLES;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * size * 0.16;
      p.positions[i * 3] = x + Math.cos(angle) * radius;
      p.positions[i * 3 + 1] = y + Math.sin(angle) * radius;
      p.positions[i * 3 + 2] = 0.03;
      p.velocity[i * 3] = Math.cos(angle) * (0.15 + Math.random() * 0.55);
      p.velocity[i * 3 + 1] = Math.sin(angle) * (0.15 + Math.random() * 0.55);
      p.velocity[i * 3 + 2] = 0.1 + Math.random() * 0.35;
      p.life[i] = PARTICLE_LIFE * (0.6 + Math.random() * 0.4);
      p.lineOf[i] = lineIndex;
    }
  };

  const reset = () => {
    anim.current.playing = false;
    particles.life.fill(0);
    particles.colors.fill(0);
    particles.geometry.attributes.color.needsUpdate = true;
  };

  useFrame(({ camera, clock }, delta) => {
    if (!root.current) return;
    const { normal, worldPos, toCamera, nozzle } = scratch;

    // Is the painted side of the wall facing the camera?
    root.current.getWorldDirection(normal);
    root.current.getWorldPosition(worldPos);
    const facing = normal.dot(
      toCamera.subVectors(camera.position, worldPos).normalize(),
    );

    if (!anim.current.playing && facing > 0.55) {
      anim.current = { playing: true, start: clock.elapsedTime };
    } else if (anim.current.playing && facing < -0.05) {
      reset();
    }

    const t = anim.current.playing
      ? clock.elapsedTime - anim.current.start
      : -1;
    const spraying = anim.current.playing && !reducedMotion;

    LINES.forEach((line, i) => {
      const text = texts.current[i];
      const box = layout.current[i];
      if (!text || !box) {
        if (text) text.fillOpacity = 0;
        return;
      }

      const progress = reducedMotion
        ? anim.current.playing
          ? 1
          : 0
        : clamp01((t - line.start) / line.duration);
      const reveal = easeInOut(progress);
      const height = box.maxY - box.minY;
      const pad = line.size * 0.4;
      const edge = box.minX + (box.maxX - box.minX) * reveal;

      text.fillOpacity = 1;
      text.outlineOpacity = 0.35 * reveal;
      text.clipRect =
        progress <= 0
          ? [box.minX, box.minY, box.minX, box.minY]
          : [
              box.minX - pad,
              box.minY - pad,
              progress >= 1 ? box.maxX + pad : edge,
              box.maxY + pad,
            ];

      // Paint mist at the nozzle, which zig-zags up and down as it sweeps.
      if (spraying && progress > 0 && progress < 1) {
        const zig = Math.sin(t * 26) * height * 0.42;
        nozzle.set(edge, (box.minY + box.maxY) / 2 + zig, 0);
        nozzle.applyMatrix4(lineGroups.current[i].matrix);
        emit(i, nozzle.x, nozzle.y, line.size);
      }

      // Drips start once the line is finished.
      const dripClock = reducedMotion
        ? anim.current.playing
          ? DRIP_TIME
          : 0
        : t - line.start - line.duration;
      box.picks.forEach((pick, d) => {
        const drip = drips.current[i]?.[d];
        if (!drip) return;
        const grow = easeOut(clamp01((dripClock - pick.delay) / DRIP_TIME));
        const length = Math.max(0.0001, pick.length * grow);
        drip.visible = grow > 0;
        drip.children[0].scale.y = length;
        drip.children[1].position.y = -length;
      });
    });

    // Age and fade the mist.
    const p = particles;
    if (anim.current.playing) {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        if (p.life[i] <= 0) continue;
        p.life[i] -= delta;
        const k = Math.max(0, p.life[i] / PARTICLE_LIFE);
        p.positions[i * 3] += p.velocity[i * 3] * delta;
        p.positions[i * 3 + 1] += p.velocity[i * 3 + 1] * delta;
        p.positions[i * 3 + 2] += p.velocity[i * 3 + 2] * delta;
        const c = p.tint[p.lineOf[i]];
        p.colors[i * 3] = c.r * k;
        p.colors[i * 3 + 1] = c.g * k;
        p.colors[i * 3 + 2] = c.b * k;
      }
      p.geometry.attributes.position.needsUpdate = true;
      p.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group ref={root} {...props}>
      {LINES.map((line, i) => (
        <group
          key={line.text}
          ref={(g) => (lineGroups.current[i] = g)}
          position={[line.x, line.y, 0]}
          rotation={[0, 0, line.tilt]}
        >
          <Text
            ref={(m) => (texts.current[i] = m)}
            font={FONT}
            fontSize={line.size}
            letterSpacing={0.02}
            anchorX="center"
            anchorY="middle"
            color={line.color}
            outlineWidth={0}
            outlineBlur={line.size * 0.14}
            outlineColor={line.color}
            outlineOpacity={0}
            fillOpacity={0}
            onSync={handleSync(i)}
            raycast={() => null}
          >
            {line.text}
          </Text>
          {Array.from({ length: line.drips }, (_, d) => (
            <group
              key={d}
              visible={false}
              ref={(g) => {
                drips.current[i] ??= [];
                drips.current[i][d] = g;
              }}
            >
              <mesh geometry={dripGeometry} raycast={() => null}>
                <meshBasicMaterial
                  color={line.color}
                  toneMapped={false}
                  transparent
                  opacity={0.9}
                />
              </mesh>
              <mesh geometry={blobGeometry} raycast={() => null}>
                <meshBasicMaterial
                  color={line.color}
                  toneMapped={false}
                  transparent
                  opacity={0.9}
                />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      <points geometry={particles.geometry} raycast={() => null}>
        <pointsMaterial
          size={0.085}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
};

export default GraffitiTag;
