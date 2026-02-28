<script setup lang="ts">
import { ToastProvider, TooltipProvider, ConfigProvider } from 'reka-ui'
</script>

<template>
  <ColorScheme>
    <ConfigProvider>
      <TooltipProvider>
        <ToastProvider>
          <NuxtLoadingIndicator />
          <NuxtRouteAnnouncer />

          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
        </ToastProvider>
      </TooltipProvider>
    </ConfigProvider>
  </ColorScheme>
</template>
