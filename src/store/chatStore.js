import { create } from 'zustand'
import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig.extra.apiUrl.development

const useChatStore = create((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  sendMessage: async (userId, content) => {
    try {
      set({ isLoading: true })

      // Add user message immediately
      const newUserMessage = { role: 'user', content }
      set((state) => ({
        messages: [...state.messages, newUserMessage],
      }))

      // Send to backend
      const response = await axios.post(`${API_URL}/api/ai/chatbot/chat`, {
        messages: [...get().messages, newUserMessage],
        stream: false,
      })

      // Add bot response
      set((state) => ({
        messages: [
          ...state.messages,
          {
            role: 'assistant',
            content: response.data.content,
          },
        ],
      }))
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default useChatStore
