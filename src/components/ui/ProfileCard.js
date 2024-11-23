import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../../constants/colors";

import useProfileStore from "../../store/profileStore";
import useAuthStore from "../../store/authStore";
import useFeedStore from "../../store/feedStore";
import useCLOiStore from "../../store/CLOiStore";

const ProfileCard = ({ onPress, userId }) => {
  const { userProfile, fetchUserStats } = useProfileStore();
  const { user } = useAuthStore();
  const { setSelectedGroup } = useFeedStore();
  const { fetchCloiInfo, level } = useCLOiStore();
  // token과 getUserId 추가
  const token = useAuthStore((state) => state.userToken);
  const getUserId = useAuthStore((state) => state.getUserId);

  // displayLevel 선언 추가
  const displayLevel = level ?? 1; // level이 undefined나 null이면 1을 사용

  useEffect(() => {
    const loadData = async () => {
      const currentUserId = getUserId(); // getUserId 함수 사용
      console.log("ProfileCard - Current userId:", currentUserId);

      if (currentUserId) {
        try {
          await setSelectedGroup("my");
          await fetchUserStats();
          await fetchCloiInfo(currentUserId);
        } catch (error) {
          console.error("ProfileCard loadData error:", error);
        }
      }
    };

    if (token) {
      loadData();
    }
  }, [token]);

  // displayLevel을 실제로 사용하도록 변경
  return (
    <TouchableOpacity style={styles.profileCard} onPress={onPress}>
      <View style={styles.headerRow}>
        <Image source={userProfile.profileImage} style={styles.profileImage} />
        <Text style={styles.nameText}>{user?.nickname || "사용자"}</Text>
        <Icon name="chevron-right" size={24} color={Colors.gray40} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.introText}>
          총 작성한 게시글 수 {userProfile.postCount}개
        </Text>
        {/* level 대신 displayLevel 사용 */}
        <Text style={styles.introText}>클로이 레벨 {displayLevel}</Text>
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
