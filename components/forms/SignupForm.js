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

const SignupForm = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="닉네임"
          placeholderTextColor={Colors.gray30}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor={Colors.gray30}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor={Colors.gray30}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
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
      </View>

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginLinkContainer}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginLinkText}>이미 회원이신가요?</Text>
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
  inputContainer: {
    width: 313,
    gap: 16,
  },
  input: {
    width: 313,
    height: 48,
    backgroundColor: Colors.lightBeige,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Pretendard",
    fontWeight: "600",
    color: Colors.gray50,
    lineHeight: 19,
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
    textAlign: "center",
  },
  loginLinkContainer: {
    position: "absolute",
    width: 123,
    height: 19,
    left: 135,
    top: 357,
  },
  loginLinkText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19,
    textAlign: "center",
    color: Colors.pink40,
  },
});

export default SignupForm;
