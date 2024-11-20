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
    set({ loading: true });
    try {
      const userId = useAuthStore.getState().getUserId();
      if (!userId) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
      }
  
      // 삭제하려는 친구 ID 확인
      console.log("Attempting to delete friend with data:", {
        friendToDelete: friendId,
        currentFriends: get().friends.map(friend => ({
          id: friend._id,
          friendId: friend.friendId,
          status: friend.status
        }))
      });
  
      const result = await friendApi.deleteFriend(userId, friendId);
      
      if (result.success) {
        set((state) => ({
          friends: state.friends.filter(
            (friend) => friend.friendId._id !== friendId
          ),
        }));
        return { success: true };
      }
      
      throw new Error(result.error);
    } catch (error) {
      console.error("[FriendStore] Delete friend error:", error);
      return {
        success: false,
        error: error.message || "친구 삭제에 실패했습니다.",
      };
    } finally {
      set({ loading: false });
    }
  },

  // 중복된 updateFriendGroup 하나로 통합
  updateFriendGroup: (friendId, newGroup) =>
    set((state) => ({
      friends: state.friends.map((friend) =>
        friend.friendId._id === friendId
          ? { ...friend, group: newGroup }
          : friend
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