"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 1200;
const FIELD_DEPTH = 600;
const FIELD_WIDTH = 400;
const FIELD_HEIGHT = 300;
const SPEED = 0.3;

function Stars() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    const colors = new Float32Array(STAR_COUNT * 3);

    // Color palette matching the site: purple (#6D5EFC), cyan (#4CC9F0), white
    const colorOptions = [
      new THREE.Color("#6D5EFC"), // Purple
      new THREE.Color("#7c6ffc"), // Light purple
      new THREE.Color("#4CC9F0"), // Cyan
      new THREE.Color("#92DEF6"), // Light cyan
      new THREE.Color("#ffffff"), // White
      new THREE.Color("#b8b0ff"), // Lavender
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      // Spread stars in a wide field
      positions[i * 3] = (Math.random() - 0.5) * FIELD_WIDTH;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_HEIGHT;
      positions[i * 3 + 2] = (Math.random() - 0.5) * FIELD_DEPTH;

      // Vary sizes for depth perception
      sizes[i] = Math.random() * 2.5 + 0.3;

      // Assign colors from palette with bias towards white/cyan
      const colorIndex = Math.random();
      let color: THREE.Color;
      if (colorIndex < 0.35) {
        color = colorOptions[4]; // White (35%)
      } else if (colorIndex < 0.55) {
        color = colorOptions[2]; // Cyan (20%)
      } else if (colorIndex < 0.7) {
        color = colorOptions[3]; // Light cyan (15%)
      } else if (colorIndex < 0.82) {
        color = colorOptions[0]; // Purple (12%)
      } else if (colorIndex < 0.92) {
        color = colorOptions[5]; // Lavender (10%)
      } else {
        color = colorOptions[1]; // Light purple (8%)
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, sizes, colors };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const positionAttr = pointsRef.current.geometry.attributes.position;
    const posArray = positionAttr.array as Float32Array;

    for (let i = 0; i < STAR_COUNT; i++) {
      // Move stars toward the camera (z direction)
      posArray[i * 3 + 2] += SPEED * delta * 60;

      // Reset when past camera
      if (posArray[i * 3 + 2] > FIELD_DEPTH / 2) {
        posArray[i * 3 + 2] = -FIELD_DEPTH / 2;
        posArray[i * 3] = (Math.random() - 0.5) * FIELD_WIDTH;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * FIELD_HEIGHT;
      }
    }

    positionAttr.needsUpdate = true;

    // Slow rotation for organic feel
    pointsRef.current.rotation.z += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={STAR_COUNT} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={STAR_COUNT} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={STAR_COUNT} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          varying float vDistance;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vDistance = -mvPosition.z;
            
            // Size attenuation - closer stars appear larger
            gl_PointSize = size * (200.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vDistance;
          
          void main() {
            // Circular point with soft glow
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            
            // Soft circular falloff with glow
            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
            alpha *= alpha; // Sharper center
            
            // Fade based on distance (depth fog) - far away
            float depthFade = smoothstep(600.0, 50.0, vDistance);
            
            // Fade out when close to camera so stars don't get clipped
            float nearFade = smoothstep(0.0, 140.0, vDistance);
            
            gl_FragColor = vec4(vColor, alpha * depthFade * nearFade * 0.85);
          }
        `}
      />
    </points>
  );
}

interface StarFieldProps {
  className?: string;
}

export default function StarField({ className = "" }: StarFieldProps) {
  return (
    <div className={`absolute left-0 right-0 top-0 pointer-events-none ${className}`} style={{ height: "420px", minHeight: 320, maxHeight: 600 }}>
      <Canvas
        camera={{
          position: [0, 0, 150],
          fov: 90,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Stars />
      </Canvas>
    </div>
  );
}
