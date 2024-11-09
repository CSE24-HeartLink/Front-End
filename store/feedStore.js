import { create } from "zustand";
import { initialFeeds } from "../constants/dummydata";

const useFeedStore = create((set) => ({
  feeds: [],
  selectedReactions: {},

  setFeeds: (feeds) => set({ feeds }),
  addFeed: (feed) =>
    set((state) => ({
      feeds: [feed, ...state.feeds],
    })),
  updateFeed: (feedId, updatedFeed) =>
    set((state) => ({
      feeds: state.feeds.map((feed) =>
        feed.id === feedId ? { ...feed, ...updatedFeed } : feed
      ),
    })),
  deleteFeed: (feedId) =>
    set((state) => ({
      feeds: state.feeds.filter((feed) => feed.id !== feedId),
    })),

  toggleReaction: (feedId, reactionType) =>
    set((state) => ({
      selectedReactions: {
        ...state.selectedReactions,
        [feedId]:
          state.selectedReactions[feedId] === reactionType
            ? null
            : reactionType,
      },
    })),

  loadInitialData: () => {
    set({ feeds: initialFeeds }); // 초기 데이터를 직접 설정
  },
}));

export default useFeedStore;
