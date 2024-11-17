// app.config.js

// 개발 환경 기본 설정
const developmentConfig = {
  apiUrl: "http://localhost:3000", // 백엔드 포트번호
  apiTimeout: "10000",
};

// 기본 설정
const config = {
  name: "heartlink",
  slug: "fe",
  version: "1.0.0",
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
    ...developmentConfig,
  },
};

export default {
  expo: config,
};

// 추후 배포과정에서 추가해야됨
// productionConfig의 apiUrl은 실제 배포할 서버 주소로
// owner 부분은 본인의 Expo 계정 사용자명으로
// projectId는 EAS(Expo Application Services) 사용시 해당 프로젝트 ID로
