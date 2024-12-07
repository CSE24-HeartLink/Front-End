import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av'

import { sttApi } from '../api/sttApi'

import Colors from '../constants/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import BigCircleBackground from '../components/ui/BigCircleBackground'
import MicIcon from '../../assets/images/icons/MicIcon.svg'
import LottieView from 'lottie-react-native'
/**
 * 음성 녹음 화면 컴포넌트
 * 사용자가 음성으로 글을 작성할 수 있는 화면 제공
 * 추후 STT(Speech-to-Text) 기능 추가 예정
 */
const RecordScreen = () => {
  const navigation = useNavigation()

  // 상태 관리
  const [recording, setRecording] = useState(null) // 현재 녹음 인스턴스
  const [isRecording, setIsRecording] = useState(false) // 녹음 중 여부
  const [recordingDuration, setRecordingDuration] = useState(0) // 녹음 시간(초)

  /**
   * 녹음 중일 때 1초마다 녹음 시간을 업데이트하는 타이머를 설정합니다.
   * 컴포넌트가 언마운트되거나 녹음이 중지되면 타이머를 정리합니다.
   */
  useEffect(() => {
    let timer
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRecording])

  /**
   * 컴포넌트가 언마운트될 때 진행 중인 녹음이 있다면 중지합니다.
   * 메모리 누수를 방지하기 위한 클린업 함수입니다.
   */
  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording()
      }
    }
  }, [])

  /**
   * 초 단위의 시간을 'MM:SS' 형식의 문자열로 변환합니다.
   * @param {number} seconds - 변환할 시간(초)
   * @returns {string} 'MM:SS' 형식의 시간 문자열
   */
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  /**
   * 녹음을 시작하는 함수입니다.
   * 1. 마이크 권한을 확인하고 요청합니다.
   * 2. 오디오 모드를 설정합니다.
   * 3. 새로운 녹음을 시작합니다.
   * @throws {Error} 권한이 거부되거나 녹음 시작 실패 시 에러를 발생시킵니다.
   */
  const startRecording = async () => {
    try {
      // 기존 녹음 객체가 있다면 먼저 정리
      if (recording) {
        await recording.stopAndUnloadAsync()
        setRecording(null)
      }

      // 마이크 권한 요청
      const { status } = await Audio.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('권한 필요', '음성 녹음을 위해 마이크 권한이 필요합니다.')
        return
      }

      // 오디오 모드 설정
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      const RECORDING_OPTIONS = {
        android: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      };

      // 녹음 시작
      const newRecording = new Audio.Recording()
      await newRecording.prepareToRecordAsync(RECORDING_OPTIONS)
      await newRecording.startAsync()

      setRecording(newRecording)
      setIsRecording(true)
      setRecordingDuration(0)
    } catch (error) {
      console.error('Failed to start recording:', error)
      Alert.alert('오류', '녹음을 시작할 수 없습니다.')
    }
  }

  /**
   * 녹음을 중지하는 함수입니다.
   * 1. 현재 진행 중인 녹음을 중지합니다.
   * 2. 녹음 파일의 URI를 가져옵니다.
   * 3. WritingScreen으로 이동합니다.
   * 추후 STT 기능이 추가되면 여기서 음성을 텍스트로 변환할 예정입니다.
   */
  const stopRecording = async () => {
    try {
      if (!recording) return

      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()

      setRecording(null)
      setIsRecording(false)

      // STT API 호출
      const result = await sttApi.transcribeAudio(uri)

      if (result.success) {
        navigation.navigate('WritingScreen', {
          transcribedText: result.data.text,
        })
      } else {
        Alert.alert('오류', '음성 변환에 실패했습니다.')
        console.error('STT Error:', result.error)
      }
    } catch (error) {
      console.error('Failed to stop recording:', error)
      Alert.alert('오류', '녹음을 중지할 수 없습니다.')
    }
  }

  /**
   * 녹음 버튼 클릭 핸들러
   * 녹음 중이면 중지하고, 녹음 중이 아니면 시작합니다.
   */
  const handleRecordPress = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={24} color={Colors.primaryBeige} />
      </TouchableOpacity>

      <Text style={styles.title}>{isRecording ? '모두 완료되면 버튼을 다시 눌러주세요' : '버튼을 눌러 음성으로 글쓰기'}</Text>

      {isRecording && <Text style={styles.durationText}>{formatDuration(recordingDuration)}</Text>}

      <View style={styles.circleContainer}>
        <TouchableOpacity onPress={handleRecordPress}>
          <BigCircleBackground>
            <MicIcon width={80} height={80} style={isRecording ? { color: Colors.red20 } : null} />
          </BigCircleBackground>
        </TouchableOpacity>
      </View>

      <Text style={styles.recordingText}>{isRecording ? '듣고있어요.' : '녹음 버튼을 눌러주세요'}</Text>

      {isRecording && (
        <LottieView source={require('../../assets/animations/Recording.json')} autoPlay loop style={styles.recordingAnimation} />
      )}
    </View>
  )
}

/**
 * 스타일 정의
 * 컴포넌트의 모든 스타일링을 관리합니다.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray40,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  title: {
    color: Colors.primaryBeige,
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  durationText: {
    color: Colors.primaryBeige,
    fontFamily: 'Pretendard',
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 20,
  },
  circleContainer: {
    marginBottom: 8,
  },
  recordingText: {
    color: Colors.primaryBeige,
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 16,
  },
  recordingImage: {
    width: '80%',
    height: 110,
    resizeMode: 'contain',
    marginTop: 20,
  },
  recordingAnimation: {
    width: '80%',
    height: 150,
    marginTop: 20,
  },
})

export default RecordScreen
