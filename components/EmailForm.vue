<template>
  <form @submit.prevent="sendEmail" class="space-y-4">
    <Alert v-if="alert.show" :type="alert.type" :message="alert.message" @close="alert.show = false" />
    <TextInput
      id="to"
      label="To:"
      type="email"
      placeholder="example@email.test"
      v-model="email.to"
      required
    />
    <TextInput
      id="subject"
      label="Subject:"
      type="text"
      placeholder="The reason for your email"
      v-model="email.subject"
      required
    />
    <TextareaInput
      id="body"
      label="Body:"
      v-model="email.body"
      placeholder="The body of your email"
      :rows="4"
      required
    />
    <Button
      type="submit"
      :disabled="loading"
      :loading="loading"
      color="red"
    >
      Send Email
    </Button>
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
