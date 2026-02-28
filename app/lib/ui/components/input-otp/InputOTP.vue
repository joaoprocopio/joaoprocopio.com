<script setup lang="ts">
import { cn } from '@/lib/ui/utils'
import { reactiveOmit } from '@vueuse/core'
import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui'
import { PinInputRoot, useForwardPropsEmits } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<
  PinInputRootProps & { class?: HTMLAttributes['class'] }
>()

const emits = defineEmits<PinInputRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PinInputRoot
    data-slot="input-otp"
    v-slot="slotProps"
    v-bind="forwarded"
    :container-class="
      cn('flex items-center gap-2 has-disabled:opacity-50', props.class)
    "
    class="disabled:cursor-not-allowed">
    <slot v-bind="slotProps" />
  </PinInputRoot>
</template>
