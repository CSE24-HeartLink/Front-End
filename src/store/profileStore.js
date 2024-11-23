// profileStore.js
import { create } from "zustand";
import { profileApi } from "../api/profileApi";
import { feedApi } from "../api/feedApi";
import useAuthStore from "./authStore";

/**
 * 프로필 관련 상태를 관리하는 store
 * - 유저 프로필 정보
 * - 프로필 수정 관련 모달
 * - 통계 정보
 */
const useProfileStore = create((set, get) => ({
  userProfile: {
    profileImage: null,
    postCount: 0,
    nickname: "",
    streakDays: 0,
    cloiLevel: 1,
  },
  isRenameModalVisible: false,
  isLoading: false,
  error: null,

  // 프로필 정보 업데이트
  setUserProfile: (profile) =>
    set({ userProfile: { ...get().userProfile, ...profile } }),

  // 닉네임 업데이트 
  updateNickname: async (newName) => {
    try {
      const userId = useAuthStore.getState().getUserId();
      if (!userId) throw new Error("userId is required");

      set({ isLoading: true, error: null });

      const response = await profileApi.updateProfile(
        userId,
        newName,
        useAuthStore.getState().userToken
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

  // 이름 변경 모달 표시 여부
  setRenameModalVisible: (visible) => set({ isRenameModalVisible: visible }),

  // 이름 변경 처리
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

  // 유저 통계 조회
  fetchUserStats: async () => {
    try {
      const userId = useAuthStore.getState().getUserId();
      const response = await feedApi.getUserFeeds(userId, userId);
      const userFeeds = response.feeds;

      // 연속 업로드 일수 계산
      const sortedDates = userFeeds
        .map((feed) => new Date(feed.createdAt).toDateString())
        .sort((a, b) => new Date(b) - new Date(a));

      let streakDays = 0;
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      for (let i = 0; i < sortedDates.length; i++) {
        const feedDate = new Date(sortedDates[i]);
        if (
          currentDate.getTime() - feedDate.getTime() >
          (streakDays + 1) * 86400000
        )
          break;
        if (i === 0 || sortedDates[i] !== sortedDates[i - 1]) streakDays++;
      }

      set((state) => ({
        userProfile: {
          ...state.userProfile,
          postCount: userFeeds.length,
          streakDays,
        },
      }));

      return { postCount: userFeeds.length, streakDays }; // 통계 정보 반환
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
      throw error;
    }
  },
}));

export default useProfileStore;