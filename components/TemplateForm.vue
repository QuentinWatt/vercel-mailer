<template>
  <form @submit.prevent="sendTemplate" class="space-y-4">
    <Alert v-if="alert.show" :type="alert.type" :message="alert.message" @close="alert.show = false" />
    <TextInput
      id="to"
      label="To:"
      type="text"
      placeholder="example1@email.test, example2@email.test"
      v-model="email.to"
      required
    />
    <div>
      <label for="templateId" class="block text-sm font-medium text-gray-700">Template:</label>
      <select
        id="templateId"
        v-model="email.templateId"
        required
        class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
      >
        <option value="" disabled>Select a template</option>
        <option v-for="template in templates" :key="template.id" :value="template.id">
          {{ template.name }}
        </option>
      </select>
    </div>
    <Button
      type="submit"
      :disabled="loading"
      :loading="loading"
      color="red"
    >
      Send Template Email
    </Button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Alert from './Alert.vue'
import TextInput from './TextInput.vue'
import { templates } from '@/config/mailTemplates.config'

type AlertType = 'success' | 'error'

type AlertState = {
  show: boolean
  type: AlertType
  message: string
}

const loading = ref(false)

const email = ref({
  to: '',
  templateId: '',
})

const alert = ref<AlertState>({
  show: false,
  type: 'success',
  message: ''
})

const sendTemplate = async () => {
  loading.value = true
  try {
    // Parse and validate email addresses
    const recipients = email.value.to.split(',').map(e => e.trim()).filter(e => e)
    if (!recipients.length) {
      throw new Error('Please enter at least one valid email address')
    }
    if (!recipients.every(e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))) {
      throw new Error('Please enter valid email addresses')
    }

    const response = await fetch('/api/send-template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...email.value }),
    })
    const result = await response.json()
    if (result.success) {
      alert.value = { show: true, type: 'success', message: 'Template email sent successfully!' }
      email.value = { to: '', templateId: '' }
    } else {
      alert.value = { show: true, type: 'error', message: 'Failed to send template email: ' + result.error }
    }
  } catch (error) {
    console.error('Error:', error)
    alert.value = { show: true, type: 'error', message: error instanceof Error ? error.message : 'An error occurred while sending the template email.' }
  }
  finally {
    loading.value = false
  }
}
</script>
