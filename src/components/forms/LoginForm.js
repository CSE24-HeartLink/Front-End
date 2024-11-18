import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/colors";
import useAuthStore from "../../store/authStore";
import authApi from "../../api/authApi";

const LoginForm = () => {
  const navigation = useNavigation();
  const signIn = useAuthStore((state) => state.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("오류", "이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.login(email, password);
      console.log("[Debug] Raw login response:", response);

      // 응답 구조 확인
      const userInfo = response.user;
      console.log("[Debug] User info from login:", {
        id: userInfo?.id,
        _id: userInfo?._id,
        userId: userInfo?.userId,
        email: userInfo?.email,
        fullUserObject: userInfo,
      });

      // Zustand store에 저장
      await signIn(response.token, userInfo);

      // 저장 후 auth 상태 확인
      const authState = useAuthStore.getState();
      console.log("[Debug] Auth state after login:", {
        token: authState.userToken ? "exists" : "missing",
        user: authState.user,
        userId: authState.user?._id || authState.user?.id,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "MainTab" }],
      });
    } catch (error) {
      console.error("[Debug] Login error details:", {
        message: error.message,
        stack: error.stack,
        fullError: error,
      });
      Alert.alert(
        "로그인 실패",
        error.message || "로그인 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
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

      <TouchableOpacity
        style={[styles.loginButton, loading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "로그인 중..." : "로그인"}
        </Text>
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
          onPress={() =>
            Alert.alert(
              "😏💫",
              "비밀번호는 본인만 알 수 있습니다.\n열심히 생각해보세요!",
              [{ text: "더 생각해볼게요", style: "default" }]
            )
          }
        >
          <Text style={styles.forgotPasswordText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// styles는 그대로 유지

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
