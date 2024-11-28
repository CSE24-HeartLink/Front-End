import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  SafeAreaView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import Colors from '../constants/colors'
import useCLOiStore from '../store/CLOiStore'
import useChatStore from '../store/chatStore'
import useAuthStore from '../store/authStore'

const ChatbotScreen = () => {
  const navigation = useNavigation()
  const [message, setMessage] = useState('')
  const flatListRef = useRef(null)
  const { name, level, getLevelFaceImage } = useCLOiStore()
  const { messages, sendMessage, getChatHistory } = useChatStore()
  const userId = useAuthStore((state) => state.getUserId())

  useEffect(() => {
    if (userId) {
      getChatHistory(userId)
    }
  }, [userId])

  const handleSend = async () => {
    if (!message.trim()) return

    await sendMessage(userId, message)
    setMessage('')
  }

  const renderMessage = ({ item }) => (
    <View style={item.role === 'user' ? styles.userMessageContainer : styles.botMessageContainer}>
      {item.role === 'assistant' && <Image source={getLevelFaceImage(getLevelFaceImage)} style={styles.botAvatar} />}
      <View style={[styles.messageBubble, item.role === 'user' ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.messageText, item.role === 'user' ? styles.userText : styles.botText]}>{item.content}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color={Colors.darkRed20} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{name}</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="메시지를 입력하세요"
            placeholderTextColor={Colors.gray40}
            multiline
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Icon name="send" size={24} color={Colors.red20} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.gray50,
    marginLeft: 16,
    fontWeight: '600',
  },
  messageList: {
    padding: 16,
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  botMessageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  messageBubble: {
    padding: 16,
    maxWidth: '70%',
    borderRadius: 30,
  },
  userBubble: {
    backgroundColor: Colors.gray45,
    borderTopRightRadius: 4,
  },
  botBubble: {
    backgroundColor: Colors.lightBeige,
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: Colors.lightBeige,
  },
  botText: {
    color: Colors.gray45,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
})

export default ChatbotScreen
