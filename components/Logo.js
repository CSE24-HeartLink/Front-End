// components/Logo.js
import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = ({ style }) => {
  return (
    <Image
      source={require("../assets/images/Logo.png")}
      style={[styles.logo, style]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 90,
  },
});

export default Logo;
