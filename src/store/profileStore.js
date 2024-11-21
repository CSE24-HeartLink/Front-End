import { create } from "zustand";
import { profileApi } from "../api/profileApi";
import useAuthStore from "./authStore";

const useProfileStore = create((set, get) => ({
  userProfile: {
    profileImage: null,
    postCount: 0,
    nickname: "",
  },
  isRenameModalVisible: false,
  isLoading: false,
  error: null,

  setUserProfile: (profile) =>
    set({ userProfile: { ...get().userProfile, ...profile } }),

  updateNickname: async (newName) => {
    try {
      const authState = useAuthStore.getState();
      console.log("Auth State:", authState); // 전체 authState 확인

      set({ isLoading: true, error: null });

      const response = await profileApi.updateProfile(
        authState.user.userId,
        newName,
        authState.userToken
      );

      set((state) => ({
        userProfile: {
          ...state.userProfile,
          nickname: response.profile.nickname,
        },
        isLoading: false,
      }));

      return response;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  setRenameModalVisible: (visible) => set({ isRenameModalVisible: visible }),

  handleRename: async (newName) => {
    if (newName.trim()) {
      try {
        await get().updateNickname(newName);
        set({ isRenameModalVisible: false });
      } catch (error) {
        console.error("[ProfileStore] Handle rename error:", error);
        throw error;
      }
    }
  },
}));

export default useProfileStore;
