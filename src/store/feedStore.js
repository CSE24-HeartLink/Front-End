import { create } from "zustand";
// import { initialFeeds } from "../constants/dummydata";
import { feedApi } from "../api/feedApi";

const useFeedStore = create((set) => ({
  feeds: [],
  filteredFeeds: [],
  selectedGroup: "all",
  selectedReactions: {},
  isLoading: false,
  error: null,

  // 초기 데이터 로드
  loadInitialData: async () => {
    set({ isLoading: true });
    try {
      const feeds = await feedApi.getAllFeeds();
      set({
        feeds,
        filteredFeeds: feeds,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 그룹 선택
  setSelectedGroup: async (groupId) => {
    set({ isLoading: true });
    try {
      const feeds =
        groupId === "all"
          ? await feedApi.getAllFeeds()
          : await feedApi.getGroupFeeds(groupId);

      set({
        selectedGroup: groupId,
        feeds: feeds,
        filteredFeeds: feeds,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 피드 추가
  addFeed: async (newFeedData) => {
    set({ isLoading: true });
    try {
      const newFeed = await feedApi.createFeed(newFeedData);
      set((state) => ({
        feeds: [newFeed, ...state.feeds],
        filteredFeeds:
          state.selectedGroup === "all" ||
          state.selectedGroup === newFeed.groupId
            ? [newFeed, ...state.filteredFeeds]
            : state.filteredFeeds,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 피드 수정
  updateFeed: async (feedId, updateData) => {
    set({ isLoading: true });
    try {
      const updatedFeed = await feedApi.updateFeed(feedId, updateData);
      set((state) => ({
        feeds: state.feeds.map((feed) =>
          feed.id === feedId ? updatedFeed : feed
        ),
        filteredFeeds: state.filteredFeeds.map((feed) =>
          feed.id === feedId ? updatedFeed : feed
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 피드 삭제
  deleteFeed: async (feedId) => {
    set({ isLoading: true });
    try {
      await feedApi.deleteFeed(feedId);
      set((state) => ({
        feeds: state.feeds.filter((feed) => feed.id !== feedId),
        filteredFeeds: state.filteredFeeds.filter((feed) => feed.id !== feedId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 리액션 토글 (이 부분은 백엔드 API가 구현되어 있지 않아 로컬에서만 처리)
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
