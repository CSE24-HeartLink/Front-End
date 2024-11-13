import { create } from "zustand";
import { initialFeeds } from "../constants/dummydata";

const useFeedStore = create((set) => ({
  feeds: [],
  filteredFeeds: [],
  selectedGroup: "all",
  selectedReactions: {},

  loadInitialData: () => {
    set({
      feeds: initialFeeds,
      filteredFeeds: initialFeeds,
    });
  },

  setSelectedGroup: (groupId) => {
    set((state) => ({
      selectedGroup: groupId,
      filteredFeeds:
        groupId === "all"
          ? state.feeds
          : state.feeds.filter((feed) => feed.group === groupId),
    }));
  },

  addFeed: (newFeed) => {
    set((state) => {
      const updatedFeeds = [newFeed, ...state.feeds];
      return {
        feeds: updatedFeeds,
        filteredFeeds:
          state.selectedGroup === "all"
            ? updatedFeeds
            : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
      };
    });
  },

  // 피드 수정 기능 추가
  updateFeed: (feedId, updatedContent) => {
    set((state) => {
      const updatedFeeds = state.feeds.map((feed) =>
        feed.id === feedId
          ? {
              ...feed,
              ...updatedContent,
              updatedAt: new Date(),
            }
          : feed
      );
      return {
        feeds: updatedFeeds,
        filteredFeeds:
          state.selectedGroup === "all"
            ? updatedFeeds
            : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
      };
    });
  },

  // 피드 삭제 기능
  deleteFeed: (feedId) => {
    set((state) => {
      const updatedFeeds = state.feeds.filter((feed) => feed.id !== feedId);
      return {
        feeds: updatedFeeds,
        filteredFeeds:
          state.selectedGroup === "all"
            ? updatedFeeds
            : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
      };
    });
  },

  toggleReaction: (feedId, reactionType) => {
    set((state) => {
      const currentUserId = "user1"; // 현재 로그인한 사용자 ID

      const updatedFeeds = state.feeds.map((feed) => {
        if (feed.id === feedId) {
          const updatedReactions = feed.reactions.map((reaction) => {
            if (reaction.type === reactionType) {
              const hasReacted = reaction.users.includes(currentUserId);
              return {
                ...reaction,
                count: hasReacted ? reaction.count - 1 : reaction.count + 1,
                users: hasReacted
                  ? reaction.users.filter((id) => id !== currentUserId)
                  : [...reaction.users, currentUserId],
              };
            }
            return reaction;
          });

          return { ...feed, reactions: updatedReactions };
        }
        return feed;
      });

      return {
        feeds: updatedFeeds,
        filteredFeeds:
          state.selectedGroup === "all"
            ? updatedFeeds
            : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
      };
    });
  },
}));

export default useFeedStore;
