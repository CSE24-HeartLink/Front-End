import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = ({ style }) => {
  return (
    <Image
      source={require("../../assets/images/Logo.png")}
      style={[styles.logo, style]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 333,
    height: 160,
  },
});

export default Logo;
