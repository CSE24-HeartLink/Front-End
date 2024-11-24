import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl.development;

export const groupApi = {
  // 사용자의 그룹 목록 조회
  fetchGroups: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/sns/group`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // 그룹 추가
  createGroup: async (name, userId) => {
    try {
      const response = await axios.post(`${API_URL}/api/sns/group`, {
        name,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // 그룹 수정
  updateGroup: async (groupId, newName) => {
    try {
      const response = await axios.put(`${API_URL}/api/sns/group/${groupId}`, {
        name: newName,
      });
      return response.data;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  },

  // 그룹 삭제
  deleteGroup: async (groupId) => {
    try {
      await axios.delete(`${API_URL}/api/sns/group/${groupId}`);
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  },

  // 그룹에 멤버 추가
  addGroupMember: async (groupId, friendId, requesterId) => {
    try {
      console.log("Sending request:", { groupId, friendId, requesterId });
      const response = await axios.post(
        `${API_URL}/api/sns/group/${groupId}/members`,
        {
          friendId,
          requesterId,
        }
      );

      return {
        success: true,
        data: response.data.group,
      };
    } catch (error) {
      console.error("API Error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
};
