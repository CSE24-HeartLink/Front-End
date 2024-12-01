import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig.extra.apiUrl.production

export const feedApi = {
  // 피드 생성
  createFeed: async (formData) => {
    try {
      console.log('Creating feed with formData:', formData)
      const response = await axios.post(`${API_URL}/api/sns/feed`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Server response for create feed:', response.data)
      return response.data
    } catch (error) {
      console.error('[Debug] Create feed error:', error)
      throw error.response?.data || error.message
    }
  },

  // 피드 수정
  updateFeed: async (feedId, updateData) => {
    try {
      console.log('[FeedApi] Updating feed:', feedId, updateData)

      const response = await axios.put(`${API_URL}/api/sns/feed/${feedId}`, updateData)
      console.log('[FeedApi] Update response:', response.data)
      return response.data
    } catch (error) {
      console.error('[FeedApi] Update feed error:', error)
      throw error.response?.data || { error: '피드 수정에 실패했습니다.' }
    }
  },

  // 피드 삭제
  deleteFeed: async (feedId) => {
    try {
      console.log('[FeedApi] Deleting feed:', feedId)

      await axios.delete(`${API_URL}/api/sns/feed/${feedId}`)
      return { success: true }
    } catch (error) {
      console.error('[FeedApi] Delete feed error:', error)
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      }
    }
  },

  //전체 피드 앨범 조회
  getAllFeeds: async (currentUserId, type = 'feed') => {
    try {
      console.log('Fetching all feeds of type:', type)
      const url = `${API_URL}/api/sns/feed`
      console.log('API URL:', url)

      const response = await axios.get(url, {
        params: {
          currentUserId,
          type, // 'album'일 경우 이미지가 있는 피드만 반환
        },
      })
      console.log('Server response for all feeds:', response.data)

      if (!Array.isArray(response.data) && response.data.feeds) {
        return response.data.feeds
      }
      return Array.isArray(response.data) ? response.data : []
    } catch (error) {
      console.error('[Debug] Get all feeds error:', error)
      throw error.response?.data || error.message
    }
  },

  // 그룹별 피드 조회 (기존 메서드 수정)
  getGroupFeeds: async (groupId, type = 'feed') => {
    try {
      // 그룹의 피드와 멤버들의 피드를 모두 가져오는 엔드포인트 호출
      const url = `${API_URL}/api/sns/feed/group/${groupId}`
      const response = await axios.get(url, {
        params: { type },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // 사용자의 피드 조회 (기존 메서드 수정)
  getUserFeeds: async (userId, currentUserId, type = 'feed') => {
    try {
      console.log('[FeedApi] Fetching user feeds for userId:', userId, 'type:', type)
      const url = `${API_URL}/api/sns/feed/user/${userId}`
      console.log('[FeedApi] Request URL:', url)

      const response = await axios.get(url, {
        params: {
          currentUserId,
          type,
        },
      })
      console.log('[FeedApi] User feeds response:', response.data)
      return response.data
    } catch (error) {
      console.error('[Debug] Get user feeds error:', error)
      throw error.response?.data || error.message
    }
  },

  //댓글조회
  getComments: async (feedId) => {
    console.log('API 호출 - 댓글 목록 조회:', feedId)
    const response = await axios.get(`${API_URL}/api/sns/feed/${feedId}/comments`)
    console.log('API 응답 - 댓글 목록:', response.data)
    return response.data
  },

  //댓글추가
  addComment: async (feedId, commentData) => {
    console.log('API URL:', `${API_URL}/api/sns/feed/${feedId}/comment`)
    console.log('전체 요청 정보:', {
      feedId,
      url: `${API_URL}/api/sns/feed/${feedId}/comment`,
      data: commentData,
    })
    const response = await axios.post(
      `${API_URL}/api/sns/feed/${feedId}/comment`,
      commentData, // {userId, content} 형태
    )
    return response.data
  },

  //댓글삭제
  deleteComment: async (feedId, commentId) => {
    console.log('API 호출 - 댓글 삭제:', { feedId, commentId })
    const response = await axios.delete(`${API_URL}/api/sns/feed/${feedId}/comment/${commentId}`)
    console.log('API 응답 - 댓글 삭제:', response.data)
    return response.data
  },

  // 리액션 토글
  toggleReaction: async (feedId, userId, reactionType) => {
    try {
      console.log('[FeedApi] Toggling reaction:', { feedId, userId, reactionType })
      const response = await axios.post(`${API_URL}/api/sns/feed/${feedId}/reaction`, {
        userId,
        reactionType,
      })
      return response.data
    } catch (error) {
      console.error('[FeedApi] Toggle reaction error:', error)
      throw error.response?.data || error.message
    }
  },

  //ai 이미지 생성
  generateAIImage: async (content) => {
    try {
      console.log('[FeedApi] Generating AI image with content:', content)

      const formData = new FormData()
      formData.append('text_content', content)

      const response = await axios.post(`${API_URL}/api/ai/img/generate-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    } catch (error) {
      console.error('[FeedApi] Error details:', error.response || error)
      throw error
    }
  },
}
