import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import EditGroupModal from "./modals/EditGroupModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";

import Colors from "../constants/colors";

const FriendsItem = ({ friend, onMoveGroup, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleGroupChange = (newGroup) => {
    onMoveGroup(friend.id, newGroup);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* 프로필 이미지 */}
      <View style={styles.profileContainer}>
        <Image source={friend.profileImage} style={styles.profileImage} />
        {/* 친구 정보 */}
        <View style={styles.infoContainer}>
          <Text style={styles.nickname}>{friend.nickname}</Text>
          <Text style={styles.groupText}>{friend.group}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.groupButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.groupButtonText}>그룹 이동</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Feather
            name="trash-2"
            size={20}
            color={Colors.gray30}
            onPress={() => setIsDeleteModalVisible(true)}
          />
        </TouchableOpacity>
        <EditGroupModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onConfirm={handleGroupChange}
          selectedGroup={friend.group}
          friendName={friend.nickname}
        />
        <DeleteConfirmModal
          visible={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          onConfirm={() => {
            onDelete(friend.id);
            setIsDeleteModalVisible(false);
          }}
          friendName={friend.nickname}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryBeige,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  infoContainer: {
    marginLeft: 12,
  },
  nickname: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkRed20,
    marginBottom: 4,
  },
  groupText: {
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "400",
    color: Colors.darkRed20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  groupButton: {
    backgroundColor: Colors.gray30,
    borderRadius: 16,
    height: 32,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  groupButtonText: {
    color: Colors.lightBeige,
    fontSize: 14,
    fontFamily: "Pretendard",
    fontWeight: "600",
    lineHeight: 17,
  },
  deleteButton: {
    padding: 6,
  },
});

export default FriendsItem;
