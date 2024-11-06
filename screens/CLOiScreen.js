import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import CLOiIcon from "../assets/images/icons/tabMenu3.svg";

const CLOiScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CLOi Screen</Text>
      {/* <CLOiIcon width={25} height={24} fill="#4E4E4E" /> */}
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

export default CLOiScreen;
