// Front-End/screens/MainFeedScreen.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MainFeedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Main Feed Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainFeedScreen;
