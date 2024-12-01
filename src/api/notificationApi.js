// api/notificationApi.js
import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig.extra.apiUrl.production

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

export const notificationApi = {
  // 알림 목록 조회
  getNotifications: async (userId) => {
    try {
      const url = `/api/sns/notify/${userId}`
      console.log('Fetching URL:', url)
      console.log('userId:', userId)

      const { data } = await api.get(url)
      console.log('API Response:', data)

      return data
    } catch (error) {
      console.error('Fetch error:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      }
    }
  },

  // 읽지 않은 알림 개수 조회
  getUnreadCount: async (userId) => {
    try {
      const { data } = await api.get(`/api/sns/notify/unread/${userId}`)
      return { success: true, count: data.count }
    } catch (error) {
      console.error('[NotificationApi] Get unread count error:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      }
    }
  },

  // 알림 읽음 처리
  markAsRead: async (notificationId) => {
    try {
      const { data } = await api.patch(`/api/sns/notify/read/${notificationId}`)
      return { success: true, data }
    } catch (error) {
      console.error('[NotificationApi] Mark as read error:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      }
    }
  },

  // 모든 알림 읽음 처리
  markAllAsRead: async (userId) => {
    try {
      await api.patch(`/api/sns/notify/read-all/${userId}`)
      return { success: true }
    } catch (error) {
      console.error('[NotificationApi] Mark all as read error:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      }
    }
  },

  // 친구 요청 수락
  acceptFriendRequest: async (notificationId, groupId) => {
    try {
      console.log('Accepting friend request:', {
        notificationId,
        groupId,
      })

      const { data } = await api.put(`/api/sns/friend/requests/${notificationId}/response`, {
        response: 'accepted',
        groupId,
      })

      // data 자체가 서버에서 success: true를 포함하고 있다면 data를 그대로 반환
      return data.success ? data : { success: true, data }
    } catch (error) {
      console.error('[NotificationApi] Accept friend request error:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      }
    }
  },

  // 친구 요청 거절
  rejectFriendRequest: async (notificationId) => {
    try {
      const { data } = await api.put(`/api/sns/friend/requests/${notificationId}/reject`)

      // 알림도 함께 삭제
      await api.delete(`/api/sns/notify/${notificationId}`)

      return { success: true, data }
    } catch (error) {
      console.error('[NotificationApi] Reject friend request error:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      }
    }
  },

  // 알림 삭제
  deleteNotification: async (notificationId) => {
    try {
      await api.delete(`/api/sns/notify/${notificationId}`)
      return { success: true }
    } catch (error) {
      console.error('[NotificationApi] Delete notification error:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      }
    }
  },
}
