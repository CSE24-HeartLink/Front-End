import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

import TopFilterButton from "../components/ui/TopFilterButton";
import FriendsItem from "../components/FriendItem";
import useFriendStore from "../store/friendStore";
import Colors from "../constants/colors";

const FriendsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedGroup = route.params?.selectedGroup;
  const friends = useFriendStore((state) => state.friends);
  const [filteredFriends, setFilteredFriends] = useState(friends);

  useEffect(() => {
    if (selectedGroup && selectedGroup !== "all") {
      setFilteredFriends(
        friends.filter((friend) => friend.group === selectedGroup)
      );
    } else {
      setFilteredFriends(friends);
    }
  }, [selectedGroup, friends]);

  const handleCategoryPress = () => {
    navigation.navigate("GroupSelectScreen", { fromScreen: "FriendsScreen" });
  };

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
        {/* 조건부로 뒤로가기 버튼 렌더링 */}
        {selectedGroup && selectedGroup !== "all" && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="chevron-left" size={24} color={Colors.darkRed20} />
          </TouchableOpacity>
        )}
        <View style={styles.headerContainer}>
          <TopFilterButton
            onPress={handleCategoryPress}
            getGroupName={() => (selectedGroup ? selectedGroup : "전체")}
          />
        </View>
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
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  backButton: {
    padding: 8,
    position: "absolute",
    left: 16,
    zIndex: 1,
    top: 8, // 추가
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 72,
  },
});

export default FriendsScreen;
