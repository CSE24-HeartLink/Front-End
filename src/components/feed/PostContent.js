// components/feed/PostContent.js
import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth - 64; // 좌우 패딩 32 제외

const PostContent = ({ content, image }) => {
  const renderImage = () => {
    // AI 더미 이미지인 경우
    if (typeof image === "number") {
      return <Image source={image} style={styles.image} />;
    }
    // URI로 전달된 이미지인 경우
    if (typeof image === "string") {
      return <Image source={{ uri: image }} style={styles.image} />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.content,
          image ? styles.contentWithImage : styles.contentWithoutImage,
        ]}
      >
        {content}
      </Text>
      {image && renderImage()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 8, //16->8로 수정
  },
  content: {
    fontFamily: "Pretendard",
    fontSize: 16,
    lineHeight: 19,
    color: Colors.darkRed20,
  },
  contentWithImage: {
    marginBottom: 16,
  },
  contentWithoutImage: {
    marginBottom: 0,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
    resizeMode: "cover",
  },
});

export default PostContent;
