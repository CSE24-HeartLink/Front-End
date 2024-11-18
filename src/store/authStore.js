import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseJwt } from "../utils/authUtils";

const useAuthStore = create((set, get) => ({
  userToken: null,
  isLoading: true,
  user: null, // 사용자 정보 추가

  getUserId: () => {
    const token = get().userToken;
    if (!token) return null;

    const decoded = parseJwt(token);
    return decoded?.userId;
  },

  // 초기 상태 로드
  initAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userStr = await AsyncStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      // 토큰 유효성 검증 추가
      if (token) {
        const decoded = parseJwt(token);
        if (!decoded || !decoded.userId) {
          // 토큰이 유효하지 않으면 로그아웃
          await get().signOut();
          return;
        }
      }

      set({ userToken: token, user, isLoading: false });
    } catch (e) {
      console.error("Failed to load auth data:", e);
      set({ isLoading: false });
    }
  },

  // 로그인
  signIn: async (token, userData) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      set({ userToken: token, user: userData });
    } catch (e) {
      console.error("Failed to save auth data:", e);
    }
  },

  // 로그아웃
  signOut: async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("user");
      set({ userToken: null, user: null });
    } catch (e) {
      console.error("Failed to remove auth data:", e);
    }
  },

  // 사용자 정보 업데이트
  updateUser: async (userData) => {
    try {
      const updatedUser = { ...get().user, ...userData };
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      set({ user: updatedUser });
    } catch (e) {
      console.error("Failed to update user data:", e);
    }
  },
}));

export default useAuthStore;
