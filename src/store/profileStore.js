import { create } from "zustand";
import { profileApi } from "../api/profileApi";

import useAuthStore from "./authStore";
import useFeedStore from "./feedStore";
import { feedApi } from "../api/feedApi";

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

  setUserProfile: (profile) =>
    set({ userProfile: { ...get().userProfile, ...profile } }),

  updateNickname: async (newName) => {
    try {
      const userId = useAuthStore.getState().getUserId(); // userId 직접 가져오기
      if (!userId) {
        throw new Error("userId is required");
      }

      console.log("Updating nickname for userId:", userId); // 로그 추가

      set({ isLoading: true, error: null });

      const response = await profileApi.updateProfile(
        userId, // authState.user.userId 대신 직접 가져온 userId 사용
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

  //유저 게시글 스탯 확인
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
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    }
  },
}));

export default useProfileStore;
