// store/feedStore.js
import { create } from "zustand";
import { initialFeeds } from "../constants/dummydata";

const useFeedStore = create((set, get) => ({
  feeds: initialFeeds,
  selectedReactions: {},
  selectedGroupId: "all",
  filteredFeeds: initialFeeds,

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
}));

export default useFeedStore;
