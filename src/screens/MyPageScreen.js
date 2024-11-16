import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../constants/colors";
import ProfileCard from "../components/ui/ProfileCard";
import RenameModal from "../components/modals/RenameModal";
import useMyPageStore from "../store/MypageStore";

// 마이페이지 내 메뉴 버튼 컴포넌트
// props:
// - title: 버튼에 표시될 텍스트
// - onPress: 버튼 클릭 시 실행될 함수
const ToMeButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      {/* 오른쪽 화살표 아이콘 */}
      <Icon name="chevron-right" size={24} color={Colors.gray40} />
    </TouchableOpacity>
  );
};

// 마이페이지 메인 스크린 컴포넌트
const MyPageScreen = () => {
  // 마이페이지 관련 상태와 함수들을 스토어에서 가져오기
  const { isRenameModalVisible, setRenameModalVisible, handleRename } =
    useMyPageStore();

  // 프로필 카드 클릭 시 이름 변경 모달 표시
  const handleProfilePress = () => {
    setRenameModalVisible(true);
  };

  // 이름 변경 모달 닫기
  const handleRenameClose = () => {
    setRenameModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 프로필 카드 섹션 */}
        <ProfileCard onPress={handleProfilePress} />

        {/* 메뉴 버튼 컨테이너 */}
        <View style={styles.buttonContainer}>
          {/* 내 게시글 버튼 */}
          <ToMeButton
            title="내 게시글"
            onPress={() => console.log("내 게시글 클릭")}
          />
          {/* 내 앨범 버튼 */}
          <ToMeButton
            title="내 앨범"
            onPress={() => console.log("내 앨범 클릭")}
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
  // SafeAreaView 스타일
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
  // 메뉴 버튼 컨테이너 스타일
  buttonContainer: {
    marginTop: 16,
    gap: 8, // 버튼 사이 간격
  },
  // 개별 메뉴 버튼 스타일
  button: {
    backgroundColor: Colors.lightBeige,
    borderRadius: 12,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // 버튼 텍스트 스타일
  buttonText: {
    fontSize: 20,
    color: Colors.gray50,
    fontFamily: "Pretendard",
    fontWeight: "500",
  },
});

export default MyPageScreen;
