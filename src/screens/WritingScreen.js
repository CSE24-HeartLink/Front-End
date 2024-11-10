// screens/WritingScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import TopFilterButton from "../components/ui/TopFilterButton";
import AIImageIcon from "../../assets/images/icons/AIImageIcon.svg";
import CameraIcon from "../../assets/images/icons/CameraIcon.svg";
import MiddleCircleBackground from "../components/ui/MiddleCircleBackground";
import AIdummy from "../../assets/images/AIdummy.png";
import Colors from "../constants/colors";
import useFeedStore from "../store/feedStore";
import { GROUPS } from "../constants/dummydata";

const screenWidth = Dimensions.get("window").width;
const imageContainerWidth = screenWidth - 32; // 양쪽 마진 16씩 제외
const imageContainerHeight = 200; // 고정된 높이

const WritingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [textInputValue, setTextInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addFeed = useFeedStore((state) => state.addFeed);

  // MainFeedScreen에서 선택된 그룹 정보 받아오기
  useEffect(() => {
    // WritingGroupSelect에서 선택된 그룹 정보 받기
    if (route.params?.selectedGroupId) {
      setSelectedGroup(route.params.selectedGroupId);
    }
    // MainFeedScreen에서 전달된 그룹 정보 받기
    else if (route.params?.currentGroupId) {
      setSelectedGroup(route.params.currentGroupId);
    }
  }, [route.params?.selectedGroupId, route.params?.currentGroupId]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("권한 필요", "갤러리 접근 권한이 필요합니다.");
        }
      }
    })();
  }, []);

  const handleGroupSelect = () => {
    navigation.navigate("WritingGroupSelect", {
      fromScreen: "WritingScreen",
      currentSelected: selectedGroup,
    });
  };

  // AI 이미지 생성 (더미 데이터)
  const handleAIImageGenerate = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setSelectedImage(require("../../assets/images/AIdummy.png"));
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      Alert.alert("오류", "AI 이미지 생성에 실패했습니다.");
      setIsLoading(false);
    }
  };

  const handleGallerySelect = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // 정사각형으로 크롭
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("오류", "이미지를 선택하는 중 오류가 발생했습니다.");
    }
  };

  const handleSendPost = () => {
    if (!textInputValue.trim() && !selectedImage) {
      Alert.alert("알림", "텍스트나 이미지를 입력해주세요.");
      return;
    }

    try {
      const newFeed = {
        id: Date.now().toString(),
        userId: "user1", //추후 수정
        nickname: "다연이", //추후 수정
        profileImage: require("../../assets/images/Smile.png"),
        content: textInputValue,
        image: selectedImage,
        group: selectedGroup, // 선택된 그룹 ID 사용
        createdAt: new Date(),
        reactions: [
          { type: "grinning", count: 0, users: [] },
          { type: "heart-eyes", count: 0, users: [] },
          { type: "crying", count: 0, users: [] },
          { type: "scream", count: 0, users: [] },
          { type: "party", count: 0, users: [] },
          { type: "angry", count: 0, users: [] },
        ],
        isMyPost: true,
      };

      console.log("Sending post with group:", selectedGroup); // 디버깅용
      addFeed(newFeed);

      navigation.navigate("MainTab", {
        screen: "피드",
        params: { selectedGroupId: selectedGroup },
      });
    } catch (error) {
      console.error("Error sending post:", error); // 디버깅용
      Alert.alert("오류", "게시글 업로드에 실패했습니다.");
    }
  };

  const handleTextChange = (text) => {
    if (text.length <= 500) {
      setTextInputValue(text);
    }
  };

  const getGroupName = () => {
    const group = GROUPS.find((g) => g.id === selectedGroup);
    console.log("Current selected group:", selectedGroup); // 디버깅용
    console.log("Found group:", group); // 디버깅용
    return group ? group.name : "전체";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color={Colors.darkRed20} />
        </TouchableOpacity>
        <TopFilterButton
          getGroupName={getGroupName}
          onPress={handleGroupSelect}
        />
        <TouchableOpacity onPress={handleSendPost} style={styles.sendButton}>
          <Icon name="send" size={24} color={Colors.red20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="글을 작성해주세요 :)"
            placeholderTextColor={Colors.gray45}
            multiline
            value={textInputValue}
            onChangeText={handleTextChange}
            maxLength={500}
          />
        </View>

        {selectedImage && (
          <View
            style={[styles.imagePreviewContainer, styles.textInputContainer]}
          >
            <View style={styles.imageWrapper}>
              <Image
                source={
                  typeof selectedImage === "string"
                    ? { uri: selectedImage }
                    : selectedImage
                }
                style={styles.imagePreview}
              />
            </View>
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => setSelectedImage(null)}
            >
              <Icon name="close-circle" size={24} color={Colors.darkRed20} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.circleButtonsContainer}>
        <TouchableOpacity onPress={handleAIImageGenerate} disabled={isLoading}>
          <MiddleCircleBackground>
            <AIImageIcon width={60} height={60} />
            <Text style={styles.circleButtonText}>
              {isLoading ? "생성 중..." : "AI 이미지"}
            </Text>
          </MiddleCircleBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGallerySelect}>
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
  scrollView: {
    flex: 1,
  },
  textInputContainer: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.lightBeige,
    minHeight: 200,
  },
  textInput: {
    fontSize: 16,
    color: Colors.darkRed20,
    fontFamily: "Pretendard",
    textAlignVertical: "top",
  },
  imagePreviewContainer: {
    margin: 16,
    height: imageContainerHeight,
    backgroundColor: Colors.lightBeige,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: imageContainerHeight, // 정사각형 유지
    height: imageContainerHeight,
    resizeMode: "cover",
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: Colors.lightBeige,
    borderRadius: 12,
  },
  circleButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
    gap: 40,
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
