export function isIdCard(id) {
  // 正则表达式：验证18位身份证格式
  const reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))([0-2][1-9]|(3[01]))\d{3}[\dX]$/

  if (!reg.test(id)) {
    return { valid: false, message: '身份证格式不正确' }
  }

  // 校验日期是否合法
  const year = id.substr(6, 4)
  const month = id.substr(10, 2)
  const day = id.substr(12, 2)
  const date = new Date(`${year}-${month}-${day}`)

  if (date.getFullYear() !== Number.parseInt(year) || date.getMonth() + 1 !== Number.parseInt(month) || date.getDate() !== Number.parseInt(day)) {
    return { valid: false, message: '身份证出生日期无效' }
  }

  // 校验码计算
  const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let sum = 0

  for (let i = 0; i < 17; i++) {
    sum += Number.parseInt(id[i]) * factors[i]
  }

  const checkCodeIndex = sum % 11
  const checkCode = checkCodes[checkCodeIndex]

  if (id[17] !== checkCode) {
    return { valid: false, message: '身份证校验码不正确' }
  }

  return { valid: true, message: '身份证有效' }
}
