import Constants from "expo-constants";

// development 환경의 URL을 기본값으로 사용
const API_URL = Constants.expoConfig.extra.apiUrl.development;

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

      // 응답 데이터 구조 확인 및 반환
      if (!data.token || !data.user) {
        throw new Error("Invalid response format");
      }

      return {
        token: data.token,
        user: {
          email: data.user.email,
          nickname: data.user.nickname,
          // 필요한 다른 사용자 정보들...
        },
      };
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

      // 응답 데이터 구조 확인 및 반환
      if (!data.token || !data.user) {
        throw new Error("Invalid response format");
      }

      return {
        token: data.token,
        user: {
          email: data.user.email,
          nickname: data.user.nickname,
          // 필요한 다른 사용자 정보들...
        },
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // 로그아웃
  logout: async (token) => {
    try {
      console.log("Sending logout request with token:", token); // 토큰 확인
  
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Logout response status:", response.status); // 응답 상태 확인
      const data = await response.json();
      console.log("Logout response data:", data); // 응답 데이터 확인
  
      if (!response.ok) throw new Error(data.message || "로그아웃 실패");
      return data;
    } catch (error) {
      console.error("Logout error details:", error); // 에러 상세 확인
      throw error;
    }
  },
};

export default authApi;
