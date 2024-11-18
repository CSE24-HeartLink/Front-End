import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.primaryGreen,
        backgroundColor: Colors.lightBeige,
        height: "auto",
        paddingVertical: 12,
        borderRadius: 8,
        width: "90%",
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Pretendard",
        color: Colors.gray50,
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Pretendard",
        color: Colors.gray40,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#FF6B6B",
        backgroundColor: Colors.lightBeige,
        height: "auto",
        paddingVertical: 12,
        borderRadius: 8,
        width: "90%",
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Pretendard",
        color: Colors.gray50,
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "Pretendard",
        color: Colors.gray40,
      }}
    />
  ),
};
