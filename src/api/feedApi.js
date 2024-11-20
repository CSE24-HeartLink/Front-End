import Constants from "expo-constants";
import useAuthStore from "../store/authStore";

const API_URL = Constants.expoConfig.extra.apiUrl.development;

export const feedApi = {
  //피드 생성
  createFeed: async (formData) => {
    try {
      console.log("Creating feed with formData:", formData);
      const response = await fetch(`${API_URL}/api/feed`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log("Server response for create feed:", data);
      return data;
    } catch (error) {
      console.error("[Debug] Create feed error:", error);
      throw error;
    }
  },

  // 피드 수정
  updateFeed: async (feedId, updateData) => {
    try {
      console.log("[FeedApi] Updating feed:", feedId, updateData);

      const response = await fetch(`${API_URL}/api/feed/${feedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      console.log("[FeedApi] Update response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "피드 수정에 실패했습니다.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("[FeedApi] Update feed error:", error);
      throw error;
    }
  },

  //피드 삭제
  deleteFeed: async (feedId) => {
    try {
      console.log("[FeedApi] Deleting feed:", feedId);

      const response = await fetch(`${API_URL}/api/feed/${feedId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("[FeedApi] Delete response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "피드 삭제에 실패했습니다.");
      }

      return { success: true };
    } catch (error) {
      console.error("[FeedApi] Delete feed error:", error);
      return { success: false, error: error.message };
    }
  },

  getGroupFeeds: async (groupId) => {
    try {
      console.log("Fetching feeds for group:", groupId);
      const url = `${API_URL}/api/feed/group/${groupId}`;
      console.log("API URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log("Server response for group feeds:", data);
      return data;
    } catch (error) {
      console.error("[Debug] Get group feeds error:", error);
      throw error;
    }
  },

  getAllFeeds: async () => {
    try {
      console.log("Fetching all feeds");
      const url = `${API_URL}/api/feed`;
      console.log("API URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log("Server response for all feeds:", data);

      // 응답이 배열이 아닌 경우 처리
      if (!Array.isArray(data) && data.feeds) {
        return data.feeds;
      }
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("[Debug] Get all feeds error:", error);
      throw error;
    }
  },
};
