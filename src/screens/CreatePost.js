import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BigCircleBackground from "../components/ui/BigCircleBackground";
import MicIcon from "../../assets/images/icons/MicIcon.svg"; // SVG 아이콘
import Colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // 아이콘 사용을 위한 임포트

const CreatePost = () => {
  const navigation = useNavigation();

  const handleVoiceRecording = () => {
    navigation.navigate("RecordScreen"); // RecordScreen으로 이동
  };

  const handleTextWriting = () => {
    navigation.navigate("WritingScreen"); // WritingScreen으로 이동
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 아이콘 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={24} color={Colors.darkRed20} />
      </TouchableOpacity>

      <Text style={styles.title}>버튼을 눌러 음성으로 글쓰기</Text>

      {/* 음성 녹음 버튼 */}
      <View style={styles.circleContainer}>
        <TouchableOpacity onPress={handleVoiceRecording}>
          <BigCircleBackground>
            <MicIcon width={80} height={80} />
          </BigCircleBackground>
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>또는</Text>

      {/* 텍스트로 글쓰기 버튼 */}
      <TouchableOpacity style={styles.textButton} onPress={handleTextWriting}>
        <Text style={styles.textButtonText}>텍스트로 글쓰기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightBeige,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  title: {
    color: Colors.gray45,
    fontFamily: "Pretendard-SemiBold",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 40,
  },
  circleContainer: {
    marginBottom: 8,
  },
  orText: {
    color: Colors.gray45,
    fontFamily: "Pretendard-Medium",
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 16,
    marginBottom: 40,
  },
  textButton: {
    backgroundColor: Colors.primaryBeige,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 48,
  },
  textButtonText: {
    color: Colors.gray45,
    fontFamily: "Pretendard-Medium",
    fontSize: 24,
    fontWeight: "600",
  },
});

export default CreatePost;
