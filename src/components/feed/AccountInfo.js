import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import { formatDate, formatTime } from '../../utils/dateUtils';
import Colors from "../../constants/colors";
import useAuthStore from "../../store/authStore";

const AccountInfo = ({
  feedId,
  profileImage,
  nickname,
  createdAt,
  userId,
  onEdit,
  onDelete,
}) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const currentUserId = useAuthStore((state) => state.getUserId());
  // 현재 로그인한 사용자와 게시글 작성자 ID 비교
  const isOwner = currentUserId === userId;

  // 삭제 버튼 클릭 핸들러
  const handleDelete = () => {
    console.log("[AccountInfo] Delete button pressed for feedId:", feedId);
    onDelete?.();
  };
  //   if (!date) return "날짜 없음";

  //   try {
  //     const parsedDate = new Date(date);
  //     const now = new Date();

  //     // 날짜만 비교하기 위해 시간을 제거
  //     const dateOnly = new Date(
  //       parsedDate.getFullYear(),
  //       parsedDate.getMonth(),
  //       parsedDate.getDate()
  //     );
  //     const nowDateOnly = new Date(
  //       now.getFullYear(),
  //       now.getMonth(),
  //       now.getDate()
  //     );

  //     const diffTime = nowDateOnly - dateOnly;
  //     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  //     if (diffDays === 0) return "오늘";
  //     if (diffDays === 1) return "어제";
  //     if (diffDays === 2) return "그저께";

  //     const year = dateOnly.getFullYear();
  //     const month = String(dateOnly.getMonth() + 1).padStart(2, "0");
  //     const day = String(dateOnly.getDate()).padStart(2, "0");
  //     return `${year}.${month}.${day}`;
  //   } catch (error) {
  //     console.error("Date formatting error:", error);
  //     return "날짜 없음";
  //   }
  // };
  // const formatTime = (date) => {
  //   if (!date) return "";

  //   try {
  //     const parsedDate = new Date(date);
  //     const hours = String(parsedDate.getHours()).padStart(2, "0");
  //     const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
  //     return `${hours}:${minutes}`;
  //   } catch (error) {
  //     console.error("Time formatting error:", error);
  //     return "";
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImage, styles.profileImagePlaceholder]} />
        )}
        <View style={styles.userInfo}>
          <Text style={styles.nickname}>{nickname || "Unknown User"}</Text>
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
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Feather name="trash-2" size={20} color={Colors.gray30} />
          </TouchableOpacity>
        </View>
      )}
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
  profileImagePlaceholder: {
    backgroundColor: Colors.gray20,
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
