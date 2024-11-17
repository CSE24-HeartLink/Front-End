import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/colors";

const LoadingScreen = ({ message = "로딩중입니다>__<" }) => {
  const [fadeAnim] = useState(new Animated.Value(0.4));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.red20} />
        <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
          {message}
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBeige,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    letterSpacing: -0.3,
    color: Colors.gray80,
    fontFamily: "Pretendard",
    fontWeight: "600",
    includeFontPadding: false,
  },
});

export default LoadingScreen;
