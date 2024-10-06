<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm text-sm font-medium rounded-md',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      colorClasses
    ]"
    @click="$emit('click')"
  >
    <Loader v-if="loading" :color="loaderColor" />
    <span v-else><slot></slot></span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Loader from './Loader.vue';

const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'red'
  }
});

const emit = defineEmits(['click']);

const colorClasses = computed(() => {
  switch (props.color) {
    case 'red':
      return 'text-white bg-red-500 hover:bg-red-600 focus:ring-red-500';
    case 'blue':
      return 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-500';
    case 'green':
      return 'text-white bg-green-500 hover:bg-green-600 focus:ring-green-500';
    default:
      return 'text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-500';
  }
});

const loaderColor = computed(() => props.color === 'white' ? 'black' : 'white');
</script>