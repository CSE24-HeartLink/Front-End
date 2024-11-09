import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Colors from "../../constants/colors";
import { GROUPS } from "../../constants/dummydata";

import TopFilterButton from "../ui/TopFilterButton";

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
      <TopFilterButton onPress={onPressCategory} getGroupName={getGroupName} />
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