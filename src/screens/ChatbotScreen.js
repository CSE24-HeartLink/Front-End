import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatbotScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Chatbot Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});

export default ChatbotScreen;
