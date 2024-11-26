/* import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../constants/colors";

import useProfileStore from "../../store/profileStore";
import useAuthStore from "../../store/authStore";
import useFeedStore from "../../store/feedStore";
import useCLOiStore from "../../store/CLOiStore";
import { profileApi } from "../../api/profileApi";

const ProfileCard = ({ onPress, onLoadData }) => {
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
      const currentUserId = getUserId();
      if (currentUserId) {
        try {
          // setSelectedGroup 제거하고 부모로부터 받은 콜백 사용
          if (onLoadData) {
            await onLoadData(); // 부모에서 setSelectedGroup 처리
          }
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

  const handleImagePress = async () => {
    try {
      // 이미지 선택 권한 확인
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("권한 필요", "갤러리 접근 권한이 필요합니다.");
          return;
        }
      }

      // 이미지 선택
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        try {
          const userId = getUserId();

          // 프로필 이미지 업로드 API 호출
          const response = await profileApi.uploadProfileImage(
            userId,
            result.assets[0].uri,
            userToken
          );

          // 성공적으로 업로드되면 상태 업데이트
          if (response.user && response.user.profileImage) {
            await updateProfileImage(response.user.profileImage);
          }
        } catch (error) {
          console.error("Profile image upload error:", error);
          Alert.alert("오류", "프로필 이미지 업데이트에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("오류", "이미지를 선택하는 중 오류가 발생했습니다.");
    }
  };

  // displayLevel을 실제로 사용하도록 변경
  return (
    <TouchableOpacity style={styles.profileCard} onPress={onPress}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleImagePress}
        >
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View
              style={[styles.profileImage, styles.profileImagePlaceholder]}
            />
          )}
          <View style={styles.imageEditBadge}>
            <Feather name="edit-2" size={12} color={Colors.white} />
          </View>
        </TouchableOpacity>
        <Text style={styles.nameText}>{user?.nickname || "사용자"}</Text>
        <Feather name="chevron-right" size={24} color={Colors.gray40} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.introText}>
          총 작성한 게시글 수 {userProfile.postCount}개
        </Text>
        {/* level 대신 displayLevel 사용 
        //<Text style={styles.introText}>클로이 레벨 {displayLevel}</Text>
        //<Text style={styles.introText}>
          //{userProfile.streakDays}일 연속 게시글 업로드🔥
        //</Text>
      //</View>
    //</TouchableOpacity>
  //);
//}; */

import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../constants/colors";

import useProfileStore from "../../store/profileStore";
import useAuthStore from "../../store/authStore";
import { profileApi } from "../../api/profileApi";

const ProfileCard = ({ onPress, onLoadData }) => {
  const { userProfile, fetchUserStats } = useProfileStore();
  // store에서 필요한 것들만 가져오기
  const user = useAuthStore((state) => state.user);
  const updateProfileImage = useAuthStore((state) => state.updateProfileImage);
  const getUserId = useAuthStore((state) => state.getUserId);

  const handleImagePress = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("권한 필요", "갤러리 접근 권한이 필요합니다.");
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        try {
          const userId = getUserId();
          // authStore에서 token 직접 가져오기
          const token = useAuthStore.getState().getAccessToken();

          const response = await profileApi.uploadProfileImage(
            userId,
            result.assets[0].uri,
            token
          );

          if (response.user && response.user.profileImage) {
            await updateProfileImage(response.user.profileImage);
          }
        } catch (error) {
          console.error("Profile image upload error:", error);
          Alert.alert("오류", "프로필 이미지 업데이트에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("오류", "이미지를 선택하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <TouchableOpacity style={styles.profileCard} onPress={onPress}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleImagePress}
        >
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View
              style={[styles.profileImage, styles.profileImagePlaceholder]}
            />
          )}
          <View style={styles.imageEditBadge}>
            <Feather name="edit-2" size={12} color={Colors.white} />
          </View>
        </TouchableOpacity>
        <Text style={styles.nameText}>{user?.nickname || "사용자"}</Text>
        <Feather name="chevron-right" size={24} color={Colors.gray40} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.introText}>
          총 작성한 게시글 수 {userProfile.postCount}개
        </Text>
        <Text style={styles.introText}>
          클로이 레벨 {userProfile.cloiLevel}
        </Text>
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
  // 이미지와 편집 배지
  imageContainer: {
    position: "relative",
    marginRight: 8,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 24,
  },
  //이미지가 없을 때 표시되는 placeholder
  profileImagePlaceholder: {
    backgroundColor: Colors.gray20,
  },
  //편집 아이콘이 들어가는 배지
  imageEditBadge: {
    position: "absolute",
    right: 4,
    bottom: 4,
    backgroundColor: Colors.gray40,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.white,
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
