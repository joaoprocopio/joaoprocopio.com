<script setup lang="ts">
import type { TresInstance } from '@tresjs/core'

const loop = useLoop()
const cubeRef = shallowRef<TresInstance | null>()

loop.onBeforeRender((context) => {
  if (cubeRef.value) {
    cubeRef.value.position.y = 0.3 * Math.sin(1 * context.elapsed)
    cubeRef.value.rotation.y = context.elapsed * 0.6
    cubeRef.value.rotation.x = context.elapsed * 0.3
    cubeRef.value.rotation.z = context.elapsed * 0.2
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[2, 1, 3]" :look-at="[0, 0, 0]" />

  <TresMesh ref="cubeRef" :position="[0, 0, 0]">
    <TresBoxGeometry />
    <TresMeshBasicMaterial />
  </TresMesh>

  <TresAxesHelper />
  <TresGridHelper />
</template>
