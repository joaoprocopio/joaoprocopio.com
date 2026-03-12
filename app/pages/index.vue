<script setup lang="ts">
import * as THREE from 'three'

const containerRef = useTemplateRef('container')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)
camera.position.set(2, 1, 3)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setAnimationLoop((timestamp: DOMHighResTimeStamp) => {
  timer.update(timestamp)

  const elapsed = timer.getElapsed()

  cube.position.y = Math.sin(elapsed)
  cube.rotation.y = elapsed * 0.6
  cube.rotation.x = elapsed * 0.3
  cube.rotation.z = elapsed * 0.2

  renderer.render(scene, camera)
})

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
)
scene.add(cube)

scene.add(new THREE.AxesHelper(5))
scene.add(new THREE.GridHelper(10, 10))

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
  renderer.dispose()
})
</script>

<template>
  <div ref="container" />
</template>
