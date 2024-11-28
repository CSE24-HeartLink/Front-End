import { create } from 'zustand'
import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig.extra.apiUrl.development
const useChatStore = create((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  // 메시지 전송

  sendMessage: async (userId, content) => {
    try {
      set({ isLoading: true })

      // 사용자 메시지 생성
      const newUserMessage = { role: 'user', content }

      // 상태 업데이트
      set((state) => ({
        messages: [...state.messages, newUserMessage],
      }))

      // OpenAI API 호출
      const response = await axios.post(`${API_URL}/api/ai/chatbot/chat`, {
        messages: [...get().messages, newUserMessage],
        stream: false,
      })

      // 어시스턴트 메시지 생성
      const assistantMessage = {
        role: 'assistant',
        content: response.data.content,
      }

      // MongoDB에 저장 - 두 메시지를 별도로 저장
      await axios.post(`${API_URL}/api/ai/chatbot/save`, {
        userId,
        messages: [
          {
            role: newUserMessage.role,
            content: newUserMessage.content,
          },
        ],
      })

      await axios.post(`${API_URL}/api/ai/chatbot/save`, {
        userId,
        messages: [
          {
            role: assistantMessage.role,
            content: assistantMessage.content,
          },
        ],
      })

      // 봇 응답을 상태에 추가
      set((state) => ({
        messages: [...state.messages, assistantMessage],
      }))
    } catch (error) {
      console.error('메시지 전송 실패:', error)
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  // 메시지 초기화
  clearMessages: () => set({ messages: [] }),

  // 채팅 내역 가져오기
  getChatHistory: async (userId) => {
    try {
      set({ isLoading: true })
      const response = await axios.get(`${API_URL}/api/ai/chatbot/${userId}`)
      set({ messages: response.data.messages || [] })
    } catch (error) {
      console.error('채팅 내역 조회 실패:', error)
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default useChatStore
