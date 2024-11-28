import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '../../constants/colors'
import useGroupStore from '../../store/groupStore'

const EditGroupModal = ({ visible, onClose, onConfirm, selectedFriendId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [isMoving, setIsMoving] = useState(false)

  const { groups, fetchGroups, moveGroupMember, isLoading } = useGroupStore()

  // 전체, 기존 그룹 목록 통합
  const allGroups = [
    { id: null, name: '전체' }, // 전체는 null을 id로 사용
    ...groups,
  ]

  useEffect(() => {
    if (visible) {
      console.log('Modal opened, fetching groups...')
      fetchGroups()
    }
  }, [visible])

  //그룹에 추가
  const handleSelectGroup = (groupId) => {
    console.log('Selected group:', groupId)
    setSelectedGroupId(groupId)
    setIsDropdownOpen(false)
  }

  const handleConfirm = async () => {
    try {
      setIsMoving(true)
      console.log('Starting group move:', {
        selectedGroupId,
        selectedFriendId,
      })

      // 어떤 경우든 moveGroupMember 사용
      const result = await moveGroupMember(selectedGroupId, selectedFriendId)
      if (result.success) {
        console.log('Move successful')
        onConfirm(selectedGroupId)
      } else {
        throw new Error(result.error || '이동 실패')
      }
    } catch (error) {
      console.error('Move failed:', error)
    } finally {
      setIsMoving(false)
      onClose()
    }
  }

  console.log('Rendering modal with visible:', visible) // 디버깅용 로그 추가

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {(isLoading || isMoving) && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={Colors.primaryGreen} />
            </View>
          )}

          <Text style={styles.title}>변경 그룹 선택</Text>

          <TouchableOpacity style={styles.groupSelectContainer} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Text style={styles.selectedGroupText}>
              {selectedGroupId === null ? '전체' : groups.find((group) => group.id === selectedGroupId)?.name || '그룹 선택'}
            </Text>
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              {allGroups.map((group) => (
                <TouchableOpacity
                  key={group.id || 'all'}
                  style={[styles.dropdownItem, selectedGroupId === group.id && styles.dropdownItemSelected]}
                  onPress={() => handleSelectGroup(group.id)}
                >
                  <Text style={[styles.dropdownItemText, selectedGroupId === group.id && styles.dropdownItemTextSelected]}>
                    {group.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={isLoading || isMoving}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmButton, (isLoading || isMoving) && styles.disabledButton]}
              onPress={handleConfirm}
              disabled={isLoading || isMoving}
            >
              <Text style={styles.buttonText}>{isLoading || isMoving ? '처리중...' : '변경'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(166, 166, 166, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 353,
    height: 184,
    backgroundColor: Colors.lightBeige,
    borderRadius: 16,
  },
  loadingOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    borderRadius: 16,
  },
  title: {
    position: 'absolute',
    top: '13.04%',
    left: '35.69%',
    right: '35.41%',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 21,
    textAlign: 'center',
    color: Colors.gray50,
  },
  groupSelectContainer: {
    position: 'absolute',
    left: '12.46%',
    right: '9.92%',
    top: '33.15%',
    height: 40,
    backgroundColor: Colors.gray15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedGroupText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray50,
  },
  dropdownList: {
    position: 'absolute',
    top: '50%',
    left: '12.46%',
    right: '9.92%',
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
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    color: Colors.gray50,
    textAlign: 'center',
  },
  dropdownItemTextSelected: {
    fontWeight: '600',
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: '14.16%',
    right: '14.16%',
    top: '65.22%',
    bottom: '13.04%',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  cancelButton: {
    flex: 1,
    height: '100%',
    marginRight: 8,
    backgroundColor: Colors.gray20,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    height: '100%',
    marginLeft: 8,
    backgroundColor: Colors.primaryGreen,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    textAlign: 'center',
    color: Colors.gray50,
  },
  disabledButton: {
    opacity: 0.5,
  },
})

export default EditGroupModal
