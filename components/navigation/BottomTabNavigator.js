// navigation/BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/colors";

import MainFeedScreen from "../../screens/MainFeedScreen";

// 임시 스크린 컴포넌트들
const CLoiScreen = () => (
  <View style={{ flex: 1, backgroundColor: Colors.primaryBeige }} />
);
const AlbumScreen = () => (
  <View style={{ flex: 1, backgroundColor: Colors.primaryBeige }} />
);
const FriendsScreen = () => (
  <View style={{ flex: 1, backgroundColor: Colors.primaryBeige }} />
);
const MyPageScreen = () => (
  <View style={{ flex: 1, backgroundColor: Colors.primaryBeige }} />
);

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.pink40,
        tabBarInactiveTintColor: Colors.gray45,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarHideOnKeyboard: true, // 키보드가 올라올 때 탭바 숨김
        safeAreaInsets: { bottom: 0 },
        tabBarBackground: () => (
          // 배경색 설정
          <View
            style={{
              backgroundColor: Colors.lightBeige,
              height: "100%",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="CLOi"
        component={CLoiScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="robot" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="앨범"
        component={AlbumScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="image" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="피드"
        component={MainFeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="친구"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="users" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="마이"
        component={MyPageScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 72,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopWidth: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 8,
    paddingBottom: 8,
    elevation: 0,
    shadowColor: "#000",
    shadowOpacity: 0,
  },
  tabBarLabel: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
  },
});
export default BottomTabNavigator;