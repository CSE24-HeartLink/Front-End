import { create } from "zustand";
import { initialFeeds } from "../constants/dummydata";

const useFeedStore = create((set, get) => ({
  feeds: [],
  selectedReactions: {},
  selectedGroupId: "all",    
  filteredFeeds: [],         

  setFeeds: (feeds) => set({ feeds }),

  setSelectedGroup: (groupId) => {
    const feeds = get().feeds;
    const filteredFeeds = groupId === "all" 
      ? feeds 
      : feeds.filter(feed => feed.group === groupId);
    
    set({
      selectedGroupId: groupId,
      filteredFeeds: filteredFeeds,
    });
  },

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
        [feedId]: state.selectedReactions[feedId] === reactionType
          ? null
          : reactionType,
      },
    })),

  loadInitialData: () => {
    set({ 
      feeds: initialFeeds,
      filteredFeeds: initialFeeds,
      selectedGroupId: "all"
    });
  },
}));

export default useFeedStore;