import client from "./client";
import { ENDPOINTS } from "./endpoints";

export const feedApi = {
  // 전체 피드 조회
  getAllFeeds: async () => {
    try {
      const response = await client.get(ENDPOINTS.FEEDS.GET_ALL);
      return response;
    } catch (error) {
      console.error("전체 피드 조회 실패:", error);
      throw error;
    }
  },

  // 그룹별 피드 조회
  getGroupFeeds: async (groupId) => {
    try {
      const response = await client.get(ENDPOINTS.FEEDS.GET_GROUP(groupId));
      return response;
    } catch (error) {
      console.error("그룹 피드 조회 실패:", error);
      throw error;
    }
  },

  // 단일 피드 조회
  getFeed: async (feedId) => {
    try {
      const response = await client.get(ENDPOINTS.FEEDS.GET_ONE(feedId));
      return response;
    } catch (error) {
      console.error("피드 조회 실패:", error);
      throw error;
    }
  },

  // 피드 생성
  createFeed: async (feedData) => {
    try {
      const formData = new FormData();
      if (feedData.files) {
        feedData.files.forEach((file) => {
          formData.append("files", file);
        });
      }
      formData.append("content", feedData.content);
      formData.append("userId", feedData.userId);
      formData.append("groupId", feedData.groupId);
      if (feedData.emotion) {
        formData.append("emotion", feedData.emotion);
      }

      const response = await client.post(ENDPOINTS.FEEDS.CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("피드 생성 실패:", error);
      throw error;
    }
  },

  // 피드 수정
  updateFeed: async (feedId, updateData) => {
    try {
      const response = await client.put(
        ENDPOINTS.FEEDS.UPDATE(feedId),
        updateData
      );
      return response;
    } catch (error) {
      console.error("피드 수정 실패:", error);
      throw error;
    }
  },

  // 피드 삭제
  deleteFeed: async (feedId) => {
    try {
      const response = await client.delete(ENDPOINTS.FEEDS.DELETE(feedId));
      return response;
    } catch (error) {
      console.error("피드 삭제 실패:", error);
      throw error;
    }
  },
};
