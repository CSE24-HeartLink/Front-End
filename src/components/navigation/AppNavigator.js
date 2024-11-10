import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../../screens/WelcomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import SignupScreen from "../../screens/SignupScreen";
import MainFeedScreen from "../../screens/MainFeedScreen";
import FriendsScreen from "../../screens/FriendsScreen";
import FeedGroupSelectScreen from "../../screens/FeedGroupSelectScreen.js";
import AlbumScreen from "../../screens/AlbumScreen";
import RecordScreen from "../../screens/RecordScreen";
import WritingScreen from "../../screens/WritingScreen.js";
import WritingGroupSelectScreen from "../../screens/WritingGroupSelectScreen.js";
import RenameModal from "../modals/RenameModal.js";
// import FriendsScreen from "../../screens/FriendsScreen";
// import GroupSelectScreen from "../../screens/GroupSelectScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import CreatePost from "../../screens/CreatePost";

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
      <Stack.Screen name="MainFeedScreen" component={MainFeedScreen} />
      <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
      <Stack.Screen
        name="FeedGroupSelectScreen"
        component={FeedGroupSelectScreen}
      />
      <Stack.Screen name="AlbumScreen" component={AlbumScreen} />

      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="RecordScreen" component={RecordScreen} />
      <Stack.Screen name="WritingScreen" component={WritingScreen} />
      <Stack.Screen
        name="WritingGroupSelect"
        component={WritingGroupSelectScreen}
      />

      <Stack.Screen name="RenameModal" component={RenameModal} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
