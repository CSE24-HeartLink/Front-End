import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import FeedDeleteModal from "../modals/FeedDeleteModal";
import Colors from "../../constants/colors";
import useFeedStore from "../../store/feedStore";

const AccountInfo = ({
  feedId,
  profileImage,
  nickname,
  createdAt,
  userId,
  onEdit, // onEdit prop으로 받기
  onDelete, // onDelete prop으로 받기
}) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // 현재 사용자가 게시글 작성자인지 확인 (다연이의 ID가 user1)
  const isOwner = userId === "user1" || nickname === "다연이";

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "오늘";
    if (diffDays === 1) return "어제";
    if (diffDays === 2) return "그저께";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleDeleteClick = () => {
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsDeleteModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.time}>
            {formatDate(createdAt)} {formatTime(createdAt)}
          </Text>
        </View>
      </View>
      {isOwner && (
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <Feather name="edit-2" size={20} color={Colors.gray30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteClick}
            style={styles.actionButton}
          >
            <Feather name="trash-2" size={20} color={Colors.gray30} />
          </TouchableOpacity>
        </View>
      )}

      <FeedDeleteModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
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
  userInfo: {
    marginLeft: 12,
  },
  nickname: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkRed20,
    marginBottom: 4,
  },
  time: {
    fontFamily: "Pretendard",
    fontSize: 14,
    color: Colors.darkRed20,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
});

export default AccountInfo;
