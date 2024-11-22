import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl.development;

export const authApi = {
  // 회원가입
  signup: async (userData) => {
    try {
      console.log("Sending signup request with:", userData);
      const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
      console.log("Signup response:", response.data);

      if (!response.data.token || !response.data.user) {
        throw new Error("Invalid response format");
      }

      return {
        token: response.data.token,
        user: {
          email: response.data.user.email,
          nickname: response.data.user.nickname,
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
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: email.trim().toLowerCase(),
        password,
      });
      console.log("Login response:", response.data);

      if (!response.data.token || !response.data.user) {
        throw new Error("Invalid response format");
      }

      return {
        token: response.data.token,
        user: {
          email: response.data.user.email,
          nickname: response.data.user.nickname,
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
      console.log("Sending logout request with token:", token);
      const response = await axios.post(`${API_URL}/api/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Logout response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Logout error details:", error);
      throw error;
    }
  },
};

export default authApi;