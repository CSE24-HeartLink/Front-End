import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import MainHeader from "../components/navigation/MainHeader";
import FriendsItem from "../components/FriendItem";
import useFriendStore from "../store/friendStore";
import Colors from "../constants/colors";

const FriendsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedGroup = route.params?.selectedGroup;
  const friends = useFriendStore((state) => state.friends);
  const [filteredFriends, setFilteredFriends] = useState(friends);
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

  const handleMoveGroup = (friendId) => {
    // TODO: 그룹 선택 모달 구현
    updateFriendGroup(friendId, "새 그룹");
  };

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
});

export default FriendsScreen;
