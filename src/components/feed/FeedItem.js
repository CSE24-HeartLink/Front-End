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
  const feeds = useFeedStore((state) => state.feeds);
  const feed = feeds.find((f) => f.id === feedId);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isCommentListVisible, setIsCommentListVisible] = useState(false);
  const [comments, setComments] = useState([]);

  const selectedReaction = useFeedStore(
    (state) => state.selectedReactions[feedId]
  );
  const toggleReaction = useFeedStore((state) => state.toggleReaction);
  const deleteFeed = useFeedStore((state) => state.deleteFeed);

  if (!feed) return null;

  const handleDelete = () => {
    deleteFeed(feedId);
  };

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

  const handleCommentPress = () => {
    if (comments.length > 0) {
      handleOpenCommentList();
    } else {
      handleOpenCommentModal();
    }
  };

  return (
    <View style={styles.container}>
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
      <PostContent content={feed.content} image={feed.image} />
      <ReactionButtons
        selectedReaction={selectedReaction}
        onSelectReaction={(reactionType) =>
          toggleReaction(feedId, reactionType)
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
