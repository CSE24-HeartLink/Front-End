import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image, // Image import 추가
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

import Colors from "../constants/colors";
import { GROUPS } from "../constants/dummydata";

const GroupSelectScreen = () => {
  const navigation = useNavigation();

  const handleSelectGroup = (groupId) => {
    navigation.navigate("친구", {
      screen: "FriendsList",
      params: { selectedGroup: groupId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="chevron-left" size={24} color={Colors.darkRed20} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>그룹 목록</Text>
          </View>
        </View>

        {/* Groups Grid */}
        <View style={styles.groupsContainer}>
          {GROUPS.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={styles.groupItem}
              onPress={() => handleSelectGroup(group.id)}
            >
              <Image
                source={require("../../assets/images/Heart.png")}
                style={styles.heartIcon}
              />
              <Text style={styles.groupName}>{group.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    fontFamily: "Pretendard",
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
  heartIcon: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  groupName: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkRed20,
  },
});

export default GroupSelectScreen;