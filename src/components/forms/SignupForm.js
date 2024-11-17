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

import authApi from "../../api/authApi";
import Colors from "../../constants/colors";

const SignupForm = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!formData.email || !formData.password || !formData.nickname) {
      Alert.alert("오류", "모든 정보를 입력해주세요.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert("오류", "비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    try {
      setLoading(true);
      console.log("Attempting signup with:", formData);

      const { confirmPassword, ...signupData } = formData;
      const response = await authApi.signup(signupData);

      console.log("Signup successful:", response);
      Alert.alert("성공", "회원가입이 완료되었습니다.", [
        {
          text: "확인",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (error) {
      console.error("Signup failed:", error);
      Alert.alert(
        "회원가입 실패",
        error.message || "회원가입 중 오류가 발생했습니다."
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
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="닉네임"
        placeholderTextColor={Colors.gray30}
        value={formData.nickname}
        onChangeText={(text) => setFormData({ ...formData, nickname: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor={Colors.gray30}
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry // pw 점으로 보여줌
        textContentType="oneTimeCode"  // strong pw 안뜨게함
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        placeholderTextColor={Colors.gray30}
        value={formData.confirmPassword}
        onChangeText={(text) =>
          setFormData({ ...formData, confirmPassword: text })
        }
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.signupButton, loading && styles.disabledButton]}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.signupButtonText}>
          {loading ? "처리중..." : "회원가입"}
        </Text>
      </TouchableOpacity>
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
  signupButton: {
    width: 313,
    height: 77,
    backgroundColor: Colors.pink30,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    padding: 24,
  },
  signupButtonText: {
    color: Colors.lightBeige,
    fontSize: 24,
    fontFamily: "Pretendard",
    fontWeight: "600",
    lineHeight: 29,
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default SignupForm;
