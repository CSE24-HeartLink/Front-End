import { create } from "zustand";
import { notificationApi } from "../api/notidicationApi";
import useAuthStore from "./authStore";

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  // 알림 목록 조회
  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const userId = useAuthStore.getState().getUserId();
      console.log("Fetching notifications for userId:", userId);

      if (!userId) {
        throw new Error("User not found");
      }

      const response = await notificationApi.getNotifications(userId);
      console.log("Notifications response:", response);

      if (response.success) {
        set({
          notifications: response.data,
          unreadCount: response.data.filter((n) => !n.isRead).length,
        });
      } else {
        set({ error: response.error });
      }
    } catch (error) {
      console.error("Fetch notifications error:", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // 알림 읽음 처리
  markAsRead: async (notificationId) => {
    try {
      const response = await notificationApi.markAsRead(notificationId);
      if (response.success) {
        set((state) => {
          const updatedNotifications = state.notifications.map((n) =>
            n._id === notificationId ? { ...n, isRead: true } : n
          );
          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter((n) => !n.isRead).length,
          };
        });
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  },

  // 모든 알림 읽음 처리
  markAllAsRead: async () => {
    try {
      const { user } = useAuthStore.getState();
      if (!user?._id) return;

      const response = await notificationApi.markAllAsRead(user._id);
      if (response.success) {
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            isRead: true,
          })),
          unreadCount: 0,
        }));
      }
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  },

  // 친구 요청 응답 처리
  handleFriendRequest: async (notificationId, accept, groupId = null) => {
    try {
      const response = accept
        ? await notificationApi.acceptFriendRequest(notificationId, groupId)
        : await notificationApi.rejectFriendRequest(notificationId);

      if (response.success) {
        set((state) => ({
          notifications: state.notifications.filter(
            (n) => n._id !== notificationId
          ),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to handle friend request:", error);
      return false;
    }
  },

  // 읽지 않은 알림 개수 갱신
  updateUnreadCount: async () => {
    try {
      const { user } = useAuthStore.getState();
      if (!user?._id) return;

      const response = await notificationApi.getUnreadCount(user._id);
      if (response.success) {
        set({ unreadCount: response.count });
      }
    } catch (error) {
      console.error("Failed to update unread count:", error);
    }
  },
}));

export default useNotificationStore;
