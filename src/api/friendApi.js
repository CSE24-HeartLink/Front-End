import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl.development;

export const friendApi = {
  // 친구 요청 보내기
  sendFriendRequest: async (fromId, nickname) => {
    try {
      const url = `${API_URL}/api/friend/requests`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromId, nickname }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // 받은 친구 요청 목록 조회
  getReceivedRequests: async (userId) => {
    try {
      const url = `${API_URL}/api/friend/requests/received?userId=${userId}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "친구 요청 목록 조회에 실패했습니다.");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("[Debug] Get received requests error:", error);
      return { success: false, error: error.message };
    }
  },

  // 친구 목록 조회
  getFriends: async (userId) => {
    try {
      const url = `${API_URL}/api/friend?userId=${userId}`;
      console.log("[Debug] Getting friends from URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "친구 목록 조회에 실패했습니다.");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("[Debug] Get friends error:", error);
      return { success: false, error: error.message };
    }
  },

  // 친구 삭제
  deleteFriend: async (userId, friendId) => {
    try {
      const url = `${API_URL}/api/friend/${friendId}`;
      console.log("[Debug] Deleting friend. URL:", url, "UserId:", userId);

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      console.log("[Debug] Delete response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[Debug] Delete error response:", errorText);
        throw new Error(errorText || "친구 삭제에 실패했습니다.");
      }

      return { success: true };
    } catch (error) {
      console.error("[Debug] Delete friend error:", error);
      return { success: false, error: error.message };
    }
  },
};
