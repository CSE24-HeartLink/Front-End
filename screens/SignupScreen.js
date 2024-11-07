import React from "react";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import Logo from "../components/Logo";
import SignupForm from "../components/forms/SignupForm";
import Colors from "../constants/colors";

const SignupScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Logo style={styles.logo} />
          </View>
          <SignupForm />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  logoContainer: {
    position: "absolute",
    width: 333,
    height: 160,
    left: 20,
    top: 78,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
});

export default SignupScreen;
