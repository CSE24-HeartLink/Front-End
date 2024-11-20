import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

import useGroupStore from "../store/groupStore";
import Colors from "../constants/colors";

import AddGroupModal from "../components/modals/AddGroupModal";
import EditGroupNameModal from "../components/modals/EditGroupNameModal";

const FeedGroupSelectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState(false);
  const [isEditGroupModalVisible, setIsEditGroupModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentGroupId, setCurrentGroupId] = useState("all");

  const { groups, isLoading, error, fetchGroups, addGroup, editGroupName } =
    useGroupStore();

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (route.params?.currentGroupId) {
      setCurrentGroupId(route.params.currentGroupId);
    }
  }, [route.params?.currentGroupId]);

  // 전체 옵션을 포함한 그룹 리스트
  const allGroups = [{ id: "all", name: "전체" }, ...groups];

  const handleAddGroup = async (groupName) => {
    try {
      await addGroup(groupName);
      setIsAddGroupModalVisible(false);
    } catch (error) {
      Alert.alert("오류", "그룹 추가에 실패했습니다.");
    }
  };

  const handleGroupLongPress = (group) => {
    if (group.id === "all") return; // 전체는 수정 불가
    setSelectedGroup(group);
    setIsEditGroupModalVisible(true);
  };

  const handleEditGroupName = async (newName) => {
    try {
      await editGroupName(selectedGroup.id, newName);
      setIsEditGroupModalVisible(false);
    } catch (error) {
      Alert.alert("오류", "그룹명 수정에 실패했습니다.");
    }
  };

  const handleSelectGroup = (groupId) => {
    setCurrentGroupId(groupId);
    navigation.navigate("MainTab", {
      screen: "피드",
      params: { selectedGroupId: groupId },
      initial: false,
    });
  };

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchGroups}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="chevron-left" size={24} color={Colors.darkRed20} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {allGroups.find((g) => g.id === currentGroupId)?.name || "전체"}
            </Text>
          </View>
        </View>

        <View style={styles.groupsContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.darkRed20} />
            </View>
          ) : (
            allGroups.map((group) => (
              <TouchableOpacity
                key={group.id}
                style={[
                  styles.groupItem,
                  currentGroupId === group.id && styles.selectedGroupItem,
                ]}
                onPress={() => handleSelectGroup(group.id)}
                onLongPress={() => handleGroupLongPress(group)}
              >
                <Image
                  source={require("../../assets/images/Heart.png")}
                  style={styles.heartIcon}
                />
                <Text
                  style={[
                    styles.groupName,
                    currentGroupId === group.id && styles.selectedGroupName,
                  ]}
                >
                  {group.name}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddGroupModalVisible(true)}
        >
          <Image
            source={require("../../assets/images/AddGroup.png")}
            style={styles.addButtonImage}
          />
        </TouchableOpacity>

        <AddGroupModal
          visible={isAddGroupModalVisible}
          onClose={() => setIsAddGroupModalVisible(false)}
          onConfirm={handleAddGroup}
        />

        <EditGroupNameModal
          visible={isEditGroupModalVisible}
          onClose={() => setIsEditGroupModalVisible(false)}
          onConfirm={handleEditGroupName}
          currentGroupName={selectedGroup?.name || ""}
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkRed20,
  },
  groupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    justifyContent: "space-between",
  },
  groupItem: {
    width: "30%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  selectedGroupItem: {
    opacity: 0.7,
  },
  heartIcon: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  groupName: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkRed20,
    textAlign: "center",
  },
  selectedGroupName: {
    color: Colors.darkRed10,
  },
  addButton: {
    position: "absolute",
    width: 64,
    height: 64,
    right: 20,
    bottom: 20,
    zIndex: 1,
  },
  addButtonImage: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    color: Colors.darkRed20,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.darkRed20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: "Pretendard",
    fontSize: 14,
    color: Colors.white,
  },
});

export default FeedGroupSelectScreen;