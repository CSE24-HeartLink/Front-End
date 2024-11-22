import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatDateTime } from "../../../utils/dateUtils";
import Colors from "../../../constants/colors";

const NotificationItem = ({ item, onAccept, onReject, navigation }) => {
  const handlePress = () => {
    if (item.type === "comment" && item.reference?.feedId) {
      navigation.navigate("MainFeedScreen", {
        feedId: item.reference.feedId,
        commentId: item.reference.commentId,
      });
    }
  };

  // const handleDelete = async () => {
  //   try {
  //     const response = await notificationApi.deleteNotification(item._id);
  //     if (response.success) {
  //       // 알림 목록 새로고침
  //       // store에서 해당 알림 제거
  //     }
  //   } catch (error) {
  //     console.error("알림 삭제 실패:", error);
  //   }
  // };

  return (
    <TouchableOpacity style={styles.touchable} onPress={handlePress}>
      <View style={styles.notificationItem}>
        <Image
          source={require("../../../../assets/images/Afraid.png")}
          style={styles.profileImage}
        />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.content}>{item.message}</Text>
            <Text style={styles.timestamp}>
              {formatDateTime(item.createdAt)}
            </Text>
          </View>

          {item.type === "friend_request" && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={() => onAccept(item._id)}
              >
                <Text style={styles.buttonText}>수락</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={() => onReject(item._id)}
              >
                <Text style={styles.buttonText}>거절</Text>
              </TouchableOpacity>
            </View>
          )}

          {item.type !== "friend_request" && (
            <TouchableOpacity style={styles.deleteButton}>
              <Feather name="trash-2" size={20} color={Colors.gray30} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.red20,
    flexDirection: "row",
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  content: {
    fontSize: 16,
    color: Colors.darkRed20,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 14,
    color: Colors.darkRed20,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8, // 버튼 사이 간격
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: Colors.primaryGreen,
  },
  rejectButton: {
    backgroundColor: Colors.gray20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.gray50,
  },
  deleteButton: {
    padding: 8,
  },
});

export default NotificationItem;
