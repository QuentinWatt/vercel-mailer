<template>
  <div class="loader" :style="loaderStyle"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  color?: string;
  width?: string;
  borderWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: '#000',
  width: '25px',
  borderWidth: '4px'
});

const loaderStyle = computed(() => ({
  width: props.width,
  borderColor: `${props.color} transparent`,
  borderWidth: `${props.borderWidth}`,
}));
</script>

<style>
.loader {
  aspect-ratio: 1;
  border-radius: 50%;
  border-style: solid;
  animation: l1 1s infinite;
}

@keyframes l1 {to{transform: rotate(.5turn)}}
</style>