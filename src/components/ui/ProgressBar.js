import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const ProgressBar = ({ level, progress }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.levelText}>LV.{level}</Text> */}
      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${(progress % 50) * 2}%` }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 260,
    height: 32,
  },
  // levelText: {
  //   fontFamily: "Pretendard",
  //   fontWeight: "600",
  //   fontSize: 16,
  //   color: Colors.pink20,
  //   marginRight: 8,
  // },
  progressBar: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.pink20,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.pink20,
  },
});

export default ProgressBar;
