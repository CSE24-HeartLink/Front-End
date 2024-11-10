import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../../screens/auths/WelcomeScreen.js";
import LoginScreen from "../../screens/auths/LoginScreen.js";
import SignupScreen from "../../screens/auths/SignupScreen.js";

import MainFeedScreen from "../../screens/feed/MainFeedScreen.js";
import NotificationScreen from "../../screens/notification/NotificationScreen.js";
import FriendsScreen from "../../screens/friends/FriendsScreen.js";
import FeedGroupSelectScreen from "../../screens/feed/FeedGroupSelectScreen.js";
import AlbumScreen from "../../screens/album/AlbumScreen.js";
import RecordScreen from "../../screens/post/RecordScreen.js";
import WritingScreen from "../../screens/post/WritingScreen.js";
import WritingGroupSelectScreen from "../../screens/post/WritingGroupSelectScreen.js";
import RenameModal from "../modals/RenameModal.js";

import BottomTabNavigator from "./BottomTabNavigator";
import CreatePost from "../../screens/post/CreatePost.js";

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
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
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
