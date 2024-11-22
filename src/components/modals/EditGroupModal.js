import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import useGroupStore from "../../store/groupStore";

const EditGroupModal = ({ visible, onClose, onConfirm, selectedFriendId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  // 그룹 스토어에서 데이터 가져오기
  const { groups, fetchGroups, addGroupMember, isLoading } = useGroupStore();

  // 모달이 열릴 때 그룹 목록 가져오기
  useEffect(() => {
    if (visible) {
      fetchGroups();
    }
  }, [visible]);

  const handleSelectGroup = (groupId) => {
    setSelectedGroupId(groupId);
    setIsDropdownOpen(false);
  };

  const handleConfirm = async () => {
    if (!selectedGroupId) return;

    try {
      const result = await addGroupMember(selectedGroupId, selectedFriendId);
      if (result.success) {
        onConfirm(selectedGroupId);
        // 성공 메시지 표시 (옵션)
        Toast.show({
          type: "success",
          text1: "그룹에 친구가 추가되었습니다.",
          position: "bottom",
        });
      }
    } catch (error) {
      if (error.message.includes("이미 그룹 멤버입니다")) {
        // 이미 멤버인 경우 처리
        Toast.show({
          type: "info",
          text1: "이미 그룹에 속한 친구입니다.",
          position: "bottom",
        });
      } else {
        // 기타 에러 처리
        Toast.show({
          type: "error",
          text1: "친구 추가 실패",
          text2: error.message,
          position: "bottom",
        });
      }
    }
  };

  const selectedGroupName =
    groups.find((group) => group.id === selectedGroupId)?.name || "그룹 선택";

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

          <TouchableOpacity
            style={styles.groupSelectContainer}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={styles.selectedGroupText}>{selectedGroupName}</Text>
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              {groups.map((group) => (
                <TouchableOpacity
                  key={group.id}
                  style={[
                    styles.dropdownItem,
                    selectedGroupId === group.id && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleSelectGroup(group.id)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedGroupId === group.id &&
                        styles.dropdownItemTextSelected,
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
              onPress={handleConfirm}
              disabled={!selectedGroupId || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "처리중..." : "변경"}
              </Text>
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
    zIndex: 1, // 이 부분 추가
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
});

export default EditGroupModal;
