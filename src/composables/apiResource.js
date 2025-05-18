import usePageRequests from "./usePageRequests.js";

const apiUrl = import.meta.env.VITE_API_URL;

export default function apiResource() {
  const { makePostRequest } = usePageRequests();

  const auth_login = async (data) => {
    try {
      const response = await makePostRequest(`${apiUrl}/auth/login`, data);

      if (response?.access_token) {
        localStorage.setItem("jwt_token", response.access_token);
      }

      return response;
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      return {
        status: "error",
        message: "Đăng nhập thất bại. Vui lòng thử lại.",
      };
    }
  };



  return {
    auth_login,
  };
}
