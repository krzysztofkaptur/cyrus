export function formatDate(dateStr: Date) {
  const year = dateStr.getFullYear()
  const month = dateStr.getMonth() + 1
  const day = dateStr.getDate()

  return `${year}-${month >= 10 ? month : `0${month}`}-${
    day >= 10 ? day : `0${day}`
  }`
}
