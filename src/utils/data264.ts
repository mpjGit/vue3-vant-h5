import { ajaxUpload } from './ajaxUpload'

export function validatePhoneNumber(phone) {
  // 正则表达式：匹配中国大陆的手机号
  const regex = /^1[3-9]\d{9}$/

  // 检查手机号是否符合正则
  if (regex.test(phone)) {
    return { valid: true, message: '手机号有效' }
  }
  else {
    return { valid: false, message: '手机号格式不正确' }
  }
}

/** 下载图片 */
export function downloadBase64(dataUrl: string, fileName: string = 'download', fileExtension: string = 'png') {
  // 将 base64 字符串转换为 Blob 对象
  const byteCharacters = atob(dataUrl.split(',')[1])
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += 10240) {
    const slice = byteCharacters.slice(offset, offset + 10240)
    const byteNumbers = Array.from({ length: slice.length })
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  const blob = new Blob(byteArrays, { type: 'application/octet-stream' })
  const blobUrl = URL.createObjectURL(blob)
  const creatDom = document.createElement('a')
  document.body.appendChild(creatDom)
  creatDom.href = blobUrl
  creatDom.download = `${fileName}.${fileExtension}`
  creatDom.click()
  document.body.removeChild(creatDom)
  URL.revokeObjectURL(blobUrl)
}

// 将base64转换成file，并上传到后端
export async function base64ToServe(base64String: string = '', fileName: string = 'contract.png') {
  // 将 Base64 转换为 File 对象
  const file = base64ToFile(base64String, fileName)

  // 创建 FormData 对象
  const formData = new FormData()
  formData.append('dkPicture', file)

  const res = await ajaxUpload(formData)
  return res
}

// 生成当前时间
export function updateTime() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // 月份从0开始，需要加1
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  // 格式化为 YYYY-MM-DD HH:MM:SS
  const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  // 将时间显示在页面上
  return timeString
}

// Base64 转换为 File 对象的函数
export function base64ToFile(base64String, filename) {
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)[1] // 获取 MIME 类型
  const bstr = atob(arr[1]) // 解码 Base64 字符串
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}
