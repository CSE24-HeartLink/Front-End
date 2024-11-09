import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./components/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTabNavigator from "./components/navigation/BottomTabNavigator";

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;