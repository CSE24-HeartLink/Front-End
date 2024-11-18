import { create } from "zustand";

import { friendApi } from "../api/friendApi";
import useAuthStore from "./authStore";

const useFriendStore = create((set, get) => ({
  friends: [],
  loading: false,
  error: null,

  addFriend: async (nickname) => {
    set({ loading: true, error: null });
    try {
      const userId = useAuthStore.getState().getUserId();
      if (!userId) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
      }

      const result = await friendApi.sendFriendRequest(userId, nickname);
      if (result.success) {
        return { success: true };
      } else {
        set({ error: result.error });
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("[Debug] Add friend error:", error);
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  getFriends: async () => {
    set({ loading: true, error: null });
    try {
      const userId = useAuthStore.getState().getUserId();
      if (!userId) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
      }

      const result = await friendApi.getFriends(userId);
      //친구목록 응답 데이터 구조 확인
      console.log("Friends API response:", result);
      if (result.success) {
        set({ friends: result.data?.friends || [] });
        return { success: true };
      } else {
        set({ error: result.error });
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("[Debug] Get friends error:", error);
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  deleteFriend: async (friendId) => {
    try {
      const userId = useAuthStore.getState().user?._id;
      if (!userId) {
        throw new Error("사용자 정보를 찾을 수 없습니다.");
      }

      const result = await friendApi.deleteFriend(userId, friendId);
      if (result.success) {
        set((state) => ({
          friends: state.friends.filter((friend) => friend.id !== friendId),
        }));
      }
      return result;
    } catch (error) {
      console.error("[Debug] Delete friend error:", error);
      set({ error: error.message });
      return { success: false, error: error.message };
    }
  },

  // 기존 로컬 기능들은 그대로 유지
  updateFriendGroup: (friendId, newGroup) =>
    set((state) => ({
      friends: state.friends.map((friend) =>
        friend.id === friendId ? { ...friend, group: newGroup } : friend
      ),
    })),

  getFriendsByGroup: (group) => {
    const state = get();
    return state.friends.filter((friend) => friend.group === group);
  },

  getFriendsCount: () => {
    const state = get();
    return state.friends.length;
  },

  clearError: () => set({ error: null }),
}));

export default useFriendStore;
