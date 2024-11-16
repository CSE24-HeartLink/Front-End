import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import useFeedStore from "../../store/feedStore";
import AccountInfo from "./AccountInfo";
import PostContent from "./PostContent";
import ReactionButtons from "./ReactionButtons";
import CommentModal from "./CommentModal";
import CommentListModal from "./CommentListModal";
import Colors from "../../constants/colors";

const FeedItem = ({ feedId }) => {
  const navigation = useNavigation();

  // Zustand 스토어에서 필요한 상태와 액션들을 가져옴
  const feeds = useFeedStore((state) => state.feeds);
  const feed = feeds.find((f) => f.id === feedId);
  const selectedReaction = useFeedStore(
    (state) => state.selectedReactions[feedId]
  );
  const toggleReaction = useFeedStore((state) => state.toggleReaction);
  const deleteFeed = useFeedStore((state) => state.deleteFeed);

  // 로컬 상태 관리
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isCommentListVisible, setIsCommentListVisible] = useState(false);
  const [comments, setComments] = useState([]);

  // 피드가 존재하지 않으면 렌더링하지 않음
  if (!feed) return null;

  // 편집 핸들러
  const handleEdit = () => {
    console.log("FeedItem - handleEdit:", {
      feedId: feed.id,
      currentContent: feed.content,
      currentGroup: feed.group,
    });
    //위 디버깅용
    navigation.navigate("WritingScreen", {
      feedId: feed.id,
      initialContent: feed.content,
      selectedGroup: feed.group,
      image: feed.image,
      isEditMode: true,
    });
  };

  // 피드 삭제 핸들러
  const handleDelete = () => {
    deleteFeed(feedId);
  };

  // 새 댓글 추가 핸들러
  const handleAddComment = (text) => {
    if (text.trim()) {
      const newComment = {
        id: Date.now().toString(),
        text: text.trim(),
        author: "다연이",
        createdAt: new Date(),
      };
      setComments((prevComments) => [...prevComments, newComment]);
    }
  };

  // 댓글 모달 관련 핸들러들
  const handleOpenCommentModal = () => {
    setIsCommentModalVisible(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalVisible(false);
  };

  const handleOpenCommentList = () => {
    setIsCommentListVisible(true);
  };

  const handleCloseCommentList = () => {
    setIsCommentListVisible(false);
  };

  // 댓글 버튼 클릭 핸들러
  const handleCommentPress = () => {
    if (comments.length > 0) {
      handleOpenCommentList();
    } else {
      handleOpenCommentModal();
    }
  };

  return (
    <View style={styles.container}>
      {/* 계정 정보 섹션 */}
      <AccountInfo
        feedId={feed.id}
        profileImage={feed.profileImage}
        nickname={feed.nickname}
        createdAt={feed.createdAt}
        userId={feed.userId}
        content={feed.content}
        group={feed.group}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* 게시글 내용 섹션 */}
      <PostContent content={feed.content} image={feed.image} />

      {/* 리액션 버튼 섹션 */}
      <ReactionButtons
        selectedReaction={selectedReaction}
        onSelectReaction={(reactionType) =>
          toggleReaction(feedId, reactionType)
        }
      />

      {/* 댓글 섹션 */}
      <View style={styles.commentSection}>
        <View style={styles.commentActions}>
          {/* 댓글 작성 버튼 */}
          <TouchableOpacity
            style={styles.commentButton}
            onPress={handleOpenCommentModal}
          >
            <Feather name="message-circle" size={20} color={Colors.gray40} />
          </TouchableOpacity>

          {/* 댓글 수 표시 또는 댓글 작성 버튼 */}
          <TouchableOpacity onPress={handleCommentPress}>
            <Text style={styles.commentCount}>
              {comments.length > 0 ? `댓글 ${comments.length}개` : "댓글 작성"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 댓글 작성 모달 */}
      <CommentModal
        visible={isCommentModalVisible}
        onClose={handleCloseCommentModal}
        onSubmit={(text) => {
          handleAddComment(text);
          handleCloseCommentModal();
        }}
      />

      {/* 댓글 목록 모달 */}
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
