import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../../constants/colors";

const ToMeButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <Icon name="chevron-right" size={24} color={Colors.gray45} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.lightBeige,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginVertical: 8,
    width: 353, // 고정된 너비
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontFamily: "Pretendard",
    color: Colors.darkRed20,
  },
});

export default ToMeButton;
