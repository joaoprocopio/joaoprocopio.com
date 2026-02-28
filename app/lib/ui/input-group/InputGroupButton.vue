<script setup lang="ts">
import type { InputGroupButtonVariants } from '.'
import { inputGroupButtonVariants } from '.'
import type { ButtonVariants } from '@/lib/ui/button'
import { Button } from '@/lib/ui/button'
import { cn } from '@/lib/ui/utils'
import type { HTMLAttributes } from 'vue'

interface InputGroupButtonProps {
  variant?: ButtonVariants['variant']
  size?: InputGroupButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<InputGroupButtonProps>(), {
  size: 'xs',
  variant: 'ghost',
})
</script>

<template>
  <Button
    :data-size="props.size"
    :variant="props.variant"
    :class="cn(inputGroupButtonVariants({ size: props.size }), props.class)">
    <slot />
  </Button>
</template>
