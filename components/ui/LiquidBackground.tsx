"use client";

import { useEffect, useRef, useMemo } from "react";

/* ── helpers ────────────────────────────────────────────── */

function colorToRgb(color: string): [number, number, number] {
  if (!color) return [1, 1, 1];
  if (color.startsWith("#")) {
    const hex = color.replace("#", "").trim();
    if (hex.length === 3) {
      return [parseInt(hex[0] + hex[0], 16) / 255, parseInt(hex[1] + hex[1], 16) / 255, parseInt(hex[2] + hex[2], 16) / 255];
    }
    if (hex.length >= 6) {
      return [parseInt(hex.slice(0, 2), 16) / 255, parseInt(hex.slice(2, 4), 16) / 255, parseInt(hex.slice(4, 6), 16) / 255];
    }
  }
  return [1, 1, 1];
}

/* ── GLSL shaders ───────────────────────────────────────── */

const vertexShader = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragmentShader = `#version 300 es
precision highp float;

uniform vec2  iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform int   uBlendMode;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2  uCenterOffset;
uniform float uZoom;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;

out vec4 fragColor;

#define S(a,b,t) smoothstep(a,b,t)

mat2 Rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
  return fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float n = mix(
    mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
  return 0.5 + 0.5 * n;
}

vec3 blendMode(vec3 base, vec3 blend, int mode) {
  if (mode == 1) return base * blend;
  if (mode == 2) return 1.0 - (1.0 - base) * (1.0 - blend);
  if (mode == 3) {
    vec3 lt = 2.0 * base * blend;
    vec3 gt = 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
    return mix(lt, gt, step(0.5, base));
  }
  return blend;
}

void mainImage(out vec4 o, vec2 C) {
  float t  = iTime * uTimeSpeed;
  vec2  uv = C / iResolution.xy;
  float ratio = iResolution.x / iResolution.y;

  vec2 tuv = uv - 0.5 + uCenterOffset;
  tuv /= max(uZoom, 0.001);

  float degree = noise(vec2(t * 0.1, tuv.x * tuv.y) * uNoiseScale);
  tuv.y *= 1.0 / ratio;
  tuv *= Rot(radians((degree - 0.5) * uRotationAmount + 180.0));
  tuv.y *= ratio;

  float frequency = uWarpFrequency;
  float ws        = max(uWarpStrength, 0.001);
  float amplitude = uWarpAmplitude / ws;
  float warpTime  = t * uWarpSpeed;
  tuv.x += sin(tuv.y * frequency + warpTime) / max(amplitude, 0.001);
  tuv.y += sin(tuv.x * (frequency * 1.5) + warpTime) / max(amplitude * 0.5, 0.001);

  vec3  col1 = uColor1;
  vec3  col2 = uColor2;
  vec3  col3 = uColor3;
  float bal  = uColorBalance;
  float soft = max(uBlendSoftness, 0.0);

  mat2  blendRot  = Rot(radians(uBlendAngle));
  float blendCoord = (tuv * blendRot).x;

  float edge0 = -0.3 - bal - soft;
  float edge1 =  0.2 - bal + soft;
  float v0    =  0.5 - bal + soft;
  float v1    = -0.3 - bal - soft;

  vec3  layer1 = mix(col3, col2, S(edge0, edge1, blendCoord));
  vec3  layer2 = mix(col2, col1, S(edge0, edge1, blendCoord));

  float blendWeight = S(v0, v1, tuv.y);
  vec3  finalCol = blendMode(layer1, layer2, uBlendMode);
  finalCol = mix(layer1, finalCol, blendWeight);

  vec2  grainUv = uv * max(uGrainScale, 0.001);
  if (uGrainAnimated > 0.5) grainUv += vec2(iTime * 0.05);
  float grainNoise = fract(sin(dot(grainUv, vec2(12.9898, 78.233))) * 43758.5453);
  finalCol += (grainNoise - 0.5) * uGrainAmount;

  finalCol = (finalCol - 0.5) * uContrast + 0.5;
  float luma = dot(finalCol, vec3(0.2126, 0.7152, 0.0722));
  finalCol = mix(vec3(luma), finalCol, uSaturation);
  finalCol = pow(max(finalCol, 0.0), vec3(1.0 / max(uGamma, 0.001)));
  finalCol = clamp(finalCol, 0.0, 1.0);

  o = vec4(finalCol, 1.0);
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  fragColor = o;
}
`;

/* ── props ──────────────────────────────────────────────── */

interface LiquidBackgroundProps {
  className?: string;
  /** Overall opacity of the overlay (0-1) */
  opacity?: number;
  /** Primary color (hex) */
  color1?: string;
  /** Secondary color (hex) */
  color2?: string;
  /** Background / tertiary color (hex) */
  color3?: string;
  /** Animation speed multiplier */
  speed?: number;
  /** Warp distortion strength */
  warpStrength?: number;
  /** Warp detail / frequency */
  warpFrequency?: number;
  /** Warp animation speed */
  warpSpeed?: number;
  /** Warp range */
  warpRange?: number;
  /** Color shift (-1 to 1) */
  colorShift?: number;
  /** Blend angle in degrees */
  blendAngle?: number;
  /** Blend softness (0-1) */
  blendSoftness?: number;
  /** Flow rotation */
  flowRotation?: number;
  /** Flow noise scale */
  flowNoise?: number;
  /** Film grain amount (0-1) */
  grainAmount?: number;
  /** Grain texel size */
  grainSize?: number;
  /** Animate grain */
  grainAnimate?: boolean;
  /** Contrast */
  contrast?: number;
  /** Gamma */
  gamma?: number;
  /** Saturation */
  saturation?: number;
  /** Zoom / scale */
  zoom?: number;
}

/* ── component ──────────────────────────────────────────── */

export default function LiquidBackground({ className = "", opacity = 0.4, color1 = "#0100ff", color2 = "#6700ff", color3 = "#00b8ff", speed = 0.1, warpStrength = 0.3, warpFrequency = 10, warpSpeed = 1, warpRange = 20, colorShift = 0, blendAngle = 1, blendSoftness = 0.15, flowRotation = 500, flowNoise = 2, grainAmount = 0.1, grainSize = 2, grainAnimate = false, contrast = 1, gamma = 1, saturation = 1, zoom = 1.4 }: LiquidBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const c1 = useMemo(() => colorToRgb(color1), [color1]);
  const c2 = useMemo(() => colorToRgb(color2), [color2]);
  const c3 = useMemo(() => colorToRgb(color3), [color3]);

  const fallback = useMemo(() => `radial-gradient(120% 120% at 50% 50%, ${color1} 0%, ${color2} 55%, ${color3} 100%)`, [color1, color2, color3]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* create canvas */
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    /* webgl2 context */
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      canvas.remove();
      container.style.background = fallback;
      return;
    }

    /* compile helper */
    const compile = (type: number, source: string) => {
      const s = gl.createShader(type);
      if (!s) throw new Error("Failed to create shader");
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(s);
        gl.deleteShader(s);
        throw new Error(info || "Shader compile failed");
      }
      return s;
    };

    const link = (vs: WebGLShader, fs: WebGLShader) => {
      const prog = gl.createProgram();
      if (!prog) throw new Error("Failed to create program");
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(prog);
        gl.deleteProgram(prog);
        throw new Error(info || "Program link failed");
      }
      return prog;
    };

    let program: WebGLProgram | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    let buffer: WebGLBuffer | null = null;

    try {
      const vs = compile(gl.VERTEX_SHADER, vertexShader);
      const fs = compile(gl.FRAGMENT_SHADER, fragmentShader);
      program = link(vs, fs);
      gl.deleteShader(vs);
      gl.deleteShader(fs);

      vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      gl.bindVertexArray(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    } catch (e) {
      console.error("LiquidBackground shader error:", e);
      if (program) gl.deleteProgram(program);
      if (vao) gl.deleteVertexArray(vao);
      if (buffer) gl.deleteBuffer(buffer);
      canvas.remove();
      container.style.background = fallback;
      return;
    }

    /* uniform locations */
    const u = {
      iTime: gl.getUniformLocation(program, "iTime"),
      iResolution: gl.getUniformLocation(program, "iResolution"),
      uTimeSpeed: gl.getUniformLocation(program, "uTimeSpeed"),
      uColorBalance: gl.getUniformLocation(program, "uColorBalance"),
      uWarpStrength: gl.getUniformLocation(program, "uWarpStrength"),
      uWarpFrequency: gl.getUniformLocation(program, "uWarpFrequency"),
      uWarpSpeed: gl.getUniformLocation(program, "uWarpSpeed"),
      uWarpAmplitude: gl.getUniformLocation(program, "uWarpAmplitude"),
      uBlendAngle: gl.getUniformLocation(program, "uBlendAngle"),
      uBlendSoftness: gl.getUniformLocation(program, "uBlendSoftness"),
      uBlendMode: gl.getUniformLocation(program, "uBlendMode"),
      uRotationAmount: gl.getUniformLocation(program, "uRotationAmount"),
      uNoiseScale: gl.getUniformLocation(program, "uNoiseScale"),
      uGrainAmount: gl.getUniformLocation(program, "uGrainAmount"),
      uGrainScale: gl.getUniformLocation(program, "uGrainScale"),
      uGrainAnimated: gl.getUniformLocation(program, "uGrainAnimated"),
      uContrast: gl.getUniformLocation(program, "uContrast"),
      uGamma: gl.getUniformLocation(program, "uGamma"),
      uSaturation: gl.getUniformLocation(program, "uSaturation"),
      uCenterOffset: gl.getUniformLocation(program, "uCenterOffset"),
      uZoom: gl.getUniformLocation(program, "uZoom"),
      uColor1: gl.getUniformLocation(program, "uColor1"),
      uColor2: gl.getUniformLocation(program, "uColor2"),
      uColor3: gl.getUniformLocation(program, "uColor3"),
    };

    /* set all uniforms */
    const setUniforms = () => {
      if (!program) return;
      gl.useProgram(program);
      gl.uniform1f(u.uTimeSpeed, speed);
      gl.uniform1f(u.uColorBalance, colorShift);
      gl.uniform1f(u.uWarpStrength, warpStrength);
      gl.uniform1f(u.uWarpFrequency, warpFrequency);
      gl.uniform1f(u.uWarpSpeed, warpSpeed);
      gl.uniform1f(u.uWarpAmplitude, warpRange);
      gl.uniform1f(u.uBlendAngle, blendAngle);
      gl.uniform1f(u.uBlendSoftness, blendSoftness);
      gl.uniform1i(u.uBlendMode, 0); // normal
      gl.uniform1f(u.uRotationAmount, flowRotation);
      gl.uniform1f(u.uNoiseScale, flowNoise);
      gl.uniform1f(u.uGrainAmount, grainAmount);
      gl.uniform1f(u.uGrainScale, grainSize);
      gl.uniform1f(u.uGrainAnimated, grainAnimate ? 1 : 0);
      gl.uniform1f(u.uContrast, contrast);
      gl.uniform1f(u.uGamma, gamma);
      gl.uniform1f(u.uSaturation, saturation);
      gl.uniform2f(u.uCenterOffset, 0, 0);
      gl.uniform1f(u.uZoom, zoom);
      gl.uniform3f(u.uColor1, c1[0], c1[1], c1[2]);
      gl.uniform3f(u.uColor2, c2[0], c2[1], c2[2]);
      gl.uniform3f(u.uColor3, c3[0], c3[1], c3[2]);
    };

    /* resize handler */
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);
      gl.uniform2f(u.iResolution, canvas.width, canvas.height);
      setUniforms();
    };

    /* render */
    const renderFrame = (timeSec: number) => {
      if (!program) return;
      gl.useProgram(program);
      gl.uniform1f(u.iTime, timeSec);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindVertexArray(null);
    };

    const ro = new ResizeObserver(() => updateSize());
    ro.observe(container);
    updateSize();

    let rafId = 0;
    const startTime = performance.now();
    const loop = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      renderFrame(elapsed);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      if (container.contains(canvas)) container.removeChild(canvas);
      if (program) gl.deleteProgram(program);
      if (vao) gl.deleteVertexArray(vao);
      if (buffer) gl.deleteBuffer(buffer);
    };
  }, [fallback, speed, colorShift, warpStrength, warpFrequency, warpSpeed, warpRange, blendAngle, blendSoftness, flowRotation, flowNoise, grainAmount, grainSize, grainAnimate, contrast, gamma, saturation, zoom, c1, c2, c3]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{
        opacity,
        overflow: "hidden",
        background: fallback,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
