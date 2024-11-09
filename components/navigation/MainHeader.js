import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Colors from "../../constants/colors";
import { GROUPS } from "../../constants/dummydata";

const MainHeader = ({
  onPressNotification,
  onPressCategory,
  selectedGroup,
}) => {
  const getGroupName = () => {
    const group = GROUPS.find((g) => g.id === selectedGroup);
    return group ? group.name : "전체";
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.categoryButton} onPress={onPressCategory}>
        <Text style={styles.categoryText}>{getGroupName()}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onPressNotification}
      >
        <Icon name="bell" size={20} color={Colors.pink40} />
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
  categoryButton: {
    width: 160,
    height: 40,
    backgroundColor: Colors.red10,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  categoryText: {
    color: Colors.lightBeige,
    fontSize: 16,
    fontFamily: "Pretendard",
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
  },
  notificationButton: {
    position: "absolute",
    right: 16,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainHeader;
