<script setup lang="ts">
// Reusable AdSense unit component.
// When `adsenseClientId` is present, it renders the official AdSense <ins> tag.
// Before AdSense approval (when `adsenseClientId` is not set), it renders NOTHING
// to ensure a clean, professional user experience for Google AdSense reviewers.

const props = defineProps<{
  slot?: string;
  format?: string;
  label?: string;
}>();

const config = useRuntimeConfig();
</script>

<template>
  <div v-if="config.public.adsenseClientId" class="my-6 flex justify-center">
    <ins
      class="adsbygoogle"
      style="display: block; width: 100%"
      :data-ad-client="config.public.adsenseClientId"
      :data-ad-slot="slot || ''"
      :data-ad-format="format || 'auto'"
      data-full-width-responsive="true"
    />
  </div>
</template>
