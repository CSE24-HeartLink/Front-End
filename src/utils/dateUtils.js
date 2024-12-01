// utils/dateUtils.js
export const formatDate = (date) => {
  if (!date) return '날짜 없음'

  try {
    const parsedDate = new Date(date)
    const now = new Date()

    const dateOnly = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const diffTime = nowDateOnly - dateOnly
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return '오늘'
    if (diffDays === 1) return '어제'
    if (diffDays === 2) return '그저께'

    const year = dateOnly.getFullYear()
    const month = String(dateOnly.getMonth() + 1).padStart(2, '0')
    const day = String(dateOnly.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
  } catch (error) {
    console.error('Date formatting error:', error)
    return '날짜 없음'
  }
}

export const formatTime = (date) => {
  if (!date) return ''

  try {
    const parsedDate = new Date(date)
    const hours = String(parsedDate.getHours()).padStart(2, '0')
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  } catch (error) {
    console.error('Time formatting error:', error)
    return ''
  }
}

export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`
}
