import { create } from "zustand";

import { DUMMY_FRIENDS } from "../constants/dummydata";

const useFriendStore = create((set, get) => ({
  friends: DUMMY_FRIENDS,

  // 친구 추가
  addFriend: (friend) =>
    set((state) => ({
      friends: [...state.friends, friend],
    })),

  // 친구 삭제
  deleteFriend: (friendId) =>
    set((state) => ({
      friends: state.friends.filter((friend) => friend.id !== friendId),
    })),

  // 친구 그룹 변경
  updateFriendGroup: (friendId, newGroup) =>
    set((state) => ({
      friends: state.friends.map((friend) =>
        friend.id === friendId ? { ...friend, group: newGroup } : friend
      ),
    })),

  // 특정 그룹의 친구들 가져오기
  getFriendsByGroup: (group) => {
    const state = get();
    return state.friends.filter((friend) => friend.group === group);
  },

  // 전체 친구 수 가져오기
  getFriendsCount: () => {
    const state = get();
    return state.friends.length;
  },
}));

export default useFriendStore;
