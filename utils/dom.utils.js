export function getSiblingIndex(domElement) {
  return Array.from(domElement.parentElement.children).indexOf(domElement);
}