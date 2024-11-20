import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import useFeedStore from "../../store/feedStore";
import Colors from "../../constants/colors";

import AccountInfo from "./AccountInfo";
import PostContent from "./PostContent";
import ReactionButtons from "./ReactionButtons";
import FeedDeleteModal from "../modals/FeedDeleteModal";
import CommentModal from "./CommentModal";
import CommentListModal from "./CommentListModal";

const FeedItem = ({ feed, onDeleteSuccess }) => {
  const navigation = useNavigation();
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isCommentListVisible, setIsCommentListVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [comments, setComments] = useState([]);

  const selectedReaction = useFeedStore(
    (state) => state.selectedReactions?.[feed?.feedId] ?? null
  );

  const toggleReaction = useFeedStore((state) => state.toggleReaction);
  const deleteFeed = useFeedStore((state) => state.deleteFeed);

  // 필수 데이터 검증
  if (!feed || !feed.userId) {
    console.log("Invalid feed data:", feed);
    return null;
  }

  // 사용자 정보 추출
  const userInfo = {
    nickname:
      feed.userId.nickname ||
      feed.userId.email?.split("@")[0] ||
      "Unknown User",
    profileImage: feed.userId.profileImage,
    id: feed.userId._id,
  };

  const handleDeleteClick = () => {
    setIsDeleteModalVisible(true);
  };
  
  // 삭제 확인 처리
  const handleConfirmDelete = async () => {
    if (!feed.feedId) {
      console.error("[FeedItem] No feedId provided for deletion");
      return;
    }

    try {
      console.log("[FeedItem] Starting feed deletion:", feed.feedId);
      setIsDeleting(true);
      
      const result = await deleteFeed(feed.feedId);
      console.log("[FeedItem] Delete result:", result);

      if (result && result.success) {
        console.log("[FeedItem] Feed deleted successfully");
        setIsDeleteModalVisible(false);
        Alert.alert("성공", "게시글이 삭제되었습니다.");
        if (onDeleteSuccess) {
          console.log("[FeedItem] Calling onDeleteSuccess callback");
          onDeleteSuccess();
        }
      } else {
        console.error("[FeedItem] Feed deletion failed:", result?.error);
        Alert.alert(
          "삭제 실패",
          result?.error || "게시글 삭제에 실패했습니다."
        );
      }
    } catch (error) {
      console.error("[FeedItem] Delete feed error:", error);
      Alert.alert("오류", "게시글 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  // 댓글 추가
  const handleAddComment = (text) => {
    if (text.trim()) {
      const newComment = {
        id: Date.now().toString(),
        text: text.trim(),
        author: userInfo.nickname,
        createdAt: new Date(),
      };
      setComments((prevComments) => [...prevComments, newComment]);
    }
  };

  // 댓글 모달 제어 함수들
  const handleOpenCommentModal = () => setIsCommentModalVisible(true);
  const handleCloseCommentModal = () => setIsCommentModalVisible(false);
  const handleOpenCommentList = () => setIsCommentListVisible(true);
  const handleCloseCommentList = () => setIsCommentListVisible(false);

  // 댓글 버튼 클릭 처리
  const handleCommentPress = () => {
    comments.length > 0 ? handleOpenCommentList() : handleOpenCommentModal();
  };

  // AccountInfo에 전달할 props
  const accountInfoProps = {
    feedId: feed.feedId,
    profileImage: feed.userId.profileImage,
    nickname:
      feed.userId.nickname ||
      feed.userId.email?.split("@")[0] ||
      "Unknown User",
    createdAt: feed.createdAt,
    userId: feed.userId._id,
    onEdit: () =>
      navigation.navigate("WritingScreen", {
        feedId: feed.feedId,
        initialContent: feed.content,
        selectedGroup: feed.groupId,
        image: feed.images?.[0]?.url,
      }),
    onDelete: () => {
      console.log("[FeedItem] Delete button clicked");
      setIsDeleteModalVisible(true);
    },
  };

  return (
    <View style={styles.container}>
      <AccountInfo {...accountInfoProps} />
      <PostContent content={feed.content} image={feed.images?.[0]?.url} />
      <ReactionButtons
        selectedReaction={selectedReaction}
        onSelectReaction={(reactionType) =>
          toggleReaction(feed.feedId, reactionType)
        }
      />

      <View style={styles.commentSection}>
        <View style={styles.commentActions}>
          <TouchableOpacity
            style={styles.commentButton}
            onPress={handleOpenCommentModal}
          >
            <Feather name="message-circle" size={20} color={Colors.gray40} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCommentPress}>
            <Text style={styles.commentCount}>
              {comments.length > 0 ? `댓글 ${comments.length}개` : "댓글 작성"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FeedDeleteModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      <CommentModal
        visible={isCommentModalVisible}
        onClose={handleCloseCommentModal}
        onSubmit={(text) => {
          handleAddComment(text);
          handleCloseCommentModal();
        }}
      />

      <CommentListModal
        visible={isCommentListVisible}
        comments={comments}
        onClose={handleCloseCommentList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  commentSection: {
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  commentActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  commentButton: {
    padding: 4,
  },
  commentCount: {
    color: Colors.gray40,
    fontFamily: "Pretendard",
    fontSize: 14,
  },
});

export default FeedItem;
