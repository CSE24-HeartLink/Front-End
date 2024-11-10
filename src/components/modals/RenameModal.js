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

const RenameModal = ({ visible, onClose, onConfirm }) => {
  const [newName, setNewName] = useState("");

  const handleConfirm = () => {
    if (newName.trim()) {
      onConfirm(newName);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>새 이름 입력</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="새 이름을 입력하세요"
              placeholderTextColor="#999"
              value={newName}
              onChangeText={setNewName}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>변경</Text>
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
    backgroundColor: "#FEFAFB",
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
    color: "#1F1F1F",
  },
  inputContainer: {
    position: "absolute",
    left: "12.46%",
    right: "9.92%",
    top: "33.15%",
    height: 40,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  input: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "400",
    color: "#1F1F1F",
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    left: "14.16%",
    right: "14.16%",
    top: "65.22%",
    bottom: "13.04%",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    height: "100%",
    marginRight: 8,
    backgroundColor: "#D1D1D1",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    height: "100%",
    marginLeft: 8,
    backgroundColor: "#B4DF7E",
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
    color: "#1F1F1F",
  },
});

export default RenameModal;
