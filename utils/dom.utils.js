export function getSiblingIndex(domElement) {
  return Array.from(domElement.parentElement.children).indexOf(domElement)
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    globalThis.window.navigator.userAgent
  )
}
