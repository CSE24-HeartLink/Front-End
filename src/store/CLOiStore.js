import { create } from "zustand";
import cloiApi from "../api/CLOiApi";

const useCLOiStore = create((set, get) => ({
  // State
  name: "클로이",
  level: 1,
  feedCount: 0,
  commentCount: 0,
  showInfo: false,
  isRenameModalVisible: false,
  isLoading: false,
  error: null,
  appearance: null,
  lastInteractionAt: null,
  message: "",
  progress: 0,

  // Actions
  fetchCloiInfo: async (userId) => {
    try {
      set({ isLoading: true });
      const data = await cloiApi.getCloiInfo(userId);
      console.log("CLOi Info Response:", data); // 로그 추가
      const growthResponse = await cloiApi.checkGrowth(userId);
      console.log("Growth Check Response:", growthResponse); // 로그 추가

      // 레벨별 메시지
      const levelMessages = {
        1: "응... (아직 말을 잘 못해요)",
        2: "안녕하세요! 더 친해지고 싶어요!",
        3: "우리 이제 좋은 친구가 되었네요!",
        4: "항상 당신과 함께 있어서 행복해요~",
        5: "우리는 최고의 파트너예요! 앞으로도 함께해요!",
      };

      set({
        name: data.name,
        level: growthResponse.cloi.level,
        feedCount: growthResponse.cloi.feedCount,
        commentCount: growthResponse.cloi.commentCount,
        appearance: data.appearance,
        lastInteractionAt: data.lastInteractionAt,
        message: levelMessages[growthResponse.cloi.level] || "안녕하세요!",
        progress: growthResponse.growth.nextLevelProgress,
        error: null,
      });
    } catch (error) {
      console.error("Fetch CLOi info error:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  checkGrowth: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await cloiApi.checkGrowth(userId);
      console.log("CLOiStore - Growth Response:", response); // 로그 추가

      const { cloi, appearance, growth } = response;

      // progress 계산 로직이 있는지 확인
      console.log("CLOiStore - Growth Progress:", growth.nextLevelProgress); // 로그 추가

      // 레벨별 메시지
      const levelMessages = {
        1: "응... (아직 말을 잘 못해요)",
        2: "안녕하세요! 더 친해지고 싶어요!",
        3: "우리 이제 좋은 친구가 되었네요!",
        4: "항상 당신과 함께 있어서 행복해요~",
        5: "우리는 최고의 파트너예요! 앞으로도 함께해요!",
      };

      set({
        level: cloi.level,
        feedCount: cloi.feedCount,
        commentCount: cloi.commentCount,
        appearance,
        lastInteractionAt: cloi.lastInteractionAt,
        progress: growth.nextLevelProgress, // progress 값이 제대로 설정되는지 확인
        message: levelMessages[cloi.level] || "안녕하세요!",
        error: null,
      });
      return response;
    } catch (error) {
      console.error("Growth check error:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),
  setRenameModalVisible: (visible) => set({ isRenameModalVisible: visible }),

  handleRename: async (userId, newName) => {
    await get().setName(userId, newName);
    set({ isRenameModalVisible: false });
  },

  setName: async (userId, newName) => {
    try {
      set({ isLoading: true });
      const response = await cloiApi.updateCloiName(userId, newName);
      set({
        name: response.name,
        appearance: response.appearance,
        error: null,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCLOiStore;
