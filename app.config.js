// app.config.js

const getEnvPath = () => {
  if (process.env.NODE_ENV === "production") {
    return ".env.production";
  }
  return ".env.development";
};

// dotenv로 환경변수 불러오기
require("dotenv").config({ path: getEnvPath() });

// iOS 시뮬레이터를 위한 API URL 설정
const getApiUrl = () => {
  if (process.env.API_URL) {
    // iOS 시뮬레이터에서는 localhost 대신 127.0.0.1 사용
    return process.env.API_URL.replace("localhost", "127.0.0.1");
  }
  return "http://127.0.0.1:3000"; // 기본값
};

// 기본 설정
const config = {
  name: process.env.APP_NAME || "heartlink",
  slug: "fe",
  version: process.env.APP_VERSION || "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  newArchEnabled: true,
  extra: {
    apiUrl: getApiUrl(),
    apiTimeout: process.env.API_TIMEOUT || "10000",
    debug: process.env.DEBUG === "true",
    defaultLanguage: process.env.DEFAULT_LANGUAGE || "ko",
  },
};

export default {
  expo: config,
};
