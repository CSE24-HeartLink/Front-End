import { create } from "zustand";
import { profileApi } from "../api/profileApi";
import useAuthStore from "./authStore";

const useProfileStore = create((set, get) => ({
  // 상태
  userProfile: {
    profileImage: null,
    postCount: 0,
    nickname: "",
  },
  isRenameModalVisible: false,
  isLoading: false,
  error: null,

  // 프로필 정보 업데이트 액션
  setUserProfile: (profile) =>
    set({ userProfile: { ...get().userProfile, ...profile } }),

  // 닉네임 업데이트 액션
  updateNickname: async (newName) => {
    try {
      set({ isLoading: true, error: null });
      console.log("[ProfileStore] Updating nickname:", newName);
      
      const { userToken, userId } = useAuthStore.getState();
      const response = await profileApi.updateProfile(userId, newName, userToken);
      
      // 로컬 프로필 데이터 업데이트
      set((state) => ({
        userProfile: {
          ...state.userProfile,
          nickname: response.profile.nickname,
        },
        isLoading: false,
        error: null,
      }));

      // Auth 스토어의 유저 정보도 함께 업데이트
      useAuthStore.getState().updateUserInfo({
        nickname: response.profile.nickname,
      });

      return response;
    } catch (error) {
      console.error("[ProfileStore] Update nickname error:", error);
      set({ 
        error: error.message || "닉네임 변경에 실패했습니다.", 
        isLoading: false 
      });
      throw error;
    }
  },

  // 이름 변경 모달 표시/숨김 처리
  setRenameModalVisible: (visible) => set({ isRenameModalVisible: visible }),

  // 이름 변경 처리 핸들러
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