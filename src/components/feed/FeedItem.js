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

// FeedItem 컴포넌트: 개별 피드 게시물을 표시
// props:
// - feedId: 피드의 고유 식별자
const FeedItem = ({ feedId }) => {
  // 네비게이션 훅
  const navigation = useNavigation();

  // Zustand 스토어에서 필요한 상태와 액션들을 가져옴
  const feeds = useFeedStore((state) => state.feeds); // 전체 피드 목록
  const feed = feeds.find((f) => f.id === feedId); // 현재 feedId에 해당하는 피드
  const selectedReaction = useFeedStore(
    // 현재 피드의 선택된 리액션
    (state) => state.selectedReactions[feedId]
  );
  const toggleReaction = useFeedStore((state) => state.toggleReaction); // 리액션 토글 함수
  const deleteFeed = useFeedStore((state) => state.deleteFeed); // 피드 삭제 함수

  // 로컬 상태 관리
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false); // 댓글 작성 모달 표시 여부
  const [isCommentListVisible, setIsCommentListVisible] = useState(false); // 댓글 목록 모달 표시 여부
  const [comments, setComments] = useState([]); // 댓글 목록

  // 피드가 존재하지 않으면 렌더링하지 않음
  if (!feed) return null;

  // 피드 삭제 핸들러
  const handleDelete = () => {
    deleteFeed(feedId);
  };

  // 새 댓글 추가 핸들러
  const handleAddComment = (text) => {
    if (text.trim()) {
      // 새 댓글 객체 생성
      const newComment = {
        id: Date.now().toString(), // 유니크 ID 생성
        text: text.trim(), // 공백 제거된 댓글 내용
        author: "다연이", // 작성자 (임시)
        createdAt: new Date(), // 작성 시간
      };

      // 댓글 목록에 새 댓글 추가
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
  // 댓글이 있으면 목록을 보여주고, 없으면 작성 모달을 표시
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
        onEdit={() =>
          navigation.navigate("WritingScreen", {
            feedId: feed.id,
            initialContent: feed.content,
            selectedGroup: feed.group,
            image: feed.image,
          })
        }
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

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden", // 자식 요소가 컨테이너를 벗어나지 않도록 설정
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
    gap: 12, // 요소들 사이의 간격
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
