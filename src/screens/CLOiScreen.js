import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
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
import RenameModal from "../components/modals/RenameModal";

// CLOi 캐릭터 메인 화면 컴포넌트
const CLOiScreen = () => {
  // CLOi 상태 관리를 위한 커스텀 훅에서 필요한 상태와 함수들을 가져옴
  const {
    name, // CLOi 이름
    postCount, // 사용자가 작성한 게시글 수
    showInfo, // 정보 표시 여부
    isRenameModalVisible, // 이름 변경 모달 표시 여부
    level, // 현재 레벨
    setRenameModalVisible, // 이름 변경 모달 표시 상태 설정 함수
    handleRename, // 이름 변경 처리 함수
    toggleInfo, // 정보 표시 토글 함수
  } = useCLOiStore(); //zustand에서 가져온 거

  // 프로필 영역 클릭 시 이름 변경 모달을 표시하는 함수
  const handleProfilePress = () => {
    setRenameModalVisible(true);
  };

  // 이름 변경 모달 닫기 함수
  const handleRenameClose = () => {
    setRenameModalVisible(false);
  };

  // 현재 레벨에 맞는 CLOi 이미지를 반환하는 함수
  const getLevelImage = () => {
    const levelImages = {
      1: CLOiLv1,
      2: CLOiLv2,
      3: CLOiLv3,
      4: CLOiLv4,
      5: CLOiLv5,
    };
    return levelImages[Math.min(level(), 5)]; // 최대 레벨 5로 제한
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 상단 프로필 섹션 */}
        <TouchableOpacity style={styles.header} onPress={handleProfilePress}>
          <Image source={getLevelImage()} style={styles.profileImage} />
          <Text style={styles.nameText}>{name}</Text>
          <Icon name="chevron-right" size={24} color={Colors.gray40} />
        </TouchableOpacity>

        {/* CLOi 캐릭터 표시 영역 */}
        <View style={styles.cloiWrapper}>
          <View style={styles.cloiContainer}>
            <Image source={CLOiBackground} style={styles.backgroundImage} />
            <Image source={getLevelImage()} style={styles.characterImage} />
          </View>
        </View>

        {/* 레벨 및 진행률 표시 섹션 */}
        <View style={styles.progressSection}>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>LV.{level()}</Text>
            <View style={styles.progressContainer}>
              <ProgressBar level={level()} progress={postCount} />
              <TouchableOpacity
                onPress={toggleInfo}
                style={styles.questionButton}
              >
                <Icon name="help-circle" size={24} color={Colors.darkRed20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 하단 정보 박스 및 대화 말풍선 */}
        <View style={styles.bottomContainer}>
          {/* 도움말 정보 박스 (토글 시 표시) */}
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
          {/* CLOi 대화 말풍선 */}
          <SpeechBubble
            message="안녕하세요. 오늘 비가 온다고 하네요.
          우산 꼭 챙기세요!"
          />
        </View>

        {/* 이름 변경 모달 */}
        <RenameModal
          visible={isRenameModalVisible}
          onClose={handleRenameClose}
          onConfirm={handleRename}
        />
      </View>
    </SafeAreaView>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  // 최상위 SafeAreaView 스타일
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  // 메인 컨테이너 스타일
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    backgroundColor: Colors.primaryBeige,
  },
  // 상단 헤더 프로필 영역 스타일
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: Colors.lightBeige,
    padding: 16,
    borderRadius: 16,
  },
  // 프로필 이미지 스타일
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  // 이름 텍스트 스타일
  nameText: {
    fontSize: 20,
    color: Colors.gray50,
    fontFamily: "Pretendard",
    fontWeight: "700",
    flex: 1,
    marginLeft: 8,
  },
  // CLOi 캐릭터 래퍼 스타일
  cloiWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  // CLOi 캐릭터 컨테이너 스타일
  cloiContainer: {
    width: 360,
    height: 360,
    backgroundColor: Colors.lightBeige,
    borderRadius: 16,
    paddingTop: 24,
    alignItems: "center",
  },
  // 배경 이미지 스타일
  backgroundImage: {
    width: 360,
    height: 360,
    position: "absolute",
  },
  // 캐릭터 이미지 스타일
  characterImage: {
    width: 360,
    height: 360,
    resizeMode: "contain",
  },
  // 진행률 섹션 스타일
  progressSection: {
    width: "100%",
    marginVertical: 16,
  },
  // 레벨 컨테이너 스타일
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  // 레벨 텍스트 스타일
  levelText: {
    fontSize: 20,
    fontFamily: "Pretendard",
    fontWeight: "600",
    color: Colors.pink20,
    marginRight: 16,
  },
  // 진행률 컨테이너 스타일
  progressContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // 도움말 버튼 스타일
  questionButton: {
    marginLeft: 8,
  },
  // 하단 컨테이너 스타일
  bottomContainer: {
    position: "relative",
    width: "100%",
  },
  // 정보 박스 스타일
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
  // 정보 텍스트 스타일
  infoText: {
    color: Colors.white,
    fontFamily: "Pretendard",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default CLOiScreen;
