import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../../screens/WelcomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import SignupScreen from "../../screens/SignupScreen";
import MainFeedScreen from "../../screens/MainFeedScreen";

import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Auth Screens */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />

      {/* Main App Screens */}
      <Stack.Screen name="MainFeed" component={MainFeedScreen} />
      <Stack.Screen name="MainTab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;