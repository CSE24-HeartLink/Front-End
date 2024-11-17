// src/store/authStore.js
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  userToken: null,
  isLoading: true,

  // 초기 상태 로드
  initAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      set({ userToken: token, isLoading: false });
    } catch (e) {
      console.error("Failed to load token:", e);
      set({ isLoading: false });
    }
  },

  // 로그인
  signIn: async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      set({ userToken: token });
    } catch (e) {
      console.error("Failed to save token:", e);
    }
  },

  // 로그아웃
  signOut: async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      set({ userToken: null });
    } catch (e) {
      console.error("Failed to remove token:", e);
    }
  },
}));

export default useAuthStore;
