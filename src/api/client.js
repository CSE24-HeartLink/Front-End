import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Platform } from "react-native";

// iOS 환경을 위한 baseURL 설정
const getBaseUrl = () => {
  const { apiUrl } = Constants.expoConfig?.extra || {};
  if (__DEV__) {
    // iOS 시뮬레이터에서는 localhost 대신 127.0.0.1 사용
    if (Platform.OS === "ios") {
      return apiUrl.replace("localhost", "127.0.0.1");
    }
    // 안드로이드 에뮬레이터를 위한 설정 (추후 사용)
    if (Platform.OS === "android") {
      return apiUrl.replace("localhost", "10.0.2.2");
    }
  }
  return apiUrl;
};

const client = axios.create({
  baseURL: getBaseUrl(),
  timeout: parseInt(Constants.expoConfig?.extra?.apiTimeout || "10000"),
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
      if (__DEV__) {
        console.log("Request URL:", config.baseURL + config.url);
        console.log("Request Headers:", config.headers);
      }
      return config;
    } catch (error) {
      console.error("Token retrieval error:", error);
      return config;
    }
  },
  (error) => {
    if (__DEV__) {
      console.error("Request Error:", error);
    }
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
client.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
    }
    return response.data;
  },
  async (error) => {
    if (__DEV__) {
      console.error("Response Error:", {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // 에러 처리 로직
    if (error.response?.status === 401) {
      try {
        await AsyncStorage.removeItem("token");
        Alert.alert(
          "로그인 필요",
          "다시 로그인해주세요.",
          [
            {
              text: "확인",
              onPress: () => {
                // 네비게이션 처리는 컴포넌트에서 수행
              },
            },
          ],
          { cancelable: false }
        );
      } catch (storageError) {
        console.error("Token removal error:", storageError);
      }
    } else if (error.response?.status === 500) {
      Alert.alert(
        "서버 오류",
        "잠시 후 다시 시도해주세요.",
        [{ text: "확인" }],
        { cancelable: false }
      );
    } else if (error.response?.status === 404) {
      Alert.alert(
        "요청 실패",
        "요청하신 정보를 찾을 수 없습니다.",
        [{ text: "확인" }],
        { cancelable: false }
      );
    } else if (!error.response && error.message.includes("Network Error")) {
      Alert.alert(
        "네트워크 오류",
        "인터넷 연결을 확인해주세요.",
        [{ text: "확인" }],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "오류",
        "요청을 처리하는 중 문제가 발생했습니다.",
        [{ text: "확인" }],
        { cancelable: false }
      );
    }

    return Promise.reject(error);
  }
);

// API 연결 테스트 함수
export const testApiConnection = async () => {
  try {
    const response = await client.get("/"); // 또는 '/health' 등 서버의 실제 테스트 엔드포인트
    console.log("API Connection Test Success:", response);
    return true;
  } catch (error) {
    console.error("API Connection Test Failed:", error);
    return false;
  }
};

// 개발 환경에서 초기 API 연결 테스트
if (__DEV__) {
  testApiConnection().then((isConnected) => {
    console.log("Initial API Connection:", isConnected ? "Success" : "Failed");
  });
}

export default client;
