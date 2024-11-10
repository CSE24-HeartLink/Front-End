// src/components/feed/CommentListModal.js
import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../../../constants/colors";

const CommentListModal = ({ visible, comments, onClose }) => {
  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentAuthor}>{item.author}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.header}>
            <Text style={styles.title}>댓글</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color={Colors.gray40} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.commentList}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Pretendard",
    fontWeight: "600",
    color: Colors.gray50,
  },
  commentList: {
    paddingBottom: 16,
  },
  commentItem: {
    marginBottom: 16,
  },
  commentAuthor: {
    fontSize: 14,
    fontFamily: "Pretendard",
    fontWeight: "600",
    color: Colors.darkRed20,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    fontFamily: "Pretendard",
    color: Colors.darkRed20,
  },
});

export default CommentListModal;
