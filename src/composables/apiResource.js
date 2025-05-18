import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase.js";
import usePageRequests from "../composables/usePageRequests.js";

export default function apiResource() {
  const { makePostRequest } = usePageRequests();

  const auth_login = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.username,
        data.password
      );
      const firebaseUser = userCredential.user;
      const token = await firebaseUser.getIdToken();

      localStorage.setItem("jwt_token", token);

      return {
        access_token: token,
        user: {
          email: firebaseUser.email,
          uid: firebaseUser.uid,
        },
      };
    } catch (error) {
      console.error("Lỗi đăng nhập Firebase:", error.message);
      return {
        status: "error",
        message: "Đăng nhập thất bại. Vui lòng thử lại.",
      };
    }
  };

  return {
    auth_login,
    makePostRequest, // giữ nếu cần gọi API khác
  };
}
