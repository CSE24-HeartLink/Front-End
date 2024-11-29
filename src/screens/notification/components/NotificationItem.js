import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { formatDateTime } from '../../../utils/dateUtils'
import Colors from '../../../constants/colors'

const NotificationItem = ({ item, onAccept, onReject, navigation, index }) => {
  console.log('Notification data:', item) // 전체 데이터 구조 확인
  // 사용자 정보 추출
  const userInfo = {
    nickname: item.triggeredBy?.nickname || 'Unknown User',
    profileImage: item.triggeredBy?.profileImage,
    id: item.triggeredBy?._id,
  }

  const handlePress = () => {
    //comment 타입은 댓글창이 열린 상태로 이동
    if (item.type === 'comment' && item.reference?.feedId) {
      navigation.navigate('MainFeedScreen', {
        feedId: item.reference.feedId,
        commentId: item.reference.commentId,
      })
      //reaction 타입일 때는 해당 피드로만 이동
    } else if (item.type === 'reaction' && item.reference?.feedId) {
      navigation.navigate('MainFeedScreen', {
        selectedFeedId: item.reference.feedId,
      })
    }

    if (!item.isRead) {
      markAsRead(item._id)
    }
  }
  // const handleDelete = async () => {
  //   try {
  //     const response = await notificationApi.deleteNotification(item._id);
  //     if (response.success) {
  //       // 알림 목록 새로고침
  //       // store에서 해당 알림 제거
  //     }
  //   } catch (error) {
  //     console.error("알림 삭제 실패:", error);
  //   }
  // };

  return (
    <TouchableOpacity style={styles.touchable} onPress={handlePress}>
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

          {item.type !== 'friend_request' && (
            <TouchableOpacity style={styles.deleteButton}>
              <Feather name="trash-2" size={20} color={Colors.gray30} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
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
  deleteButton: {
    padding: 8,
  },
})

export default NotificationItem
