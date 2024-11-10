import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import { Feather } from "@expo/vector-icons";

const CommentsSection = ({ comments, onCommentPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.commentButton} onPress={onCommentPress}>
        <Feather name="message-circle" size={20} color={Colors.gray40} />
        <Text style={styles.commentCount}>
          {comments.length > 0 ? `댓글 ${comments.length}개` : "댓글 달기"}
        </Text>
      </TouchableOpacity>

      {comments.map((comment, index) => (
        <View key={index} style={styles.commentItem}>
          <Text style={styles.nickname}>다연이</Text>
          <Text style={styles.commentText}>{comment.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  commentCount: {
    color: Colors.gray40,
    fontFamily: "Pretendard",
    fontSize: 14,
  },
  commentItem: {
    marginTop: 8,
  },
  nickname: {
    color: Colors.darkRed20,
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  commentText: {
    color: Colors.darkRed20,
    fontFamily: "Pretendard",
    fontSize: 14,
  },
});

export default CommentsSection;
