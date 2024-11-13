import { create } from "zustand";

const useCLOiStore = create((set, get) => ({
  // State
  name: "클로이",
  postCount: 125,
  showInfo: false,
  isRenameModalVisible: false,

  // Computed value
  level: () => Math.floor(get().postCount / 50) + 1,

  // Actions
  setName: (newName) => set({ name: newName }),
  setPostCount: (count) => set({ postCount: count }),
  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),
  setRenameModalVisible: (visible) => set({ isRenameModalVisible: visible }),

  // Combined actions
  handleRename: (newName) => {
    set({ name: newName, isRenameModalVisible: false });
  },

  incrementPostCount: () => {
    set((state) => ({ postCount: state.postCount + 1 }));
  },
}));

export default useCLOiStore;
