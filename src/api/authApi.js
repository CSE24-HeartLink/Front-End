import Constants from "expo-constants";

// development 환경의 URL을 기본값으로 사용
const API_URL = Constants.expoConfig.extra.apiUrl.yongdab;

export const authApi = {
  // 회원가입
  signup: async (userData) => {
    try {
      console.log("Sending signup request with:", userData);

      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (!response.ok) throw new Error(data.message || "회원가입 실패");
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  // 로그인
  login: async (email, password) => {
    try {
      console.log("Sending login request:", { email });

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("서버에서 잘못된 응답 형식을 반환했습니다.");
      }

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message || "로그인 실패");
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // 로그아웃
  logout: async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "로그아웃 실패");
      return data;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },
};

export default authApi;
