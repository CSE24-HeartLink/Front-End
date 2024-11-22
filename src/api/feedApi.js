import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl.development;

export const feedApi = {
  // 피드 생성
  createFeed: async (formData) => {
    try {
      console.log("Creating feed with formData:", formData);
      const response = await axios.post(`${API_URL}/api/feed`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server response for create feed:", response.data);
      return response.data;
    } catch (error) {
      console.error("[Debug] Create feed error:", error);
      throw error.response?.data || error.message;
    }
  },

  // 피드 수정
  updateFeed: async (feedId, updateData) => {
    try {
      console.log("[FeedApi] Updating feed:", feedId, updateData);

      const response = await axios.put(
        `${API_URL}/api/feed/${feedId}`,
        updateData
      );
      console.log("[FeedApi] Update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("[FeedApi] Update feed error:", error);
      throw error.response?.data || { error: "피드 수정에 실패했습니다." };
    }
  },

  // 피드 삭제
  deleteFeed: async (feedId) => {
    try {
      console.log("[FeedApi] Deleting feed:", feedId);

      await axios.delete(`${API_URL}/api/feed/${feedId}`);
      return { success: true };
    } catch (error) {
      console.error("[FeedApi] Delete feed error:", error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // 그룹별 피드 조회
  getGroupFeeds: async (groupId) => {
    try {
      console.log("Fetching feeds for group:", groupId);
      const url = `${API_URL}/api/feed/group/${groupId}`;
      console.log("API URL:", url);

      const response = await axios.get(url);
      console.log("Server response for group feeds:", response.data);
      return response.data;
    } catch (error) {
      console.error("[Debug] Get group feeds error:", error);
      throw error.response?.data || error.message;
    }
  },

  // 전체 피드 조회
  getAllFeeds: async () => {
    try {
      console.log("Fetching all feeds");
      const url = `${API_URL}/api/feed`;
      console.log("API URL:", url);

      const response = await axios.get(url);
      console.log("Server response for all feeds:", response.data);

      // 응답이 배열이 아닌 경우 처리
      if (!Array.isArray(response.data) && response.data.feeds) {
        return response.data.feeds;
      }
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("[Debug] Get all feeds error:", error);
      throw error.response?.data || error.message;
    }
  },

  // 사용자의 피드 조회
  getUserFeeds: async (userId) => {
    try {
      console.log("[FeedApi] Fetching user feeds for userId:", userId);
      const url = `${API_URL}/api/feed/user/${userId}`;
      console.log("[FeedApi] Request URL:", url);

      const response = await axios.get(url);
      console.log("[FeedApi] User feeds response:", response.data);
      console.log("[FeedApi] Feeds array:", response.data.feeds); // 데이터 구조 확인
      return response.data;
    } catch (error) {
      console.error("[FeedApi] Get user feeds error:", error);
      console.error("[FeedApi] Error response:", error.response?.data);
      throw error.response?.data || error.message;
    }
  },

  getComments: async (feedId) => {
    console.log("API 호출 - 댓글 목록 조회:", feedId);
    const response = await axios.get(`${API_URL}/api/feed/${feedId}/comments`);
    console.log("API 응답 - 댓글 목록:", response.data);
    return response.data;
  },

  addComment: async (feedId, commentData) => {
    console.log("API URL:", `${API_URL}/api/feed/${feedId}/comment`);
    console.log("전체 요청 정보:", {
      feedId,
      url: `${API_URL}/api/feed/${feedId}/comment`,
      data: commentData,
    });
    const response = await axios.post(
      `${API_URL}/api/feed/${feedId}/comment`,
      commentData // {userId, content} 형태
    );
    return response.data;
  },

  deleteComment: async (feedId, commentId) => {
    console.log("API 호출 - 댓글 삭제:", { feedId, commentId });
    const response = await axios.delete(
      `${API_URL}/api/feed/${feedId}/comment/${commentId}`
    );
    console.log("API 응답 - 댓글 삭제:", response.data);
    return response.data;
  },
};
