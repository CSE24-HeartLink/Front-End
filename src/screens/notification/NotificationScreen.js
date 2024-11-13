// screens/notification/NotificationScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Colors from "../../constants/colors";
import { NOTIFICATIONS } from "../../constants/dummydata";

import NotificationItem from "./components/NotificationItem";
import AddFriendGroupModal from "./components/AddFriendGroupModal";

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleAccept = (id) => {
    setSelectedNotificationId(id);
    setIsModalVisible(true);
  };

  const handleReject = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedNotificationId(null);
    setSelectedGroup(null);
  };

  const handleModalConfirm = (groupId) => {
    // 여기서 선택된 그룹으로 친구 추가 로직 구현
    console.log(`Adding user to group: ${groupId}`);

    // 알림 목록에서 해당 알림 제거
    setNotifications((prev) =>
      prev.filter((notif) => notif.id !== selectedNotificationId)
    );

    // 모달 닫기
    handleModalClose();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={24} color={Colors.darkRed20} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>알림함</Text>
          </View>
          <View style={styles.rightPlaceholder} />
        </View>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationItem
              item={item}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          )}
          style={styles.list}
        />

        <AddFriendGroupModal
          visible={isModalVisible}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          selectedGroup={selectedGroup}
        />
      </View>
    </SafeAreaView>
  );
};

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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.red20,
    justifyContent: "space-between",
  },
  backButton: {
    width: 24,
  },
  titleContainer: {
    width: 160,
    height: 40,
    backgroundColor: Colors.primaryBeige,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 32,
    flex: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.red20,
    textAlign: "center",
  },
  rightPlaceholder: {
    width: 24,
  },
  list: {
    flex: 1,
  },
});

export default NotificationScreen;
