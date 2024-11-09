export const initialFeeds = [
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

export const DUMMY_FRIENDS = [
  {
    id: "1",
    nickname: "다연이",
    group: "friends", // "동기들"에 해당하는 id
    profileImage: require("../assets/icon.png"),
  },
  {
    id: "2",
    nickname: "구준표",
    group: "f4",
    profileImage: require("../assets/icon.png"),
  },
  {
    id: "3",
    nickname: "정연경",
    group: "friends",
    profileImage: require("../assets/icon.png"),
  },
  {
    id: "4",
    nickname: "김차누",
    group: "family",
    profileImage: require("../assets/icon.png"),
  },
  {
    id: "5",
    nickname: "지혜",
    group: "friends",
    profileImage: require("../assets/icon.png"),
  },
  {
    id: "6",
    nickname: "정호",
    group: "friends",
    profileImage: require("../assets/icon.png"),
  },
];

export const GROUPS = [
  { id: "all", name: "전체" },
  { id: "family", name: "가족" },
  { id: "f4", name: "F4" },
  { id: "friends", name: "동기들" },
];
