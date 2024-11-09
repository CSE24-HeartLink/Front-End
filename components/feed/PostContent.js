//글과 사진을 표시하는 컴포넌트입니다.
//사진이 있을 경우 표시하고, 없을 경우에는 글만 보여줍니다.

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const PostContent = ({ content, image }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  content: {
    fontFamily: "Pretendard",
    fontSize: 16,
    lineHeight: 19,
    color: Colors.darkRed20,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    aspectRatio: 1.1,
    borderRadius: 8,
  },
});

export default PostContent;
