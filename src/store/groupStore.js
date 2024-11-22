import { create } from "zustand";
import { groupApi } from "../api/groupApi";
import useAuthStore from "./authStore";

const useGroupStore = create((set, get) => ({
  groups: [],
  currentGroupId: "all",
  setCurrentGroupId: (id) => set({ currentGroupId: id }),
  isLoading: false,
  error: null,

  // 그룹 목록 조회
  fetchGroups: async () => {
    try {
      const userId = useAuthStore.getState().getUserId();
      if (!userId) {
        throw new Error("사용자 인증이 필요합니다.");
      }

      set({ isLoading: true, error: null });
      const response = await groupApi.fetchGroups(userId);
      set({ groups: response.groups, isLoading: false });
    } catch (error) {
      set({
        error: "그룹 목록을 불러오는데 실패했습니다.",
        isLoading: false,
      });
    }
  },

  // 그룹 추가
  addGroup: async (name) => {
    try {
      const userId = useAuthStore.getState().getUserId();
      if (!userId) {
        throw new Error("사용자 인증이 필요합니다.");
      }

      set({ isLoading: true, error: null });
      const newGroup = await groupApi.createGroup(name, userId);

      set((state) => ({
        groups: [...state.groups, newGroup],
        isLoading: false,
      }));

      return newGroup;
    } catch (error) {
      set({
        error: "그룹 추가에 실패했습니다.",
        isLoading: false,
      });
      throw error;
    }
  },

  // 그룹명 수정
  editGroupName: async (groupId, newName) => {
    try {
      set({ isLoading: true, error: null });
      const updatedGroup = await groupApi.updateGroup(groupId, newName);

      set((state) => ({
        groups: state.groups.map((group) =>
          group.id === groupId ? updatedGroup : group
        ),
        isLoading: false,
      }));

      return updatedGroup;
    } catch (error) {
      set({
        error: "그룹명 수정에 실패했습니다.",
        isLoading: false,
      });
      throw error;
    }
  },

  // 그룹 삭제
  deleteGroup: async (groupId) => {
    try {
      set({ isLoading: true, error: null });
      await groupApi.deleteGroup(groupId);
      set((state) => ({
        groups: state.groups.filter((group) => group.id !== groupId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: "그룹 삭제에 실패했습니다.",
        isLoading: false,
      });
      throw error;
    }
  },

  // 그룹에 멤버 추가
  addGroupMember: async (groupId, friendId) => {
    try {
      const userId = useAuthStore.getState().getUserId();
      if (!userId) {
        throw new Error("사용자 인증이 필요합니다.");
      }

      set({ isLoading: true, error: null });

      const result = await groupApi.addGroupMember(groupId, friendId, userId);

      // 성공하면 groups 상태 업데이트
      if (result.success) {
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? { ...group, ...result.data.group } // 서버에서 반환한 업데이트된 그룹 정보로 교체
              : group
          ),
          isLoading: false,
        }));
      }

      return result;
    } catch (error) {
      set({
        error: error.message || "멤버 추가에 실패했습니다.",
        isLoading: false,
      });
      throw error;
    }
  },

  moveToGroup: async (friendId, newGroupId) => {
    set({ loading: true });
    try {
      // API 호출
      const result = await friendApi.moveToGroup(friendId, newGroupId);

      if (result.success) {
        // 친구 목록에서 해당 친구의 그룹 정보 업데이트
        set((state) => ({
          friends: state.friends.map((friend) =>
            friend.friendId._id === friendId
              ? { ...friend, group: newGroupId }
              : friend
          ),
        }));
      }
      return result;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // 특정 그룹의 멤버 목록 조회 (필요한 경우)
  getGroupMembers: (groupId) => {
    const state = get();
    const group = state.groups.find((g) => g.id === groupId);
    return group?.members || [];
  },
}));

export default useGroupStore;
