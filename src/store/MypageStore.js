import { create } from "zustand";

const useMyPageStore = create((set, get) => ({
  // 사용자 프로필 상태
  userProfile: {
    nickname: "다연이", // 사용자 닉네임
    profileImage: null, // 프로필 이미지 (추후 실제 이미지 경로로 설정 필요)
    postCount: 0, // 작성한 게시글 수
    cloiLevel: 3, // CLOi 캐릭터 레벨
    streakDays: 10, // 연속 접속일 수
  },

  // 모달 상태
  isRenameModalVisible: false, // 이름 변경 모달 표시 여부

  // 기본 액션들
  // 전체 프로필 정보 업데이트 액션
  setUserProfile: (profile) =>
    set({ userProfile: { ...get().userProfile, ...profile } }),

  // 닉네임 업데이트 액션
  updateNickname: (newName) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile, // 기존 프로필 정보 복사
        nickname: newName, // 닉네임만 새로운 값으로 변경
      },
    })),

  // 게시글 수 증가 액션
  incrementPostCount: () =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        postCount: state.userProfile.postCount + 1,
      },
    })),

  // 연속 접속일 수 업데이트 액션
  updateStreakDays: (days) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        streakDays: days,
      },
    })),

  // 모달 관련 액션
  // 이름 변경 모달 표시/숨김 설정
  setRenameModalVisible: (visible) => set({ isRenameModalVisible: visible }),

  // 복합 액션들
  // 이름 변경 처리 복합 액션
  // 새 이름이 공백이 아닐 경우에만 이름을 변경하고 모달을 닫음
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

// 다중 스토어 연동 관련 참고사항:
/*
  CLOiStore와 MyPageStore 간의 동기화가 필요한 경우:
  
  1. 데이터 동기화 필요 항목
     - CLOi 레벨과 포스트 수
     - 사용자 이름 (닉네임)

  2. 스토어 연동 예시 코드:
     // MyPageStore에서 CLOiStore의 상태도 함께 업데이트하는 방법
     handleRename: (newName) => {
       const cloiStore = useCLOiStore.getState();
       set((state) => ({
         userProfile: {
           ...state.userProfile,
           nickname: newName
         },
         isRenameModalVisible: false
       }));
       cloiStore.setName(newName);
     }

  3. 주의사항:
     - 두 스토어 간의 일관성 유지 필요
     - 상태 업데이트 순서 고려
     - 순환 참조 방지
*/
