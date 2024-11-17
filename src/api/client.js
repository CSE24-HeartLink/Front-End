import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Platform } from "react-native";

const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === "ios") {
      return "http://127.0.0.1:3000/api"; // /api 추가
    } else if (Platform.OS === "android") {
      return "http://10.0.2.2:3000/api"; // /api 추가
    }
  }
  return (
    Constants.expoConfig?.extra?.apiUrl || "https://your-production-url.com/api"
  );
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
        Alert.alert("로그인 필요", "다시 로그인해주세요.");
      } catch (storageError) {
        console.error("Token removal error:", storageError);
      }
    }

    return Promise.reject(error);
  }
);

export default client;
