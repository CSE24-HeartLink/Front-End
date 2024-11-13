// import "react-native-gesture-handler";
// import React from "react";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { NavigationContainer } from "@react-navigation/native";

// import AppNavigator from "./src/components/navigation/AppNavigator";

// const App = () => {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };

// export default App;
import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";

import AppNavigator from "./src/components/navigation/AppNavigator";

// 폰트 스타일을 글로벌 설정으로 적용
const App = () => {
  // 커스텀 기본 폰트 스타일 적용 (Pretendard)
  const defaultTextStyle = Text.render;
  Text.render = function (...args) {
    const origin = defaultTextStyle.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: "Pretendard" }, origin.props.style],
    });
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
