// store/feedStore.js
import { create } from "zustand";
import { initialFeeds } from "../constants/dummydata";

const useFeedStore = create((set, get) => ({
  feeds: initialFeeds,
  selectedReactions: {}, // 기존 코드
  selectedGroupId: "all",
  filteredFeeds: initialFeeds,

  // toggleReaction 함수 추가
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

  setSelectedGroup: (groupId) => {
    const feeds = get().feeds;
    const filteredFeeds =
      groupId === "all"
        ? feeds
        : feeds.filter((feed) => feed.group === groupId);

    set({
      selectedGroupId: groupId,
      filteredFeeds: filteredFeeds,
    });
  },

  addFeed: (feed) =>
    set((state) => {
      const newFeeds = [feed, ...state.feeds];
      const currentGroup = state.selectedGroupId;
      const newFilteredFeeds =
        currentGroup === "all"
          ? newFeeds
          : newFeeds.filter((f) => f.group === currentGroup);

      return {
        feeds: newFeeds,
        filteredFeeds: newFilteredFeeds,
      };
    }),

  loadInitialData: () =>
    set((state) => {
      const currentGroup = state.selectedGroupId;
      return {
        feeds: initialFeeds,
        filteredFeeds:
          currentGroup === "all"
            ? initialFeeds
            : initialFeeds.filter((feed) => feed.group === currentGroup),
      };
    }),

  // 피드 삭제 함수도 추가
  deleteFeed: (feedId) =>
    set((state) => ({
      feeds: state.feeds.filter((feed) => feed.id !== feedId),
      filteredFeeds: state.filteredFeeds.filter((feed) => feed.id !== feedId),
    })),
}));

export default useFeedStore;
