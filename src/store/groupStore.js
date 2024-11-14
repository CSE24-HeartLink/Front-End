import { create } from "zustand";

import { GROUPS } from "../constants/dummydata";

const useGroupStore = create((set) => ({
  groups: GROUPS,

  addGroup: (groupName) =>
    set((state) => ({
      groups: [
        ...state.groups,
        {
          id: Math.random().toString(36).substr(2, 9), // 간단한 유니크 ID 생성
          name: groupName,
        },
      ],
    })),

  editGroupName: (groupId, newName) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId ? { ...group, name: newName } : group
      ),
    })),

  deleteGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.filter((group) => group.id !== groupId),
    })),
}));

export default useGroupStore;