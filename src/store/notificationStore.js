// store/notificationStore.js
import { create } from 'zustand'
import { notificationApi } from '../api/notificationApi'

import useFriendStore from './friendStore'
import useAuthStore from './authStore'
import * as Notifications from 'expo-notifications'

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  expoPushToken: null,

  // 푸시 토큰 설정
  setExpoPushToken: (token) => {
    set({ expoPushToken: token })
  },

  // 알림 설정 초기화
  initializeNotifications: async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync()
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync()
        if (newStatus !== 'granted') {
          throw new Error('Notification permission denied')
        }
      }
    } catch (error) {
      console.error('알림 설정 초기화 실패:', error)
    }
  },

  // 알림 목록 조회
  fetchNotifications: async () => {
    set({ loading: true, error: null })
    try {
      const userId = useAuthStore.getState().getUserId()
      if (!userId) {
        throw new Error('User not found')
      }

      const response = await notificationApi.getNotifications(userId)
      if (response.success && response.data) {
        // data 확인 추가
        set({
          notifications: response.data,
          unreadCount: response.data.filter((n) => !n.isRead).length, // 여기서 실제 개수 계산
        })
        console.log('Unread count:', response.data.filter((n) => !n.isRead).length) // 로그 추가
      } else {
        set({ error: response.error })
      }
    } catch (error) {
      console.error('Fetch notifications error:', error)
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },

  // 알림 읽음 처리
  markAsRead: async (notificationId) => {
    try {
      const response = await notificationApi.markAsRead(notificationId)
      if (response.success) {
        set((state) => {
          const updatedNotifications = state.notifications.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter((n) => !n.isRead).length,
          }
        })
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  },

  // 모든 알림 읽음 처리
  markAllAsRead: async () => {
    try {
      const userId = useAuthStore.getState().getUserId()
      if (!userId) return

      const response = await notificationApi.markAllAsRead(userId)
      if (response.success) {
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            isRead: true,
          })),
          unreadCount: 0,
        }))
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
    }
  },

  // 읽지 않은 알림 개수 갱신
  updateUnreadCount: async () => {
    try {
      const userId = useAuthStore.getState().getUserId()
      if (!userId) return

      const response = await notificationApi.getUnreadCount(userId)
      console.log('API response:', response) // 응답 확인
      if (response.success) {
        set({ unreadCount: response.count })
        return response.count // count 반환 추가
      }
    } catch (error) {
      console.error('Failed to update unread count:', error)
    }
  },

  // 친구 요청 처리
  handleFriendRequest: async (notificationId, accept, groupId = null) => {
    try {
      const response = accept
        ? await notificationApi.acceptFriendRequest(notificationId, groupId)
        : await notificationApi.rejectFriendRequest(notificationId)

      if (response.success) {
        // 알림 목록에서 제거
        set((state) => ({
          notifications: state.notifications.filter((n) => n._id !== notificationId),
        }))

        if (accept && response.data) {
          const friendStore = useFriendStore.getState()

          // 수락한 사람의 친구 목록 새로고침
          await friendStore.getFriends()

          // 요청한 사람의 친구 목록에도 즉시 추가
          if (response.data.requester && response.data.relationId) {
            friendStore.updateFriendsList({
              _id: response.data.relationId,
              friendId: {
                _id: useAuthStore.getState().getUserId(),
                nickname: useAuthStore.getState().user.nickname,
                profileImage: useAuthStore.getState().user.profileImage,
              },
              group: groupId || null,
            })
          }
        }
        return true
      }
      return false
    } catch (error) {
      console.error('친구 요청 처리 실패:', error)
      return false
    }
  },
}))

export default useNotificationStore
