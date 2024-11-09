import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

import AddGroupModal from "../components/modals/AddGroupModal";
import EditGroupNameModal from "../components/modals/EditGroupNameModal";
import Colors from "../constants/colors";
import { GROUPS } from "../constants/dummydata";

const FeedGroupSelectScreen = () => {
  const navigation = useNavigation();
  const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState(false);
  const [isEditGroupModalVisible, setIsEditGroupModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSelectGroup = (groupId) => {
    navigation.navigate("MainTab", {
      screen: "피드",
      params: { selectedGroupId: groupId }
    });
  };

  const handleAddGroup = (groupName) => {
    console.log("Add group:", groupName);
    setIsAddGroupModalVisible(false);
  };

  const handleGroupLongPress = (group) => {
    setSelectedGroup(group);
    setIsEditGroupModalVisible(true);
  };

  const handleEditGroupName = (newName) => {
    console.log("Edit group name:", selectedGroup.id, newName);
    setIsEditGroupModalVisible(false);
  };

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
            <Text style={styles.title}>전체</Text>
          </View>
        </View>

        <View style={styles.groupsContainer}>
          {GROUPS.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={styles.groupItem}
              onPress={() => handleSelectGroup(group.id)}
              onLongPress={() => handleGroupLongPress(group)}
            >
              <Image
                source={require("../../assets/images/Heart.png")}
                style={styles.heartIcon}
              />
              <Text style={styles.groupName}>{group.name}</Text>
            </TouchableOpacity>
          ))}
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
    marginBottom: 20,
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
});

export default FeedGroupSelectScreen;