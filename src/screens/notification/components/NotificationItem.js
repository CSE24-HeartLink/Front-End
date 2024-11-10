// screens/notification/NotificationItem.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../../../constants/colors";

const NotificationItem = ({ item, onAccept, onReject }) => {

  const formattedTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `오늘 ${hours}:${minutes}`;
  };

  return (
    <View style={styles.notificationItem}>
      <View style={styles.userInfo}>
        <Image source={item.profileImage} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.timestamp}>{formattedTime(item.timestamp)}</Text>
        </View>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      {item.type === "request" && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => onAccept(item.id)}
          >
            <Text style={styles.buttonText}>수락</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => onReject(item.id)}
          >
            <Text style={styles.buttonText}>거절</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.red20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkRed20,
  },
  timestamp: {
    fontSize: 14,
    color: Colors.darkRed20,
    marginTop: 4,
  },
  content: {
    fontSize: 16,
    color: Colors.darkRed20,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 6,
  },
  acceptButton: {
    backgroundColor: Colors.primaryGreen,
  },
  rejectButton: {
    backgroundColor: Colors.gray20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray50,
  },
});

export default NotificationItem;