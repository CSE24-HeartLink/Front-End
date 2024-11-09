//계정 정보를 표시하는 컴포넌트입니다.
//isOwner가 true일 경우 수정 및 삭제 버튼이 표시되도록 설정합니다.

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import Colors from "../../constants/colors";

const AccountInfo = ({
  profileImage,
  nickname,
  createdAt,
  isOwner,
  onEdit,
  onDelete,
}) => {
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
          <TouchableOpacity onPress={onEdit}>
            <Feather name="edit" size={20} color={Colors.gray30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Feather name="trash" size={20} color={Colors.gray30} />
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
});

export default AccountInfo;