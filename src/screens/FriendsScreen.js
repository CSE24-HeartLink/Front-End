import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import MainHeader from "../components/navigation/MainHeader";
import FriendsItem from "../components/FriendItem";

import useFriendStore from "../store/friendStore";

import AddFriendModal from "../components/modals/AddFriendModal";
import Colors from "../constants/colors";

const FriendsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedGroup = route.params?.selectedGroup;
  const friends = useFriendStore((state) => state.friends);
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false);
  const deleteFriend = useFriendStore((state) => state.deleteFriend);
  const updateFriendGroup = useFriendStore((state) => state.updateFriendGroup);

  useEffect(() => {
    if (selectedGroup && selectedGroup !== "all") {
      setFilteredFriends(
        friends.filter((friend) => friend.group === selectedGroup)
      );
    } else {
      setFilteredFriends(friends);
    }
  }, [selectedGroup, friends]);

  const handleAddFriend = (email) => {
    // 친구 추가 로직 구현
    console.log("Add friend with email:", email);
    setIsAddFriendModalVisible(false);
  };

  const handleMoveGroup = (friendId, newGroup) => {
    updateFriendGroup(friendId, newGroup);
  };

  //alert 자동 띄움
  const handleDelete = (friendId) => {
    Alert.alert(
      "친구 삭제",
      "정말 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "삭제",
          onPress: () => deleteFriend(friendId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MainHeader
          selectedGroup={selectedGroup}
          onPressCategory={() => navigation.navigate("GroupSelect")}
          onPressNotification={() => console.log("notification")}
        />
        <FlatList
          data={filteredFriends}
          renderItem={({ item }) => (
            <FriendsItem
              friend={item}
              onMoveGroup={handleMoveGroup}
              onDelete={handleDelete}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        {/* 친구 추가 버튼 */}
        {!route.params?.selectedGroup && ( // GroupSelect 화면이 아닐 때만 보이도록
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
          onConfirm={handleAddFriend}
        />
      </View>
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
    paddingBottom: 72, // BottomTab height
  },
  addButton: {
    position: "absolute",
    width: 64,
    height: 64,
    left: 309,
    top: 696,
    zIndex: 1,
  },
  addButtonImage: {
    width: "100%",
    height: "100%",
  },
});

export default FriendsScreen;