import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../../screens/WelcomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import SignupScreen from "../../screens/SignupScreen";

// import FriendsScreen from "../../screens/FriendsScreen";
// import GroupSelectScreen from "../../screens/GroupSelectScreen";
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

      {/* Main App Screen with Bottom Tabs */}
      <Stack.Screen name="MainTab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
