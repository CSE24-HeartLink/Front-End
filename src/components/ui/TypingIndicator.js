// components/ui/TypingIndicator.js
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import Colors from '../../constants/colors'

const TypingIndicator = () => {
  const [dot1] = useState(new Animated.Value(1))
  const [dot2] = useState(new Animated.Value(1))
  const [dot3] = useState(new Animated.Value(1))

  useEffect(() => {
    const animate = (dot, delay) => {
      return Animated.sequence([
        Animated.timing(dot, {
          toValue: 1.3,
          duration: 400,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    }

    Animated.loop(Animated.parallel([animate(dot1, 0), animate(dot2, 200), animate(dot3, 400)])).start()
  }, [])

  return (
    <View style={styles.container}>
      {[dot1, dot2, dot3].map((dot, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.dot,
            {
              transform: [{ scale: dot }],
            },
          ]}
        >
          .
        </Animated.Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4, // 패딩 줄임
  },
  dot: {
    fontSize: 20, // 폰트 사이즈 줄임
    color: Colors.gray45,
    marginHorizontal: 1, // 간격 줄임
  },
})
export default TypingIndicator
