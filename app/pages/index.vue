<script setup lang="ts">
const colorMode = useColorMode()
</script>

<template>
  <div>{{ colorMode }}</div>
  <Button
    @click="
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    ">
    toggle
  </Button>
</template>
