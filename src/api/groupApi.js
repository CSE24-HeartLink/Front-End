import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl.development;

export const groupApi = {
  // 그룹 목록 조회
  fetchGroups: async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${API_URL}/api/group`, options);
      return response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // 그룹 추가
  createGroup: async (name) => {
    try {
      const response = await fetch(`${API_URL}/api/group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // 그룹 수정
  updateGroup: async (groupId, newName) => {
    try {
      const response = await fetch(`${API_URL}/api/group/${groupId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  },

  // 그룹 삭제
  deleteGroup: async (groupId) => {
    try {
      const response = await fetch(`${API_URL}/api/group/${groupId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  },
};
