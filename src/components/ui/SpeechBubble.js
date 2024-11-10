import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const SpeechBubble = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 353,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderTopLeftRadius: 0,
    backgroundColor: Colors.lightBeige,
    padding: 16,
  },
  text: {
    fontFamily: "Pretendard",
    fontWeight: "500",
    fontSize: 14,
    color: Colors.gray50,
    textAlign: "center",
  },
});

export default SpeechBubble;
