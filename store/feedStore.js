import { create } from "zustand";

const useFeedStore = create((set) => ({
  feeds: [],
  selectedReactions: {}, // { feedId: reactionType }

  // 피드 관련 액션
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

  // 리액션 관련 액션
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

  // 초기 데이터 로드 (임시)
  loadInitialData: () => {
    const initialFeeds = [
      {
        id: "1",
        userId: "user1",
        nickname: "다연이",
        profileImage: require("../assets/images/Smile.png"),
        content: "엄마가 해준 김치찌개가 먹고싶은 가을의 어느 날입니다.",
        createdAt: new Date("2024-07-06T12:21:00"),
        reactions: [
          { type: "grinning", count: 1, users: ["user2"] },
          { type: "heart-eyes", count: 0, users: [] },
          { type: "crying", count: 0, users: [] },
          { type: "scream", count: 0, users: [] },
          { type: "party", count: 0, users: [] },
          { type: "angry", count: 0, users: [] },
        ],
        isMyPost: true,
      },
      {
        id: "2",
        userId: "user2",
        nickname: "정호우",
        profileImage: require("../assets/images/Cry.png"),
        content: "된장찌개가 머고시퍼요우.",
        createdAt: new Date("2024-05-25T14:41:00"),
        reactions: [
          { type: "grinning", count: 1, users: ["user2"] },
          { type: "heart-eyes", count: 0, users: [] },
          { type: "crying", count: 0, users: [] },
          { type: "scream", count: 0, users: [] },
          { type: "party", count: 0, users: [] },
          { type: "angry", count: 0, users: [] },
        ],
        isMyPost: false,
      },
      // 더 많은 초기 데이터...
    ];

    set({ feeds: initialFeeds });
  },
}));

export default useFeedStore;
