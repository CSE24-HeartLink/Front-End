import React, { useState } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import Colors from '../../constants/colors'

const PostLoadingOverlay = () => {
  const [scaleAnim] = useState(new Animated.Value(1))

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  return (
    <View style={styles.overlay}>
      <View style={styles.contentContainer}>
        <LottieView source={require('../../../assets/animations/heartbeat.json')} autoPlay loop style={styles.lottie} />
        <Animated.Text style={[styles.loadingText, { transform: [{ scale: scaleAnim }] }]}>게시글 업로드 중...</Animated.Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.primaryBeige,
    fontFamily: 'Pretendard',
    fontWeight: '600',
    includeFontPadding: false,
  },
})

export default PostLoadingOverlay
