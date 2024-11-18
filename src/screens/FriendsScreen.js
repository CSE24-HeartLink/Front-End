import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Vibration,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import MainHeader from "../components/navigation/MainHeader";
import FriendsItem from "../components/FriendItem";
import AddFriendModal from "../components/modals/AddFriendModal";
import LoadingScreen from "./LoadingScreen";
import Colors from "../constants/colors";
import { toastConfig } from "../components/ui/ToastConfig";

import useFriendStore from "../store/friendStore";
import useAuthStore from "../store/authStore";

const EmptyState = ({ onAddPress }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyTitle}>아직 친구가 없어요</Text>
    <Text style={styles.emptyDescription}>
      친구를 추가하고 서로의 일상을 공유해보세요!
    </Text>
  </View>
);

const FriendsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedGroup = route.params?.selectedGroup;

  // Store states
  const friends = useFriendStore((state) => state.friends);
  const loading = useFriendStore((state) => state.loading);
  const addFriend = useFriendStore((state) => state.addFriend);
  const deleteFriend = useFriendStore((state) => state.deleteFriend);
  const updateFriendGroup = useFriendStore((state) => state.updateFriendGroup);
  const getFriends = useFriendStore((state) => state.getFriends);

  // Local states
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // 초기 친구 목록 로딩
  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    try {
      await getFriends();
    } catch (error) {
      console.error("Failed to load friends:", error);
      Toast.show({
        type: "error",
        text1: "친구 목록 로딩 실패",
        text2: "잠시 후 다시 시도해주세요",
        visibilityTime: 3000,
        position: "bottom",
        bottomOffset: 100,
      });
    } finally {
      setIsInitialLoading(false);
    }
  };

  // 친구 목록 필터링
  useEffect(() => {
    if (selectedGroup && selectedGroup !== "all") {
      setFilteredFriends(
        friends.filter((friend) => friend.group === selectedGroup)
      );
    } else {
      setFilteredFriends(friends);
    }
  }, [selectedGroup, friends]);

  const handleAddFriend = async (nickname) => {
    if (!nickname?.trim()) return;

    try {
      const result = await addFriend(nickname.trim());

      if (result.success) {
        setIsAddFriendModalVisible(false);
        Vibration.vibrate(100);

        Toast.show({
          type: "success",
          text1: "친구 신청 완료",
          text2: `${nickname}님께 친구 신청을 보냈어요`,
          visibilityTime: 2000,
          position: "bottom",
          bottomOffset: 100,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "친구 신청 실패",
          text2: result.error || "알 수 없는 오류가 발생했어요",
          visibilityTime: 3000,
          position: "bottom",
          bottomOffset: 100,
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "오류 발생",
        text2: "잠시 후 다시 시도해주세요",
        visibilityTime: 3000,
        position: "bottom",
        bottomOffset: 100,
      });
    } finally {
      setIsAddFriendModalVisible(false);
    }
  };

  const handleDelete = (friendId) => {
    deleteFriend(friendId);
  };

  if (isInitialLoading || loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MainHeader
          selectedGroup={selectedGroup}
          onPressCategory={() => navigation.navigate("GroupSelect")}
          onPressNotification={() => console.log("notification")}
        />

        {friends.length === 0 ? (
          <EmptyState onAddPress={() => setIsAddFriendModalVisible(true)} />
        ) : (
          <FlatList
            data={filteredFriends}
            renderItem={({ item }) => (
              <FriendsItem
                friend={item}
                onMoveGroup={updateFriendGroup}
                onDelete={handleDelete}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}

        {!route.params?.selectedGroup && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddFriendModalVisible(true)}
          >
            <Image
              source={require("../../assets/images/AddGroup.png")}
              style={styles.addButtonImage}
            />
          </TouchableOpacity>
        )}

        <AddFriendModal
          visible={isAddFriendModalVisible}
          onClose={() => setIsAddFriendModalVisible(false)}
          onSubmit={handleAddFriend}
          loading={loading}
        />
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

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
    position: "absolute",
    bottom: 60,
    right: 20,
  },
  addButtonImage: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.textPrimary,
  },
  emptyDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
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
    fontWeight: "600",
  },
});

export default FriendsScreen;
