import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useFeedStore from "../../store/feedStore";
import AccountInfo from "./AccountInfo";
import PostContent from "./PostContent";
import ReactionButtons from "./ReactionButtons";
import Colors from "../../constants/colors";

const FeedItem = ({ feedId }) => {
  const navigation = useNavigation();
  const feeds = useFeedStore((state) => state.feeds);
  const feed = feeds.find((f) => f.id === feedId);

  const selectedReaction = useFeedStore(
    (state) => state.selectedReactions[feedId]
  );
  const toggleReaction = useFeedStore((state) => state.toggleReaction);
  const deleteFeed = useFeedStore((state) => state.deleteFeed);

  if (!feed) {
    console.log('No feed found for id:', feedId);
    return null;
  }

  const handleDelete = () => {
    Alert.alert("피드 삭제", "정말 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        onPress: () => deleteFeed(feedId),
        style: "destructive",
      },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate("FeedEdit", { feedId });
  };

  return (
    <View style={styles.container}>
      <AccountInfo
        profileImage={feed.profileImage}
        nickname={feed.nickname}
        createdAt={feed.createdAt}
        isMyPost={feed.isMyPost}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <PostContent content={feed.content} image={feed.image} />
      <ReactionButtons
        selectedReaction={selectedReaction}
        onSelectReaction={(reactionType) =>
          toggleReaction(feedId, reactionType)
        }
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
});

export default FeedItem;