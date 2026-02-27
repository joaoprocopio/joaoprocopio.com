<script lang="ts" setup>
import { useFormField } from './useFormField'
import { cn } from '@/lib/ui/utils'
import { ErrorMessage } from 'vee-validate'
import type { HTMLAttributes } from 'vue'
import { toValue } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { name, formMessageId } = useFormField()
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    data-slot="form-message"
    as="p"
    :name="toValue(name)"
    :class="cn('text-destructive text-sm', props.class)" />
</template>
