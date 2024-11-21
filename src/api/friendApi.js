import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl.development;

export const friendApi = {
  // 친구 요청 보내기
  sendFriendRequest: async (fromId, nickname) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/friend/requests`, {
        fromId,
        nickname,
      });
      return { success: true, data };
    } catch (error) {
      console.error("친구 요청 전송 실패:", error);
      return {
        success: false,
        error: error.response?.data?.error || "친구 요청 전송에 실패했습니다.",
      };
    }
  },

  // 받은 친구 요청 목록 조회
  getReceivedRequests: async (userId) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/friend/requests/received`,
        {
          params: { userId },
        }
      );
      return { success: true, data };
    } catch (error) {
      console.error("받은 친구 요청 조회 실패:", error);
      return {
        success: false,
        error:
          error.response?.data?.error ||
          "친구 요청 목록을 불러오는데 실패했습니다.",
      };
    }
  },

  // 친구 목록 조회
  getFriends: async (userId) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/friend`, {
        params: { userId },
      });
      return { success: true, data };
    } catch (error) {
      console.error("친구 목록 조회 실패:", error);
      return {
        success: false,
        error:
          error.response?.data?.error || "친구 목록을 불러오는데 실패했습니다.",
      };
    }
  },

  // 친구 삭제
  deleteFriend: async (userId, friendId) => {
    try {
      const { data } = await axios.delete(`${API_URL}/api/friend/${friendId}`, {
        data: { userId },
      });
      console.log("삭제 응답:", data);
      return { success: true, data };
    } catch (error) {
      console.error("삭제 실패:", error.response?.data);
      return {
        success: false,
        error: error.response?.data?.error || "친구 삭제 실패",
      };
    }
  },
};
