import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig.extra.apiUrl.development

export const sttApi = {
  transcribeAudio: async (audioFile) => {
    try {
      const formData = new FormData()
      formData.append('audio_file', {
        uri: audioFile,
        type: 'audio/m4a',
        name: 'recording.m4a',
      })

      // 요청 URL 로깅
      const requestUrl = `${API_URL}/api/ai/stt`
      console.log('Request URL:', requestUrl)
      console.log('Audio File:', audioFile)

      const response = await axios.post(requestUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout:30000 ,
      })

      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      console.error('STT API Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        message: error.message,
      })

      return {
        success: false,
        error: error.response?.data?.error || error.message,
      }
    }
  },
}
