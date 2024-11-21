// navigation/BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CLOiScreen from "../../screens/CLOiScreen";
import AlbumScreen from "../../screens/album/AlbumScreen";
import MainFeedScreen from "../../screens/MainFeedScreen";
import MyPageScreen from "../../screens/MyPageScreen";

import CustomBottomTabBar from "./CustomBottomTabBar";
import FriendsScreen from "../../screens/FriendsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="피드"
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="CLOi" component={CLOiScreen} />
      <Tab.Screen name="앨범" component={AlbumScreen} />
      <Tab.Screen name="피드" component={MainFeedScreen} />
      <Tab.Screen
        name="친구"
        component={FriendsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="마이" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
