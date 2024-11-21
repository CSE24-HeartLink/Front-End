import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl.development;

export const profileApi = {
  // 프로필 정보 수정 (닉네임)
  updateProfile: async (userId, nickname, token) => {
    // userId 값 검증
    if (!userId) {
      throw new Error("userId is required");
    }
    try {
      const response = await axios.put(
        `${API_URL}/api/profile/myprofile?userId=${userId}`,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // 내 프로필 정보 조회
  getMyProfile: async (userId, token) => {
    try {
      console.log("[ProfileApi] Fetching profile for user:", userId);

      const response = await axios.get(
        `${API_URL}/api/users/myprofile?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("[ProfileApi] Profile data:", response.data);
      return response.data;
    } catch (error) {
      console.error("[ProfileApi] Get profile error:", error);
      throw error.response?.data || error.message;
    }
  },
};
