<template>
  <div :class="['p-4 rounded mb-4 flex justify-between items-center', type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300']" v-if="show">
    <div class="flex items-center">
      <span class="mr-2" v-if="type === 'success'">✅</span>
      <span class="mr-2" v-else-if="type === 'error'">❌</span>
      <p>{{ message }}</p>
    </div>
    <button @click="closeAlert" class="text-2xl leading-none cursor-pointer">&times;</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';

interface Props {
  type: 'success' | 'error';
  message: string;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 5000
});

const show = ref(true);

const emit = defineEmits(['close']);

const closeAlert = () => {
  show.value = false;
  emit('close');
};

const startCloseTimer = () => {
  if (props.duration > 0) {
    setTimeout(closeAlert, props.duration);
  }
};

watch(() => props.message, () => {
  show.value = true;
  startCloseTimer();
});

onMounted(() => {
  startCloseTimer();
});
</script>