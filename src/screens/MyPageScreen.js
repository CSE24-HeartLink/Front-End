import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../constants/colors";
import ProfileCard from "../components/ui/ProfileCard";
import RenameModal from "../components/modals/RenameModal";

const ToMeButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      <Icon name="chevron-right" size={24} color={Colors.Gray40} />
    </TouchableOpacity>
  );
};

const MyPageScreen = () => {
  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);

  const handleProfilePress = () => {
    setIsRenameModalVisible(true);
  };

  const handleRenameClose = () => {
    setIsRenameModalVisible(false);
  };

  const handleRenameConfirm = (newName) => {
    console.log("New name:", newName);
    setIsRenameModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProfileCard onPress={handleProfilePress} />
        <View style={styles.buttonContainer}>
          <ToMeButton
            title="내 게시글"
            onPress={() => console.log("내 게시글 클릭")}
          />
          <ToMeButton
            title="내 앨범"
            onPress={() => console.log("내 앨범 클릭")}
          />
        </View>

        <RenameModal
          visible={isRenameModalVisible}
          onClose={handleRenameClose}
          onConfirm={handleRenameConfirm}
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
});

export default MyPageScreen;
