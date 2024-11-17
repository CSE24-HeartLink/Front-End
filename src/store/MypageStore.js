// src/store/MypageStore.js
import { create } from "zustand";
import useAuthStore from "./authStore";

const useMyPageStore = create((set, get) => ({
  // 마이페이지 전용 상태
  userProfile: {
    profileImage: null,
    postCount: 0,
    cloiLevel: 3,
    streakDays: 10,
  },

  isRenameModalVisible: false,

  // Actions
  setUserProfile: (profile) =>
    set({ userProfile: { ...get().userProfile, ...profile } }),

  updateNickname: async (newName) => {
    const authStore = useAuthStore.getState();
    await authStore.updateUser({ nickname: newName });
  },

  incrementPostCount: () =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        postCount: state.userProfile.postCount + 1,
      },
    })),

  updateStreakDays: (days) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        streakDays: days,
      },
    })),

  setRenameModalVisible: (visible) => set({ isRenameModalVisible: visible }),

  handleRename: async (newName) => {
    if (newName.trim()) {
      await get().updateNickname(newName);
      set({ isRenameModalVisible: false });
    }
  },
}));

export default useMyPageStore;
