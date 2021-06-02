export function encapsulateWordInString(
  str,
  prefix,
  word,
  suffix,
  { caseSensitive } = {}
) {
  const modifier = caseSensitive ? 'g' : 'gi'
  const regExp = new RegExp(`(${word})`, modifier)
  return str.replace(regExp, `${prefix}$1${suffix}`)
}
