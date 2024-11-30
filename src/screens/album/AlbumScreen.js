import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  RefreshControl,
} from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'

import MainHeader from '../../components/navigation/MainHeader'
import Colors from '../../constants/colors'
import { feedApi } from '../../api/feedApi'
import useAuthStore from '../../store/authStore'
import useGroupStore from '../../store/groupStore'
import LoadingScreen from '../LoadingScreen'

// 화면 너비를 기준으로 카드 크기 계산
const windowWidth = Dimensions.get('window').width
const cardWidth = (windowWidth - 16) / 3

// 데이터가 없을 때 표시되는 EmptyState 컴포넌트
const EmptyState = ({ refreshing, onRefresh }) => (
  <ScrollView
    contentContainerStyle={styles.emptyContainer}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.darkRed20} colors={[Colors.darkRed20]} />
    }
  >
    <Text style={styles.emptyTitle}>아직 앨범이 비어있어요</Text>
    <Text style={styles.emptyDescription}>피드를 작성하면 자동으로 앨범에 추가됩니다!</Text>
  </ScrollView>
)

const AlbumScreen = () => {
  // 네비게이션과 라우트 설정
  const navigation = useNavigation()
  const route = useRoute()

  // 상태 관리
  const [albumData, setAlbumData] = useState([]) // 앨범 데이터 저장
  const [currentGroupId, setCurrentGroupId] = useState('all') // 현재 선택된 그룹
  const [selectedImage, setSelectedImage] = useState(null) // 선택된 이미지 정보
  const [modalVisible, setModalVisible] = useState(false) // 모달 표시 여부
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태
  const [refreshing, setRefreshing] = useState(false) // 새로고침 상태

  // 스토어에서 필요한 데이터와 함수 가져오기
  const { groups, fetchGroups } = useGroupStore()
  const { getUserId } = useAuthStore()
  const userId = getUserId()

  // 앨범 데이터 가져오기 함수
  const fetchAlbumData = useCallback(
    async (groupId) => {
      try {
        setIsLoading(true)
        let response

        // 그룹 ID에 따라 다른 API 호출
        if (groupId === 'my') {
          response = await feedApi.getUserFeeds(userId, userId, 'album')
        } else if (groupId !== 'all') {
          response = await feedApi.getGroupFeeds(groupId, 'album')
        } else {
          response = await feedApi.getAllFeeds(userId, 'album')
        }

        // 응답에서 피드 배열 추출
        const feeds = response.feeds || response

        // 이미지가 있는 피드들의 이미지만 추출
        const images = feeds.reduce((acc, feed) => {
          const feedImages = feed.images
            .filter((img) => !img.isAIGenerated)
            .map((img) => ({
              url: img.url,
              createdAt: feed.createdAt,
              userId: feed.userId?.nickname || feed.userId,
              feedId: feed.feedId,
              groupId: feed.groupId,
            }))
          return [...acc, ...feedImages]
        }, [])

        setAlbumData(images)
      } catch (error) {
        console.error('앨범 데이터 로딩 실패:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [userId],
  )

  // 새로고침 처리 함수
  const handleRefresh = useCallback(async () => {
    console.log('[AlbumScreen] Manual refresh triggered')
    setRefreshing(true)
    try {
      await Promise.all([fetchGroups(), fetchAlbumData(currentGroupId)])
    } finally {
      setRefreshing(false)
    }
  }, [currentGroupId, fetchGroups, fetchAlbumData])

  // 화면에 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      fetchGroups()
      const groupId = route.params?.selectedGroupId || currentGroupId
      fetchAlbumData(groupId)
      setCurrentGroupId(groupId)
    }, [route.params?.selectedGroupId, currentGroupId]),
  )

  // 카테고리 버튼 클릭 핸들러
  const handleCategoryPress = () => {
    navigation.navigate('AlbumGroupSelectScreen', {
      currentGroupId: currentGroupId,
    })
  }

  // 날짜 포맷 함수
  const formatDate = (date) => {
    const d = new Date(date)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  // 핀 렌더링 컴포넌트
  const renderPin = () => (
    <View style={styles.pinContainer}>
      <View style={styles.pinHead} />
      <View style={styles.pinBody} />
    </View>
  )

  // 이미지 길게 누르기 핸들러 - 피드로 이동
  const handleLongPress = (image) => {
    navigation.navigate('MainTab', {
      screen: '피드',
      params: {
        selectedGroupId: image.groupId,
        selectedFeedId: image.feedId,
      },
    })
  }

  // 이미지 클릭 핸들러 - 모달 표시
  const handlePress = (image) => {
    setSelectedImage(image)
    setModalVisible(true)
  }

  // 카드 렌더링 컴포넌트
  const renderCard = (image) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePress(image)}
      onLongPress={() => handleLongPress(image)}
      delayLongPress={500}
    >
      <View style={styles.imageContainer}>
        {renderPin()}
        <Image source={{ uri: image.url }} style={styles.image} resizeMode="cover" />
      </View>
      <Text style={styles.title}>{image.userId}</Text>
      <Text style={styles.date}>{formatDate(image.createdAt)}</Text>
    </TouchableOpacity>
  )

  // 로딩 중일 때 로딩 화면 표시
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MainHeader
          selectedGroup={currentGroupId}
          onPressCategory={handleCategoryPress}
          onPressNotification={() => console.log('notification')}
        />
        {albumData.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.darkRed20} colors={[Colors.darkRed20]} />
            }
          >
            <View style={styles.grid}>
              {albumData.map((image, index) => (
                <View key={`${image.url}-${index}`} style={styles.cardContainer}>
                  {renderCard(image)}
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <EmptyState refreshing={refreshing} onRefresh={handleRefresh} />
        )}

        {/* 이미지 상세보기 모달 */}
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              {selectedImage && <Image source={{ uri: selectedImage.url }} style={styles.modalImage} resizeMode="contain" />}
            </View>
          </Pressable>
        </Modal>
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
    backgroundColor: Colors.primaryBeige,
  },
  scrollContent: {
    padding: 8,
    paddingBottom: 72,
    flex: 1, // emptyState 위지조정용
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  cardContainer: {
    width: cardWidth,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 8,
    height: 164,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 8,
    marginBottom: 8,
    position: 'relative',
  },
  pinContainer: {
    position: 'absolute',
    top: -10,
    left: '50%',
    marginLeft: -6,
    zIndex: 2,
    transform: [{ rotate: '25deg' }],
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    zIndex: 1,
  },
  pinHead: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF7262',
    borderWidth: 1,
    borderColor: '#F24E1E',
  },
  pinBody: {
    width: 3,
    height: 10,
    backgroundColor: '#DDDADA',
    alignSelf: 'center',
    marginTop: -1,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: Colors.gray,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  emptyDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
})

export default AlbumScreen
