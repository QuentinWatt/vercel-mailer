<template>
  <form @submit.prevent="sendEmail" class="space-y-4">
    <Alert v-if="alert.show" :type="alert.type" :message="alert.message" />
    <div>
      <label for="to" class="block text-sm font-medium text-gray-700">To:</label>
      <input
        type="email"
        placeholder="example@email.test"
        id="to"
        v-model="email.to"
        required
        class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
      >
    </div>
    <div>
      <label for="subject" class="block text-sm font-medium text-gray-700">Subject:</label>
      <input
        type="text"
        id="subject"
        placeholder="The reason for your email"
        v-model="email.subject"
        required
        class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
      >
    </div>
    <div>
      <label for="body" class="block text-sm font-medium text-gray-700">Body:</label>
      <textarea
        id="body"
        v-model="email.body"
        placeholder="The body of your email"
        rows="4"
        required
        class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
      ></textarea>
    </div>
    <div>
      <button
        type="submit"
        :disabled="loading"
        class="inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Loader v-if="loading" color="white" />
        <span v-else>Send Email</span>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Alert from './Alert.vue'

type AlertType = 'success' | 'error'

type AlertState = {
  show: boolean
  type: AlertType
  message: string
}

const loading = ref(false)

const email = ref({
  to: '',
  subject: '',
  body: ''
})

const alert = ref<AlertState>({
  show: false,
  type: 'success',
  message: ''
})

const sendEmail = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email.value),
    })
    const result = await response.json()
    if (result.success) {
      alert.value = { show: true, type: 'success', message: 'Email sent successfully!' }
      email.value = { to: '', subject: '', body: '' }
    } else {
      alert.value = { show: true, type: 'error', message: 'Failed to send email: ' + result.error }
    }
  } catch (error) {
    console.error('Error:', error)
    alert.value = { show: true, type: 'error', message: 'An error occurred while sending the email.' }
  }
  finally {
    loading.value = false
  }
}
</script>
