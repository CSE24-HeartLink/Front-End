import React, { useRef } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { formatDateTime } from '../../../utils/dateUtils'
import Colors from '../../../constants/colors'
import useNotificationStore from '../../../store/notificationStore'

const NotificationItem = ({ item, onAccept, onReject, navigation, index, markAsRead }) => {
  // 스와이프 ref
  const swipeableRef = useRef(null)

  // 사용자 정보 추출
  console.log('Notification data:', item)
  const userInfo = {
    nickname: item.triggeredBy?.nickname || 'Unknown User',
    profileImage: item.triggeredBy?.profileImage,
    id: item.triggeredBy?._id,
  }

  // 알림 클릭 처리
  const handlePress = () => {
    if (item.type === 'comment' && item.reference?.feedId) {
      navigation.navigate('MainFeedScreen', {
        feedId: item.reference.feedId,
        commentId: item.reference.commentId,
      })
    } else if (item.type === 'reaction' && item.reference?.feedId) {
      navigation.navigate('MainFeedScreen', {
        selectedFeedId: item.reference.feedId,
      })
    }

    if (!item.isRead) {
      markAsRead(item._id)
    }
  }

  // 스와이프 액션 렌더링
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    })

    const handleAction = () => {
      if (item.type === 'friend_request') {
        onReject(item._id)
      } else {
        useNotificationStore.getState().deleteNotification(item._id)
      }
      swipeableRef.current?.close()
    }

    return (
      <>
        <View style={styles.swipeBackground} />
        {/* 삭제 버튼 */}
        <Animated.View style={[styles.deleteAction, { transform: [{ translateX: trans }] }]}>
          <TouchableOpacity style={styles.deleteActionButton} onPress={handleAction}>
            {item.type === 'friend_request' ? (
              <Text style={styles.deleteActionText}>거절</Text>
            ) : (
              <Feather name="trash-2" size={24} color="white" />
            )}
          </TouchableOpacity>
        </Animated.View>
      </>
    )
  }

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions} rightThreshold={40}>
      <TouchableOpacity onPress={handlePress}>
        <View style={[styles.notificationItem, index === 0 && styles.firstItem]}>
          {userInfo.profileImage ? (
            <Image source={{ uri: userInfo.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, styles.profileImagePlaceholder]} />
          )}
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.content}>{item.message}</Text>
              <Text style={styles.timestamp}>{formatDateTime(item.createdAt)}</Text>
            </View>

            {item.type === 'friend_request' && (
              <View style={styles.actionButtons}>
                <TouchableOpacity style={[styles.actionButton, styles.acceptButton]} onPress={() => onAccept(item._id)}>
                  <Text style={styles.buttonText}>수락</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.rejectButton]} onPress={() => onReject(item._id)}>
                  <Text style={styles.buttonText}>거절</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  notificationItem: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.red20,
    flexDirection: 'row',
  },
  firstItem: {
    borderTopWidth: 0,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profileImagePlaceholder: {
    backgroundColor: Colors.gray20,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  content: {
    fontSize: 16,
    color: Colors.darkRed20,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 14,
    color: Colors.darkRed20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: Colors.primaryGreen,
  },
  rejectButton: {
    backgroundColor: Colors.gray20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray50,
  },
  // 스와이프 삭제 액션 스타일
  deleteAction: {
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  deleteActionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  deleteActionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  swipeBackground: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.red,
  },
})

export default NotificationItem
