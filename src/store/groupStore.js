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
}));

export default useGroupStore;
