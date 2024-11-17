import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../../constants/colors";
import useMyPageStore from "../../store/MypageStore";
import useAuthStore from "../../store/authStore";

const ProfileCard = ({ onPress }) => {
  const { userProfile } = useMyPageStore();
  const { user } = useAuthStore(); // AuthStore에서 사용자 정보 가져오기

  return (
    <TouchableOpacity style={styles.profileCard} onPress={onPress}>
      <View style={styles.headerRow}>
        <Image source={userProfile.profileImage} style={styles.profileImage} />
        <Text style={styles.nameText}>{user?.nickname || "사용자"}</Text>
        <Icon name="chevron-right" size={24} color={Colors.Gray40} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.introText}>
          총 작성한 게시글 수 {userProfile.postCount}개
        </Text>
        <Text style={styles.introText}>클로이 레벨{userProfile.cloiLevel}</Text>
        <Text style={styles.introText}>
          {userProfile.streakDays}일 연속 게시글 업로드🔥
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: Colors.lightBeige,
    borderRadius: 16,
    padding: 24,
    width: "100%",
    height: 217,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 24,
    marginRight: 8,
  },
  nameText: {
    fontSize: 22,
    color: Colors.gray50,
    fontFamily: "Pretendard",
    fontWeight: "700",
    flex: 1,
    marginLeft: 8,
  },
  textContainer: {
    marginTop: 4,
  },
  introText: {
    fontSize: 18,
    color: Colors.gray50,
    fontFamily: "Pretendard",
    fontWeight: "500",
    marginBottom: 8,
  },
});

export default ProfileCard;
