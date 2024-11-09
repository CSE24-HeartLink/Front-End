import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; // useRoute 추가
import Icon from "react-native-vector-icons/Ionicons"; // 뒤로가기 아이콘
import TopFilterButton from "../components/ui/TopFilterButton";
import AIImageIcon from "../../assets/images/icons/AIImageIcon.svg"; // SVG 아이콘
import CameraIcon from "../../assets/images/icons/CameraIcon.svg"; // SVG 아이콘
import MiddleCircleBackground from "../components/ui/MiddleCircleBackground";
import Colors from "../constants/colors";

const WritingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // useRoute 추가
  const [selectedGroup, setSelectedGroup] = useState("전체"); // 기본값을 '전체'로 설정
  const [textInputValue, setTextInputValue] = useState("");

  // GroupSelectScreen에서 선택된 그룹을 반영
  useEffect(() => {
    if (route.params?.selectedGroup) {
      setSelectedGroup(route.params.selectedGroup);
    }
  }, [route.params?.selectedGroup]);

  const handleGroupSelect = () => {
    navigation.navigate("GroupSelectScreen", {
      fromScreen: "WritingScreen",
    });
  };

  const handleSendPost = () => {
    // 여기서 글을 보내고 MainFeedScreen으로 이동
    navigation.navigate("MainFeedScreen", {
      selectedGroup,
      newPost: textInputValue,
    });
  };

  const handleTextChange = (text) => {
    if (text.length <= 500) {
      setTextInputValue(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color={Colors.darkRed20} />
        </TouchableOpacity>
        <TopFilterButton
          getGroupName={() => selectedGroup}
          onPress={handleGroupSelect}
        />
        <TouchableOpacity onPress={handleSendPost} style={styles.sendButton}>
          <Icon name="send" size={24} color={Colors.red20} />
        </TouchableOpacity>
      </View>

      {/* 텍스트 입력 필드 */}
      <View style={styles.textInputContainer}>
        <ScrollView style={styles.scrollView}>
          <TextInput
            style={styles.textInput}
            placeholder="글을 작성해주세요 :)"
            placeholderTextColor={Colors.gray45}
            multiline
            value={textInputValue}
            onChangeText={handleTextChange}
            maxLength={500} // 최대 입력 제한
          />
        </ScrollView>
      </View>

      {/* 하단의 동그란 버튼들 */}
      <View style={styles.circleButtonsContainer}>
        <TouchableOpacity>
          <MiddleCircleBackground>
            <AIImageIcon width={60} height={60} />
            <Text style={styles.circleButtonText}>AI 이미지</Text>
          </MiddleCircleBackground>
        </TouchableOpacity>
        <TouchableOpacity>
          <MiddleCircleBackground>
            <CameraIcon width={60} height={60} />
            <Text style={styles.circleButtonText}>갤러리</Text>
          </MiddleCircleBackground>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
  },
  textInputContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.lightBeige,
    height: 200, // 세로로 더 길게 설정
  },
  scrollView: {
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    color: Colors.darkRed20,
    fontFamily: "Pretendard",
    textAlignVertical: "top", // Android에서 기본적으로 중앙 정렬을 방지하기 위함
  },
  circleButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center", // 가운데로 모으기
    marginTop: 32,
    gap: 40, // 버튼 간의 간격
  },
  circleButtonText: {
    textAlign: "center",
    marginTop: 8,
    fontFamily: "Pretendard",
    fontSize: 14,
    color: Colors.gray45,
  },
});

export default WritingScreen;
