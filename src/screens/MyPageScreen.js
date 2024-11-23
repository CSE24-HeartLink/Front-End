import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

import ProfileCard from "../components/ui/ProfileCard";
import LogoutModal from "../components/modals/LogoutModal";
import RenameModal from "../components/modals/RenameModal";

import Colors from "../constants/colors";
import useMyPageStore from "../store/profileStore";
import useAuthStore from "../store/authStore";
import authApi from "../api/authApi";

const ToMeButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      <Icon name="chevron-right" size={24} color={Colors.Gray40} />
    </TouchableOpacity>
  );
};

const MyPageScreen = () => {
  const getUserId = useAuthStore((state) => state.getUserId);
  const userId = getUserId();

  const navigation = useNavigation();
  const { isRenameModalVisible, setRenameModalVisible, handleRename } =
    useMyPageStore();
  const { userToken, signOut } = useAuthStore();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleProfilePress = () => {
    setRenameModalVisible(true);
  };

  const handleRenameClose = () => {
    setRenameModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      console.log("Logout attempt with token:", userToken); // 토큰 확인
      await authApi.logout(userToken);
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutModalVisible(false);
      Alert.alert("알림", "로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProfileCard userId={userId} onPress={handleProfilePress} />
        <View style={styles.buttonContainer}>
          <ToMeButton
            title="내 게시글"
            onPress={() =>
              navigation.navigate("MainTab", {
                screen: "피드",
                params: { selectedGroupId: "my" },
              })
            }
          />
          <ToMeButton
            title="내 앨범"
            onPress={() =>
              navigation.navigate("MainTab", {
                screen: "앨범",
                params: { selectedGroupId: "my" },
              })
            }
          />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setLogoutModalVisible(true)}
        >
          <Text style={styles.logoutButtonText}>로그아웃</Text>
        </TouchableOpacity>

        <RenameModal
          visible={isRenameModalVisible}
          onClose={handleRenameClose}
          onConfirm={handleRename}
        />

        <LogoutModal
          visible={isLogoutModalVisible}
          onClose={() => setLogoutModalVisible(false)}
          onConfirm={handleLogout}
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
  buttonContainer: {
    marginTop: 16,
    gap: 8,
  },
  button: {
    backgroundColor: Colors.lightBeige,
    borderRadius: 12,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 20,
    color: Colors.gray50,
    fontFamily: "Pretendard",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: Colors.gray20,
    borderRadius: 12,
    padding: 16,
    marginTop: "auto",
    marginBottom: 32,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    color: Colors.gray50,
    fontFamily: "Pretendard",
    fontWeight: "500",
  },
});

export default MyPageScreen;
