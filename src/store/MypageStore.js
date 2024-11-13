import { create } from "zustand";

const useMyPageStore = create((set, get) => ({
  // User Profile State
  userProfile: {
    nickname: "다연이",
    profileImage: null, // 실제 이미지 경로로 설정 필요
    postCount: 0,
    cloiLevel: 3,
    streakDays: 10,
  },

  // Modal State
  isRenameModalVisible: false,

  // Actions
  setUserProfile: (profile) =>
    set({ userProfile: { ...get().userProfile, ...profile } }),

  updateNickname: (newName) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        nickname: newName,
      },
    })),

  incrementPostCount: () =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        postCount: state.userProfile.postCount + 1,
      },
    })),

  updateStreakDays: (days) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        streakDays: days,
      },
    })),

  // Modal Actions
  setRenameModalVisible: (visible) => set({ isRenameModalVisible: visible }),

  // Combined Actions
  handleRename: (newName) => {
    if (newName.trim()) {
      set((state) => ({
        userProfile: {
          ...state.userProfile,
          nickname: newName,
        },
        isRenameModalVisible: false,
      }));
    }
  },
}));

export default useMyPageStore;

// CLOiStore와 함께 사용할 때 참고사항:

// CLOi 레벨과 포스트 수는 두 store가 서로 동기화되어야 할 수 있습니다
// 사용자 이름 변경 시 CLOi의 이름도 함께 변경되어야 할 수 있습니다

// 이런 경우에는 다음과 같이 store들을 연동할 수 있습니다:
// javascriptCopy// MyPageStore에서
// handleRename: (newName) => {
//   const cloiStore = useCLOiStore.getState();
//   set((state) => ({
//     userProfile: {
//       ...state.userProfile,
//       nickname: newName
//     },
//     isRenameModalVisible: false
//   }));
//   cloiStore.setName(newName);
// }
