import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// app.config.js의 설정값 가져오기
const { apiUrl, apiTimeout } = Constants.manifest2.extra;

const client = axios.create({
  baseURL: apiUrl,
  timeout: parseInt(apiTimeout),
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 토큰 추가
client.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Token retrieval error:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
client.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // 에러 처리 로직
    if (error.response?.status === 401) {
      try {
        // 인증 에러 처리
        await AsyncStorage.removeItem("token");
        // 사용자에게 알림
        Alert.alert("로그인 필요", "다시 로그인해주세요.", [
          {
            text: "확인",
            onPress: () => {
              // 네비게이션을 통한 로그인 페이지 이동은
              // 네비게이션 객체가 필요하므로 여기서는 생략
            },
          },
        ]);
      } catch (storageError) {
        console.error("Token removal error:", storageError);
      }
    }

    // 서버 에러 처리
    if (error.response?.status === 500) {
      Alert.alert("서버 오류", "잠시 후 다시 시도해주세요.");
    }

    // 네트워크 에러 처리
    if (error.message === "Network Error") {
      Alert.alert("네트워크 오류", "인터넷 연결을 확인해주세요.");
    }

    return Promise.reject(error);
  }
);

// 개발 환경에서만 요청/응답 로깅
if (__DEV__) {
  client.interceptors.request.use((request) => {
    console.log("Starting Request:", request);
    return request;
  });

  client.interceptors.response.use((response) => {
    console.log("Response:", response);
    return response;
  });
}

export default client;
