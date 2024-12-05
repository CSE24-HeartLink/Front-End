import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import LottieView from 'lottie-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constants/colors'

const LoadingScreen = () => {
  const [scaleAnim] = useState(new Animated.Value(1)) // 텍스트 크기 애니메이션

  useEffect(() => {
    // 텍스트 크기 애니메이션 반복
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // 커짐
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // 작아짐
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 애니메이션과 텍스트를 감싸는 뷰 */}
        <View style={styles.animationContainer}>
          <LottieView source={require('../../assets/animations/heartbeat.json')} autoPlay loop style={styles.lottie} />

          <Animated.Text
            style={[
              styles.loadingText,
              { transform: [{ scale: scaleAnim }] }, // 크기 애니메이션
            ]}
          >
            마음을 연결중이에요.{'\n'}잠시만 기다려주세요!
          </Animated.Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBeige,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    letterSpacing: -0.3,
    color: Colors.pink40,
    fontFamily: 'Pretendard',
    fontWeight: '600',
    includeFontPadding: false,
    textAlign: 'center',
    lineHeight: 22,
  },
})

export default LoadingScreen
