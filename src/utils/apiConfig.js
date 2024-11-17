// src/utils/apiConfig.js
import { Platform } from "react-native";
import Constants from "expo-constants";

export const getApiBaseUrl = () => {
  const extra = Constants.expoConfig?.extra || {};
  const apiUrl = extra.apiUrl;

  if (__DEV__) {
    if (Platform.OS === "android") {
      return apiUrl.replace("localhost", "10.0.2.2");
    }
    if (Platform.OS === "ios") {
      return apiUrl.replace("localhost", "127.0.0.1");
    }
  }

  return apiUrl;
};
