import { create } from "zustand";

// CLOi의 상태를 관리하는 Zustand 스토어
const useCLOiStore = create((set, get) => ({
  // 기본 상태값들
  name: "클로이", // CLOi의 이름
  postCount: 125, // 사용자가 작성한 게시글 수
  showInfo: false, // 도움말 정보 표시 여부
  isRenameModalVisible: false, // 이름 변경 모달 표시 여부

  // 계산된 값 (Computed Value)
  // 게시글 50개당 1레벨씩 증가하는 레벨 계산 함수
  // 예: 0-49 게시글 = 1레벨, 50-99 게시글 = 2레벨, ...
  level: () => Math.floor(get().postCount / 50) + 1,

  // 상태 변경 액션들
  // CLOi 이름 변경 액션
  setName: (newName) => set({ name: newName }),

  // 게시글 수 직접 설정 액션
  setPostCount: (count) => set({ postCount: count }),

  // 도움말 정보 표시 토글 액션
  toggleInfo: () => set((state) => ({ showInfo: !state.showInfo })),

  // 이름 변경 모달 표시 상태 설정 액션
  setRenameModalVisible: (visible) => set({ isRenameModalVisible: visible }),

  // 복합 액션들 (여러 상태를 한번에 변경하는 액션들)
  // 이름 변경 처리 액션: 새 이름을 설정하고 모달을 닫음
  handleRename: (newName) => {
    set({ name: newName, isRenameModalVisible: false });
  },

  // 게시글 수 증가 액션: 현재 게시글 수에 1을 더함
  incrementPostCount: () => {
    set((state) => ({ postCount: state.postCount + 1 }));
  },
}));

export default useCLOiStore;
