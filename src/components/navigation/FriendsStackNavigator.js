import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FriendsScreen from "../../screens/friends/FriendsScreen";
import GroupSelectScreen from "../../screens/GroupSelectScreen";

const FriendsStack = createStackNavigator();

const FriendsStackNavigator = () => {
  return (
    <FriendsStack.Navigator screenOptions={{ headerShown: false }}>
      <FriendsStack.Screen name="FriendsList" component={FriendsScreen} />
      <FriendsStack.Screen name="GroupSelect" component={GroupSelectScreen} />
    </FriendsStack.Navigator>
  );
};

export default FriendsStackNavigator;