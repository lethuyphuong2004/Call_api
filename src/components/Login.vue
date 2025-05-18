<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <h2 class="title">Đăng nhập</h2>

    <input
      v-model="user.username"
      placeholder="Tên đăng nhập"
      class="input-field"
      autocomplete="username"
    />

    <input
      v-model="user.password"
      type="password"
      placeholder="Mật khẩu"
      class="input-field"
      autocomplete="current-password"
    />

    <p v-if="log" :class="log.includes('thất bại') || log.includes('không đúng') ? 'error-message' : 'success-message'">
      {{ log }}
    </p>

    <p v-if="userInfo" class="success-message">
      Xin chào! <br />
      <strong>Email:</strong> {{ userInfo.email || 'Không có' }}
    </p>

    <button type="submit" class="btn-submit">
      Đăng nhập
    </button>

    <button type="button" class="btn-back" @click="goBack">← Quay trở lại</button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import VueJwtDecode from 'vue-jwt-decode';
import apiResource from '../composables/apiResource';

const { auth_login } = apiResource();

const user = reactive({
  username: '',
  password: '',
});

const log = ref('');
const userInfo = ref(null); // lưu thông tin người dùng từ token

const handleLogin = async () => {
  try {
    const response = await auth_login(user);

    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
      const token = response.access_token;
      const decodedToken = VueJwtDecode.decode(token);

      userInfo.value = decodedToken;
      log.value = ''; // xóa log nếu login thành công
    } else {
      log.value = 'Thông tin đăng nhập không đúng.';
    }
  } catch (error) {
    console.error('Login failed', error);
    log.value = 'Đăng nhập thất bại. Vui lòng thử lại.';
  }
};

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
.login-form {
  max-width: 380px;
  margin: 60px auto;
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 32px 28px;
  border-radius: 18px;
  box-shadow: 0 12px 24px rgba(118, 75, 162, 0.45);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.input-field {
  padding: 14px 18px;
  border-radius: 12px;
  border: none;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.3s ease;
  background: rgba(255 255 255 / 0.15);
  color: white;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.input-field:focus {
  box-shadow: 0 0 8px 3px rgba(255, 255, 255, 0.6);
  background: rgba(255 255 255 / 0.25);
}

.error-message {
  color: #ff6b6b;
  font-weight: 600;
  text-align: center;
  animation: pulseRed 1.5s ease-in-out infinite;
  margin: 0;
}

.success-message {
  color: #90ee90;
  font-weight: 600;
  text-align: center;
  margin: 0;
}

.btn-submit {
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  padding: 14px 0;
  font-size: 1.125rem;
  font-weight: 700;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: white;
  box-shadow: 0 6px 12px rgba(229, 46, 113, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-submit:hover {
  box-shadow: 0 8px 20px rgba(229, 46, 113, 0.85);
  transform: scale(1.05);
}

@keyframes pulseRed {
  0%, 100% {opacity: 1;}
  50% {opacity: 0.6;}
}
</style>