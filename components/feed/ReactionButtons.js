//공감(이모지) 버튼을 표시하는 컴포넌트입니다.
//이모지 버튼을 나열하여 사용자들이 반응할 수 있게 합니다.

import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const REACTIONS = [
  { type: "smile", source: require("../../assets/images/Smile.png") },
  { type: "love", source: require("../../assets/images/Love.png") },
  { type: "cry", source: require("../../assets/images/Cry.png") },
  { type: "afraid", source: require("../../assets/images/Afraid.png") },
  { type: "angry", source: require("../../assets/images/Angry.png") },
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
          <Image
            source={reaction.source}
            style={[
              styles.reactionIcon,
              { opacity: selectedReaction === reaction.type ? 1 : 0.5 },
            ]}
          />
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
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  reactionIcon: {
    width: 24,
    height: 24,
  },
});

export default ReactionButtons;
