import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../constants/colors";
import useGroupStore from "../../store/groupStore";
import useNotificationStore from "../../store/notificationStore";

import TopFilterButton from "../ui/TopFilterButton";

const MainHeader = ({ onPressCategory, selectedGroup }) => {
  const navigation = useNavigation();
  const groups = useGroupStore((state) => state.groups);
  const { unreadCount, updateUnreadCount } = useNotificationStore(); // 전체 상태 가져오기

  useEffect(() => {
    updateUnreadCount();
  }, []);

  const getGroupName = () => {
    const group = groups.find((g) => g.id === selectedGroup);
    return group ? group.name : "전체";
  };

  const handleNotificationPress = () => {
    navigation.navigate("Notifications");
  };

  return (
    <View style={styles.header}>
      <TopFilterButton onPress={onPressCategory} getGroupName={getGroupName} />
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={handleNotificationPress}
      >
        <Icon name="bell" size={20} color={Colors.pink40} />
        {unreadCount > 0 && (
          <View style={[styles.badge, { backgroundColor: "red" }]}>
            <Text style={[styles.badgeText, { color: "white" }]}>
              {unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: Colors.primaryBeige,
  },
  notificationButton: {
    position: "absolute",
    right: 16,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.red,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default MainHeader;
