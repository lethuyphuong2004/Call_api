<template>
  <form class="text-center max-w-sm mx-auto" @submit.prevent="handleLogin">
    <input
      v-model="user.username"
      placeholder="Tên đăng nhập"
      class="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
    />
    <input
      v-model="user.password"
      type="password"
      placeholder="Mật khẩu"
      class="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
    />
    
    <p v-if="log" class="text-red-500 text-sm mb-4">{{ log }}</p>
    
    <button
      type="submit"
      class="px-6 py-3 bg-accent text-white rounded-lg shadow-md hover:bg-yellow-500 transition w-full"
    >
      Đăng nhập
    </button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import VueJwtDecode from 'vue-jwt-decode';
import apiResource from '../composables/apiResource';

// API từ composable
const { auth_login } = apiResource();

// Khai báo dữ liệu người dùng
const user = reactive({
  username: '',
  password: '',
});

// Thông báo phản hồi
const log = ref('');

const handleLogin = async () => {
  try {
    const response = await auth_login(user);

    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);

      const token = localStorage.getItem('access_token');
      const decodedToken = VueJwtDecode.decode(token);

      // Hiển thị payload từ JWT
      log.value = `Xin chào, ${decodedToken.username || 'người dùng'}!`;
    } else {
      log.value = 'Thông tin đăng nhập không đúng.';
    }
  } catch (error) {
    console.error('Login failed', error);
    log.value = 'Đăng nhập thất bại. Vui lòng thử lại.';
  }
};
</script>


<style scoped>
.container {
    min-height: 100vh;
    width: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}


.login-form {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    border-radius: 24px;
    box-shadow:
        0 10px 20px rgba(99, 102, 241, 0.2),
        0 6px 6px rgba(139, 92, 246, 0.15);
    max-width: 400px;
    width: 100%;
    padding: 40px 32px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 28px;
}


.title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    text-align: center;
    letter-spacing: 0.05em;
    margin: 0;
}

.error-message {
    color: #dc2626;
    font-weight: 600;
    font-size: 0.875rem;
    text-align: center;
    animation: pulseRed 1.5s ease-in-out infinite;
    margin: 0;
}


.success-message {
    color: #0099ff;
    font-weight: 600;
    font-size: 0.9rem;
    text-align: center;
    margin: 0;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.input-group label {
    font-weight: 800;
    color: #8f8f8f;
    font-size: 0.875rem;
}

.input-field {
    padding: 14px 18px;
    border: 1.5px solid #d1d5db;
    border-radius: 20px;
    font-size: 1rem;
    color: #ffffff;
    outline: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-field::placeholder {
    color: #9ca3af;
}

.input-field:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 8px 2px rgba(139, 92, 246, 0.6);
}

/* Submit button */
.btn-submit {
    background: linear-gradient(90deg, #7c3aed, #4f46e5, #ec4899);
    color: white;
    font-weight: 800;
    font-size: 1.125rem;
    border: none;
    border-radius: 24px;
    padding: 14px 0;
    cursor: pointer;
    box-shadow: 0 8px 15px rgba(236, 72, 153, 0.5);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.btn-submit:hover {
    box-shadow: 0 12px 24px rgba(236, 72, 153, 0.8);
    transform: scale(1.05);
}

/* Animation for error */
@keyframes pulseRed {

    0%,
    100% {
        opacity: 1; 
    }

    50% {
        opacity: 0.6;
    }
}
</style>
