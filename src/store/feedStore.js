import { create } from "zustand";
import { initialFeeds } from "../constants/dummydata";

const useFeedStore = create((set, get) => ({
  feeds: [],
  filteredFeeds: [],
  selectedGroup: "all",
  selectedReactions: {},
  comments: {}, // feedId를 key로 하는 댓글 객체 추가
  isLoading: false, // 로딩 상태 추가

  loadInitialData: () => {
    set({ isLoading: true });
    set({
      feeds: initialFeeds,
      filteredFeeds: initialFeeds,
      isLoading: false,
      comments: {}, // 댓글 초기화
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
      const feedWithDefaults = {
        ...newFeed,
        id: Date.now().toString(),
        createdAt: new Date(),
        reactions: [
          { type: "like", count: 0, users: [] },
          { type: "heart", count: 0, users: [] },
          { type: "smile", count: 0, users: [] },
        ],
        userId: "user1",
        nickname: "다연이",
      };

      const updatedFeeds = [feedWithDefaults, ...state.feeds];
      return {
        feeds: updatedFeeds,
        filteredFeeds:
          state.selectedGroup === "all"
            ? updatedFeeds
            : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
      };
    });
  },

  updateFeed: (feedId, updatedContent) => {
    set((state) => {
      const updatedFeeds = state.feeds.map((feed) =>
        feed.id === feedId
          ? { ...feed, ...updatedContent, updatedAt: new Date() }
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

  deleteFeed: (feedId) => {
    set((state) => {
      const updatedFeeds = state.feeds.filter((feed) => feed.id !== feedId);
      const { [feedId]: deletedComments, ...remainingComments } =
        state.comments;

      return {
        feeds: updatedFeeds,
        filteredFeeds:
          state.selectedGroup === "all"
            ? updatedFeeds
            : updatedFeeds.filter((feed) => feed.group === state.selectedGroup),
        comments: remainingComments, // 피드 삭제시 해당 댓글도 함께 삭제
      };
    });
  },

  toggleReaction: (feedId, reactionType) => {
    set((state) => {
      const currentUserId = "user1";
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

  // 댓글 관련 기능 추가
  addComment: (feedId, text) => {
    set((state) => ({
      comments: {
        ...state.comments,
        [feedId]: [
          ...(state.comments[feedId] || []),
          {
            id: Date.now().toString(),
            text,
            author: "다연이",
            userId: "user1",
            createdAt: new Date(),
          },
        ],
      },
    }));
  },

  deleteComment: (feedId, commentId) => {
    set((state) => ({
      comments: {
        ...state.comments,
        [feedId]: (state.comments[feedId] || []).filter(
          (comment) => comment.id !== commentId
        ),
      },
    }));
  },

  // // 검색 기능 추가
  // searchFeeds: (searchTerm) => {
  //   set((state) => {
  //     if (!searchTerm.trim()) {
  //       return {
  //         filteredFeeds: state.selectedGroup === "all"
  //           ? state.feeds
  //           : state.feeds.filter((feed) => feed.group === state.selectedGroup),
  //       };
  //     }

  //     const searchLower = searchTerm.toLowerCase();
  //     const filtered = state.feeds.filter((feed) => {
  //       const contentMatch = feed.content.toLowerCase().includes(searchLower);
  //       const nicknameMatch = feed.nickname.toLowerCase().includes(searchLower);
  //       return contentMatch || nicknameMatch;
  //     });

  //     return { filteredFeeds: filtered };
  //   });
  // },

  // // 좋아요, 댓글 수 등의 통계 가져오기
  // getFeedStats: (feedId) => {
  //   const state = get();
  //   const feed = state.feeds.find(f => f.id === feedId);
  //   if (!feed) return null;

  //   return {
  //     commentCount: (state.comments[feedId] || []).length,
  //     reactionCounts: feed.reactions.reduce((acc, reaction) => {
  //       acc[reaction.type] = reaction.count;
  //       return acc;
  //     }, {}),
  //   };
  // },
}));

export default useFeedStore;
