import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const BigCircleBackground = ({ children }) => {
  return <View style={styles.circle}>{children}</View>;
};

const styles = StyleSheet.create({
  circle: {
    width: 158,
    height: 158,
    borderRadius: 79,
    backgroundColor: Colors.primaryBeige,
    justifyContent: "center",
    alignItems: "center",
    // opacity: 0.7, // 필요한 경우 투명도 적용
  },
});

export default BigCircleBackground;
