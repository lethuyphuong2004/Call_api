<!-- <script setup>
import { ref, onMounted } from 'vue'

// Khởi tạo biến để lưu token
const token = ref('')

// Đọc dữ liệu khi component được mounted
onMounted(() => {
  const savedToken = localStorage.getItem('jwt_token')
  if (savedToken) {
    token.value = savedToken
  } else {
    token.value = 'Không tìm thấy token trong localStorage.'
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full">
      <h2 class="text-2xl font-semibold text-center text-indigo-600 mb-4">
        Token từ localStorage
      </h2>
      <div class="bg-gray-50 border border-gray-200 rounded-md p-4">
        <p class="break-all text-sm text-gray-700">
          {{ token }}
        </p>
      </div>
    </div>
  </div>
</template> -->
