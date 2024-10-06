<template>
  <div class="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-100">
    <div class="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-6">Send an Email</h1>
      <div class="mb-4">
        <div class="flex border-b">
          <button
            @click="activeTab = 'template'"
            :class="['py-2 px-4 font-medium', activeTab === 'template' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500']"
          >
            Template Form
          </button>
          <button
            @click="activeTab = 'email'"
            :class="['py-2 px-4 font-medium', activeTab === 'email' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500']"
          >
            Email Form
          </button>
        </div>
      </div>
      <TemplateForm v-if="activeTab === 'template'" />
      <EmailForm v-else />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EmailForm from './components/EmailForm.vue';
import TemplateForm from './components/TemplateForm.vue';

const activeTab = ref('template');
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
