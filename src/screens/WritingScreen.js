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
import Colors from "../constants/colors";
import useFeedStore from "../store/feedStore";
import { GROUPS } from "../constants/dummydata";

const screenWidth = Dimensions.get("window").width;
const imageContainerWidth = screenWidth - 32;
const imageContainerHeight = 200;

const WritingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [textInputValue, setTextInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addFeed = useFeedStore((state) => state.addFeed);
  const updateFeed = useFeedStore((state) => state.updateFeed);

  // 수정 모드 정보를 상태로 관리
  const [editMode, setEditMode] = useState({
    isEdit: false,
    feedId: null,
  });

  // 초기 마운트 시 수정 모드 체크
  useEffect(() => {
    console.log("WritingScreen initial mount:", route.params);

    if (route.params?.feedId) {
      setEditMode({
        isEdit: true,
        feedId: route.params.feedId,
      });

      if (route.params.initialContent) {
        setTextInputValue(route.params.initialContent);
      }
      if (route.params.selectedGroup) {
        setSelectedGroup(route.params.selectedGroup);
      }
      if (route.params.image) {
        setSelectedImage(route.params.image);
      }
    } else {
      // 새 글 작성 모드
      if (route.params?.selectedGroupId) {
        setSelectedGroup(route.params.selectedGroupId);
      } else if (route.params?.currentGroupId) {
        setSelectedGroup(route.params.currentGroupId);
      }
    }
  }, []); // 마운트 시에만 실행

  // 그룹 선택 후 돌아올 때 업데이트
  useEffect(() => {
    console.log("Group selection update:", {
      selectedGroupId: route.params?.selectedGroupId,
      currentParams: route.params,
      editMode,
    });

    if (route.params?.selectedGroupId) {
      setSelectedGroup(route.params.selectedGroupId);
    }
  }, [route.params?.selectedGroupId]);

  // 갤러리 권한 요청
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
    console.log("Navigating to group select:", {
      currentSelected: selectedGroup,
      editMode,
      routeParams: route.params,
    });

    navigation.navigate("WritingGroupSelect", {
      fromScreen: "WritingScreen",
      currentSelected: selectedGroup,
      // 수정 모드일 때의 정보 유지
      feedId: editMode.feedId,
      isEditMode: editMode.isEdit,
      initialContent: textInputValue,
      image: selectedImage,
      // 원래의 route.params도 전달
      ...route.params,
    });
  };

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
        aspect: [1, 1],
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
    console.log("WritingScreen - handleSendPost:", {
      editMode,
      selectedGroup,
      textInputValue,
    });

    if (!textInputValue.trim() && !selectedImage) {
      Alert.alert("알림", "텍스트나 이미지를 입력해주세요.");
      return;
    }

    try {
      if (editMode.isEdit) {
        // 수정 모드
        updateFeed(editMode.feedId, {
          content: textInputValue,
          image: selectedImage,
          group: selectedGroup,
        });
        Alert.alert("알림", "게시글이 수정되었습니다.");
      } else {
        // 새 글 작성
        const newFeed = {
          id: Date.now().toString(),
          userId: "user1",
          nickname: "다연이",
          profileImage: require("../../assets/images/Smile.png"),
          content: textInputValue,
          image: selectedImage,
          group: selectedGroup,
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
        addFeed(newFeed);
      }

      navigation.navigate("MainTab", {
        screen: "피드",
        params: {
          selectedGroupId: selectedGroup,
          selectedFeedId: editMode.isEdit ? editMode.feedId : undefined,
        },
      });
    } catch (error) {
      console.error("Error sending post:", error);
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
          selectedGroup={selectedGroup}
        />
        <TouchableOpacity onPress={handleSendPost} style={styles.sendButton}>
          {editMode.isEdit ? (
            <Text style={styles.completeButtonText}>완료</Text>
          ) : (
            <Icon name="send" size={24} color={Colors.red20} />
          )}
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
  completeButtonText: {
    color: Colors.red20,
    fontSize: 16,
    fontFamily: "Pretendard",
    fontWeight: "600",
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
    width: imageContainerHeight,
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