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
import useMyPageStore from "../../store/MypageStore";

// 이름 변경을 위한 모달 컴포넌트
// props:
// - visible: 모달 표시 여부
// - onClose: 모달 닫기 함수
// - onConfirm: 이름 변경 확인 시 실행할 함수
const RenameModal = ({ visible, onClose, onConfirm }) => {
  // 새로 입력된 이름을 관리하는 상태
  const [newName, setNewName] = useState("");

  // 이름 변경 확인 처리 함수
  const handleConfirm = () => {
    // 입력된 이름이 공백이 아닌 경우에만 처리
    if (newName.trim()) {
      onConfirm(newName); // 새 이름으로 변경
      setNewName(""); // 입력 필드 초기화
    }
    onClose(); // 모달 닫기
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* 반투명 오버레이 */}
      <View style={styles.overlay}>
        {/* 모달 컨테이너 */}
        <View style={styles.modalContainer}>
          {/* 모달 제목 */}
          <Text style={styles.title}>새 이름 입력</Text>

          {/* 이름 입력 필드 컨테이너 */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="새 이름을 입력하세요"
              placeholderTextColor={Colors.gray30}
              value={newName}
              onChangeText={setNewName}
            />
          </View>

          {/* 버튼 컨테이너 */}
          <View style={styles.buttonContainer}>
            {/* 취소 버튼 */}
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>

            {/* 변경 확인 버튼 */}
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

// 스타일 정의
const styles = StyleSheet.create({
  // 모달 오버레이 스타일
  overlay: {
    flex: 1,
    backgroundColor: "rgba(166, 166, 166, 0.5)", // 반투명 배경
    justifyContent: "center",
    alignItems: "center",
  },
  // 모달 컨테이너 스타일
  modalContainer: {
    width: 353,
    height: 184,
    backgroundColor: Colors.lightBeige,
    borderRadius: 16,
  },
  // 모달 제목 스타일
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
  // 입력 필드 컨테이너 스타일
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
  // 입력 필드 스타일
  input: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "400",
    color: Colors.gray50,
  },
  // 버튼 컨테이너 스타일
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    left: "14.16%",
    right: "14.16%",
    top: "65.22%",
    bottom: "13.04%",
    justifyContent: "space-between",
  },
  // 취소 버튼 스타일
  cancelButton: {
    flex: 1,
    height: "100%",
    marginRight: 8,
    backgroundColor: Colors.gray20,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  // 확인 버튼 스타일
  confirmButton: {
    flex: 1,
    height: "100%",
    marginLeft: 8,
    backgroundColor: Colors.primaryGreen,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  // 버튼 텍스트 스타일
  buttonText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19,
    textAlign: "center",
    color: Colors.gray50,
  },
});

export default RenameModal;
