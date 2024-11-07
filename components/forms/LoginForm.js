import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/colors";

const LoginForm = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: 실제 로그인 로직은 나중에 구현
    navigation.reset({
      index: 0,
      routes: [{ name: "MainFeed" }],
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor={Colors.gray30}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor={Colors.gray30}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.linkSection}>
        <TouchableOpacity
          style={styles.signupContainer}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupText}>회원이 아니신가요?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.forgotPasswordText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    top: 242,
    paddingHorizontal: 40,
  },
  input: {
    width: 313,
    height: 48,
    backgroundColor: Colors.lightBeige,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: "Pretendard",
    fontWeight: "600",
    color: Colors.gray50,
  },
  loginButton: {
    width: 313,
    height: 77,
    backgroundColor: Colors.pink30,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    padding: 24,
  },
  loginButtonText: {
    color: Colors.lightBeige,
    fontSize: 24,
    fontFamily: "Pretendard",
    fontWeight: "600",
    lineHeight: 29,
  },
  linkSection: {
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  signupContainer: {
    width: 123,
    height: 19,
    marginBottom: 8,
  },
  signupText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19,
    textAlign: "center",
    color: Colors.pink40,
  },
  forgotPasswordContainer: {
    width: 87,
    height: 19,
  },
  forgotPasswordText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19,
    textAlign: "center",
    color: Colors.pink40,
  },
});

export default LoginForm;
