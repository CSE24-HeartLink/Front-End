import { create } from "zustand";
import { feedApi } from "../api/feedApi";
import useAuthStore from "./authStore";

const useFeedStore = create((set, get) => ({
  feeds: [],
  filteredFeeds: [],
  selectedGroup: "all",
  isLoading: false,
  error: null,
  selectedReactions: {}, // 초기화 추가
  comments: {}, // Organized by feedId

  addFeed: async (feedData) => {
    const userId = useAuthStore.getState().getUserId();
    if (!userId) throw new Error("인증 정보가 없습니다.");

    try {
      set({ isLoading: true, error: null });

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("content", feedData.content);
      formData.append("emotion", feedData.emotion || "happy");

      if (feedData.groupId && feedData.groupId !== "all") {
        formData.append("groupId", feedData.groupId);
      }

      if (feedData.image) {
        const imageFile = {
          uri: feedData.image,
          type: "image/jpeg",
          name: "photo.jpg",
        };
        formData.append("files", imageFile);
      }

      const response = await feedApi.createFeed(formData);
      const newFeed = response.feed;

      set((state) => ({
        feeds: [newFeed, ...state.feeds],
        filteredFeeds: [newFeed, ...state.filteredFeeds],
        isLoading: false,
        error: null,
      }));

      return newFeed;
    } catch (error) {
      set({ error: "피드 작성에 실패했습니다.", isLoading: false });
      throw error;
    }
  },
  updateFeed: async (feedId, updateData) => {
    try {
      set({ isLoading: true, error: null });

      const result = await feedApi.updateFeed(feedId, updateData);
      console.log("[FeedStore] Update API result:", result);

      if (result.feed) {
        // 성공적으로 수정된 경우 로컬 상태 업데이트
        set((state) => ({
          feeds: state.feeds.map((feed) =>
            feed.feedId === feedId ? result.feed : feed
          ),
          filteredFeeds: state.filteredFeeds.map((feed) =>
            feed.feedId === feedId ? result.feed : feed
          ),
          isLoading: false,
          error: null,
        }));
        return { success: true, feed: result.feed };
      } else {
        throw new Error("피드 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("[FeedStore] Update feed error:", error);
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  //피드 삭제
  deleteFeed: async (feedId) => {
    console.log("[FeedStore] Delete feed called with id:", feedId);
    try {
      set({ isLoading: true, error: null });

      // feedApi를 통한 삭제 요청
      const result = await feedApi.deleteFeed(feedId);
      console.log("[FeedStore] Delete API result:", result);

      if (result.success) {
        // 성공적으로 삭제된 경우 로컬 상태 업데이트
        console.log(
          "[FeedStore] Updating local state after successful deletion"
        );
        set((state) => ({
          feeds: state.feeds.filter((feed) => feed.feedId !== feedId),
          filteredFeeds: state.filteredFeeds.filter(
            (feed) => feed.feedId !== feedId
          ),
          error: null,
          isLoading: false,
        }));
        return { success: true };
      } else {
        throw new Error(result.error || "피드 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("[FeedStore] Delete feed error:", error);
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  setSelectedGroup: async (groupId, isAllFeeds = false) => {
    try {
      set({ isLoading: true, error: null });

      let feedsData;
      if (isAllFeeds || groupId === "all") {
        // 전체 피드 로딩
        const response = await feedApi.getAllFeeds();
        feedsData = Array.isArray(response) ? response : response.feeds || [];
      } else {
        // 특정 그룹 피드 로딩
        const response = await feedApi.getGroupFeeds(groupId);
        feedsData = response.feeds || [];
      }

      // 활성 상태인 피드만 필터링
      const activeFeeds = feedsData.filter((feed) => feed.status === "active");

      set({
        selectedGroup: groupId,
        feeds: activeFeeds,
        filteredFeeds: activeFeeds,
        isLoading: false,
      });
    } catch (error) {
      console.error("Feed loading error:", error);
      set({
        error: "피드 목록을 불러오는데 실패했습니다.",
        isLoading: false,
        feeds: [],
        filteredFeeds: [],
      });
    }
  },

  // Load comments for a feed
  loadComments: async (feedId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await feedApi.getComments(feedId);

      set((state) => ({
        comments: {
          ...state.comments,
          [feedId]: response.comments,
        },
        isLoading: false,
      }));

      return response.comments;
    } catch (error) {
      set({ error: "댓글을 불러오는데 실패했습니다.", isLoading: false });
      throw error;
    }
  },
  // Add a new comment
  addComment: async (feedId, content) => {
    const userId = useAuthStore.getState().getUserId();
    if (!userId) throw new Error("인증 정보가 없습니다.");

    try {
      const response = await feedApi.addComment(feedId, {
        userId,
        content, // 단순 text만 전달
      });

      set((state) => ({
        comments: {
          ...state.comments,
          [feedId]: [...(state.comments[feedId] || []), response.comment],
        },
      }));

      return response.comment;
    } catch (error) {
      throw error;
    }
  },

  // Delete a comment
  deleteComment: async (feedId, commentId) => {
    try {
      set({ isLoading: true, error: null });

      await feedApi.deleteComment(feedId, commentId);

      set((state) => ({
        comments: {
          ...state.comments,
          [feedId]: state.comments[feedId].filter(
            (comment) => comment._id !== commentId
          ),
        },
        isLoading: false,
      }));

      return true;
    } catch (error) {
      set({ error: "댓글 삭제에 실패했습니다.", isLoading: false });
      throw error;
    }
  },

  toggleReaction: (feedId, reactionType) => {
    set((state) => ({
      selectedReactions: {
        ...state.selectedReactions,
        [feedId]:
          state.selectedReactions[feedId] === reactionType
            ? null
            : reactionType,
      },
    }));
  },
}));

export default useFeedStore;
