// 设备检测工具函数
export const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = [
    'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone',
    'mobile', 'tablet', 'phone'
  ]
  
  return mobileKeywords.some(keyword => userAgent.includes(keyword)) || 
         window.innerWidth <= 768
}

export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export const isAndroid = () => {
  return /Android/.test(navigator.userAgent)
}

export const isWechat = () => {
  return /MicroMessenger/i.test(navigator.userAgent)
}

export const getDeviceType = () => {
  if (isMobile()) {
    if (isIOS()) return 'ios'
    if (isAndroid()) return 'android'
    return 'mobile'
  }
  return 'desktop'
} 