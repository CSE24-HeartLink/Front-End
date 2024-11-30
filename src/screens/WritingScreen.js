import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  Alert,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'

import AIImageIcon from '../../assets/images/icons/AIImageIcon.svg'
import CameraIcon from '../../assets/images/icons/CameraIcon.svg'
import TopFilterButton from '../components/ui/TopFilterButton'
import MiddleCircleBackground from '../components/ui/MiddleCircleBackground'
import Colors from '../constants/colors'
import PostLoadingOverlay from '../components/ui/PostLoadingOverlay'

import useFeedStore from '../store/feedStore'
import useGroupStore from '../store/groupStore'
import useAuthStore from '../store/authStore'

const screenWidth = Dimensions.get('window').width
const imageContainerWidth = screenWidth - 32
const imageContainerHeight = 200

const WritingScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [textInputValue, setTextInputValue] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const addFeed = useFeedStore((state) => state.addFeed)
  const updateFeed = useFeedStore((state) => state.updateFeed)
  const generateAIImage = useFeedStore((state) => state.generateAIImage)
  const { groups } = useGroupStore()
  const token = useAuthStore((state) => state.userToken)

  // 수정 모드 상태
  const [editMode, setEditMode] = useState({
    isEdit: false,
    feedId: null,
  })

  // 초기 마운트 시 수정 모드 체크 및 데이터 설정
  useEffect(() => {
    if (route.params?.feedId) {
      setEditMode({
        isEdit: true,
        feedId: route.params.feedId,
      })

      if (route.params.initialContent) setTextInputValue(route.params.initialContent)
      if (route.params.selectedGroup) setSelectedGroup(route.params.selectedGroup)
      if (route.params.image) setSelectedImage(route.params.image)
    } else {
      if (route.params?.selectedGroupId) setSelectedGroup(route.params.selectedGroupId)
      else if (route.params?.currentGroupId) setSelectedGroup(route.params.currentGroupId)
    }
  }, [])

  // 그룹 선택 후 업데이트
  useEffect(() => {
    if (route.params?.selectedGroupId) {
      setSelectedGroup(route.params.selectedGroupId)
    }
  }, [route.params?.selectedGroupId])

  // 갤러리 권한 요청 - 수정 모드가 아닐 때만
  useEffect(() => {
    if (!editMode.isEdit) {
      ;(async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
          if (status !== 'granted') {
            Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.')
          }
        }
      })()
    }
  }, [editMode.isEdit])

  // 그룹 선택 화면으로 이동
  const handleGroupSelect = () => {
    navigation.navigate('WritingGroupSelect', {
      fromScreen: 'WritingScreen',
      currentSelected: selectedGroup,
      feedId: editMode.feedId,
      isEditMode: editMode.isEdit,
      initialContent: textInputValue,
      image: selectedImage,
      ...route.params,
    })
  }

  // AI 이미지 생성 처리 - 수정 모드에서는 비활성화
  const handleAIImageGenerate = async () => {
    if (editMode.isEdit) return

    if (!textInputValue.trim()) {
      Alert.alert('알림', '이미지 생성을 위한 텍스트를 입력해주세요.')
      return
    }

    try {
      setIsLoading(true)
      const response = await generateAIImage(textInputValue)

      if (response.data?.[0]?.url) {
        setSelectedImage(response.data[0].url)
      } else {
        Alert.alert('오류', '이미지 URL을 찾을 수 없습니다.')
      }
    } catch (error) {
      console.error('AI image generation error:', error)
      Alert.alert('오류', 'AI 이미지 생성에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 갤러리에서 이미지 선택 - 수정 모드에서는 비활성화
  const handleGallerySelect = async () => {
    if (editMode.isEdit) return

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.')
    }
  }

  // 게시글 작성/수정 처리
  const handleSendPost = async () => {
    setIsSubmitting(true)
    Keyboard.dismiss() // 키보드 숨기기
    if (!textInputValue.trim() && !selectedImage) {
      Alert.alert('알림', '텍스트나 이미지를 입력해주세요.')
      setIsSubmitting(false)
      return
    }

    if (!token) {
      Alert.alert('알림', '로그인이 필요합니다.')
      setIsSubmitting(false)
      return
    }

    try {
      if (editMode.isEdit) {
        // 수정 모드일 때 - 이미지 관련 데이터는 포함하지 않음
        const updateData = {
          content: textInputValue,
          emotion: 'happy',
        }

        const result = await updateFeed(editMode.feedId, updateData)

        if (result.success) {
          Alert.alert('성공', '게시글이 수정되었습니다.')
          navigation.navigate('MainTab', {
            screen: '피드',
            params: {
              selectedGroupId: selectedGroup,
              selectedFeedId: editMode.feedId,
            },
          })
        } else {
          throw new Error(result.error || '게시글 수정에 실패했습니다.')
        }
      } else {
        // 새 게시글 작성
        const feedData = {
          content: textInputValue,
          image: selectedImage,
          groupId: selectedGroup === 'all' ? null : selectedGroup,
          emotion: 'happy',
        }
        await addFeed(feedData)
        Alert.alert('성공', '게시글이 작성되었습니다.')
        navigation.navigate('MainTab', {
          screen: '피드',
          params: {
            selectedGroupId: selectedGroup,
          },
        })
      }
    } catch (error) {
      console.error('Upload/Update error:', error)
      Alert.alert('오류', error.message || '게시글 처리 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTextChange = (text) => {
    if (text.length <= 500) {
      setTextInputValue(text)
    }
  }

  const getGroupName = () => {
    const group = groups.find((g) => g.id === selectedGroup)
    return group ? group.name : '전체'
  }

  return (
    <SafeAreaView style={styles.container}>
      {isSubmitting && <PostLoadingOverlay />}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color={Colors.darkRed20} />
        </TouchableOpacity>
        <TopFilterButton getGroupName={getGroupName} onPress={handleGroupSelect} selectedGroup={selectedGroup} />
        <TouchableOpacity onPress={handleSendPost} style={styles.sendButton}>
          {editMode.isEdit ? <Text style={styles.completeButtonText}>완료</Text> : <Icon name="send" size={24} color={Colors.red20} />}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="글을 작성해주세요 :)"
            placeholderTextColor={Colors.gray45}
            multiline
            value={textInputValue}
            onChangeText={handleTextChange}
            maxLength={500}
          />
        </View>

        {selectedImage && !editMode.isEdit && (
          <View style={[styles.imagePreviewContainer, styles.textInputContainer]}>
            <View style={styles.imageWrapper}>
              <Image source={typeof selectedImage === 'string' ? { uri: selectedImage } : selectedImage} style={styles.imagePreview} />
            </View>
            <TouchableOpacity style={styles.removeImageButton} onPress={() => setSelectedImage(null)}>
              <Icon name="close-circle" size={24} color={Colors.darkRed20} />
            </TouchableOpacity>
          </View>
        )}

        {selectedImage && editMode.isEdit && (
          <View style={[styles.imagePreviewContainer, styles.textInputContainer]}>
            <View style={styles.imageWrapper}>
              <Image source={typeof selectedImage === 'string' ? { uri: selectedImage } : selectedImage} style={styles.imagePreview} />
            </View>
          </View>
        )}
      </ScrollView>

      {!editMode.isEdit && (
        <View style={styles.circleButtonsContainer}>
          <TouchableOpacity onPress={handleAIImageGenerate} disabled={isLoading}>
            <MiddleCircleBackground>
              <AIImageIcon width={60} height={60} />
              <Text style={styles.circleButtonText}>{isLoading ? '생성 중...' : 'AI 이미지'}</Text>
            </MiddleCircleBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGallerySelect}>
            <MiddleCircleBackground>
              <CameraIcon width={60} height={60} />
              <Text style={styles.circleButtonText}>갤러리</Text>
            </MiddleCircleBackground>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
  },
  completeButtonText: {
    color: Colors.red20,
    fontSize: 16,
    fontFamily: 'Pretendard',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  textInputContainer: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.lightBeige,
    minHeight: 200,
  },
  textInput: {
    fontSize: 16,
    color: Colors.darkRed20,
    fontFamily: 'Pretendard',
    textAlignVertical: 'top',
  },
  imagePreviewContainer: {
    margin: 16,
    height: imageContainerHeight,
    backgroundColor: Colors.lightBeige,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: imageContainerHeight,
    height: imageContainerHeight,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.lightBeige,
    borderRadius: 12,
  },
  circleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 40,
  },
  circleButtonText: {
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Pretendard',
    fontSize: 14,
    color: Colors.gray45,
  },
})

export default WritingScreen
