// FriendsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import MainHeader from "../components/navigation/MainHeader";
import FriendsItem from "../components/FriendItem";
import AddFriendModal from "../components/modals/AddFriendModal";
import Colors from "../constants/colors";
import useFriendStore from "../store/friendStore";

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
    console.log("Add friend with email:", email);
    setIsAddFriendModalVisible(false);
  };

  const handleMoveGroup = (friendId, newGroup) => {
    updateFriendGroup(friendId, newGroup);
  };

  const handleDelete = (friendId) => {
    deleteFriend(friendId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MainHeader
          selectedGroup={selectedGroup}
          onPressCategory={() => navigation.navigate("FriendsGroupSelect")}
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
    bottom: 60,
    right: 20,
  },
  addButtonImage: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
});

export default FriendsScreen;
