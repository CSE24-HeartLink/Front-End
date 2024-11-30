import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { formatDate, formatTime } from '../../utils/dateUtils'
import Colors from '../../constants/colors'
import useAuthStore from '../../store/authStore'

const AccountInfo = ({ feedId, profileImage, nickname, createdAt, userId, onEdit, onDelete }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const currentUserId = useAuthStore((state) => state.getUserId())
  // 현재 로그인한 사용자와 게시글 작성자 ID 비교
  const isOwner = currentUserId === userId

  // 삭제 버튼 클릭 핸들러
  const handleDelete = () => {
    console.log('[AccountInfo] Delete button pressed for feedId:', feedId)
    onDelete?.()
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImage, styles.profileImagePlaceholder]} />
        )}
        <View style={styles.userInfo}>
          <Text style={styles.nickname}>{nickname || 'Unknown User'}</Text>
          <Text style={styles.time}>
            {formatDate(createdAt)} {formatTime(createdAt)}
          </Text>
        </View>
      </View>
      {isOwner && (
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <Feather name="edit-2" size={20} color={Colors.gray30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Feather name="trash-2" size={20} color={Colors.gray30} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  profileImagePlaceholder: {
    backgroundColor: Colors.gray20,
  },
  userInfo: {
    marginLeft: 12,
  },
  nickname: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkRed20,
    marginBottom: 4,
  },
  time: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    color: Colors.darkRed20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
})

export default AccountInfo
