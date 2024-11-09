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
import LoginForm from "../components/forms/LoginForm";
import Colors from "../constants/colors";

const LoginScreen = () => {
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
          <LoginForm />
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
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    width: 333,
    height: 160,
    left: 20,
    top: 78,
  },
  logo: {
    width: '100%',
    height: '100%',
  }
});

export default LoginScreen;