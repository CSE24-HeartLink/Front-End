import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import Colors from "../../constants/colors";

const EditGroupNameModal = ({
  visible,
  onClose,
  onConfirm,
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
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>취소</Text>
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
  groupSelectContainer: {
    position: "absolute",
    left: "12.46%",
    right: "9.92%",
    top: "33.15%",
    height: 40,
    backgroundColor: Colors.gray15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedGroupText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray50,
  },
  dropdownList: {
    position: "absolute",
    top: "50%",
    left: "12.46%",
    right: "9.92%",
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 5,
    shadowColor: Colors.gray50,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray15,
  },
  dropdownItemSelected: {
    backgroundColor: Colors.gray15,
  },
  dropdownItemText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "400",
    color: Colors.gray50,
    textAlign: "center",
  },
  dropdownItemTextSelected: {
    fontWeight: "600",
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
  cancelButton: {
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
});

export default EditGroupNameModal;
