import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";

import useAuthStore from "./src/store/authStore";
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
    initAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
