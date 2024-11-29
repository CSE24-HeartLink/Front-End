import React, { useEffect } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import Colors from '../../constants/colors'

import useProfileStore from '../../store/profileStore'
import useAuthStore from '../../store/authStore'
import { profileApi } from '../../api/profileApi'
import useFeedStore from '../../store/feedStore'
import useCLOiStore from '../../store/CLOiStore'

const ProfileCard = ({ onPress, onLoadData }) => {
  // store에서 필요한 상태와 함수들을 가져옴
  const { userProfile, fetchUserStats, updateProfileImage, deleteProfileImage } = useProfileStore()
  const user = useAuthStore((state) => state.user)
  const getUserId = useAuthStore((state) => state.getUserId)
  const token = useAuthStore((state) => state.userToken)
  const setSelectedGroup = useFeedStore((state) => state.setSelectedGroup)
  const { fetchCloiInfo, level } = useCLOiStore()

  /**
   * 컴포넌트 마운트 시 초기 데이터를 로드
   * - 사용자 통계
   * - CLOi 정보
   * - 추가 데이터 (onLoadData prop이 있는 경우)
   */
  useEffect(() => {
    const loadData = async () => {
      const currentUserId = getUserId()
      if (currentUserId) {
        try {
          if (onLoadData) await onLoadData()
          await fetchUserStats()
          await fetchCloiInfo(currentUserId)
        } catch (error) {
          console.error('ProfileCard loadData error:', error)
        }
      }
    }

    if (token) loadData()
  }, [token])

  /**
   * 이미지 선택 및 업로드/수정 처리
   * - 갤러리 권한 확인
   * - 이미지 피커 실행
   * - 프로필 이미지 업로드/수정
   * - 피드 새로고침
   */
  const handleImagePress = async () => {
    try {
      // 갤러리 권한 확인
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.')
          return
        }
      }

      // 이미지 피커 실행
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.canceled && result.assets[0].uri) {
        try {
          const userId = getUserId()
          const response = await updateProfileImage(userId, result.assets[0].uri, !!user?.profileImage)

          if (response.user && response.user.profileImage) {
            await setSelectedGroup('all') // 피드 새로고침
            Alert.alert('성공', `프로필 이미지가 ${user?.profileImage ? '수정' : '등록'}되었습니다.`)
          }
        } catch (error) {
          Alert.alert('오류', `프로필 이미지 ${user?.profileImage ? '수정' : '등록'}에 실패했습니다.`)
        }
      }
    } catch (error) {
      Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.')
    }
  }

  /**
   * 이미지 롱프레스 처리 - 삭제 확인 다이얼로그 표시
   */
  const handleLongPress = () => {
    if (user?.profileImage) {
      Alert.alert('프로필 이미지 삭제', '프로필 이미지를 삭제하시겠습니까?', [
        { text: '취소', style: 'cancel' },
        { text: '삭제', style: 'destructive', onPress: handleDeleteImage },
      ])
    }
  }

  /**
   * 프로필 이미지 삭제 처리
   * - 이미지 삭제 API 호출
   * - 피드 새로고침
   */
  const handleDeleteImage = async () => {
    try {
      const userId = getUserId()
      const response = await deleteProfileImage(userId)

      if (response.user) {
        await setSelectedGroup('all')
        Alert.alert('성공', '프로필 이미지가 삭제되었습니다.')
      }
    } catch (error) {
      Alert.alert('오류', '프로필 이미지 삭제에 실패했습니다.')
    }
  }

  return (
    <TouchableOpacity style={styles.profileCard} onPress={onPress} onLongPress={handleLongPress}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePress}>
          {user?.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, styles.profileImagePlaceholder]} />
          )}
          <View style={styles.imageEditBadge}>
            <Feather name="edit-2" size={12} color={Colors.white} />
          </View>
        </TouchableOpacity>
        <Text style={styles.nameText}>{user?.nickname || '사용자'}</Text>
        <Feather name="chevron-right" size={24} color={Colors.gray40} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.introText}>총 작성한 게시글 수 {userProfile.postCount}개</Text>
        <Text style={styles.introText}>클로이 레벨 {level ?? 1}</Text>
        <Text style={styles.introText}>{userProfile.streakDays}일 연속 게시글 업로드🔥</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: Colors.lightBeige,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    height: 217,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  // 이미지와 편집 배지
  imageContainer: {
    position: 'relative',
    marginRight: 8,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 24,
  },
  //이미지가 없을 때 표시되는 placeholder
  profileImagePlaceholder: {
    backgroundColor: Colors.gray20,
  },
  //편집 아이콘이 들어가는 배지
  imageEditBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    backgroundColor: Colors.gray40,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  nameText: {
    fontSize: 22,
    color: Colors.gray50,
    fontFamily: 'Pretendard',
    fontWeight: '700',
    flex: 1,
    marginLeft: 8,
  },
  textContainer: {
    marginTop: 4,
  },
  introText: {
    fontSize: 18,
    color: Colors.gray50,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    marginBottom: 8,
  },
})

export default ProfileCard
