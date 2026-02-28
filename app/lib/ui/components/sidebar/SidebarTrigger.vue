<script setup lang="ts">
import { useSidebar } from './utils'
import { cn } from '@/lib/ui/utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    @click="toggleSidebar">
    <Icon name="lucide:panel-left" />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
