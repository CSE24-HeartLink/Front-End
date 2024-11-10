import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../../constants/colors";
import { DUMMY_FRIENDS } from "../../constants/dummydata";

const ProfileCard = ({ onPress }) => {
  const currentUser = DUMMY_FRIENDS.find(
    (friend) => friend.nickname === "다연이"
  );

  return (
    <TouchableOpacity style={styles.profileCard} onPress={onPress}>
      <View style={styles.headerRow}>
        <Image source={currentUser.profileImage} style={styles.profileImage} />
        <Text style={styles.nameText}>{currentUser.nickname}</Text>
        <Icon name="chevron-right" size={24} color={Colors.Gray40} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.introText}>총 작성한 게시글 수 n개</Text>
        <Text style={styles.introText}>클로이 레벨3</Text>
        <Text style={styles.introText}>10일 연속 게시글 업로드🔥</Text>
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
