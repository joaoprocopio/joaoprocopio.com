import * as THREE from 'three'
import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js'

// ---------------------------------------------------------------------------
// Printable ASCII characters (95 total)
// ---------------------------------------------------------------------------

const CHARS = ` !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`
const CHAR_COUNT = CHARS.length // 95

// ---------------------------------------------------------------------------
// 6 sampling-circle centers — normalised within a cell.
//
// These follow the article's staggered 2×3 layout. Coordinates are in
// **canvas space** (origin top-left, Y points down) so that they line up
// with the offscreen canvas used during precomputation.
//
// In the fragment shader we flip Y for WebGL space (origin bottom-left).
// ---------------------------------------------------------------------------

const SAMPLE_CENTERS_CANVAS: [number, number][] = [
  [0.25, 0.15], // top-left
  [0.75, 0.1], // top-right
  [0.25, 0.5], // mid-left
  [0.75, 0.5], // mid-right
  [0.25, 0.85], // bot-left
  [0.75, 0.9], // bot-right
]

/** Radius of each sampling circle as a fraction of cell width. */
const SAMPLE_RADIUS_FRAC = 0.22

// ---------------------------------------------------------------------------
// Shaders (GLSL 300 es — requires WebGL 2)
// ---------------------------------------------------------------------------

const vertexShader = /* glsl */ `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = /* glsl */ `
precision highp float;

#define CHAR_COUNT ${CHAR_COUNT}

out vec4 fragColor;

uniform sampler2D tDiffuse;
uniform sampler2D uGlyphAtlas;
uniform sampler2D uShapeVectors;

uniform vec2 uResolution;
uniform vec2 uCellSize;   // in pixels (= glyph size)
uniform vec2 uGlyphSize;  // same as uCellSize for now
uniform float uAtlasWidth; // atlas texture width in texels
uniform float uContrast;
uniform bool uColored;

// Sampling positions in WebGL space (Y-up).
// These are the canvas-space centres with Y flipped: glY = 1.0 - canvasY
const vec2 samplePos[6] = vec2[6](
  vec2(0.25, 0.85),  // top-left
  vec2(0.75, 0.90),  // top-right
  vec2(0.25, 0.50),  // mid-left
  vec2(0.75, 0.50),  // mid-right
  vec2(0.25, 0.15),  // bot-left
  vec2(0.75, 0.10)   // bot-right
);

float toLuma(vec3 c) {
  return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
}

void main() {
  // ---- Determine which grid cell this fragment belongs to ----
  vec2 cellIndex  = floor(gl_FragCoord.xy / uCellSize);
  vec2 cellOrigin = cellIndex * uCellSize;

  // ---- Build the 6-D sampling vector ----
  float sv[6];
  vec3  cellColorSum = vec3(0.0);

  for (int i = 0; i < 6; i++) {
    vec2 pos = cellOrigin + samplePos[i] * uCellSize;
    vec2 uv  = pos / uResolution;
    vec3 col = texture(tDiffuse, uv).rgb;
    sv[i] = toLuma(col);
    cellColorSum += col;
  }
  vec3 avgColor = cellColorSum / 6.0;

  // ---- Global contrast enhancement ----
  float maxVal = max(max(max(sv[0], sv[1]), max(sv[2], sv[3])),
                     max(sv[4], sv[5]));

  if (uContrast > 1.0 && maxVal > 0.001) {
    for (int i = 0; i < 6; i++) {
      float n = sv[i] / maxVal;            // normalise to [0, 1]
      sv[i]   = pow(n, uContrast) * maxVal; // denormalise back
    }
  }

  // ---- Find the nearest ASCII character (brute-force, 95 iterations) ----
  int   bestChar = 0;
  float bestDist = 1e10;

  for (int c = 0; c < CHAR_COUNT; c++) {
    // Shape-vector texture: width = 2 RGBA texels per row, height = CHAR_COUNT.
    // Texel (0, c) stores components 0–3, texel (1, c) stores 4–5.
    vec4 t0 = texelFetch(uShapeVectors, ivec2(0, c), 0);
    vec4 t1 = texelFetch(uShapeVectors, ivec2(1, c), 0);

    float d = 0.0;
    d += (sv[0] - t0.r) * (sv[0] - t0.r);
    d += (sv[1] - t0.g) * (sv[1] - t0.g);
    d += (sv[2] - t0.b) * (sv[2] - t0.b);
    d += (sv[3] - t0.a) * (sv[3] - t0.a);
    d += (sv[4] - t1.r) * (sv[4] - t1.r);
    d += (sv[5] - t1.g) * (sv[5] - t1.g);

    if (d < bestDist) {
      bestDist = d;
      bestChar = c;
    }
  }

  // ---- Sample the glyph from the atlas ----
  vec2 posInCell = gl_FragCoord.xy - cellOrigin;

  ivec2 glyphCoord = ivec2(
    clamp(int(floor(posInCell.x)) + bestChar * int(uGlyphSize.x),
          0, int(uAtlasWidth) - 1),
    clamp(int(floor(posInCell.y)),
          0, int(uGlyphSize.y) - 1)
  );

  float glyphVal = texelFetch(uGlyphAtlas, glyphCoord, 0).r;

  // ---- Output ----
  if (uColored) {
    fragColor = vec4(avgColor * glyphVal, 1.0);
  } else {
    fragColor = vec4(vec3(glyphVal * toLuma(avgColor)), 1.0);
  }
}
`

// ---------------------------------------------------------------------------
// Precomputation helpers
// ---------------------------------------------------------------------------

interface PrecomputeResult {
  atlasData: Uint8Array
  atlasWidth: number
  atlasHeight: number
  shapeVectors: number[][]
  charWidth: number
  charHeight: number
}

/**
 * Measure the actual pixel dimensions of a single monospace character.
 * Returns { width, height, baseline } where baseline is the distance
 * from the top of the cell to the alphabetic baseline.
 */
function measureFont(fontSize: number, fontFamily: string) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  ctx.font = `${fontSize}px ${fontFamily}`

  // Measure with a set of characters that covers ascenders + descenders
  const test = 'MWgjpqy|({/'
  let maxAscent = 0
  let maxDescent = 0
  for (const ch of test) {
    const m = ctx.measureText(ch)
    maxAscent = Math.max(maxAscent, m.actualBoundingBoxAscent)
    maxDescent = Math.max(maxDescent, m.actualBoundingBoxDescent)
  }

  const width = Math.round(ctx.measureText('M').width)
  const height = Math.ceil(maxAscent + maxDescent)
  const baseline = Math.ceil(maxAscent)

  return { width, height, baseline }
}

/**
 * Sample a single circle in canvas-space pixel data and return the mean
 * brightness (0–1).
 */
function sampleCircle(
  imageData: ImageData,
  cx: number,
  cy: number,
  radius: number,
): number {
  const { width, data } = imageData
  const r2 = radius * radius
  const minX = Math.max(0, Math.floor(cx - radius))
  const maxX = Math.min(imageData.width - 1, Math.ceil(cx + radius))
  const minY = Math.max(0, Math.floor(cy - radius))
  const maxY = Math.min(imageData.height - 1, Math.ceil(cy + radius))

  let sum = 0
  let count = 0

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const dx = x + 0.5 - cx
      const dy = y + 0.5 - cy
      if (dx * dx + dy * dy <= r2) {
        sum += data[(y * width + x) * 4] / 255 // R channel
        count++
      }
    }
  }

  return count > 0 ? sum / count : 0
}

/**
 * Run all precomputation: glyph atlas + normalised 6-D shape vectors.
 */
function precompute(fontSize: number, fontFamily: string): PrecomputeResult {
  const {
    width: charWidth,
    height: charHeight,
    baseline,
  } = measureFont(fontSize, fontFamily)

  // ---- Build glyph atlas (single horizontal strip) ----
  const atlasCanvas = document.createElement('canvas')
  atlasCanvas.width = charWidth * CHAR_COUNT
  atlasCanvas.height = charHeight

  const atlasCtx = atlasCanvas.getContext('2d')!
  atlasCtx.fillStyle = 'black'
  atlasCtx.fillRect(0, 0, atlasCanvas.width, atlasCanvas.height)
  atlasCtx.fillStyle = 'white'
  atlasCtx.font = `${fontSize}px ${fontFamily}`
  atlasCtx.textBaseline = 'alphabetic'

  for (let i = 0; i < CHAR_COUNT; i++) {
    atlasCtx.fillText(CHARS[i], i * charWidth, baseline)
  }

  const atlasImageData = atlasCtx.getImageData(
    0,
    0,
    atlasCanvas.width,
    atlasCanvas.height,
  )

  // ---- Compute 6-D shape vectors ----
  const charCanvas = document.createElement('canvas')
  charCanvas.width = charWidth
  charCanvas.height = charHeight
  const charCtx = charCanvas.getContext('2d')!

  const radius = SAMPLE_RADIUS_FRAC * charWidth
  const shapeVectors: number[][] = []

  for (let i = 0; i < CHAR_COUNT; i++) {
    charCtx.fillStyle = 'black'
    charCtx.fillRect(0, 0, charWidth, charHeight)
    charCtx.fillStyle = 'white'
    charCtx.font = `${fontSize}px ${fontFamily}`
    charCtx.textBaseline = 'alphabetic'
    charCtx.fillText(CHARS[i], 0, baseline)

    const imgData = charCtx.getImageData(0, 0, charWidth, charHeight)

    const sv = SAMPLE_CENTERS_CANVAS.map(([sx, sy]) =>
      sampleCircle(imgData, sx * charWidth, sy * charHeight, radius),
    )
    shapeVectors.push(sv)
  }

  // ---- Normalise shape vectors per-component ----
  const maxPerComp = new Array(6).fill(0)
  for (const sv of shapeVectors) {
    for (let j = 0; j < 6; j++) {
      if (sv[j] > maxPerComp[j]) maxPerComp[j] = sv[j]
    }
  }
  for (const sv of shapeVectors) {
    for (let j = 0; j < 6; j++) {
      if (maxPerComp[j] > 0) sv[j] /= maxPerComp[j]
    }
  }

  return {
    atlasData: new Uint8Array(atlasImageData.data.buffer),
    atlasWidth: atlasCanvas.width,
    atlasHeight: atlasCanvas.height,
    shapeVectors,
    charWidth,
    charHeight,
  }
}

// ---------------------------------------------------------------------------
// AsciiPass
// ---------------------------------------------------------------------------

export interface AsciiPassOptions {
  /** Font size in pixels — controls glyph detail *and* cell density. Default 16. */
  fontSize?: number
  /** Monospace font family. Default "monospace". */
  fontFamily?: string
  /** Contrast-enhancement exponent (≥ 1). 1 = off. Default 3. */
  contrast?: number
  /** Tint glyphs with the underlying scene colour. Default false. */
  colored?: boolean
}

export class AsciiPass extends Pass {
  private fsQuad: FullScreenQuad
  private material: THREE.ShaderMaterial
  private glyphAtlasTex: THREE.DataTexture
  private shapeVectorsTex: THREE.DataTexture

  constructor(options: AsciiPassOptions = {}) {
    super()

    const {
      fontSize = 16,
      fontFamily = 'monospace',
      contrast = 3,
      colored = false,
    } = options

    // --- Precompute on the CPU ---
    const {
      atlasData,
      atlasWidth,
      atlasHeight,
      shapeVectors,
      charWidth,
      charHeight,
    } = precompute(fontSize, fontFamily)

    // --- Glyph atlas texture ---
    // Canvas origin is top-left; setting flipY = true makes row 0 in GL =
    // bottom of the glyph, which matches gl_FragCoord conventions.
    this.glyphAtlasTex = new THREE.DataTexture(
      atlasData,
      atlasWidth,
      atlasHeight,
      THREE.RGBAFormat,
      THREE.UnsignedByteType,
    )
    this.glyphAtlasTex.flipY = true
    this.glyphAtlasTex.minFilter = THREE.NearestFilter
    this.glyphAtlasTex.magFilter = THREE.NearestFilter
    this.glyphAtlasTex.needsUpdate = true

    // --- Shape-vectors texture ---
    // Layout: width = 2, height = CHAR_COUNT, RGBA Float32
    // Row c → texel (0,c) = components 0-3, texel (1,c) = components 4-5
    const svFloats = new Float32Array(CHAR_COUNT * 2 * 4)
    for (let c = 0; c < CHAR_COUNT; c++) {
      const sv = shapeVectors[c]
      const base = c * 8
      svFloats[base + 0] = sv[0]
      svFloats[base + 1] = sv[1]
      svFloats[base + 2] = sv[2]
      svFloats[base + 3] = sv[3]
      svFloats[base + 4] = sv[4]
      svFloats[base + 5] = sv[5]
      // [6] and [7] are padding (0)
    }

    this.shapeVectorsTex = new THREE.DataTexture(
      svFloats,
      2,
      CHAR_COUNT,
      THREE.RGBAFormat,
      THREE.FloatType,
    )
    this.shapeVectorsTex.minFilter = THREE.NearestFilter
    this.shapeVectorsTex.magFilter = THREE.NearestFilter
    this.shapeVectorsTex.needsUpdate = true

    // --- Shader material ---
    this.material = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms: {
        tDiffuse: { value: null },
        uGlyphAtlas: { value: this.glyphAtlasTex },
        uShapeVectors: { value: this.shapeVectorsTex },
        uResolution: { value: new THREE.Vector2() },
        uCellSize: { value: new THREE.Vector2(charWidth, charHeight) },
        uGlyphSize: { value: new THREE.Vector2(charWidth, charHeight) },
        uAtlasWidth: { value: atlasWidth },
        uContrast: { value: contrast },
        uColored: { value: colored },
      },
      vertexShader,
      fragmentShader,
    })

    this.fsQuad = new FullScreenQuad(this.material)
  }

  override render(
    renderer: THREE.WebGLRenderer,
    writeBuffer: THREE.WebGLRenderTarget,
    readBuffer: THREE.WebGLRenderTarget,
  ) {
    this.material.uniforms.tDiffuse.value = readBuffer.texture
    this.material.uniforms.uResolution.value.set(
      readBuffer.width,
      readBuffer.height,
    )

    if (this.renderToScreen) {
      renderer.setRenderTarget(null)
    } else {
      renderer.setRenderTarget(writeBuffer)
    }

    this.fsQuad.render(renderer)
  }

  // --- Runtime setters ---

  set contrast(value: number) {
    this.material.uniforms.uContrast.value = value
  }

  set colored(value: boolean) {
    this.material.uniforms.uColored.value = value
  }

  override dispose() {
    this.material.dispose()
    this.glyphAtlasTex.dispose()
    this.shapeVectorsTex.dispose()
    this.fsQuad.dispose()
  }
}
