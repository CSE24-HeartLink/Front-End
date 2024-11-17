import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Text, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Constants from "expo-constants";
import * as Updates from "expo-updates";

import AppNavigator from "./src/components/navigation/AppNavigator";

// 유틸리티 함수: 환경변수 테스트
const testEnvVariables = () => {
  if (__DEV__) {
    console.group("Environment Variables");
    const extra = Constants.expoConfig?.extra || {};
    console.log("API URL:", extra.apiUrl);
    console.log("API Timeout:", extra.apiTimeout);
    console.log("Debug Mode:", extra.debug);
    console.log("Default Language:", extra.defaultLanguage);
    console.groupEnd();
  }
};

const App = () => {
  // 폰트 스타일을 글로벌 설정으로 적용
  const defaultTextStyle = Text.render;
  Text.render = function (...args) {
    const origin = defaultTextStyle.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: "Pretendard" }, origin.props.style],
    });
  };

  // 환경변수 테스트
  useEffect(() => {
    if (__DEV__) {
      testEnvVariables();
    }
  }, []);

  // 네트워크 연결 모니터링
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert("네트워크 오류", "인터넷 연결을 확인해주세요.", [
          { text: "확인" },
        ]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // 에러 핸들링
  useEffect(() => {
    if (__DEV__) {
      const errorHandler = (error) => {
        console.log("Development Error:", error);
      };

      // 전역 에러 처리
      ErrorUtils.setGlobalHandler(errorHandler);

      return () => {
        ErrorUtils.setGlobalHandler(null);
      };
    }
  }, []);

  // API 상태 테스트
  useEffect(() => {
    const testApiConnection = async () => {
      if (__DEV__) {
        try {
          const extra = Constants.expoConfig?.extra || {};
          console.log("Attempting to connect to:", extra.apiUrl); // URL 확인용
          const response = await fetch(`${extra.apiUrl}/health`); // 실제 엔드포인트로 수정 필요
          console.log(
            "API Connection Test:",
            response.status === 200 ? "Success" : "Failed"
          );
          console.log("Response status:", response.status);
        } catch (error) {
          console.log("API Connection Test Failed:", error);
          console.log("Error details:", {
            message: error.message,
            name: error.name,
            stack: error.stack,
          });
        }
      }
    };

    testApiConnection();
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
