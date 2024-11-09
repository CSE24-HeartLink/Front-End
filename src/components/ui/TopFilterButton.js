import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const TopFilterButton = ({ getGroupName, onPress }) => {
  return (
    <TouchableOpacity style={styles.categoryButton} onPress={onPress}>
      <Text style={styles.categoryText}>{getGroupName()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    width: 160,
    height: 40,
    backgroundColor: Colors.red10,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  categoryText: {
    color: Colors.lightBeige,
    fontSize: 16,
    fontFamily: "Pretendard",
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
  },
});

export default TopFilterButton;
