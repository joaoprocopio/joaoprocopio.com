<script setup lang="ts">
const value = ref<string[]>([])
</script>

<template>
  <PinInput id="pin-input" v-model="value" placeholder="○">
    <PinInputGroup class="gap-1">
      <template v-for="(id, index) in 5" :key="id">
        <PinInputSlot class="rounded-md border" :index="index" />
        <template v-if="index !== 4">
          <PinInputSeparator />
        </template>
      </template>
    </PinInputGroup>
  </PinInput>
</template>
