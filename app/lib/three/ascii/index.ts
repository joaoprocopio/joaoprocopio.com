import fragmentShader from './fragment.glsl?raw'
import vertexShader from './vertex.glsl?raw'
import * as THREE from 'three'
import { FullScreenQuad, Pass } from 'three/addons/postprocessing/Pass.js'

export class AsciiPass extends Pass {
  #fsQuad: FullScreenQuad
  #material: THREE.ShaderMaterial

  constructor() {
    super()

    this.#material = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms: { tDiffuse: { value: null } },
      vertexShader,
      fragmentShader,
    })

    this.#fsQuad = new FullScreenQuad(this.#material)
  }

  override render(
    renderer: THREE.WebGLRenderer,
    writeBuffer: THREE.WebGLRenderTarget,
    readBuffer: THREE.WebGLRenderTarget,
  ): void {
    this.#material.uniforms.tDiffuse!.value = readBuffer.texture

    if (this.renderToScreen) {
      renderer.setRenderTarget(null)
    } else {
      renderer.setRenderTarget(writeBuffer)
    }

    this.#fsQuad.render(renderer)
  }

  override dispose(): void {
    this.#fsQuad.dispose()
  }
}
