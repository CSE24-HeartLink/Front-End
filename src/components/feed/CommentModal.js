import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from "react-native";
import Colors from "../../constants/colors";

const CommentModal = ({ visible, onClose, onSubmit, feedId, userId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment.trim()); // content만 전달
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <Pressable style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="댓글을 입력하세요"
                value={comment}
                onChangeText={setComment}
                multiline
                maxLength={1000}
                autoFocus
                onSubmitEditing={handleSubmit}
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !comment.trim() && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!comment.trim()}
              >
                <Text style={styles.submitText}>확인</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  dimmedArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  keyboardView: {
    width: "100%",
  },
  container: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.lightBeige,
    borderRadius: 20,
    padding: 12,
    fontFamily: "Pretendard",
    fontSize: 16,
    maxHeight: 100,
  },
  submitButton: {
    backgroundColor: Colors.pink20,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: Colors.white,
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CommentModal;
