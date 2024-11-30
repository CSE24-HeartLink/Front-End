import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Vibration,
  RefreshControl,
  ScrollView,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

import MainHeader from '../components/navigation/MainHeader'
import FriendsItem from '../components/FriendItem'
import AddFriendModal from '../components/modals/AddFriendModal'
import LoadingScreen from './LoadingScreen'
import Colors from '../constants/colors'
import { toastConfig } from '../components/ui/ToastConfig'

import useGroupStore from '../store/groupStore'
import useFriendStore from '../store/friendStore'

//친구없을시
const EmptyState = ({ onAddPress, refreshing, onRefresh }) => (
  <ScrollView
    contentContainerStyle={styles.emptyContainer}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.darkRed20} colors={[Colors.darkRed20]} />
    }
  >
    <Text style={styles.emptyTitle}>아직 친구가 없어요</Text>
    <Text style={styles.emptyDescription}>친구를 추가하고 서로의 일상을 공유해보세요!</Text>
  </ScrollView>
)

const FriendsScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const selectedGroup = route.params?.selectedGroup

  // Store states
  const friends = useFriendStore((state) => state.friends)
  const loading = useFriendStore((state) => state.loading)
  const addFriend = useFriendStore((state) => state.addFriend)
  const deleteFriend = useFriendStore((state) => state.deleteFriend)
  const updateFriendGroup = useFriendStore((state) => state.updateFriendGroup)
  const getFriends = useFriendStore((state) => state.getFriends)

  const groups = useGroupStore((state) => state.groups)
  const fetchGroups = useGroupStore((state) => state.fetchGroups)

  // Local states
  const [filteredFriends, setFilteredFriends] = useState(friends)
  const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    console.log('Current groups:', groups)
    console.log('Current friends:', friends)
  }, [groups, friends])

  // 초기 데이터 로딩 (친구 목록 & 그룹 목록)
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      await Promise.all([getFriends(), fetchGroups()])
    } catch (error) {
      console.error('Failed to load data:', error)
      Toast.show({
        type: 'error',
        text1: '데이터 로딩 실패',
        text2: '잠시 후 다시 시도해주세요',
        visibilityTime: 3000,
        position: 'bottom',
        bottomOffset: 100,
      })
    } finally {
      setIsInitialLoading(false)
    }
  }

  // 새로고침 처리
  const handleRefresh = useCallback(async () => {
    console.log('[FriendsScreen] Manual refresh triggered')
    setRefreshing(true)
    try {
      await loadData()
    } finally {
      setRefreshing(false)
    }
  }, [loadData])

  // 그룹별 친구 목록 필터링
  useEffect(() => {
    if (selectedGroup && selectedGroup !== 'all') {
      setFilteredFriends(
        friends.filter(
          (friend) =>
            friend.group === selectedGroup ||
            groups.some((g) => g.id === selectedGroup && g.members && g.members.includes(friend.friendId._id)),
        ),
      )
    } else {
      setFilteredFriends(friends)
    }
  }, [selectedGroup, friends, groups])

  // 친구 추가 처리
  const handleAddFriend = async (nickname) => {
    if (!nickname?.trim()) return

    try {
      const result = await addFriend(nickname.trim())

      if (result.success) {
        setIsAddFriendModalVisible(false)
        Vibration.vibrate(100)

        Toast.show({
          type: 'success',
          text1: '친구 신청 완료',
          text2: `${nickname}님께 친구 신청을 보냈어요`,
          visibilityTime: 2000,
          position: 'bottom',
          bottomOffset: 100,
        })
      } else {
        Toast.show({
          type: 'error',
          text1: '친구 신청 실패',
          text2: result.error || '알 수 없는 오류가 발생했어요',
          visibilityTime: 3000,
          position: 'bottom',
          bottomOffset: 100,
        })
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: '오류 발생',
        text2: '잠시 후 다시 시도해주세요',
        visibilityTime: 3000,
        position: 'bottom',
        bottomOffset: 100,
      })
    } finally {
      setIsAddFriendModalVisible(false)
    }
  }

  // 친구 삭제 처리
  const handleDelete = async (friendId) => {
    await deleteFriend(friendId)
    onRefresh()
  }

  //로딩
  if (isInitialLoading || loading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MainHeader
          selectedGroup={selectedGroup}
          onPressCategory={() => navigation.navigate('GroupSelectScreen')}
          onPressNotification={() => console.log('notification')}
        />
        {friends.length === 0 ? (
          <ScrollView
            contentContainerStyle={styles.emptyContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.red20} colors={[Colors.red20]} />
            }
          >
            <EmptyState onAddPress={() => setIsAddFriendModalVisible(true)} />
          </ScrollView>
        ) : (
          <FlatList
            data={filteredFriends}
            renderItem={({ item }) => <FriendsItem friend={item} onMoveGroup={updateFriendGroup} onDelete={handleDelete} />}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.red20} colors={[Colors.red20]} />
            }
          />
        )}
        <TouchableOpacity style={styles.addButton} onPress={() => setIsAddFriendModalVisible(true)}>
          <Image source={require('../../assets/images/AddGroup.png')} style={styles.addButtonImage} />
        </TouchableOpacity>

        <AddFriendModal
          visible={isAddFriendModalVisible}
          onClose={() => setIsAddFriendModalVisible(false)}
          onSubmit={handleAddFriend}
          loading={loading}
        />
      </View>
      <Toast config={toastConfig} />
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
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 72,
  },
  addButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
  },
  addButtonImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
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
  addFirstFriendButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFirstFriendText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
})

export default FriendsScreen
