// CLOiScreen.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../constants/colors";

import ProgressBar from "../components/ui/ProgressBar";
import SpeechBubble from "../components/ui/SpeechBubble";
import useCLOiStore from "../store/CLOiStore";
import CLOiLv1 from "../../assets/images/CLOiLv1.png";
import CLOiLv2 from "../../assets/images/CLOiLv2.png";
import CLOiLv3 from "../../assets/images/CLOiLv3.png";
import CLOiLv4 from "../../assets/images/CLOiLv4.png";
import CLOiLv5 from "../../assets/images/CLOiLv5.png";
import CLOiBackground from "../../assets/images/CLOiBackground.png";
import ChatbotButton from "../../assets/images/ChatbotButton.png";

import CLOiRenameModal from "../components/modals/CLOiRenameModal";
import useAuthStore from "../store/authStore"; // 추가: authStore import

// CLOiScreen.js
const CLOiScreen = () => {
  const navigation = useNavigation();
  const {
    name,
    level,
    message,
    showInfo,
    isRenameModalVisible,
    isLoading,
    appearance,
    progress,
    fetchCloiInfo,
    checkGrowth,
    setRenameModalVisible,
    handleRename,
    toggleInfo,
  } = useCLOiStore();

  const getUserId = useAuthStore((state) => state.getUserId);
  const userId = getUserId();

  console.log("CLOiScreen - Current userId:", userId); // 로그 추가

  useEffect(() => {
    const initCLOi = async () => {
      if (userId) {
        console.log("Initializing CLOi for userId:", userId); // 로그 추가
        try {
          await fetchCloiInfo(userId);
          await checkGrowth(userId);
        } catch (error) {
          console.error("Error initializing CLOi:", error);
        }
      }
    };

    initCLOi();
  }, [userId]);

  // 사용자가 글을 작성할 때마다 성장 체크
  useFocusEffect(
    React.useCallback(() => {
      const updateGrowth = async () => {
        if (userId) {
          console.log("Checking growth on focus for userId:", userId); // 로그 추가
          try {
            await checkGrowth(userId);
          } catch (error) {
            console.error("Error checking growth:", error);
          }
        }
      };

      updateGrowth();
    }, [userId])
  );

  const handleProfilePress = () => {
    setRenameModalVisible(true);
  };

  const handleRenameClose = () => {
    setRenameModalVisible(false);
  };

  const handleRenameSubmit = (newName) => {
    handleRename(userId, newName);
  };

  const navigateToChatbot = (shouldNavigate) => {
    if (shouldNavigate) {
      navigation.navigate("ChatbotScreen"); // ChatbotScreen으로 이동
    }
  };

  const getLevelImage = () => {
    const levelImages = {
      1: CLOiLv1,
      2: CLOiLv2,
      3: CLOiLv3,
      4: CLOiLv4,
      5: CLOiLv5,
    };
    return levelImages[Math.min(level, 5)];
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.red20} />
        </View>
      </SafeAreaView>
    );
  }

  console.log("CLOiScreen - Current progress:", progress); // 로그 추가

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.header} onPress={handleProfilePress}>
          <Image source={getLevelImage()} style={styles.profileImage} />
          <Text style={styles.nameText}>{name}</Text>
          <Icon name="chevron-right" size={24} color={Colors.gray40} />
        </TouchableOpacity>

        <View style={styles.cloiWrapper}>
          <View style={styles.cloiContainer}>
            <Image source={CLOiBackground} style={styles.backgroundImage} />
            <Image source={getLevelImage()} style={styles.characterImage} />
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>LV.{level}</Text>
            <View style={styles.progressContainer}>
              <ProgressBar level={level} progress={progress} />
              <TouchableOpacity
                onPress={toggleInfo}
                style={styles.questionButton}
              >
                <Icon name="help-circle" size={24} color={Colors.darkRed20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {showInfo && (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                클로이는 당신의 펫으로서,{"\n"}
                당신의 게시글을 올리는 수에 따라서 성장합니다.{"\n"}
                당신의 소소한 일상을 사람들과 지주 공유하며,{"\n"}
                클로이를 성장시켜 보세요.
              </Text>
            </View>
          )}
          <SpeechBubble message={message || "안녕하세요!"} />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigateToChatbot(true)}
        >
          <Image source={ChatbotButton} style={styles.addButtonImage} />
        </TouchableOpacity>

        <CLOiRenameModal
          visible={isRenameModalVisible}
          onClose={handleRenameClose}
          onConfirm={handleRenameSubmit}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    backgroundColor: Colors.primaryBeige,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: Colors.lightBeige,
    padding: 16,
    borderRadius: 16,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  nameText: {
    fontSize: 20,
    color: Colors.gray50,
    fontFamily: "Pretendard",
    fontWeight: "700",
    flex: 1,
    marginLeft: 8,
  },
  cloiWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  cloiContainer: {
    width: 360,
    height: 360,
    backgroundColor: Colors.lightBeige,
    borderRadius: 16,
    paddingTop: 24,
    alignItems: "center",
  },
  backgroundImage: {
    width: 360,
    height: 360,
    position: "absolute",
  },
  characterImage: {
    width: 360,
    height: 360,
    resizeMode: "contain",
  },
  progressSection: {
    width: "100%",
    marginVertical: 16,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  levelText: {
    fontSize: 20,
    fontFamily: "Pretendard",
    fontWeight: "600",
    color: Colors.pink20,
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionButton: {
    marginLeft: 8,
  },
  bottomContainer: {
    position: "relative",
    width: "100%",
  },
  infoBox: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 16,
    borderRadius: 8,
  },
  infoText: {
    color: Colors.white,
    fontFamily: "Pretendard",
    fontSize: 14,
    lineHeight: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 60,
    right: 20,
  },
  addButtonImage: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
});

export default CLOiScreen;
