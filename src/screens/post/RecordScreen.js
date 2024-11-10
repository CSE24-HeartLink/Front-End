import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // 뒤로가기 아이콘을 위한 임포트

import RecordingPic from "../../../assets/images/recording.png"; // 녹음 시각화 이미지
import MicIcon from "../../../assets/images/icons/MicIcon.svg"; // SVG 아이콘
import BigCircleBackground from "../../components/ui/BigCircleBackground";
import Colors from "../../constants/colors";

const RecordScreen = () => {
  const navigation = useNavigation();

  const handleNavigateToWritingScreen = () => {
    navigation.navigate("WritingScreen");
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 아이콘 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={24} color={Colors.primaryBeige} />
      </TouchableOpacity>

      <Text style={styles.title}>모두 완료되면 버튼을 다시 눌러주세요</Text>

      {/* 음성 녹음 버튼 */}
      <View style={styles.circleContainer}>
        <TouchableOpacity onPress={handleNavigateToWritingScreen}>
          <BigCircleBackground>
            <MicIcon width={80} height={80} />
          </BigCircleBackground>
        </TouchableOpacity>
      </View>

      <Text style={styles.recordingText}>듣고있어요.</Text>

      {/* 녹음 시각화 이미지 */}
      <Image source={RecordingPic} style={styles.recordingImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray40, // 배경색 반전
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  title: {
    color: Colors.primaryBeige, // 반전된 색상
    fontFamily: "Pretendard-SemiBold",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 40,
  },
  circleContainer: {
    marginBottom: 8,
  },
  recordingText: {
    color: Colors.primaryBeige, // 반전된 색상
    fontFamily: "Pretendard-Medium",
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 16,
  },
  recordingImage: {
    width: "80%",
    height: 110,
    resizeMode: "contain",
    marginTop: 20,
  },
});

export default RecordScreen;
