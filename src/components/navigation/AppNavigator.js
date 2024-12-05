import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Auth Screens
import WelcomeScreen from "../../screens/WelcomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import SignupScreen from "../../screens/SignupScreen";

// Main Screens
import MainFeedScreen from "../../screens/MainFeedScreen";
import FriendsScreen from "../../screens/FriendsScreen";
import NotificationScreen from "../../screens/notification/NotificationScreen";

// Group & Feed Screens
import FeedGroupSelectScreen from "../../screens/FeedGroupSelectScreen";
import GroupSelectScreen from "../../screens/GroupSelectScreen";
import WritingScreen from "../../screens/WritingScreen";
import WritingGroupSelectScreen from "../../screens/WritingGroupSelectScreen";

// Album Screens
import AlbumScreen from "../../screens/album/AlbumScreen";
import AlbumGroupSelectScreen from "../../screens/album/AlbumGroupSelectScreen";

// Other Screens
import RecordScreen from "../../screens/RecordScreen";
import CreatePost from "../../screens/CreatePost";
import CLOiScreen from "../../screens/CLOiScreen";
import ChatbotScreen from "../../screens/ChatbotScreen";
import LoadingScreen from "../../screens/LoadingScreen";
import RenameModal from "../modals/RenameModal";

// Navigation
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Auth Screens */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />

      {/* Main Navigation */}
      <Stack.Screen name="MainTab" component={BottomTabNavigator} />
      
      {/* Feed & Group Screens */}
      <Stack.Screen name="MainFeedScreen" component={MainFeedScreen} />
      <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
      <Stack.Screen name="GroupSelectScreen" component={GroupSelectScreen} />
      <Stack.Screen name="FeedGroupSelectScreen" component={FeedGroupSelectScreen} />
      <Stack.Screen name="WritingScreen" component={WritingScreen} />
      <Stack.Screen name="WritingGroupSelect" component={WritingGroupSelectScreen} />
      
      {/* Album Screens */}
      <Stack.Screen name="AlbumScreen" component={AlbumScreen} />
      <Stack.Screen name="AlbumGroupSelectScreen" component={AlbumGroupSelectScreen} />
      
      {/* Utility Screens */}
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="RecordScreen" component={RecordScreen} />
      <Stack.Screen name="RenameModal" component={RenameModal} />
      
      {/* AI & Chat Screens */}
      <Stack.Screen name="CLOiScreen" component={CLOiScreen} />
      <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;