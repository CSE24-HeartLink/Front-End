import { create } from "zustand";
import { friendApi } from "../api/friendApi";
import useAuthStore from "./authStore";

const useFriendStore = create((set, get) => ({
  friends: [],
  loading: false,
  error: null,

  //친구추가
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

  // 친구 목록 조회 (전체 또는 특정 그룹)
  getFriends: async (groupId = "all") => {
    set({ loading: true, error: null });
    try {
      const userId = useAuthStore.getState().getUserId();
      if (!userId) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
      }

      const result = await friendApi.getFriends(userId, groupId);
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

  //친구삭제
  deleteFriend: async (friendId) => {
    set({ loading: true });
    try {
      const userId = useAuthStore.getState().getUserId();

      // 삭제할 친구 찾기
      const friendToDelete = get().friends.find((f) => f._id === friendId);
      if (!friendToDelete) {
        throw new Error("친구를 찾을 수 없습니다");
      }

      // 실제 User ID 추출
      const targetUserId = friendToDelete.friendId._id;

      console.log("삭제 시도:", {
        userId,
        friendRelationId: friendId,
        targetUserId,
      });

      const result = await friendApi.deleteFriend(userId, targetUserId);

      if (result.success) {
        set((state) => ({
          friends: state.friends.filter((f) => f._id !== friendId),
        }));
        return { success: true };
      }

      throw new Error(result.data?.error || "친구 삭제 실패");
    } catch (error) {
      console.error("친구 삭제 실패:", error);
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  //친구 그룹 수정
  updateFriendGroup: (friendId, groupId) => {
    set((state) => ({
      friends: state.friends.map((friend) =>
        friend.friendId._id === friendId
          ? { ...friend, group: groupId }
          : friend
      ),
    }));
  },

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
