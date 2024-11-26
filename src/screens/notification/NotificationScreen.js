import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Toast from 'react-native-toast-message'

import Colors from '../../constants/colors'

import { toastConfig } from '../../components/ui/ToastConfig'
import NotificationItem from './components/NotificationItem'
import AddFriendGroupModal from './components/AddFriendGroupModal'

import LoadingScreen from '../LoadingScreen'
import useNotificationStore from '../../store/notificationStore'

const NotificationScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedNotificationId, setSelectedNotificationId] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)

  const { notifications, loading, error, fetchNotifications, handleFriendRequest, markAsRead, markAllAsRead, unreadCount } =
    useNotificationStore()

  // 화면 진입 시 알림 목록 로드
  useEffect(() => {
    const loadData = async () => {
      await fetchNotifications()
    }
    loadData()
  }, [])

  // 모든 알림 읽음 처리는 notifications가 있을 때만
  useEffect(() => {
    if (notifications.length > 0 && notifications.some((n) => !n.isRead)) {
      markAllAsRead()
    }
  }, [notifications])

  // 핸들러 함수들을 하나의 객체로 그룹화
  const handlers = {
    accept: (id) => {
      setSelectedNotificationId(id)
      setIsModalVisible(true)
    },

    reject: async (id) => {
      try {
        const success = await handleFriendRequest(id, false)
        Toast.show({
          type: success ? 'success' : 'error',
          text1: success ? '친구 신청을 거절했습니다' : '친구 신청 거절 실패',
          text2: !success && '잠시 후 다시 시도해주세요',
          visibilityTime: success ? 2000 : 3000,
          position: 'bottom',
          bottomOffset: 100,
        })
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: '오류 발생',
          text2: '잠시 후 다시 시도해주세요',
          visibilityTime: 3000,
          position: 'bottom',
          bottomOffset: 100,
        })
      }
    },

    modalClose: () => {
      setIsModalVisible(false)
      setSelectedNotificationId(null)
      setSelectedGroup(null)
    },

    modalConfirm: async (groupId) => {
      try {
        const success = await handleFriendRequest(selectedNotificationId, true, groupId)
        Toast.show({
          type: success ? 'success' : 'error',
          text1: success ? '친구 신청을 수락했습니다' : '친구 신청 수락 실패',
          text2: !success && '잠시 후 다시 시도해주세요',
          visibilityTime: success ? 2000 : 3000,
          position: 'bottom',
          bottomOffset: 100,
        })
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: '오류 발생',
          text2: '잠시 후 다시 시도해주세요',
          visibilityTime: 3000,
          position: 'bottom',
          bottomOffset: 100,
        })
      } finally {
        handlers.modalClose()
      }
    },
  }

  if (loading) return <LoadingScreen />

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header navigation={navigation} unreadCount={unreadCount} />
        <NotificationList
          notifications={notifications}
          onAccept={handlers.accept}
          onReject={handlers.reject}
          onMarkAsRead={markAsRead}
          navigation={navigation}
        />
        <AddFriendGroupModal
          visible={isModalVisible}
          onClose={handlers.modalClose}
          onConfirm={handlers.modalConfirm}
          selectedGroup={selectedGroup}
        />
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  )
}

// Header 컴포넌트 분리
const Header = ({ navigation }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={24} color={Colors.darkRed20} />
    </TouchableOpacity>
    <View style={styles.titleContainer}>
      <Text style={styles.headerTitle}>알림함</Text>
    </View>
    <View style={styles.rightPlaceholder} />
  </View>
)

// NotificationList 컴포넌트 분리
const NotificationList = ({ notifications, onAccept, onReject, onMarkAsRead, navigation }) => {
  console.log('NotificationList navigation:', navigation)
  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>알림이 없습니다</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <NotificationItem item={item} onAccept={onAccept} onReject={onReject} navigation={navigation} markAsRead={onMarkAsRead} />
      )}
      style={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.lightBeige,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lightBeige,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.red20,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 24,
  },
  titleContainer: {
    width: 'auto', // 160에서 auto로 변경
    minWidth: 160, // 최소 너비 추가
    height: 40,
    backgroundColor: Colors.primaryBeige,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 32,
    flex: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.red20,
    textAlign: 'center',
    flexShrink: 1, // 추가
  },
  rightPlaceholder: {
    width: 24,
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray50,
  },
})

export default NotificationScreen
