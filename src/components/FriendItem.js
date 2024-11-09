import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/colors";

const FriendsItem = ({ friend, onMoveGroup, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={friend.profileImage} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.nickname}>{friend.nickname}</Text>
          <Text style={styles.groupText}>{friend.group}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.groupButton}>
          <Text style={styles.groupButtonText}>그룹 이동</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Feather name="trash-2" size={20} color={Colors.gray30} />
        </TouchableOpacity>
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
