import axios from "axios";
import Constants from "expo-constants";
import useAuthStore from "../store/authStore";

const API_URL = Constants.expoConfig.extra.apiUrl.development;

export const cloiApi = {
  // 클로이 정보 조회
  getCloiInfo: async (userId) => {
    try {
      console.log("[CLOiApi] Fetching CLOi info for userId:", userId);
      const token = useAuthStore.getState().userToken; // 토큰 가져오기

      const response = await axios.get(`${API_URL}/api/sns/cloi/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더 추가
        },
      });
      console.log("[CLOiApi] CLOi info response:", response.data);

      return {
        ...response.data,
        appearance:
          response.data.appearance || CLOI_APPEARANCES[response.data.level],
      };
    } catch (error) {
      console.error("[CLOiApi] Get CLOi info error:", error);
      throw error.response?.data?.message || error.message;
    }
  },
  // 클로이와 대화
  chatWithCloi: async (userId, message) => {
    try {
      console.log("[CLOiApi] Sending chat message:", { userId, message });
      const token = useAuthStore.getState().userToken; // 토큰 가져오기

      const response = await axios.post(
        `${API_URL}/api/sns/cloi/${userId}/chat`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더 추가
          },
        }
      );
      console.log("[CLOiApi] Chat response:", response.data);

      return {
        message: response.data.message,
        appearance: response.data.appearance,
      };
    } catch (error) {
      console.error("[CLOiApi] Chat error:", error);
      throw error.response?.data?.message || error.message;
    }
  },

  // 클로이 성장 상태 체크
  checkGrowth: async (userId) => {
    try {
      console.log("[CLOiApi] Checking growth for userId:", userId);
      const token = useAuthStore.getState().userToken; // 토큰 가져오기

      const response = await axios.post(
        `${API_URL}/api/sns/cloi/${userId}/growth/check`,
        {}, // 빈 객체를 body로 전송
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더 추가
          },
        }
      );
      console.log("[CLOiApi] Growth check response:", response.data);

      return response.data;
    } catch (error) {
      console.error("[CLOiApi] Growth check error:", error);
      throw error.response?.data?.message || error.message;
    }
  },

  // 클로이 이름 변경
  updateCloiName: async (userId, newName) => {
    try {
      const token = useAuthStore.getState().userToken; // 토큰 가져오기

      if (!newName || newName.trim().length === 0) {
        throw new Error("클로이 이름을 입력해주세요.");
      }
      if (newName.length > 10) {
        throw new Error("클로이 이름은 10자 이하로 입력해주세요.");
      }

      console.log("[CLOiApi] Updating CLOi name:", { userId, newName });
      const response = await axios.put(
        `${API_URL}/api/sns/cloi/${userId}/name`,
        { name: newName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더 추가
          },
        }
      );
      console.log("[CLOiApi] Name update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("[CLOiApi] Name update error:", error);
      throw error.response?.data?.message || error.message;
    }
  },
};

// 백엔드의 CLOI_APPEARANCES와 동일한 상수 추가
const CLOI_APPEARANCES = {
  1: {
    image: "/images/cloi/level1.png",
    expression: "sleepy",
  },
  2: {
    image: "/images/cloi/level2.png",
    expression: "happy",
  },
  3: {
    image: "/images/cloi/level3.png",
    expression: "curious",
  },
  4: {
    image: "/images/cloi/level4.png",
    expression: "proud",
  },
  5: {
    image: "/images/cloi/level5.png",
    expression: "loving",
  },
};

export default cloiApi;
