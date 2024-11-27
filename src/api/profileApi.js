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
        `${API_URL}/api/sns/profile/myprofile?userId=${userId}`,
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
        `${API_URL}/api/sns/users/myprofile?userId=${userId}`,
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

  // 새로운 프로필 이미지 업로드 API 추가
  uploadProfileImage: async (userId, imageUri, token) => {
    try {
      console.log("[ProfileApi] Uploading profile image. Details:", {
        userId,
        imageUri,
        hasToken: !!token,
      });

      const formData = new FormData();
      // userId를 문자열로 전달
      formData.append("userId", userId.toString());

      const imageUriParts = imageUri.split(".");
      const fileExtension = imageUriParts[imageUriParts.length - 1];

      formData.append("profileImage", {
        uri: imageUri,
        name: `profile-${userId}.${fileExtension}`,
        type: `image/${fileExtension}`,
      });

      console.log("[ProfileApi] FormData created:", formData);

      const response = await axios.post(
        `${API_URL}/api/sns/profile/upload-profile-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("[ProfileApi] Upload response:", response.data);
      return response.data;
    } catch (error) {
      console.error("[ProfileApi] Upload error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error.response?.data || error.message;
    }
  },
};
