// CLOiStore.js
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

  // Computed values
  calculateProgress: () => {
    const { feedCount, commentCount, level } = get();
    const totalPoints = feedCount * 2 + commentCount;
    const levelThresholds = [0, 10, 20, 30, 50];

    if (level >= 5) return 100;

    const currentThreshold = levelThresholds[level - 1];
    const nextThreshold = levelThresholds[level];
    const progress =
      ((totalPoints - currentThreshold) / (nextThreshold - currentThreshold)) *
      100;

    return Math.min(Math.max(progress, 0), 100);
  },

  // Actions
  fetchCloiInfo: async (userId) => {
    try {
      set({ isLoading: true });
      const data = await cloiApi.getCloiInfo(userId);
      const chatResponse = await cloiApi.chatWithCloi(userId, "안녕");

      set({
        name: data.name,
        level: data.level,
        feedCount: data.feedCount,
        commentCount: data.commentCount,
        appearance: data.appearance,
        lastInteractionAt: data.lastInteractionAt,
        message: chatResponse.message,
        error: null,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  checkGrowth: async (userId) => {
    try {
      set({ isLoading: true });
      const response = await cloiApi.checkGrowth(userId);
      const { cloi, appearance } = response;

      set({
        level: cloi.level,
        feedCount: cloi.feedCount,
        commentCount: cloi.commentCount,
        appearance,
        lastInteractionAt: cloi.lastInteractionAt,
        error: null,
      });

      return response;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // UI Actions
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

  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),
  setRenameModalVisible: (visible) => set({ isRenameModalVisible: visible }),

  handleRename: async (userId, newName) => {
    await get().setName(userId, newName);
    set({ isRenameModalVisible: false });
  },
}));

export default useCLOiStore;
