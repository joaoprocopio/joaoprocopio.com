<script setup lang="ts">
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { AsciiPass } from '~/lib/three/ascii'

const containerRef = useTemplateRef('container')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  2,
  30,
)
camera.position.set(4, 4, 4)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setAnimationLoop((timestamp: DOMHighResTimeStamp) => {
  timer.update(timestamp)

  rotate(knot)
  rotate(cube)
  rotate(torus)

  composer.render()
})

function rotate(object: THREE.Mesh) {
  const elapsed = timer.getElapsed()

  object.position.y = 0.33 * Math.sin(elapsed)
  object.rotation.y = elapsed * 0.6
  object.rotation.x = elapsed * 0.3
  object.rotation.z = elapsed * 0.2
}

const composer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

const asciiPass = new AsciiPass()
composer.addPass(asciiPass)

const knot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(),
  new THREE.MeshDepthMaterial(),
)
knot.position.set(1, 0, 1)

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshDepthMaterial(),
)
cube.position.set(3, 1, -1)

const torus = new THREE.Mesh(
  new THREE.DodecahedronGeometry(),
  new THREE.MeshDepthMaterial(),
)
torus.position.set(-1, 2, 3)

scene.add(knot)
scene.add(cube)
scene.add(torus)

const timer = new THREE.Timer()

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  containerRef.value!.appendChild(renderer.domElement)
  timer.connect(document)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  timer.dispose()
  composer.dispose()
  renderer.dispose()
})
</script>

<template>
  <div ref="container" />
</template>
