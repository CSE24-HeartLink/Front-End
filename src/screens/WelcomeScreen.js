import React from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Logo from '../components/Logo'
import Colors from '../constants/colors'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const WelcomeScreen = () => {
  const navigation = useNavigation()

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
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linkSection}>
          <TouchableOpacity style={styles.signupContainer} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>회원이 아니신가요?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

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
    width: windowWidth * 0.85,
    height: windowHeight * 0.19,
    left: '5%',
    top: '22%',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  subtitleContainer: {
    position: 'absolute',
    width: windowWidth * 0.53,
    height: windowHeight * 0.09,
    left: '36%',
    top: '41%',
  },
  subtitleText: {
    fontFamily: 'Pretendard',
    fontSize: windowWidth * 0.08,
    fontWeight: '600',
    lineHeight: windowHeight * 0.045,
    textAlign: 'right',
    color: Colors.pink40,
  },
  buttonSection: {
    position: 'absolute',
    width: '100%',
    top: '57%',
  },
  loginButton: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.09,
    marginHorizontal: '10%',
    backgroundColor: Colors.pink30,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%',
  },
  loginButtonText: {
    fontFamily: 'Pretendard',
    fontSize: windowWidth * 0.06,
    fontWeight: '600',
    lineHeight: windowHeight * 0.035,
    color: Colors.lightBeige,
    textAlign: 'center',
  },
  linkSection: {
    position: 'absolute',
    width: '100%',
    top: '68%',
    alignItems: 'center',
  },
  signupContainer: {
    width: windowWidth * 0.31,
    height: windowHeight * 0.023,
    marginBottom: '1%',
  },
  signupText: {
    fontFamily: 'Pretendard',
    fontSize: windowWidth * 0.04,
    fontWeight: '600',
    lineHeight: windowHeight * 0.023,
    textAlign: 'center',
    color: Colors.pink40,
  },
  forgotPasswordContainer: {
    width: windowWidth * 0.22,
    height: windowHeight * 0.023,
    marginTop: '1%',
  },
  forgotPasswordText: {
    fontFamily: 'Pretendard',
    fontSize: windowWidth * 0.04,
    fontWeight: '600',
    lineHeight: windowHeight * 0.023,
    textAlign: 'center',
    color: Colors.pink40,
  },
})

export default WelcomeScreen
