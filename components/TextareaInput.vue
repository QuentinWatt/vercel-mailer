<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :placeholder="placeholder"
      :rows="rows"
      :required="required"
      class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: string;
  label: string;
  id: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  rows: 4,
  required: false
});

const emit = defineEmits(['update:modelValue']);
</script>
