import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../components/Logo";
import Colors from "../../constants/colors";

const windowWidth = Dimensions.get('window').width;

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <Logo style={styles.logo} />
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>AI 기반{'\n'}일상 연결 플랫폼</Text>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        </View>

        {/* 회원가입과 비밀번호 찾기를 별도의 View로 분리 */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  logoSection: {
    position: 'absolute',
    width: 333,
    height: 160,
    left: 20,
    top: 191,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  subtitleContainer: {
    position: 'absolute',
    width: 209,
    height: 76,
    left: 144,
    top: 351,
  },
  subtitleText: {
    fontFamily: 'Pretendard',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 38,
    textAlign: 'right',
    color: Colors.pink40,
  },
  buttonSection: {
    position: 'absolute',
    width: '100%',
    top: 483,
  },
  loginButton: {
    width: 313,
    height: 77,
    marginHorizontal: 40,
    backgroundColor: Colors.pink30,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  loginButtonText: {
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 29,
    color: Colors.lightBeige,
    textAlign: 'center',
  },
  linkSection: {
    position: 'absolute',
    width: '100%',
    top: 576,
    alignItems: 'center',
  },
  signupContainer: {
    width: 123,
    height: 19,
    marginBottom: 8, // 비밀번호 찾기와의 간격
  },
  signupText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    textAlign: 'center',
    color: Colors.pink40,
  },
  forgotPasswordContainer: {
    width: 87,
    height: 19,
    marginTop: 8,
  },
  forgotPasswordText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    textAlign: 'center',
    color: Colors.pink40,
  },
});

export default WelcomeScreen;