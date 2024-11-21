import React, { useState, useEffect } from "react";
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

import useAuthStore from "../../store/authStore";
import useFeedStore from "../../store/feedStore";
import Colors from "../../constants/colors";

const CommentListModal = ({ visible, feedId, onClose }) => {
  // 로컬 댓글 상태 관리
  const [localComments, setLocalComments] = useState([]);
  // store에서 필요한 함수와 데이터 가져오기
  const loadComments = useFeedStore((state) => state.loadComments);
  const deleteComment = useFeedStore((state) => state.deleteComment);
  const currentUserId = useAuthStore((state) => state.getUserId());

  // 댓글 목록 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await loadComments(feedId);
        setLocalComments(result || []);
      } catch (error) {
        console.error("댓글 로딩 실패:", error);
      }
    };

    if (visible && feedId) {
      fetchComments();
    }
  }, [visible, feedId]);

  // 댓글 삭제 처리
  const handleDeleteComment = async (commentId) => {
    try {
      const result = await deleteComment(feedId, commentId);
      if (result) {
        // 삭제 성공시 목록 다시 로드
        const updatedComments = await loadComments(feedId);
        setLocalComments(updatedComments || []);
      }
    } catch (error) {
      Alert.alert("오류", "댓글 삭제에 실패했습니다.");
    }
  };

  // 개별 댓글 렌더링
  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <View style={styles.commentContent}>
        <Text style={styles.commentAuthor}>
          {item.userId?.nickname || "익명"}
        </Text>
        <Text style={styles.commentText}>{item.content}</Text>
        <Text style={styles.commentDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      {currentUserId === item.userId?._id && (
        <TouchableOpacity
          onPress={() => handleDeleteComment(item.commentId)}
          style={styles.deleteButton}
        >
          <Feather name="trash-2" size={16} color={Colors.gray30} />
        </TouchableOpacity>
      )}
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
        <TouchableOpacity
          style={styles.modalContent}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.title}>댓글 {localComments.length}개</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color={Colors.gray40} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={localComments}
            renderItem={renderComment}
            keyExtractor={(item) => item.commentId}
            contentContainerStyle={styles.commentList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>아직 댓글이 없습니다.</Text>
            }
          />
        </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  commentContent: {
    flex: 1,
    marginRight: 8,
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
    marginBottom: 4,
  },
  commentDate: {
    fontSize: 12,
    color: Colors.gray40,
    fontFamily: "Pretendard",
  },
  deleteButton: {
    padding: 4,
  },
  emptyText: {
    textAlign: "center",
    color: Colors.gray40,
    marginTop: 20,
    fontFamily: "Pretendard",
  },
});

export default CommentListModal;
