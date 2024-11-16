import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../../screens/WelcomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import SignupScreen from "../../screens/SignupScreen";

import MainFeedScreen from "../../screens/MainFeedScreen";
import FriendsScreen from "../../screens/FriendsScreen";
import FeedGroupSelectScreen from "../../screens/FeedGroupSelectScreen.js";
import NotificationScreen from "../../screens/notification/NotificationScreen.js";

import AlbumScreen from "../../screens/album/AlbumScreen.js";

import AlbumGroupSelectScreen from "../../screens/album/AlbumGroupSelectScreen.js";
import RecordScreen from "../../screens/RecordScreen";
import WritingScreen from "../../screens/WritingScreen.js";
import WritingGroupSelectScreen from "../../screens/WritingGroupSelectScreen.js";

import RenameModal from "../modals/RenameModal.js";

import BottomTabNavigator from "./BottomTabNavigator";
import CreatePost from "../../screens/CreatePost";
import FriendsGroupSelectScreen from "../../screens/FriendsGroupSelectScreen.js";

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
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="AlbumScreen" component={AlbumScreen} />
      <Stack.Screen
        name="AlbumGroupSelectScreen"
        component={AlbumGroupSelectScreen}
      />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="RecordScreen" component={RecordScreen} />
      <Stack.Screen name="WritingScreen" component={WritingScreen} />
      <Stack.Screen
        name="WritingGroupSelect"
        component={WritingGroupSelectScreen}
      />
      <Stack.Screen
        name="FriendsGroupSelect"
        component={FriendsGroupSelectScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="RenameModal" component={RenameModal} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
