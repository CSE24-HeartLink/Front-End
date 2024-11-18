import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constants/colors";
//import useFriendStore from "../../store/friendStore";

const AddFriendModal = ({ visible, onClose, onSubmit, error, loading }) => {
  const [nickname, setNickname] = useState("");
  //const { clearError } = useFriendStore();

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      return;
    }
    // 직접 addFriend 호출하는 대신 onSubmit prop 사용
    await onSubmit(nickname);
  };

  const handleClose = () => {
    setNickname("");
    //clearError();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>친구 추가</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="닉네임을 입력해주세요."
              placeholderTextColor={Colors.gray30}
              value={nickname}
              onChangeText={setNickname}
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* {error && <Text style={styles.errorText}>{error}</Text>} */}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              disabled={loading}
            >
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmButton, loading && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={loading || !nickname.trim()}
            >
              {loading ? (
                <ActivityIndicator color={Colors.gray50} />
              ) : (
                <Text style={styles.buttonText}>요청</Text>
              )}
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
  disabledButton: {
    backgroundColor: Colors.gray30,
  },
  buttonText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19,
    textAlign: "center",
    color: Colors.gray50,
  },
  errorText: {
    position: "absolute",
    top: "53%",
    left: "12.46%",
    right: "9.92%",
    color: "red",
    fontSize: 12,
    fontFamily: "Pretendard",
  },
});

export default AddFriendModal;
