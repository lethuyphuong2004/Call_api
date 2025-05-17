<template>
  <button
    @click="goToLogin"
    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition duration-200"
  >
    Đăng nhập
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToLogin() {
  router.push('/login')
}
</script>
