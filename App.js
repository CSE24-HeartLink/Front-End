import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { navigationRef } from "./src/components/navigation/RootNavigation";
import { nuguApi } from "./src/api/websocket"; // 웹소켓 import 추가

import useAuthStore from "./src/store/authStore";
import useFeedStore from "./src/store/feedStore";
import useProfileStore from "./src/store/profileStore";
import AppNavigator from "./src/components/navigation/AppNavigator";

import LoadingScreen from "./src/screens/LoadingScreen";

const App = () => {
  const initAuth = useAuthStore((state) => state.initAuth);
  const isLoading = useAuthStore((state) => state.isLoading);

  // 폰트 스타일을 글로벌 설정으로 적용
  const defaultTextStyle = Text.render;
  Text.render = function (...args) {
    const origin = defaultTextStyle.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: "Pretendard" }, origin.props.style],
    });
  };

  useEffect(() => {
    // 기존 인증 초기화
    initAuth();

    // 웹소켓 연결 초기화
    const unsubscribe = nuguApi.subscribeToImageGeneration((data) => {
      console.log("웹소켓 메시지 수신:", data);
    });

    // 피드 업데이트 시 프로필 통계 갱신하도록 콜백 설정
    const feedStore = useFeedStore.getState();
    feedStore.setOnFeedUpdate(() => {
      useProfileStore.getState().fetchUserStats();
    });

    // 컴포넌트 언마운트 시 웹소켓 연결 정리
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  //로딩
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;