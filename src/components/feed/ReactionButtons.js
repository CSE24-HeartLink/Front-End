import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const REACTIONS = [
  { type: "smile", emoji: "😊" },
  { type: "love", emoji: "🥰" },
  { type: "cry", emoji: "😢" },
  { type: "afraid", emoji: "😱" },
  { type: "congrats", emoji: "🥳" },
  { type: "angry", emoji: "😡" },
];

const ReactionButtons = ({ selectedReaction, onSelectReaction }) => {
  return (
    <View style={styles.container}>
      {REACTIONS.map((reaction) => (
        <TouchableOpacity
          key={reaction.type}
          onPress={() => onSelectReaction(reaction.type)}
          style={styles.reactionButton}
        >
          <Text
            style={[
              styles.reactionEmoji,
              { opacity: selectedReaction === reaction.type ? 1 : 0.5 },
            ]}
          >
            {reaction.emoji}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  reactionButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  reactionEmoji: {
    fontSize: 30,
  },
});

export default ReactionButtons;
