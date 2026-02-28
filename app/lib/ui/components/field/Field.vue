<script setup lang="ts">
import type { FieldVariants } from '.'
import { fieldVariants } from '.'
import { cn } from '@/lib/ui/utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  orientation?: FieldVariants['orientation']
}>()
</script>

<template>
  <div
    role="group"
    data-slot="field"
    :data-orientation="orientation"
    :class="cn(fieldVariants({ orientation }), props.class)">
    <slot />
  </div>
</template>
