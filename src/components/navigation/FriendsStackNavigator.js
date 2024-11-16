import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FriendsScreen from "../../screens/FriendsScreen";
import FriendsGroupSelectScreen from "../../screens/FriendsGroupSelectScreen";

const FriendsStack = createStackNavigator();

const FriendsStackNavigator = () => {
  return (
    <FriendsStack.Navigator screenOptions={{ headerShown: false }}>
      <FriendsStack.Screen name="FriendsScreen" component={FriendsScreen} />
      <FriendsStack.Screen
        name="FriendsGroupSelect"
        component={FriendsGroupSelectScreen}
      />
    </FriendsStack.Navigator>
  );
};

export default FriendsStackNavigator;
