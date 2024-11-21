import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import useGroupStore from "../../store/groupStore";
import Colors from "../../constants/colors";

const AlbumGroupSelectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentGroupId, setCurrentGroupId] = useState("all");
  const { groups, isLoading, error, fetchGroups } = useGroupStore();

  // 초기 데이터 로드
  useEffect(() => {
    fetchGroups();
  }, []);

  // 현재 선택된 그룹 ID 설정
  useEffect(() => {
    if (route.params?.currentGroupId) {
      setCurrentGroupId(route.params.currentGroupId);
    }
  }, [route.params?.currentGroupId]);

  // 전체 포함한 그룹 리스트
  const allGroups = [{ id: "all", name: "전체" }, ...groups];

  // 그룹 선택 처리
  const handleSelectGroup = (groupId) => {
    navigation.navigate("MainTab", {
      screen: "앨범",
      params: { selectedGroup: groupId },
      initial: false,
    });
  };

  // 에러 발생시 표시
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchGroups}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="chevron-left" size={24} color={Colors.darkRed20} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {allGroups.find((g) => g.id === currentGroupId)?.name || "전체"}
            </Text>
          </View>
        </View>

        <View style={styles.groupsContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.darkRed20} />
            </View>
          ) : (
            allGroups.map((group) => (
              <TouchableOpacity
                key={group.id}
                style={[
                  styles.groupItem,
                  currentGroupId === group.id && styles.selectedGroupItem,
                ]}
                onPress={() => handleSelectGroup(group.id)}
              >
                <Image
                  source={require("../../../assets/images/Heart.png")}
                  style={styles.heartIcon}
                />
                <Text
                  style={[
                    styles.groupName,
                    currentGroupId === group.id && styles.selectedGroupName,
                  ]}
                >
                  {group.name}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => console.log("hi")}
        >
          <Image
            source={require("../../../assets/images/AICollage.png")}
            style={styles.addButtonImage}
          />
        </TouchableOpacity>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkRed20,
  },
  groupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    justifyContent: "space-between",
  },
  groupItem: {
    width: "30%",
    aspectRatio: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  selectedGroupItem: {
    backgroundColor: Colors.lightRed10,
    borderRadius: 8,
  },
  heartIcon: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkRed20,
  },
  selectedGroupName: {
    color: Colors.darkRed,
  },
  addButton: {
    position: "absolute",
    width: 64,
    height: 64,
    right: 20,
    bottom: 20,
    zIndex: 1,
  },
  addButtonImage: {
    width: "100%",
    height: "100%",
  },
});

export default AlbumGroupSelectScreen;
