import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const MiddleCircleBackground = ({ children }) => {
  return <View style={styles.circle}>{children}</View>;
};

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 79,
    backgroundColor: Colors.lightBeige,
    justifyContent: "center",
    alignItems: "center",
    // opacity: 0.7, // 필요한 경우 투명도 적용
  },
});

export default MiddleCircleBackground;
