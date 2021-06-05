export function encapsulateWordInString(
  string,
  prefix,
  substring,
  suffix,
  { caseSensitive } = {}
) {
  const modifier = caseSensitive ? 'g' : 'gi'
  const regExp = new RegExp(`(${substring})`, modifier)
  return string.replace(regExp, `${prefix}$1${suffix}`)
}
