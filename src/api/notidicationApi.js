import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl.development;

export const notificationApi = {
  // 알림 목록 조회
  getNotifications: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("[NotificationApi] Get notifications error:", error);
      return { success: false, error: error.message };
    }
  },

  // 읽지 않은 알림 개수 조회
  getUnreadCount: async (userId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/notifications/unread/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch unread count");
      }

      const data = await response.json();
      return { success: true, count: data.count };
    } catch (error) {
      console.error("[NotificationApi] Get unread count error:", error);
      return { success: false, error: error.message };
    }
  },

  // 알림 읽음 처리
  markAsRead: async (notificationId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/notifications/read/${notificationId}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("[NotificationApi] Mark as read error:", error);
      return { success: false, error: error.message };
    }
  },

  // 모든 알림 읽음 처리
  markAllAsRead: async (userId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/notifications/read-all/${userId}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark all notifications as read");
      }

      return { success: true };
    } catch (error) {
      console.error("[NotificationApi] Mark all as read error:", error);
      return { success: false, error: error.message };
    }
  },

  // 친구 요청 수락
  acceptFriendRequest: async (notificationId, groupId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/friend/requests/${notificationId}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ groupId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept friend request");
      }

      return { success: true };
    } catch (error) {
      console.error("[NotificationApi] Accept friend request error:", error);
      return { success: false, error: error.message };
    }
  },

  // 친구 요청 거절
  rejectFriendRequest: async (notificationId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/friend/requests/${notificationId}/reject`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reject friend request");
      }

      return { success: true };
    } catch (error) {
      console.error("[NotificationApi] Reject friend request error:", error);
      return { success: false, error: error.message };
    }
  },
};