export const DUMMY_FEEDS = [
  {
    id: "1",
    userId: "user1",
    nickname: "다연이",
    profileImage: require("../assets/images/profile.jpg"),
    content: "엄마가 해준 김치찌개가 먹고싶은 가을의 어느 날입니다.",
    createdAt: new Date("2024-03-19T12:41:00"),
    reactions: [
      { type: "grinning", count: 1, users: ["user2"] },
      { type: "heart-eyes", count: 0, users: [] },
      { type: "crying", count: 0, users: [] },
      { type: "scream", count: 0, users: [] },
      { type: "party", count: 0, users: [] },
      { type: "angry", count: 0, users: [] },
    ],
    isMyPost: true,
    image: require("../assets/images/feed-image.jpg"), // 선택적
  },
  {
    id: "2",
    userId: "user2",
    nickname: "정호우",
    profileImage: require("../assets/images/profile.jpg"),
    content: "오늘 하루도 행복하게!",
    createdAt: new Date("2024-03-20T19:41:00"),
    reactions: [
      { type: "grinning", count: 0, users: [] },
      { type: "heart-eyes", count: 2, users: ["user1", "user3"] },
      { type: "crying", count: 0, users: [] },
      { type: "scream", count: 0, users: [] },
      { type: "party", count: 0, users: [] },
      { type: "angry", count: 0, users: [] },
    ],
    isMyPost: true,
  },
];