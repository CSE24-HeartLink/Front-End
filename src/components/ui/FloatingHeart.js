// components/ui/FloatingHeart.js
import React, { useEffect } from 'react'
import { Animated } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Colors from '../../constants/colors'

const FloatingHeart = ({ style, onComplete }) => {
  const moveAnim = new Animated.ValueXY({ x: 0, y: 0 })
  const scaleAnim = new Animated.Value(0)
  const opacityAnim = new Animated.Value(1)

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(moveAnim.y, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete && onComplete()
    })
  }, [])

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ translateX: moveAnim.x }, { translateY: moveAnim.y }, { scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <Icon name="heart" size={24} color={Colors.red20} />
    </Animated.View>
  )
}

export default FloatingHeart
