import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Colors from "../../constants/colors";

const EditGroupNameModal = ({
  visible,
  onClose,
  onConfirm,
  onDelete,
  currentGroupName,
}) => {
  const [groupName, setGroupName] = useState(currentGroupName);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="x" size={24} color={Colors.gray50} />
          </TouchableOpacity>

          <Text style={styles.title}>그룹 이름 수정</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="그룹이름을 입력하세요"
              placeholderTextColor={Colors.gray30}
              value={groupName}
              onChangeText={setGroupName}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={[styles.buttonText, styles.deleteButtonText]}>
                그룹삭제
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => onConfirm(groupName)}
            >
              <Text style={styles.buttonText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(166, 166, 166, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 353,
    height: 184,
    backgroundColor: Colors.lightBeige,
    borderRadius: 16,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 1,
  },
  title: {
    position: "absolute",
    top: "13.04%",
    left: "35.69%",
    right: "35.41%",
    fontFamily: "Pretendard",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 21,
    textAlign: "center",
    color: Colors.gray50,
  },
  inputContainer: {
    position: "absolute",
    left: "12.46%",
    right: "9.92%",
    top: "33.15%",
    height: 40,
    backgroundColor: Colors.gray15,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  input: {
    fontFamily: "Pretendard",
    fontSize: 16,
    color: Colors.gray50,
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    left: "14.16%",
    right: "14.16%",
    top: "65.22%",
    bottom: "13.04%",
    justifyContent: "space-between",
    zIndex: 1,
  },
  deleteButton: {
    flex: 1,
    height: "100%",
    marginRight: 8,
    backgroundColor: Colors.gray20,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    height: "100%",
    marginLeft: 8,
    backgroundColor: Colors.primaryGreen,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19,
    textAlign: "center",
    color: Colors.gray50,
  },
  deleteButtonText: {
    color: Colors.darkRed20,
  },
});

export default EditGroupNameModal;