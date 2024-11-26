import React, { useState, useCallback } from 'react'
import { View, Text, ScrollView, SafeAreaView, Image, StyleSheet, Dimensions, TouchableOpacity, Modal, Pressable } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'

import MainHeader from '../../components/navigation/MainHeader'
import Colors from '../../constants/colors'
import { feedApi } from '../../api/feedApi'
import useAuthStore from '../../store/authStore'
import useGroupStore from '../../store/groupStore'

const windowWidth = Dimensions.get('window').width
const cardWidth = (windowWidth - 16) / 3

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyTitle}>아직 앨범이 비어있어요</Text>
    <Text style={styles.emptyDescription}>피드를 작성하면 자동으로 앨범에 추가됩니다!</Text>
  </View>
)

const AlbumScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [albumData, setAlbumData] = useState([])
  const [currentGroupId, setCurrentGroupId] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { groups, fetchGroups } = useGroupStore()
  const { getUserId } = useAuthStore()
  const userId = getUserId()

  const fetchAlbumData = useCallback(
    async (groupId) => {
      try {
        setIsLoading(true)
        let response

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

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
      const groupId = route.params?.selectedGroupId || currentGroupId
      fetchAlbumData(groupId)
      setCurrentGroupId(groupId)
    }, [route.params?.selectedGroupId, currentGroupId]),
  )

  const handleCategoryPress = () => {
    navigation.navigate('AlbumGroupSelectScreen', {
      currentGroupId: currentGroupId,
    })
  }

  const formatDate = (date) => {
    const d = new Date(date)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  const renderPin = () => (
    <View style={styles.pinContainer}>
      <View style={styles.pinHead} />
      <View style={styles.pinBody} />
    </View>
  )

  const handleLongPress = (image) => {
    navigation.navigate('MainTab', {
      screen: '피드',
      params: {
        selectedGroupId: image.groupId,
        selectedFeedId: image.feedId,
      },
    })
  }

  const handlePress = (image) => {
    setSelectedImage(image)
    setModalVisible(true)
  }

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

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text>로딩 중...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MainHeader
          selectedGroup={currentGroupId}
          onPressCategory={handleCategoryPress}
          onPressNotification={() => console.log('notification')}
        />
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {albumData.length > 0 ? (
            <View style={styles.grid}>
              {albumData.map((image, index) => (
                <View key={`${image.url}-${index}`} style={styles.cardContainer}>
                  {renderCard(image)}
                </View>
              ))}
            </View>
          ) : (
            <EmptyState />
          )}
        </ScrollView>

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
    //paddingTop: 15, // 핀을 위한 상단 패딩 추가
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
