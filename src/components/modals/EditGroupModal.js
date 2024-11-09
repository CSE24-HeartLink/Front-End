import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

import { GROUPS } from "../../constants/dummydata";
import Colors from "../../constants/colors";

const EditGroupModal = ({ visible, onClose, onConfirm, selectedGroup }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newGroup, setNewGroup] = useState(selectedGroup);

  const selectedGroupName =
    GROUPS.find((group) => group.id === newGroup)?.name || "전체";

  const handleSelectGroup = (groupId) => {
    setNewGroup(groupId);
    setIsDropdownOpen(false);
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
          <Text style={styles.title}>변경 그룹 선택</Text>

          {/* 드롭다운 헤더 */}
          <TouchableOpacity
            style={styles.groupSelectContainer}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={styles.selectedGroupText}>{selectedGroupName}</Text>
          </TouchableOpacity>

          {/* 드롭다운 목록 */}
          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              {GROUPS.map((group) => (
                <TouchableOpacity
                  key={group.id}
                  style={[
                    styles.dropdownItem,
                    newGroup === group.id && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleSelectGroup(group.id)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      newGroup === group.id && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {group.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => onConfirm(newGroup)}
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
  groupSelectContainer: {
    position: "absolute",
    left: "12.46%",
    right: "9.92%",
    top: "33.15%",
    height: 40,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedGroupText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    color: "#1F1F1F",
  },
  dropdownList: {
    position: "absolute",
    top: "50%",
    left: "12.46%",
    right: "9.92%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  dropdownItemSelected: {
    backgroundColor: "#F2F2F2",
  },
  dropdownItemText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "400",
    color: "#1F1F1F",
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
    zIndex: 1, // 이 부분 추가
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

export default EditGroupModal;
