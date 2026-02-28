<script setup lang="ts">
import { navigationMenuTriggerStyle } from '.'
import { cn } from '@/lib/ui/utils'
import type { NavigationMenuTriggerProps } from 'reka-ui'
import { NavigationMenuTrigger, useForwardProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<
  NavigationMenuTriggerProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
    v-bind="forwardedProps"
    :class="cn(navigationMenuTriggerStyle(), 'group', props.class)">
    <slot />
    <Icon
      name="lucide:chevron-down"
      class="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true" />
  </NavigationMenuTrigger>
</template>
