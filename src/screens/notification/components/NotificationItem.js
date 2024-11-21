// screens/notification/NotificationItem.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { formatDateTime } from "../../../utils/dateUtils";
import Colors from "../../../constants/colors";

const NotificationItem = ({ item, onAccept, onReject }) => {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.textContainer}>
        <Text style={styles.content}>{item.message}</Text>
        <Text style={styles.timestamp}>{formatDateTime(item.createdAt)}</Text>
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
